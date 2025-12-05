import React from "react";

const Skills = () => {
  return (
    <section id="skills" className="section">
      <h2 className="section-title">Skills</h2>
      <div className="skills-grid">
        <div className="skill-card">
          <h3>Programming</h3>
          <ul>
            <li>JavaScript (ES6+), React</li>
            <li>Python（分析・スクリプト）</li>
            <li>HTML / CSS</li>
          </ul>
        </div>
        <div className="skill-card">
          <h3>Data &amp; Finance</h3>
          <ul>
            <li>重回帰分析・可視化（Python, Excel）</li>
            <li>M&amp;A・PMIの基礎知識</li>
            <li>経済政策・社会保障制度の理解</li>
          </ul>
        </div>
        <div className="skill-card">
          <h3>Business &amp; Communication</h3>
          <ul>
            <li>家庭教師営業で学生トップの契約率</li>
            <li>顧客心理のヒアリング・提案</li>
            <li>新規事業・サービス企画</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Skills;