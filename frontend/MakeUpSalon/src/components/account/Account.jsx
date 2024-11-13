import AccountForm from './AccountForm.jsx'
import { useSelector } from 'react-redux';

export default function Account({ className }) {
    const { user } = useSelector((state) => state.auth);
    
    return (
        <div
            className={`${className} flex flex-col justify-around align-middle text-center mt-2 font-medium font-serif text-fuchsia-950 text-3xl`}
        >
            <div className="bg-slate-500 rounded-3xl mb-10 w-64 sm:w-96 mx-auto">
                <h2>Your Account Info</h2>
            </div>
            <AccountForm id={user.userId} />
        </div>
    );
}
