import type { Dictionary } from "./en";

export const it: Dictionary = {
  meta: {
    title: "Alessandro Palazzesi — Creative AI engineer",
    description:
      "Alessandro Palazzesi, software engineer full-stack e technical lead a Torino. Piattaforme web e sistemi AI per pubblica amministrazione e aziende.",
  },
  nav: {
    services: "Servizi",
    clients: "Esperienza",
    lab: "Metodo",
    contact: "Contatti",
    otherLang: "EN",
    otherLangLabel: "Switch to English",
    themeToDark: "Passa al tema scuro",
    themeToLight: "Passa al tema chiaro",
    skip: "Vai al contenuto",
  },
  hero: {
    kicker: "Creative AI engineer indipendente",
    title: ["Ingegneria", "con un punto", "di vista"],
    body: "Sono Alessandro Palazzesi, software engineer full-stack e technical lead. Progetto, sviluppo e guido la realizzazione di piattaforme web e sistemi AI per pubblica amministrazione e aziende.",
    cta: "Lavoriamo insieme",
    secondary: "Vedi l'esperienza",
    stats: [
      { value: "9+ anni", label: "di software in produzione" },
      { value: "Fino a 6", label: "ingegneri guidati" },
      { value: "Italia e USA", label: "clienti seguiti" },
    ],
  },
  stack: {
    kicker: "Stack",
    groups: [
      { label: "AI", items: ["RAG", "Pipeline di retrieval", "Chatbot AI"] },
      { label: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Angular", "React Native"] },
      { label: "Backend", items: [".NET 8", "C#", "Node.js", "NestJS", "SQL Server", "MongoDB"] },
      { label: "Consegna", items: ["GitHub Actions", "Azure DevOps", "Git", "Agile"] },
    ],
    github: "Profilo GitHub",
    linkedin: "Profilo LinkedIn",
  },
  services: {
    kicker: "Cosa faccio",
    title: ["Ingegneria per", "l'era agentica"],
    items: [
      {
        name: "Sistemi AI e agenti",
        desc: "Sistemi AI interoperabili: pipeline RAG per un recupero delle informazioni sicuro ed efficiente e chatbot su basi documentali.",
        tech: "RAG · pipeline di retrieval · chatbot AI",
      },
      {
        name: "Architetture Frontend",
        desc: "Piattaforme ad alto traffico in React 18+, Next.js e TypeScript: state management, data visualization, pagine guidate da CMS.",
        tech: "React · Next.js · TypeScript · Redux · Tailwind CSS",
      },
      {
        name: "Backend e API",
        desc: "API, microservizi e job schedulati in .NET 8 e Node.js. SOLID, dependency injection, repository pattern, elaborazione di dati complessi.",
        tech: ".NET 8 · C# · NestJS · EF Core · SQL Server · MongoDB",
      },
      {
        name: "Leadership tecnica",
        desc: "Team fino a 6 ingegneri: stime e ticket in Agile, confronto diretto con il cliente, CI/CD e rilasci su scadenze critiche.",
        tech: "Agile · Jira · GitHub Actions · Azure DevOps",
      },
    ],
  },
  clients: {
    kicker: "Esperienza",
    title: ["Per chi ho costruito"],
    items: [
      {
        years: "2025 — oggi",
        name: "Dipartimento per la trasformazione digitale",
        desc: "Il dipartimento del Governo italiano che guida la trasformazione digitale del Paese.",
        role: "Software Engineer Expert",
      },
      {
        years: "2023 — 2025",
        name: "Deltatre",
        desc: "Azienda tecnologica globale per i media di sport e intrattenimento.",
        role: "Technical Leader & Frontend Architect",
      },
      {
        years: "2023 — 2025",
        name: "Nuvem",
        desc: "Azienda statunitense di tecnologia sanitaria per i programmi farmaceutici 340B.",
        role: "Senior Backend Engineer",
      },
      {
        years: "2018 — 2023",
        name: "Enhancers",
        desc: "Studio torinese di prodotto digitale per esperienze connesse, IoT e mobile.",
        role: "Technical Lead",
      },
      {
        years: "2017 — 2018",
        name: "DM Group",
        desc: "Agenzia torinese di marketing digitale e CRM.",
        role: "Full Stack Developer",
      },
    ],
  },
  lab: {
    kicker: "Come lavoro · AI",
    title: ["AI che arriva", "in produzione"],
    body: "Dal caso d'uso al rilascio: il percorso con cui porto un sistema AI in produzione, una tappa alla volta.",
    cta: "Parliamone",
    start: "Inizio",
    end: "Arrivo",
    steps: [
      {
        name: "Il problema",
        desc: "Parto dal caso d'uso e dai dati disponibili: requisiti, vincoli di sicurezza e criteri per misurare il risultato.",
      },
      {
        name: "La prova",
        desc: "Un prototipo RAG sui dati reali, per validare l'approccio prima di investire nell'architettura.",
      },
      {
        name: "Il prodotto",
        desc: "Architettura completa: interfaccia in React e Next.js, API e servizi, integrazione con i sistemi esistenti.",
      },
      {
        name: "In produzione",
        desc: "Rilascio con pipeline CI/CD e iterazioni guidate dall'uso reale.",
      },
    ],
  },
  contact: {
    kicker: "Contatti",
    title: ["Hai un progetto", "in mente?", "Parliamone"],
    email: "Scrivimi una mail",
    linkedin: "Scrivimi su LinkedIn",
    github: "Guarda il mio GitHub",
    place: "Torino, Italia",
    rights: "Alessandro Palazzesi",
  },
};
