import Link from 'next/link';
import styles from './Layout.module.css';
import Footer from '../Footer';
import Navbar from '../Navbar';
import AuthService from "../../../functional/AuthService";
import {useEffect, useState} from "react";

export default function Layout(props) {
    // create layout with navbar and footer
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        updateAuthData();
    }, []);

    function updateAuthData() {
        const user = AuthService.getCurrentUser();
        if (user) {
            setIsAuthenticated(true);
            setUserRole(user.role);
        } else {
            setIsAuthenticated(false);
            setUserRole('');
        }
    }
    return (
        <div className={styles.layout}>
            <Navbar isAuthenticated={isAuthenticated} userRole={userRole} />
            <div className={styles.content}>
                {props.children}
            </div>
            <Footer />
        </div>
    );
}
