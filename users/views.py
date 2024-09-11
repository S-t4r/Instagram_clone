from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import JsonResponse
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
    if request.user.is_authenticated:
        return redirect('/')
    
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]
        password = request.POST["password"]
        confirmation = request.POST["confirmPassword"]
        image = request.FILES["image"]


        # Ensure password matches confirmation
        if password != confirmation:
            messages.error(request, "Passwords must match.")
            return render(request, "index.html")
        
        # Attempt to create a new user
        try:
            user = User.objects.create_user(username=username, email=email, password=password)
            user.save()

            # Save the image
            profile = Profile(user=user, profile_image=image)
            profile.save()

        except IntegrityError as e:
            print(e)
            messages.error(request, "Username and/or Email already taken.")
            return render(request, "index.html")
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "index.html")
    

def login_view(request):
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
    logout(request)
    return HttpResponseRedirect(reverse("index"))

@login_required
def profile(request):
    if request.method == 'POST':
        if "image" in request.FILES:
            image = request.FILES["image"]
        else:
            image = None
        bio = request.POST["bio"]
        
        # Attempt to update image and bio
        try:
            profile = get_object_or_404(Profile, user=request.user)
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
            

    else:
        user = get_object_or_404(User, username=request.user.username)
        profile = get_object_or_404(Profile, user=user)
        return JsonResponse({
            "username": user.username,
            "profile_image": profile.profile_image.url if profile.profile_image else None,
            "bio": profile.bio,
            "following": [followed_user.username for followed_user in profile.following.all()],
        })
