import React from 'react'
import { useParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { PODs } from '../List/ListOfPods';
import './SolutionDetailContent.css';

export default function SolutionDetailContent() {
    const PodId = useParams();
    const pod = PODs.find(obj => {
        return obj.id == PodId.id;
    });
    return (
        <div className='POD-solution-detail'>
            <div className='solution-detail-container'>
                <h1>{pod.PodName}</h1>
                <div className='short-detail'>
                    <p>{pod.TypeName} (Capacity: {pod.capacity}) / {pod.UtilityName} / {pod.StoreName}</p>
                    <p style={{ color: 'gold', fontSize: '1.5em' }}>★ {pod.rating}</p>
                    <p></p>
                </div>
                <img src={pod.img}></img>
                <p>{pod.description}</p>
                <Button>Select</Button>
            </div>
        </div>
    )
}
