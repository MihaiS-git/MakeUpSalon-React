import Appointments from "../components/appointments/Appointments";
import PageContent from "../components/PageContent";

export default function AppointmentsPage() {
    return (
        <PageContent className="flex flex-col items-center justify-center mx-auto my-20 px-6 py-8 w-11/12 sm:w-9/12 md:w-7/12 lg:w-6/12 xl:w-5/12 bg-slate-500 bg-opacity-85 rounded-xl">
            <Appointments className="object-center" />
        </PageContent>
    );
}
