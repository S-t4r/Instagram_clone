import Link from "next/link";

function Navbar({ user }) {
    return (
        // {user ? <LoggedInNavbar /> : <LoggedOutNavbar />}

        <nav>
            <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/register">Register</Link></li>
                <li><Link href="/login">Login</Link></li>
            </ul>
        </nav>
    )
};

export default Navbar;