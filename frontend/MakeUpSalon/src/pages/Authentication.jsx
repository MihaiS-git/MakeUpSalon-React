import PageContent from "../components/PageContent";
import AuthForm from "../components/AuthForm";

export default function AuthenticationPage() { 
    return (
        <PageContent className="flex items-center justify-center mx-auto my-20 px-6 py-8 h-1/2 w-96 bg-slate-500 rounded-xl">
            <AuthForm className="object-center"/>
        </PageContent>
    );
}