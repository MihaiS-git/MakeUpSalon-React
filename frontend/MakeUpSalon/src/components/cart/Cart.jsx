import { useDispatch, useSelector } from "react-redux";
import { clearCart, removeFromCart } from "../../store/cart-slice";
import { useState } from "react";
import { saveAppointment } from "../../store/appointments-slice.js";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

export default function Cart({ className }) {
    const [appointmentDateTime, setAppointmentDateTime] = useState("");
    const { items, totalPrice } = useSelector((state) => state.cart);
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const customerId = user?.userId;
    const treatmentId = items[0]?.treatmentId;
    const employeeId = items[0]?.employeeIds[0];

    const isReadyToSave =
        customerId && treatmentId && employeeId && appointmentDateTime;

    function handleRemoveFromCart(treatment) {
        dispatch(removeFromCart(treatment));
    }

    function handleSaveAppointment() {
        const appointmentRequestDto = {
            customerId,
            startDateTime: format(appointmentDateTime, "yyyy-MM-dd HH:mm:ss"),
            approvalStatus: "PENDING",
            employeeId,
            treatmentId,
        };
        dispatch(saveAppointment(appointmentRequestDto));
        dispatch(clearCart());
        navigate("/appointments");
    }

    const { loading, error } = useSelector((state) => state.appointments);

    if (loading) return <div>Loading...</div>;
    if (error)
        return (
            <div className="bg-slate-400 rounded-lg p-2 text-fuchsia-600 text-center font-bold text-lg mb-4">
                {error}
            </div>
        );

    return (
        <div
            className={`${className} flex flex-col justify-around align-middle text-center mt-2 font-medium font-serif  text-fuchsia-950 text-3xl w-full p-4`}
        >
            {error && <p className="text-red-500">{error}</p>}
            <div className="bg-slate-500 rounded-3xl mb-10 w-64 sm:w-96 mx-auto">
                <h2>Your Cart</h2>
            </div>

            <table className="bg-slate-400 text-lg text-center mx-auto w-full">
                <thead className="bg-fuchsia-900 text-slate-400">
                    <tr>
                        <th className="p-1 text-base border border-slate-400">#ID</th>
                        <th className="p-1 text-base border border-slate-400">Treatment</th>
                        <th className="p-1 text-base border border-slate-400">Date & Time</th>
                        <th className="p-1 text-base border border-slate-400">Price</th>
                        <th className="p-1 text-base border border-slate-400">Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {items.length === 0 && (
                        <tr>
                            <td colSpan="5">
                                <p className="font-base text-xl p-16">
                                    Cart is empty. Maybe select a new treatment.
                                </p>
                            </td>
                        </tr>
                    )}
                    {items &&
                        items.map((treatment) => (
                            <tr key={treatment.treatmentId} className="w-full">
                                <td className="p-1 text-base border border-fuchsia-900">{treatment.treatmentId}</td>
                                <td className="p-1 text-base border border-fuchsia-900">{treatment.name}</td>
                                <td className="p-1 text-base border border-fuchsia-900">
                                    <input
                                        type="datetime-local"
                                        className="rounded"
                                        name="appointmentDateTime"
                                        required
                                        onChange={(event) =>
                                            setAppointmentDateTime(
                                                event.target.value
                                            )
                                        }
                                    />
                                </td>
                                <td className="p-1 text-base border border-fuchsia-900">${treatment.price}</td>
                                <td className="p-1 text-base border border-fuchsia-900">
                                    <button
                                        onClick={() =>
                                            handleRemoveFromCart(treatment)
                                        }
                                        className="0 text-base font-bold px-2 py-0 m-2 rounded my-4 bg-fuchsia-900 text-slate-400 hover:bg-slate-500 hover:text-fuchsia-900 border border-fuchsia-900"
                                    >
                                        X
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
                <tfoot className="bg-fuchsia-900 text-slate-400 font-bold">
                    <tr>
                        <th colSpan="3">Total Price: </th>
                        <td colSpan="2">${totalPrice}</td>
                    </tr>
                </tfoot>
            </table>
            <button
                onClick={handleSaveAppointment}
                className="text-lg rounded p-1 mt-8 w-64 mx-auto bg-fuchsia-900 text-slate-400 hover:bg-slate-500 hover:text-fuchsia-900 border border-fuchsia-900"
                disabled={!isReadyToSave || loading}
            >
                {loading ? "Saving..." : "Save Appointment"}
            </button>
            {error && <div className="text-red-500 mt-4">{error}</div>}
        </div>
    );
}
