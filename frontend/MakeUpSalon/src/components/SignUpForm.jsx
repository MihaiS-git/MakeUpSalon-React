import { Form } from "react-router-dom";

export default function SignUpForm({ className }) {
    return (
        <Form method="post" className={className}>
            <h1 className="text-center text-3xl font-medium mb-2 text-fuchsia-950">
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
                    required
                    placeholder="Email"
                    className="w-full px-4 py-2 my-2 border rounded-md focus:outline-none focus:border-fuchsia-400 focus:border-2"
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
                    required
                    placeholder="Password"
                    className="w-full px-4 py-2 my-2 border rounded-md focus:outline-none focus:border-fuchsia-400 focus:border-2"
                />
            </p>
            <p>
                <label htmlFor="password" className="text-lg text-fuchsia-950">
                    Confirm Password
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    placeholder="Password"
                    className="w-full px-4 py-2 my-2 border rounded-md focus:outline-none focus:border-fuchsia-400 focus:border-2"
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
                    required
                    placeholder="First Name"
                    className="w-full px-4 py-2 my-2 border rounded-md focus:outline-none focus:border-fuchsia-400 focus:border-2"
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
                    required
                    placeholder="Last Name"
                    className="w-full px-4 py-2 my-2 border rounded-md focus:outline-none focus:border-fuchsia-400 focus:border-2"
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
                    required
                    placeholder="Address"
                    className="w-full px-4 py-2 my-2 border rounded-md focus:outline-none focus:border-fuchsia-400 focus:border-2"
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
                    required
                    placeholder="xxxxxxxxxx"
                    className="w-full px-4 py-2 my-2 border rounded-md focus:outline-none focus:border-fuchsia-400 focus:border-2"
                />
            </p>
            <hr />
            <div className="m-4 text-lg justify-center align-middle">
                <button className="w-full py-2 my-2 rounded-md text-fuchsia-200 hover:text-fuchsia-950 bg-fuchsia-950 hover:bg-fuchsia-200">
                    Sign Up
                </button>
            </div>
        </Form>
    );
}
