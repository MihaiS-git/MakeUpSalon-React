import PageContent from "../components/PageContent";
import Treatments from "../components/treatments/Treatments";

export default function TreatmentsPage() {
    return (
        <div className="min-h-screen overflow-auto">
            <PageContent className="flex flex-col items-center justify-center mx-auto my-20 px-6 py-8 w-2/3 bg-slate-500 rounded-xl">
                <Treatments className="object-center" />
            </PageContent>
        </div>
    );
}
