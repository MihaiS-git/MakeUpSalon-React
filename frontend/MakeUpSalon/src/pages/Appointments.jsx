import Appointments from "../components/appointments/Appointments";
import PageContent from "../components/PageContent";

export default function AppointmentsPage() {
    return (
        <PageContent className="flex flex-col items-center mx-auto my-20 px-6 py-8 bg-slate-500 bg-opacity-50 rounded-xl border border-slate-400 w-11/12 lg:w-10/12 xl:w-9/12">
            <Appointments className="object-center" />
        </PageContent>
    );
}
