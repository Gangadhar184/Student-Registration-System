import { useState } from "react";
import { CourseContext } from "./CourseContext";


export const CourseProvider = ({ children }) => {
  const [courseTypes, setCourseTypes] = useState([
  { id: 'type-1', name: 'Individual' },
  { id: 'type-2', name: 'Group' },
  { id: 'type-3', name: 'Special' },
]);

const [courses, setCourses] = useState([
  { id: 'course-1', name: 'Programming' },
  { id: 'course-2', name: 'Java' },
  { id: 'course-3', name: 'C++' },
]);

  const [courseOfferings, setCourseOfferings] = useState([])
  const [registrations, setRegistrations] = useState({})

  return (
    <CourseContext.Provider
      value={{
        courseTypes,
        setCourseTypes,
        courses,
        setCourses,
        courseOfferings,
        setCourseOfferings,
        registrations,             
        setRegistrations, 
      }}
    >
      {children}
    </CourseContext.Provider>
  )
}
