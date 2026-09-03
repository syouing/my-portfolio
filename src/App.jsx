import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "./style.css";

const postModules = import.meta.glob("./content/posts/*.json", { eager: true, import: "default" });
const posts = Object.values(postModules).sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt));
const labels = { finance: "Finance", engineering: "Engineering" };
const images = {
  finance: `${import.meta.env.BASE_URL}images/finance-cover.png`,
  engineering: `${import.meta.env.BASE_URL}images/engineering-cover.png`,
};
const formatDate = (date) => new Intl.DateTimeFormat("ja-JP", { year: "numeric", month: "short", day: "numeric" }).format(new Date(date));

function useHashPost() {
  const read = () => location.hash.startsWith("#essay/") ? location.hash.slice(7) : "";
  const [slug, setSlug] = useState(read);
  useEffect(() => { addEventListener("hashchange", readHash); function readHash(){ setSlug(read()); } return () => removeEventListener("hashchange", readHash); }, []);
  return posts.find((post) => post.slug === slug);
}

export default function App() {
  const [filter, setFilter] = useState("all");
  const activePost = useHashPost();
  const visible = useMemo(() => posts.filter((post) => filter === "all" || post.category === filter), [filter]);
  useEffect(() => { document.body.style.overflow = activePost ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [activePost]);

  return <div className="app">
    <header className="navbar">
      <a className="logo" href="#top" aria-label="Shota Tanaka ホーム">ST<span>.</span></a>
      <nav className="nav-right" aria-label="メインナビゲーション"><a href="#about">About</a><a href="#projects">Projects</a><a href="#essay">Essay</a><a href="#contact">Contact</a></nav>
    </header>
    <main id="top">
      <section className="hero">
        <motion.div className="hero-copy" initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }}>
          <p className="eyebrow">BUSINESS × ENGINEERING</p>
          <h1>数字とコードの間に、<br /><em>次の仕組み</em>をつくる。</h1>
          <p className="hero-text">Shota Tanaka — 金融を読み解き、テクノロジーで形にする学生・ビルダー。学びと制作の過程を、実装と文章で公開しています。</p>
          <div className="hero-buttons"><a className="btn primary" href="#essay">最新のEssayを読む</a><a className="btn secondary" href="#projects">制作を見る</a></div>
        </motion.div>
        <div className="hero-orbit" aria-hidden="true"><span className="orbit orbit-one" /><span className="orbit orbit-two" /><span className="hero-dot" /><p>FINANCE<br />×<br />CODE</p></div>
      </section>

      <section className="section about-grid" id="about">
        <div><p className="section-index">01 / ABOUT</p><h2>問いを立て、<br />小さく動かす。</h2></div>
        <div className="about-copy"><p>経営・金融の視点と、Web開発・自動化の技術を横断して学んでいます。複雑なテーマを、使える言葉と動くプロダクトへ変えることが関心の中心です。</p><div className="facts"><span>React / Vite</span><span>Automation</span><span>Finance Research</span><span>Data & AI</span></div></div>
      </section>

      <section className="section" id="projects">
        <Heading index="02" title="Selected work" copy="課題を見つけ、設計し、公開するまで。" />
        <div className="project-grid">
          <article className="project-card project-featured"><p className="card-number">01</p><div><span className="project-type">WEB / AUTOMATION</span><h3>Portfolio & Essay</h3><p>制作実績と毎日の学びを一つの場所に。記事の生成・検証・公開までを自動化。</p></div></article>
          <article className="project-card"><p className="card-number">02</p><div><span className="project-type">DATA / RESEARCH</span><h3>Analysis Tools</h3><p>意思決定を支えるデータ整理と可視化。大学での研究と個人制作を接続。</p></div></article>
        </div>
      </section>

      <section className="section essay-section" id="essay">
        <Heading index="03" title={<>Notes on value<br />and systems.</>} copy={<>金融とエンジニアリングを、毎朝・毎夜。<br />チャットで深めた問いも記事として残します。</>} />
        <div className="filter-row" role="group" aria-label="記事カテゴリ">{[["all","All"],["finance","Finance"],["engineering","Engineering"]].map(([key,label]) => <button key={key} className={filter === key ? "active" : ""} onClick={() => setFilter(key)}>{label}</button>)}</div>
        <div className="essay-grid">{visible.map((post) => <motion.a layout href={`#essay/${post.slug}`} className="essay-card" key={post.slug} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .2 }}>
          <div className="essay-image"><img src={images[post.category]} alt="" /></div><div className="essay-body"><Meta post={post} /><h3>{post.title}</h3><p>{post.summary}</p><span className="read-more">READ ESSAY <b>↗</b></span></div>
        </motion.a>)}</div>
      </section>

      <section className="section contact" id="contact"><p className="section-index">04 / CONTACT</p><h2>Let’s make the next thing.</h2><a href="mailto:hello@syouing.tech">hello@syouing.tech <span>↗</span></a></section>
    </main>
    <footer><span>© {new Date().getFullYear()} SHOTA TANAKA</span><span>TOKYO, JAPAN</span></footer>
    <AnimatePresence>{activePost && <Article post={activePost} />}</AnimatePresence>
  </div>;
}

function Heading({ index, title, copy }) { return <div className="section-heading"><div><p className="section-index">{index} / {index === "02" ? "PROJECTS" : "ESSAY"}</p><h2>{title}</h2></div><p>{copy}</p></div>; }
function Meta({ post }) { return <div className="essay-meta"><span>{labels[post.category]}</span><time>{formatDate(post.publishedAt)}</time></div>; }
function Article({ post }) { return <motion.div className="article-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><a href="#essay" className="article-back">← BACK TO ESSAYS</a><article className="article-page"><header><Meta post={post} /><h1>{post.title}</h1><p className="article-summary">{post.summary}</p><img src={images[post.category]} alt="" /></header><div className="article-content">{post.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}<aside>このEssayは、本人とAIの対話・調査メモをもとに編集しています。投資判断を勧めるものではありません。</aside></div></article></motion.div>; }
