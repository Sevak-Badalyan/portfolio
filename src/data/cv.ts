import { Terminal, Sparkles, Zap, Users, GraduationCap, Code, Languages, Mail, Github, Linkedin, MapPin, Smartphone, ExternalLink } from "lucide-react";

export const cvData = {
    personalInfo: {
        name: "Sevak Badalyan",
        title: "Software Engineer",
        location: "Yerevan, Armenia",
        email: "sevak.badalyan.01@gmail.com",
        linkedin: "https://www.linkedin.com/in/sevak-badalyan-4045032b0/",
        github: "https://github.com/Sevak-Badalyan",
        summary: "Software engineer with a backend focus and full-stack range — building scalable systems from Fastify/Express microservices and PostgreSQL/MongoDB data layers to React and React Native clients and AI/LLM integrations. Comfortable owning features end to end and picking up new languages and tools quickly as projects demand.",
    },
    highlights: [
        { icon: Terminal, label: "Backend Systems", desc: "Scalable & secure" },
        { icon: Zap, label: "Real-Time Apps", desc: "Socket.io expertise" },
        { icon: Sparkles, label: "Clean Code", desc: "MVC architecture" },
        { icon: Users, label: "Team Player", desc: "Collaborative mindset" },
    ],
    education: [
        {
            title: "Master's in Business Informatics",
            institution: "Armenian State University of Economics",
            period: "2025 – Present",
            type: "Academic",
        },
        {
            title: "Bachelor's Degree",
            institution: "National Polytechnic University of Armenia",
            period: "2021 – 2025",
            type: "Academic",
        },
        {
            title: "Back-End Development",
            institution: "Aren Mehrabyan Foundation",
            period: "2023",
            type: "Professional",
        },
        {
            title: "Front-End Development",
            institution: "Picsart Academy",
            period: "2022",
            type: "Professional",
        },
        {
            title: "English Language",
            institution: "Lezounery Toun",
            period: "2024",
            type: "Language",
        },
    ],
    languages: [
        { name: "Armenian", level: "Native", percentage: 100 },
        { name: "Russian", level: "Upper-Intermediate", percentage: 80 },
        { name: "English", level: "Pre-Intermediate", percentage: 50 },
    ],
    skills: {
        categories: [
            {
                title: "Languages & Runtime",
                skills: [
                    { name: "JavaScript", level: 95 },
                    { name: "TypeScript", level: 90 },
                    { name: "Node.js", level: 95 },
                ],
            },
            {
                title: "Frameworks",
                skills: [
                    { name: "Express.js", level: 95 },
                    { name: "Fastify", level: 85 },
                    { name: "NestJS", level: 75 },
                    { name: "React", level: 75 },
                    { name: "React Native", level: 70 },
                ],
            },
            {
                title: "Databases",
                skills: [
                    { name: "PostgreSQL", level: 85 },
                    { name: "MongoDB", level: 90 },
                    { name: "Redis", level: 70 },
                    { name: "Drizzle ORM", level: 75 },
                ],
            },
            {
                title: "AI Engineering",
                skills: [
                    { name: "LLM Integration", level: 80 },
                    { name: "OpenAI / Anthropic APIs", level: 80 },
                    { name: "Prompt Engineering", level: 75 },
                    { name: "SSE Streaming", level: 75 },
                ],
            },
            {
                title: "Tools & Other",
                skills: [
                    { name: "Git/GitHub", level: 90 },
                    { name: "Docker", level: 65 },
                    { name: "Socket.io", level: 85 },
                ],
            },
        ],
        soft: [
            "Communication",
            "Teamwork",
            "Time Management",
            "Creative Thinking",
            "Problem Solving",
            "Critical Analysis",
        ],
    },
    projects: [
        {
            title: "UnderSelf",
            subtitle: "AI-Powered Personal Growth Platform",
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
            links: {
                ios: "https://apps.apple.com/am/app/underself/id6775254246",
                android: "https://play.google.com/store/apps/details?id=io.underself.app",
            },
        },
        {
            title: "BeautyOS",
            subtitle: "Salon & Beauty Business Management Platform",
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
            links: {
                ios: "https://apps.apple.com/am/app/beautyos-salon-artist-booking/id6743705865",
                android: "https://play.google.com/store/apps/details?id=io.beautyos.mobile",
            },
        },
        {
            title: "Souqira",
            subtitle: "Business Marketplace Platform",
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
            links: { live: "https://www.souqira.com/en/" },
        },
        {
            title: "BallerTube",
            subtitle: "Real-Time Sports Platform",
            description:
                "Dynamic real-time sports platform integrating live data from external APIs with efficient caching strategies for optimal performance.",
            highlights: [
                "Real-time API integration",
                "Efficient data caching",
                "Dynamic UI updates",
                "Live sports data streaming",
            ],
            tech: ["Node.js", "REST API", "Caching"],
            type: "Professional",
            links: { live: "https://www.ballertube.com/" },
        },
        {
            title: "PowerTrade",
            subtitle: "Energy Trading & Supply Platform",
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
            links: { live: "https://powertrade.am/" },
        },
        {
            title: "Social Network",
            subtitle: "Full-Stack Social Application",
            description:
                "A comprehensive social network featuring CRUD operations, friend requests, and real-time group chats powered by Socket.io.",
            highlights: [
                "User authentication system",
                "Friend request functionality",
                "Real-time group chats",
                "PostgreSQL database design",
            ],
            tech: ["React.js", "Node.js", "PostgreSQL", "Socket.io"],
            type: "Professional",
            links: {
                githubFront: "https://github.com/Sevak-Badalyan/winku-front",
                githubBack: "https://github.com/Sevak-Badalyan/winku-back",
            },
        },
    ]
};
