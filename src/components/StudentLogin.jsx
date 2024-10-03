import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db, auth } from '../firebaseconfig'; // Adjust the import path as needed
import { collection, getDocs, query, where } from 'firebase/firestore';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Navbar from './Navbar';

const StudentLogin = () => {
  const [email, setEmail] = useState(''); // Change rollNumber to email
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      // Sign in with email and password
      await signInWithEmailAndPassword(auth, email, password); // Use email directly

      // Extract roll number from email (before @) and convert to uppercase
      const rollNumber = email.split('@')[0].toUpperCase();
      console.log('Roll Number:', rollNumber); // Debugging: Log the roll number

      // Fetch student details using roll number
      const studentQuery = query(collection(db, 'student-data'), where('rollNumber', '==', rollNumber));
      const studentDocs = await getDocs(studentQuery);

      console.log('Student Docs:', studentDocs); // Debugging: Log the retrieved documents

      if (!studentDocs.empty) {
        const studentData = studentDocs.docs[0].data();
        console.log('Student Data:', studentData); // Debugging: Log the student data
        navigate('/student-id-card', { state: studentData }); // Redirect with student data
      } else {
        setErrorMessage('Student not found');
      }
    } catch (error) {
      console.error('Login error: ', error);
      setErrorMessage('Invalid credentials, please try again.');
    }
  };

  return (
    <div className="container mt-5" style={{ color: "white" }}>
      <Navbar />
      <div className="mt-5"></div>
      <div className="mt-5"></div>
      <h2>Student Login</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p className="text-danger">{errorMessage}</p>}
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default StudentLogin;
