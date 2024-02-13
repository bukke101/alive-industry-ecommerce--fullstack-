import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { CountryProvider } from "./context/CountryContext";
import { CartProvider } from "./context/CartContext";
import { AccountProvider } from "./context/AccountContext";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Product from "./pages/Product";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Team from "./pages/Team";
import About from "./pages/About";
import Account from "./pages/Account";
import NotFound from "./components/notfound/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import NewPassword from "./pages/NewPassword";
import "./style.css";

const queryClient = new QueryClient();

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       refetchOnWindowFocus: false,
//       staleTime: 1000 * 60 * 60 * 24,
//       retry: 1,
//     },
//   },
// });

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <CountryProvider>
          <CartProvider>
            <AccountProvider>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route path="*" element={<NotFound />} />
                  <Route path="/" element={<Home />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/products/:id" element={<Product />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/team" element={<Team />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/account" element={<Account />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/new-password" element={<NewPassword />} />
                </Route>
              </Routes>
            </AccountProvider>
          </CartProvider>
        </CountryProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
