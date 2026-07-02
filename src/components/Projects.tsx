import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, ArrowRight, Download, Smartphone, Github } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [downloadLinks, setDownloadLinks] = useState<{ ios?: string; android?: string }>({});

  const projects = [
    {
      title: "Interview Assistant AI",
      subtitle: "Analytics Integration (PostHog)",
      role: "Frontend changes & PostHog analytics integration",
      description:
        "Integrated PostHog analytics into a real-time AI interview coaching platform — handling speech-to-text via WebSockets and AI-generated guidance via Groq/OpenAI. Built the entire product analytics pipeline from scratch within the web and Node.js environment.",
      highlights: [
        "End-to-end PostHog setup & deployment",
        "Custom events: AI model latency & subscription limit hits",
        "User onboarding flow & activation form tracking",
        "Interview completion rate instrumentation",
        "Data reliability validation across all app states",
      ],
      tech: ["JavaScript", "Node.js", "PostHog", "WebSockets", "Deepgram", "Groq"],
      type: "Professional",
      company: null,
      links: { live: "https://interview-assistant-ai.com/" },
    },
    {
      title: "UnderSelf",
      subtitle: "AI-Powered Personal Growth Platform",
      role: "Full-stack — backend, database, admin dashboard & mobile",
      description:
        "A Jungian-psychology personal-growth product (underself.io) delivering AI dream analysis, life-event journaling, and emotional insights across a mobile app, marketing web, and internal admin console. Led the backend microservice architecture, authentication/SSO service, and the admin console used to configure the AI pipeline — across a TypeScript NX monorepo spanning Fastify services, a React admin web app, and a React Native (Expo) mobile client.",
      highlights: [
        "Fastify 5 microservice backend (9 services, NX/pnpm monorepo)",
        "API-gateway reverse-proxy as the single client entry point",
        "BetterAuth auth service with Google/Apple SSO & JWT",
        "AI engine: LLM completions, agent resolver & SSE streaming",
        "React 19 admin console for the AI configuration layer",
        "i18n (EN/FR/DE/RU) across mobile & admin web",
      ],
      tech: ["TypeScript", "Fastify", "PostgreSQL", "Drizzle", "Redis", "React 19", "React Native", "Docker"],
      type: "Freelance",
      company: null,
      links: {
        ios: "https://apps.apple.com/am/app/underself/id6775254246",
        android: "https://play.google.com/store/apps/details?id=io.underself.app",
      },
    },
    {
      title: "BeautyOS",
      subtitle: "Salon & Beauty Business Management Platform",
      role: "Backend & admin dashboard development",
      description:
        "A cloud-based SaaS platform for managing salon and beauty business operations. Built as a production-grade microservices backend (9 services) with shared packages serving both web and mobile clients.",
      highlights: [
        "Microservices architecture with Kafka",
        "Stripe payment processing & analytics",
        "Multi-channel notifications (SendGrid, Twilio, OneSignal)",
        "Booking system with waitlist management",
        "JWT auth with Okta & Firebase integration",
        "CI/CD with GitHub Actions & Docker",
      ],
      tech: ["Node.js", "TypeScript", "MongoDB", "Redis", "Kafka", "Docker", "AWS"],
      type: "Freelance",
      company: null,
      links: {
        ios: "https://apps.apple.com/am/app/beautyos-salon-artist-booking/id6743705865",
        android: "https://play.google.com/store/apps/details?id=io.beautyos.mobile",
      },
    },
    {
      title: "PowerTrade",
      subtitle: "Energy Trading & Supply Platform",
      role: "Backend owner (0 → production) + frontend bugfixes",
      description:
        "Backend infrastructure for a specialized energy trading platform enabling businesses to secure reliable and affordable electricity. Manages complex energy data, automated billing notifications, and real-time market transparency for industrial consumers.",
      highlights: [
        "Energy data management APIs with Node.js & TypeScript",
        "Real-time market pricing via Socket.io",
        "Automated billing with SendGrid & Twilio",
        "Secure JWT & RBAC authentication",
        "Dual-database: MongoDB + Supabase (PostgreSQL)",
        "Document management with Multer & Handlebars",
      ],
      tech: ["Node.js", "TypeScript", "MongoDB", "Supabase", "Socket.io", "SendGrid", "JWT"],
      type: "Professional",
      company: null,
      links: { live: "https://powertrade.am/" },
    },
    {
      title: "Souqira",
      subtitle: "Business Marketplace Platform",
      role: "Backend owner (0 → production) + frontend bugfixes",
      description:
        "Full-stack startup platform for buying, selling, and investing in businesses. Connects entrepreneurs, business owners, and investors on a secure, multilingual marketplace.",
      highlights: [
        "JWT & OAuth (Google, Facebook) authentication",
        "AWS S3 image uploads & file storage",
        "Real-time messaging with Socket.io",
        "Admin dashboard with moderation",
        "Stripe featured listings payments",
        "i18n (English, Arabic, Kurdish) with RTL",
      ],
      tech: ["React 19", "Node.js", "TypeScript", "MongoDB", "AWS S3", "Stripe", "Socket.io"],
      type: "Professional",
      company: null,
      links: { live: "https://www.souqira.com/en/" },
    },
    {
      title: "BallerTube",
      subtitle: "Real-Time Sports Platform",
      role: "API integration, web scraping → DB, and frontend",
      description:
        "Dynamic real-time sports platform integrating live data from external APIs with efficient caching strategies for optimal performance.",
      highlights: [
        "Real-time API integration",
        "Web scraping pipeline persisted to the database",
        "Efficient data caching",
        "Dynamic UI updates",
      ],
      tech: ["Node.js", "REST API", "Web Scraping", "Caching"],
      type: "Professional",
      company: null,
      links: { live: "https://www.ballertube.com/" },
    },
    {
      title: "Social Network",
      subtitle: "Full-Stack Social Application",
      role: "Full-stack development (frontend + backend)",
      description:
        "A comprehensive social network featuring CRUD operations, friend requests, and real-time group chats powered by Socket.io. Built during my internship.",
      highlights: [
        "User authentication system",
        "Friend request functionality",
        "Real-time group chats",
        "PostgreSQL database design",
      ],
      tech: ["React.js", "Node.js", "PostgreSQL", "Socket.io"],
      type: "Internship",
      company: null,
      links: {
        githubFront: "https://github.com/Sevak-Badalyan/winku-front",
        githubBack: "https://github.com/Sevak-Badalyan/winku-back",
      },
    },
  ];

  // Resolve the primary action for a card click: open a live/repo URL, or
  // surface the app-download modal. Returns null when there is nothing to open.
  const getCardAction = (links: {
    live?: string;
    ios?: string;
    android?: string;
    githubFront?: string;
    githubBack?: string;
  }) => {
    if (links?.live) return { kind: "url" as const, url: links.live };
    if (links?.ios || links?.android)
      return { kind: "download" as const, ios: links.ios, android: links.android };
    if (links?.githubFront) return { kind: "url" as const, url: links.githubFront };
    return null;
  };

  return (
    <section id="projects" className="py-24 md:py-32 relative">
      <div className="container px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          {/* Section Header */}
          <div className="flex items-center gap-4 mb-12">
            <span className="font-mono text-primary text-sm">03.</span>
            <h2 className="text-2xl md:text-3xl font-bold">Featured Projects</h2>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Projects Grid */}
          <div className="space-y-8">
            {projects.map((project, i) => {
              const action = getCardAction(project.links);
              const activate = () => {
                if (!action) return;
                if (action.kind === "url") {
                  window.open(action.url, "_blank", "noopener,noreferrer");
                } else {
                  setDownloadLinks({ ios: action.ios, android: action.android });
                  setDownloadOpen(true);
                }
              };

              return (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                  onClick={activate}
                  onKeyDown={(e) => {
                    if (action && (e.key === "Enter" || e.key === " ")) {
                      e.preventDefault();
                      activate();
                    }
                  }}
                  role={action ? "button" : undefined}
                  tabIndex={action ? 0 : undefined}
                  className={`glass glass-hover rounded-xl p-6 md:p-8 group ${
                    action ? "cursor-pointer" : ""
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-2">
                        <span className={`text-xs font-mono px-2 py-1 rounded ${
                          project.type === "Freelance"
                            ? "bg-accent/20 text-accent"
                            : "bg-primary/10 text-primary"
                        }`}>
                          {project.type}
                        </span>
                        {project.links?.ios && project.links?.android && (
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Download className="w-3 h-3" />
                            iOS & Android
                          </span>
                        )}
                        <span className="text-muted-foreground text-sm">{project.subtitle}</span>
                      </div>

                      <h3 className="text-xl md:text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>

                      <p className="font-mono text-xs mb-4">
                        <span className="text-muted-foreground">{"// my role: "}</span>
                        <span className="text-primary/90">{project.role}</span>
                      </p>

                      <p className="text-muted-foreground mb-4 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Highlights */}
                      <ul className="grid md:grid-cols-2 gap-2 mb-6">
                        {project.highlights.map((highlight) => (
                          <li key={highlight} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <ArrowRight className="w-3 h-3 text-primary flex-shrink-0" />
                            {highlight}
                          </li>
                        ))}
                      </ul>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                          <span
                            key={tech}
                            className="px-3 py-1 text-xs font-mono bg-secondary/50 text-foreground/80 rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Links */}
                    <div
                      className="flex md:flex-col gap-3"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {project.links?.live && (
                        <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg glass glass-hover hover:glow-primary transition-all" title="Visit site">
                          <ExternalLink className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                        </a>
                      )}
                      {project.links?.githubFront && (
                        <a href={project.links.githubFront} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg glass glass-hover hover:glow-primary transition-all" title="Frontend repo">
                          <Github className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                        </a>
                      )}
                      {project.links?.githubBack && (
                        <a href={project.links.githubBack} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg glass glass-hover hover:glow-primary transition-all" title="Backend repo">
                          <Github className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                        </a>
                      )}
                      {(project.links?.ios || project.links?.android) && (
                        <button
                          onClick={() => {
                            setDownloadLinks({ ios: project.links?.ios, android: project.links?.android });
                            setDownloadOpen(true);
                          }}
                          className="p-2 rounded-lg glass glass-hover hover:glow-primary transition-all"
                          title="Download App"
                        >
                          <Download className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Download Modal */}
      <Dialog open={downloadOpen} onOpenChange={setDownloadOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Download App</DialogTitle>
            <DialogDescription>Choose your platform to download the app.</DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3 pt-2">
            {downloadLinks.ios && (
              <a
                href={downloadLinks.ios}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:glow-primary transition-all">
                  <Smartphone className="w-6 h-6 text-primary" />
                </div>
                <div className="text-left">
                  <div className="text-xs text-muted-foreground">Download on the</div>
                  <div className="text-lg font-semibold group-hover:text-primary transition-colors">App Store</div>
                </div>
              </a>
            )}
            {downloadLinks.android && (
              <a
                href={downloadLinks.android}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-lg border border-border hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:glow-primary transition-all">
                  <Smartphone className="w-6 h-6 text-primary" />
                </div>
                <div className="text-left">
                  <div className="text-xs text-muted-foreground">Get it on</div>
                  <div className="text-lg font-semibold group-hover:text-primary transition-colors">Google Play</div>
                </div>
              </a>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Projects;
