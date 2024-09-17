from django.contrib import messages
from django.contrib.auth.decorators import login_required
from django.core.paginator import Paginator
from django.db import IntegrityError
from django.shortcuts import get_object_or_404
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
    posts = Post.objects.filter(profile=profile).order_by("-timestamp")
    posts_data = [post.serialize() for post in posts]
    return JsonResponse({"posts": posts_data})

def following(request):
    username = request.GET.get('username')
    page = request.GET.get('page', 1)

    # Get Profile of current user
    profile = get_object_or_404(Profile, user__username=username)

    # Get the list of followings
    following_users = list(profile.followings.all()) + [profile]

    # Fetch posts from those users
    posts = Post.objects.filter(profile__in=following_users).order_by("-timestamp")

    # Pagination
    paginator = Paginator(posts, 10) # Show 10 posts per page
    paginated_posts = paginator.get_page(page)
    posts_data = [post.serialize() for post in paginated_posts]
    
    return JsonResponse({"posts": posts_data})

def edit(request):
    post_id = request.POST.get('post_id')
    caption = request.POST.get('caption')
    if not post_id or not caption:
        return JsonResponse({'error': 'Invalid input'}, status=400)
    
    try:
        post = get_object_or_404(Post, pk=post_id)

        if request.user != post.profile.user:
            return JsonResponse({'error': 'Invalid User.'}, status=403)
        
        post.caption = caption
        post.save()
        return JsonResponse({'status': 'success'})
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)
    
def remove(request):
    post_id = request.GET.get('post_id')
    if not post_id:
        return JsonResponse({'error': 'Invalid input'}, status=200)
    
    try:
        post = get_object_or_404(Post, pk=post_id)

        if request.user != post.profile.user:
            return JsonResponse({'error': 'Invalid User.'}, status=403)
        
        post.delete()
        return JsonResponse({'status': 'success'}, status=200)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)