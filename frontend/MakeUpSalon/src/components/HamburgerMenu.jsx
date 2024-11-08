export default function HamburgerMenu({ openState, handleClose }) {
    return (
        <>
            <div
                className={`fixed top-16 left-1/2 transform -translate-x-1/2 w-4/5 p-6 bg-slate-700 rounded-lg shadow-lg text-white
                    ${openState ? "block" : "hidden"}`}
            >
                <ul className="flex flex-col items-center space-y-6 text-lg mx-auto">
                    <li>
                        <a
                            href="#"
                            className="block w-full p-2 text-center text-gray-50 hover:text-fuchsia-400"
                        >
                            Treatments
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="block w-full p-2 text-center text-gray-50 hover:text-fuchsia-400"
                        >
                            Professionals
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="block w-full p-2 text-center text-gray-50 hover:text-fuchsia-400"
                        >
                            Account
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="block w-full p-2 text-center text-gray-50 hover:text-fuchsia-400"
                        >
                            Appointments
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="block w-full p-2 text-center text-gray-50 hover:text-fuchsia-400"
                        >
                            Contact
                        </a>
                    </li>
                    <li>
                        <a
                            href="#"
                            className="block w-full p-2 text-center text-gray-50 hover:text-fuchsia-400"
                        >
                            Login
                        </a>
                    </li>
                    <button
                        className="block w-full p-2 text-right font-bold text-gray-50 hover:text-fuchsia-400"
                        onClick={handleClose}
                    >
                        X
                    </button>
                </ul>
            </div>
        </>
    );
}
