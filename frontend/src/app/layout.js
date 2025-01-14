import '../app/globals.css';
import { UserContext, UserProvider } from '@/components/UserProvider/UserContext';
import { useContext } from 'react';
import Navbar from '@/components/layout/Navbar';

function Layout({ children }) {
    return (
        <UserProvider>
            <InnerLayout>{children}</InnerLayout>
        </UserProvider>
    );
}

const InnerLayout = ({ children }) => {
    const { user } = useContext(UserContext);

    return (
        <>
            <Navbar user={user} />
            {children}
        </>
    );
};

export default Layout;