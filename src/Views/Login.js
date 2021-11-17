import React, { useState } from 'react';
import axios from 'axios';
import { setTokenSession, setUserSession, getToken } from '../Utils/Common';
import { useNavigate } from 'react-router-dom';



function Login(props) {
    const [loading, setLoading] = useState(false);
    const username = useFormInput('');
    const password = useFormInput('');
    const [error, setError] = useState(null);
    const navigate = useNavigate()
    let redirectToDashboard = () => navigate("/dashboard")

    // handle button click of login form
    const handleLogin = async (props) => {
        setError(null);
        setLoading(true);
        await axios.post('http://localhost:8000/api/login',
            { username: username.value, password: password.value })
            .then(async response => {
                setLoading(false);
                setTokenSession(response.data.token);
                await handleGetMyData().then(() => {
                    redirectToDashboard();
                })
            })
            .catch(error => {
                console.log(error)
                setLoading(false);
                if (error.status === 401) setError(error.response.data.detail);
                else setError("Something went wrong. Please try again later.");
            });
    }

    const handleGetMyData = async () => {
        setError(null);
        setLoading(false);
        await axios.get('http://localhost:8000/api/me',
            {
                headers: {
                    Accept: 'application/ld+json',
                    Authorization: 'bearer ' + getToken()
                }
            }
            )
            .then(response => {
                setLoading(false);
                setUserSession(response.data);
            })
            .catch(error => {
                console.log(error)
                setLoading(false);
                if (error.status === 401) setError(error.response.data.detail);
                else setError("Something went wrong. Please try again later.");
            });
    }


    return (
        <div>
            Login<br /><br />
            <div>
                Username<br />
                <input type="text" {...username} autoComplete="new-password" />
            </div>
            <div style={{ marginTop: 10 }}>
                Password<br />
                <input type="password" {...password} autoComplete="new-password" />
            </div>
            {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
            <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
        </div>
    );
}

const useFormInput = initialValue => {
    const [value, setValue] = useState(initialValue);

    const handleChange = e => {
        setValue(e.target.value);
    }
    return {
        value,
        onChange: handleChange
    }
}

export default Login;