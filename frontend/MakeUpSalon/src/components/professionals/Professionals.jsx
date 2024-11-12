import { useDispatch, useSelector } from "react-redux";
import PersonCard from "./PersonCard.jsx";
import { useEffect } from "react";
import { fetchEmployees } from "../../store/employees-slice.js";

export default function Professionals({ className }) {
    const dispatch = useDispatch();
    const { employees, loading, error } = useSelector(
        (state) => state.employees
    );

    useEffect(() => {
        dispatch(fetchEmployees());
    }, [dispatch]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div
            className={`${className} className="flex justify-around align-middle text-center mt-2 font-medium font-serif  text-fuchsia-950 text-3xl`}
        >
            <div className="bg-slate-500 bg-opacity-60 rounded-3xl mb-10 w-64 sm:w-96 mx-auto">
                <h2>Professionals List</h2>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {employees.map((employee) => {
                    return (
                        <li key={employee.personId}>
                            <PersonCard employee={employee} />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
