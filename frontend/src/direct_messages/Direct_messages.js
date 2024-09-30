import { Route, Routes } from 'react-router-dom';

import ChatWindow from './ChatWindow';
import ChatList from './ChatList';

export default function Direct_messages() {
    return (
        <Routes>
            <Route path='' element={<ChatList />} />
            <Route path=':username' element={<ChatWindow />} />
        </Routes>
    );
}