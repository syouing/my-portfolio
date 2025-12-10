<motion.section
  id="projects"
  className="section"
  initial={{ opacity: 0, y: 32 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
>
  <h2>Projects</h2>

  {/* プロジェクトデータをここに追加するだけでOK */}
  {[
    {
      title: "ポートフォリオサイト",
      description: "React と Vite を用いて制作した個人ポートフォリオサイト。",
      tags: ["React", "Vite", "Framer Motion"],
      link: "https://syouing.tech"
    },
    {
      title: "分析ツール（例）",
      description: "大学課題で作成したデータ分析ツール。視覚化と統計処理を実装。",
      tags: ["Python", "DataViz"],
      link: "#"
    }
  ].map((project, index) => (
    <div className="projects-grid" key={index}>
      <div className="project-card">
        <h3>{project.title}</h3>

        <div className="project-tags">
          {project.tags.map((tag, i) => (
            <span className="tag" key={i}>{tag}</span>
          ))}
        </div>

        <p>{project.description}</p>

        <a className="project-link" href={project.link} target="_blank" rel="noopener noreferrer">
          View Project →
        </a>
      </div>
    </div>
  ))}
</motion.section>
