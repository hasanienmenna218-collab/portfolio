/* =====================================================================
   SITE CONFIGURATION  —  the ONLY file you need to edit for content.
   Everything on the website is rendered from this file.

   Anything written in [SQUARE BRACKETS] is a PLACEHOLDER. It is
   highlighted on the page so you can spot what still needs replacing.
   ===================================================================== */

/* ---------- 1. SOCIAL LINKS ------------------------------------------ */
/* Every social icon on the site (hero, contact, footer) reads these.   */
const LINKEDIN_URL = "https://www.linkedin.com/in/mennamohamedhasanien";
const GITHUB_URL   = "https://github.com/hasanienmenna218-collab";
const EMAIL        = "YOUR_EMAIL";                                       // PLACEHOLDER (e.g. name@example.com)

/* ---------- 2. CONTACT FORM ----------------------------------------- */
/* There is no backend. While `endpoint` is empty the form does NOT send
   anything and tells the visitor so. To connect it, paste the URL of a
   form service (e.g. Formspree, Getform, Basin) or your own API below.
   The form POSTs JSON: { name, email, message }.                       */
const CONTACT_FORM_ENDPOINT = ""; // e.g. "https://formspree.io/f/yourFormId"

/* ---------- 3. EVERYTHING ELSE -------------------------------------- */
window.SITE_CONFIG = {
  person: {
    name: "Menna Mohamed Hasanien",
    shortName: "Menna Hasanien",
    initials: "MH",
    role: "Computer & Control Systems Engineering Student",
    focus: "Data Engineering & Backend Development",
    photo: "assets/images/menna.jpg",   // your portrait (hero). Replace the file to change it.
    photoAlt: "Portrait of Menna Mohamed Hasanien"
  },

  social: { LINKEDIN_URL, GITHUB_URL, EMAIL },

  contactForm: { endpoint: CONTACT_FORM_ENDPOINT },

  about: {
    paragraphs: [
      "I'm a Level 3 Computer & Control Systems Engineering student at Mansoura University, building practical skills in Data Engineering and Backend Development.",
      "I work mainly with Python, SQL and FastAPI, and I program in C# and C++. My projects range from backend APIs to an Arduino radar, and I'm currently working on data pipeline projects.",
      "My strongest personal skill is multitasking: I can keep several projects moving at the same time."
    ],
    facts: [
      { label: "Studying",  value: "Computer & Control Systems Engineering, Mansoura University" },
      { label: "Interests", value: "Data Engineering, Backend Development" },
      { label: "Languages", value: "Arabic (native), English (B2)" },
      { label: "Strongest skill", value: "Multitasking" }
    ]
  },

  /* Only the skills you listed. Add or remove items freely. */
  skills: [
    { group: "Programming", items: ["Python", "C#", "C++"] },
    { group: "Data",        items: ["SQL", "MySQL", "Pandas", "NumPy", "Matplotlib", "Seaborn"] },
    { group: "Backend",     items: ["FastAPI", "REST APIs", "JWT"] },
    { group: "Tools",       items: ["Git", "GitHub"] },
    { group: "Web",         items: ["HTML", "CSS"] },
    { group: "Other",       items: ["Arduino", "Basic Hardware", "Data Structures", "OOP"] }
  ],

  education: {
    university: "Mansoura University",
    faculty: "Faculty of Engineering",
    program: "Computer & Control Systems Engineering",
    level: "Level 3",
    graduation: "Expected graduation: 2029",
    grade: "Grade: Excellent"
  },

  /* "Currently Learning" — edit, add or delete lines. */
  learning: [
    "Data Engineering",
    "Data Pipelines",
    "Advanced Python",
    "Backend Development"
  ],

  contact: {
    intro: "Interested in working together, or just want to say hello? Reach out through any of the links below."
  },

  /* ===================================================================
     PROJECTS
     -------------------------------------------------------------------
     MEDIA (all optional; leave "" / [] and no media area is shown at all):
       image   : main image, e.g. "assets/projects/arduino-radar/cover.jpg"
       gallery : more images, e.g. ["assets/projects/arduino-radar/1.jpg", ...]
       video   : HTML5 video file, e.g. "assets/projects/arduino-radar/demo.mp4"
       poster  : optional still image shown before the video plays
     LINKS: github / demo. Leave "" until you have them; the button then
            shows as disabled instead of linking to a fake address.
     statusType: "done" | "progress" | "concept" | "unknown"
     ================================================================= */
  projects: [
    {
      id: "arduino-radar",
      group: "featured",
      title: "Arduino Radar System",
      type: "Individual code",
      status: "[ADD STATUS]",
      statusType: "unknown",
      summary: "An Arduino-based radar system. I wrote the code myself.",
      description: "An Arduino-based radar system. [ADD PROJECT DESCRIPTION: what it detects and how it works]",
      role: "I wrote the code for this project myself.",
      technologies: ["Arduino"],
      technologiesNote: "[ADD OTHER TECHNOLOGIES / COMPONENTS]",
      featuresLabel: "Features",
      features: [],
      featuresNote: "[ADD FEATURES]",
      image: "",
      gallery: [],
      video: "",
      poster: "",
      github: "",
      demo: ""
    },
    {
      id: "ai-fitness-app",
      group: "featured",
      title: "AI Fitness / Gym Application",
      type: "Team project",
      status: "[ADD STATUS]",
      statusType: "unknown",
      summary: "A team-built fitness application with a FastAPI and MySQL backend.",
      description: "A team project: a fitness and gym application with a FastAPI backend, MySQL database, REST APIs and JWT authentication. It also includes AI-based fitness and nutrition functionality and computer vision for checking exercise form.",
      teamNote: "This was built by a team. The role below describes only my own contribution.",
      role: "[ADD MY ROLE: which parts of this project I worked on]",
      technologies: ["FastAPI", "MySQL", "REST APIs", "JWT"],
      technologiesNote: "",
      featuresLabel: "Features",
      features: [
        "User registration and login",
        "User profile",
        "Fitness goals",
        "Fitness assessment",
        "Workout plans",
        "Exercise feedback",
        "Progress tracking",
        "AI-based fitness / nutrition functionality",
        "Computer vision for exercise form checking"
      ],
      image: "",
      gallery: [],
      video: "",
      poster: "",
      github: "",
      demo: ""
    },
    {
      id: "traffic-data-pipeline",
      group: "featured",
      title: "Traffic Data Engineering Project",
      type: "Data engineering",
      status: "In Progress",
      statusType: "progress",
      summary: "Collecting, processing, storing and analysing traffic data through data pipelines.",
      description: "A data engineering project that is still in progress. It focuses on traffic data collection, processing, storage, analysis and data pipelines. Parts of it are not built yet.",
      statusNote: "This project is in progress. Nothing on this page should be read as finished work.",
      role: "[ADD MY ROLE]",
      technologies: ["Python", "Pandas", "SQL", "APIs / data sources", "Docker"],
      technologiesLabel: "Potential technologies",
      technologiesNote: "",
      featuresLabel: "Focus areas",
      features: [
        "Traffic data collection",
        "Data processing",
        "Data storage",
        "Data analysis",
        "Data pipelines"
      ],
      image: "",
      gallery: [],
      video: "",
      poster: "",
      github: "",
      demo: ""
    },
    {
      id: "logistics-realtime",
      group: "featured",
      title: "Real-Time Logistics Data Engineering Project",
      type: "Data engineering",
      status: "Project Concept / In Progress",
      statusType: "concept",
      summary: "A project concept exploring real-time logistics data and data pipelines.",
      description: "A project concept that explores real-time data, data pipelines, data processing and logistics data. It is at an early stage and is not completed work.",
      statusNote: "This is a project concept / work in progress, not completed work or professional experience.",
      role: "[ADD MY ROLE]",
      technologies: [],
      technologiesNote: "[ADD TECHNOLOGIES]",
      featuresLabel: "Focus areas",
      features: [
        "Real-time data",
        "Data pipelines",
        "Data processing",
        "Logistics data"
      ],
      image: "",
      gallery: [],
      video: "",
      poster: "",
      github: "",
      demo: ""
    },

    /* --- Advanced C# projects (completed independently). ---------------- */
    /* Add description / role / github later; empty fields are simply not shown. */
    ...["Task Management", "Library Management System", "Online Store"].map((name, i) => ({
      id: "csharp-" + (i + 1),
      group: "csharp",
      title: name,
      type: "Advanced C# project",
      status: "Completed",
      statusType: "done",
      summary: "",
      description: "",      // [ADD PROJECT DESCRIPTION] — card shows "View Details" once this is filled in
      role: "",
      technologies: ["C#"],
      technologiesNote: "",
      featuresLabel: "Features",
      features: [],
      featuresNote: "",
      image: "",
      gallery: [],
      video: "",
      poster: "",
      github: "",
      demo: ""
    }))
  ]
};
