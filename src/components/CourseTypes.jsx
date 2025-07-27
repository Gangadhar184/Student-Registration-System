import { useState } from "react"

const CourseTypes = () => {
  const [courseTypes, setCourseTypes] = useState([])
  const [name, setName] = useState('')
  const [editId, setEditId] = useState(null)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name.trim()) {
      setError('Course type name cannot be empty.')
      return
    }
    setError('')

    if (editId) {
      setCourseTypes(prev =>
        prev.map(ct =>
          ct.id === editId ? { ...ct, name: name.trim() } : ct
        )
      )
      setEditId(null)
    } else {
      setCourseTypes(prev => [
        ...prev,
        { id: crypto.randomUUID(), name: name.trim() }
      ])
    }
    setName('')
  }

  const handleEdit = (id) => {
    const toEdit = courseTypes.find(ct => ct.id === id)
    if (toEdit) {
      setName(toEdit.name)
      setEditId(id)
    }
  }

  const handleDelete = (id) => {
    setCourseTypes(prev => prev.filter(ct => ct.id !== id))
    if (editId === id) {
      setEditId(null)
      setName('')
    }
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Manage Course Types</h2>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter course type name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editId ? 'Update' : 'Add'}
        </button>
      </form>

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <ul className="space-y-2">
        {courseTypes.length === 0 && (
          <p className="text-gray-500">No course types added yet.</p>
        )}
        {courseTypes.map((type) => (
          <li
            key={type.id}
            className="flex justify-between items-center border p-2 rounded"
          >
            <span>{type.name}</span>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(type.id)}
                className="text-yellow-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(type.id)}
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default CourseTypes
