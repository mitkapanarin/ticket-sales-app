import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeOneItemFromCart } from "../store/Slices/basket";
import { gradientTextStyles } from "../components/Text/TextStyles";
import { RootState } from "../store";
import { useGetMultipleEventsMutation } from "../store/API/EventsAPI";
import { useEffect, useState } from "react";
import BasketItemCard from "../components/Card/basketItemCard";

const ShoppingCart = () => {
  const [data, setData] = useState<any>([]);
  console.log("data", data);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const basketItems = useSelector(
    (state: RootState) => state?.Basket?.basketItems
  );

  console.log("Basket Items:", basketItems);
  const removeItem = (id: string) => {
    dispatch(removeOneItemFromCart(id));
  };

  const [getMultipleEvents, { isLoading, isError }] =
    useGetMultipleEventsMutation();

  useEffect(() => {
    getMultipleEvents({
      eventIDs: basketItems?.map((item) => item?.id),
    }).then((res) => setData(res));
  }, [basketItems]);

  if (isLoading) return <p>Loading...</p>;

  if (isError) return <p>Something went wrong</p>;

  if (basketItems?.length === 0) {
    return <p className="text-center">Your Shopping Cart is Empty</p>;
  }

  return (
    <div className="m-10">
      <h1
        className={`${gradientTextStyles} font-bold text-center text-2xl mb-3`}
      >
        Shopping Cart
      </h1>
      <div className="grid grid-cols-2 gap-10 m-10">
        {data?.data?.map((item: any) => (
          <BasketItemCard
            key={item?._id}
            {...item}
            removeItem={() => removeItem(item?._id)}
          />
        ))}
      </div>

      <div className="p-4 flex justify-between space-x-4 mt-32">
        <button
          onClick={() => navigate(-1)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Back
        </button>
        <button
          onClick={() => navigate("/checkout")}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;
