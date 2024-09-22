import React, {useState, useEffect} from "react";
import { calcTime } from "../utils";
import './Notifications.css'

export default function Notification() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        fetch("notifications/user_notifications")
            .then(response => response.json())
            .then(data => {
                setNotifications(data.notifications)
            })
    }, []);

    useEffect(() => {
        fetch("notifications/")
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error)
            }
        });
    }, []);

    return (
        <div className="notifications">
            {notifications.map((notification, index) => (
                <div key={index} className="notifications-listing">
                    <a href={`/users/${notification.username}`}>{notification.username}</a>
                    <p>{notification.message}</p>
                    <sub>{calcTime({ timestamp:notification.timestamp })}</sub>
                </div>
            ))}
        </div>
    );
}