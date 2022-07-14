import {useRouter} from "next/router";
import {useState} from "react";
import StyleButton from "../../../components/Style/StyleButton";
import AuthService from "../../../functional/auth.js";

export default function Signup(props) {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const [passwordRepeatError, setPasswordRepeatError] = useState('');
    const [firstname, setFirstname] = useState('');
    const [firstnameError, setFirstnameError] = useState('');
    const [lastname, setLastname] = useState('');
    const [lastnameError, setLastnameError] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [redirect, setRedirect] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const response = await AuthService.register(firstname, email, password);
            if (response.status === 200) {
                await router.push('/auth/login');
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
    }

    if (redirect) {
        router.push('/animals').then(() => {
            window.location.reload();
        }).catch(error => {
            console.log(error);
        });
        return <h1>Redirecting</h1>
    }

    function onChangePasswordRepeat(e) {
        setPasswordRepeat(e.target.value);
        // check if passwords match
        if (password === e.target.value) {
            setPasswordRepeatError('');
        } else {
            setPasswordRepeatError('Passwords do not match');
        }
    }

    return (
        <div>
            <h1>Signup</h1>
            <form onSubmit={handleSubmit}>
                {error && <div>{error}</div>}
                <div>
                    <label>First Name</label>
                    <input type="text" name="first-name" value={firstname} onChange={(e) => setFirstname(e.target.value)} autoComplete="on"/>
                    {firstnameError && <div>{firstnameError}</div>}
                </div>
                <div>
                    <label>Last Name</label>
                    <input type="text" name="last-name" value={lastname} onChange={(e) => setLastname(e.target.value)} autoComplete="on" />
                    {lastnameError && <div>{lastnameError}</div>}
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} autoComplete="on" />
                    {emailError && <div>{emailError}</div>}
                </div>
                <div>
                    <label>Password</label>
                    <input type="password" name="new-password" value={password} onChange={e => setPassword(e.target.value)} autoComplete="on" />
                    {passwordError && <div>{passwordError}</div>}
                </div>
                <div>
                    <label>Repeat Password</label>
                    <input type="password" name="new-password-repeat" value={passwordRepeat} onChange={onChangePasswordRepeat} autoComplete="on" />
                    {passwordRepeatError && <div>{passwordRepeatError}</div>}
                </div>
                <div>
                    {loading ? <StyleButton loading disabled={loading}>Signup</StyleButton> : <StyleButton type="submit">Signup</StyleButton>}
                </div>
            </form>
        </div>
    );
}
