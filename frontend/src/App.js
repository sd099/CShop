import React from "react";
import Header from "./components/header/header.component";
import Footer from "./components/footer/footer.component";
import HomePage from "./pages/home-page/home-page.component";
import ProductPage from "./pages/product-page/product-page.component";
import CartPage from "./pages/cart-page/cart-page.component";
import LoginPage from "./pages/login-page/login-page.component";
import RegisterPage from "./pages/register-page/register-page.component";
import ProfilePage from "./pages/profile-page/profile-page.component";
import ShippingPage from "./pages/shipping-page/shipping-page.component";
import PlaceOrderPage from "./pages/place-order/place-order.component";
import OrderPage from "./pages/order-page/order-page.component";
import UserListPage from "./pages/user-list-page/user-list-page.component";
import UserEditPage from "./pages/user-edit-page/user-edit-page.component";
import ProductListPage from "./pages/product-list-page/product-list-page.component";
import ProductEditPage from "./pages/product-edit-page/product-edit-page.component";
import OrderListPage from "./pages/order-list-page/order-list-page.component";
import CategoryWiseProducts from "./pages/category-wise-products/category-wise-products.component";
import { Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <div>
          <Route path="/search/:keyword" exact component={HomePage} />
          <Route path="/page/:pageNumber" exact component={HomePage} />
          <Route
            path="/search/:keyword/page/:pageNumber"
            component={HomePage}
            exact
          />
          <Route path="/" exact component={HomePage} />
          <Route path="/product/:id" exact component={ProductPage} />
          <Route path="/cart/:id?" exact component={CartPage} />
          <Route path="/man" component={CategoryWiseProducts} />
          <Route path="/woman" component={CategoryWiseProducts} />
          <Route path="/login" exact component={LoginPage} />
          <Route path="/register" exact component={RegisterPage} />
          <Route path="/profile" exact component={ProfilePage} />
          <Route path="/shipping" exact component={ShippingPage} />
          <Route path="/placeorder" exact component={PlaceOrderPage} />
          <Route path="/order/:id" exact component={OrderPage} />
          <Route path="/admin/userlist" exact component={UserListPage} />
          <Route path="/admin/user/:id/edit" exact component={UserEditPage} />
          <Route path="/admin/productlist" exact component={ProductListPage} />
          <Route
            path="/admin/productlist/:pageNumber"
            component={ProductListPage}
            exact
          />
          <Route
            path="/admin/product/:id/edit"
            exact
            component={ProductEditPage}
          />
          <Route path="/admin/orderlist" exact component={OrderListPage} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
