import React, { useState } from 'react'
import './style.css'
import api from '../api/axios'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useEffect } from 'react';

export default function AddStore() {
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [contact, setContact] = useState('');
  const [maxId, setmaxId] = useState(0);

  useEffect(() => {
    const fetchMaxStoreId = async () => {
      try {
        const storeResponse = await api.get("Store");
        const maxId = Math.max(...storeResponse.data.map(store => store.id), 0);
        console.log(`Max Store ID: ${maxId}`);
        setmaxId(maxId);
      } catch (err) {
        console.error('Error fetching Store list:', err);
      }
    };
    fetchMaxStoreId();
  }, []); 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newStore = {
      id: maxId + 1, // Assuming the backend will auto-generate the ID [maxId+1]
      name: name,
      address: address,
      contact: contact
    };
    try {
      console.log(newStore);
      const response = await api.post('/Store', newStore);
      console.log('Store added successfully:', response.data);
      alert('Store added successfully!');
      // Optionally, reset the form or update the state to reflect the new Store

    } catch (error) {
      console.error('Error adding Store:', error);
      alert('Failed to add Store. Please try again.');
    }
  };
  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Tên</Form.Label>
          <Form.Control type="text" placeholder="Nhập tên" value={name} onChange={(e) => setName(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formAddress">
          <Form.Label>Địa chỉ</Form.Label>
          <Form.Control type="text" placeholder="Nhập địa chỉ" value={address} onChange={(e) => setAddress(e.target.value)} />
        </Form.Group>
        <Form.Group controlId="formPhone">
          <Form.Label>Số điện thoại</Form.Label>
          <Form.Control type="text" placeholder="Nhập số điện thoại" value={contact} onChange={(e) => setContact(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">Thêm</Button>
      </Form>
    </>
  );
}
