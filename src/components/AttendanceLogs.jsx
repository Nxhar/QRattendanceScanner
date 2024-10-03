import React, { useEffect, useState } from 'react';
import { db } from '../firebaseconfig'; // Adjust the import path as needed
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const AttendanceLogs = () => {
  const [attendanceLogs, setAttendanceLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const fetchAttendanceLogs = async () => {
      const attendanceCollection = collection(db, 'attendance-logs');
      const logsSnapshot = await getDocs(attendanceCollection);
      const logsData = logsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAttendanceLogs(logsData);
      setFilteredLogs(logsData); // Set initial logs to filteredLogs
    };

    fetchAttendanceLogs();
  }, []);

  const handleDateChange = (event) => {
    const date = event.target.value;
    setSelectedDate(date);

    if (date) {
      const filtered = attendanceLogs.filter(log =>
        new Date(log.timestamp.toDate()).toISOString().split('T')[0] === date
      );
      setFilteredLogs(filtered);
    } else {
      setFilteredLogs(attendanceLogs); // Reset if no date is selected
    }
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

      <div className="container mt-5" style={{color:"white"}}>
        <h2>Attendance Logs</h2>
        
        {/* Date filter */}
        <div className="mb-3">
          <label htmlFor="dateFilter" className="form-label">Filter by Date:</label>
          <input
            type="date"
            id="dateFilter"
            className="form-control"
            value={selectedDate}
            onChange={handleDateChange}
          />
        </div>

        {/* Attendance Logs Table */}
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Roll Number</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => (
                <tr key={log.id}>
                  <td>{log.rollNumber}</td>
                  <td>{new Date(log.timestamp.toDate()).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" className="text-center">No attendance logs found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AttendanceLogs;
