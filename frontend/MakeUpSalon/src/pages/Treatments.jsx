import PageContent from "../components/PageContent";
import Treatments from "../components/treatments/Treatments";

export default function TreatmentsPage() {
    return (
        <div className="min-h-screen overflow-auto">
            <PageContent className="flex flex-col items-center mx-auto my-20 px-6 py-8 bg-slate-500 bg-opacity-50 rounded-xl border border-slate-400 w-11/12 lg:w-10/12 xl:w-9/12">
                <Treatments className="object-center" />
            </PageContent>
        </div>
    );
}
