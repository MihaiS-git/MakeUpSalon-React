import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTreatments } from "../../store/treatments-slice";

export default function Treatments({ className }) {
    const dispatch = useDispatch();
    const { items: treatments, status, error } = useSelector((state) => state.treatments);

    useEffect(() => { 
        if (status === 'idle') { 
            dispatch(fetchTreatments());
        }
    }, [status, dispatch]);

    return (
        <div className={`${className} className="text-center text-3xl font-medium font-serif mt-2 mb-4 text-fuchsia-950`} >
            <h2>Treatments List</h2>
            {status === 'loading' && <p>Loading...</p>}
            {status === 'failed' && <p>Error: {error}</p>}
            {status === 'succeeded' && (
                <ul>
                    {treatments.map((treatment) => <li key={treatment.treatmentId}>{treatment.name}</li>)}
                </ul>
            )}
        </div>
    );
}