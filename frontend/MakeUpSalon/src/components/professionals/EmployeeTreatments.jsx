import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import TreatmentCard from "../treatments/TreatmentCard";
import { fetchEmployeeTreatments } from "../../store/employee-treatments-slice";
import { useLocation, useParams } from "react-router-dom";

export default function EmployeeTreatments({ className }) {
    const { id: personId } = useParams();
    const dispatch = useDispatch();
    const { state } = useLocation();
    const { fullName } = state || {};
    const {
        items: employeeTreatments,
        loading,
        error,
    } = useSelector((state) => state.employeeTreatments);

    console.log(employeeTreatments);

    useEffect(() => {
        console.log("Fetching treatments for personId:", personId);
        if (personId) {
            dispatch(fetchEmployeeTreatments(personId));
        }
    }, [dispatch, personId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div
            className={`${className} flex flex-col justify-around align-middle text-center mt-2 font-medium font-serif text-fuchsia-950 text-2xl sm:text-3xl`}
        >
            <div className="bg-slate-500 bg-opacity-60 rounded-3xl mb-10 w-64 sm:w-96 mx-auto">
                <h2>Treatments <br/> by {fullName}</h2>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {employeeTreatments.map((treatment) => (
                    <li key={treatment.treatmentId}>
                        <TreatmentCard treatment={treatment} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
