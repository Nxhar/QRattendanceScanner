import { useState } from 'react'
import HomePage from './components/Home'
import './App.css'
import CameraCheck from './components/CameraCheck'
import { Route, Routes } from 'react-router-dom'
import StaffLogin from './components/StaffLogin'
import StaffDashboard from './components/StaffDashboard'
import StudentRegistration from './components/StudentRegistration'
import AttendanceScanning from './components/AttendanceScanning'
import AttendanceLogs from './components/AttendanceLogs'
import StudentLogin from './components/StudentLogin'
import StudentIdCard from './components/StudentIDCard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <CameraCheck /> */}

      <Routes >

        <Route path='/' element={<HomePage /> } />
        <Route path='/staff-login' element={<StaffLogin />} />
        <Route path='/staff-dashboard' element={<StaffDashboard />} />
        <Route path='/student-registration' element={<StudentRegistration />}/>
        <Route path='/attendance-scanning' element={<AttendanceScanning />} />
        <Route path='/attendance-logs' element={<AttendanceLogs />} />

        <Route path='/student-login' element={<StudentLogin />} />
        <Route path='/student-id-card' element={<StudentIdCard />} />


      </Routes>
    </>
  )
}

export default App
