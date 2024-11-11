import PageContent from "../components/PageContent.jsx";
import SignUpForm from "../components/SignUpForm.jsx";

export default function SignUpPage() {
    return (
        <PageContent className="flex items-center justify-center mx-auto my-20 px-6 py-8 w-96 bg-slate-500 rounded-xl">
            <SignUpForm className="object-center" />
        </PageContent>
    );
}
