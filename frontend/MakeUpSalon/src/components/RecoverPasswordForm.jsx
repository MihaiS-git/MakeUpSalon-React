import { Form } from "react-router-dom";

export default function RecoverPasswordForm({className}) { 
    return (
        <Form method="post" className={className}>
            <h1 className="text-center text-3xl font-medium mb-4 text-fuchsia-950">
                Recover Password Form
            </h1>
            <p className="p-2">
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
            <p className="p-2">
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
            <p className="p-2">
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
            <div className="m-4 text-lg justify-center align-middle">
                <button className="w-full py-2 my-2 rounded-md text-fuchsia-200 hover:text-fuchsia-950 bg-fuchsia-950 hover:bg-fuchsia-200">
                    Save
                </button>
                
            </div>
        </Form>
    );
}