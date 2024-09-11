from django.shortcuts import render, redirect
from .models import Post
from django.contrib.auth.decorators import login_required

# Create your views here.
@login_required
def create_post(request):
    if request.method == 'POST':
        content = request.POST['content']
        Post.objects.create(user=request.user, content=content)
        return redirect('some_view_name')
    return render(request, 'create_post.html')