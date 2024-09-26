from django.contrib import admin
from .models import Chat, Message
# Register your models here.
class MessageAdmin(admin.ModelAdmin):
    list_display = ('sender', 'receiver', 'timestamp')

class ChatAdmin(admin.ModelAdmin):
    list_display = ('get_participants', 'timestamp')

    def get_participants(self, obj):
        return ", ".join([user.username for user in obj.participants.all()])
    get_participants.short_description = 'Participants'


admin.site.register(Message, MessageAdmin)
admin.site.register(Chat, ChatAdmin)