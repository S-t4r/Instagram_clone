import { useNavigate } from "react-router-dom";

export default function Message({ username }) {
    const navigate = useNavigate();
    return (
        <button onClick={() => navigate(`/direct_messages/${username}`)}>
            Message
        </button>
    );
}