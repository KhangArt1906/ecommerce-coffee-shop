import React from "react";
import axios from "../axios";
import { Col, Container, Nav, Row, Tab } from "react-bootstrap";
import "./AdminDashboard.css";
import DashboardProduct from "../components/DashboardProduct";

function AdminDashboard() {
  return (
    <Container>
      <Tab.Container defaultActiveKey="products">
        <Row>
          <Col sm={3}>
            <Nav variant="pills" className="flex-columns">
              <Nav.Item>
                <Nav.Link eventKey="products">Products</Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link eventKey="orders">Orders</Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <Nav.Link eventKey="clients">Clients</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>

          <Col sm={9}>
            <Tab.Content eventKey="products">
              <DashboardProduct></DashboardProduct>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
}

export default AdminDashboard;
