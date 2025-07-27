import { useState } from 'react';
import { useCourseContext } from '../context/CourseContext';

const CourseOfferings = () => {
  const {
    courseTypes,
    courses,
    courseOfferings,
    setCourseOfferings,
    registrations,
  } = useCourseContext();

  const [courseType, setCourseType] = useState('');
  const [course, setCourse] = useState('');
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState('');

  const generateId = () => `${Date.now()}-${Math.floor(Math.random() * 10000)}`;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!course || !courseType) {
      setError('Please select both course and course type.');
      return;
    }

    const duplicate = courseOfferings.some(
      (o) => o.courseType === courseType && o.course === course && o.id !== editId
    );

    if (duplicate) {
      setError('This course offering already exists.');
      return;
    }

    if (editId !== null) {
      setCourseOfferings((prev) =>
        prev.map((o) => (o.id === editId ? { ...o, courseType, course } : o))
      );
      setEditId(null);
    } else {
      const newOffering = {
        id: generateId(),
        courseType,
        course,
      };
      setCourseOfferings((prev) => [...prev, newOffering]);
    }

    setCourse('');
    setCourseType('');
    setError('');
  };

  const handleEdit = (id) => {
    const toEdit = courseOfferings.find((o) => o.id === id);
    if (toEdit) {
      setCourse(toEdit.course);
      setCourseType(toEdit.courseType);
      setEditId(id);
    }
  };

  const handleDelete = (id) => {
    setCourseOfferings((prev) => prev.filter((o) => o.id !== id));
    if (editId === id) {
      setEditId(null);
      setCourse('');
      setCourseType('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-4 sm:p-6 rounded shadow">
      <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">
        Course Offerings
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Select Course Type:</label>
          <select
            value={courseType}
            onChange={(e) => setCourseType(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">Choose Type</option>
            {courseTypes.map((type) => (
              <option key={type.id || type} value={type.name || type}>
                {type.name || type}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Select Course:</label>
          <select
            value={course}
            onChange={(e) => setCourse(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">Choose Course</option>
            {courses.map((c) => (
              <option key={c.id || c} value={c.name || c}>
                {c.name || c}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded cursor-pointer"
        >
          {editId !== null ? 'Update Offering' : 'Add Offering'}
        </button>
      </form>

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <ul className="space-y-2">
        {courseOfferings.length === 0 ? (
          <p className="text-gray-500">No course offerings added yet.</p>
        ) : (
          courseOfferings.map((offering) => (
            <li
              key={offering.id}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center border p-3 rounded"
            >
              <span className="mb-2 sm:mb-0">
                <strong>{offering.courseType}</strong> - {offering.course}{' '}
                <span className="text-sm text-gray-500">
                  ({registrations[offering.id]?.length || 0} student
                  {registrations[offering.id]?.length === 1 ? '' : 's'})
                </span>
              </span>
              <div className="space-x-3">
                <button
                  onClick={() => handleEdit(offering.id)}
                  className="text-yellow-600 hover:underline cursor-pointer "
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(offering.id)}
                  className="text-red-600 hover:underline cursor-pointer "
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

export default CourseOfferings;
