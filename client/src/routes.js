import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Switch, Route, Redirect} from 'react-router-dom';
import Product from './components/product/product';
import Preloader from './components/common/preloader/preloader';
import AdminPage from './pages/admin-page/admin-page';
import AuthPage from './pages/auth-page/auth-page';
import CartPage from './pages/cart-page/cart-page';
import MainPage from './pages/main-page/main-page';
import ProductPage from './pages/product-page/product-page';
import ProfilePage from './pages/profile-page/profile-page';
import { getCatalogItems } from './redux/actions';

const useRoutes = (isLogin, admin) => {
  const dispatch = useDispatch();
  const products = useSelector(state => state.marketReducer.catalogProducts);
  const loading = useSelector(state => state.marketReducer.loading);

  useEffect(() => {
    dispatch(getCatalogItems())
  }, [])

  if (isLogin) {
    return (
      <React.Fragment>
        { !loading && products.length ?
        <React.Fragment>
          <Route path="/catalog" exact>
            <MainPage products={products} />
          </Route>
          <Route path="/catalog/:id" exact>
            <ProductPage products={products} />
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
          <Redirect from="/login" to="/catalog" />
        </React.Fragment>
        : <Preloader/>
        }
      </React.Fragment>
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
