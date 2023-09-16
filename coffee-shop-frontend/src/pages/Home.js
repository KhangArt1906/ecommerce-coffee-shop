import React from "react";
import { Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";
import categories from "../categories";
import "./Home.css";

function Home() {
  return (
    <div>
      <img
        src="https://trungnguyencoffeevn.com/wp-content/uploads/2020/04/92213026_1643567619130380_1460622359080730624_n-870x500.jpg"
        alt="Trung Nguyen"
      />
      <div className="featured-products-container container mt-4">
        <h2>Last products</h2>
        {/* Last products */}

        <div>
          <Link
            to="/category/all"
            style={{
              textAlign: "right",
              display: "block",
              textDecoration: "none",
            }}
          >
            See more {">>"}
          </Link>
        </div>
      </div>

      {/* sale banner */}
      <div className="sale-banner--container mt-4">
        <img
          alt="banner"
          src="https://plus.unsplash.com/premium_photo-1667520014867-ab3938feee79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1718&q=80"
        />
      </div>

      <div className="recent-products-container container mt-4">
        <h2>Categories</h2>
        <Row>
          {categories.map((category) => (
            <LinkContainer
              to={`/category/${category.name.toLocaleLowerCase()}`}
            >
              <Col md={4}>
                <div
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${category.img})`,
                    gap: "10px",
                  }}
                  className="category-tile"
                >
                  {category.name}
                </div>
              </Col>
            </LinkContainer>
          ))}
        </Row>
      </div>
    </div>
  );
}

export default Home;
