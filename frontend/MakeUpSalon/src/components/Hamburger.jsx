import { useState } from "react";
import HamburgerMenu from "./HamburgerMenu";

export default function Hamburger() {
    const [isOpen, setIsOpen] = useState(false);

    function toggleHamburger() {
        setIsOpen(!isOpen);
    }

    function closeHamburger() {
        setIsOpen(false);
    }

    return (
        <>
            {!isOpen && (
                <div
                    className="p-3 w-12 h-12 mt-4 me-4 space-y-2 bg-gray-600 rounded shadow xl:hidden"
                    onClick={toggleHamburger}
                >
                    <span className="block w-6 h-0.5 bg-gray-100 animate-pulse"></span>
                    <span className="block w-6 h-0.5 bg-gray-100 animate-pulse"></span>
                    <span className="block w-6 h-0.5 bg-gray-100 animate-pulse"></span>
                </div>
            )}
            
            {isOpen && (
                <HamburgerMenu
                    openState={isOpen}
                    handleClose={closeHamburger}
                />
            )}
        </>
    );
}
