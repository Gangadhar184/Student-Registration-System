import { useState } from 'react'

const dummyCourseTypes = ['Individual', 'Group', 'Special']
const dummyOfferings = [
  'Individual - Hindi',
  'Group - English',
  'Special - Urdu',
  'Group - Hindi',
]

function StudentRegistrations() {
  const [selectedType, setSelectedType] = useState('')
  const [filteredOfferings, setFilteredOfferings] = useState(dummyOfferings)
  const [selectedOffering, setSelectedOffering] = useState('')
  const [studentName, setStudentName] = useState('')
  const [email, setEmail] = useState('')
  const [registrations, setRegistrations] = useState({})
  const [error, setError] = useState('')

  const generateId = () => `${Date.now()}-${Math.floor(Math.random() * 10000)}`

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())

  const handleTypeChange = (type) => {
    setSelectedType(type)
    const filtered = dummyOfferings.filter((off) => off.startsWith(type))
    setFilteredOfferings(type ? filtered : dummyOfferings)
    setSelectedOffering('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const trimmedName = studentName.trim()
    const trimmedEmail = email.trim()

    if (!trimmedName || !trimmedEmail || !selectedOffering) {
      setError('All fields are required.')
      return
    }

    if (!isValidEmail(trimmedEmail)) {
      setError('Invalid email format.')
      return
    }

    const students = registrations[selectedOffering] || []
    const emailExists = students.some(
      (s) => s.email.toLowerCase() === trimmedEmail.toLowerCase()
    )
    if (emailExists) {
      setError('This email is already registered for the selected offering.')
      return
    }

    const updated = { ...registrations }
    if (!updated[selectedOffering]) {
      updated[selectedOffering] = []
    }

    updated[selectedOffering].push({
      id: generateId(),
      name: trimmedName,
      email: trimmedEmail,
    })

    setRegistrations(updated)
    setStudentName('')
    setEmail('')
    setSelectedOffering('')
    setError('')
  }

  const handleDeleteStudent = (offering, studentId) => {
    const updated = { ...registrations }
    updated[offering] = updated[offering].filter((s) => s.id !== studentId)

    if (updated[offering].length === 0) {
      delete updated[offering]
    }

    setRegistrations(updated)
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Student Registrations</h2>

      <div className="mb-4">
        <label className="text-sm">Filter by Course Type:</label>
        <select
          value={selectedType}
          onChange={(e) => handleTypeChange(e.target.value)}
          className="w-full mt-1 p-2 border rounded"
        >
          <option value="">-- All Types --</option>
          {dummyCourseTypes.map((type) => (
            <option key={type}>{type}</option>
          ))}
        </select>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div className="flex flex-col gap-1">
          <label className="text-sm">Select Course Offering:</label>
          <select
            value={selectedOffering}
            onChange={(e) => setSelectedOffering(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">-- Choose Offering --</option>
            {filteredOfferings.map((off) => (
              <option key={off}>{off}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm">Student Name:</label>
          <input
            type="text"
            placeholder="Enter student name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="p-2 border rounded"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm">Email:</label>
          <input
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border rounded"
          />
        </div>

        <button className="w-full bg-blue-600 text-white py-2 rounded">
          Register
        </button>
      </form>

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <h3 className="text-xl font-semibold mb-2">Registered Students</h3>
      {Object.keys(registrations).length === 0 && (
        <p className="text-gray-500">No students registered yet.</p>
      )}
      <div className="space-y-4">
        {Object.entries(registrations).map(([offering, students]) => (
          <div key={offering} className="border rounded p-3 bg-gray-50">
            <h4 className="font-semibold">{offering}</h4>
            <ul className="list-disc list-inside text-sm mt-1 space-y-1">
              {students.map((s) => (
                <li key={s.id} className="flex justify-between items-start">
                  <div>
                    <p className="font-medium">{s.name}</p>
                    <p className="text-gray-600 text-xs">{s.email}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteStudent(offering, s.id)}
                    className="text-red-500 text-xs hover:underline ml-4"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StudentRegistrations
