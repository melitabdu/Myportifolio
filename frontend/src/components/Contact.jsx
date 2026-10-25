import React from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";

function Contact() {
  return (
    <div style={{ padding: "100px", display: "flex", gap: "30px" }}>
      <a
        href="https://github.com/"
        target="_blank"
        rel="noopener noreferrer"
        style={{ fontSize: "40px" }}
      >
        <FaGithub />
      </a>

      <a
        href="https://www.linkedin.com/"
        target="_blank"
        rel="noopener noreferrer"
        style={{ fontSize: "40px" }}
      >
        <FaLinkedinIn />
      </a>
    </div>
  );
}

export default Contact;