import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';

const carouselImages = [
  {
    src: 'https://github.com/Venkata-Karthik-Emani/AttendanceProject/blob/main/web/img/qratted.jpg?raw=true',
    alt: 'QR Code Attendance Management',
  },
  {
    src: 'https://github.com/Venkata-Karthik-Emani/AttendanceProject/blob/main/web/img/qratted.jpg?raw=true',
    alt: 'QR Code Attendance Management',
  },
];

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="container-fluid p-0">
        {/* Carousel Start */}
        <Carousel fade interval={3000} controls={true} indicators={false}>
          {carouselImages.map((image, index) => (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={image.src}
                alt={image.alt}
                style={{
                  width: '100vw',
                  height: '100vh',
                  objectFit: 'cover',
                }}
              />
              <Carousel.Caption>
                <div className="bg-dark bg-opacity-50 p-3 rounded">
                  <h3>Anurag University</h3>
                  <h1 className="display-4">
                    QR Code Based Attendance Management System
                  </h1>
                  <Link to="/staff-login" className="btn btn-danger btn-sm mt-3">
                    Join Now
                  </Link>
                </div>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
        {/* Carousel End */}

        {/* Back to Top Button */}
        <button
          className="btn btn-danger rounded-circle"
          style={{
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            fontSize: '1.5rem',
          }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          ↑
        </button>
      </div>
    </>
  );
};

export default HomePage;
