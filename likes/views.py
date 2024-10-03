from django.db import IntegrityError
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from .models import Comment, CommentLike, Like, Post

# Create your views here.
def index(request):
    """Like or Un-like a post"""
    if request.method == 'POST':
        if not request.user.is_authenticated:
            return JsonResponse({'error': 'User not authenticated'}, status=401)
        
        post_id = request.POST.get('post_id')
        user = request.user

        if not post_id:
            return JsonResponse({'error': 'Invalid input'}, status=400)
        
        post = get_object_or_404(Post, pk=post_id)

        like = Like.objects.filter(user=user, post=post).first()
        
        if like:
            like.delete()
            like_count = post.likes.count()
            return JsonResponse({'liked': False, 'like_count': like_count}, status=200)
        else:
            try:
                Like.objects.create(user=user, post=post)
                like_count = post.likes.count()
                return JsonResponse({'liked': True, 'like_count': like_count}, status=200)
            except IntegrityError as e:
                return JsonResponse({'error': f'db err:{e}'}, status=500)

def status(request, post_id):
    """The count of likes of a post"""
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'User not authenticated'}, status=401)

    post = get_object_or_404(Post, pk=post_id)
    user = request.user
    liked = Like.objects.filter(user=user, post=post).exists()
    like_count = post.likes.count()
    return JsonResponse({'liked': liked, 'like_count': like_count}, status=200)

def comments_status(request, comment_id):
    """The counts of a comment's likes"""
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'User not authenticated'}, status=401)

    comment = get_object_or_404(Comment, pk=comment_id)
    user = request.user
    liked = CommentLike.objects.filter(user=user, comment=comment).exists()
    like_count = comment.comment_like.count()
    return JsonResponse({'liked': liked, 'like_count': like_count}, status=200)

def comments(request):
    """Liking a comment"""
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'User not authenticated'}, status=401)
    
    comment_id = request.POST.get('comment_id')
    user = request.user
    if not comment_id:
        return JsonResponse({'error': 'Invalid input'}, status=400)
        
    comment = get_object_or_404(Comment, pk=comment_id)

    comment_like = CommentLike.objects.filter(user=user, comment=comment).first()
        
    if comment_like:
        comment_like.delete()
        comment_count = comment.comment_like.count()
        return JsonResponse({'liked': False, 'like_count': comment_count}, status=200)
    else:
        try:
            CommentLike.objects.create(user=user, comment=comment)
            comment_count = comment.comment_like.count()
            return JsonResponse({'liked': True, 'like_count': comment_count}, status=200)
        except IntegrityError as e:
            return JsonResponse({'error': f'db err:{e}'}, status=500)