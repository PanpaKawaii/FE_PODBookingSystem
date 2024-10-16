import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import POD from "../ManagerImage/POD.jpg";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { message, Popconfirm } from "antd";
import { faEdit, faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./PODManage.css";

export default function PODManage() {
  const [podData, setPodData] = useState([]);
  const apiPod = "https://localhost:7166/api/Pod";

  const fetchPODData = async () => {
    try {
      const response = await axios.get(apiPod);
      setPodData(response.data); // Lưu toàn bộ dữ liệu từ API vào state
    } catch (error) {
      console.error("Failed to fetch POD data:", error);
    }
  };
  const handleDelete = async (podId) => {
    try {
      await axios.delete(`${apiPod}/${podId}`);
      // toast.success("Company deleted successfully");
      message.info("Xoá thành công");
      fetchPODData();
    } catch (error) {
      console.error("Error deleting company:", error);
      // toast.error("Failed to delete company.");
      message.info("Xoá không thành công");
    }
  };
  const handleEdit = async (podId) => {
    await axios.put(`${apiPod}/${podId}`); // Cập nhật người dùng
  };

  useEffect(() => {
    fetchPODData();
  }, []);
  if (podData.length === 0) {
    return <p>Loading ...</p>;
  }
  return (
    <>
      <Row xs={1} sm={2} md={3} lg={4} className="g-5">
        {podData.map((pod) => (
          <Col key={pod.id}>
            <Card style={{ height: "30rem", maxWidth: "30rem" }}>
              <Card.Img variant="top" src={POD} />
              <Card.Body>
                <Card.Title>{pod.name}</Card.Title>
                <Card.Text>
                  <div>ID : {pod.id}</div>
                  <div>Trạng thái : {pod.status}</div>
                  <div>
                    Đánh giá : {pod.rating}{" "}
                    <FontAwesomeIcon
                      icon={faStar}
                      style={{ color: "#F2D338" }}
                    />
                  </div>
                </Card.Text>
                <Card.Footer className="d-flex justify-content-between">
                  <Button variant onClick={() => handleEdit(pod.id)}>
                    <FontAwesomeIcon icon={faEdit} /> {/* Biểu tượng sửa */}
                  </Button>
                  <Popconfirm
                    title="Bạn có chắc chắn muốn xóa công ty này?"
                    onConfirm={() => handleDelete(pod.id)} // Xóa khi bấm "Yes"
                    onCancel={() => message.info("Hủy xóa công ty thành công")} // Thông báo khi bấm "No"
                    okText="Có"
                    cancelText="Không"
                  >
                    <Button variant>
                      <FontAwesomeIcon
                        icon={faTrash}
                        style={{ color: "#CC0000" }}
                      />{" "}
                      {/* Biểu tượng xóa */}
                    </Button>
                  </Popconfirm>
                </Card.Footer>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
}

// // Thêm các hàm xử lý cho nút sửa và xóa
// function handleEdit(id) {
//   // Logic để sửa thẻ theo id
// }

// function handleDelete(id) {
//   // Logic để xóa thẻ theo id
// }
