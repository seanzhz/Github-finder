import React from 'react';
import {FaGithub} from "react-icons/fa";
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import UserSearch from "../users/UserSearch";


function Navbar({title}) {
    return (
        <nav className="navbar mb-12 shadow-lg bg-neutral text-neutral-content">
            <div className="container mx-auto">
                <div className="flex-none px-2 mx-2">
                    <FaGithub className="inline pr-2 text-3xl"/>
                    <Link to="/" className="text-lg font-bold align-middle">
                        {title}
                    </Link>
                </div>

                <div className="flex-1 px-2 mx-2">
                    <div className="flex justify-end">
                        <div className="form-control ">
                            <input type="text" placeholder="Search" className="input input-bordered" />
                        </div>
                        <Link to="/" className="btn btn-ghost btn-md rounded-btn">
                            Home
                        </Link>
                        <Link to="/about" className="btn btn-ghost btn-md rounded-btn">
                            About
                        </Link>
                    </div>

                </div>
            </div>
        </nav>
    );
}

Navbar.defaultProps = {
    title:'Github Finder',
}

Navbar.protoType = {
    title: PropTypes.string,
}

export default Navbar;