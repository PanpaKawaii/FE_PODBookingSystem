import React from 'react'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import './BookingPodContent.css';

export default function BookingPodContent() {

    const [PODs, setPODs] = useState(null);
    const [TYPEs, setTYPEs] = useState(null);
    const [UTILITIes, setUTILITIes] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const podResponse = await fetch('https://localhost:7166/api/Pod');
                if (!podResponse.ok) throw new Error('Network response was not ok');
                const podData = await podResponse.json();
                setPODs(podData);

                const typeResponse = await fetch('https://localhost:7166/api/Type');
                if (!typeResponse.ok) throw new Error('Network response was not ok');
                const typeData = await typeResponse.json();
                setTYPEs(typeData);

                const utilityResponse = await fetch('https://localhost:7166/api/Utility');
                if (!utilityResponse.ok) throw new Error('Network response was not ok');
                const utilityData = await utilityResponse.json();
                setUTILITIes(utilityData);

                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Những lựa chọn trên thanh tìm kiếm
    const [selectedPod, setSelectedPod] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedUtility, setSelectedUtility] = useState('');
    const [podName, setPodName] = useState('');

    // Lấy Utility được chọn
    const filteredUtilities = UTILITIes ? UTILITIes.filter(utility =>
        utility.id.toString() === selectedUtility.toString() || !selectedUtility.toString()
    ) : [];

    // Lấy Pods của Utility được chọn
    const Pods = (filteredUtilities && filteredUtilities.length > 0) ? filteredUtilities[0].pods : [];

    // Create a new array uniquePodName with unique pod names
    const [uniquePodName, setUniquePodName] = useState([]);

    useEffect(() => {
        if (PODs) {
            const uniquePods = PODs.reduce((acc, current) => {
                const x = acc.find(item => item.name === current.name);
                if (!x) {
                    return acc.concat([current]);
                } else {
                    return acc;
                }
            }, []);
            setUniquePodName(uniquePods);
        }
    }, [PODs]);

    //Lấy Pods trùng khớp với những lựa chọn trên thanh tìm kiếm
    const StoreId = useParams();
    const filteredResults = Pods ? Pods.filter(pod =>
        pod.storeId == StoreId.Id &&

        (pod.name === selectedPod || !selectedPod) &&
        (pod.typeId.toString() === selectedType.toString() || !selectedType.toString()) && // Cần chỉnh sửa vì id 15 cũng có chứa id 1 hoặc 5
        pod.name.toLowerCase().includes(podName.toLowerCase())
    ) : [];

    const getCapacity = (typeId) => {
        const type = TYPEs ? TYPEs.find(type => type.id === typeId) : null;
        return type ? type.capacity : 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ selectedPod, selectedType, selectedUtility, podName });
    };

    return (
        <div className='POD-booking-pod'>

            <div className='search-container'>

                <Form className='search' onSubmit={handleSubmit}>

                    <Form.Group controlId='formPod' className='form-group'>
                        <Form.Control as='select' value={selectedPod} onChange={(e) => setSelectedPod(e.target.value)}>
                            <option value=''>[POD]</option>
                            {uniquePodName && uniquePodName.map(pod => (
                                <option key={pod.id} value={pod.name}>{pod.name}</option>
                            ))}
                            {/* <option value='Pod Cao Cấp'>Cao Cấp</option>
                            <option value='Pod Tiêu Chuẩn'>Tiêu Chuẩn</option>
                            <option value='Pod Sáng Tạo'>Sáng Tạo</option> */}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='formType' className='form-group'>
                        <Form.Control as='select' value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
                            <option value=''>[Type]</option>
                            {TYPEs && TYPEs.map(type => (
                                <option key={type.id} value={type.id}>{type.name}</option>
                            ))}
                            {/* <option value='1'>Phòng Đơn</option>
                            <option value='2'>Phòng Đôi</option>
                            <option value='3'>Phòng Nhóm</option>
                            <option value='4'>Phòng Họp</option> */}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='formUtility' className='form-group'>
                        <Form.Control as='select' value={selectedUtility} onChange={(e) => setSelectedUtility(e.target.value)}>
                            <option value=''>[Utility]</option>
                            {UTILITIes && UTILITIes.map(utility => (
                                <option key={utility.id} value={utility.id}>{utility.name}</option>
                            ))}
                            {/* <option value='1'>Ổ cắm điện</option>
                            <option value='2'>Máy chiếu</option>
                            <option value='3'>Máy pha cà phê</option>
                            <option value='4'>Hệ thống âm thanh</option>
                            <option value='5'>Bảng trắng thông minh</option> */}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId='formName' className='form-group form-input'>
                        <Form.Control className='input' type='text' placeholder='POD Name' value={podName} onChange={(e) => setPodName(e.target.value)} />
                    </Form.Group>

                </Form>

                <hr style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto' }} />

            </div>

            <div className='booking-pod-container'>
                <Row className='image-row'>
                    {filteredResults.length > 0 ? (
                        filteredResults.map((pod, index) => (
                            <Col key={pod.id} xs={12} sm={12} md={6} lg={6} xl={4} xxl={3} className='image-col'>
                                <Card className='image-card'>
                                    <img src={pod.image} alt={pod.name} />
                                    <div className='rating'>
                                        {[...Array(pod.rating)].map((_, i) => (
                                            <span key={i} style={{ color: 'gold', fontSize: '1.5em' }}>★</span>
                                        ))}
                                    </div>

                                    <div className='capacity'>
                                        {getCapacity(pod.typeId) === 10 ?
                                            (
                                                <span className='capacity-icon' style={{ padding: '5px' }}><i class='fa-solid fa-user' style={{ paddingRight: '5px' }}></i><b> x 10</b></span>
                                            ) :
                                            (
                                                [...Array(getCapacity(pod.typeId))].map((_, i) => (
                                                    <span key={i} className='capacity-icon' style={{ padding: '5px' }}><i class='fa-solid fa-user'></i></span>
                                                ))
                                            )
                                        }
                                    </div>

                                    <Card.Body className='card-body'>
                                        <h5><b>{pod.name}</b></h5>
                                        <div className='full-detail'>
                                            <div className='short-detail'>
                                                <p>TypeId: {pod.typeId}</p>
                                                <p>StoreId: {pod.storeId}</p>
                                            </div>
                                            <div className='active-button'>
                                                <Link to={`${pod.id}`}>
                                                    <Button className='btn' style={{ backgroundColor: '#dc3545' }}>Select</Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <p>No PODs available for this store.</p>
                    )}
                </Row>
            </div>
        </div>
    )
}
