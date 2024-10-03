import React, { useState, useEffect } from 'react';
import { db } from '../firebaseconfig'; // Adjust the import path as needed
import { collection, getDocs, addDoc } from 'firebase/firestore';
import { Html5Qrcode } from 'html5-qrcode';
import { Link } from 'react-router-dom';

const AttendanceScanning = () => {
  const [result, setResult] = useState('');
  const [isScanning, setIsScanning] = useState(false);
  const [scanMessage, setScanMessage] = useState('');
  const [html5QrCode, setHtml5QrCode] = useState(null);

  useEffect(() => {
    if (isScanning && !html5QrCode) {
      const qrCodeScanner = new Html5Qrcode("reader");
      setHtml5QrCode(qrCodeScanner);
      qrCodeScanner.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 200, height: 200 }, // Square size for the QR box
        },
        (decodedText) => {
          setResult(decodedText);
          checkRollNumber(decodedText);
          qrCodeScanner.stop();
          setIsScanning(false);
        },
        (errorMessage) => {
          // Handle errors silently.
        }
      ).catch((err) => {
        console.error("Error starting QR scanner: ", err);
        setScanMessage("Failed to start scanning.");
      });
    }

    return () => {
      if (html5QrCode) {
        html5QrCode.stop().then(() => {
          console.log("QR code scanning stopped.");
        }).catch((err) => {
          console.error("Error stopping QR scanner: ", err);
        });
      }
    };
  }, [isScanning, html5QrCode]);

  const checkRollNumber = async (rollNumber) => {
    const studentCollection = collection(db, 'student-data');
    const studentDocs = await getDocs(studentCollection);
    const rollNumbers = studentDocs.docs.map((doc) => doc.data().rollNumber);

    if (rollNumbers.includes(rollNumber)) {
      setScanMessage(`Student - ${rollNumber} marked present!`);
      logAttendance(rollNumber); // Log attendance after valid scan
    } else {
      setScanMessage('Invalid image or roll number not found.');
    }
  };

  // Function to log attendance in the "attendance-logs" collection
  const logAttendance = async (rollNumber) => {
    const attendanceCollection = collection(db, 'attendance-logs');
    const timestamp = new Date(); // Current timestamp

    try {
      await addDoc(attendanceCollection, {
        rollNumber: rollNumber,
        timestamp: timestamp,
      });
      console.log("Attendance logged successfully.");
    } catch (error) {
      console.error("Error logging attendance: ", error);
    }
  };

  const startScanning = () => {
    setIsScanning(true);
    setScanMessage('');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary mb-3 ">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Staff Dashboard</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link ml-3" aria-current="page" to="/staff-dashboard">Back to Dashboard</Link>
              </li>
              <li className="nav-item">
                <Link to="/attendance-scanning" className="nav-link">
                  Attendance Scanning
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/attendance-logs" className="nav-link">
                  Check Attendance Logs
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container mt-3">
        <h2>Attendance Scanning</h2>
        <div id="reader" style={{ width: '200px', height: '200px', margin: 'auto', border: '2px solid #3182CE' }}></div>
        {!isScanning ? (
          <button className="btn btn-primary" onClick={startScanning}>Snap!</button>
        ) : (
          <p>Scanning...</p>
        )}
        <div className="mt-3">
          <h5>Scan Result:</h5>
          {scanMessage && <p>{scanMessage}</p>}
        </div>
      </div>
    </>
  );
};

export default AttendanceScanning;
