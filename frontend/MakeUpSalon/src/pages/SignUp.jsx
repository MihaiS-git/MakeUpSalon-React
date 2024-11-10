import PageContent from "../components/PageContent.jsx";
import SignUpForm from "../components/SignUpForm.jsx";

export default function SignUpPage() {
    return (
        <PageContent className="container mx-auto my-20 flex items-center justify-center px-6 py-8 bg-slate-500 rounded-xl w-96 max-w-full">
            <SignUpForm className="object-center" />
        </PageContent>
    );
}
