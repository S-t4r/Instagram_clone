from django.contrib import admin

from .models import Post
from comments.models import Comment
from likes.models import CommentLike, Like

# Register your models here.

class CommentInline(admin.StackedInline):
    model = Comment
    extra = 1
    can_delete = True

class LikeInline(admin.TabularInline):
    model = Like
    extra = 1
    autocomplete_fields = ['user']

class CommentLikeInline(admin.TabularInline):
    model = CommentLike
    extra = 1
    autocomplete_fields = ['user']


class PostAdmin(admin.ModelAdmin):
    inlines = [CommentInline, LikeInline]
    list_display = ('title', 'profile', 'like_count', 'comment_like_count')

    def like_count(self, obj):
        return obj.likes.count()
    like_count.short_description = 'Likes'

    def comment_like_count(self, obj):
        return sum(comment.comment_like.count() for comment in obj.comments.all())
    comment_like_count.short_description = 'Comment Likes'

admin.site.register(Post, PostAdmin)