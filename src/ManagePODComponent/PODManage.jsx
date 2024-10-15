import React from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import POD from '../Admin_image/adminhome.jpg'
import { Link } from 'react-router-dom';
import './PODManage.css';
import Button from 'react-bootstrap/Button'; // Thêm import cho Button
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'; // Thêm import cho biểu tượng
import { useState, useEffect } from 'react';
import api from '../api/axios';

const PODManage = () => {
  const [Pod, setPod] = useState([]);

  const fetchPod = async () => {
    try {
      const response = await api.get("Pod");
      setPod(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    fetchPod();
  }, [])



  return (
    <>



      <Row xs={1} sm={2} md={3} lg={4} className="g-5">

        {Pod.map((pod, idx) => (
          <Col key={idx}>
            <Card style={{ height: '30rem', maxWidth: '30rem' }} >
              <Card.Img variant="top" src={POD} />
              <Card.Body>
                <Card.Title>{pod.name}</Card.Title> {/* Update to use dynamic title */}
                <Card.Text>
                  <div>ID: {pod.id}</div>
                  <div>Trạng thái: {pod.status}</div> {/* Changed <p> to <div> */}
                  <div>Mô tả: {pod.description}</div>
                  <div>Đánh giá: {pod.rating}</div>
                  <div>Cửa hàng: {pod.storeId}</div>
                </Card.Text>
                <Card.Footer className='d-flex justify-content-between'>
                  <Button variant onClick={() => handleEdit(idx)}>
                    <FontAwesomeIcon icon={faEdit} /> {/* Biểu tượng sửa */}
                  </Button>
                  <Button variant onClick={() => handleDelete(idx)}>
                    <FontAwesomeIcon icon={faTrash} /> {/* Biểu tượng xóa */}
                  </Button>
                </Card.Footer>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <button className='add-link' >
        <Link to="/addpod">Thêm POD</Link>
      </button>
    </>
  );
};
export default PODManage;
