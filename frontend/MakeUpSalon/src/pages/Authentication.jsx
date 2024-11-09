import PageContent from "../components/PageContent";
import AuthForm from "../components/AuthForm";

export default function AuthenticationPage() { 
    return (
        <PageContent className="container mx-auto my-20 flex items-center justify-center px-6 py-8 bg-slate-500 rounded-xl w-96 max-w-full">
            <AuthForm className="object-center"/>
        </PageContent>
    );
}