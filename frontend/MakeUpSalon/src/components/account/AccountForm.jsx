import { useEffect, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPerson } from "../../store/person-slice";

const BASE_URL = "http://localhost:8080/api";

export default function AccountForm({ id, className }) {
    const dispatch = useDispatch();

    useEffect(() => {
        if (id) {
            dispatch(fetchPerson(id));
        }
    }, [id, dispatch]);

    const { person, loading, error } = useSelector((state) => state.person);

    const [isEditMode, setIsEditMode] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [address, setAddress] = useState("");
    const [pictureUrl, setPictureUrl] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (person) {
            setFirstName(person.firstName || "");
            setLastName(person.lastName || "");
            setPhoneNumber(person.phoneNumber || "");
            setDateOfBirth(person.dateOfBirth || "");
            setAddress(person.address || "");
            setPictureUrl(person.pictureUrl || "");
        }
    }, [person]);

    const requestData = {
        personId: id,
        firstName,
        lastName,
        phoneNumber,
        dateOfBirth,
        address,
        pictureUrl,
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await fetch(
                `${BASE_URL}/persons/id/${person.personId}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(requestData),
                }
            );

            if (response.ok) {
                const data = await response.json();
                console.log("Registration successfull!", data);
                setIsEditMode(false);
                navigate("/myAccount");
            } else {
                console.error("Registration failed!");
                alert("Registration failed!");
            }
        } catch (error) {
            console.error("Error: ", error);
            alert("An error occured during registration!");
        }
    }

    function handleEdit() {
        setIsEditMode(true);
    }

    return (
        <>
            <p>
                <img src={pictureUrl} alt={firstName} className="w-96 h-96 mb-8"/>
            </p>
            <p className="text-right">
                <button onClick={handleEdit} className="bg-fuchsia-900 text-slate-400 hover:bg-slate-500 hover:text-fuchsia-900 py-1 px-8 rounded-lg border border-fuchsia-950 shadow-lg text-base font-semibold">Edit</button>
            </p>
            <Form method="PUT" onSubmit={(e) => handleSubmit(e)} className={className}>
                <p className="text-left">
                    <label htmlFor="firstName" className="text-lg text-fuchsia-950">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        className="text-lg w-full px-4 py-2 my-2 border rounded-md focus:outline-none focus:border-fuchsia-400 focus:border-2"
                        name="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        disabled={!isEditMode}
                    />
                </p>
                <p className="text-left">
                    <label htmlFor="firstName" className="text-lg text-fuchsia-950">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        className="text-lg w-full px-4 py-2 my-2 border rounded-md focus:outline-none focus:border-fuchsia-400 focus:border-2"
                        name="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        disabled={!isEditMode}
                    />
                </p>
                <p className="text-left">
                    <label htmlFor="phoneNumber" className="text-lg text-fuchsia-950">Phone</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        className="text-lg w-full px-4 py-2 my-2 border rounded-md focus:outline-none focus:border-fuchsia-400 focus:border-2"
                        name="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        disabled={!isEditMode}
                    />
                </p>
                <p className="text-left">
                    <label htmlFor="dateOfBirth" className="text-lg text-fuchsia-950">Date of birth</label>
                    <input
                        type="date"
                        id="dateOfBirth"
                        className="text-lg w-full px-4 py-2 my-2 border rounded-md focus:outline-none focus:border-fuchsia-400 focus:border-2"
                        name="dateOfBirth"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        disabled={!isEditMode}
                    />
                </p>
                <p className="text-left">
                    <label htmlFor="address" className="text-lg text-fuchsia-950">Address</label>
                    <input
                        type="text"
                        id="address"
                        className="text-lg w-full px-4 py-2 my-2 border rounded-md focus:outline-none focus:border-fuchsia-400 focus:border-2"
                        name="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        disabled={!isEditMode}
                    />
                </p>
                <p className="text-left mb-8">
                    <label htmlFor="pictureUrl" className="text-lg text-fuchsia-950">Picture url</label>
                    <input
                        type="text"
                        id="pictureUrl"
                        className="text-lg w-full px-4 py-2 my-2 border rounded-md focus:outline-none focus:border-fuchsia-400 focus:border-2"
                        name="pictureUrl"
                        value={pictureUrl}
                        onChange={(e) => setPictureUrl(e.target.value)}
                        disabled={!isEditMode}
                    />
                </p>
                <p className="text-left">
                    {isEditMode && (
                        <button
                            type="submit"
                            className="bg-fuchsia-900 text-slate-400 hover:bg-slate-500 hover:text-fuchsia-900 py-1 px-8 rounded-lg border border-fuchsia-950 shadow-lg text-base font-semibold w-full"
                        >
                            Save
                        </button>
                    )}
                </p>
            </Form>
        </>
    );
}
