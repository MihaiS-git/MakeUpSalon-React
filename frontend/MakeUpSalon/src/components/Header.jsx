import { Link } from "react-router-dom";

import MainNavigation from "./MainNavigation.jsx";
import Hamburger from "./Hamburger.jsx";

export default function Header() {
    return (
        <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-slate-950 to-fuchsia-950 z-10 flex justify-between align-middle">
            <Link to='/home'>
                <h1 className="max-w-md text-left font-bold text-slate-400 py-4 px-8 text-3xl lg:text-4xl">
                    MakeUp Salon
                </h1>
            </Link>
            <MainNavigation />
            <Hamburger />
        </header>
    );
}
