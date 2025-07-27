import { Routes, Route, NavLink } from 'react-router-dom'
import CourseTypes from './components/CourseTypes'
import Courses from './components/Courses'
import CourseOfferings from './components/CourseOfferings'
import StudentRegistrations from './components/StudentRegistrations'

const App = () => {
  const navClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
      isActive ? 'bg-blue-600 text-white' : 'text-blue-600 hover:bg-blue-200'
    }`

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <nav className="mb-6 flex flex-wrap gap-2">
        <NavLink to="/types" className={navClass}>
          Course Types
        </NavLink>
        <NavLink to="/courses" className={navClass}>
          Courses
        </NavLink>
        <NavLink to="/offerings" className={navClass}>
          Offerings
        </NavLink>
        <NavLink to="/registrations" className={navClass}>
          Registrations
        </NavLink>
      </nav>

      {/* Page Content */}
      <div className="bg-white rounded-lg shadow-md p-4 md:p-6 lg:p-8">
        <Routes>
          <Route path="/types" element={<CourseTypes />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/offerings" element={<CourseOfferings />} />
          <Route path="/registrations" element={<StudentRegistrations />} />
          <Route path="*" element={<CourseTypes />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
