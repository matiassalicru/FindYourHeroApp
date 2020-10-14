import React from 'react'
import { useContext } from 'react'
import { authContext } from '../../auth/authContext'
import { types } from '../../types/types';

export const LoginScreen = ({ history }) => {


    const lastPath = localStorage.getItem('lastPath') || '/';

    const { dispatch } = useContext( authContext );


    const handleLogin = () => {
        const action = {
            type: types.login,
            payload: {
                name: 'Matias'
            }
        }
        
        dispatch(action);
        history.replace(lastPath);
    }

    return (
        <div className='container mt-5'>
            <h1>Login Screen</h1>
            <hr/>

            <button className='btn btn-primary' onClick={ handleLogin }>
                Login
            </button>
        </div>
    )
}
