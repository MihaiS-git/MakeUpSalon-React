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

    return (
        <div
            className={`${className} className="flex justify-around align-middle text-center text-3xl font-medium font-serif mt-2 mb-4 text-fuchsia-950`}
        >
            <h2 className="mb-8">Treatments List</h2>
            {status === "loading" && <p>Loading...</p>}
            {status === "failed" && <p>Error: {error}</p>}
            {status === "succeeded" && (
                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {treatments.map((treatment) => {
                        return (
                            <li key={treatment.treatmentId} className="">
                                <TreatmentCard treatment={treatment} />
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
}
