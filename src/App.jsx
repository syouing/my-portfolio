import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./style.css";

const postModules = import.meta.glob("./content/posts/*.json", { eager: true, import: "default" });
const posts = Object.values(postModules).sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
const labels = { finance: "金融", engineering: "エンジニアリング" };
const images = {
  finance: `${import.meta.env.BASE_URL}images/finance-cover.png`,
  engineering: `${import.meta.env.BASE_URL}images/engineering-cover.png`,
};
const skills = [
  { title: "Programming", items: ["JavaScript (ES6+) / React", "Python（分析・スクリプト）", "HTML / CSS"] },
  { title: "Data & Finance", items: ["重回帰分析・可視化（Python, Excel）", "M&A・PMIの基礎知識", "経済政策・社会保障制度の理解"] },
  { title: "Business & Communication", items: ["家庭教師営業で学生トップの契約率", "顧客心理のヒアリング・提案", "新規事業・サービス企画"] },
];
const projects = [
  { title: "TSP 最短経路探索ツール", type: "Python / Algorithm / Visualization", description: "11都市の巡回セールスマン問題（TSP）を全探索で解き、最短経路を算出・可視化するツール。距離行列の構築からグラフ描画までを一貫して実装。", mark: "TSP" },
  { title: "給与水準の決定要因分析", type: "Python / Pandas / Regression", description: "日本の平均給与を目的変数とし、GDPや有効求人倍率などを説明変数とした重回帰分析を実施。p値・t値・標準化係数を用いて要因を検証。", mark: "DATA" },
  { title: "学生向けカーリース新規事業提案", type: "Business / Finance / Slide", description: "カーリース会社を対象とした学生・若年層向けの新規事業プラン。家族・友人シェアプランや走行距離に応じた価格設計、LTV最大化を意識したモデルを提案。", mark: "BIZ" },
  { title: "子どもの思考力を鍛えるAIエージェント構想", type: "AI / Education / Planning", description: "子どもの論理的思考・メタ認知を鍛えるAI家庭教師サービスの事業計画。対話設計や学習データの設計、教育的意義をレポートにまとめた。", mark: "AI" },
  { title: "SS指数 計算サイト", type: "Web Tool / Public", description: "外部共有中の計算ツール。既存のドメイン、公開URL、ファイル名を維持したまま運用しています。", mark: "SS" },
];

const formatDate = (date) => new Intl.DateTimeFormat("ja-JP", { year: "numeric", month: "short", day: "numeric" }).format(new Date(date));
function useHashPost() {
  const read = () => location.hash.startsWith("#essay/") ? location.hash.slice(7) : "";
  const [slug, setSlug] = useState(read);
  useEffect(() => { const update = () => setSlug(read()); addEventListener("hashchange", update); return () => removeEventListener("hashchange", update); }, []);
  return posts.find((post) => post.slug === slug);
}

export default function App() {
  const [filter, setFilter] = useState("all");
  const activePost = useHashPost();
  const visiblePosts = useMemo(() => posts.filter((post) => filter === "all" || post.category === filter), [filter]);
  useEffect(() => { document.body.style.overflow = activePost ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [activePost]);

  return <div className="app">
    <header className="site-header">
      <a className="brand" href="#top" aria-label="田中翔大 ポートフォリオ ホーム"><span className="brand-avatar">ST</span><span>Shota Tanaka</span></a>
      <nav aria-label="メインナビゲーション"><a href="#about">私について</a><a href="#skills">スキル</a><a href="#projects">制作実績</a><a href="#essay">エッセイ</a></nav>
      <a className="header-contact" href="#contact">お問い合わせ</a>
    </header>

    <main id="top">
      <section className="hero section-shell">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .55 }}>
          <p className="kicker">Finance × Data × Software</p>
          <h1>金融とテクノロジーで、<br /><span>人の選択肢を広げる。</span></h1>
          <p className="hero-lead">金融・経済・データ分析のバックグラウンドを持つ、エンジニア志望のビジネスパーソンです。PythonとReactを用いて、「思考力」と「洞察力」を活かしたプロダクトづくりに取り組んでいます。</p>
          <div className="hero-actions"><a className="button primary" href="#projects">制作実績を見る</a><a className="button secondary" href="#about">私について</a></div>
        </motion.div>
        <div className="profile-card" aria-label="プロフィール要約"><div className="profile-monogram">ST</div><div><strong>田中 翔大</strong><span>Shota Tanaka</span></div><dl><div><dt>Focus</dt><dd>Finance × Engineering</dd></div><div><dt>Based in</dt><dd>Japan</dd></div><div><dt>Status</dt><dd><i /> Building & Learning</dd></div></dl></div>
      </section>

      <section className="content-section section-shell" id="about">
        <SectionTitle label="About" title="原体験から、未来のプロダクトへ。" />
        <div className="about-layout"><p className="about-intro">幼少期に両親の自己破産を経験し、<strong>「お金の有無が人生の選択を左右する現実」</strong>を目の当たりにしました。その原体験から、金融の仕組みを学び、人の不安を軽くする仕事を志してきました。</p><div className="about-detail"><p>大学ではM&amp;AやPMI、経済政策を中心に学ぶ一方で、Pythonによるデータ分析やWebフロントエンドのコーディングにも取り組んでいます。</p><p>家庭教師の営業では学生トップの成績を収めるなど、<strong>人の感情を読み取り、信頼関係を築きながら成果を出すこと</strong>を得意としています。</p><p>今後は金融とテクノロジーの両方の視点を持つエンジニアとして、データとソフトウェアを通じて人と社会を支えるプロダクトをつくっていきます。</p></div></div>
      </section>

      <section className="content-section section-shell" id="skills">
        <SectionTitle label="Capabilities" title="学びと実践の領域。" />
        <div className="skills-grid">{skills.map((skill, index) => <article className="skill-card" key={skill.title}><span className="card-icon">{["⌘","⌁","◎"][index]}</span><h3>{skill.title}</h3><ul>{skill.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div>
      </section>

      <section className="content-section section-shell" id="projects">
        <SectionTitle label="Selected Work" title="制作実績。" copy="技術とビジネス、両方の視点から課題を形にしています。" />
        <div className="projects-grid">{projects.map((project, index) => <article className={`project-card ${index === 0 ? "featured" : ""}`} key={project.title}><div className="project-visual"><span>{project.mark}</span></div><div className="project-copy"><p className="project-type">{project.type}</p><h3>{project.title}</h3><p>{project.description}</p></div></article>)}</div>
      </section>

      <section className="content-section section-shell essay-section" id="essay">
        <SectionTitle label="Writing" title="Essay" copy="制作と思考の背景を記録する、小さなノートです。" />
        <div className="filter-row" role="group" aria-label="記事カテゴリ">{[["all","すべて"],["finance","金融"],["engineering","エンジニアリング"]].map(([key,label]) => <button type="button" key={key} aria-pressed={filter === key} onClick={() => setFilter(key)}>{label}</button>)}</div>
        <div className="essay-grid">{visiblePosts.map((post) => <a className="essay-card" href={`#essay/${post.slug}`} key={post.slug}><img src={images[post.category]} alt="" /><div><Meta post={post} /><h3>{post.title}</h3><p>{post.summary}</p><span>読む <b>›</b></span></div></a>)}</div>
      </section>

      <section className="contact section-shell" id="contact"><p className="kicker">Contact</p><h2>一緒に、次の仕組みを。</h2><p>プロジェクトや制作について、お気軽にご連絡ください。</p><a className="button primary" href="mailto:your-mail@example.com">メールを送る</a></section>
    </main>
    <footer className="section-shell"><span>© {new Date().getFullYear()} Shota Tanaka</span><a href="https://github.com/syouing" target="_blank" rel="noreferrer">GitHub ↗</a></footer>
    <AnimatePresence>{activePost && <Article post={activePost} />}</AnimatePresence>
  </div>;
}

function SectionTitle({ label, title, copy }) { return <div className="section-title"><p className="kicker">{label}</p><h2>{title}</h2>{copy && <p>{copy}</p>}</div>; }
function Meta({ post }) { return <div className="essay-meta"><span>{labels[post.category]}</span><time>{formatDate(post.publishedAt)}</time></div>; }
function Article({ post }) { return <motion.div className="article-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><a href="#essay" className="article-back">‹ エッセイに戻る</a><article className="article-page"><header><Meta post={post} /><h1>{post.title}</h1><p>{post.summary}</p><img src={images[post.category]} alt="" /></header><div className="article-content">{post.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}<aside>本人とAIの対話・調査メモをもとに編集しています。金融記事は投資判断を勧めるものではありません。</aside></div></article></motion.div>; }
