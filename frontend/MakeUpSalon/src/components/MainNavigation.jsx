import { NavLink } from 'react-router-dom';

export default function MainNavigation() {
    return (
        <>
            <nav className="hidden lg:hidden xl:block">
                <ul className="flex items-center text-lg p-4">
                    <li>
                        <a
                            href="#"
                            className="block w-full p-2 text-center text-slate-400 hover:text-fuchsia-400"
                        >
                            Treatments
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="block w-full p-2 text-center text-slate-400 hover:text-fuchsia-400"
                        >
                            Professionals
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="block w-full p-2 text-center text-slate-400 hover:text-fuchsia-400"
                        >
                            Account
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="block w-full p-2 text-center text-slate-400 hover:text-fuchsia-400"
                        >
                            Appointments
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="block w-full p-2 text-center text-slate-400 hover:text-fuchsia-400"
                        >
                            Contact
                        </a>
                    </li>
                    <li>
                        <NavLink
                            to='/auth'
                            className="block w-full px-16 text-center text-slate-400 hover:text-fuchsia-400"
                        >
                            Authentication
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </>
    );
}