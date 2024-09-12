from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.shortcuts import render, redirect
from django.http import JsonResponse

from .models import Post

# Create your views here.
@login_required
def index(request):
    if request.method == 'POST':
        caption = request.POST.get('caption', '')
        image = request.FILES.get('image', None)
        if image is None:
            return JsonResponse({'error': "You must provide an image."}, status=400)
        
        try:
            post = Post.objects.create(user=request.user, post_image=image, caption=caption)
            post.save()
        except IntegrityError as e:
            print(e)
            return JsonResponse({'error': "Something went wrong."}, status=500)
        
        return JsonResponse({'success': "Post created successfully."})

@login_required
def create_post(request):
    return render(request, 'create_post.html')