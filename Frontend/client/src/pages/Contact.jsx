import React,{ useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import TuHeader from "../components/TuHeader";
import Footer from "../components/Footer";
import "./Contact.css"; // ✅ Normal CSS

export default function ContactUsPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      subject: e.target.subject.value,
      message: e.target.message.value,
    };

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Message sent successfully");
        e.target.reset();
      } else {
        alert(data.error || "Failed to send message");
      }
    } catch (err) {
      alert("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-container">
      <div className="contactHeader"><TuHeader /></div>
      <div className="card">
        <div className="cardHeader">
          <h1 className="cardTitle">Contact Us</h1>
          <p className="cardDescription">
            We'd love to hear from you! Reach out to the College of TU.
          </p>
        </div>

        <div className="cardContent">
          <div className="sectionGroup">
            <h2 className="sectionTitle">Get in Touch</h2>
            <div className="sectionGroup">
              <div className="contactInfoItem">
                <MapPin className="contactInfoIcon" />
                <div>
                  <p className="contactInfoLabel">Address</p>
                  <p className="contactInfoText">
                    TU College Main Campus,<br />
                    123 University Ave,<br />
                    Kathmandu, Nepal
                  </p>
                </div>
              </div>
              <div className="contactInfoItem">
                <Phone className="contactInfoIcon" />
                <div>
                  <p className="contactInfoLabel">Phone</p>
                  <p className="contactInfoText">+977 1-4245678</p>
                </div>
              </div>
              <div className="contactInfoItem">
                <Mail className="contactInfoIcon" />
                <div>
                  <p className="contactInfoLabel">Email</p>
                  <p className="contactInfoText">info@tucollege.edu.np</p>
                </div>
              </div>
            </div>

            <div className="mapContainer">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.3900000000004!2d85.31999999999999!3d27.700000000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198a307baabf%3A0xb0f2353e880ed2bb!2sTribhuvan%20University!5e0!3m2!1sen!2snp!4v1700000000000!5m2!1sen!2snp"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                aria-label="Location of Tribhuvan University on Google Maps"
              ></iframe>
            </div>
          </div>

          <form className="sectionGroup" onSubmit={handleSubmit}>
            <h2 className="sectionTitle">Send us a Message</h2>
            <div className="formGrid">
              <div className="formGroup">
                <label htmlFor="name" className="label">Name</label>
                <input id="name" placeholder="Your Name" className="input" />
              </div>
              <div className="formGroup">
                <label htmlFor="email" className="label">Email</label>
                <input id="email" type="email" placeholder="your@example.com" className="input" />
              </div>
            </div>
            <div className="formGroup">
              <label htmlFor="subject" className="label">Subject</label>
              <input id="subject" placeholder="Subject of your message" className="input" />
            </div>
            <div className="formGroup">
              <label htmlFor="message" className="label">Message</label>
              <textarea id="message" placeholder="Your message..." className="textarea" />
            </div>

            <button type="submit" className="button" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>
      </div>
      <div className="contactFooter"><Footer /></div>
    </div>
  );
}
