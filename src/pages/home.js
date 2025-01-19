import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import PwaImg from '../assets/img-blog-pwa-jul-21-mitrais-1.jpg'
import { Link } from 'react-router-dom';
const Home = () => {
  return (
    <div className='Home_Container'>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={PwaImg} />
        <Card.Body>
          <Card.Title>PWA APP Testing</Card.Title>
          <Card.Text>
            A Simple PWA app with basic setting and functionals testing
          </Card.Text>
          <Link to="/service" ><Button variant="primary">Go to Service</Button></Link>
        </Card.Body>
      </Card>
    </div>
  )
}

export default Home