import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
    const isLogin = useSelector((state) => state.isLogin);
    console.log("the user is logged in: ", isLogin);

    return (
        <header className="bg-blue-600 text-white shadow-md">
            <nav className="container mx-auto flex items-center justify-between py-4 px-6">
                {/* Logo */}
                <h1 className="text-xl font-bold">My Blog App</h1>

                {/* Centered Navigation Links */}
                {isLogin && (
                    <>
                        <div className="flex-1 flex justify-center space-x-6">
                            <Link to="/" className="text-white hover:text-blue-400">
                                Blogs
                            </Link>
                            <Link to="/myBlogs" className="text-white hover:text-blue-400">
                                My Blogs
                            </Link>
                        </div>
                    </>
                )}

                {/* Authentication Links */}
                {!isLogin && (
                    <>
                        <div className="flex space-x-4">
                            <Link to="/login" className="px-4 py-2 rounded hover:bg-blue-500">
                                Login
                            </Link>
                            <Link
                                to="/register"
                                className="px-4 py-2 rounded hover:bg-blue-500"
                            >
                                Register
                            </Link>

                        </div>

                    </>
                )}
                {isLogin && (<>
                    <Link
                        to="/logout"
                        className="px-4 py-2 rounded hover:bg-blue-500"
                    >
                        Logout
                    </Link>
                </>)}
            </nav>
        </header>
    );
};

export default Header;
