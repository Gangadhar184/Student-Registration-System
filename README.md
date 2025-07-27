# Assignment of Eleven Software Solutions Pvt

## Student Course Registration System

- A responsive single-page React application to manage:

- Course Types (e.g., Individual, Group, Special)

- Courses (e.g., Programming, Java, C++)

- Course Offerings (associating courses with course types)

- Student Registrations (based on selected course offerings)

- All state is managed globally via the Context API.

## Project Structure

    src/
├── components/
│   ├── CourseTypes.jsx
│   ├── Courses.jsx
│   ├── CourseOfferings.jsx
│   └── StudentRegistrations.jsx
├── context/
│   └── CourseContext.jsx

├── App.jsx
└── main.jsx

## Features

Features

- Add, edit, delete Course Types

- Add, edit, delete Courses

- Add, edit, delete Course Offerings

- Register students for a Course Offering

- Delete a registration

- Filter course offerings by selected course type (in registration form)

- Real-time context updates across components

- Fully responsive UI with TailwindCSS

## Tech Stack

React (Functional Components + Hooks)

Context API (Global state)

Tailwind CSS (Styling)
