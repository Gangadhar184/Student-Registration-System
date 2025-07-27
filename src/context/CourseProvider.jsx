import { useState } from "react";
import { CourseContext } from "./CourseContext";


export const CourseProvider = ({ children }) => {
  const [courseTypes, setCourseTypes] = useState([])
  const [courses, setCourses] = useState([])
  const [courseOfferings, setCourseOfferings] = useState([])

  return (
    <CourseContext.Provider
      value={{
        courseTypes,
        setCourseTypes,
        courses,
        setCourses,
        courseOfferings,
        setCourseOfferings,
      }}
    >
      {children}
    </CourseContext.Provider>
  )
}
