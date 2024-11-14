import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { removeAppointment } from "../../store/appointments-slice";

export default function Appointments({ className }) {
    const dispatch = useDispatch();
    const [updatedAppointments, setUpdatedAppointments] = useState([]);
    const { appointments, loading, error } = useSelector(
        (state) => state.appointments
    );
    const token = useSelector((state) => state.auth.token);

    useEffect(() => {
        const fetchEmployeeAndTreatment = async () => {
            const appointmentWithDetails = await Promise.all(
                appointments.map(async (appointment) => {
                    const employeeResponse = await fetch(
                        `http://localhost:8080/api/persons/id/${appointment.employeeId}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`
                            }
                        }
                    );
                    if (!employeeResponse.ok) {
                        throw new Error("Failed to fetch the employee.");
                    }
                    const employee = await employeeResponse.json();

                    const treatmentResponse = await fetch(
                        `http://localhost:8080/api/treatments/${appointment.treatmentId}`
                    );
                    if (!treatmentResponse.ok) {
                        throw new Error("Failed to fetch treatment.");
                    }
                    const treatment = await treatmentResponse.json();

                    return { ...appointment, employee, treatment };
                })
            );

            setUpdatedAppointments(appointmentWithDetails);
        };

        if (appointments.length > 0) {
            fetchEmployeeAndTreatment();
        }
    }, [appointments, token]);

    function handleRemoveAppointment(appointment) {
        dispatch(removeAppointment(appointment));
        //TODO rerender list
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div
            className={`${className} flex flex-col justify-around align-middle text-center mt-2 font-medium font-serif  text-fuchsia-950 text-3xl w-full p-4`}
        >
            <div className="bg-slate-500 rounded-3xl mb-10 w-64 sm:w-96 mx-auto">
                <h2>Your Appointments</h2>
            </div>
            <table className="bg-slate-400 text-lg text-center mx-auto w-full">
                <thead className="bg-fuchsia-600">
                    <tr>
                        <th>#ID</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Date created</th>
                        <th>Status</th>
                        <th>Employee</th>
                        <th>Treatment</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {updatedAppointments &&
                        updatedAppointments.map((appointment) => (
                            <tr
                                key={appointment.appointmentId}
                                className="w-full"
                            >
                                <td className="p-2">
                                    {appointment.treatmentId}
                                </td>
                                <td className="p-2">
                                    {appointment.startDateTime}
                                </td>
                                <td className="p-2">
                                    {appointment.endDateTime}
                                </td>
                                <td className="p-2">
                                    {appointment.dateCreated}
                                </td>
                                <td className="p-2">
                                    {appointment.approvalStatus}
                                </td>
                                <td className="p-2">
                                    {appointment.employee ? `${appointment.employee.firstName} ${appointment.employee.lastName}` : "Loading..."}
                                </td>
                                <td className="p-2">
                                    {appointment.treatment
                                        ? appointment.treatment.name
                                        : "Loading..."}
                                </td>
                                <td>
                                    <button
                                        onClick={() =>
                                            handleRemoveAppointment(appointment)
                                        }
                                        className="0 text-base font-bold px-2 py-0 m-2 rounded my-4 bg-fuchsia-400 text-fuchsia-800 hover:bg-fuchsia-800 hover:text-fuchsia-400"
                                    >
                                        X
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
}
