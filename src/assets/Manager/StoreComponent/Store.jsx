import React from 'react';

import location from '../ManagerImage/location.jpg'
import space from '../ManagerImage/space.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'; // Thêm import cho biểu tượng
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'; // Thêm import cho Button
import './style.css';

export default function Store() {
    return (
        <>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <img src={location} alt="Store 1" className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">Store 1</h5>
                                <p>Địa chỉ: 123 Main St, City, Country</p>
                                <p>Số điện thoại: 123-456-7890</p>
                                <p>Email: info@store1.com</p>
                                <p>Giờ mở cửa: 9:00 AM - 5:00 PM</p>
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
                    <div className="col-md-6">
                        <div className="card">
                            <img src={space} alt="Store 2" className="card-img-top" />
                            <div className="card-body">
                                <h5 className="card-title">Store 2</h5>
                                <p>Địa chỉ: 123 Main St, City, Country</p>
                                <p>Số điện thoại: 123-456-7890</p>
                                <p>Email: info@store1.com</p>
                                <p>Giờ mở cửa: 9:00 AM - 5:00 PM</p>
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