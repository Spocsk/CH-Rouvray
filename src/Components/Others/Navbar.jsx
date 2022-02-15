import React from 'react';
import logo from '../../Assets/Images/logo_header.png'
import { getUser, removeUserSession } from '../../Utils/Common';
import { useNavigate } from 'react-router-dom';

function Navbar() {

    const user = getUser();
    const navigate = useNavigate()
    let redirectToLogin = () => navigate("/")

    // handle click event of logout button
    const handleLogout = () => {
        removeUserSession();
        redirectToLogin();
    }

    return (
        <nav style={{backgroundColor: 'rgb(39,44,52)'}} className="flex items-center justify-between flex-wrap p-3 m-0">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
            <img
                  className="mx-auto h-12 w-auto"
                  src={logo}
                  alt="logo"
                />
            <span className=" ml-4 font-semibold text-xl tracking-tight">CH Rouvray</span>
            </div>
            <div className="block lg:hidden">
                <button className="flex items-center px-3 py-2 border rounded text-blue-200 border-blue-400 hover:text-white hover:border-white">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                </button>
                <button className="flex items-center px-3 py-2 border rounded text-blue-200 border-blue-400 hover:text-white hover:border-white">
                                    </button>
            </div>
            <div className="w-full flex flex-grow lg:flex lg:items-center lg:w-auto">
                <div className="text-sm flex lg:flex-grow justify-end">
                    <a className="flex mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4">
                        Bonjour, <p className="italic" >{user.firstName}</p>
                    </a>
                </div>
                <input style={{cursor: 'pointer'}} className="bg-red-500 hover:bg-blue-600 text-sm text-white font-light p-2 rounded" type="button" onClick={handleLogout} value="Quitter" />
            </div>
        </nav>
    );
}

export default Navbar;