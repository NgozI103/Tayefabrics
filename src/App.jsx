import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import SpaLinkInterceptor from "./components/SpaLinkInterceptor";
import AdminDashboard from "./components/admin/AdminDashboard";
import CustomersPage from "./components/admin/pages/CustomersPage";
import EarningsPage from "./components/admin/pages/EarningsPage";
import MessagesPage from "./components/admin/pages/MessagesPage";
import NotificationsPage from "./components/admin/pages/NotificationsPage";
import OrdersPage from "./components/admin/pages/OrdersPage";
import OverviewPage from "./components/admin/pages/OverviewPage";
import ProductsPage from "./components/admin/pages/ProductsPage";
import ReviewsPage from "./components/admin/pages/ReviewsPage";
import AboutPage from "./pages/AboutPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ContactPage from "./pages/ContactPage";
import FaqPage from "./pages/FaqPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import HomePage from "./pages/HomePage";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import ProductPage from "./pages/ProductPage";
import ProfileDetailsPage from "./pages/ProfileDetailsPage";
import ShopPage from "./pages/ShopPage";
import SignupPage from "./pages/SignupPage";
import UrgentTailorMeasurementsPage from "./pages/UrgentTailorMeasurementsPage";
import UrgentTailorReviewPage from "./pages/UrgentTailorReviewPage";
import UrgentTailorSuccessPage from "./pages/UrgentTailorSuccessPage";
import UrgentTailorPage from "./pages/UrgentTailorPage";
import WishlistPage from "./pages/WishlistPage";
import { legacyRedirects } from "./utils/navigation";

const canonicalRoutes = [
  { path: "/home", element: <HomePage /> },
  { path: "/index", element: <IndexPage /> },
  { path: "/about", element: <AboutPage /> },
  { path: "/shop", element: <ShopPage /> },
  { path: "/cart", element: <CartPage /> },
  { path: "/wishlist", element: <WishlistPage /> },
  { path: "/checkout", element: <CheckoutPage /> },
  { path: "/contact", element: <ContactPage /> },
  { path: "/faq", element: <FaqPage /> },
  { path: "/auth/login", element: <LoginPage /> },
  { path: "/auth/signup", element: <SignupPage /> },
  { path: "/auth/forgot-password", element: <ForgotPasswordPage /> },
  { path: "/profile", element: <ProfileDetailsPage /> },
  { path: "/urgent-tailor", element: <UrgentTailorPage /> },
  { path: "/urgent-tailor/measurements", element: <UrgentTailorMeasurementsPage /> },
  { path: "/urgent-tailor/review", element: <UrgentTailorReviewPage /> },
  { path: "/urgent-tailor/success", element: <UrgentTailorSuccessPage /> },
];

function RedirectWithQuery({ to }) {
  const location = useLocation();
  return <Navigate to={`${to}${location.search}${location.hash}`} replace />;
}

export default function App() {
  return (
    <>
      <SpaLinkInterceptor />
      <div className="min-h-screen bg-white text-black antialiased">
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />

          <Route path="/admin/*" element={<AdminDashboard />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<OverviewPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="customers" element={<CustomersPage />} />
            <Route path="reviews" element={<ReviewsPage />} />
            <Route path="earnings" element={<EarningsPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="*" element={<Navigate to="dashboard" replace />} />
          </Route>

          {canonicalRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}

          <Route path="/product" element={<ProductPage />} />
          <Route path="/product/:slug" element={<ProductPage />} />

          <Route path="/login" element={<Navigate to="/auth/login" replace />} />
          <Route path="/dashboard" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/signup" element={<Navigate to="/auth/signup" replace />} />
          <Route
            path="/forgot-password"
            element={<Navigate to="/auth/forgot-password" replace />}
          />
          <Route path="/profile-details" element={<Navigate to="/profile" replace />} />

          {legacyRedirects.map((route) => (
            <Route
              key={`legacy-${route.from}`}
              path={route.from}
              element={<RedirectWithQuery to={route.to} />}
            />
          ))}

          <Route path="/userpage" element={<Navigate to="/home" replace />} />
          <Route path="/userpage/" element={<Navigate to="/home" replace />} />

          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </div>
    </>
  );
}
