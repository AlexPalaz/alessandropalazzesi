export const en = {
  meta: {
    title: "Alessandro Palazzesi — Creative AI engineer",
    description:
      "Alessandro Palazzesi, a full-stack software engineer and technical lead in Turin. Web platforms and AI systems for public-sector and enterprise clients.",
  },
  nav: {
    services: "Services",
    clients: "Experience",
    lab: "Method",
    contact: "Contact",
    otherLang: "IT",
    otherLangLabel: "Passa all'italiano",
    themeToDark: "Switch to dark theme",
    themeToLight: "Switch to light theme",
    skip: "Skip to content",
  },
  hero: {
    kicker: "Independent creative AI engineer",
    title: ["Engineering", "with a point", "of view"],
    body: "I'm Alessandro Palazzesi, a full-stack software engineer and technical lead. I design, build and lead the delivery of web platforms and AI systems for public-sector and enterprise clients.",
    cta: "Let's work together",
    secondary: "See my experience",
    stats: [
      { value: "9+ years", label: "in production software" },
      { value: "Up to 6", label: "engineers led" },
      { value: "Italy & USA", label: "clients served" },
    ],
  },
  stack: {
    kicker: "Stack",
    groups: [
      { label: "AI", items: ["RAG", "Retrieval pipelines", "AI chatbots"] },
      { label: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Angular", "React Native"] },
      { label: "Backend", items: [".NET 8", "C#", "Node.js", "NestJS", "SQL Server", "MongoDB"] },
      { label: "Delivery", items: ["GitHub Actions", "Azure DevOps", "Git", "Agile"] },
    ],
    github: "GitHub profile",
    linkedin: "LinkedIn profile",
  },
  services: {
    kicker: "What I do",
    title: ["Engineering for", "the agentic era"],
    items: [
      {
        name: "AI systems and agents",
        desc: "Interoperable AI systems: RAG pipelines for secure, efficient information retrieval and chatbots over document bases.",
        tech: "RAG · retrieval pipelines · AI chatbots",
      },
      {
        name: "Frontend architecture",
        desc: "High-traffic platforms in React 18+, Next.js and TypeScript: state management, data visualization, CMS-driven pages.",
        tech: "React · Next.js · TypeScript · Redux · Tailwind CSS",
      },
      {
        name: "Backend and APIs",
        desc: "APIs, microservices and scheduled jobs in .NET 8 and Node.js. SOLID, dependency injection, repository pattern, complex data processing.",
        tech: ".NET 8 · C# · NestJS · EF Core · SQL Server · MongoDB",
      },
      {
        name: "Technical leadership",
        desc: "Teams of up to 6 engineers: Agile estimates and tickets, direct work with the client, CI/CD and deadline-critical releases.",
        tech: "Agile · Jira · GitHub Actions · Azure DevOps",
      },
    ],
  },
  clients: {
    kicker: "Experience",
    title: ["Who I've built for"],
    items: [
      {
        years: "2025 — now",
        name: "Dipartimento per la trasformazione digitale",
        desc: "The Italian Government department steering the country's digital transformation.",
        role: "Software Engineer Expert",
      },
      {
        years: "2023 — 2025",
        name: "Deltatre",
        desc: "A global technology company for sports and entertainment media.",
        role: "Technical Leader & Frontend Architect",
      },
      {
        years: "2023 — 2025",
        name: "Nuvem",
        desc: "A US healthcare technology company serving 340B pharmacy programs.",
        role: "Senior Backend Engineer",
      },
      {
        years: "2018 — 2023",
        name: "Enhancers",
        desc: "A Turin digital product studio for connected, IoT and mobile experiences.",
        role: "Technical Lead",
      },
      {
        years: "2017 — 2018",
        name: "DM Group",
        desc: "A Turin digital marketing and CRM agency.",
        role: "Full Stack Developer",
      },
    ],
  },
  lab: {
    kicker: "How I work · AI",
    title: ["AI that reaches", "production"],
    body: "From use case to release: the route I follow to take an AI system to production, one stop at a time.",
    cta: "Get in touch",
    start: "Start",
    end: "Arrival",
    steps: [
      {
        name: "The problem",
        desc: "I start from the use case and the data available: requirements, security constraints and the criteria to measure the result.",
      },
      {
        name: "The proof",
        desc: "A RAG prototype on real data, to validate the approach before investing in the architecture.",
      },
      {
        name: "The product",
        desc: "Full architecture: interface in React and Next.js, APIs and services, integration with existing systems.",
      },
      {
        name: "In production",
        desc: "Release through CI/CD pipelines and iterations driven by real use.",
      },
    ],
  },
  contact: {
    kicker: "Contact",
    title: ["Have a project", "in mind?", "Let's talk"],
    email: "Write me an email",
    copy: "Copy",
    copied: "Copied",
    copyLabel: "Copy the email address",
    linkedin: "Write to me on LinkedIn",
    github: "See my GitHub",
    place: "Turin, Italy",
    rights: "Alessandro Palazzesi",
  },
};

export type Dictionary = typeof en;
