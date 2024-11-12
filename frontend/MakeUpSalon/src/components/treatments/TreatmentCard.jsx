export default function TreatmentCard({ treatment }) {
    const formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(treatment.price);

    return (
        <div className="border border-slate-400 rounded-lg shadow-lg h-full text-clip bg-fuchsia-900 ">
            <img src={treatment.pictureUrl} alt={treatment.name} className="w-full object-cover rounded-t-lg"/>
            <h3 className="font-semibold m-2 text-slate-400 text-sm  md:text-md lg:text-lg">{treatment.name}</h3>
            <p className="text-base text-slate-400 m-2 sm:text-sm">{treatment.description}</p>
            <hr className="my-4 text-slate-400"/>
            <p className="m-2 text-base text-slate-400 sm:text-sm"><strong>Duration:</strong> {treatment.estimatedDuration} mins</p>
            <hr className="my-4 text-slate-400"/>
            <p className="m-2 text-base text-slate-400 sm:text-sm"><strong>Price:</strong> {formattedPrice} </p>
        </div>
    );
}
