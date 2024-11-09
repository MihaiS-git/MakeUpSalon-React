import { Outlet } from "react-router-dom";
import Header from './Header.jsx';

export default function RootLayout() {
    return (
        <main className="flex items-center justify-center bg-gradient-to-r from-slate-950 to-fuchsia-950 fixed w-full h-full">
            <div
                className="h-full w-full bg-contain"
                style={{
                    backgroundImage: "url('/mainBackground.png')",
                    backgroundSize: "lg:bg-[55%] xl:bg-[45%]",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "fixed",
                }}
            >
                <Header/>
                <Outlet />
            </div>
        </main>
    );
}
