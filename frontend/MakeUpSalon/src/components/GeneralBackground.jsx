export default function GeneralBackground({ children }) {
    return (
        <>
            <div className="flex items-center justify-center bg-gradient-to-r from-slate-950 to-fuchsia-950">
                <div
                    className="h-screen w-full bg-contain"
                    style={{
                        backgroundImage: "url('/mainBackground.png')",
                        backgroundSize: "lg:bg-[55%] xl:bg-[45%]",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        backgroundAttachment: "fixed",
                    }}
                >
                    {children}
                </div>
            </div>

            
        </>
    );
}
