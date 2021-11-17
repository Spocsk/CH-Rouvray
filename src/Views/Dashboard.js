import React from 'react';
import { getUser, removeUserSession } from '../Utils/Common';
import { useNavigate } from 'react-router-dom';

function Dashboard(props) {
    const user = getUser();
    const navigate = useNavigate()
    let redirectToLogin = () => navigate("/login")

    // handle click event of logout button
    const handleLogout = () => {
        removeUserSession();
        redirectToLogin();
    }

    return (
        <div>
            Welcome {user.firstName}!<br /><br />
            <input type="button" onClick={handleLogout} value="Logout" />
        </div>
    );
}

export default Dashboard;