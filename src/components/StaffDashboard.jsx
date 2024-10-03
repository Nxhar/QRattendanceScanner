import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { auth } from '../firebaseconfig'; // Adjust the import path as needed
import { signOut } from 'firebase/auth';

const StaffDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/'); // Redirect to home route after logout
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="mt-5"></div>
      <div className="mt-5"></div>
      <div className="container d-flex flex-column align-items-center justify-content-center mt-5" style={{color:"white"}}>
        <h1 className="mb-4">Hello, Staff</h1>
        <h3 className="mb-5">What do you want to do today?</h3>
        <div className="d-grid gap-4 w-50">
          <Link to="/student-registration" className="btn btn-primary btn-lg">
            Student Registration
          </Link>
          <Link to="/attendance-scanning" className="btn btn-secondary btn-lg">
            Attendance Scanning
          </Link>
          <Link to="/attendance-logs" className="btn btn-success btn-lg">
            Check Attendance Logs
          </Link>
          {/* Logout Button */}
          <button onClick={handleLogout} className="btn btn-danger btn-lg">
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default StaffDashboard;
