// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import PrivateRoute from "./components/PrivateRoute";

// import Login from "./pages/Login";
// import Dashboard from "./pages/Dashboard";
// import Notices from "./pages/Notice";
// import Events from "./pages/Event";
// import Courses from "./pages/Courses";
// import Faculty from "./pages/Faculty";
// import Gallery from "./pages/Gallery";
// import HomePageTu from "./pages/HomePageTu";
// import AllNotice from "./pages/AllNotice"; 
// import AllEvent from "./pages/AllEvent"; 

// import NoticeDetailsPage from "./pages/NoticDetailsPage";
// import GalleryPage from "./pages/GalleryPage";
// import ExamForm from "./pages/ExamForm";
// import ExamFormAdmin from "./pages/ExamFormAdmin";
// import ResultSearch from "./pages/ResultSearch";
// import AdminAddResult from "./pages/AdminAddResult";
// import ExamRoutine from "./pages/ExamRoutine";
// import ExamRoutineGallery from "./pages/ExamRoutineGallery";
// import './App.css'
// // import CourseDetail from "./pages/CourseDetail";
// import TuConvocation from "./pages/TuConvocation";
// import ViceChancellorMessage from "./pages/ViceChancellorMessage";
// import Register from "./pages/Register";
// import FormConfig from "./pages/FormConfig";
// import Contact from "./pages/Contact";
// import AboutUs from "./pages/AboutUs";
// import Research from "./pages/Research";
// import Failure from "./pages/Failure";
// import Success from "./pages/Success";




// export default function App() {
//   return (
//     <Router>
//       <Routes>
//         {/* Public routes */}
//         <Route path="/" element={<HomePageTu />} />
//         <Route path="/login" element={<Login />} />
      
//         <Route path="/news" element={<AllNotice />} /> 

//         <Route path="/news/:id" element={<NoticeDetailsPage />} />
//         <Route path="/events" element={<AllEvent />} />
//         <Route path="/gallery" element={<GalleryPage />} />
//            <Route path="/examform" element={<ExamForm />} />
//            <Route path="/resultsearch" element={<ResultSearch/>} />
//            <Route path="/examroutine" element={<ExamRoutineGallery/>} />
//              <Route path="/courses" element={<Courses />} />
//         {/* <Route path="/courses/:courseId" element={<CourseDetail />} /> */}
//         <Route path="/tuconvocation" element={<TuConvocation />} />
//         <Route path="/vicechancellormessage" element={<ViceChancellorMessage />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/aboutus" element={<AboutUs />} />
//         <Route path="/research" element={<Research/>} />
//         <Route path="/success" element={<Success/>} />
//         <Route path="/failure" element={<Failure/>} />

//         {/* Protected dashboard and its children */}
//         <Route
//           path="/dashboard"
//           element={
           
//                 <PrivateRoute>
//       <Dashboard />
//     </PrivateRoute>
      
//           }
//         >
//             <Route path="register" element={<Register />} />
//           <Route path="notices" element={<Notices />} />
//           <Route path="events" element={<Events />} />
//           <Route path="courses" element={<Courses />} />
//           <Route path="faculty" element={<Faculty />} />
//           <Route path="gallery" element={<Gallery />} />
//           <Route path="examform" element={<ExamFormAdmin/>} />
//           <Route path="addresult" element={<AdminAddResult/>} />
//           <Route path="addroutine" element={<ExamRoutine/>} />
//           <Route path="formconfig" element={<FormConfig/>} />
          
       
//         </Route>

//         {/* Catch all unmatched routes */}
//         <Route path="*" element={<Navigate to="/" />} />
//       </Routes>
//     </Router>
//   );
// }


import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import AuthForm from "./components/AuthForm";
// import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";

// Public pages
import HomePageTu from "./pages/HomePageTu";
import AllNotice from "./pages/AllNotice";
import AllEvent from "./pages/AllEvent";
import NoticeDetailsPage from "./pages/NoticDetailsPage";
import GalleryPage from "./pages/GalleryPage";
import ExamForm from "./pages/ExamForm";
import ResultSearch from "./pages/ResultSearch";
import ExamRoutineGallery from "./pages/ExamRoutineGallery";
import Courses from "./pages/Courses";
import TuConvocation from "./pages/TuConvocation";
import ViceChancellorMessage from "./pages/ViceChancellorMessage";
import Contact from "./pages/Contact";
import AboutUs from "./pages/AboutUs";
import Research from "./pages/Research";
// import Success from "./pages/Success";
// import Failure from "./pages/Failure";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentFailed from "./pages/PaymentFailed";
import StudentDashboard from "./pages/StudentDashboard";
// Admin dashboard pages
import Notices from "./pages/Notice";
import Events from "./pages/Event";
import Faculty from "./pages/Faculty";
import Gallery from "./pages/Gallery";
import ExamFormAdmin from "./pages/ExamFormAdmin";
import AdminAddResult from "./pages/AdminAddResult";
import ExamRoutine from "./pages/ExamRoutine";
import FormConfig from "./pages/FormConfig";

import "./App.css";

export default function App() {
  return (

      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={<HomePageTu />} />
        <Route path="/login" element={<AuthForm />} />
        <Route path="/register" element={<Register />} />

        <Route path="/news" element={<AllNotice />} />
        <Route path="/news/:id" element={<NoticeDetailsPage />} />
        <Route path="/events" element={<AllEvent />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/examform" element={<ExamForm />} />
        <Route path="/resultsearch" element={<ResultSearch />} />
        <Route path="/examroutine" element={<ExamRoutineGallery />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/tuconvocation" element={<TuConvocation />} />
        <Route path="/vicechancellormessage" element={<ViceChancellorMessage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/research" element={<Research />} />
        {/* <Route path="/success" element={<Success />} />
        <Route path="/failure" element={<Failure />} /> */}
           <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failed" element={<PaymentFailed />} />
<Route
  path="/student"
  element={
    <PrivateRoute roles={["student"]}>
      <StudentDashboard />
    </PrivateRoute>
  }
/>
        {/* ================= ADMIN DASHBOARD (PROTECTED) ================= */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute roles={["admin"]}>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="notices" element={<Notices />} />
          <Route path="events" element={<Events />} />
          <Route path="courses" element={<Courses />} />
          <Route path="faculty" element={<Faculty />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="examform" element={<ExamFormAdmin />} />
          <Route path="addresult" element={<AdminAddResult />} />
          <Route path="addroutine" element={<ExamRoutine />} />
          <Route path="formconfig" element={<FormConfig />} />
        </Route>

        {/* ================= FALLBACK ================= */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>

  );
}
