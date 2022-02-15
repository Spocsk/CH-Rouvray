import { LockClosedIcon } from '@heroicons/react/solid'
import logo from '../Assets/Images/logo_header.png'
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
    const redirectToDashboard = () => navigate('dashboard')

    // handle button click of login form
    const handleLogin = async (props) => {
        setError(null);
        setLoading(true);
        await axios.post(`${process.env.REACT_APP_URL_API}/login`,
            { 
              email: username.value, 
              plainPassword: password.value 
            })
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
                else setError("Une erreur est survenue, s'il vous plaît, réessayez !");
            });
    }

    const handleGetMyData = async () => {
        setError(null);
        setLoading(false);
        await axios.get(`${process.env.REACT_APP_URL_API}/me`,
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
                else setError("Une erreur est survenue, s'il vous plaît, réessayez !");
            });
    }

    return (
        <>
          <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
              <div>
                <img
                  className="mx-auto h-12 w-auto"
                  src={logo}
                  alt="logo"
                />
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Connectez-vous à votre compte</h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                  <a className="font-medium text-indigo-600 hover:text-indigo-500">
                    Commencez à utiliser l'application du CH Rouvray
                  </a>
                </p>
              </div>
              <form className="mt-8 space-y-6" action="#" method="POST">
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="rounded-md shadow-sm -space-y-px">
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      Adresse email
                    </label>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      {...username}
                      autoComplete="email"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Adresse email"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Mot de passe
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      {...password}
                      autoComplete="current-password"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Mot de passe"
                    />
                  </div>
                </div>
    
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                      Se souvenir de moi ?
                    </label>
                  </div>
    
                  <div className="text-sm">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Mot de passe oublié ?
                    </a>
                  </div>
                </div>
    
                <div>
                  <button
                    type="button"
                    value={loading ? 'Loading...' : 'Login'} 
                    onClick={handleLogin} 
                    disabled={loading}
                    className="group relative w-full flex justify-center py-2 px-4 text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <LockClosedIcon className="h-5 w-5 text-white group-hover:text-white" aria-hidden="true" />
                    </span>
                    Connexion
                  </button>
                </div>
                {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
              </form>
            </div>
          </div>
        </>
      )
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

