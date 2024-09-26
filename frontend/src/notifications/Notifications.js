import React, {useState, useEffect} from "react";
import { calcTime } from "../utils";
import './Notifications.css'

export default function Notification() {
    const [notifications, setNotifications] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        fetch(`notifications/user_notifications?page=${page}`)
            .then(response => response.json())
            .then(data => {
                const newNotifications = data.notifications.filter(notification => !notifications.some(existingNotification => existingNotification.id === notification.id));
                const filteredNotifications = [...notifications, ...newNotifications].filter((notification, index, self) => 
                    index === self.findIndex((p) => p.id === notification.id)
                );
                setNotifications(prevNotifications => [...prevNotifications, ...newNotifications]);
                setHasMore(data.notifications.length === 10);
            })
    }, [page]);

    const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== 
                document.documentElement.offsetHeight 
            || !hasMore) {
                return
            };
        setPage(prevPage => prevPage + 1);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasMore]);

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