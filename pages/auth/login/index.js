import {useState} from "react";
import {useRouter} from "next/router";
import AuthService from "../../../functional/auth.js";
import LoadingSpinner from "../../../components/Style/LoadingSpinner";
import {useAuth} from "../../../functional/AuthContext";

export default function Login(props) {
    const router = useRouter();
    const { auth, user, setUser, setAuth } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await AuthService.login(email, password);
            if (response.token) {
                await router.push('/animals');
                setAuth(true);
                setUser(response);
            } else {
                setError(response.message);
            }
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
    }

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email</label>
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} autoComplete="on" name="email"/>
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="on" name="password" />
                </div>
                <div>
                    <button name="login" type="submit" disabled={loading}>{loading ? 'Loading...' : 'Login'}</button>
                </div>
                {error && <div>{error}</div>}
            </form>
        </div>
    );
}
