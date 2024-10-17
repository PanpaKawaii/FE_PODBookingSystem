import React, { useState, useEffect } from 'react'
import './ReportManage.css'; // Import the CSS file
import api from '../api/axios';
import Table from 'react-bootstrap/Table';

export default function ReportManage() {
  const [Pod, setPod] = useState([]);
  const [store, setStore] = useState([]);
  const [type, setType] = useState([]);
  const [payment, setPayment] = useState([]);
  const [booking, setBooking] = useState([]);
  const [bookingOrder, setBookingOrder] = useState([]);
  const [selectedStore, setSelectedStore] = useState(''); // State for selected store
  const [filteredResults, setFilteredResults] = useState([]); // State for filtered results

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

  const fetchBookingOrder = async () => {
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
  }, []);

  const getPodDetails = (podId) => {
    const pod = Pod.find(p => p.id === podId);
    if (!pod) return { name: '', typeId: '' };
    const typeName = type.find(t => t.id === pod.typeId)?.name || '';
    return { name: pod.name, typeName };
  };

  const filterAndMapResults = (payments, bookings, pods, stores, bookingOrders, selectedStore) => {
    return payments.map((payment) => {
      const bookingEntry = bookings.find(b => b.id === payment.bookingId);
      const podId = bookingEntry ? bookingEntry.podId : null;
      const podDetails = getPodDetails(podId);

      const bookingOrderEntry = bookingOrders.find(bo => bo.bookingId === payment.bookingId);
      const bookingOrderAmount = bookingOrderEntry ? bookingOrderEntry.amount : 0;

      const pod = pods.find(p => p.id === podId);
      const storeId = pod ? pod.storeId : null;
      const storeName = stores.find(s => s.id === storeId)?.name || '';

      // Filter based on selected store
      if (selectedStore && storeName !== selectedStore) {
        return null; // Skip this entry if it doesn't match the selected store
      }

      return {
        id: payment.id,
        podName: podDetails.name,
        typeName: podDetails.typeName,
        storeName,
        date: payment.date,
        podRevenue: payment.amount,
        serviceRevenue: bookingOrderAmount,
        totalRevenue: payment.amount + bookingOrderAmount
      };
    }).filter(result => result !== null); // Remove null entries
  };
  // Use the function in handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    const results = filterAndMapResults(payment, booking, Pod, store, bookingOrder, selectedStore);
    setFilteredResults(results);
  };

  const calculateStoreRevenue = () => {
    const podRevenue = filteredResults.reduce((total, result) => total + result.podRevenue, 0);
    const serviceRevenue = filteredResults.reduce((total, result) => total + result.serviceRevenue, 0);
    return {
      totalRevenue: podRevenue + serviceRevenue,
      podRevenue,
      serviceRevenue
    };
  };

  const { totalRevenue, podRevenue, serviceRevenue } = calculateStoreRevenue();

  return (
    <div className="report-manage">
      <div className="report-controls">
        <div className="control-group">
          <label>
            Cửa hàng:
            <select value={selectedStore} onChange={(e) => setSelectedStore(e.target.value)}>
              <option value="">Tất cả</option>
              {store.map((store) => (
                <option key={store.id} value={store.name}>{store.name}</option>
              ))}
            </select>
          </label>
        </div>
        <button className="search-report" onClick={handleSubmit}>Tìm kiếm</button>
      </div>
      <hr />
      <div className="report-overview">
        <h3>Tổng quan</h3>
        <p><strong>Tổng doanh thu:</strong> {totalRevenue}</p>
        <p><strong>Doanh thu từ POD:</strong> {podRevenue}</p>
        <p><strong>Doanh thu từ dịch vụ đi kèm:</strong> {serviceRevenue}</p>
      </div>
      <hr />
      <div className="report-detail">
        <h3>Chi tiết</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Tên POD</th>
              <th>Loại POD</th>
              <th>Cửa hàng</th>
              <th>Ngày đặt</th>
              <th>Doanh thu POD</th>
              <th>Doanh thu dịch vụ đi kèm</th>
              <th>Doanh thu tổng</th>
            </tr>
          </thead>
          <tbody>
            {filteredResults.map((result) => (
              <tr key={result.id}>
                <td>{result.podName}</td>
                <td>{result.typeName}</td>
                <td>{result.storeName}</td>
                <td>{result.date}</td>
                <td>{result.podRevenue}</td>
                <td>{result.serviceRevenue}</td>
                <td>{result.totalRevenue}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  )
}
