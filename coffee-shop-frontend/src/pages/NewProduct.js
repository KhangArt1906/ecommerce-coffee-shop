import React, { useState } from "react";
import {
  Row,
  Col,
  Container,
  Alert,
  FormSelect,
  Form,
  Button,
} from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import "./NewProduct.css";
import { useCreateProductMutation } from "../services/appApi";
import axios from "../axios";

function NewProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [imgToRemove, setImgToRemove] = useState(null);
  const navigate = useNavigate();
  const [createProduct, { isError, error, isLoading, isSuccess }] =
    useCreateProductMutation();

  //Remove Image
  function handleRemoveImg(imgObj) {
    setImgToRemove(imgObj.public_id);
    axios
      .delete(`/images/${imgObj.public_id}/`)
      .then((res) => {
        setImgToRemove(null);
        setImages((prev) =>
          prev.filter((img) => img.public_id !== imgObj.public_id)
        );
      })
      .catch((e) => console.log(e));
  }

  //Submit Product
  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !description || !price || !category || !images.length) {
      return window.alert("Please fill into the input field");
    }
    createProduct({ name, description, price, category, images }).then(
      ({ data }) => {
        if (data.length > 0) {
          setTimeout(() => {
            navigate("/");
          }, 1500);
        }
      }
    );
  }

  function showWidget() {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "ecommerce-coffee-shop",
        uploadPreset: "coffeeshop",
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setImages((prev) => [
            ...prev,
            { url: result.info.url, public_id: result.info.public_id },
          ]);
        }
      }
    );
    widget.open();
  }

  return (
    <Container>
      <Row>
        <Col md={6} className="new-product__form--container">
          <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
            <h1>Create a product</h1>
            {isSuccess && (
              <Alert variant="success">Product created with success</Alert>
            )}
            {isError && <Alert variant="danger">{error.data}</Alert>}

            <Form.Group className="mb-3">
              <Form.Label>Product name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter product name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Product description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Product description"
                style={{ height: "100px" }}
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price(USD)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Price (USD)"
                value={price}
                required
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group
              className="mb-3"
              onChange={(e) => setCategory(e.target.value)}
            >
              <Form.Label>Category</Form.Label>
              <FormSelect>
                <option disabled selected>
                  ---- Select One ----
                </option>
                <option value="coffee roasters">Coffee Roasters</option>
                <option value="paper filter coffee">Paper Filter Coffee</option>
                <option value="instant coffee">Instant Coffee</option>
                <option value="coffee beans">Coffee Beans</option>
                <option value="filter cup">Filter - Cup</option>
                <option value="premium coffee trung nguyen">
                  Premium Trung Nguyen Coffee
                </option>
                <option value="tea">Tea</option>
                <option value="basket gift tet holiday">
                  Basket Gift Tet Holiday
                </option>
                <option value="danisa cake">Danisa Cake</option>
              </FormSelect>
            </Form.Group>

            <Form.Group className="mb-3">
              <Button type="button" onClick={showWidget}>
                Upload Images
              </Button>
              <div className="images-preview-container">
                {images.map((image) => (
                  <div className="image-preview">
                    <img src={image.url} alt={image.url} />
                    {imgToRemove !== image.public_id && (
                      <i
                        className="fa fa-times-circle"
                        onClick={() => handleRemoveImg(image)}
                      ></i>
                    )}
                    {/* add icon for removing*/}
                  </div>
                ))}
              </div>
            </Form.Group>

            <Form.Group>
              <Button
                type="submit"
                style={{ marginTop: "16px" }}
                disabled={isLoading || isSuccess}
              >
                Create Product
              </Button>
            </Form.Group>
          </Form>
        </Col>
        <Col md={6} className="new-product__image--container"></Col>
      </Row>
    </Container>
  );
}

export default NewProduct;
