import PageContent from "../components/PageContent";
import Treatments from "../components/treatments/Treatments";

export default function TreatmentsPage() { 
    return (
        <PageContent className="flex items-center justify-center mx-auto my-20 px-6 py-8 w-96 bg-slate-500 rounded-xl">
            <Treatments className="object-center"/>
        </PageContent>
    );
}