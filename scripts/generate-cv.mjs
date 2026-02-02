import puppeteer from "puppeteer";
import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = join(__dirname, "../public/Sevak(CV).pdf");

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --bg: #0a0d14;
    --card: #0f1319;
    --text: #e8edf5;
    --muted: #7a8599;
    --primary: #3dd4b0;
    --primary-dim: rgba(61,212,176,0.12);
    --accent: #9b7de8;
    --accent-dim: rgba(155,125,232,0.12);
    --border: #1c2130;
    --secondary: #161b26;
  }

  body {
    font-family: 'Inter', system-ui, sans-serif;
    background: var(--bg);
    color: var(--text);
    font-size: 10px;
    line-height: 1.5;
    padding: 0;
  }

  .page {
    width: 210mm;
    height: 297mm;
    padding: 20px 28px;
    background: var(--bg);
    overflow: hidden;
  }

  /* Header */
  .header {
    text-align: center;
    margin-bottom: 14px;
    padding-bottom: 10px;
    border-bottom: 2px solid var(--border);
  }

  .header h1 {
    font-size: 26px;
    font-weight: 700;
    letter-spacing: 3px;
    margin-bottom: 1px;
  }

  .header h1 .first { color: var(--text); font-weight: 300; }
  .header h1 .last {
    background: linear-gradient(135deg, var(--primary), var(--accent));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    font-weight: 700;
  }

  .header .role {
    font-family: 'JetBrains Mono', monospace;
    color: var(--primary);
    font-size: 10px;
    font-weight: 500;
    margin-bottom: 7px;
  }

  .contact-row {
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
  }

  .contact-item {
    font-size: 9px;
    color: var(--muted);
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .contact-item .dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: var(--primary);
    display: inline-block;
  }

  .contact-item a {
    color: var(--muted);
    text-decoration: none;
  }

  /* Layout */
  .content {
    display: flex;
    gap: 20px;
  }

  .main { flex: 1; min-width: 0; }
  .sidebar { width: 160px; flex-shrink: 0; }

  /* Section */
  .section { margin-bottom: 10px; }

  .section-title {
    font-family: 'JetBrains Mono', monospace;
    font-size: 10px;
    font-weight: 600;
    color: var(--primary);
    text-transform: uppercase;
    letter-spacing: 1.5px;
    padding-bottom: 4px;
    border-bottom: 1px solid var(--border);
    margin-bottom: 7px;
  }

  /* About */
  .about-text {
    font-size: 8.5px;
    color: var(--muted);
    line-height: 1.55;
  }

  .about-text strong {
    color: var(--text);
    font-weight: 500;
  }

  /* Experience */
  .project { margin-bottom: 8px; }

  .project-header {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    margin-bottom: 1px;
  }

  .project-title {
    font-size: 10px;
    font-weight: 600;
    color: var(--text);
  }

  .project-type {
    font-family: 'JetBrains Mono', monospace;
    font-size: 7px;
    color: var(--accent);
    background: var(--accent-dim);
    padding: 1px 5px;
    border-radius: 3px;
  }

  .project-type.freelance {
    color: var(--primary);
    background: var(--primary-dim);
  }

  .project-subtitle {
    font-size: 8px;
    color: var(--muted);
    margin-bottom: 2px;
    font-style: italic;
  }

  .project-desc {
    font-size: 8px;
    color: var(--muted);
    line-height: 1.45;
    margin-bottom: 3px;
  }

  .project-highlights {
    list-style: none;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px 10px;
  }

  .project-highlights li {
    font-size: 7.5px;
    color: var(--muted);
    padding-left: 8px;
    position: relative;
  }

  .project-highlights li::before {
    content: '▸';
    position: absolute;
    left: 0;
    color: var(--primary);
    font-size: 8px;
  }

  .tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 2px;
    margin-top: 3px;
  }

  .tech-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 6.5px;
    color: var(--text);
    background: var(--secondary);
    padding: 1px 5px;
    border-radius: 3px;
    border: 1px solid var(--border);
  }

  /* Sidebar sections */
  .sidebar .section { margin-bottom: 10px; }

  .skill-category {
    margin-bottom: 7px;
  }

  .skill-category-title {
    font-family: 'JetBrains Mono', monospace;
    font-size: 7px;
    color: var(--accent);
    margin-bottom: 2px;
  }

  .skill-item {
    display: flex;
    align-items: center;
    gap: 5px;
    margin-bottom: 2px;
  }

  .skill-name {
    font-size: 8px;
    color: var(--text);
    width: 70px;
  }

  .skill-bar {
    flex: 1;
    height: 3px;
    background: var(--secondary);
    border-radius: 2px;
    overflow: hidden;
  }

  .skill-bar-fill {
    height: 100%;
    border-radius: 2px;
    background: linear-gradient(90deg, var(--primary), var(--accent));
  }

  /* Soft skills */
  .soft-skill-list {
    list-style: none;
  }

  .soft-skill-list li {
    font-size: 8px;
    color: var(--muted);
    padding: 1px 0;
    padding-left: 10px;
    position: relative;
  }

  .soft-skill-list li::before {
    content: '◆';
    position: absolute;
    left: 0;
    color: var(--primary);
    font-size: 6px;
    top: 4px;
  }

  /* Languages */
  .lang-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1px 0;
  }

  .lang-name {
    font-size: 8px;
    color: var(--text);
  }

  .lang-level {
    font-size: 7px;
    color: var(--muted);
  }

  /* Education */
  .edu-item {
    margin-bottom: 4px;
    padding-left: 8px;
    border-left: 2px solid var(--border);
  }

  .edu-title {
    font-size: 8px;
    font-weight: 600;
    color: var(--text);
  }

  .edu-inst {
    font-size: 7.5px;
    color: var(--muted);
  }

  .edu-period {
    font-family: 'JetBrains Mono', monospace;
    font-size: 7px;
    color: var(--primary);
  }
</style>
</head>
<body>
<div class="page">

  <!-- Header -->
  <div class="header">
    <h1><span class="first">SEVAK </span><span class="last">BADALYAN</span></h1>
    <div class="role">Back-End Developer</div>
    <div class="contact-row">
      <span class="contact-item"><span class="dot"></span> Armenia, Yerevan</span>
      <span class="contact-item"><span class="dot"></span> <a href="mailto:sevak.badalyan.01@gmail.com">sevak.badalyan.01@gmail.com</a></span>
      <span class="contact-item"><span class="dot"></span> +(374)-55-999-325</span>
      <span class="contact-item"><span class="dot"></span> <a href="https://linkedin.com/in/sevak-badalyan">linkedin.com/in/sevak-badalyan</a></span>
    </div>
  </div>

  <div class="content">
    <!-- Main Column -->
    <div class="main">

      <!-- About -->
      <div class="section">
        <div class="section-title">About Me</div>
        <div class="about-text">
          Passionate and results-driven <strong>Node.js developer</strong> with hands-on experience designing and building scalable backend systems using <strong>JavaScript</strong>, <strong>TypeScript</strong>, and modern frameworks like <strong>Express.js</strong> and <strong>NestJS</strong>. Proficient in developing RESTful APIs, integrating real-time features with <strong>Socket.io</strong>, and working with both SQL (<strong>PostgreSQL</strong>) and NoSQL (<strong>MongoDB</strong>) databases. Experienced in microservices architecture, payment integrations, and cloud deployments. Always eager to learn and grow as a backend engineer.
        </div>
      </div>

      <!-- Experience -->
      <div class="section">
        <div class="section-title">Projects & Experience</div>

        <div class="project">
          <div class="project-header">
            <span class="project-title">BeautyOS</span>
            <span class="project-type freelance">Freelance</span>
          </div>
          <div class="project-subtitle">Salon & Beauty Business Management Platform</div>
          <div class="project-desc">A cloud-based SaaS platform for managing salon and beauty business operations. Built as a production-grade microservices backend (9 services) with shared packages serving both web and mobile clients.</div>
          <ul class="project-highlights">
            <li>Microservices architecture with Kafka</li>
            <li>Stripe payment processing & analytics</li>
            <li>Multi-channel notifications (SendGrid, Twilio, OneSignal)</li>
            <li>Booking system with waitlist management</li>
            <li>JWT auth with Okta & Firebase integration</li>
            <li>CI/CD with GitHub Actions & Docker</li>
          </ul>
          <div class="tech-tags">
            <span class="tech-tag">Node.js</span>
            <span class="tech-tag">TypeScript</span>
            <span class="tech-tag">MongoDB</span>
            <span class="tech-tag">Redis</span>
            <span class="tech-tag">Kafka</span>
            <span class="tech-tag">Docker</span>
            <span class="tech-tag">AWS</span>
          </div>
        </div>

        <div class="project">
          <div class="project-header">
            <span class="project-title">Souqira</span>
            <span class="project-type">Professional</span>
          </div>
          <div class="project-subtitle">Business Marketplace Platform — souqira.com</div>
          <div class="project-desc">Full-stack startup platform for buying, selling, and investing in businesses. Connects entrepreneurs, business owners, and investors on a secure, multilingual marketplace.</div>
          <ul class="project-highlights">
            <li>JWT & OAuth (Google, Facebook) authentication</li>
            <li>AWS S3 image uploads & file storage</li>
            <li>Real-time messaging with Socket.io</li>
            <li>Admin dashboard with moderation</li>
            <li>Stripe featured listings payments</li>
            <li>i18n (English, Arabic, Kurdish) with RTL</li>
          </ul>
          <div class="tech-tags">
            <span class="tech-tag">React 19</span>
            <span class="tech-tag">Node.js</span>
            <span class="tech-tag">TypeScript</span>
            <span class="tech-tag">MongoDB</span>
            <span class="tech-tag">AWS S3</span>
            <span class="tech-tag">Stripe</span>
            <span class="tech-tag">Socket.io</span>
          </div>
        </div>

        <div class="project">
          <div class="project-header">
            <span class="project-title">PowerTrade</span>
            <span class="project-type">Professional</span>
          </div>
          <div class="project-subtitle">Real-Time Communication & Management Platform — powertrade.am</div>
          <div class="project-desc">Full-stack real-time communication platform featuring high-performance architecture for instant messaging, email services, and location-based utilities with modern data visualization.</div>
          <ul class="project-highlights">
            <li>Real-time chat with Socket.io</li>
            <li>Secure JWT & Bcrypt authentication</li>
            <li>Interactive charts (Recharts, ApexCharts)</li>
            <li>SendGrid, Twilio, Vonage integrations</li>
            <li>Map integrations with Leaflet</li>
            <li>Zustand state management</li>
          </ul>
          <div class="tech-tags">
            <span class="tech-tag">React 19</span>
            <span class="tech-tag">Node.js</span>
            <span class="tech-tag">TypeScript</span>
            <span class="tech-tag">MongoDB</span>
            <span class="tech-tag">Supabase</span>
            <span class="tech-tag">Socket.io</span>
            <span class="tech-tag">Leaflet</span>
          </div>
        </div>

        <div class="project">
          <div class="project-header">
            <span class="project-title">BallerTube</span>
            <span class="project-type">Professional</span>
          </div>
          <div class="project-subtitle">Real-Time Sports Platform — ballertube.com</div>
          <div class="project-desc">Dynamic real-time sports platform integrating live data from external APIs with efficient caching strategies for optimal performance.</div>
          <ul class="project-highlights">
            <li>Real-time API integration</li>
            <li>Efficient data caching</li>
            <li>Dynamic UI updates</li>
            <li>Live sports data streaming</li>
          </ul>
          <div class="tech-tags">
            <span class="tech-tag">Node.js</span>
            <span class="tech-tag">REST API</span>
            <span class="tech-tag">Caching</span>
          </div>
        </div>

        <div class="project">
          <div class="project-header">
            <span class="project-title">Social Network</span>
            <span class="project-type">Professional</span>
          </div>
          <div class="project-subtitle">Full-Stack Social Application</div>
          <div class="project-desc">A comprehensive social network featuring CRUD operations, friend requests, and real-time group chats powered by Socket.io.</div>
          <ul class="project-highlights">
            <li>User authentication system</li>
            <li>Friend request functionality</li>
            <li>Real-time group chats</li>
            <li>PostgreSQL database design</li>
          </ul>
          <div class="tech-tags">
            <span class="tech-tag">React.js</span>
            <span class="tech-tag">Node.js</span>
            <span class="tech-tag">PostgreSQL</span>
            <span class="tech-tag">Socket.io</span>
          </div>
        </div>
      </div>

      <!-- Education -->
      <div class="section">
        <div class="section-title">Education</div>
        <div class="edu-item">
          <div class="edu-title">Master's in Business Informatics</div>
          <div class="edu-inst">Armenian State University of Economics (ASUE)</div>
          <div class="edu-period">2025 – Present</div>
        </div>
        <div class="edu-item">
          <div class="edu-title">Bachelor's Degree</div>
          <div class="edu-inst">National Polytechnic University of Armenia</div>
          <div class="edu-period">2021 – 2025</div>
        </div>
        <div class="edu-item">
          <div class="edu-title">Back-End Development</div>
          <div class="edu-inst">Aren Mehrabyan Foundation</div>
          <div class="edu-period">2023</div>
        </div>
        <div class="edu-item">
          <div class="edu-title">Front-End Development</div>
          <div class="edu-inst">Picsart Academy</div>
          <div class="edu-period">2022</div>
        </div>
        <div class="edu-item">
          <div class="edu-title">English Language</div>
          <div class="edu-inst">Lezounery Toun</div>
          <div class="edu-period">2024</div>
        </div>
      </div>
    </div>

    <!-- Sidebar -->
    <div class="sidebar">

      <!-- Skills -->
      <div class="section">
        <div class="section-title">Skills</div>

        <div class="skill-category">
          <div class="skill-category-title">// Languages & Runtime</div>
          <div class="skill-item"><span class="skill-name">JavaScript</span><div class="skill-bar"><div class="skill-bar-fill" style="width:95%"></div></div></div>
          <div class="skill-item"><span class="skill-name">TypeScript</span><div class="skill-bar"><div class="skill-bar-fill" style="width:90%"></div></div></div>
          <div class="skill-item"><span class="skill-name">Node.js</span><div class="skill-bar"><div class="skill-bar-fill" style="width:95%"></div></div></div>
        </div>

        <div class="skill-category">
          <div class="skill-category-title">// Frameworks</div>
          <div class="skill-item"><span class="skill-name">Express.js</span><div class="skill-bar"><div class="skill-bar-fill" style="width:95%"></div></div></div>
          <div class="skill-item"><span class="skill-name">NestJS</span><div class="skill-bar"><div class="skill-bar-fill" style="width:75%"></div></div></div>
          <div class="skill-item"><span class="skill-name">React.js</span><div class="skill-bar"><div class="skill-bar-fill" style="width:70%"></div></div></div>
        </div>

        <div class="skill-category">
          <div class="skill-category-title">// Databases</div>
          <div class="skill-item"><span class="skill-name">MongoDB</span><div class="skill-bar"><div class="skill-bar-fill" style="width:90%"></div></div></div>
          <div class="skill-item"><span class="skill-name">PostgreSQL</span><div class="skill-bar"><div class="skill-bar-fill" style="width:85%"></div></div></div>
          <div class="skill-item"><span class="skill-name">Redis</span><div class="skill-bar"><div class="skill-bar-fill" style="width:70%"></div></div></div>
        </div>

        <div class="skill-category">
          <div class="skill-category-title">// Tools & Other</div>
          <div class="skill-item"><span class="skill-name">Git/GitHub</span><div class="skill-bar"><div class="skill-bar-fill" style="width:90%"></div></div></div>
          <div class="skill-item"><span class="skill-name">Docker</span><div class="skill-bar"><div class="skill-bar-fill" style="width:65%"></div></div></div>
          <div class="skill-item"><span class="skill-name">Socket.io</span><div class="skill-bar"><div class="skill-bar-fill" style="width:85%"></div></div></div>
          <div class="skill-item"><span class="skill-name">AWS</span><div class="skill-bar"><div class="skill-bar-fill" style="width:70%"></div></div></div>
          <div class="skill-item"><span class="skill-name">Kafka</span><div class="skill-bar"><div class="skill-bar-fill" style="width:65%"></div></div></div>
          <div class="skill-item"><span class="skill-name">Stripe</span><div class="skill-bar"><div class="skill-bar-fill" style="width:80%"></div></div></div>
        </div>
      </div>

      <!-- Soft Skills -->
      <div class="section">
        <div class="section-title">Soft Skills</div>
        <ul class="soft-skill-list">
          <li>Communication</li>
          <li>Teamwork</li>
          <li>Time Management</li>
          <li>Creative Thinking</li>
          <li>Problem Solving</li>
          <li>Critical Analysis</li>
        </ul>
      </div>

      <!-- Languages -->
      <div class="section">
        <div class="section-title">Languages</div>
        <div class="lang-item"><span class="lang-name">Armenian</span><span class="lang-level">Native</span></div>
        <div class="lang-item"><span class="lang-name">Russian</span><span class="lang-level">Upper-Intermediate</span></div>
        <div class="lang-item"><span class="lang-name">English</span><span class="lang-level">Pre-Intermediate</span></div>
      </div>

    </div>
  </div>
</div>
</body>
</html>`;

async function main() {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });
  const pdf = await page.pdf({
    format: "A4",
    printBackground: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });
  writeFileSync(outputPath, pdf);
  await browser.close();
  console.log("PDF generated:", outputPath);
}

main().catch(console.error);
