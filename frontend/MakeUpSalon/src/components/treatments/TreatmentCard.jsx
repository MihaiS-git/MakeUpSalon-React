import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/cart-slice";

export default function TreatmentCard({ treatment }) {
    
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const formattedPrice = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(treatment.price);

    function handleAddToCart() {
        if (isAuthenticated) {
            
            dispatch(addToCart(treatment));
        }
    }

    return (
        <div
            className="border border-slate-200 rounded-lg shadow-[2px_2px_6px] shadow-fuchsia-950 h-full text-clip bg-fuchsia-900"
            onClick={handleAddToCart}
        >
            <img
                src={treatment.pictureUrl}
                alt={treatment.name}
                className="w-full object-cover rounded-t-lg"
            />
            <h3 className="font-semibold m-2 text-slate-400 text-sm md:text-md lg:text-lg">
                {treatment.name}
            </h3>
            <p className="text-base text-slate-400 my-2 mx-4 sm:text-sm">
                {treatment.description}
            </p>
            <hr className="m-4 text-slate-400" />
            <p className="mx-auto my-2 text-base text-slate-400 sm:text-sm">
                <strong>Duration:</strong> {treatment.estimatedDuration} mins
            </p>
            <hr className="m-4 text-slate-400" />
            <p className="mx-auto my-2 text-base text-slate-400 sm:text-sm">
                <strong>Price:</strong> {formattedPrice}{" "}
            </p>
            {isAuthenticated && (
                <button
                    onClick={handleAddToCart}
                    className="bg-fuchsia-400 text-fuchsia-950 text-base px-4 py-2 rounded my-4"
                >
                    Add To Cart
                </button>
            )}
        </div>
    );
}
