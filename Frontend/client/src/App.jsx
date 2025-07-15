import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Notices from "./pages/Notice";
import Events from "./pages/Event";
import Courses from "./pages/Courses";
import Faculty from "./pages/Faculty";
import Gallery from "./pages/Gallery";
import HomePageTu from "./pages/HomePageTu";
import AllNotice from "./pages/AllNotice"; 
import './App.css'
import NoticeDetailsPage from "./pages/NoticDetailsPage";
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" />;
}

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HomePageTu />} />
        <Route path="/login" element={<Login />} />
        <Route path="/news" element={<AllNotice />} /> 
        <Route path="/news/:id" element={<NoticeDetailsPage />} />
        {/* Protected dashboard and its children */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="notices" element={<Notices />} />
          <Route path="events" element={<Events />} />
          <Route path="courses" element={<Courses />} />
          <Route path="faculty" element={<Faculty />} />
          <Route path="gallery" element={<Gallery />} />
        </Route>

        {/* Catch all unmatched routes */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}
