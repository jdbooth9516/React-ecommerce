import { useState } from 'react';
import { Redirect } from "react-router-dom";

const Logout = () => {
    const [loggedIn, setLoggedIn] = useState(true);

    const logoutUser = () => {
        if (loggedIn == true) {
            setLoggedIn(false);
            localStorage.removeItem('token');
            console.log("logout user is being hit")
        }
        else {
            console.log("no user");
        }
    }

    return (
        <Redirect to="/dashboard" {...logoutUser()}/>
    )
}

export default Logout;