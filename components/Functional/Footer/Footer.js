import Link from 'next/link';
import styles from './Footer.module.css';
import Image from 'next/image';

export default function Footer() {
    return (
        <div className={styles.footer}>
            <div className={styles.footer__logo}>
                <Link href="/">
                        <a><Image src="/vercel.svg" alt="AndmeLoom logo" width={100} height={50}/></a>
                </Link>
            </div>
            <div className={styles.footer__links}>
                <Link href="/animals">
                    <a>Animals</a>
                </Link>
                <Link href="/appointments">
                    <a>Appointments</a>
                </Link>
                <Link href="/owners">
                    <a>Owners</a>
                </Link>
                <Link href="/profile">
                    <a>Profile</a>
                </Link>
            </div>
        </div>
    );
}
