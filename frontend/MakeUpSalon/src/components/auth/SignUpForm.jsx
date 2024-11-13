import { useState } from "react";
import { Form, useNavigate } from "react-router-dom";

export default function SignUpForm({ className }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const navigate = useNavigate();

    async function handleSubmit(event) {
        event.preventDefault();

        if (password !== password) {
            alert("Passwords do not match!");
            return;
        }

        const requestData = {
            firstName,
            lastName,
            email,
            password,
            phoneNumber: phone,
            dateOfBirth,
            address,
            role: "CUSTOMER",
            pictureURL: "../assets/images/no_picture.jpeg"
        };

        try {
            const response = await fetch('http://localhost:8080/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestData)
            })

            if (response.ok) {
                const data = await response.json();
                console.log("Registration successfull!", data);
                navigate('/auth');
            } else {
                console.error("Registration failed!");
                alert("Registration failed!");
            }
        } catch (error) { 
            console.error("Error: ", error);
            alert("An error occured during registration!")
        }
    }

    return (
        <Form method="post" className={className} onSubmit={(e) => handleSubmit(e)}>
            <h1 className="text-center text-3xl font-medium mt-2 mb-4 text-fuchsia-950">
                Sign Up Form
            </h1>
            <p>
                <label htmlFor="email" className="text-lg text-fuchsia-950">
                    Email
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    required
                    placeholder="Email"
                    className="w-full px-4 py-2 my-2 border rounded-md focus:outline-none focus:border-fuchsia-400 focus:border-2"
                    onChange={(event) => setEmail(event.target.value)}
                />
            </p>
            <p>
                <label htmlFor="password" className="text-lg text-fuchsia-950">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    required
                    placeholder="Password"
                    className="w-full px-4 py-2 my-2 border rounded-md focus:outline-none focus:border-fuchsia-400 focus:border-2"
                    onChange={(event) => setPassword(event.target.value)}
                />
            </p>
            <p>
                <label htmlFor="cpassword" className="text-lg text-fuchsia-950">
                    Confirm Password
                </label>
                <input
                    type="password"
                    id="cpassword"
                    name="cpassword"
                    value={cpassword}
                    required
                    placeholder="Password"
                    className="w-full px-4 py-2 my-2 border rounded-md focus:outline-none focus:border-fuchsia-400 focus:border-2"
                    onChange={(event) => setCpassword(event.target.value)}
                />
            </p>
            <hr />
            <p>
                <label htmlFor="firstName" className="text-lg text-fuchsia-950">
                    First Name
                </label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={firstName}
                    required
                    placeholder="First Name"
                    className="w-full px-4 py-2 my-2 border rounded-md focus:outline-none focus:border-fuchsia-400 focus:border-2"
                    onChange={(event) => setFirstName(event.target.value)}
                />
            </p>
            <p>
                <label htmlFor="lastName" className="text-lg text-fuchsia-950">
                    Last Name
                </label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={lastName}
                    required
                    placeholder="Last Name"
                    className="w-full px-4 py-2 my-2 border rounded-md focus:outline-none focus:border-fuchsia-400 focus:border-2"
                    onChange={(event) => setLastName(event.target.value)}
                />
            </p>
            <p>
                <label
                    htmlFor="dateOfBirth"
                    className="text-lg text-fuchsia-950"
                >
                    Date of Birth
                </label>
                <input
                    type="date"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    value={dateOfBirth}
                    required
                    className="w-full px-4 py-2 my-2 border rounded-md focus:outline-none focus:border-fuchsia-400 focus:border-2"
                    onChange={(event) => setDateOfBirth(event.target.value)}
                />
            </p>
            <p>
                <label htmlFor="address" className="text-lg text-fuchsia-950">
                    Address
                </label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={address}
                    required
                    placeholder="Address"
                    className="w-full px-4 py-2 my-2 border rounded-md focus:outline-none focus:border-fuchsia-400 focus:border-2"
                    onChange={(event) => setAddress(event.target.value)}
                />
            </p>
            <p>
                <label htmlFor="phone" className="text-lg text-fuchsia-950">
                    Phone
                </label>
                <input
                    type="text"
                    id="phone"
                    name="phone"
                    value={phone}
                    required
                    placeholder="xxxxxxxxxx"
                    className="w-full px-4 py-2 my-2 border rounded-md focus:outline-none focus:border-fuchsia-400 focus:border-2"
                    onChange={(event) => setPhone(event.target.value)}
                />
            </p>
            <hr />
            <div className="m-4 text-lg justify-center align-middle">
                <button
                    type="submit"
                    className="w-full py-2 my-2 rounded-md text-fuchsia-200 hover:text-fuchsia-950 bg-fuchsia-950 hover:bg-fuchsia-200"
                >
                    Sign Up
                </button>
            </div>
        </Form>
    );
}
