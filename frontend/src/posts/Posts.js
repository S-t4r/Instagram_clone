import { Route, Routes } from 'react-router-dom';
import NewPost from './NewPost';
import './Posts.css'

export default function Posts() {
    return (
        <Routes>
            <Route path="" element={<NewPost />} />
        </Routes>
    )
}