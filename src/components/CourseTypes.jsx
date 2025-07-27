import { useState } from "react";
import { useCourseContext } from "../context/CourseContext";

const CourseTypes = () => {
  const { courseTypes, setCourseTypes } = useCourseContext();
  const [name, setName] = useState('');
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Course type name cannot be empty.');
      return;
    }
    setError('');

    if (editId) {
      setCourseTypes(prev =>
        prev.map(ct =>
          ct.id === editId ? { ...ct, name: name.trim() } : ct
        )
      );
      setEditId(null);
    } else {
      setCourseTypes(prev => [
        ...prev,
        { id: crypto.randomUUID(), name: name.trim() }
      ]);
    }
    setName('');
  };

  const handleEdit = (id) => {
    const toEdit = courseTypes.find(ct => ct.id === id);
    if (toEdit) {
      setName(toEdit.name);
      setEditId(id);
    }
  };

  const handleDelete = (id) => {
    setCourseTypes(prev => prev.filter(ct => ct.id !== id));
    if (editId === id) {
      setEditId(null);
      setName('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-4 sm:p-6 rounded shadow">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">
        Manage Course Types
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-2 mb-4"
      >
        <input
          type="text"
          placeholder="Enter course type name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full sm:flex-1 p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto"
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
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center border p-3 rounded"
          >
            <span className="mb-2 sm:mb-0">{type.name}</span>
            <div className="space-x-3">
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
  );
};

export default CourseTypes;
