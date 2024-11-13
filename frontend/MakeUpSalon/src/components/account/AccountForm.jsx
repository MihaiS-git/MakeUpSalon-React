import { useEffect, useState } from "react";
import { Form, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPerson } from "../../store/person-slice";

const BASE_URL = "http://localhost:8080/api";

export default function AccountForm({ id }) {
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
                <button onClick={handleEdit}>Edit</button>
            </p>
            <Form method="PUT" onSubmit={(e) => handleSubmit(e)}>
                <p>
                    <label htmlFor="firstName">First Name</label>
                    <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        disabled={!isEditMode}
                    />
                </p>
                <p>
                    <label htmlFor="firstName">Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        disabled={!isEditMode}
                    />
                </p>
                <p>
                    <label htmlFor="phoneNumber">Phone</label>
                    <input
                        type="text"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        disabled={!isEditMode}
                    />
                </p>
                <p>
                    <label htmlFor="dateOfBirth">Date of birth</label>
                    <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        disabled={!isEditMode}
                    />
                </p>
                <p>
                    <label htmlFor="address">Date of birth</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        disabled={!isEditMode}
                    />
                </p>
                <p>
                    <label htmlFor="pictureUrl">Picture url</label>
                    <input
                        type="text"
                        id="pictureUrl"
                        name="pictureUrl"
                        value={pictureUrl}
                        onChange={(e) => setPictureUrl(e.target.value)}
                        disabled={!isEditMode}
                    />
                </p>
                <p>
                    {isEditMode && (
                        <button
                            type="submit"
                            className="w-full py-2 my-2 rounded-md text-fuchsia-200 hover:text-fuchsia-950 bg-fuchsia-950 hover:bg-fuchsia-200"
                        >
                            Save
                        </button>
                    )}
                </p>
            </Form>
        </>
    );
}
