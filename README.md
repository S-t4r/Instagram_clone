# Instagram Clone
- A Single Page Application written in Django and React.

## Description
- Users have a Profile that shows their profile picture, their first and last name, and their bio. Each user have the ability to edit their information when visiting their profile. The User also has the ability to post a picture with caption. The posts can liked and commented on by others. The comments can also be liked by other users. Once a post is liked or commented on, or a comments has been liked a notification will be sent to the user informing them of the action. A post can be edited, and just like comments it can be removed by their owners.

- Once logged in, a user could search for other users by their username, first name, and last name. Users can follow anyone they wish and the posts of their followings will be shown in their Home feed. They also can send direct messages to each other. I used Paginator for loading posts and messages to prevent loading them all at once. To prevent sending unnecessary requests for information that the user already have I cache the information and will only send new data once there has been a modification on the data else data value will be set to cached values.

- From every aspect this project is build as a Single Page Application. It was a real challenge but I noticed something along the way, everything's possible it just needs time to be spent on. 

- The admin panel has been modified to manage Users, Chats, Notifications, Posts, and Comments.

- Here is what the User Interface looks like;
![Screenshot from 2024-09-29 19-00-41](https://github.com/user-attachments/assets/efb9b097-04ea-4f90-95e4-f131e7b2c8e7)
![Screenshot from 2024-09-29 19-00-05](https://github.com/user-attachments/assets/aaab4b69-6817-43d2-b3db-a7016ce32440)
![Screenshot from 2024-09-29 18-59-49](https://github.com/user-attachments/assets/5d81c6df-cf9d-45ed-a0d5-329e1f748f0f)
![Screenshot from 2024-09-29 18-58-38](https://github.com/user-attachments/assets/32769b21-d989-4451-b278-fd239bfbc746)
![Screenshot from 2024-09-29 19-07-22](https://github.com/user-attachments/assets/a20fe1ab-e4ef-4ab6-9272-6e26ad78cb6c)

## Installation

Steps to install the project:

1. Clone the repository

2. run `pip install requirements.txt`

3. run `python manage.py runserver`

## Usage

- This project can be used as a private social media between a hand selected people you choose on a server on your liking. you can almost do everything a social media has to offer in here.

  

## Contributing

- This project needs time to be spent on. It has lots of potential and lots of opportunities to improve the design.

- The ASGI branch needs to be implemented to use WebSockets, currently the user is requesting for notifications every 60 seconds which is not a good User Experience.

- Any thoughts and criticism are welcomed!


### My last thought;
- This was a great learning experience, I learnt so much about Django and specially about React. Initially I submitted a very week final project and it was rightfully rejected and I'm glad that it was rejected. I got to experience and appreciate the tools that
 are available to us nowadays.
- **THIS WAS NOT POSSIBLE WITHOUT THE DUCK.** (aka. cs50.ai)

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
