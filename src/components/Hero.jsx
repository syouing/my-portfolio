import React from "react";

const Hero = () => {
  return (
    <section id="hero" className="hero">
      <div className="hero-content">
        <p className="hero-tagline">Finance × Data × Software</p>
        <h1>
          田中 翔大<span> / Shota Tanaka</span>
        </h1>
        <p className="hero-text">
          金融・経済・データ分析のバックグラウンドを持つ、
          エンジニア志望のビジネスパーソンです。
          PythonとReactを用いて、「思考力」と「洞察力」を活かしたプロダクトづくりに取り組んでいます。
        </p>
        <div className="hero-buttons">
          <a href="#projects" className="btn primary">
            View Projects
          </a>
          <a
            href="https://github.com/your-github-id"
            target="_blank"
            rel="noreferrer"
            className="btn secondary"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;