import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import { auth } from '../firebaseconfig'; // Adjust the import path as needed
import { signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';


const StudentIdCard = () => {
  const location = useLocation();
  const studentData = location.state;

  const navigate = useNavigate();


  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/'); // Redirect to home route after logout
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  if (!studentData) {
    return <div className="container mt-5 text-danger">No student data available.</div>;
  }

  const { rollNumber, studentEmail, studentName, photoURL, qrCodeData } = studentData; // Adjust according to your Firestore structure

  return (
    <div className="container mt-5" style={{ backgroundColor: 'white', color: 'black', padding: '20px', borderRadius: '8px' }}>
      <Navbar />
      <h2 className="mb-4">Student ID Card</h2>
      <div className="card text-center" style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <div className="text-center">
        {photoURL && (
          <img src={photoURL} alt="Student" className="card-img-top" style={{ width: '150px', height: '150px', borderRadius: '50%', marginBottom: '20px' }} />
        )}
        </div>
        <div className="card-body">
          <h5 className="card-title">{studentName}</h5>
          <p className="card-text">Roll Number: {rollNumber}</p>
          <p className="card-text">Email: {studentEmail}</p>
        </div>
        {qrCodeData && (
          <div style={{ marginTop: '20px' }}>
            <h6>QR Code:</h6>
            <img src={qrCodeData} alt="QR Code" style={{ width: '100px', height: '100px' }} />
          </div>
        )}
      </div>

      <button onClick={handleLogout} className="btn btn-danger btn-lg mt-5">
            Logout
          </button>
    </div>
  );
};

export default StudentIdCard;
