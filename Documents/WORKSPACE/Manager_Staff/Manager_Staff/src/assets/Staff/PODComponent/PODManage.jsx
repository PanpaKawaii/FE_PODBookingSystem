import React from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import POD from '../ManagerImage/POD.jpg'
import { Link } from 'react-router-dom';
import './PODManage.css';
import Button from 'react-bootstrap/Button'; // Thêm import cho Button
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'; // Thêm import cho biểu tượng
// import { fetchPODData } from '../api/PODApi'; // Import the API call function
// import { useState, useEffect } from 'react';

export default function PODManage() {
  // const [podData, setPodData] = useState([]);

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const data = await fetchPODData();
  //       setPodData(data);
  //     } catch (error) {
  //       console.error('Failed to fetch POD data:', error);
  //     }
  //   };

  //   getData();
  // }, []);

  return (
    <>
      
       

      <Row xs={1} sm={2} md={3} lg={4} className="g-5">
        {/* {podData.map((pod, idx) => ( // Use fetched data */}
        {Array.from({ length: 12 }).map((_, idx) => (
          <Col key={idx}>
            <Card style={{ height: '30rem', maxWidth: '30rem' }} >
              <Card.Img variant="top" src={POD} />
              <Card.Body>
                <Card.Title>POD</Card.Title> {/* Update to use dynamic title */}
                <Card.Text>
                  <div>POD</div> {/* Changed <p> to <div> */}
                  <div>ID: </div> {/* Changed <p> to <div> */}
                  <div>Trạng thái: </div> {/* Changed <p> to <div> */}
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
      
    </>
  );
}

// // Thêm các hàm xử lý cho nút sửa và xóa
// function handleEdit(index) {
//   // Logic để sửa thẻ
// }

// function handleDelete(index) {
//   // Logic để xóa thẻ
// }
