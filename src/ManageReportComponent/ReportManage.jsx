import React from 'react'
import './ReportManage.css'; // Import the CSS file
import api from '../api/axios';
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';

export default function ReportManage() {
  const [Pod, setPod] = useState([]);
  const [store, setStore] = useState([]);
  const [type, setType] = useState([]);
  const [payment, setPayment] = useState([]);
  const [booking, setBooking] = useState([]);
  const [bookingOrder, setBookingOrder] = useState([]); // New state for BookingOrder
  const fetchPod = async () => {
    try {
      const response = await api.get("Pod");
      setPod(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  const fetchStore = async () => {
    try {
      const response = await api.get("Store");
      setStore(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  const fetchType = async () => {
    try {
      const response = await api.get("Type");
      setType(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  const fetchPayment = async () => {
    try {
      const response = await api.get("Payment");
      setPayment(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  const fetchBooking = async () => {
    try {
      const response = await api.get("Booking");
      setBooking(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  const fetchBookingOrder = async () => { // New function to fetch BookingOrder
    try {
      const response = await api.get("BookingOrder");
      setBookingOrder(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    fetchPod();
    fetchStore();
    fetchType();
    fetchPayment();
    fetchBooking();
    fetchBookingOrder();
  }, [])

  const getPodDetails = (podId) => {
    const pod = Pod.find(p => p.id === podId);
    if (!pod) return { name: '', typeId: '' };
    const typeName = type.find(t => t.id === pod.typeId)?.name || '';
    return { name: pod.name, typeName };
  };




  return (
    <div className="report-manage">
      <div className="report-controls">
        <div className="control-group">
          <label>
            Loại thời gian:
            <select>
              <option value="day">Báo cáo theo ngày</option>
              <option value="week">Báo cáo theo tuần</option>
              <option value="month">Báo cáo theo tháng</option>
            </select>
          </label>
          <label>
            Ngày bắt đầu:
            <input type="date" />
          </label>

        </div>
        <div className="control-group">
          <label>
            Cửa hàng:
            <select>
              {store.map((store) => (
                <option key={store.id} value={store.id}>{store.name}</option>
              ))}
            </select>
          </label>
          <label>
            Ngày kết thúc:
            <input type="date" />
          </label>
        </div>
        <button className="search-report">Tìm kiếm</button>
      </div>
      <hr />
      <div className="report-overview">
        <h3>Tổng quan</h3>
        <p><strong>Tổng doanh thu:</strong>{
          payment.reduce((total, payment) => total + payment.amount, 0) +
          bookingOrder.reduce((total, order) => total + order.amount, 0)
        }</p>        <p><strong>Doanh thu từ POD:</strong>{payment.reduce((total, payment) => total + payment.amount, 0)}</p>
        <p><strong>Doanh thu từ dịch vụ đi kèm:</strong>{bookingOrder.reduce((total, bookingOrder) => total + bookingOrder.amount, 0)}</p>
      </div>
      <hr />
      <div className="report-detail">
        <h3>Chi tiết</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Tên POD</th>
              <th>Loại POD</th>
              <th>Ngày đặt</th>
              <th>Doanh thu POD</th>
              <th>Doanh thu dịch vụ đi kèm</th>
              <th>Doanh thu tổng</th>
            </tr>
          </thead>
          <tbody>
            {payment.map((payment) => {
              const bookingEntry = booking.find(b => b.id === payment.bookingId);
              const podId = bookingEntry ? bookingEntry.podId : null;
              const podDetails = getPodDetails(podId);
              // Find the booking order amount

              const bookingOrderEntry = bookingOrder.find(bo => bo.bookingId === payment.bookingId);
              const bookingOrderAmount = bookingOrderEntry ? bookingOrderEntry.amount : 0;

              return (
                <tr key={payment.id}>
                  <td>{podDetails.name}</td>
                  <td>{podDetails.typeName}</td>
                  <td>{payment.date}</td>
                  <td>{payment.amount}</td>
                  <td>{bookingOrderAmount}</td>
                  <td>{payment.amount + bookingOrderAmount}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  )
}
