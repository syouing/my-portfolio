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
          <h1>Shota Tanaka</h1>
          <p className="hero-text">
            ここに自己紹介の一文を入れるイメージです。
          </p>

          <div className="hero-buttons">
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

            <motion.a
              href="#contact"
              className="btn secondary"
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.97 }}
            >
              Contact
            </motion.a>
          </div>
        </div>
      </motion.section>

      <main>
        {/* About */}
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

        {/* Skills */}
        <section id="skills" className="section">
          <h2>Skills</h2>
          <ul>
            <li>React / Vite</li>
            <li>JavaScript / TypeScript（予定）</li>
            <li>Finance / Marketing Research など</li>
          </ul>
        </section>

        {/* Projects（カードレイアウト） */}
        <motion.section
          id="projects"
          className="section"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
        >
          <h2>Projects</h2>

          {[
            {
              title: "ポートフォリオサイト",
              description:
                "React と Vite を用いて制作した個人ポートフォリオサイト。",
              tags: ["React", "Vite", "Framer Motion"],
              link: "https://syouing.tech",
            },
            {
              title: "分析ツール（例）",
              description:
                "大学課題で作成したデータ分析ツール。視覚化と統計処理を実装。",
              tags: ["Python", "DataViz"],
              link: "#",
            },
          ].map((project, index) => (
            <div className="projects-grid" key={index}>
              <div className="project-card">
                <h3>{project.title}</h3>

                <div className="project-tags">
                  {project.tags.map((tag, i) => (
                    <span className="tag" key={i}>
                      {tag}
                    </span>
                  ))}
                </div>

                <p>{project.description}</p>

                <a
                  className="project-link"
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Project →
                </a>
              </div>
            </div>
          ))}
        </motion.section>

        {/* Contact */}
        <section id="contact" className="section">
          <h2>Contact</h2>
          <p>メールや各種リンクを載せる。</p>
        </section>
      </main>

      <footer className="footer">© 2025 Shota Tanaka</footer>
    </div>
  );
}

// ★ これが main.jsx から読み込まれる default export
export default App;
