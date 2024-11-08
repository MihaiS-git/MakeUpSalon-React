import ClassicMenu from "./ClassicMenu.jsx";
import Hamburger from "./Hamburger.jsx";

export default function Header() {
    return (
        <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-slate-950 to-fuchsia-950 z-10 flex justify-between align-middle">
            <h1 className="max-w-md font-serif text-left  font-bold text-slate-400 py-4 px-8 text-3xl lg:text-4xl">
                MakeUp Salon
            </h1>
            <ClassicMenu />
            <Hamburger />
        </header>
    );
}
