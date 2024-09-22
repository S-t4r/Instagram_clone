import { useEffect } from "react";

export default function Direct_messages() {
    useEffect(() => {
        fetch('direct_messages/')
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
    }, []);
    return (
        <div>
            hi
        </div>
    );
}