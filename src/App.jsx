import { useCallback, useEffect, useMemo, useState } from "react";
import {
  FaArrowRight, FaBars, FaBriefcase, FaBullhorn, FaChevronLeft, FaChevronRight, FaCode, FaDatabase,
  FaDownload, FaEnvelope, FaGithub, FaGraduationCap, FaJs, FaLinkedin,
  FaLocationDot, FaMoon, FaPaperPlane, FaSun, FaXmark,
} from "react-icons/fa6";
import { SOCIAL_LINKS, SMART_KIRANA, PROFILE, SKILLS, FOCUS_AREAS, EXPERIENCE } from "./data/portfolio";
import "./index.css";

const navItems = ["About", "Skills", "Projects", "Experience", "Education", "Contact"];
const quickSkills = [
  { name: "HTML", icon: <FaCode /> },
  { name: "CSS", icon: <FaCode /> },
  { name: "JavaScript", icon: <FaJs /> },
  { name: "MySQL", icon: <FaDatabase /> },
  { name: "SQL", icon: <FaDatabase /> },
  { name: "C", icon: <FaCode /> },
];

function ProfileAvatar({ name }) {
  const [imageFailed, setImageFailed] = useState(false);
  if (imageFailed) return <div className="profile-avatar-fallback" role="img" aria-label={`${name} initials avatar`}><span>AG</span><small>Web Developer</small></div>;
  return <img src="/images/profile.jpg" alt={name} onError={() => setImageFailed(true)} />;
}

function ResumeButton() {
  return (
    <a className="action-button action-button-primary" href="/resume.pdf" target="_blank" rel="noreferrer">
      <FaDownload /> Download Resume
    </a>
  );
}

function SectionTitle({ eyebrow, title, text }) {
  return <div className="section-heading"><p className="section-eyebrow">{eyebrow}</p><h2>{title}</h2><p>{text}</p></div>;
}

function SkillGroup({ title, items, note }) {
  return <div className="skill-group"><div><span>{title}</span>{note && <small>{note}</small>}</div><p>{items.map((item) => <span key={item}>{item}</span>)}</p></div>;
}

function ContactComposer() {
  const [form, setForm] = useState({ name: "", role: "", message: "" });
  const [status, setStatus] = useState("");
  const submit = (event) => {
    event.preventDefault();
    const subject = `Opportunity: ${form.role || "Web Developer role"}`;
    const body = `Hi Arpita,\n\nMy name is ${form.name}.\n\n${form.message}`;
    window.location.href = `mailto:${SOCIAL_LINKS.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus("Your email app should open with this message ready to send.");
  };
  return <form className="contact-form" onSubmit={submit}>
    <div className="form-row"><label>Name<input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" /></label><label>Role / opportunity<input required value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="e.g. Web Developer Intern" /></label></div>
    <label>Message<textarea required rows="5" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell me briefly about the opportunity..." /></label>
    <button className="action-button action-button-primary" type="submit"><FaPaperPlane /> Prepare email to Arpita</button>
    {status && <p className="form-status" role="status">{status}</p>}
  </form>;
}

function App() {
  const [active, setActive] = useState("About");
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dark, setDark] = useState(() => typeof window !== "undefined" && localStorage.getItem("arpita-theme") === "dark");
  const [galleryIndex, setGalleryIndex] = useState(null);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 850);
    return () => window.clearTimeout(timer);
  }, []);
  useEffect(() => { document.documentElement.dataset.theme = dark ? "dark" : "light"; localStorage.setItem("arpita-theme", dark ? "dark" : "light"); }, [dark]);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && setActive(entry.target.id.charAt(0).toUpperCase() + entry.target.id.slice(1))), { rootMargin: "-25% 0px -60% 0px" });
    navItems.forEach((item) => { const el = document.getElementById(item.toLowerCase()); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const items = document.querySelectorAll(".scroll-reveal");
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    items.forEach((item) => revealObserver.observe(item));
    return () => revealObserver.disconnect();
  }, []);

  const gallery = useMemo(() => SMART_KIRANA.galleryGroups.flatMap(([group, images]) => images.map(([title, src]) => ({ group, title, src }))), []);
  const allScreens = useMemo(() => [
    { group: "Featured", title: SMART_KIRANA.featured.title, src: SMART_KIRANA.featured.image },
    ...SMART_KIRANA.modules.map(([title, group, , src]) => ({ group, title, src })),
    ...gallery,
  ], [gallery]);
  const goTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };
  const openGallery = (src) => {
    const index = allScreens.findIndex((item) => item.src === src);
    setGalleryIndex(index === -1 ? null : index);
  };
  const closeGallery = useCallback(() => setGalleryIndex(null), []);
  const showPrev = useCallback(() => setGalleryIndex((i) => (i === null ? i : (i - 1 + allScreens.length) % allScreens.length)), [allScreens.length]);
  const showNext = useCallback(() => setGalleryIndex((i) => (i === null ? i : (i + 1) % allScreens.length)), [allScreens.length]);

  useEffect(() => {
    if (galleryIndex === null) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") closeGallery();
      if (event.key === "ArrowLeft") showPrev();
      if (event.key === "ArrowRight") showNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [galleryIndex, closeGallery, showPrev, showNext]);

  const activeScreen = galleryIndex === null ? null : allScreens[galleryIndex];

  return <>
    {loading && <div className="page-loader" aria-label="Loading portfolio"><div className="loader-mark">AG</div><div className="loader-line"><span /></div><p>Arpita Kumari Gupta</p></div>}
    <div className={`site-shell ${loading ? "is-loading" : ""}`}>
    <div className="ambient ambient-one" /><div className="ambient ambient-two" />
    <header className="nav-wrap"><nav className="navbar portfolio-container">
      <button className="brand" onClick={() => goTo("about")} aria-label="Go to top"><span className="brand-mark">AG</span><span>Arpita<span className="brand-dot">.</span></span></button>
      <div className={`nav-links ${menuOpen ? "open" : ""}`}>{navItems.map((item) => <button className={active === item ? "active" : ""} key={item} onClick={() => goTo(item.toLowerCase())}>{item}</button>)}<a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" className="nav-github"><FaGithub /> GitHub</a></div>
      <div className="nav-actions"><button className="icon-button" onClick={() => setDark((v) => !v)} aria-label="Toggle theme">{dark ? <FaSun /> : <FaMoon />}</button><button className="icon-button mobile-menu" onClick={() => setMenuOpen((v) => !v)} aria-label="Toggle menu">{menuOpen ? <FaXmark /> : <FaBars />}</button></div>
    </nav></header>

    <main>
      <section id="about" className="hero portfolio-container section-pad">
        <div className="hero-copy reveal"><div className="eyebrow"><span className="status-dot" /> {PROFILE.availability}</div><p className="hero-kicker">WEB DEVELOPMENT · SOFTWARE DEVELOPMENT · DIGITAL MARKETING</p>
          <h1>I build useful digital experiences with <span>code & curiosity.</span></h1>
          <p className="hero-text">I’m <strong>{PROFILE.name}</strong>, a BCA graduate based in Patna. My primary focus is web development and software development, while I also explore digital marketing, SEO and online advertising.</p>
          <div className="hero-cta"><ResumeButton /><button className="action-button action-button-secondary" onClick={() => goTo("projects")}>Explore Smart Kirana <FaArrowRight /></button></div>
          <div className="hero-meta"><span><FaLocationDot /> {PROFILE.location}</span><span><FaBriefcase /> {EXPERIENCE.title} · {EXPERIENCE.company}</span></div>
        </div>
        <div className="hero-visual reveal"><div className="profile-card"><div className="profile-orbit orbit-a" /><div className="profile-orbit orbit-b" /><ProfileAvatar name={PROFILE.name} /><div className="profile-badge"><span>01</span><strong>Build · Learn · Grow</strong></div></div><div className="floating-card stack-card"><span>Primary focus</span><strong>Web Development + SDE</strong></div><div className="floating-card code-card"><FaBullhorn /><span>Digital<br />marketing<br />too</span></div></div>
      </section>

      <section className="proof-strip"><div className="portfolio-container proof-grid"><div><strong>01</strong><span>Featured project</span></div><div><strong>06</strong><span>Core technologies</span></div><div><strong>36+</strong><span>Project screens</span></div><div><strong>2026</strong><span>BCA graduate</span></div></div></section>

      <section id="skills" className="portfolio-container section-pad scroll-reveal"><SectionTitle eyebrow="SKILLS" title="What I actually know, clearly labelled." text="Two groups only: skills I already use, and Java, which I'm actively learning. No proficiency percentages, nothing inflated." />
        <div className="skill-layout"><div className="skill-cloud ui-card">{quickSkills.map(({ name, icon }) => <div className="skill-pill" key={name}>{icon}<span>{name}</span></div>)}</div><div className="skill-details"><SkillGroup title="Current skills" items={SKILLS.current} /><SkillGroup title="Learning" items={SKILLS.learning} note="In progress" /></div></div>
      </section>

      <section id="projects" className="project-section section-pad scroll-reveal"><div className="portfolio-container"><SectionTitle eyebrow="SELECTED WORK" title="Smart Kirana — a BCA project built around a real retail workflow." text={SMART_KIRANA.focus} />
        <article className="featured-project ui-card scroll-reveal"><div className="project-image-wrap"><img src={SMART_KIRANA.featured.image} alt="Smart Kirana main dashboard" /></div><div className="project-content"><div className="project-top"><span className="project-label">FEATURED PROJECT</span><span className="project-year">BCA PROJECT</span></div><h3>{SMART_KIRANA.title}</h3><p>{SMART_KIRANA.summary}</p><div className="tag-row">{SMART_KIRANA.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><p className="tech-stack-label">Built with (project tech stack): <strong>{SMART_KIRANA.techStack.join(", ")}</strong></p><div className="feature-list"><div><strong>Billing & sales</strong><span>Sales, billing history and daily transaction screens</span></div><div><strong>Business dashboard</strong><span>Dashboard analytics, activity and reporting views</span></div><div><strong>Store management</strong><span>Products, stock, customers, suppliers and purchases</span></div></div><div className="project-actions"><button className="action-button action-button-primary" onClick={() => openGallery(SMART_KIRANA.featured.image)}>View project screens <FaArrowRight /></button><a className="text-link" href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer">View GitHub <FaGithub /></a></div></div></article>
        <div className="module-grid scroll-reveal">{SMART_KIRANA.modules.map(([title, tag, desc, image], index) => <button className="module-card ui-card" key={title} onClick={() => openGallery(image)}><span className="module-number">0{index + 1}</span><img src={image} alt={title} loading="lazy" /><div><span>{tag}</span><h4>{title}</h4><p>{desc}</p></div><FaArrowRight className="module-arrow" /></button>)}</div>
        <div className="gallery-head"><div><p className="section-eyebrow">SCREEN GALLERY</p><h3>Explore the interface</h3></div><span>{gallery.length} screens</span></div><div className="gallery-grid scroll-reveal">{gallery.slice(0, 12).map((item) => <button className="gallery-item" key={item.src} onClick={() => openGallery(item.src)}><img src={item.src} alt={item.title} loading="lazy" /><div><span>{item.group}</span><strong>{item.title}</strong></div></button>)}</div>
      </div></section>

      <section id="experience" className="portfolio-container section-pad scroll-reveal"><SectionTitle eyebrow="EXPERIENCE" title="Professional communication meets technical learning." text="My current role has strengthened communication, customer handling and workplace discipline while I continue building my technical profile." />
        <div className="experience-card ui-card"><div className="experience-icon"><FaBriefcase /></div><div className="experience-main"><div className="experience-top"><span className="timeline-date">CURRENT ROLE</span><span className="experience-status">{EXPERIENCE.status}</span></div><h3>{EXPERIENCE.title}</h3><p className="experience-company">{EXPERIENCE.company}</p><ul>{EXPERIENCE.points.map((point) => <li key={point}>{point}</li>)}</ul></div></div>
      </section>

      <section id="education" className="portfolio-container section-pad scroll-reveal"><SectionTitle eyebrow="EDUCATION" title="BCA foundation with a project-first approach." text="Academic background and the areas I’m actively strengthening for software and web roles." /><div className="timeline-card ui-card"><div className="timeline-icon"><FaGraduationCap /></div><div><span className="timeline-date">2023 — 2026</span><h3>Bachelor of Computer Applications</h3><p>Maulana Mazharul Haque Arabic and Persian University (MMHAPU), Patna</p><span className="timeline-note">BCA Graduate</span></div></div><div className="focus-grid">{FOCUS_AREAS.map((item, index) => <div className="focus-item" key={item}><span>0{index + 1}</span><strong>{item}</strong></div>)}</div></section>

      <section id="contact" className="contact-section section-pad scroll-reveal"><div className="portfolio-container contact-layout"><div className="contact-intro"><p className="section-eyebrow">CONTACT</p><h2>Let’s talk about an opportunity.</h2><p>For internships, junior web development/SDE roles or digital marketing opportunities, send a short message. The form prepares an email and opens your email app so it goes directly to my inbox.</p><div className="contact-actions"><a href={`mailto:${SOCIAL_LINKS.email}`} className="contact-social"><FaEnvelope /><span>{SOCIAL_LINKS.email}</span><FaArrowRight /></a><a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" className="contact-social"><FaLinkedin /><span>LinkedIn</span><FaArrowRight /></a><a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" className="contact-social"><FaGithub /><span>GitHub</span><FaArrowRight /></a><ResumeButton /></div></div><ContactComposer /></div></section>
    </main>

    <footer className="footer"><div className="portfolio-container footer-inner"><div><strong>Arpita<span className="brand-dot">.</span></strong><span>Web Developer · SDE · Digital Marketing</span></div><span>Built with React + Vite · 2026</span><div className="footer-social"><a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub /></a><a href={SOCIAL_LINKS.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedin /></a></div></div></footer>
    {activeScreen && <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${activeScreen.title} screenshot preview`} onClick={closeGallery}>
      <button className="lightbox-close" onClick={closeGallery} aria-label="Close preview"><FaXmark /></button>
      <button className="lightbox-nav lightbox-prev" onClick={(event) => { event.stopPropagation(); showPrev(); }} aria-label="Previous screenshot"><FaChevronLeft /></button>
      <figure className="lightbox-figure" onClick={(event) => event.stopPropagation()}>
        <img src={activeScreen.src} alt={`${activeScreen.title} — Smart Kirana Management System`} />
        <figcaption className="lightbox-caption"><strong>{activeScreen.title}</strong> · {activeScreen.group} · {galleryIndex + 1} of {allScreens.length}</figcaption>
      </figure>
      <button className="lightbox-nav lightbox-next" onClick={(event) => { event.stopPropagation(); showNext(); }} aria-label="Next screenshot"><FaChevronRight /></button>
    </div>}
    </div>
  </>;
}

export default App;
