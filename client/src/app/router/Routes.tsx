import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import AboutPage from "../../features/about/AboutPage";
import Catalog from "../../features/catalog/Catalog";
import ProductDetails from "../../features/catalog/ProductDetails";
import ContactPage from "../../features/contact/ContactPage";
import ServerError from "../errors/ServerError";
import NotFound from "../errors/NotFound";
import BasketPage from "../../features/basket/BasketPage";
import CheckoutPage from "../../features/checkout/CheckoutPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <HomePage /> },
            { path: "catalog", element: <Catalog /> },
            { path: "catalog/:id", element: <ProductDetails /> },
            { path: "about", element: <AboutPage /> },
            { path: "contact", element: <ContactPage /> },
            { path: "servererror", element: <ServerError /> },
            { path: "notfound", element: <NotFound /> },
            { path: "basket", element: <BasketPage /> },
            { path: "checout", element: <CheckoutPage /> },
            { path: "*", element: <Navigate replace to="/notfound" /> }
        ]
    }
])