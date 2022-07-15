import Link from 'next/link';
import styles from './Navbar.module.css';
import Image from 'next/image';
import AuthService from '../../../functional/AuthService';
import {useEffect, useState} from "react";
import {useAuth} from "../../../functional/AuthContext";

export default function Navbar(props) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState('');
    const { auth, user, setUser, setAuth } = useAuth();

    useEffect(() => {
        setIsAuthenticated(auth);
        setUserRole(user.roles[0]);
    }, [auth, user]);

    return (
        <div className={styles.navbar}>
            <div className={styles.navbar__logo}>
                <Link href="/">
                    <a><Image src="/vercel.svg" alt="AndmeLoom logo" width={100} height={50}/></a>
                </Link>
            </div>
            <div className={styles.navbar__links}>
                <Link href="/animals">
                    <a>Animals</a>
                </Link>
                <Link href="/appointments">
                    <a>Appointments</a>
                </Link>
                {userRole === 'ROLE_ADMIN' && <Link href="/owners">
                    <a>Owners</a>
                </Link>}

                <Link href="/profile">
                    <a>Profile</a>
                </Link>
                {isAuthenticated ? <Link href="/auth/login">
                    <a onClick={() => {
                        AuthService.logout();
                        setUser({
                            "token": "",
                            "type": "",
                            "id": "",
                            "username": "",
                            "email": "",
                            "roles": [
                                ""
                            ]
                        });
                        setAuth(false);
                    }}>Logout</a>
                </Link> : (<><Link href="/auth/login">
                    <a>Login</a>
                </Link> <Link href="/auth/signup">
                    <a>Signup</a>
                </Link></>)}

            </div>
        </div>
    );
}
