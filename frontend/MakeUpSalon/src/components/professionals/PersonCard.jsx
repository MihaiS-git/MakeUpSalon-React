export default function PersonCard({ employee }) {
    return (
        <div className="border border-slate-400 rounded-lg shadow-lg h-full text-clip bg-fuchsia-900">            
            <img
                src={employee.person.pictureUrl}
                alt={employee.person.firstName}
                className="w-full object-cover rounded-t-lg"
            />
            <h3 className="font-semibold m-2 text-slate-400 text-sm  md:text-md lg:text-lg">
                {employee.person.firstName} {employee.person.lastName}
            </h3>
            <hr className="m-4 text-slate-400" />
            <p className="mx-auto my-2 text-base text-slate-400 sm:text-sm">
                <strong>DOB:</strong> {employee.person.dateOfBirth}
            </p>
            <hr className="m-4 text-slate-400" />
            <p className="mx-auto my-2 text-base text-slate-400 sm:text-sm">
                <strong>Address:</strong> {employee.person.address}
            </p>
            <p className="mx-auto my-2 text-base text-slate-400 sm:text-sm">
                <strong>Phone:</strong> {employee.person.phoneNumber}
            </p>
        </div>
    );
}
