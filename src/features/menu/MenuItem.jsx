import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import DeleteItem from "../cart/DeleteItem";
import UpdateItemQuantity from "../cart/UpdateItemQuantity";
import { formatCurrency } from "../../utils/helpers";
import { addItem, getCurrentQuantityById } from "../cart/cartSlice";
import { useState } from "react";

function MenuItem({ pizza }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

  const currentQuantity = useSelector(getCurrentQuantityById(id));
  const isInCart = currentQuantity > 0;

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };
    dispatch(addItem(newItem));
  }

  return (
    <li className="flex gap-4 py-2">
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md">
        {/* Shimmer loading effect */}
        <div
          className={`absolute inset-0 transition-opacity duration-300
            ${isLoading ? "opacity-100" : "opacity-0"}`}
        >
          <div className="h-full w-full animate-shimmer bg-gradient-to-r from-stone-200 via-stone-100 to-stone-200 bg-[length:400%_100%]" />
        </div>

        {/* Actual image */}
        <img
          src={imageUrl}
          alt={name}
          loading="lazy"
          onLoad={() => setIsLoading(false)}
          className={`h-24 w-24 object-cover transition-all duration-300 ease-out
            ${isLoading ? "scale-105 blur-sm" : "scale-100 blur-0"}
            ${soldOut ? "grayscale" : ""}`}
        />
      </div>
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}

          {isInCart && (
            <div className="flex items-center gap-3 sm:gap-8">
              <UpdateItemQuantity
                pizzaId={id}
                currentQuantity={currentQuantity}
              />
              <DeleteItem pizzaId={id} />
            </div>
          )}

          {!soldOut && !isInCart && (
            <Button type="small" onClick={handleAddToCart}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
