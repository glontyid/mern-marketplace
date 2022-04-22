import React from 'react';
import {useSelector} from "react-redux";
import {Switch, Route, Redirect} from 'react-router-dom';
import AdminPage from './pages/admin-page/admin-page';
import AuthPage from './pages/auth-page/auth-page';
import CartPage from './pages/cart-page/cart-page';
import MainPage from './pages/main-page/main-page';
import ProductPage from './pages/product-page/product-page';
import ProfilePage from './pages/profile-page/profile-page';

const useRoutes = (isLogin, admin) => {
  const product = useSelector(state => state.marketReducer.selectedProduct);
  const products = useSelector(state => state.marketReducer.catalogProducts);

  if (isLogin) {
    return (
      <Switch>
        <Route path="/" exact>
          <MainPage products={products} />
        </Route>
        <Route path="/catalog/:id">
          <ProductPage product={product} products={products} />
        </Route>
        <Route path="/profile" exact>
          <ProfilePage products={products} />
        </Route>
        <Route path="/cart" exact>
          <CartPage />
        </Route>
        { admin ? 
        <Route path="/admin" exact>
          <AdminPage products={products} />
        </Route>
        : false }
        <Redirect to="/" />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route path="/login" exact component={AuthPage}/>
      <Redirect to="/login" />
    </Switch>
  )
}

export default useRoutes
