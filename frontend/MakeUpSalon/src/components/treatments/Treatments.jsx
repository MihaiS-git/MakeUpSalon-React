import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTreatments } from "../../store/treatments-slice";
import TreatmentCard from "./TreatmentCard";

export default function Treatments({ className }) {
    const dispatch = useDispatch();
    const {
        items: treatments,
        status,
        error,
    } = useSelector((state) => state.treatments);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchTreatments());
        }
    }, [status, dispatch]);

    if (error)
        return (
            <div className="bg-slate-400 rounded-lg p-2 text-fuchsia-600 text-center font-bold text-lg mb-4">
                {error}
            </div>
        );

    return (
        <div
            className={`${className} flex flex-col justify-around align-middle text-center mt-2 font-medium font-serif  text-fuchsia-950 text-2xl sm:text-3xl`}
        >
            <div className="bg-slate-500 bg-opacity-60 rounded-3xl mb-10 w-64 sm:w-96 mx-auto">
                <h2>Treatments</h2>
            </div>
            {status === "loading" && <p>Loading...</p>}
            {status === "failed" && <p>Error: {error}</p>}
            {status === "succeeded" && (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {treatments.map((treatment) => {
                        return (
                            <li key={treatment.treatmentId}>
                                <TreatmentCard treatment={treatment} />
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
