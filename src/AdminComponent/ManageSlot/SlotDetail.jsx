import React, { useEffect, useState } from "react";
import { Table, message, Spin } from "antd";
import axios from "axios";
import { useParams } from "react-router-dom";

const SlotDetail = () => {
  const { podId } = useParams(); // Lấy id từ URL
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSlots = async () => {
    try {
      const response = await axios.get(`https://localhost:7166/api/Slot?podId=${podId}`); // Gọi API để lấy slot theo idpod
      setSlots(response.data.filter(slot => slot.podId === podId)); // Filter slots by podId
    } catch (error) {
      console.error("Failed to fetch slots:", error);
      message.error("Không thể tải dữ liệu slot");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, [podId]);

  if (loading) {
    return <Spin />;
  }

  const columns = [
    {
      title: "ID Slot",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên Slot",
      dataIndex: "name",
      key: "name",
    },
    
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    // Thêm các cột khác nếu cần
  ];

  return (
    <div>
      <h1>Danh sách Slot cho POD ID: {podId}</h1>
      <Table
        columns={columns}
        dataSource={slots.filter(slot => slot.podId === podId)} // Filter slots for the specific pod
        rowKey="id"
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
};

export default SlotDetail; 