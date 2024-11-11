import PageContent from "../components/PageContent";
import RecoverPasswordForm from "../components/RecoverPasswordForm";

export default function RecoverPasswordPage() { 
    return (
        <PageContent className="flex items-center justify-center mx-auto my-20 px-6 py-8 w-96 bg-slate-500 rounded-xl">
            <RecoverPasswordForm className="object-center"/>
        </PageContent>
    );
}