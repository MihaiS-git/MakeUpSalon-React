import Map from "./Map.jsx";

export default function Contact({ className }) {
    return (
        <div
            className={`${className} flex flex-col justify-around align-middle text-center mt-2 font-medium font-serif text-fuchsia-950 text-3xl`}
        >
            <div className="bg-slate-500 rounded-3xl mb-10 w-64 sm:w-96 mx-auto">
                <h2>Contact</h2>
            </div>
            <Map />
            <div className="my-8 bg-slate-500 rounded-3xl w-64 sm:w-96 mx-auto">
                <p className="text-lg">
                    <strong>Adress: </strong>CJ, RO
                </p>
                <p className="text-lg">
                    <strong>Phone: </strong>1234567890
                </p>
                <p className="text-lg">
                    <strong>Email: </strong>makeupsalon@test.com
                </p>
            </div>
        </div>
    );
}
