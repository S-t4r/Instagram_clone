# Instagram Clone

- A Single Page Application written in Django and React.

## Distinctiveness and Complexity

- This project is written with React as the front-end and Django as the backend. For every feature that is implemented I have defined an app and their own Models. The ability to receive notifications when an event happens is one of the main features of my project that is implemented in its own app. I used signal receivers to create new notification objects and raise an event.

### SPA

- Every feature of this project is implemented as a Single Page Application. Using fetch requests to get/send data from/to front-end without ever needing to reload the page. The data is being saved in **Cache** memory to have quick access to. Once some data has been changed the server will only send the newly created data, otherwise the data is fetched from cache.

### File Structure

#### Django

- This project has been broken down to very simple pieces as every feature has its own application. The file and app structure for the backend is as follows:
    1. users;
    2. posts;
    3. comments;
    4. likes;
    5. notifications;
    6. direct_messages;
    7. search;

#### React

- On the front-end I created a directory for each of the applications implemented in Django to keep the related codes organized. I also created a layout directory to create the layout of my application. Some useful functions has been defined in **utils.js** so I could have access to them easily. *getCSRFToken()* for forms, *useCustomNavigate()* to change the url without reloading, and *calcTime()* to calculate the time passed.
- The userContext directory separates the logic for the user to keep track of their identity across the project. The application is wrapped in a UserProvider and will grant access only people that are logged in. ProtectedRoute has been defined to block those who are not logged in from accessing the routes that they are not allowed to visit.

## Description

- Users have a Profile that shows their profile picture, their first and last name, and their bio. Each user have the ability to edit their information when visiting their profile. The User also has the ability to post a picture with caption. The posts can liked and commented on by others. The comments can also be liked by other users. Once a post is liked or commented on, or a comments has been liked a notification will be sent to the user informing them of the action. A post can be edited, and just like comments it can be removed by their owners.
- Once logged in, a user could search for other users by their username, first name, and last name. Users can follow anyone they wish and the posts of their followings will be shown in their Home feed. They also can send direct messages to each other. I used Paginator for loading posts and messages to prevent loading them all at once. To prevent sending unnecessary requests for information that the user already have I cache the information and will only send new data once there has been a modification on the data else data value will be set to cached values.
- From every aspect this project is build as a Single Page Application. It was a real challenge but I noticed something along the way, everything's possible it just needs time to be spent on.
- The admin panel has been modified to manage Users, Chats, Notifications, Posts, and Comments.

- Here is what the User Interface looks like;
- <img src="https://github.com/user-attachments/assets/aaab4b69-6817-43d2-b3db-a7016ce32440" alt="pic" width="200" height="200">
- <img src="<https://github.com/user-attachments/assets/efb9b097-04ea-4f90-95e4-f131e7b2c8e7>" alt="pic"width="200" height="200">
- <img src="<https://github.com/user-attachments/assets/32769b21-d989-4451-b278-fd239bfbc746>" alt="pic"width="200" height="200">
- <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/115424857/371868303-5d81c6df-cf9d-45ed-a0d5-329e1f748f0f.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20240929%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240929T155624Z&X-Amz-Expires=300&X-Amz-Signature=edf7af6bf9a8a26f30f143f7c8a09cb8e7bb3f1667e70415267cfc20a546645f&X-Amz-SignedHeaders=host" alt="pic" width="200" height="200">
- <img src="<https://github.com/user-attachments/assets/a20fe1ab-e4ef-4ab6-9272-6e26ad78cb6c>" alt="pic"width="200" height="200">

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

### My last thought

- This was a great learning experience, I learnt so much about Django and specially about React. Initially I submitted a very week final project and it was rightfully rejected and I'm glad that it was rejected. I got to experience and appreciate the tools that
 are available to us nowadays.
- **THIS WAS NOT POSSIBLE WITHOUT THE DUCK.** (aka. cs50.ai)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
