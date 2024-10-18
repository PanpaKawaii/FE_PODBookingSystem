import React from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import des from '../Admin_image/adminhome.jpg'
import { Link } from 'react-router-dom';
import './PODManage.css';
import Button from 'react-bootstrap/Button'; // Thêm import cho Button
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'; // Thêm import cho biểu tượng
import { useState, useEffect } from 'react';
import api from '../api/axios';

const POD = () => {

  const [Pod, setPod] = useState([]);
  const fetchPod = async () => {
    try {
      const response = await api.get("Pod");
      setPod(response.data); // Directly set the fetched data
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchPod();
  }, []);
  return (
    <>
      <div className='title-pod'>
      <h1>POD</h1>
        <button className='add-pod-button'>
          <Link to="/addpod">Thêm POD</Link>
        </button>
        
      </div>
      <Row xs={1} sm={2} md={3} lg={3} className="g-5">
        {Pod.map((pod, idx) => (
          <Col key={idx}>
            <Card className='pod-card'>
              <Card.Img className='pod-img' variant="top" src={des} />
              <Card.Body>
                <Card.Title>{pod.name}</Card.Title>
                <Card.Text>
                  <p><strong>ID:</strong> {pod.id}</p>
                  <p><strong>Trạng thái:</strong> {pod.status}</p>
                  <p><strong>Mô tả:</strong> {pod.description}</p>
                  <p><strong>Đánh giá:</strong> {pod.rating}</p>
                  <p><strong>Cửa hàng:</strong> {pod.storeId}</p>
                </Card.Text>
                <Card.Footer className='d-flex justify-content-between'>
                  <Button variant onClick={() => handleEdit(idx)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </Button>
                  <Button variant onClick={() => handleDelete(idx)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </Card.Footer>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};
export default POD;
