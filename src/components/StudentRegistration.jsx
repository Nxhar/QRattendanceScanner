import React, { useState, useEffect } from 'react';
import { auth, storage, db } from '../firebaseconfig'; // Adjust the import path as needed
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc } from 'firebase/firestore';
import QRCode from 'qrcode'; // Importing the qrcode package
import { Link } from 'react-router-dom';

const StudentRegistration = () => {
    const [rollNumber, setRollNumber] = useState('');
    const [studentName, setStudentName] = useState('');
    const [studentPhoto, setStudentPhoto] = useState(null);
    const [studentEmail, setStudentEmail] = useState('');
    const [qrCodeData, setQrCodeData] = useState('');

    const handlePhotoChange = (e) => {
        setStudentPhoto(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Upload student photo to Firebase Storage
        let photoURL = '';
        if (studentPhoto) {
            const photoRef = ref(storage, `student_photos/${studentPhoto.name}`);
            await uploadBytes(photoRef, studentPhoto);
            photoURL = await getDownloadURL(photoRef);
        }

        // Save student data to Firestore
        await addDoc(collection(db, 'student-data'), {
            rollNumber,
            studentName,
            studentEmail,
            password: 'au123456', // Default password
            photoURL,
            qrCodeData,
        });

        // Reset the form
        setRollNumber('');
        setStudentName('');
        setStudentPhoto(null);
        setStudentEmail('');
        setQrCodeData('');
        alert('Student registered successfully!');
    };

    // Effect to generate QR Code when rollNumber changes
    useEffect(() => {
        if (rollNumber) {
            QRCode.toDataURL(rollNumber)
                .then((url) => {
                    setQrCodeData(url);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
    }, [rollNumber]);

    return (
        <>
            <nav class="navbar navbar-expand-lg bg-body-tertiary ">
                <div class="container-fluid">
                    <a class="navbar-brand" href="#">Staff Dashboard</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <Link class="nav-link ml-3" aria-current="page" to="/staff-dashboard">Back to Dashboard</Link>
                            </li>
                            <li class="nav-item">
                                <Link to="/attendance-scanning" class="nav-link" >
                                    Attendance Scanning
                                </Link>
                            </li>
                            <li class="nav-item">
                                <Link to="/attendance-logs" class="nav-link" >
                                    Check Attendance Logs
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav >
            <div className="container mt-3" style={{ color: "white" }}>
                <h2>Student Registration</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Roll Number</label>
                        <input
                            type="text"
                            className="form-control"
                            value={rollNumber}
                            onChange={(e) => setRollNumber(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Student Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={studentName}
                            onChange={(e) => setStudentName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Student Photo</label>
                        <input
                            type="file"
                            className="form-control"
                            accept="image/*"
                            onChange={handlePhotoChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Student Email</label>
                        <input
                            type="email"
                            className="form-control"
                            value={studentEmail}
                            onChange={(e) => setStudentEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <h4>QR Code:</h4>
                        {qrCodeData ? (
                            <img src={qrCodeData} alt="QR Code" style={{ width: '150px', height: '150px' }} />
                        ) : (
                            <p>Please enter all the details to generate the QR code.</p>
                        )}
                    </div>
                    <p>Note : Default Password is set to "au123456" .</p>
                    <button type="submit" className="btn btn-primary">Register Student</button>
                </form>
            </div>
        </>
    );
};

export default StudentRegistration;
