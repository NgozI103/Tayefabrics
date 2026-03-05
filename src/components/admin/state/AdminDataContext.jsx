/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo, useState } from "react";

import { MSGS_INIT, NOTIFS_INIT, ORDERS_INIT, PRODUCTS_INIT, REVIEWS_INIT } from "../shared/theme";

const AdminDataContext = createContext(null);

export function AdminDataProvider({ children }) {
  const [products, setProducts] = useState(PRODUCTS_INIT);
  const [orders, setOrders] = useState(ORDERS_INIT);
  const [notifs, setNotifs] = useState(NOTIFS_INIT);
  const [messages, setMessages] = useState(MSGS_INIT);
  const [reviews, setReviews] = useState(REVIEWS_INIT);

  const unread = notifs.filter((notification) => !notification.read).length;

  const value = useMemo(
    () => ({
      products,
      setProducts,
      orders,
      setOrders,
      notifs,
      setNotifs,
      messages,
      setMessages,
      reviews,
      setReviews,
      unread,
    }),
    [messages, notifs, orders, products, reviews, unread],
  );

  return <AdminDataContext.Provider value={value}>{children}</AdminDataContext.Provider>;
}

export function useAdminData() {
  const context = useContext(AdminDataContext);

  if (!context) {
    throw new Error("useAdminData must be used within AdminDataProvider");
  }

  return context;
}
