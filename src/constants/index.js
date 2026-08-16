const navLinks = [
  {
    id: 1,
    name: "Projects",
    type: "finder",
  },
  {
    id: 3,
    name: "Contact",
    type: "contact",
  },
  {
    id: 4,
    name: "Resume",
    type: "resume",
  },
];

const navIcons = [
  {
    id: 1,
    img: "/icons/wifi.svg",
  },
  {
    id: 2,
    img: "/icons/search.svg",
  },
  {
    id: 3,
    img: "/icons/user.svg",
  },
  {
    id: 4,
    img: "/icons/mode.svg",
  },
];

const dockApps = [
  {
    id: "finder",
    name: "Portfolio", // was "Finder"
    icon: "finder.png",
    canOpen: true,
  },
  // {
  //   id: "safari",
  //   name: "Articles", // was "Safari"
  //   icon: "safari.png",
  //   canOpen: true,
  // },
  // {
  //   id: "photos",
  //   name: "Gallery", // was "Photos"
  //   icon: "photos.png",
  //   canOpen: true,
  // },
  {
    id: "contact",
    name: "Contact", // or "Get in touch"
    icon: "contact.png",
    canOpen: true,
  },
  {
    id: "terminal",
    name: "Skills", // was "Terminal"
    icon: "terminal.png",
    canOpen: true,
  },
  // {
  //   id: "trash",
  //   name: "Archive", // was "Trash"
  //   icon: "trash.png",
  //   canOpen: false,
  // },
];

const blogPosts = [
  {
    id: 1,
    date: "Sep 2, 2025",
    title:
      "TypeScript Explained: What It Is, Why It Matters, and How to Master It",
    image: "/images/blog1.png",
    link: "https://jsmastery.com/blog/typescript-explained-what-it-is-why-it-matters-and-how-to-master-it",
  },
  {
    id: 2,
    date: "Aug 28, 2025",
    title:
      "The Ultimate Guide to Mastering Three.js for 3D Development",
    image: "/images/blog2.png",
    link: "https://jsmastery.com/blog/the-ultimate-guide-to-mastering-three-js-for-3d-development",
  },
  {
    id: 3,
    date: "Aug 15, 2025",
    title:
      "The Ultimate Guide to Mastering GSAP Animations",
    image: "/images/blog3.png",
    link: "https://jsmastery.com/blog/the-ultimate-guide-to-mastering-gsap-animations",
  },
];

const techStack = [
  {
    category: "Frontend",
    items: ["React.js", "Next.js", "TypeScript", "Vite"],
  },
  {
    category: "Styling & UI",
    items: [
      "Tailwind CSS",
      "Sshadcn/ui",
      "Lucide React",
      "CSS",
    ],
  },
  {
    category: "Backend",
    items: [
      "Node.js",
      "Express",
      "NestJS",
      "Elysia",
      "REST APIs",
    ],
  },
  {
    category: "Database & Auth",
    items: [
      "MongoDB",
      "PostgreSQL",
      "Clerk",
      "JWT",
      "OAuth 2.0",
      "Zod",
    ],
  },
  {
    category: "AI & Cloud",
    items: [
      "Hugging Face",
      "ChatGpt",
      "Gemini",
      "Vercel",
      "Vercel Blob",
    ],
  },
  {
    category: "Dev Tools",
    items: ["Git", "GitHub", "Docker"],
  },
];

const socials = [
  {
    id: 1,
    text: "Github",
    icon: "/icons/github.svg",
    bg: "#f4656b",
    link: "https://github.com/arpit10128",
  },
  {
    id: 2,
    text: "Twitter/X",
    icon: "/icons/twitter.svg",
    bg: "#ff866b",
    link: "https://x.com/arpitrw",
  },
  {
    id: 3,
    text: "LinkedIn",
    icon: "/icons/linkedin.svg",
    bg: "#05b6f6",
    link: "https://www.linkedin.com/in/arpit-saraswat/",
  },
];

const photosLinks = [
  {
    id: 1,
    icon: "/icons/gicon1.svg",
    title: "Library",
  },
  {
    id: 2,
    icon: "/icons/gicon2.svg",
    title: "Memories",
  },
  {
    id: 3,
    icon: "/icons/file.svg",
    title: "Places",
  },
  {
    id: 4,
    icon: "/icons/gicon4.svg",
    title: "People",
  },
  {
    id: 5,
    icon: "/icons/gicon5.svg",
    title: "Favorites",
  },
];

const gallery = [
  {
    id: 1,
    img: "/images/gal1.png",
  },
  {
    id: 2,
    img: "/images/gal2.png",
  },
  {
    id: 3,
    img: "/images/gal3.png",
  },
  {
    id: 4,
    img: "/images/gal4.png",
  },
];

export {
  navLinks,
  navIcons,
  dockApps,
  blogPosts,
  techStack,
  socials,
  photosLinks,
  gallery,
};

const WORK_LOCATION = {
  id: 1,
  type: "work",
  name: "Work",
  icon: "/icons/work.svg",
  kind: "folder",
  children: [
    // ▶ Project 1
    {
      id: 5,
      name: "Ai Voice Library",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-5", // icon position inside Finder
      windowPosition: "top-[5vh] left-5", // optional: Finder window position
      children: [
        {
          id: 1,
          name: "WhisperDocs.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "WhisperDocs is an AI-powered document assistant that lets users converse with their PDF documents using voice or text. Users can upload a PDF, and WhisperDocs processes and stores its content so they can ask questions about the document and receive AI-generated answers in both text and voice.",

            "Built with Next.js, TypeScript, Tailwind CSS, Clerk, MongoDB, Mongoose, and Vercel Blob, the project combines document processing, authentication, cloud storage, and AI-powered conversational interaction into a single platform.",

            "Key Features",
            "📄 Upload and process PDF documents",
            "🔍 Parse and segment document content for AI retrieval",
            "💬 Ask questions about uploaded documents",
            "🎙️ Interact with documents through voice",
            "🔊 Receive AI responses in both text and speech",
            "🔐 Secure authentication and user-specific document access",
            "☁️ Cloud-based PDF and asset storage using Vercel Blob",
            "🗄️ MongoDB-based document and segment management",
          ],
        },
        {
          id: 2,
          name: "WhisperDocs.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://whisper-docs-eta.vercel.app/",
          position: "top-10 right-20",
        },
        {
          id: 4,
          name: "WhisperDocs.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-42 right-60",
          imageUrl: "/images/ai-voice-library.png",
        },
      ],
    },

    // ▶ Project 2
    {
      id: 6,
      name: "AI Resume Analyzer",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-32 right-40",
      windowPosition: "top-[20vh] left-7",
      children: [
        {
          id: 1,
          name: "AI Resume Analyzer Project.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 right-10",
          description: [
            "AI Resume Analyzer is an AI-powered tool that analyzes resumes against job requirements to help candidates understand how well their profile matches a role. Users can upload their resume and receive an intelligent analysis of their  skills, experience, strengths, weaknesses, and overall job compatibility.",

            "The project focuses on using AI to turn an ordinary resume into actionable insights, helping users identify missing skills, improve their resume content, and better align their experience with specific job descriptions.",

            "Key Features",

            "📄 Upload and analyze resumes",
            "🤖 AI-powered resume evaluation",
            "🎯 Compare resumes with specific job descriptions",
            "🧠 Identify relevant and missing skills",
            "📊 Generate resume/job match insights",
            "✍️ Suggest areas for improvement",
            "🔍 Analyze experience and qualifications",
            "⚡ Provide actionable feedback for better job applications",
          ],
        },
        {
          id: 2,
          name: "ai-resume-analyzer.com",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://puter.com/app/ai-resume-analyzer-x285",
          position: "top-20 left-20",
        },
        {
          id: 4,
          name: "ai-resume-analyzer.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-40 left-60",
          imageUrl: "/images/ai-resume-image.png",
        },
      ],
    },
  ],
};

const ABOUT_LOCATION = {
  id: 2,
  type: "about",
  name: "About me",
  icon: "/icons/info.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-5",
      imageUrl: "/images/arpit.png",
    },
    {
      id: 2,
      name: "about-me.txt",
      icon: "/images/txt.png",
      kind: "file",
      fileType: "txt",
      position: "top-30 left-50",
      subtitle: "Meet the Developer Behind the Code",
      image: "/images/arpit3.jpg",
      description: [
        "Hey! I’m Arpit 👋 \nI write code, break things, Google why they broke, and then proudly break them even more.",
      ],
    },
  ],
};

const RESUME_LOCATION = {
  id: 3,
  type: "resume",
  name: "Resume",
  icon: "/icons/file.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "Resume.pdf",
      icon: "/images/pdf.png",
      kind: "file",
      fileType: "pdf",
      // you can add `href` if you want to open a hosted resume
      // href: "/your/resume/path.pdf",
    },
  ],
};

// const TRASH_LOCATION = {
//   id: 4,
//   type: "trash",
//   name: "Trash",
//   icon: "/icons/trash.svg",
//   kind: "folder",
//   children: [
//     {
//       id: 1,
//       name: "trash1.png",
//       icon: "/images/image.png",
//       kind: "file",
//       fileType: "img",
//       position: "top-10 left-10",
//       imageUrl: "/images/trash-1.png",
//     },
//     {
//       id: 2,
//       name: "trash2.png",
//       icon: "/images/image.png",
//       kind: "file",
//       fileType: "img",
//       position: "top-40 left-80",
//       imageUrl: "/images/trash-2.png",
//     },
//   ],
// };

export const locations = {
  work: WORK_LOCATION,
  about: ABOUT_LOCATION,
  resume: RESUME_LOCATION,
  // trash: TRASH_LOCATION,
};

const INITIAL_Z_INDEX = 1000;

const WINDOW_CONFIG = {
  finder: {
    isOpen: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
  },
  contact: {
    isOpen: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
  },
  resume: {
    isOpen: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
  },
  safari: {
    isOpen: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
  },
  photos: {
    isOpen: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
  },
  terminal: {
    isOpen: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
  },
  txtfile: {
    isOpen: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
  },
  imgfile: {
    isOpen: false,
    zIndex: INITIAL_Z_INDEX,
    data: null,
  },
};

export { INITIAL_Z_INDEX, WINDOW_CONFIG };
