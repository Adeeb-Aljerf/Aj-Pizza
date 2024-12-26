// Test ID: IIDSAT
import { useFetcher, useLoaderData } from 'react-router-dom';

import OrderItem from './OrderItem';

import { getOrder } from '../../services/apiRestaurant';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';
import { useEffect } from 'react';

function Order() {
  const order = useLoaderData();
  const fetcher = useFetcher();

  useEffect(
    function () {
      if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu');
    },
    [fetcher],
  );

  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="mx-auto mt-4 max-w-3xl space-y-4 rounded-lg bg-white px-4 py-3 shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b pb-2">
        <h2 className="text-lg font-semibold">Order #{id} status</h2>

        <div className="space-x-2">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-1 text-sm font-semibold uppercase tracking-wide text-green-50">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 border-l-4 border-stone-200 bg-stone-50 px-4 py-3">
        <p className="font-medium">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-y divide-stone-100 border-b border-t border-dashed">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            isLoadingIngredients={fetcher.state === 'loading'}
            ingredients={
              fetcher?.data?.find((el) => el.id === item.pizzaId)
                ?.ingredients ?? []
            }
          />
        ))}
      </ul>

      <div className="space-y-1 rounded-b-lg border-t-2 border-dashed bg-stone-50 px-4 py-3">
        <p className="flex justify-between text-sm font-medium text-stone-600">
          <span>Price pizza:</span>
          <span>{formatCurrency(orderPrice)}</span>
        </p>
        {priority && (
          <p className="flex justify-between text-sm font-medium text-stone-600">
            <span>Price priority:</span>
            <span>{formatCurrency(priorityPrice)}</span>
          </p>
        )}
        <p className="flex justify-between border-t pt-2 text-lg font-bold">
          <span>To pay on delivery:</span>
          <span>{formatCurrency(orderPrice + priorityPrice)}</span>
        </p>
      </div>
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
