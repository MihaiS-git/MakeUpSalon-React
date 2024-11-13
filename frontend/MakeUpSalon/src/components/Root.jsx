import { Outlet } from "react-router-dom";
import Header from './Header.jsx';
import Footer from "./Footer.jsx";

export default function RootLayout() {
    return (
        <main className="flex items-center justify-center bg-gradient-to-r from-slate-950 to-fuchsia-950 min-h-screen w-full font-serif">
            <div
                className="min-h-screen w-full bg-contain"
                style={{
                    backgroundImage: "url('/mainBackground.png')",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "fixed",
                }}
            >
                <Header/>
                <Outlet />
                <Footer/>
            </div>
        </main>
    );
}
