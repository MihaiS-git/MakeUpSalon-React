import PageContent from "../components/PageContent";

export default function HomePage() {
    return (
        <PageContent className="flex items-center justify-center h-screen w-full">
            <h3 className="text-5xl text-fuchsia-800 text-center bg-slate-500 rounded-3xl p-4 font-extrabold opacity-80">
                Welcome to MakeUp Salon!
            </h3>
        </PageContent>
    );
}
