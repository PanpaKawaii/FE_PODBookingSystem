import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import location from './../PODimage/location.jpg'
import space from './../PODimage/space.jpg'
import { Link } from 'react-router-dom'

export default function Store() {
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <div className="card">
            <img src={location} alt="Store 1" className="card-img-top" style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
            <div className="card-body">
              <h5 className="card-title">Store 1</h5>
              <p className="card-text">Địa chỉ: 123 Main St, City, Country</p>
              <Link to="/storedetail">Tìm hiểu thêm</Link>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card">
            <img src={space} alt="Store 2" className="card-img-top" style={{ width: '100%', height: '400px', objectFit: 'cover' }} />
            <div className="card-body">
              <h5 className="card-title">Store 2</h5>
              <p className="card-text">Địa chỉ: 456 Elm St, City, Country</p>
              <Link to="/storedetail">Tìm hiểu thêm</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
