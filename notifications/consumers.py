from channels.generic.websocket import AsyncWebsocketConsumer
from channels.layers import get_channel_layer
import json


class NotificationConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.channel_layer = get_channel_layer()

        print(f"User authenticated: {self.scope['user'].is_authenticated}")
        print(self.scope['user'])
        if self.scope["user"].is_authenticated:
            self.group_name = f"user_{self.scope['user'].id}"
            await self.channel_layer.group_add(self.group_name, self.channel_name)
            await self.accept()
        else:
            await self.close()

    async def disconnect(self, close_code):
        if hasattr(self, 'group_name'):
            await self.channel_layer.group_discard(self.group_name, self.channel_name)
            
    async def receive(self, text_data):
        from notifications.models import Notification
        user = self.scope["user"]
        unread_count = Notification.objects.filter(user=user, is_read=False).count()
        await self.send(text_data=json.dumps({'unread_count': unread_count}))

    async def notification_message(self, event):
        message = event['message']
        await self.send(text_data=json.dumps(message))




class YourConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        print(f"Session ID: {self.scope['session'].session_key}")
        print(f"User authenticated: {self.scope['user'].is_authenticated}")
        print(f"User: {self.scope['user']}")


        
# class MessageConsumer(AsyncWebsocketConsumer):
#     async def connect(self):
#         await self.accept()

#     async def disconnect(self, close_code):
#         pass

#     async def receive(self, text_data):
#         await self.send(text_data=json.dumps({
#             'message': 'Message received!'
#         }))