import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import ProductComponent from "./components/ProductComponent";
import Wishlist from './components/Wishlist'
import Cart from './components/Cart'
import { useCart } from "./hooks/useCart";
import { useWishlist } from "./hooks/useWishlist";

function App() {

  const { cart, addToCart, removeFromCart, clearCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  return (
    <>
      <Router>
        <Header cart={cart} />
        <Routes>
          <Route path="/" element={
            <ProductComponent addToCart={addToCart} addToWishlist={addToWishlist} />
            } />

          <Route path="/wishlist" element={
            <Wishlist addToCart={addToCart} wishlist={wishlist} removeFromWishlist={removeFromWishlist} />
            } />

          <Route path="/cart" element={
            <Cart cart={cart} removeFromCart={removeFromCart} clearCart={clearCart} />
            } />

        </Routes>
      </Router>
    </>
  );
}

export default App;
