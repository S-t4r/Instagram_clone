from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.shortcuts import get_object_or_404, redirect
from django.http import JsonResponse

from .models import Post
from users.models import User, Profile

# Create your views here.
def index(request):
    posts = Post.objects.all().values()
    return JsonResponse(list(posts), safe=False)

@login_required
def create_posts(request):
    if request.method == 'POST':
        caption = request.POST.get('caption', '')
        image = request.FILES.get('image', None)
        if image is None:
            messages.error(request, "You must provide an image.")
            return JsonResponse({'error': "You must provide an image."}, status=400)
        try:
            user = get_object_or_404(User, username=request.user)
            profile = get_object_or_404(Profile, user=user)
            post = Post.objects.create(profile=profile, post_image=image, caption=caption)
            post.save()
            return JsonResponse({'success': "Post created successfully."})
        except IntegrityError as e:
            print(e)
            messages.error(request, "Something went wrong.")
            return JsonResponse({'error': "Something went wrong."}, status=500)
        
def show_posts(request):
    username = request.GET.get('username')
    user = get_object_or_404(User, username=username)
    profile = get_object_or_404(Profile, user=user)
    posts = Post.objects.filter(profile=profile)
    return JsonResponse(list(posts.values()), safe=False)