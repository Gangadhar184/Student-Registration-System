import { useState } from 'react';
import { useCourseContext } from '../context/CourseContext';

const Courses = () => {
  const { courses, setCourses } = useCourseContext();
  const [name, setName] = useState('');
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');

  const generateId = () => `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedName = name.trim();
    if (!trimmedName) {
      setError('Course name cannot be empty.');
      return;
    }

    const isDuplicate = courses.some(
      (c) => c.name.toLowerCase() === trimmedName.toLowerCase() && c.id !== editId
    );
    if (isDuplicate) {
      setError('Course name already exists.');
      return;
    }

    setError('');

    if (editId !== null) {
      setCourses((prev) =>
        prev.map((course) =>
          course.id === editId ? { ...course, name: trimmedName } : course
        )
      );
      setEditId(null);
    } else {
      setCourses((prev) => [...prev, { id: generateId(), name: trimmedName }]);
    }

    setName('');
  };

  const handleEdit = (id) => {
    const course = courses.find((c) => c.id === id);
    if (course) {
      setName(course.name);
      setEditId(id);
    }
  };

  const handleDelete = (id) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
    if (editId === id) {
      setEditId(null);
      setName('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-4 sm:p-6 rounded shadow">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">
        Manage Courses
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-2 mb-4"
      >
        <input
          type="text"
          placeholder="Enter course name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full sm:flex-1 p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded w-full sm:w-auto cursor-pointer"
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
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center border p-3 rounded"
            >
              <span className="mb-2 sm:mb-0">{course.name}</span>
              <div className="space-x-3">
                <button
                  onClick={() => handleEdit(course.id)}
                  className="text-yellow-600 hover:underline  cursor-pointer"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(course.id)}
                  className="text-red-600 hover:underline  cursor-pointer "
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Courses;
