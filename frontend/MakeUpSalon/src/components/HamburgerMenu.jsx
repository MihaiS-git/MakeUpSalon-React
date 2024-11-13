import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../store/auth-slice";

export default function HamburgerMenu({ openState, handleClose }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    function handleLogout() {
        dispatch(logout());
        navigate("/auth");
        handleClose();
    }

    return (
        <>
            <div
                className={`fixed top-16 left-1/2 transform -translate-x-1/2 w-4/5 p-6 bg-slate-700 rounded-lg shadow-lg text-white z-50
                    ${openState ? "block" : "hidden"}`}
            >
                <ul className="flex flex-col items-center space-y-6 text-lg mx-auto">
                    <li>
                        <Link
                            to="/treatments"
                            className="block w-full p-2 text-center text-slate-200 hover:text-fuchsia-400"
                            onClick={handleClose}
                        >
                            Treatments
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/professionals"
                            className="block w-full p-2 text-center text-slate-200 hover:text-fuchsia-400"
                            onClick={handleClose}
                        >
                            Professionals
                        </Link>
                    </li>
                    {isAuthenticated && (
                        <li>
                            <a
                                href="#"
                                className="block w-full p-2 text-center text-slate-200 hover:text-fuchsia-400"
                                onClick={handleClose}
                            >
                                Account
                            </a>
                        </li>
                    )}
                    {isAuthenticated && (
                        <li>
                            <a
                                href="#"
                                className="block w-full p-2 text-center text-slate-200 hover:text-fuchsia-400"
                                onClick={handleClose}
                            >
                                Appointments
                            </a>
                        </li>
                    )}
                    {isAuthenticated && (
                        <li>
                            <a
                                href="#"
                                className="block w-full p-2 text-center text-slate-200 hover:text-fuchsia-400"
                                onClick={handleClose}
                            >
                                Cart
                            </a>
                        </li>
                    )}
                    <li>
                        <Link
                            to="/contact"
                            className="block w-full p-2 text-center text-slate-200 hover:text-fuchsia-400"
                            onClick={handleClose}
                        >
                            Contact
                        </Link>
                    </li>
                    <li>
                        {isAuthenticated ? (
                            <button
                                onClick={handleLogout}
                                className="block w-full px-16 text-center text-slate-200 hover:text-fuchsia-400"
                            >
                                Logout
                            </button>
                        ) : (
                            <NavLink
                                to="/auth"
                                className="block w-full p-2 text-center text-slate-200 hover:text-fuchsia-400"
                                onClick={handleClose}
                            >
                                Authentication
                            </NavLink>
                        )}
                    </li>
                    <button
                        className="block w-full p-2 text-right font-bold text-slate-200 hover:text-fuchsia-400"
                        onClick={handleClose}
                    >
                        X
                    </button>
                </ul>
            </div>
        </>
    );
}
