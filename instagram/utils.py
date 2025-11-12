import hashlib
from django.shortcuts import get_object_or_404
from comments.models import Comment
from posts.models import Post

def generate_etag(request, obj_type, obj_id):
    if obj_type == "comment":
        obj = get_object_or_404(Comment, pk=obj_id)
        etag = hashlib.md5(f"{obj_id}-{obj.comment_like.count()}".encode()).hexdigest()
    elif obj_type == "post":
        obj = get_object_or_404(Post, pk=obj_id)
        etag = hashlib.md5(f"{obj_id}-{obj.likes.count()}".encode()).hexdigest()
    return etag