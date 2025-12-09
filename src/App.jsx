import React from "react";
import "./style.css";
import { motion } from "framer-motion";

function App() {
  return (
    <div className="app">
      {/* HERO */}
      <motion.section
        className="hero"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="hero-content">
          <p className="hero-tagline">
            Business × Engineering Student / Portfolio
          </p>
          <h1>Shoi Tanaka</h1>
          <p className="hero-text">
            ここに自己紹介の一文を入れるイメージです。
          </p>

          {/* ← ここが追加したボタン */}
          <motion.a
            href="#projects"
            className="btn primary"
            whileHover={{
              y: -2,
              boxShadow: "0 18px 40px rgba(88,196,255,0.6)",
            }}
            whileTap={{ scale: 0.97 }}
          >
            View Projects
          </motion.a>
        </div>
      </motion.section>

      <main>
        <motion.section
          className="section"
          id="about"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="section-title">About</h2>
          <p className="section-lead">ここに自己紹介を書いていきます。</p>
        </motion.section>

        <section id="skills" className="section">
          <h2>Skills</h2>
          <ul>
            <li>React / Vite</li>
            <li>JavaScript / TypeScript（予定）</li>
            <li>Finance / Marketing Research など</li>
          </ul>
        </section>

        <section id="projects" className="section">
          <h2>Projects</h2>
          <p>ここに作品一覧を並べます。</p>
        </section>

        <section id="contact" className="section">
          <h2>Contact</h2>
          <p>メールや各種リンクを載せる。</p>
        </section>
      </main>

      <footer className="footer">© 2025 Shota Tanaka</footer>
    </div>
  );
}

export default App;
