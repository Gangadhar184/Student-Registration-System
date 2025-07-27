import {Routes, Route, Link} from 'react-router-dom';
import CourseTypes from './components/CourseTypes';
import Courses from './components/Courses';
import CourseOfferings from './components/CourseOfferings';
import StudentRegistrations from './components/StudentRegistrations';

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <nav className="mb-6 space-x-4">
        <Link to="/" className="text-blue-500">Course Types</Link>
        <Link to="/courses" className="text-blue-500">Courses</Link>
        <Link to="/offerings" className="text-blue-500">Course Offerings</Link>
        <Link to="/registrations" className="text-blue-500">Student Registrations</Link>
      </nav>

      <Routes>
        <Route path="/" element={<CourseTypes />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/offerings" element={<CourseOfferings />} />
        <Route path="/registrations" element={<StudentRegistrations />} />
      </Routes>
    </div>
  )
}

export default App
