import {useRouter} from "next/router";
import AuthService from "../../functional/auth.js";
import LoadingSpinner from "../../components/Style/LoadingSpinner";
import {useEffect, useState} from "react";

export default function AuthRedirect(props) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        async function checkAuth() {
            const user = await AuthService.getCurrentUser();
            if (user) {
                await router.push('/animals');
            } else {
                await router.push('/auth/login');
            }
        }
        checkAuth().then(() => {
            setLoading(false);
        });
    }, [router]);

    return loading ? <LoadingSpinner size={50} /> : props.children;
}
