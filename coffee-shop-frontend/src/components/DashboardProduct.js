import React from "react";
import { Button, Table } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./DashboardProduct.css";
import { useDeleteProductMutation } from "../services/appApi";
import Pagination from "./Pagination";

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

  function TableRow({ pictures, _id, name, price }) {
    return (
      <tr>
        <td>
          <img src={pictures[0].url} className="dashboard-product-preview" />
        </td>
        <td>{_id}</td>
        <td>{name}</td>
        <td>${price}</td>
        <td>
          <Button
            onClick={() => handleDeleteProduct(_id, user._id)}
            disabled={isLoading}
          >
            Delete
          </Button>
          <Link to={`/product/${_id}/edit`} className="btn btn-warning">
            Edit
          </Link>
        </td>
      </tr>
    );
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
        <Pagination
          data={products}
          RenderComponent={TableRow}
          pageLimit={1}
          dataLimit={5}
          tablePagination={true}
        />
      </tbody>
    </Table>
  );
}

export default DashboardProduct;
