import React, {useContext} from 'react';
import Spinner from "../layout/Spinner";
import UserItem from "./UserItem";
import GithubContext from "../../context/GithubContext";

function UserList(props) {
    const {users,loading} = useContext(GithubContext);


    if(!loading) {
        return (
            <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
                {users.map((userObj) => (
                    <UserItem key={userObj.id} user={userObj}/>
                ))}
            </div>
        )
    }
    else{
        return <Spinner/>
    }
}

export default UserList;