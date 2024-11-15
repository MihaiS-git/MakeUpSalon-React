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
        status,
        error,
    } = useSelector((state) => state.employeeTreatments);

    useEffect(() => {
        if (personId) {
            dispatch(fetchEmployeeTreatments(personId));
        }
    }, [dispatch, personId]);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchEmployeeTreatments());
        }
    }, [status, dispatch]);

    return (
        <div
            className={`${className} flex flex-col justify-around align-middle text-center mt-2 font-medium font-serif text-fuchsia-950 text-2xl sm:text-3xl`}
        >
            <div className="bg-slate-500 bg-opacity-60 rounded-3xl mb-10 w-64 sm:w-96 mx-auto">
                <h2>
                    Treatments <br /> by {fullName}
                </h2>
            </div>
            {status === "loading" && <p>Loading...</p>}
            {status === "failed" && <p>Error: {error}</p>}
            {status === "succeeded" && (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {employeeTreatments.map((treatment) => {
                        return (
                            <li key={treatment.treatmentId}>
                                <TreatmentCard treatment={treatment} employeeId={ personId} />
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
