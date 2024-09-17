from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from .models import Post, Comment
# Create your views here.
def index(request):
    if request.method == 'POST':
        comment_text = request.POST.get('comment')
        post_id = request.POST.get('post_id')
        user = request.user
        
        if not comment_text or comment_text.strip() == '':
            return JsonResponse({'status': "error", 'message': "Comment cannot be empty"})
        
        post = get_object_or_404(Post, pk=post_id)
        
        try:
            comment = Comment.objects.create(user=user, post=post, content=comment_text)
            return JsonResponse({'status': "ok", 'comment': comment.serialize()})
        except Exception as e:
            return JsonResponse({'status': "error", 'message': f"{str(e)}"})

    else:
        post_id = request.GET.get('post_id')
        if post_id:
            comments = Comment.objects.filter(post_id=post_id).order_by('-timestamp')
            serialized_comments = [comment.serialize() for comment in comments]
            return JsonResponse({'comments': serialized_comments})
        else:
            return JsonResponse({'error': 'post_id not provided'}, status=400)