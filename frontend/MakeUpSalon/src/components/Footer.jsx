import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className='fixed bottom-0 left-0 w-full text-base text-fuchsia-950 text-center bg-slate-500 p-4 font-extrabold opacity-50'>
            <p>
                <Link>Mihai Suciu @ 2024</Link>
            </p>
        </footer>
    );
}
