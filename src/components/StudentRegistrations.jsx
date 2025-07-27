import { useState } from 'react';
import { useCourseContext } from '../context/CourseContext';

const StudentRegistrations = () => {
  const {
    courseOfferings,
    registrations,
    setRegistrations,
    courseTypes,
  } = useCourseContext();

  const [studentName, setStudentName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCourseType, setSelectedCourseType] = useState('');
  const [selectedOfferingId, setSelectedOfferingId] = useState('');
  const [error, setError] = useState('');

  const generateId = () => `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const filteredOfferings = selectedCourseType
    ? courseOfferings.filter((o) => o.courseType === selectedCourseType)
    : courseOfferings;

  const handleRegister = (e) => {
    e.preventDefault();

    if (!studentName.trim() || !email.trim() || !selectedOfferingId) {
      setError('All fields are required.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    const newRegistration = {
      id: generateId(),
      name: studentName.trim(),
      email: email.trim(),
    };

    setRegistrations((prev) => {
      const current = prev[selectedOfferingId] || [];
      return {
        ...prev,
        [selectedOfferingId]: [...current, newRegistration],
      };
    });

    setStudentName('');
    setEmail('');
    setSelectedOfferingId('');
    setError('');
  };

  const handleDelete = (offeringId, regId) => {
    setRegistrations((prev) => ({
      ...prev,
      [offeringId]: prev[offeringId].filter((r) => r.id !== regId),
    }));
  };

  return (
    <div className="max-w-4xl w-full mx-auto bg-white p-6 sm:p-8 rounded shadow-md">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Student Registrations</h2>

      <form onSubmit={handleRegister} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Student Name:</label>
          <input
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="p-2 border rounded"
            placeholder="Enter student name"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Email:</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border rounded"
            placeholder="Enter student email"
            type="email"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Filter by Course Type:</label>
          <select
            value={selectedCourseType}
            onChange={(e) => {
              setSelectedCourseType(e.target.value);
              setSelectedOfferingId('');
            }}
            className="p-2 border rounded"
          >
            <option value="">All Types</option>
            {courseTypes.map((type) => (
              <option key={type.id} value={type.name}>
                {type.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-medium">Course Offering:</label>
          <select
            value={selectedOfferingId}
            onChange={(e) => setSelectedOfferingId(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="">Select Offering</option>
            {filteredOfferings.map((offering) => (
              <option key={offering.id} value={offering.id}>
                {offering.courseType} - {offering.course}
              </option>
            ))}
          </select>
        </div>

        <div className="sm:col-span-2">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200 cursor-pointer"
          >
            Register Student
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-sm sm:col-span-2 mt-2">{error}</p>
        )}
      </form>

      <hr className="my-4" />

      <h3 className="text-lg font-semibold mb-3">Registrations</h3>
      {Object.keys(registrations).length === 0 ? (
        <p className="text-gray-500">No registrations yet.</p>
      ) : (
        Object.entries(registrations).map(([offeringId, students]) => {
          const offering = courseOfferings.find((o) => o.id === offeringId);
          if (!offering) return null;

          return (
            <div key={offeringId} className="mb-6">
              <h4 className="font-semibold text-sm sm:text-base mb-2">
                {offering.courseType} - {offering.course}
              </h4>
              <ul className="space-y-2">
                {students.map((student) => (
                  <li
                    key={student.id}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center border p-2 rounded gap-2"
                  >
                    <span className="text-sm">
                      {student.name} ({student.email})
                    </span>
                    <button
                      onClick={() => handleDelete(offeringId, student.id)}
                      className="text-red-600 hover:underline text-xs cursor-pointer"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          );
        })
      )}
    </div>
  );
};

export default StudentRegistrations;
