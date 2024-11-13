import Contact from "../components/contact/Contact";
import PageContent from "../components/PageContent";

export default function ContactPage() {
    return (
        <PageContent className="flex flex-col items-center justify-center mx-auto my-20 px-6 py-8 w-11/12 sm:w-9/12 md:w-7/12 lg:w-6/12 xl:w-5/12 bg-slate-500 bg-opacity-50 rounded-xl">
            <Contact className="object-center" />
        </PageContent>
    );
}