import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Order.css";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const Order = () => {
  const [userData, setUserData] = useState([]);
  const [bookingData, setBookingData] = useState([]);

  const apiUser = "https://localhost:7166/api/User";
  const apiBooking = "https://localhost:7166/api/Booking";

  const fetchUserData = async () => {
    try {
      const response = await axios.get(apiUser);
      setUserData(response.data);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  };

  const fetchBookingData = async () => {
    try {
      const response = await axios.get(apiBooking);
      setBookingData(response.data);
    } catch (error) {
      console.error("Failed to fetch booking data:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchBookingData();
  }, []);

  if (userData.length === 0 || bookingData.length === 0) {
    return <p>Loading...</p>;
  }

  // Lọc ra những user có booking
  const usersWithBookings = userData.filter((user) =>
    bookingData.some((booking) => booking.userId === user.id)
  );

  return (
    <div className="user-manage">
      <h1>Thông tin khách hàng và booking</h1>
      {usersWithBookings.map((user) => {
        const userBookings = bookingData.filter(
          (booking) => booking.userId === user.id
        );
        return (
          <div key={user.id} className="user-card">
            <div className="user-info">
              <h3>{user.name}</h3>
              <p>Email: {user.email}</p>
              <p>Số điện thoại: {user.phoneNumber}</p>
              <p>Loại tài khoản: {user.type}</p>
              <p>Mô tả: {user.description}</p>
              <p>Điểm: {user.point}</p>
              <h4>Thông tin đặt chỗ:</h4>
              {userBookings.map((booking) => (
                <div key={booking.id} className="booking-info">
                  <p>Ngày đặt: {new Date(booking.date).toLocaleDateString()}</p>
                  <p>Pod ID: {booking.podId}</p>
                  <p>Trạng thái: {booking.status}</p>
                  <p>Feedback: {booking.feedback || "Chưa có feedback"}</p>
                  <h5>Chi tiết đơn hàng:</h5>
                  {booking.bookingOrders.map((order) => (
                    <div key={order.id} className="order-info">
                      <p>Trạng thái đơn hàng: {order.status}</p>
                      <p>Số lượng: {order.quantity}</p>
                      <p>Tổng tiền: {order.amount}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="user-actions">
              <Button variant="primary">
                <FontAwesomeIcon icon={faEdit} /> Sửa
              </Button>
              <Button variant="danger">
                <FontAwesomeIcon icon={faTrash} /> Xóa
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Order;
