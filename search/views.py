from django.http import JsonResponse
from django.db.models import Q, F, Value, CharField
from django.db.models.functions import Concat
from users.models import User

# Create your views here.
def index(request):
    search_query = request.GET.get('query', '')
    # Perform search logic here
    results = User.objects.filter(
        Q(first_name__icontains=search_query) |
        Q(last_name__icontains=search_query) |
        Q(username__icontains=search_query)
    ).annotate(
        profile_image_url=Concat(Value('media/'), F('profile__profile_image'), output_field=CharField())
    ).values('username', 'profile_image_url')

    results_list = list(results)
    return JsonResponse({'results': results_list})