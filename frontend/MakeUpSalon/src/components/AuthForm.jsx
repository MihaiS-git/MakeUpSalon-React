import { Form, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../store/auth-slice";

export default function AuthForm({ className }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleSubmit(event) { 
        event.preventDefault();
        dispatch(login({ email, password }));
        navigate('/home');
    }

    return (
        <Form method="post" className={className} onSubmit={ handleSubmit}>
            <h1 className="text-center text-3xl font-medium mt-2 mb-4 text-fuchsia-950">
                Authentication Form
            </h1>
            <p className="p-2">
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
            <p className="p-2">
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
            <div className="m-4 text-lg justify-center align-middle">
                <button
                    type="submit"
                    className="w-full py-2 my-2 rounded-md text-fuchsia-200 hover:text-fuchsia-950 bg-fuchsia-950 hover:bg-fuchsia-200"
                >
                    Login
                </button>
                <div className="m-4">
                    <div className="text-center text-fuchsia-950">
                        <p className=" text-sm">Don&apos;t have an account?</p>
                        <Link
                            className="text-sm underline text-center text-fuchsia-950 hover:text-fuchsia-200"
                            to="/signup"
                        >
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </Form>
    );
}
