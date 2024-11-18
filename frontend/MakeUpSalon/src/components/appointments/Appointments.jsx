import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
    deleteAppointment,
    fetchAppointmentsByPersonId,
    updateAppointment,
} from "../../store/appointments-slice";
import { format } from 'date-fns';

export default function Appointments({ className }) {
    const dispatch = useDispatch();
    const [updatedAppointments, setUpdatedAppointments] = useState([]);
    const { appointments, loading, error } = useSelector(
        (state) => state.appointments
    );
    const auth = useSelector((state) => state.auth);
    const role = auth?.user?.role;
    const customerId = auth?.user?.userId;

    useEffect(() => {
        if (customerId) {
            dispatch(fetchAppointmentsByPersonId(customerId));
        }
    }, [dispatch, customerId]);

    useEffect(() => {
        const fetchEmployeeAndTreatment = async () => {
            const appointmentWithDetails = await Promise.all(
                appointments.map(async (appointment) => {
                    const employeeResponse = await fetch(
                        `http://localhost:8080/api/persons/id/${appointment.employeeId}`,
                        {
                            headers: {
                                Authorization: `Bearer ${auth.token}`,
                            },
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
    }, [appointments, auth.token]);

    function handleApprovalStatusChange(appointmentId, newStatus) {
        setUpdatedAppointments((prevAppointments) =>
            prevAppointments.map((appointment) =>
                appointment.appointmentId === appointmentId
                    ? { ...appointment, approvalStatus: newStatus }
                    : appointment
            )
        );
    }

    function handleStartDateChange(appointmentId, newStartDate) {
        setUpdatedAppointments((prevAppointments) =>
            prevAppointments.map((appointment) =>
                appointment.appointmentId === appointmentId
                    ? {
                          ...appointment,
                          startDateTime: newStartDate,
                      }
                    : appointment
            )
        );
    }

    const handleUpdateAppointment = async (appointment) => {
        const appointmentId = appointment.appointmentId;
        const requestBody = {
            customerId: appointment.customerId,
            startDateTime: format(
                new Date(appointment.startDateTime),
                "yyyy-MM-dd HH:mm:ss"
            ),
            approvalStatus: appointment.approvalStatus,
            employeeId: appointment.employeeId,
            treatmentId: appointment.treatmentId,
        };

        try {
            await dispatch(updateAppointment({ appointmentId, requestBody }));
            console.log("Appointment updated successfully!");
        } catch (error) {
            console.error("Error updating appointment:", error);
        }
    };

    const handleRemoveAppointment = async (appointmentId) => {
        try {
            await dispatch(deleteAppointment(appointmentId));
        } catch (error) {
            console.error("Error deleting appointment:", error);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    let i = 1;

    return (
        <div
            className={`${className} flex flex-col justify-around align-middle text-center mt-2 font-medium font-serif text-fuchsia-950 text-3xl w-full p-4`}
        >
            <div className="bg-slate-500 rounded-3xl mb-10 w-64 sm:w-96 mx-auto">
                <h2>Your Appointments</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="bg-slate-400 text-lg text-center mx-auto w-full">
                    <thead className="bg-fuchsia-900 text-slate-400">
                        <tr>
                            <th className="p-1 text-base border border-slate-400">
                                #
                            </th>
                            <th className="p-1 text-base border border-slate-400">
                                Start
                            </th>
                            <th className="p-1 text-base border border-slate-400">
                                End
                            </th>
                            <th className="p-1 text-base border border-slate-400">
                                Date created
                            </th>
                            <th className="p-1 text-base border border-slate-400">
                                Status
                            </th>
                            <th className="p-1 text-base border border-slate-400">
                                Employee
                            </th>
                            <th className="p-1 text-base border border-slate-400">
                                Treatment
                            </th>
                            <th className="p-1 text-base border border-slate-400">
                                Update
                            </th>
                            <th className="p-1 text-base border border-slate-400">
                                Remove
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {updatedAppointments.length === 0 && (
                            <tr>
                                <td colSpan="9">
                                    <p className="font-base text-xl p-16">
                                        There are no appointments yet. Maybe
                                        create a new one.
                                    </p>
                                </td>
                            </tr>
                        )}
                        {updatedAppointments.map((appointment) => (
                            <tr key={appointment.appointmentId}>
                                <td className="p-1 text-base border border-fuchsia-900">
                                    {i++}
                                </td>
                                <td className="p-1 text-base border border-fuchsia-900">
                                    {role === "CUSTOMER" ? (
                                        <input
                                            type="datetime-local"
                                            value={appointment.startDateTime}
                                            onChange={(e) =>
                                                handleStartDateChange(
                                                    appointment.appointmentId,
                                                    e.target.value
                                                )
                                            }
                                        />
                                    ) : (
                                        appointment.startDateTime
                                    )}
                                </td>
                                <td className="p-1 text-base border border-fuchsia-900">
                                    {appointment.endDateTime}
                                </td>
                                <td className="p-1 text-base border border-fuchsia-900">
                                    {appointment.dateCreated}
                                </td>
                                <td className="p-1 text-base border border-fuchsia-900">
                                    {role === "EMPLOYEE" ? (
                                        <select
                                            value={appointment.approvalStatus}
                                            onChange={(e) =>
                                                handleApprovalStatusChange(
                                                    appointment.appointmentId,
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="APPROVED">
                                                APPROVED
                                            </option>
                                            <option value="PENDING">
                                                PENDING
                                            </option>
                                            <option value="REJECTED">
                                                REJECTED
                                            </option>
                                            <option value="EXPIRED">
                                                EXPIRED
                                            </option>
                                        </select>
                                    ) : (
                                        appointment.approvalStatus
                                    )}
                                </td>
                                <td className="p-1 text-base border border-fuchsia-900">
                                    {appointment.employee
                                        ? `${appointment.employee.firstName} ${appointment.employee.lastName}`
                                        : "Loading..."}
                                </td>
                                <td className="p-1 text-base border border-fuchsia-900">
                                    {appointment.treatment
                                        ? appointment.treatment.name
                                        : "Loading..."}
                                </td>
                                <td className="p-1 text-base border border-fuchsia-900">
                                    <button
                                        onClick={() =>
                                            handleUpdateAppointment(appointment)
                                        }
                                        className="0 text-base font-bold px-2 py-0 m-2 rounded my-4 bg-fuchsia-900 text-slate-400 hover:bg-slate-500 hover:text-fuchsia-900 border border-fuchsia-900"
                                    >
                                        Update
                                    </button>
                                </td>
                                <td className="p-1 text-base border border-fuchsia-900">
                                    <button
                                        onClick={() =>
                                            handleRemoveAppointment(
                                                appointment.appointmentId
                                            )
                                        }
                                        className="0 text-base font-bold px-2 py-0 m-2 rounded my-4 bg-fuchsia-900 text-slate-400 hover:bg-slate-500 hover:text-fuchsia-900 border border-fuchsia-900"
                                    >
                                        X
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
