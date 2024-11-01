import React, { useState, useEffect } from "react";
import "./ReportManage.css";
import api from "../api/axios";
import Table from "react-bootstrap/Table";
import {
  format,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  addDays,
} from "date-fns";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { message } from "antd";

ChartJS.register(ArcElement, Tooltip, Legend);
export default function ReportManage() {
  const [Pod, setPod] = useState([]);
  const [store, setStore] = useState([]);
  const [type, setType] = useState([]);
  const [payment, setPayment] = useState([]);
  const [booking, setBooking] = useState([]);
  const [bookingOrder, setBookingOrder] = useState([]);
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [selectedStore, setSelectedStore] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reportType, setReportType] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const fetchData = async (endpoint, setState) => {
    try {
      const response = await api.get(endpoint);
      setState(response.data);
      if (endpoint === "User") {
        setUserCount(calculateUserCount(response.data));
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData("User", setUsers);
    fetchData("Pod", setPod);
    fetchData("Store", setStore);
    fetchData("Type", setType);
    fetchData("Payment", setPayment);
    fetchData("Booking", setBooking);
    fetchData("BookingOrder", setBookingOrder);
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      const count = users.filter((user) => user.role === "User").length;
      setUserCount(count);
    }
  }, [users]);

  const getPodDetails = (podId) => {
    const pod = Pod.find((p) => p.id === podId);
    if (!pod) return { name: "", typeId: "" };
    const typeName = type.find((t) => t.id === pod.typeId)?.name || "";
    return { name: pod.name, typeName };
  };
  const calculateUserCount = (users) => {
    const count = users.filter((user) => user.role === "User").length;
    console.log("User count:", count);
    return count;
  };
  const filterAndMapResults = (
    payments,
    bookings,
    pods,
    stores,
    bookingOrders,
    selectedStore
  ) => {
    return payments
      .map((payment) => {
        const bookingEntry = bookings.find((b) => b.id === payment.bookingId);
        const podId = bookingEntry ? bookingEntry.podId : null;
        const podDetails = getPodDetails(podId);

        const bookingOrderEntry = bookingOrders.find(
          (bo) => bo.bookingId === payment.bookingId
        );
        const bookingOrderAmount = bookingOrderEntry
          ? bookingOrderEntry.amount
          : 0;

        const pod = pods.find((p) => p.id === podId);
        const storeId = pod ? pod.storeId : null;
        const storeName = stores.find((s) => s.id === storeId)?.name || "";

        const paymentDate = new Date(payment.date);

        if (
          (selectedStore && storeName !== selectedStore) ||
          (startDate && paymentDate < new Date(startDate)) ||
          (endDate && paymentDate > new Date(endDate))
        ) {
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
          totalRevenue: payment.amount + bookingOrderAmount,
        };
      })
      .filter((result) => result !== null);
  };

  const filterResultsByTimeframe = (results) => {
    if (reportType === "all") {
      return results; // Show all results
    }

    let startDateObj = new Date(startDate);
    let endDateObj = new Date(endDate);

    if (reportType === "daily") {
      if (!startDate || !endDate) {
        message.error("Vui lòng chọn ngày bắt đầu và ngày kết thúc.");
        return [];
      }
    } else if (reportType === "weekly") {
      if (!startDate) {
        message.error("Vui lòng chọn ngày bắt đầu cho báo cáo hàng tuần.");
        return [];
      }
      startDateObj = startOfWeek(startDateObj);
      endDateObj = endOfWeek(startDateObj);
    } else if (reportType === "monthly") {
      startDateObj = startOfMonth(new Date(selectedYear, selectedMonth - 1, 1));
      endDateObj = endOfMonth(new Date(selectedYear, selectedMonth - 1, 1));
    }

    return results.filter((result) => {
      const paymentDate = new Date(result.date);
      return paymentDate >= startDateObj && paymentDate <= endDateObj;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const results = filterAndMapResults(
      payment,
      booking,
      Pod,
      store,
      bookingOrder,
      selectedStore
    );
    const filteredResults = filterResultsByTimeframe(results);
    setFilteredResults(filteredResults);
  };

  const calculateStoreRevenue = () => {
    const podRevenue = filteredResults.reduce(
      (total, result) => total + result.podRevenue,
      0
    );
    const serviceRevenue = filteredResults.reduce(
      (total, result) => total + result.serviceRevenue,
      0
    );
    return {
      totalRevenue: podRevenue + serviceRevenue,
      podRevenue,
      serviceRevenue,
    };
  };

  const { totalRevenue, podRevenue, serviceRevenue } = calculateStoreRevenue();

  const handleStartDateChange = (e) => {
    const selectedStartDate = e.target.value;
    setStartDate(selectedStartDate);

    if (reportType === "weekly") {
      const startDateObj = new Date(selectedStartDate);
      const endDateObj = addDays(startDateObj, 6);
      setEndDate(format(endDateObj, "yyyy-MM-dd"));
    }
  };

  const handleReportTypeChange = (e) => {
    setReportType(e.target.value);
    // Reset start and end dates when report type changes
    setStartDate("");
    setEndDate("");
  };
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };
  const formatDate = (dateString) => {
    return format(new Date(dateString), "dd/MM/yyyy");
  };
  const chartData = {
    labels: ["Doanh thu POD", "Doanh thu dịch vụ đi kèm"],
    datasets: [
      {
        data: [podRevenue, serviceRevenue],
        backgroundColor: ["#4CAF50", "#2196F3"], // Màu xanh lá cây và xanh dương
        hoverBackgroundColor: ["#45a049", "#1e87db"], // Màu đậm hơn khi hover
        borderColor: ["#ffffff", "#ffffff"], // Màu viền trắng
        borderWidth: 2, // Độ rộng viền
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          font: {
            size: 14, // Kích thước chữ của legend
            family: "'Roboto', sans-serif", // Font chữ
          },
          color: "#333333", // Màu chữ của legend
        },
      },
      title: {
        display: true,
        text: "Phân bổ doanh thu",
        font: {
          size: 18, // Kích thước chữ của tiêu đề
          family: "'Roboto', sans-serif", // Font chữ
          weight: "bold", // Độ đậm của chữ
        },
        color: "#333333", // Màu chữ của tiêu đề
      },
    },
  };
  return (
    <div className="report-manage">
      <div className="report-controls">
        <div>
          <div className="inno-banner">INNOSPACE</div>{" "}
        </div>
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
          {reportType === "monthly" && (
            <>
              <label>
                Chọn tháng:
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(Number(e.target.value))}
                >
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{`Tháng ${
                      i + 1
                    }`}</option>
                  ))}
                </select>
              </label>
              <label>
                Chọn năm:
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i} value={new Date().getFullYear() - i}>
                      {new Date().getFullYear() - i}
                    </option>
                  ))}
                </select>
              </label>
            </>
          )}
          {reportType !== "monthly" && (
            <>
              <label>
                Ngày bắt đầu:
                <input
                  type="date"
                  value={startDate}
                  onChange={handleStartDateChange}
                />
              </label>
              <label>
                Ngày kết thúc:
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </label>
            </>
          )}
          <label>
            Cửa hàng:
            <select
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
            >
              <option value="">Tất cả</option>
              {store.map((store) => (
                <option key={store.id} value={store.name}>
                  {store.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <button className="search-report" onClick={handleSubmit}>
          Tìm kiếm
        </button>
      </div>
      <hr />
      <div className="report-overview">
        <h3>Tổng quan</h3>
        <div className="overview-content">
          <div className="overview-text">
            <p>
              <strong>- Tổng doanh thu:</strong> {formatCurrency(totalRevenue)}
            </p>
            <p>
              <strong>- Doanh thu từ POD:</strong> {formatCurrency(podRevenue)}
            </p>
            <p>
              <strong>- Doanh thu từ dịch vụ đi kèm:</strong>{" "}
              {formatCurrency(serviceRevenue)}
            </p>
            <p>
              <strong>- Tổng số người dùng:</strong> {userCount}{" "}
              <FontAwesomeIcon
                style={{
                  marginLeft: "5px",
                  fontSize: "0.8em",
                  color: "grey",
                  marginBottom: "1px",
                }}
                icon={faUser}
              />
            </p>
          </div>
          <div className="overview-chart">
            {podRevenue > 0 || serviceRevenue > 0 ? (
              <div
                style={{
                  width: "300px",
                  height: "300px",
                  marginLeft: "-400px",
                }}
              >
                <Doughnut data={chartData} options={chartOptions} />
              </div>
            ) : (
              <p>Không có dữ liệu để hiển thị biểu đồ</p>
            )}
          </div>
        </div>
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
                <td>{formatDate(result.date)}</td>
                <td>{formatCurrency(result.podRevenue)}</td>
                <td>{formatCurrency(result.serviceRevenue)}</td>
                <td>{formatCurrency(result.totalRevenue)}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}
