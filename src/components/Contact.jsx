import React from "react";

const Contact = () => {
  return (
    <section id="contact" className="section">
      <h2 className="section-title">Contact</h2>
      <p className="section-lead">
        一緒にプロジェクトに取り組んでみたい企業・個人の方は、
        お気軽にご連絡ください。
      </p>
      <div className="contact-box">
        <p>
          Email: <a href="mailto:your-mail@example.com">your-mail@example.com</a>
        </p>
        <p>
          GitHub:{" "}
          <a
            href="https://github.com/your-github-id"
            target="_blank"
            rel="noreferrer"
          >
            github.com/your-github-id
          </a>
        </p>
      </div>
    </section>
  );
};

export default Contact;