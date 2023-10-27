import React, { useEffect, useState } from "react";
import "./OrdersPage.css";
import axios from "../axios";
import { useSelector } from "react-redux";
import { Badge, Button, Container, Modal, Table } from "react-bootstrap";
import Loading from "../components/Loading";
import Pagination from "../components/Pagination";

function OrdersPage() {
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ordersToShow, setOrderToShow] = useState([]);
  const [show, setShow] = React.useState(false);

  //console.log(orders);

  //Function handleClose to close the modal
  const handleClose = () => setShow(false);

  const fetchListOders = () => {
    setLoading(true);
    axios
      .get(`/users/${user._id}/orders`)
      .then(({ data }) => {
        setLoading(false);
        setOrders(data);
      })
      .catch((e) => {
        setLoading(false);
        console.log(e.message);
      });
  };
  useEffect(() => {
    fetchListOders();
  }, []);

  //Function showOrder to show a list of customer orders
  function showOrder(productsObj) {
    let productsToShow = products.filter((product) => productsObj[product._id]);
    productsToShow = productsToShow.map((product) => {
      const productCopy = { ...product };
      productCopy.count = productsObj[product._id];
      delete productCopy.description;
      return productCopy;
    });
    setShow(true);
    setOrderToShow(productsToShow);
  }

  if (loading) {
    return <Loading />;
  }

  if (orders.length === 0) {
    return <h1 className="text-center pt-3">No orders yet</h1>;
  }

  function TableRow({ _id, date, total, status, products }) {
    return (
      <tr>
        <td>{_id}</td>
        <td>
          <Badge
            bg={`${status === "processing" ? "warning" : "success"}`}
            text="white"
          >
            {status}
          </Badge>
        </td>
        <td>{date}</td>
        <td>${total}</td>
        <td>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => showOrder(products)}
          >
            View order <i className="fa fa-eye"></i>
          </span>
        </td>
      </tr>
    );
  }

  return (
    <Container>
      <h1 className="text-center">Your Orders</h1>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Status</th>
            <th>Date</th>
            <th>Total</th>
            <th>View</th>
          </tr>
        </thead>

        <tbody>
          <Pagination
            data={orders}
            RenderComponent={TableRow}
            pageLimit={1}
            dataLimit={10}
            tablePagination={true}
          />
        </tbody>
      </Table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>

        {ordersToShow.map((order) => (
          <div className="order-details__container d-flex justify-content-around py-2">
            <img
              src={order.pictures[0].url}
              style={{ maxWidth: 70, maxHeight: 70, objectFit: "cover" }}
            />

            <p>
              <span>{order.count} x </span>
              {order.name}
            </p>
            <p>Price: ${Number(order.price) * order.count}</p>
          </div>
        ))}

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default OrdersPage;
