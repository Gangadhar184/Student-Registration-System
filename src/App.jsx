import { Routes, Route, NavLink } from 'react-router-dom'
import CourseTypes from './components/CourseTypes'
import Courses from './components/Courses'
import CourseOfferings from './components/CourseOfferings'
import StudentRegistrations from './components/StudentRegistrations'

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <nav className="mb-6 space-x-2">
        <NavLink to="/types" className={navClass}>Course Types</NavLink>
        <NavLink to="/courses" className={navClass}>Courses</NavLink>
        <NavLink to="/offerings" className={navClass}>Offerings</NavLink>
        <NavLink to="/registrations" className={navClass}>Registrations</NavLink>
      </nav>

      <Routes>
        <Route path="/types" element={<CourseTypes />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/offerings" element={<CourseOfferings />} />
        <Route path="/registrations" element={<StudentRegistrations />} />
        <Route path="*" element={<CourseTypes />} /> {/* Default to types */}
      </Routes>
    </div>
  )
}

const navClass = ({ isActive }) =>
  `px-3 py-1 rounded ${isActive ? 'bg-blue-600 text-white' : 'text-blue-500 hover:bg-blue-100'}`

export default App
