import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../store/auth-slice";

export default function MainNavigation() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    function handleLogout() {
        dispatch(logout());
        navigate("/auth");
    }

    return (
        <>
            <nav className="hidden lg:hidden xl:block">
                <ul className="flex items-center text-lg p-4">
                    <li>
                        <Link
                            to="/treatments"
                            className="block w-full p-2 text-center text-slate-400 hover:text-fuchsia-400"
                        >
                            Treatments
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/professionals"
                            className="block w-full p-2 text-center text-slate-400 hover:text-fuchsia-400"
                        >
                            Professionals
                        </Link>
                    </li>
                    {isAuthenticated && (
                        <li>
                            <a
                                href="#"
                                className="block w-full p-2 text-center text-slate-400 hover:text-fuchsia-400"
                            >
                                Appointments
                            </a>
                        </li>
                    )}
                    {isAuthenticated && (
                        <li>
                            <Link
                                to="/cart"
                                className="block w-full p-2 text-center text-slate-400 hover:text-fuchsia-400"
                            >
                                Cart
                            </Link>
                        </li>
                    )}
                    {isAuthenticated && (
                        <li>
                            <Link
                                to="/myAccount"
                                className="block w-full p-2 text-center text-slate-400 hover:text-fuchsia-400"
                            >
                                Account
                            </Link>
                        </li>
                    )}
                    <li>
                        <Link
                            to="/contact"
                            className="block w-full p-2 text-center text-slate-400 hover:text-fuchsia-400"
                        >
                            Contact
                        </Link>
                    </li>
                    <li>
                        {isAuthenticated ? (
                            <button
                                onClick={handleLogout}
                                className="block w-full px-16 text-center text-slate-400 hover:text-fuchsia-400"
                            >
                                Logout
                            </button>
                        ) : (
                            <NavLink
                                to="/auth"
                                className="block w-full px-16 text-center text-slate-400 hover:text-fuchsia-400"
                            >
                                Authentication
                            </NavLink>
                        )}
                    </li>
                </ul>
            </nav>
        </>
    );
}
