import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Download,
  ExternalLink,
  Mail,
} from "lucide-react";
import { locations, socials, techStack } from "#constants";
import useLiveTime from "./Time";
import VisitorCounter from "./VisitorCounter";

const NAV = [
  { id: "mobile-about", label: "About" },
  { id: "mobile-work", label: "Work" },
  { id: "mobile-skills", label: "Skills" },
  { id: "mobile-contact", label: "Contact" },
];

const MobileLayout = () => {
  const [activeId, setActiveId] = useState(NAV[0].id);
  const time = useLiveTime("h:mm A");
  const projects = locations.work.children;
  const aboutFile = locations.about.children.find(
    (item) => item.fileType === "txt",
  );

  useEffect(() => {
    const sections = NAV.map(({ id }) =>
      document.getElementById(id),
    ).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find(
          (entry) => entry.isIntersecting,
        );
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "-20% 0px -65%", threshold: 0 },
    );

    sections.forEach((section) =>
      observer.observe(section),
    );
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  return (
    <div className="mobile-experience">
      <header className="mobile-statusbar">
        <span className="mobile-mark">AS</span>
        <span>{time}</span>
        <VisitorCounter />
      </header>

      <nav
        className="mobile-nav"
        aria-label="Portfolio sections"
      >
        {NAV.map(({ id, label }) => (
          <button
            type="button"
            key={id}
            className={activeId === id ? "is-active" : ""}
            onClick={() => scrollTo(id)}
          >
            {label}
          </button>
        ))}
        <a
          className="mobile-nav-resume"
          href="/files/resume.pdf"
          download
        >
          Resume <Download size={13} />
        </a>
      </nav>

      <div className="mobile-content">
        <section
          id="mobile-about"
          className="mobile-section mobile-hero"
        >
          <p className="mobile-kicker">
            Developer / builder
          </p>
          <h1>Hey, I'm Arpit Saraswat.</h1>
          <p className="mobile-lede">
            I write code, break things, Google why they
            broke, and then proudly break them even more.
          </p>
          <div className="mobile-profile-row">
            <img
              src="/images/arpit.png"
              alt="Arpit Saraswat"
            />
            <div>
              <p className="mobile-meta">Based in India</p>
              <p className="mobile-meta">
                Available for good ideas
              </p>
            </div>
          </div>
          <div className="mobile-about-note">
            <p>{aboutFile?.subtitle}</p>
            <p>{aboutFile?.description?.[0]}</p>
          </div>
        </section>

        <section
          id="mobile-work"
          className="mobile-section"
        >
          <div className="mobile-section-heading">
            <p className="mobile-kicker">Selected work</p>
            <span>02 projects</span>
          </div>
          <div className="mobile-projects">
            {projects.map((project, index) => {
              const descriptionFile = project.children.find(
                (item) => item.fileType === "txt",
              );
              const link = project.children.find(
                (item) => item.fileType === "url",
              );
              const image = project.children.find(
                (item) => item.fileType === "img",
              );
              return (
                <article
                  className="mobile-project"
                  key={project.id}
                >
                  <div className="mobile-project-topline">
                    <span>0{index + 1}</span>
                    <span>Case study</span>
                  </div>
                  <h2>{project.name}</h2>
                  <img
                    src={image?.imageUrl}
                    alt={`${project.name} preview`}
                  />
                  <p>{descriptionFile?.description?.[0]}</p>
                  <div className="mobile-project-actions">
                    <a
                      href={link?.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit project{" "}
                      <ArrowUpRight size={16} />
                    </a>
                    <span>AI / Web app</span>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section
          id="mobile-skills"
          className="mobile-section"
        >
          <div className="mobile-section-heading">
            <p className="mobile-kicker">
              Tools of the trade
            </p>
            <span>Tech stack</span>
          </div>
          <div className="mobile-skills-grid">
            {techStack.map(({ category, items }) => (
              <div
                className="mobile-skill-group"
                key={category}
              >
                <h2>{category}</h2>
                <p>{items.join(" / ")}</p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="mobile-contact"
          className="mobile-section mobile-contact"
        >
          <p className="mobile-kicker">Let's connect</p>
          <h2>
            Got an idea? Let's turn it into something that
            actually works.
          </h2>
          <a
            className="mobile-email"
            href="mailto:arpit10128@gmail.com"
          >
            <Mail size={17} /> arpit10128@gmail.com
          </a>
          <div className="mobile-socials">
            {socials.map(({ id, text, icon, link }) => {
              return (
                <a
                  key={id}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={text}
                >
                  <img src={icon} alt="" />
                  <span>{text}</span>
                  <ExternalLink size={15} />
                </a>
              );
            })}
          </div>
          <a
            className="mobile-resume-link"
            href="/files/resume.pdf"
            download
          >
            Download resume <Download size={16} />
          </a>
        </section>
      </div>

      <footer className="mobile-footer">
        Arpit Saraswat / {new Date().getFullYear()}
      </footer>
    </div>
  );
};

export default MobileLayout;
