from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import JsonResponse, HttpResponseForbidden
from django.shortcuts import HttpResponseRedirect, render, redirect, get_object_or_404
from django.urls import reverse

from .models import Profile, User
# Create your views here.

def index(request):
    if request.user.is_authenticated:
        return render(request, "index.html")
    else:
        return HttpResponseRedirect(reverse("login"))
    

def register(request):
    """Register a user"""
    if request.user.is_authenticated:
        return redirect('/')
    
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]
        password = request.POST["password"]
        confirmation = request.POST["confirmPassword"]
        image = request.FILES.get("image", None)


        # Ensure password matches confirmation
        if password != confirmation:
            messages.error(request, "Passwords must match.")
            return render(request, "index.html")
        
        # Attempt to create a new user
        try:
            user = User.objects.create_user(username=username, email=email, password=password)
            user.save()

            # Update profile image
            user.profile.profile_image = image
            user.profile.save()

        except IntegrityError as e:
            print(e)
            messages.error(request, "Username and/or Email already taken.")
            return render(request, "index.html")
        
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "index.html")
    

def login_view(request):
    """Log a user in, if already logged in redirect to /"""
    if request.user.is_authenticated:
        return redirect('/')
    
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            messages.error(request, "Invalid Email and/or Password.")
            return render(request, "index.html")
    else:
        if request.user.is_authenticated:
            context = {
                "username": request.user.username,
            }
            return render(request, "index.html", context)
        return render(request, "index.html")
    
@login_required
def logout_view(request):
    """Log a user out"""
    logout(request)
    return HttpResponseRedirect(reverse("index"))

def profile(request, username):
    """Send a JSON response containing user's information"""
    user = get_object_or_404(User, username=username)
    profile = get_object_or_404(Profile, user=user)
    followings_count = profile.followings.count()
    followers_count = profile.followers.count()
    posts_count = profile.post_set.count()

    return JsonResponse({
        "username": user.username,
        "profile_image": profile.profile_image.url if profile.profile_image else None,
        "bio": profile.bio,
        "followings_count": followings_count,
        "followers_count": followers_count,
        "posts_count": posts_count,
    })

@login_required
def edit(request, username):
    """Edit user profile"""
    if request.method == 'POST':
        profile = get_object_or_404(Profile, user__username=username)
        
        if profile.user.id != request.user.id:
            return HttpResponseForbidden("You are not allowed to edit this profile.")
        if "image" in request.FILES:
            image = request.FILES["image"]
        else:
            image = None
        bio = request.POST["bio"]
        
        # Attempt to update image and bio
        try:
            profile.bio = bio
            if not image is None:
                profile.profile_image = image
            profile.save()
            return JsonResponse({
                "profile_image": profile.profile_image.url if profile.profile_image else None,
                "bio": profile.bio,
            })
        except IntegrityError as e:
            print(e)
            messages.error(request, "Something went wrong.")
            return redirect("index")
        
@login_required
def follow(request):
    """Let users follow each other"""
    if request.method == "POST":
        # Check if user is logged in
        if not request.user.is_authenticated:
            messages.error(request, "You must log in.")
            return redirect("index")
        # Get target username
        username = request.POST['username']
        target_profile = get_object_or_404(Profile, user__username=username)
        user_profile = get_object_or_404(Profile, user__username=request.user)

        # Check if user is in followers
        is_follower = target_profile.followers.filter(id=request.user.id).exists()
        
        # If hasn't yet followed
        if not is_follower:
            target_profile.followers.add(user_profile)
            followers_count = target_profile.followers.count()
            return JsonResponse({"followers_count": followers_count})
        else:
            target_profile.followers.remove(user_profile)
            followers_count = target_profile.followers.count()
            return JsonResponse({"followers_count": followers_count})
        
    