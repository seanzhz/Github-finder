import React, {useContext, useEffect} from 'react';
import githubContext from "../context/GithubContext";
import {Link, useParams} from "react-router-dom";
import {FaCodepen, FaStore, FaTwitter, FaUserFriends, FaUsers, FaChevronLeft} from "react-icons/fa";
import Spinner from "../components/layout/Spinner";
import Repos from "../components/repos/Repos";
import {getUserDetail} from "../context/GithubActions";


function User() {

    const {loading, user, repos,dispatch} = useContext(githubContext)
    const params = useParams()

    const
        {
            name, type, avatar_url,
            location, bio, blog,
            twitter_username, login,
            html_url, followers,
            following, public_repos,
            public_gists, hireable
        } = user

    useEffect( () => {
        dispatch({type:'SET_LOADING'})
        return () => {
            const getUserData = async ()=>{
                const userData = await getUserDetail(params.login)
                dispatch({type:'GET_USER_AND_REPOS',payload:userData})

            }
            getUserData()
        };
    },[dispatch,params.login]);
    //Fine: this thing are not constantly changing,
    if (loading) {
        return (<Spinner/>)
    }
    return (
        <div className='w-full mx-auto lg:w-10/12'>
            <div className='mb-4'>
                <Link to='/' className='btn btn-ghost'>
                    <FaChevronLeft className='text-2xl'/>
                    Back to search</Link>
            </div>

            <div className='grid grid-cols-1 xs:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 mb-8 md:gap-8'>
                <div className='custom-card-image mb-6 md:mb-0'>
                    <div className='rounded-lg shadow-xl card image-full'>
                        <figure>
                            <img src={avatar_url} alt={login}/>
                        </figure>
                        <div className='card-body justify-end'>
                            <h2 className='card-title mb-0'>{name}</h2>
                            <p>{login}</p>
                        </div>
                    </div>
                </div>
                <div className='col-span-2'>
                    <div className='mb-6'>
                        <h1 className='text-3xl card-title'>
                            {name}
                            <div className='ml-2 mr-1 badge badge-success'>
                                {type}
                            </div>
                            {hireable && (
                                <div className='mx-1 badge badge-info'>
                                    Hire-able
                                </div>
                            )}
                        </h1>
                        <p>{bio}</p>
                        <div className='mt-4 card-actions'>
                            <a href={html_url} target='_blank' rel="noreferrer" className='btn btn-outline'>
                                Visit Github Profile
                            </a>
                        </div>
                    </div>

                    <div className='w-full rounded-lg shadow-md bg-base-100 stats'>
                        {location && (
                            <div className='stat'>
                                <div className='stat-title text-md'>Location</div>
                                <div className='text-lg stat-value'>{location}</div>
                            </div>
                        )}
                        {blog && (
                            <div className='stat'>
                                <div className='stat-title text-md'>Website</div>
                                <div className='text-lg stat-value'>
                                    {/*//TODO:BASED ON LENGTH TO DISPLAY*/}
                                    <a href={blog} target="_blank" rel="noreferrer"
                                       className='btn btn-outline btn-sm'>{blog}</a>
                                </div>
                            </div>
                        )}

                        {twitter_username && (
                            <div className='stat'>
                                <div className='stat-title text-md'>
                                    <FaTwitter className="inline pr-2 text-2xl"/>
                                    Twitter
                                </div>
                                <div className='text-lg stat-value'>
                                    {/*//TODO:BASED ON LENGTH TO DISPLAY*/}
                                    <a href={`https://twitter.com/${twitter_username}`} target="_blank" rel="noreferrer"
                                    >{twitter_username}</a>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className='w-full py-5 mb-6 rounded-lg shadow-md bg-base-100 stats'>
                <div className='stat'>
                    <div className='stat-figure textarea-secondary'>
                        <FaUsers className='text-3xl md:text-5xl'/>
                     </div>
                    <div className='stat-title pr-5'>Followers</div>
                    <div className='stat-value pr-5 text-3xl md:text-4xl'>{followers}</div>
                </div>

                <div className='stat'>
                    <div className='stat-figure textarea-secondary'>
                        <FaUserFriends className='text-3xl md:text-5xl'/>
                    </div>
                    <div className='stat-title pr-5'>Following</div>
                    <div className='stat-value pr-5 text-3xl md:text-4xl'>{following}</div>
                </div>

                <div className='stat'>
                    <div className='stat-figure textarea-secondary'>
                        <FaCodepen className='text-3xl md:text-5xl'/>
                    </div>
                    <div className='stat-title pr-5'>Public Repos</div>
                    <div className='stat-value pr-5 text-3xl md:text-4xl'>{public_repos}</div>
                </div>

                <div className='stat'>
                    <div className='stat-figure textarea-secondary'>
                        <FaStore className='text-3xl md:text-5xl'/>
                    </div>
                    <div className='stat-title pr-5'>Public Gists</div>
                    <div className='stat-value pr-5 text-3xl md:text-4xl'>{public_gists}</div>
                </div>
            </div>

            <Repos repos={repos}/>
        </div>
    );

}

export default User;