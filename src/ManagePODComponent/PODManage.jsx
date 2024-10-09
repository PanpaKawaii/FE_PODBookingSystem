import React from 'react'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import POD from '../Admin_image/adminhome.jpg'
import Button from 'react-bootstrap/Button'; // Thêm import cho Button
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'; // Thêm import cho biểu tượng

export default function PODManage() {
  return (
    <>

      <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-5">
        {Array.from({ length: 12 }).map((_, idx) => (
          <Col key={idx}>
            <Card
              style={{ maxWidth: '18rem' }} // sửa 'maxwidth' thành 'maxWidth'
            >
              <Card.Img variant="top" src={POD} />
              <Card.Body>
                <Card.Title>Card title</Card.Title>
                <Card.Text>
                  <p>POD</p>
                  <p>ID: 1234567890 </p>
                  <p>Status: Active</p>
                  <p></p>
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
  )
}

// // Thêm các hàm xử lý cho nút sửa và xóa
// function handleEdit(index) {
//   // Logic để sửa thẻ
// }

// function handleDelete(index) {
//   // Logic để xóa thẻ
// }
