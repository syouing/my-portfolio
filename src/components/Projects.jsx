import React from "react";

const projects = [
  {
    title: "TSP 最短経路探索ツール (Python)",
    tags: ["Python", "Algorithm", "Visualization"],
    description:
      "11都市の巡回セールスマン問題(TSP)を全探索で解き、最短経路を算出・可視化するツール。距離行列の構築からグラフ描画までを一貫して実装。",
    link: "https://github.com/your-github-id/your-tsp-repo"
  },
  {
    title: "給与水準の決定要因分析",
    tags: ["Python", "Pandas", "Regression"],
    description:
      "日本の平均給与を目的変数とし、GDPや有効求人倍率などを説明変数とした重回帰分析を実施。p値・t値・標準化係数を用いて要因を検証。",
    link: "https://github.com/your-github-id/your-regression-repo"
  },
  {
    title: "学生向けカーリース新規事業提案",
    tags: ["Business", "Finance", "Slide"],
    description:
      "カーリース会社を対象とした学生・若年層向けの新規事業プラン。家族・友人シェアプランや走行距離に応じた価格設計、LTV最大化を意識したモデルを提案。",
    link: "#"
  },
  {
    title: "子どもの思考力を鍛えるAIエージェント構想",
    tags: ["AI", "Education", "Planning"],
    description:
      "子どもの論理的思考・メタ認知を鍛えるAI家庭教師サービスの事業計画。対話設計や学習データの設計、教育的意義をレポートにまとめた。",
    link: "#"
  }
];

const Projects = () => {
  return (
    <section id="projects" className="section">
      <h2 className="section-title">Projects</h2>
      <p className="section-lead">
        データ分析・金融・教育・営業というバックグラウンドを活かし、
        コードとビジネスの両面からプロジェクトに取り組んでいます。
      </p>
      <div className="projects-grid">
        {projects.map((p) => (
          <article key={p.title} className="project-card">
            <h3>{p.title}</h3>
            <div className="project-tags">
              {p.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            <p>{p.description}</p>
            {p.link && p.link !== "#" && (
              <a
                href={p.link}
                target="_blank"
                rel="noreferrer"
                className="project-link"
              >
                View on GitHub
              </a>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};

export default Projects;