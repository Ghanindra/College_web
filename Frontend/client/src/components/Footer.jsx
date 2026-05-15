
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaEnvelope,
  FaGlobe,
} from "react-icons/fa";

export default function TuFooter() {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-slate-950 text-white">

      {/* TOP GRADIENT LINE */}
      <div className="h-1 bg-gradient-to-r from-slate-900 via-amber-400 to-slate-900" />

      {/* ================= NEWSLETTER ================= */}
      <div className="bg-slate-900/60 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

          <div>
            <h4 className="text-lg md:text-xl font-semibold">
              Stay Connected with Tribhuvan University
            </h4>
            <p className="text-sm text-slate-400 mt-1">
              Get latest notices and academic updates.
            </p>
          </div>

          <div className="flex w-full md:w-auto flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm outline-none focus:border-amber-400 w-full sm:w-72"
            />
            <button className="px-6 py-2 rounded-lg bg-amber-400 text-slate-900 font-semibold hover:bg-amber-300 transition">
              Subscribe
            </button>
          </div>

        </div>
      </div>

      {/* ================= MAIN GRID ================= */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold">
            Tribhuvan <span className="text-amber-400">University</span>
          </h2>

          <p className="text-xs tracking-[0.2em] uppercase text-amber-400 mt-2">
            Est. 1959
          </p>

          <p className="text-sm text-slate-400 mt-4 leading-7">
            Nepal’s premier institution dedicated to education, research and national development.
          </p>

          {/* SOCIALS */}
          <div className="flex gap-3 mt-6">
            {[FaFacebookF, FaTwitter, FaYoutube, FaLinkedinIn].map((Icon, i) => (
              <div
                key={i}
                className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 transition cursor-pointer"
              >
                <Icon size={14} />
              </div>
            ))}
          </div>
        </div>

        {/* ABOUT */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-amber-400 mb-5">
            About
          </h3>

          <div className="flex flex-col gap-3 text-sm text-slate-400">
            <Link to="/aboutus" className="hover:text-amber-400">About TU</Link>
            <Link to="/history" className="hover:text-amber-400">History</Link>
            <Link to="/vision" className="hover:text-amber-400">Vision & Mission</Link>
            <Link to="/leadership" className="hover:text-amber-400">Leadership</Link>
            <Link to="/tuconvocation" className="hover:text-amber-400">Convocation</Link>
          </div>
        </div>

        {/* ACADEMICS */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-amber-400 mb-5">
            Academics
          </h3>

          <div className="flex flex-col gap-3 text-sm text-slate-400">
            <Link to="/research" className="hover:text-amber-400">Research</Link>
            <Link to="/events" className="hover:text-amber-400">Events</Link>
            <Link to="/news" className="hover:text-amber-400">Notices</Link>
            <Link to="/activities" className="hover:text-amber-400">Activities</Link>
            <Link to="/gallery" className="hover:text-amber-400">Gallery</Link>
          </div>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-sm font-semibold uppercase tracking-widest text-amber-400 mb-5">
            Contact
          </h3>

          <div className="space-y-4 text-sm text-slate-400">

            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-amber-400" />
              Kirtipur, Kathmandu
            </div>

            <div className="flex items-center gap-3">
              <FaPhoneAlt className="text-amber-400" />
              +977-1-4330433
            </div>

            <div className="flex items-center gap-3">
              <FaEnvelope className="text-amber-400" />
              info@tu.edu.np
            </div>

            <div className="flex items-center gap-3">
              <FaGlobe className="text-amber-400" />
              tu.edu.np
            </div>

          </div>
        </div>

      </div>

      {/* ================= BOTTOM ================= */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">

          <p className="text-center md:text-left">
            © {new Date().getFullYear()}{" "}
            <span className="text-amber-400 font-medium">
              Tribhuvan University
            </span>
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <Link to="/privacy" className="hover:text-amber-400">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-amber-400">Terms of Use</Link>
            <Link to="/sitemap" className="hover:text-amber-400">Sitemap</Link>
            <Link to="/contact" className="hover:text-amber-400">Contact</Link>
          </div>

        </div>
      </div>

    </footer>
  );
}
