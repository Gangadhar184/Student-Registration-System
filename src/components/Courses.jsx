import {useState} from 'react'

const Courses = () => {
  const [courses, setCourses] = useState([])
  const [name, setName] = useState('')
  const [editId, setEditId] = useState(null)
  const [error, setError] = useState('')

  const generateId = () => `${Date.now()}-${Math.floor(Math.random() * 10000)}`

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) {
      setError('Course name cannot be empty.')
      return
    }
    setError('')

    if (editId !== null) {
      setCourses(prev =>
        prev.map(course =>
          course.id === editId ? { ...course, name: name.trim() } : course
        )
      )
      setEditId(null)
    } else {
      setCourses(prev => [
        ...prev,
        { id: generateId(), name: name.trim() }
      ])
    }

    setName('')
  }

  const handleEdit = (id) => {
    const course = courses.find(c => c.id === id)
    if (course) {
      setName(course.name)
      setEditId(id)
    }
  }

  const handleDelete = (id) => {
    setCourses(prev => prev.filter(c => c.id !== id))
    if (editId === id) {
      setEditId(null)
      setName('')
    }
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Manage Courses</h2>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter course name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editId !== null ? 'Update' : 'Add'}
        </button>
      </form>

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <ul className="space-y-2">
        {courses.length === 0 ? (
          <p className="text-gray-500">No courses added yet.</p>
        ) : (
          courses.map((course) => (
            <li
              key={course.id}
              className="flex justify-between items-center border p-2 rounded"
            >
              <span>{course.name}</span>
              <div className="space-x-2">
                <button
                  onClick={() => handleEdit(course.id)}
                  className="text-yellow-600 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(course.id)}
                  className="text-red-600 hover:underline"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  )

}

export default Courses
