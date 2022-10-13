import React, {useContext, useState} from 'react';
import githubContext from "../../context/GithubContext";
import alertContext from "../../context/AlertContext";
import {searchUsers} from "../../context/GithubActions";

function UserSearch(props) {

    const [text, setText] = useState('');


    const {users, dispatch} = useContext(githubContext);
    const {setAlert} = useContext(alertContext)

    const handleChange = (e) => {
        setText(e.target.value)
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        if (text === '') {
            setAlert('Please enter username', 'error')
        } else {
            //TODO: search users
            dispatch({type: 'SET_LOADING'})
            const users = await searchUsers(text)
            dispatch({type: 'GET_USERS', payload: users})
            setText('')
        }
    }

    const handleClear = () => {
        dispatch({type: 'CLEAR_USERS'})
    }
    return (
        <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8'>
            <div>
                <form onSubmit={handleSubmit}>
                    <div className='relative'>
                        <input className='w-full pr-40 bg-gray-200 input input-md text-black'
                               placeholder='Search'
                               value={text}
                               onChange={handleChange}/>
                        <button className='absolute top-0 right-0 rounded-l-none w-36 btn btn-md'>
                            Go
                        </button>
                    </div>
                </form>
            </div>
            {users.length > 0 && (
                <div>
                    <button className='btn btn-ghost btn-md' onClick={handleClear}>Clear</button>
                </div>)}

        </div>
    );
}

export default UserSearch;