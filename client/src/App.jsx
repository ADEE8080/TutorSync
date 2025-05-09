import React from "react";
import { Route, Routes, useMatch } from "react-router-dom";
import Home from "./pages/student/Home";
import CoursesList from "./pages/student/CoursesList";
import CourseDetails from "./pages/student/CourseDetails";
import MyEnrollments from "./pages/student/MyEnrollments";
import Player from "./pages/student/Player";
import Loading from "./components/student/Loading";
import Educator from "./pages/educator/Educator";
import Dashboard from "./pages/educator/Dashboard";
import AddCourse from "./pages/educator/AddCourse";
import MyCourses from "./pages/educator/MyCourses";
import Doubt from "./pages/student/Doubt";
import StudentsEnrolled from "./pages/educator/StudentsEnrolled";
import Notes from "./pages/student/Notes";
import Navbar from "./components/student/Navbar";
import Quiz from "./pages/student/Quiz";
import About from "./pages/student/About";
import "quill/dist/quill.snow.css";

import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";


const App = () => {
  const isEducatorRoute = useMatch("/educator/*");
  const navigate = useNavigate();

  return (
    <div className="text-default min-h-screen bg-gradient-to-r from-green-500 via-blue-500 to-purple-600">
      <ToastContainer />
      {!isEducatorRoute && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course-list" element={<CoursesList />} />
        <Route path="/course-list/:input" element={<CoursesList />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/my-enrollments" element={<MyEnrollments />} />
        <Route path="/player/:courseId" element={<Player />} />
        <Route path="/loading/:path" element={<Loading />} />
        <Route path="/doubt" element={<Doubt/>}/>
        <Route path="/notes" element={<Notes/>}/>
        <Route path="/quiz" element={<Quiz/>}/>
        <Route path="/about" element={<About/>}/>

        <Route path="/educator" element={<Educator />}>
          <Route path="/educator" element={<Dashboard />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="student-enrolled" element={<StudentsEnrolled />} />
        </Route>
      </Routes>

      {/* 🟢 Floating Action Button */}

        <button
          className="fixed bottom-6 right-6 z-50 
    bg-slate-900 text-white 
    w-14 h-14
 rounded-full shadow-lg hover:scale-105 transition-transform"
          onClick={() => navigate("/doubt")}
          title="Ask a Doubt"
        >
          ?
        </button>
    </div>
  );
};

export default App;
