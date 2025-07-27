import { createContext, useContext } from 'react'

export const CourseContext = createContext()

export const useCourseContext = () => useContext(CourseContext)
