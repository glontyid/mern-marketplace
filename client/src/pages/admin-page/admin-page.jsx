import React from "react";
import './admin-page.scss';
import CreateProductForm from "../../components/admin/create-product-form/creact.product-form";
import ChangeProductsForm from "../../components/admin/change-products-form/change-products-form";

const AdminPage = ({products}) => {
  return(
    <div className="admin-page">
      <CreateProductForm />
      <ChangeProductsForm products={products}/>
    </div>
  )
}

export default AdminPage;