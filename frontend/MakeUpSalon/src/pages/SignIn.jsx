import PageContent from "../components/PageContent.jsx";
import SignInForm from "../components/SignInForm.jsx";

export default function SignInPage() {
    return (
        <PageContent className="container mx-auto my-20 flex items-center justify-center px-6 py-8 bg-slate-500 rounded-xl w-96 max-w-full">
            <SignInForm className="object-center" />
        </PageContent>
    );
}
