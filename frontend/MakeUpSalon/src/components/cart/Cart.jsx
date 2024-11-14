import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../../store/cart-slice";
import { useState } from "react";
import { saveAppointment } from "../../store/appointments-slice.js";

export default function Cart({ className }) {
    const [appointmentDateTime, setAppointmentDateTime] = useState("");
    const { items, totalPrice } = useSelector((state) => state.cart);
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    console.log("ITEMS in Cart: ", items);
    
    const customerId = user?.userId;
    const treatmentId = items[0]?.treatmentId;
    const employeeId = items[0]?.employeeIds[0];
    
    console.log("ITEMS[0]: ", items[0]);
    console.log("Employee ID :", employeeId);
    

    const isReadyToSave =
        customerId && treatmentId && employeeId && appointmentDateTime;

    function handleRemoveFromCart(treatment) {
        dispatch(removeFromCart(treatment));
    }

    function handleSaveAppointment() {
        const formattedDateTime = new Date(appointmentDateTime)
            .toISOString()
            .slice(0, 19)
            .replace("T", " ");
        const appointmentRequestDto = {
            customerId,
            startDateTime: formattedDateTime,
            approvalStatus: "PENDING",
            employeeId,
            treatmentId,
        };
        console.log("appointmentRequestDto: ", appointmentRequestDto);
        
        dispatch(saveAppointment(appointmentRequestDto));
    }

    const { loading, error } = useSelector((state) => state.appointment);

    return (
        <div
            className={`${className} flex flex-col justify-around align-middle text-center mt-2 font-medium font-serif  text-fuchsia-950 text-3xl w-full p-4`}
        >
            {error && <p className="text-red-500">{error}</p>}
            <div className="bg-slate-500 rounded-3xl mb-10 w-64 sm:w-96 mx-auto">
                <h2>Your Cart</h2>
            </div>
            <table className="bg-slate-400 text-lg text-center mx-auto w-full">
                <thead className="bg-fuchsia-600">
                    <tr>
                        <th>#ID</th>
                        <th>Treatment</th>
                        <th>Date & Time</th>
                        <th>Price</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {items &&
                        items.map((treatment) => (
                            <tr key={treatment.treatmentId} className="w-full">
                                <td className="p-2">{treatment.treatmentId}</td>
                                <td className="p-2">{treatment.name}</td>
                                <td className="p-2">
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
                                <td>${treatment.price}</td>
                                <td>
                                    <button
                                        onClick={() =>
                                            handleRemoveFromCart(treatment)
                                        }
                                        className="0 text-base font-bold px-2 py-0 m-2 rounded my-4 bg-fuchsia-400 text-fuchsia-800 hover:bg-fuchsia-800 hover:text-fuchsia-400"
                                    >
                                        X
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
                <tfoot className="bg-fuchsia-600 font-bold">
                    <tr>
                        <th colSpan="3">Total Price: </th>
                        <td colSpan="2">${totalPrice}</td>
                    </tr>
                </tfoot>
            </table>
            <button
                onClick={handleSaveAppointment}
                className="text-lg rounded p-1 mt-8 w-64 mx-auto bg-fuchsia-400 text-fuchsia-950 hover:bg-fuchsia-950 hover:text-fuchsia-400"
                disabled={!isReadyToSave || loading}
            >
                {loading ? "Saving..." : "Save Appointment"}
            </button>
            {error && <div className="text-red-500 mt-4">{error}</div>}
        </div>
    );
}
