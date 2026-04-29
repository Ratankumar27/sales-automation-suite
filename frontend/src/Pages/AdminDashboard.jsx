import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "../CSS/AdminDashboard.css";
import { Modal, Button, Form } from "react-bootstrap";

function AdminDashboard() {
  const [show, setShow] = useState(false);
  const [modalType, setModalType] = useState("");
  const [formData, setFormData] = useState({});
  const [result, setResult] = useState(null);

  const handleClose = () => {
    setShow(false);
    setFormData({});
    setResult(null);
  };

  const openModal = (type) => {
    setModalType(type);
    setShow(true);
    setFormData({});
    setResult(null);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      let response;

      // ADD PRODUCT
      if (modalType === "Add Product") {
        response = await axios.post(
          "http://localhost:8181/admin/products/add",
          {
            name: formData.name,
            description: formData.description,
            price: Number(formData.price),
            stock: Number(formData.stock),
            categoryId: Number(formData.categoryId),
            imageUrl: formData.imageUrl,
          }
        );
      }

      // DELETE PRODUCT
      else if (modalType === "Delete Product") {
        response = await axios.delete(
          "http://localhost:8181/admin/products/delete",
          {
            data: {
              productId: Number(formData.productId),
            },
          }
        );
      }

      // MODIFY USER
      else if (modalType === "Modify User") {
        response = await axios.put(
          "http://localhost:8181/admin/user/modify",
          {
            userId: Number(formData.userId),
            username: formData.username,
            email: formData.email,
            role: formData.role,
          }
        );
      }

      // VIEW USER
      else if (modalType === "View User Details") {
        response = await axios.get(
          `http://localhost:8181/admin/user/getbyid?userId=${formData.userId}`
        );
      }

      // MONTHLY BUSINESS
      else if (modalType === "Monthly Business") {
        response = await axios.get(
          `http://localhost:8181/admin/business/monthly?month=${formData.month}&year=${formData.year}`
        );
      }

      // DAILY BUSINESS
      else if (modalType === "Daily Business") {
        response = await axios.get(
          `http://localhost:8181/admin/business/daily?date=${formData.date}`
        );
      }

      // YEARLY BUSINESS
      else if (modalType === "Yearly Business") {
        response = await axios.get(
          `http://localhost:8181/admin/business/yearly?year=${formData.year}`
        );
      }

      // OVERALL BUSINESS
      else if (modalType === "Overall Business") {
        response = await axios.get(
          "http://localhost:8181/admin/business/overall"
        );
      }

      setResult(response.data);
    } catch (error) {
      alert("Something went wrong!");
      console.log(error);
    }
  };

  const renderModalBody = () => {
    switch (modalType) {
      case "Add Product":
        return (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                name="name"
                onChange={handleChange}
                type="text"
                placeholder="Enter product name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                onChange={handleChange}
                type="text"
                placeholder="Enter description"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                name="price"
                onChange={handleChange}
                type="number"
                placeholder="Enter price"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                name="stock"
                onChange={handleChange}
                type="number"
                placeholder="Enter stock"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Category ID</Form.Label>
              <Form.Control
                name="categoryId"
                onChange={handleChange}
                type="number"
                placeholder="Enter category id"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                name="imageUrl"
                onChange={handleChange}
                type="text"
                placeholder="Enter image url"
              />
            </Form.Group>
          </>
        );

      case "Delete Product":
        return (
          <Form.Group className="mb-3">
            <Form.Label>Product ID</Form.Label>
            <Form.Control
              name="productId"
              onChange={handleChange}
              type="number"
              placeholder="Enter product id"
            />
          </Form.Group>
        );

      case "Modify User":
        return (
          <>
            <Form.Group className="mb-3">
              <Form.Label>User ID</Form.Label>
              <Form.Control
                name="userId"
                onChange={handleChange}
                type="number"
                placeholder="Enter user id"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                name="username"
                onChange={handleChange}
                type="text"
                placeholder="Enter username"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                onChange={handleChange}
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Control
                name="role"
                onChange={handleChange}
                type="text"
                placeholder="ADMIN / CUSTOMER"
              />
            </Form.Group>
          </>
        );

      case "View User Details":
        return (
          <Form.Group className="mb-3">
            <Form.Label>User ID</Form.Label>
            <Form.Control
              name="userId"
              onChange={handleChange}
              type="number"
              placeholder="Enter user id"
            />
          </Form.Group>
        );

      case "Monthly Business":
        return (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Month</Form.Label>
              <Form.Control
                name="month"
                onChange={handleChange}
                type="number"
                placeholder="Enter month"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Year</Form.Label>
              <Form.Control
                name="year"
                onChange={handleChange}
                type="number"
                placeholder="Enter year"
              />
            </Form.Group>
          </>
        );

      case "Daily Business":
        return (
          <Form.Group className="mb-3">
            <Form.Label>Date</Form.Label>
            <Form.Control
              name="date"
              onChange={handleChange}
              type="date"
            />
          </Form.Group>
        );

      case "Yearly Business":
        return (
          <Form.Group className="mb-3">
            <Form.Label>Year</Form.Label>
            <Form.Control
              name="year"
              onChange={handleChange}
              type="number"
              placeholder="Enter year"
            />
          </Form.Group>
        );

      case "Overall Business":
        return <p>Click submit to get overall business report.</p>;

      default:
        return null;
    }
  };

  return (
    <div className="admin-container">
      <h2 className="admin-title">Admin Dashboard</h2>

      <div className="row g-4">
        {[
          "Add Product",
          "Delete Product",
          "Modify User",
          "View User Details",
          "Monthly Business",
          "Daily Business",
          "Yearly Business",
          "Overall Business",
        ].map((item, index) => (
          <div className="col-md-3" key={index}>
            <div
              className="admin-card p-4 text-center"
              onClick={() => openModal(item)}
            >
              <h5>{item}</h5>
            </div>
          </div>
        ))}
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{modalType}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>{renderModalBody()}</Form>

          {result && (
            <div className="report-box mt-3">
              <pre>{JSON.stringify(result, null, 2)}</pre>
            </div>
          )}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>

          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AdminDashboard;