import React from "react";
import { Button, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./DashboardProduct.css";
import { useDeleteProductMutation } from "../services/appApi";

function DashboardProduct() {
  const products = useSelector((state) => state.products);
  const user = useSelector((state) => state.user);

  const [deleteProduct, { isLoading, isSuccess }] = useDeleteProductMutation();

  //removing the product
  function handleDeleteProduct(id) {
    //Using logic
    if (window.confirm("Are you sure want to delete?"))
      deleteProduct({ product_id: id, user_id: user._id });
  }

  return (
    <Table striped bordered hove responsive>
      <thead>
        <tr>
          <th></th>
          <th>Product ID</th>
          <th>Product Name</th>
          <th>Product Price</th>
        </tr>
      </thead>

      <tbody>
        {products.map((product) => (
          <tr>
            <td>
              <img
                src={product.pictures[0].url}
                className="dashboard-product-preview"
              />
            </td>

            <td>{product._id}</td>

            <td>{product.name}</td>

            <td>{product.price}</td>

            <td>
              <Button
                onClick={() => handleDeleteProduct(product._id, user._id)}
                disabled={isLoading}
              >
                Delete
              </Button>
              <Link
                to={`/product/${product._id}/edit`}
                className="btn btn-warning"
              >
                Edit Product
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default DashboardProduct;
