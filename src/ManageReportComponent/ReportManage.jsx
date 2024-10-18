import React, { useState, useEffect } from 'react';
import './ReportManage.css';
import api from '../api/axios';
import Table from 'react-bootstrap/Table';
import { format, startOfWeek, endOfWeek, startOfMonth, endOfMonth, addDays } from 'date-fns';

export default function ReportManage() {
  const [Pod, setPod] = useState([]);
  const [store, setStore] = useState([]);
  const [type, setType] = useState([]);
  const [payment, setPayment] = useState([]);
  const [booking, setBooking] = useState([]);
  const [bookingOrder, setBookingOrder] = useState([]);
  const [selectedStore, setSelectedStore] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportType, setReportType] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const fetchData = async (endpoint, setState) => {
    try {
      const response = await api.get(endpoint);
      setState(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData("Pod", setPod);
    fetchData("Store", setStore);
    fetchData("Type", setType);
    fetchData("Payment", setPayment);
    fetchData("Booking", setBooking);
    fetchData("BookingOrder", setBookingOrder);
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

      const paymentDate = new Date(payment.date);

      if ((selectedStore && storeName !== selectedStore) ||
          (startDate && paymentDate < new Date(startDate)) ||
          (endDate && paymentDate > new Date(endDate))) {
        return null;
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
    }).filter(result => result !== null);
  };

  const filterResultsByTimeframe = (results) => {
    if (reportType === 'all') {
      return results; // Show all results
    }

    let startDateObj = new Date(startDate);
    let endDateObj = new Date(endDate);

    if (reportType === 'daily') {
      if (!startDate || !endDate) {
        alert("Vui lòng chọn ngày bắt đầu và ngày kết thúc.");
        return [];
      }
    } else if (reportType === 'weekly') {
      if (!startDate) {
        alert("Vui lòng chọn ngày bắt đầu cho báo cáo hàng tuần.");
        return [];
      }
      startDateObj = startOfWeek(startDateObj);
      endDateObj = endOfWeek(startDateObj);
    } else if (reportType === 'monthly') {
      startDateObj = startOfMonth(new Date(selectedYear, selectedMonth - 1, 1));
      endDateObj = endOfMonth(new Date(selectedYear, selectedMonth - 1, 1));
    }

    return results.filter(result => {
      const paymentDate = new Date(result.date);
      return paymentDate >= startDateObj && paymentDate <= endDateObj;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const results = filterAndMapResults(payment, booking, Pod, store, bookingOrder, selectedStore);
    const filteredResults = filterResultsByTimeframe(results);
    setFilteredResults(filteredResults);
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

  const handleStartDateChange = (e) => {
    const selectedStartDate = e.target.value;
    setStartDate(selectedStartDate);

    if (reportType === 'weekly') {
      const startDateObj = new Date(selectedStartDate);
      const endDateObj = addDays(startDateObj, 6);
      setEndDate(format(endDateObj, 'yyyy-MM-dd'));
    }
  };

  const handleReportTypeChange = (e) => {
    setReportType(e.target.value);
    // Reset start and end dates when report type changes
    setStartDate('');
    setEndDate('');
  };

  return (
    <div className="report-manage">
      <div className="report-controls">
        <div className="control-group">
          <label>
            Loại báo cáo:
            <select value={reportType} onChange={handleReportTypeChange}>
              <option value="all">Tất cả</option>
              <option value="daily">Hàng ngày</option>
              <option value="weekly">Hàng tuần</option>
              <option value="monthly">Hàng tháng</option>
            </select>
          </label>
          {reportType === 'monthly' && (
            <>
              <label>
                Chọn tháng:
                <select value={selectedMonth} onChange={(e) => setSelectedMonth(Number(e.target.value))}>
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{`Tháng ${i + 1}`}</option>
                  ))}
                </select>
              </label>
              <label>
                Chọn năm:
                <select value={selectedYear} onChange={(e) => setSelectedYear(Number(e.target.value))}>
                  {[...Array(10)].map((_, i) => (
                    <option key={i} value={new Date().getFullYear() - i}>
                      {new Date().getFullYear() - i}
                    </option>
                  ))}
                </select>
              </label>
            </>
          )}
          {reportType !== 'monthly' && (
            <>
              <label>
                Ngày bắt đầu:
                <input type="date" value={startDate} onChange={handleStartDateChange} />
              </label>
              <label>
                Ngày kết thúc:
                <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
              </label>
            </>
          )}
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
  );
}
