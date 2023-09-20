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

  function showWidget() {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: "",
        uploadReset: "",
      },
      (error, result) => {
        if (!error && result.event === "success") {
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
          <Form style={{ width: "100%" }}>
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
              <Form.Label>Price(Đồng)</Form.Label>
              <Form.Control
                type="number"
                placeholder="Price (Đồng)"
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
                <option value="ca phe rang xay">Ca Phe Rang Xay</option>
                <option value="ca phe phin">Ca Phe Phin</option>
                <option value="ca phe goi">Ca Phe Goi</option>
              </FormSelect>
            </Form.Group>

            <Form.Group className="mb-3">
              <Button type="button" onClick={showWidget}>
                Upload Images
              </Button>
              <div className="images-preview-container">
                {images.map((image) => (
                  <div className="image-preview">
                    <img src={image.url} />
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
