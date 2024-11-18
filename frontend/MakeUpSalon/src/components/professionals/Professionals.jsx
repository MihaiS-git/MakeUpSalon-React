import { useDispatch, useSelector } from "react-redux";
import PersonCard from "./PersonCard.jsx";
import { useEffect } from "react";
import { fetchEmployees } from "../../store/employees-slice.js";
import { useNavigate } from "react-router-dom";

export default function Professionals({ className }) {
    const dispatch = useDispatch();
    const { employees, loading, error } = useSelector(
        (state) => state.employees
    );

    const navigate = useNavigate();

    useEffect(() => {
        if (employees.length === 0) {   
            dispatch(fetchEmployees());
        }
    }, [dispatch, employees.length]);

    if (loading) return <div>Loading...</div>;
    if (error)
        return (
            <div className="bg-slate-400 rounded-lg p-2 text-fuchsia-600 text-center font-bold text-lg mb-4">
                {error}
            </div>
        );

    function handleSelectProfessional(personId, fullName) {
        navigate(`/professionals/${personId}/treatments`, {
            state: { fullName },
        });
    }

    return (
        <div
            className={`${className} flex flex-col justify-around align-middle text-center mt-2 font-medium font-serif  text-fuchsia-950 text-3xl`}
        >
            <div className="bg-slate-500 rounded-3xl mb-10 w-64 sm:w-96 mx-auto">
                <h2>Professionals</h2>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {employees.map((employee) => (
                    <li key={employee.personId}>
                        <PersonCard
                            employee={employee}
                            onClick={() =>
                                handleSelectProfessional(
                                    employee.person.personId,
                                    `${employee.person.firstName} ${employee.person.lastName}`
                                )
                            }
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}
