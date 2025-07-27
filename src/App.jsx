import { Routes, Route, NavLink } from 'react-router-dom'
import CourseTypes from './components/CourseTypes'
import Courses from './components/Courses'
import CourseOfferings from './components/CourseOfferings'
import StudentRegistrations from './components/StudentRegistrations'

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <nav className="mb-6 space-x-2">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            `px-3 py-1 rounded ${isActive ? 'bg-blue-600 text-white' : 'text-blue-500 hover:bg-blue-100'}`
          }
        >
          Course Types
        </NavLink>
        <NavLink
          to="/courses"
          className={({ isActive }) =>
            `px-3 py-1 rounded ${isActive ? 'bg-blue-600 text-white' : 'text-blue-500 hover:bg-blue-100'}`
          }
        >
          Courses
        </NavLink>
        <NavLink
          to="/offerings"
          className={({ isActive }) =>
            `px-3 py-1 rounded ${isActive ? 'bg-blue-600 text-white' : 'text-blue-500 hover:bg-blue-100'}`
          }
        >
          Course Offerings
        </NavLink>
        <NavLink
          to="/registrations"
          className={({ isActive }) =>
            `px-3 py-1 rounded ${isActive ? 'bg-blue-600 text-white' : 'text-blue-500 hover:bg-blue-100'}`
          }
        >
          Student Registrations
        </NavLink>
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
