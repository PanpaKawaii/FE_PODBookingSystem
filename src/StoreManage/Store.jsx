import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'; // Thêm import cho biểu tượng
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'; // Thêm import cho Button
import { Link } from 'react-router-dom';
import './style.css';
import api from '../api/axios';
import space from '../Admin_image/space.jpg'
export default function Store() {

    const [store, setStore] = useState([]);

  const fetchStore = async () => {
    try {
      const response = await api.get("Store");
      setStore(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    fetchStore();
  }, [])
    return (
        <>
        <div className='title-store'>
            <h1>Cửa hàng</h1>
            <button className='add-store-button'>
                <Link to="/addstore">Thêm cửa hàng</Link>
            </button>
        </div>
            <div className="container mt-4">
                <div className="row">
                    {store.map((store, idx) => (
                    <div className="col-md-6" key={store.id || idx}>
                        <div className="card store-card">
                            <img src={space} alt="Store 1" className="store-img card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">{store.name}</h5>
                                <p>Địa chỉ: {store.address}</p>
                                <p>Số điện thoại: {store.contact}</p>
                                <p>Giờ mở cửa: 7:00 - 00:00 </p>
                                <p>Mô tả: Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                <Card.Footer className='d-flex justify-content-between'>
                                    <Button variant onClick={() => handleEdit(idx)}>
                                        <FontAwesomeIcon icon={faEdit} /> {/* Biểu tượng sửa */}
                                    </Button>
                                    <Button variant onClick={() => handleDelete(idx)}>
                                        <FontAwesomeIcon icon={faTrash} /> {/* Biểu tượng xóa */}
                                    </Button>
                                </Card.Footer>
                            </div>
                        </div>
                    </div>
                    
                    ))} 
                </div>
            </div>
          

        </>
    );
}
// function navigateToAddStore() {
//     // Logic to navigate to the add store form
//     // For example, using react-router:
//     // history.push('/add-store');
// }