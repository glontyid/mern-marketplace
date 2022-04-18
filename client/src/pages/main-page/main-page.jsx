import React from 'react';
import Catalog from '../../components/catalog/catalog';
import AsideMenu from '../../components/aside/aside-menu';

const MainPage = ({products}) => {
  return (
    <div className="main-page">
      <AsideMenu products={products}/>
      <Catalog products={products}/>
    </div>
  );
}

export default MainPage;
