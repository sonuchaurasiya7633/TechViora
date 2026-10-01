export const defaultPlans = [
  {
    name: "1 Month Internship",
    slug: "1-month",
    durationLabel: "1 Month",
    durationDays: 30,
    originalPrice: 499,
    salePrice: 299,
    discountPercent: 40,
    isPopular: false,
    isActive: true,
    sortOrder: 1,
    features: [
      "Core Curriculum & Guided Video Lessons",
      "Daily Practical Code Exercises",
      "1 Industry-Grade Mini Project",
      "Code Reviews & Mentor Feedback",
      "Downloadable Cheatsheets & Source Code",
      "Verified Certificate of Completion",
      "Dedicated Ticket Support"
    ]
  },
  {
    name: "45 Days Internship",
    slug: "45-days",
    durationLabel: "45 Days",
    durationDays: 45,
    originalPrice: 699,
    salePrice: 399,
    discountPercent: 43,
    isPopular: false,
    isActive: true,
    sortOrder: 2,
    features: [
      "Everything in 1 Month Plan",
      "2 Practical Guided Projects",
      "Weekly Graded Coding Assignments",
      "Architecture & Best Practice Modules",
      "Git & GitHub Workflow Evaluation",
      "Verified Certificate + Digital Badge",
      "Priority Doubt Assistance"
    ]
  },
  {
    name: "3 Months Internship",
    slug: "3-months",
    durationLabel: "3 Months",
    durationDays: 90,
    originalPrice: 999,
    salePrice: 599,
    discountPercent: 40,
    isPopular: true,
    isActive: true,
    sortOrder: 3,
    features: [
      "Comprehensive Deep-Dive Curriculum",
      "3 Real-World Production Projects",
      "1 Production-Grade Capstone Project",
      "Detailed Line-by-Line Code Reviews",
      "Resume & Portfolio Project Integration",
      "Verifiable ISO-Standard Certificate with QR",
      "Letter of Recommendation (Top 10% performers)",
      "Lifetime Community & Resource Access"
    ]
  },
  {
    name: "6 Months Internship",
    slug: "6-months",
    durationLabel: "6 Months",
    durationDays: 180,
    originalPrice: 1599,
    salePrice: 999,
    discountPercent: 38,
    isPopular: false,
    isActive: true,
    sortOrder: 4,
    features: [
      "Mastery-Level Full Stack Curriculum",
      "5 Comprehensive Production Projects",
      "2 Advanced Capstone Applications",
      "Full CI/CD & Cloud Deployment Training",
      "Mock Technical Interviews & Guidance",
      "Verifiable Honors Certificate with QR Code",
      "Direct Mentor Code Reviews & Guidance",
      "Lifetime Updates & Priority Support"
    ]
  }
];

export interface DomainSeedItem {
  title: string;
  slug: string;
  category: string;
  shortDescription: string;
  detailedDescription: string;
  iconName: string;
  technologies: string[];
  skillsCovered: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  prerequisites: string[];
  learningOutcomes: string[];
  whoShouldJoin: string[];
  toolsRequired: string[];
  isFeatured: boolean;
  isPopular: boolean;
  order: number;
}

export const internshipDomains: DomainSeedItem[] = [
  {
    title: "MERN Stack Development",
    slug: "mern-stack-development",
    category: "Full Stack Development",
    shortDescription: "Master MongoDB, Express.js, React, and Node.js with production REST APIs, JWT authentication, and full-stack projects.",
    detailedDescription: "A comprehensive, practical internship program designed for students wanting to build scalable, full-stack web applications from scratch. You will work on database schema design, robust RESTful APIs, modern React component architecture, state management, and real-time deployment.",
    iconName: "Layers",
    technologies: ["MongoDB", "Express.js", "React.js", "Node.js", "Tailwind CSS", "JWT", "Git", "Postman"],
    skillsCovered: ["Database Design", "REST API Development", "Component Architecture", "State Management", "JWT Authentication", "Error Handling", "Deployment"],
    difficulty: "Intermediate",
    prerequisites: ["Basic HTML, CSS and foundational JavaScript concepts"],
    learningOutcomes: [
      "Architect and build production-ready full-stack applications",
      "Create secure backend APIs with authentication and middleware",
      "Integrate React with asynchronous backend endpoints",
      "Deploy scalable applications to cloud environments"
    ],
    whoShouldJoin: ["B.Tech/BCA/MCA students", "Developers looking to become Full-Stack Engineers", "Freshers preparing for web development roles"],
    toolsRequired: ["VS Code", "Node.js v18+", "MongoDB Compass", "Postman", "Git"],
    isFeatured: true,
    isPopular: true,
    order: 1
  },
  {
    title: "Full Stack Development",
    slug: "full-stack-development",
    category: "Full Stack Development",
    shortDescription: "Build modern end-to-end web applications with modern frontend frameworks, backend microservices, SQL/NoSQL databases, and cloud deployment.",
    detailedDescription: "Learn the full lifecycle of software engineering from user interface design and frontend rendering to database optimization, security, and cloud deployment pipelines.",
    iconName: "Globe",
    technologies: ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "Prisma", "Docker"],
    skillsCovered: ["End-to-End Architecture", "Database Modeling", "API Security", "Server-Side Rendering", "DevOps Basics"],
    difficulty: "All Levels",
    prerequisites: ["Familiarity with basic programming logic"],
    learningOutcomes: ["Design and build scalable full-stack web applications", "Connect relational and non-relational databases", "Implement secure authentication and authorization flows"],
    whoShouldJoin: ["Engineering students and aspiring software developers"],
    toolsRequired: ["VS Code", "Git", "Browser Developer Tools"],
    isFeatured: true,
    isPopular: true,
    order: 2
  },
  {
    title: "Next.js Development",
    slug: "nextjs-development",
    category: "Web Development",
    shortDescription: "Build blazing-fast modern web applications using Next.js App Router, Server Components, Server Actions, TypeScript, and MongoDB.",
    detailedDescription: "Step into the future of React development with Next.js. Master Server vs. Client components, dynamic routing, caching strategies, SEO optimization, and server actions.",
    iconName: "Zap",
    technologies: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "MongoDB", "Auth.js"],
    skillsCovered: ["App Router Architecture", "Server Actions", "Server Side Rendering (SSR)", "Incremental Static Regeneration", "SEO"],
    difficulty: "Intermediate",
    prerequisites: ["Solid understanding of React and modern JavaScript"],
    learningOutcomes: ["Build high-performance web applications with Next.js", "Implement Server Actions and data mutations safely", "Master advanced caching and SEO configurations"],
    whoShouldJoin: ["Frontend and React developers wanting to upgrade to Next.js full-stack"],
    toolsRequired: ["VS Code", "Node.js v20+"],
    isFeatured: true,
    isPopular: true,
    order: 3
  },
  {
    title: "Frontend Development",
    slug: "frontend-development",
    category: "Web Development",
    shortDescription: "Master HTML5, CSS3, modern JavaScript (ES6+), responsive design, Tailwind CSS, and foundational UI engineering.",
    detailedDescription: "Craft pixel-perfect, accessible, and high-performance user interfaces. Learn responsive layout algorithms, DOM manipulation, animations, and clean code practices.",
    iconName: "Layout",
    technologies: ["HTML5", "CSS3", "JavaScript (ES6+)", "Tailwind CSS", "Git"],
    skillsCovered: ["Responsive Design", "DOM Manipulation", "CSS Grid & Flexbox", "Web Accessibility", "Cross-browser Compatibility"],
    difficulty: "Beginner",
    prerequisites: ["No prior coding experience required; passion to learn"],
    learningOutcomes: ["Create stunning responsive web pages", "Implement interactive features with vanilla JavaScript", "Write clean, semantic HTML and modular CSS"],
    whoShouldJoin: ["First and second year college students and beginners"],
    toolsRequired: ["VS Code", "Modern Browser"],
    isFeatured: false,
    isPopular: true,
    order: 4
  },
  {
    title: "Backend Development",
    slug: "backend-development",
    category: "Web Development",
    shortDescription: "Design resilient server architectures, RESTful APIs, database schemas, authentication middleware, and server security.",
    detailedDescription: "Dive deep into server-side programming. Understand asynchronous event loops, database transactions, caching with Redis, request validation, and API rate limiting.",
    iconName: "Server",
    technologies: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "JWT", "Redis"],
    skillsCovered: ["API Architecture", "Database Query Optimization", "Security Best Practices", "Session Management", "Logging & Error Handling"],
    difficulty: "Intermediate",
    prerequisites: ["Understanding of JavaScript or any backend language"],
    learningOutcomes: ["Build scalable REST APIs from ground up", "Handle authentication and secure authorization rules", "Perform complex database aggregations and transactions"],
    whoShouldJoin: ["Developers focusing on server engineering and API development"],
    toolsRequired: ["VS Code", "Postman", "Node.js"],
    isFeatured: false,
    isPopular: false,
    order: 5
  },
  {
    title: "React.js Development",
    slug: "reactjs-development",
    category: "Web Development",
    shortDescription: "Build interactive single-page applications with React hooks, context API, custom hooks, component composition, and state management.",
    detailedDescription: "Master modern React 19 fundamentals. Learn hooks, lifecycle patterns, custom hooks, React Router, Context API, state machines, and high-performance rendering.",
    iconName: "Atom",
    technologies: ["React.js", "JavaScript (ES6+)", "Tailwind CSS", "React Router", "Zustand"],
    skillsCovered: ["Component Reusability", "Custom Hooks", "State Management", "API Consumption", "Clean Code"],
    difficulty: "Beginner",
    prerequisites: ["Basic HTML, CSS, and JavaScript"],
    learningOutcomes: ["Build dynamic SPAs with React", "Manage application state cleanly with hooks and Context", "Consume external REST APIs seamlessly"],
    whoShouldJoin: ["Students looking to specialize in modern frontend engineering"],
    toolsRequired: ["VS Code", "Node.js"],
    isFeatured: true,
    isPopular: true,
    order: 6
  },
  {
    title: "Node.js Development",
    slug: "nodejs-development",
    category: "Web Development",
    shortDescription: "Master asynchronous server-side JavaScript, file systems, streams, event-driven architectures, and Express microservices.",
    detailedDescription: "Understand the V8 engine, event loop, Node worker threads, buffer and stream handling, and build ultra-fast web backends.",
    iconName: "Cpu",
    technologies: ["Node.js", "Express.js", "REST APIs", "WebSockets", "MongoDB"],
    skillsCovered: ["Event-driven architecture", "Streams & Buffers", "Asynchronous Programming", "Microservices Basics"],
    difficulty: "Intermediate",
    prerequisites: ["Core JavaScript proficiency"],
    learningOutcomes: ["Build event-driven servers and web socket real-time services", "Optimize high-throughput API endpoints"],
    whoShouldJoin: ["Students building backend skills"],
    toolsRequired: ["VS Code", "Node.js"],
    isFeatured: false,
    isPopular: false,
    order: 7
  },
  {
    title: "Web Development",
    slug: "web-development",
    category: "Web Development",
    shortDescription: "Complete foundation to building full-fledged websites from scratch using HTML, CSS, JavaScript, and backend integration.",
    detailedDescription: "The all-in-one introductory web development curriculum covering modern web standards, UI design, client-server communication, and live project hosting.",
    iconName: "Monitor",
    technologies: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "Git"],
    skillsCovered: ["Web Standards", "Responsive Layouts", "DOM Scripting", "Hosting & Domain Deployment"],
    difficulty: "Beginner",
    prerequisites: ["None"],
    learningOutcomes: ["Build, style, and publish functional websites", "Understand client-server architecture thoroughly"],
    whoShouldJoin: ["Beginners and first-time coders"],
    toolsRequired: ["VS Code", "Chrome Browser"],
    isFeatured: false,
    isPopular: true,
    order: 8
  },
  {
    title: "Java Development",
    slug: "java-development",
    category: "Core Engineering",
    shortDescription: "Learn core Java, Object-Oriented Programming (OOP), Collections Framework, JDBC, Multithreading, and Spring Boot foundations.",
    detailedDescription: "Prepare for enterprise software roles. Master JVM architecture, design patterns, streams API, multithreading, database connectivity, and building REST APIs with Spring Boot.",
    iconName: "Coffee",
    technologies: ["Java 17+", "Spring Boot", "Maven", "MySQL", "JDBC", "Hibernate"],
    skillsCovered: ["OOP Principles", "Design Patterns", "Collections & Generics", "Multithreading", "Spring Boot REST APIs"],
    difficulty: "All Levels",
    prerequisites: ["Basic understanding of programming concepts"],
    learningOutcomes: ["Write clean, object-oriented enterprise code", "Build robust backend microservices with Spring Boot", "Manage relational databases using JDBC and JPA"],
    whoShouldJoin: ["Computer Science / IT students preparing for campus placements"],
    toolsRequired: ["IntelliJ IDEA / Eclipse", "JDK 17+", "MySQL Workbench"],
    isFeatured: true,
    isPopular: true,
    order: 9
  },
  {
    title: "Python Development",
    slug: "python-development",
    category: "Core Engineering",
    shortDescription: "Master Python programming from syntax basics to OOP, file automation, web scraping, and building web apps with Flask & FastAPI.",
    detailedDescription: "A versatile internship covering Python syntax, data structures, functional programming, error handling, automation scripts, and API engineering with FastAPI.",
    iconName: "Code2",
    technologies: ["Python 3.11+", "FastAPI", "Flask", "SQLite", "Requests", "Pytest"],
    skillsCovered: ["Pythonic Code Style", "Object Oriented Design", "API Development", "Automation Scripting", "Testing"],
    difficulty: "Beginner",
    prerequisites: ["No prior experience needed"],
    learningOutcomes: ["Write efficient, modular Python programs", "Build web services and REST APIs with FastAPI", "Automate real-world tasks and data extraction"],
    whoShouldJoin: ["All engineering students, data enthusiasts, and beginners"],
    toolsRequired: ["VS Code / PyCharm", "Python 3.11+"],
    isFeatured: true,
    isPopular: true,
    order: 10
  },
  {
    title: "C++ Programming",
    slug: "cpp-programming",
    category: "Core Engineering",
    shortDescription: "Master modern C++, pointers, memory management, OOP, templates, and the Standard Template Library (STL).",
    detailedDescription: "Deep-dive into systems programming with C++. Understand low-level memory allocation, references, operator overloading, smart pointers, and STL algorithms.",
    iconName: "Terminal",
    technologies: ["C++17/20", "GCC/Clang", "STL", "GDB Debugger"],
    skillsCovered: ["Memory Management", "Pointers & References", "Templates", "STL Containers & Algorithms", "High-Performance Computing"],
    difficulty: "Intermediate",
    prerequisites: ["Basic logic and programming background"],
    learningOutcomes: ["Master memory management without leaks", "Utilize STL for competitive coding and problem-solving", "Build efficient algorithmic solutions"],
    whoShouldJoin: ["Engineering students aiming for product companies and competitive programming"],
    toolsRequired: ["VS Code / CLion", "MinGW / GCC"],
    isFeatured: false,
    isPopular: false,
    order: 11
  },
  {
    title: "Data Structures & Algorithms",
    slug: "data-structures-and-algorithms",
    category: "Core Engineering",
    shortDescription: "Master DSA for technical interviews: Arrays, Linked Lists, Stacks, Queues, Trees, Graphs, Dynamic Programming, and Greedy algorithms.",
    detailedDescription: "Ace technical coding interviews at top tier tech companies. Learn time and space complexity analysis, algorithmic paradigms, recursion, tree traversals, graph algorithms, and DP.",
    iconName: "Binary",
    technologies: ["Java / C++ / Python", "LeetCode / GFG Patterns", "Big-O Analysis"],
    skillsCovered: ["Time & Space Complexity", "Recursion & Backtracking", "Trees & Graphs", "Dynamic Programming", "Interview Problem Solving"],
    difficulty: "All Levels",
    prerequisites: ["Knowledge of at least one programming language (C++, Java, or Python)"],
    learningOutcomes: ["Solve 150+ standard interview DSA problems", "Analyze time and space complexity with precision", "Crack coding assessment rounds confidently"],
    whoShouldJoin: ["College students preparing for software engineering placements and internships"],
    toolsRequired: ["VS Code", "Online IDEs"],
    isFeatured: true,
    isPopular: true,
    order: 12
  },
  {
    title: "UI/UX Design",
    slug: "ui-ux-design",
    category: "Design & Product",
    shortDescription: "Learn user research, wireframing, typography, color psychology, design systems, and interactive prototyping in Figma.",
    detailedDescription: "Transform ideas into intuitive digital experiences. Master design thinking, user persona creation, information architecture, component libraries in Figma, and build an end-to-end case study.",
    iconName: "Palette",
    technologies: ["Figma", "FigJam", "Design Systems", "Prototyping", "Miro"],
    skillsCovered: ["Design Thinking", "User Research", "Wireframing & Prototyping", "Visual Hierarchy", "Design Systems"],
    difficulty: "Beginner",
    prerequisites: ["Curiosity for design and user behavior"],
    learningOutcomes: ["Build complete UI/UX case studies for mobile and web apps", "Master Figma components, auto-layout, and interactive prototypes", "Conduct user testing and synthesize actionable feedback"],
    whoShouldJoin: ["Design enthusiasts, front-end engineers, and product designers"],
    toolsRequired: ["Figma (Free Web Account)"],
    isFeatured: true,
    isPopular: true,
    order: 13
  },
  {
    title: "Data Science",
    slug: "data-science",
    category: "Data Science & AI",
    shortDescription: "Extract actionable insights from raw data using Python, Pandas, NumPy, statistical modeling, Exploratory Data Analysis, and predictive ML.",
    detailedDescription: "A hands-on data science curriculum covering data wrangling, hypothesis testing, statistical inference, feature engineering, and real-world dataset modeling.",
    iconName: "TrendingUp",
    technologies: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "Scikit-Learn", "Jupyter"],
    skillsCovered: ["Exploratory Data Analysis", "Statistical Modeling", "Data Cleaning", "Feature Engineering", "Predictive Modeling"],
    difficulty: "Intermediate",
    prerequisites: ["Basic Python and high school mathematics"],
    learningOutcomes: ["Clean and analyze messy real-world datasets", "Perform rigorous statistical hypothesis tests", "Build end-to-end data science pipelines"],
    whoShouldJoin: ["Students aspiring to work as Data Scientists or Data Analysts"],
    toolsRequired: ["Anaconda / Jupyter Notebook", "Python 3.10+"],
    isFeatured: true,
    isPopular: true,
    order: 14
  },
  {
    title: "Data Analytics",
    slug: "data-analytics",
    category: "Data Science & AI",
    shortDescription: "Master Excel, SQL queries, Power BI / Tableau dashboards, and Python data visualization for data-driven business decisions.",
    detailedDescription: "Learn how data analysts turn numbers into strategic business insights. Master SQL joins and window functions, advanced Excel formulas, pivot tables, and interactive dashboards.",
    iconName: "BarChart3",
    technologies: ["SQL", "Advanced Excel", "Power BI", "Python", "Tableau"],
    skillsCovered: ["SQL Queries & Joins", "Dashboard Design", "KPI Tracking", "Data Storytelling", "Excel Modeling"],
    difficulty: "Beginner",
    prerequisites: ["Basic computer skills"],
    learningOutcomes: ["Write complex SQL queries to extract multi-table data", "Build interactive executive dashboards in Power BI", "Communicate data stories clearly to stakeholders"],
    whoShouldJoin: ["Students from CS, IT, Commerce, and Engineering wanting data analyst careers"],
    toolsRequired: ["Power BI Desktop", "MySQL Workbench", "Microsoft Excel"],
    isFeatured: true,
    isPopular: true,
    order: 15
  },
  {
    title: "Machine Learning",
    slug: "machine-learning",
    category: "Data Science & AI",
    shortDescription: "Build, evaluate, and tune supervised and unsupervised ML algorithms: Regression, Classification, Random Forests, SVMs, and XGBoost.",
    detailedDescription: "Master machine learning math, algorithms, evaluation metrics (ROC-AUC, F1-score), cross-validation, hyperparameter tuning, and pipeline deployment.",
    iconName: "Brain",
    technologies: ["Python", "Scikit-Learn", "NumPy", "Pandas", "XGBoost", "Streamlit"],
    skillsCovered: ["Supervised Learning", "Unsupervised Learning", "Model Evaluation & Tuning", "Feature Selection", "ML Model Deployment"],
    difficulty: "Intermediate",
    prerequisites: ["Python fundamentals and basic linear algebra"],
    learningOutcomes: ["Train and tune state-of-the-art ML models", "Deploy machine learning web applications using Streamlit", "Evaluate models using industry validation metrics"],
    whoShouldJoin: ["Engineers looking to specialize in Artificial Intelligence and Machine Learning"],
    toolsRequired: ["Jupyter Notebook", "Python 3.10+"],
    isFeatured: true,
    isPopular: true,
    order: 16
  },
  {
    title: "Artificial Intelligence",
    slug: "artificial-intelligence",
    category: "Data Science & AI",
    shortDescription: "Explore Neural Networks, Deep Learning with PyTorch, Computer Vision, and Natural Language Processing fundamentals.",
    detailedDescription: "Learn how modern AI systems perceive and reason. Study perceptrons, multi-layer neural networks, backpropagation, CNNs for computer vision, and transformers.",
    iconName: "Sparkles",
    technologies: ["PyTorch", "TensorFlow", "OpenCV", "Hugging Face", "Python"],
    skillsCovered: ["Deep Neural Networks", "Computer Vision (CNN)", "NLP Basics", "Transfer Learning", "AI Pipeline Construction"],
    difficulty: "Advanced",
    prerequisites: ["Python proficiency and basic Machine Learning concepts"],
    learningOutcomes: ["Build and train neural networks using PyTorch", "Apply computer vision techniques to images and video feeds", "Fine-tune pretrained deep learning models"],
    whoShouldJoin: ["Students aiming for AI research and applied AI engineering careers"],
    toolsRequired: ["Google Colab / Jupyter", "Python 3.10+"],
    isFeatured: false,
    isPopular: true,
    order: 17
  },
  {
    title: "Generative AI",
    slug: "generative-ai",
    category: "Data Science & AI",
    shortDescription: "Build LLM applications using OpenAI APIs, LangChain, LlamaIndex, Retrieval-Augmented Generation (RAG), and Vector Databases.",
    detailedDescription: "Harness the power of Large Language Models. Build AI agents, context-aware document chat systems using RAG, embeddings, Pinecone/Chroma vector search, and function calling.",
    iconName: "Bot",
    technologies: ["LangChain", "OpenAI / Claude APIs", "ChromaDB", "Pinecone", "Python", "Streamlit"],
    skillsCovered: ["RAG Architecture", "Vector Embeddings", "Prompt Chaining", "Agentic Workflows", "LLM Fine-tuning Concepts"],
    difficulty: "Intermediate",
    prerequisites: ["Python programming and basic API familiarity"],
    learningOutcomes: ["Build custom document Q&A systems using RAG", "Create autonomous AI agents with tool use", "Integrate LLM APIs into production applications"],
    whoShouldJoin: ["Developers wanting to lead in modern AI-powered software development"],
    toolsRequired: ["VS Code", "Python 3.10+"],
    isFeatured: true,
    isPopular: true,
    order: 18
  },
  {
    title: "Prompt Engineering",
    slug: "prompt-engineering",
    category: "Data Science & AI",
    shortDescription: "Master systematic prompting techniques: Few-shot, Chain-of-Thought, ReAct, system instruction design, and AI workflow optimization.",
    detailedDescription: "Learn the science and art of getting deterministic, high-quality results from generative models. Master structured outputs, temperature controls, role-prompting, and evaluation benchmarks.",
    iconName: "MessageSquareCode",
    technologies: ["ChatGPT", "Claude", "Gemini", "OpenAI Playground", "Python"],
    skillsCovered: ["Few-Shot Prompting", "Chain-of-Thought (CoT)", "Structured Output Extraction", "Prompt Evaluation", "Context Optimization"],
    difficulty: "Beginner",
    prerequisites: ["No coding required, logical reasoning skills"],
    learningOutcomes: ["Construct complex prompts for accurate task automation", "Design system instructions for AI customer support and data extraction", "Reduce LLM hallucinations significantly"],
    whoShouldJoin: ["Anyone wishing to maximize productivity and AI system output"],
    toolsRequired: ["Web browser and LLM playground access"],
    isFeatured: false,
    isPopular: false,
    order: 19
  },
  {
    title: "Cyber Security",
    slug: "cyber-security",
    category: "Security & Cloud",
    shortDescription: "Learn network security, ethical hacking fundamentals, OWASP Top 10 web vulnerabilities, cryptography, and defensive analysis.",
    detailedDescription: "Understand offensive and defensive cybersecurity principles. Perform penetration testing basics on laboratory targets, secure web applications, and analyze network packets with Wireshark.",
    iconName: "ShieldCheck",
    technologies: ["Kali Linux", "Wireshark", "Burp Suite", "Nmap", "Metasploit Basics"],
    skillsCovered: ["Network Scanning", "OWASP Top 10", "Vulnerability Assessment", "Cryptography Basics", "Defensive Hardening"],
    difficulty: "Intermediate",
    prerequisites: ["Foundations of computer networking and OS"],
    learningOutcomes: ["Identify and remediate critical web vulnerabilities", "Analyze network traffic for anomalous behaviors", "Understand ethical security compliance and posture"],
    whoShouldJoin: ["Students targeting cybersecurity, infosec, and ethical hacking roles"],
    toolsRequired: ["VirtualBox / VMware", "Kali Linux", "Wireshark"],
    isFeatured: true,
    isPopular: true,
    order: 20
  },
  {
    title: "Cloud Computing",
    slug: "cloud-computing",
    category: "Security & Cloud",
    shortDescription: "Master Amazon Web Services (AWS) core services: EC2, S3, RDS, Lambda, IAM, VPC, and serverless architectures.",
    detailedDescription: "Gain practical skills in architecting reliable cloud infrastructure. Learn compute provisioning, object storage, managed relational databases, IAM role isolation, and billing management.",
    iconName: "Cloud",
    technologies: ["AWS (EC2, S3, Lambda, RDS, IAM)", "CloudWatch", "Linux CLI", "Terraform Basics"],
    skillsCovered: ["Cloud Architecture", "Identity & Access Management", "Serverless Computing", "VPC Networking", "Cost Optimization"],
    difficulty: "Intermediate",
    prerequisites: ["Basic operating system and networking concepts"],
    learningOutcomes: ["Deploy resilient cloud web architectures on AWS", "Configure secure network topologies and IAM policies", "Set up serverless applications and automated backups"],
    whoShouldJoin: ["Students preparing for AWS Cloud Practitioner or Solutions Architect certifications"],
    toolsRequired: ["AWS Free Tier Account", "Terminal / CLI"],
    isFeatured: true,
    isPopular: true,
    order: 21
  },
  {
    title: "DevOps",
    slug: "devops",
    category: "Security & Cloud",
    shortDescription: "Automate software delivery with Docker containers, CI/CD pipelines via GitHub Actions, Kubernetes fundamentals, and Linux administration.",
    detailedDescription: "Bridge development and IT operations. Build multi-stage Dockerfiles, compose multi-container stacks, write automated test & deploy pipelines in GitHub Actions, and explore cluster orchestration.",
    iconName: "Workflow",
    technologies: ["Docker", "Kubernetes", "GitHub Actions", "Linux", "Nginx", "Terraform"],
    skillsCovered: ["Containerization", "CI/CD Automation", "Infrastructure as Code", "Reverse Proxying", "Monitoring & Logs"],
    difficulty: "Advanced",
    prerequisites: ["Familiarity with Git and basic command line"],
    learningOutcomes: ["Containerize legacy and modern applications with Docker", "Build automated CI/CD deployment pipelines", "Configure Nginx reverse proxies and SSL certificates"],
    whoShouldJoin: ["Developers and system administrators aiming for DevOps & SRE positions"],
    toolsRequired: ["Docker Desktop", "Linux Terminal", "Git"],
    isFeatured: true,
    isPopular: true,
    order: 22
  },
  {
    title: "Android Development",
    slug: "android-development",
    category: "Mobile Development",
    shortDescription: "Build native Android mobile applications with Kotlin, Jetpack Compose, ViewModel, Retrofit, and Room database.",
    detailedDescription: "Master modern Android engineering using Kotlin. Create beautiful user interfaces with Jetpack Compose, handle offline caching with Room, and consume backend APIs with Retrofit.",
    iconName: "Smartphone",
    technologies: ["Kotlin", "Android Studio", "Jetpack Compose", "Retrofit", "Room DB", "Coroutines"],
    skillsCovered: ["Native UI with Compose", "MVVM Architecture", "Asynchronous Coroutines", "Local Storage & Caching", "API Networking"],
    difficulty: "Intermediate",
    prerequisites: ["Core Java or Kotlin object-oriented programming concepts"],
    learningOutcomes: ["Build production-grade native Android applications", "Implement clean MVVM architecture with Kotlin coroutines", "Publish apps to Google Play Store standards"],
    whoShouldJoin: ["Engineering students wanting native Android app development careers"],
    toolsRequired: ["Android Studio", "JDK 17"],
    isFeatured: false,
    isPopular: false,
    order: 23
  },
  {
    title: "React Native Development",
    slug: "react-native-development",
    category: "Mobile Development",
    shortDescription: "Develop cross-platform iOS and Android apps using React Native, Expo, React Navigation, NativeWind, and device APIs.",
    detailedDescription: "Leverage your React skills to ship native iOS and Android apps with a single codebase. Master Expo workflows, camera/location hardware access, push notifications, and native styling.",
    iconName: "TabletSmartphone",
    technologies: ["React Native", "Expo", "TypeScript", "React Navigation", "AsyncStorage"],
    skillsCovered: ["Cross-Platform UI", "Device Hardware Integration", "State Management", "Native Navigation", "App Performance"],
    difficulty: "Intermediate",
    prerequisites: ["React and JavaScript fundamentals"],
    learningOutcomes: ["Build full-featured mobile apps for iOS & Android with Expo", "Implement native device features like geolocation and camera", "Deploy apps to test devices and app stores"],
    whoShouldJoin: ["Web and React developers stepping into mobile app development"],
    toolsRequired: ["Node.js", "Expo Go on smartphone", "VS Code"],
    isFeatured: true,
    isPopular: true,
    order: 24
  },
  {
    title: "Flutter Development",
    slug: "flutter-development",
    category: "Mobile Development",
    shortDescription: "Build fast, expressive cross-platform mobile apps for Android & iOS using Google's Flutter framework and Dart language.",
    detailedDescription: "Learn Dart programming, Flutter widget trees, state management with Riverpod/Provider, REST API integration, and Firebase backend synchronization.",
    iconName: "SmartphoneNfc",
    technologies: ["Flutter", "Dart", "Firebase", "Provider / Riverpod", "REST APIs"],
    skillsCovered: ["Widget Tree Composition", "State Management", "Firebase Integration", "Animations", "Responsive App UI"],
    difficulty: "Beginner",
    prerequisites: ["Basic understanding of Object-Oriented Programming"],
    learningOutcomes: ["Build polished cross-platform apps with 60 FPS animations", "Integrate Firebase auth, Firestore, and storage", "Manage complex application states cleanly"],
    whoShouldJoin: ["Students who want to build multi-platform apps quickly"],
    toolsRequired: ["Flutter SDK", "VS Code / Android Studio"],
    isFeatured: false,
    isPopular: true,
    order: 25
  },
  {
    title: "Database Management",
    slug: "database-management",
    category: "Data & Systems",
    shortDescription: "Learn database theory, normalization (1NF to BCNF), ER diagrams, ACID properties, transactions, and indexing strategies.",
    detailedDescription: "Understand the core foundations of database management systems (DBMS). Master entity relationship modeling, relational algebra, indexing techniques, query execution plans, and concurrency control.",
    iconName: "Database",
    technologies: ["MySQL", "PostgreSQL", "ERWin", "DBeaver", "SQL"],
    skillsCovered: ["Database Normalization", "ER Modeling", "ACID & Concurrency", "Indexing & Query Optimization", "Transaction Isolation"],
    difficulty: "All Levels",
    prerequisites: ["Basic logic and data organization concepts"],
    learningOutcomes: ["Design normalized, anomaly-free database schemas", "Optimize query performance using indexes and execution plans", "Manage transactional consistency in distributed systems"],
    whoShouldJoin: ["B.Tech/MCA students preparing for database coursework and job exams"],
    toolsRequired: ["MySQL Workbench / DBeaver"],
    isFeatured: false,
    isPopular: false,
    order: 26
  },
  {
    title: "SQL",
    slug: "sql",
    category: "Data & Systems",
    shortDescription: "Master SQL from SELECT queries to complex JOINs, subqueries, CTEs, Window functions, and stored procedures in PostgreSQL and MySQL.",
    detailedDescription: "A dedicated practical SQL internship. Write production SQL queries, perform analytics with window functions, manage schema migrations, and write stored procedures.",
    iconName: "Table",
    technologies: ["PostgreSQL", "MySQL", "DBeaver", "pgAdmin"],
    skillsCovered: ["Complex Joins", "Window Functions (RANK, LEAD, LAG)", "Common Table Expressions (CTEs)", "Stored Procedures & Triggers", "Query Tuning"],
    difficulty: "Beginner",
    prerequisites: ["None"],
    learningOutcomes: ["Write advanced analytical queries for data manipulation", "Use window functions for time-series and ranking operations", "Optimize query latency on large datasets"],
    whoShouldJoin: ["Aspiring data analysts, backend engineers, and business analysts"],
    toolsRequired: ["pgAdmin / MySQL Workbench"],
    isFeatured: false,
    isPopular: true,
    order: 27
  },
  {
    title: "MongoDB",
    slug: "mongodb",
    category: "Data & Systems",
    shortDescription: "Deep-dive into NoSQL document data modeling, aggregation pipelines, replica sets, sharding concepts, and Mongoose ORM.",
    detailedDescription: "Master non-relational database design for high-scale applications. Learn schema modeling patterns (one-to-many, polymorphic), aggregation pipelines, indexes, and Atlas cloud clusters.",
    iconName: "FolderGit2",
    technologies: ["MongoDB Atlas", "Mongoose", "MongoDB Compass", "Node.js"],
    skillsCovered: ["Document Modeling", "Aggregation Framework", "Text & Geospatial Search", "Compound Indexes", "Data Validation Rules"],
    difficulty: "Intermediate",
    prerequisites: ["Basic JSON and JavaScript fundamentals"],
    learningOutcomes: ["Design scalable document schemas avoiding unbounded growth", "Build complex analytics using the MongoDB Aggregation Pipeline", "Configure secure MongoDB Atlas clusters"],
    whoShouldJoin: ["Full-stack and backend developers using NoSQL databases"],
    toolsRequired: ["MongoDB Compass", "Node.js"],
    isFeatured: false,
    isPopular: false,
    order: 28
  },
  {
    title: "Internet of Things",
    slug: "internet-of-things",
    category: "Hardware & Systems",
    shortDescription: "Explore embedded systems, ESP32 / Arduino prototyping, sensor integration, MQTT protocol, and IoT cloud dashboards.",
    detailedDescription: "Connect physical hardware to the web. Learn microcontroller programming in C/C++, read analogue/digital sensors, transmit telemetry via MQTT/HTTP, and create cloud dashboards.",
    iconName: "Wifi",
    technologies: ["ESP32 / ESP8266", "Arduino IDE", "MQTT", "Node-RED", "ThingSpeak / Adafruit IO"],
    skillsCovered: ["Sensor Interfacing", "Embedded C++", "MQTT Protocol", "IoT Cloud Platforms", "Edge Computing Basics"],
    difficulty: "Intermediate",
    prerequisites: ["Basic C/C++ or Python and electronics curiosity"],
    learningOutcomes: ["Build smart home and remote monitoring prototypes", "Send and visualize sensor data securely across the internet", "Understand IoT communication protocols like MQTT & CoAP"],
    whoShouldJoin: ["ECE, EEE, and CS engineering students interested in IoT hardware"],
    toolsRequired: ["Arduino IDE / Wokwi Simulator"],
    isFeatured: false,
    isPopular: false,
    order: 29
  },
  {
    title: "Blockchain Development",
    slug: "blockchain-development",
    category: "Emerging Tech",
    shortDescription: "Learn Ethereum fundamentals, Solidity smart contracts, Web3.js / Ethers.js, decentralized finance (DeFi) patterns, and Hardhat testing.",
    detailedDescription: "Build decentralized applications (dApps). Understand consensus mechanisms, smart contract security, ERC-20 and ERC-721 token standards, and connect web frontends with MetaMask.",
    iconName: "Boxes",
    technologies: ["Solidity", "Hardhat", "Ethers.js", "MetaMask", "Ethereum / Polygon"],
    skillsCovered: ["Smart Contract Development", "ERC-20 / ERC-721 Tokens", "Web3 Frontend Integration", "Gas Optimization", "Security Auditing Basics"],
    difficulty: "Advanced",
    prerequisites: ["Proficiency in JavaScript/TypeScript and web development basics"],
    learningOutcomes: ["Write and deploy audited Solidity smart contracts", "Build dApp frontends that interact with Web3 wallets", "Test and simulate contract deployments on testnets"],
    whoShouldJoin: ["Developers eager to explore Web3 and decentralized technologies"],
    toolsRequired: ["VS Code", "MetaMask Extension", "Node.js"],
    isFeatured: false,
    isPopular: false,
    order: 30
  },
  {
    title: "Software Testing",
    slug: "software-testing",
    category: "Quality Assurance",
    shortDescription: "Learn manual testing methodologies, SDLC/STLC phases, test case authoring, bug lifecycle management, and regression testing.",
    detailedDescription: "Master software quality principles. Understand functional, non-functional, integration, black-box, and white-box testing, write thorough test plans, and report defects with Jira.",
    iconName: "CheckCheck",
    technologies: ["Jira", "Postman", "TestRail", "Bugzilla"],
    skillsCovered: ["Test Case Design", "Bug Life Cycle", "STLC & SDLC", "API Testing with Postman", "Defect Reporting"],
    difficulty: "Beginner",
    prerequisites: ["No prior coding required"],
    learningOutcomes: ["Write industry-standard test cases and scenarios", "Perform API validation using Postman", "Manage and track defect lifecycles in Jira"],
    whoShouldJoin: ["Freshers and students seeking QA and software tester roles"],
    toolsRequired: ["Postman", "Web browser"],
    isFeatured: false,
    isPopular: false,
    order: 31
  },
  {
    title: "QA Automation",
    slug: "qa-automation",
    category: "Quality Assurance",
    shortDescription: "Automate web and API tests using Selenium WebDriver, Cypress / Playwright, TestNG / Pytest, and CI integration.",
    detailedDescription: "Transform manual testing into automated test suites. Master Page Object Model (POM), selector strategies, assertions, parallel test execution, and CI test reports.",
    iconName: "Inspect",
    technologies: ["Playwright", "Selenium", "Cypress", "JavaScript / Python", "GitHub Actions"],
    skillsCovered: ["E2E Test Automation", "Page Object Model", "Automated API Testing", "Headless Browser Testing", "CI/CD Test Runners"],
    difficulty: "Intermediate",
    prerequisites: ["Basic knowledge of JavaScript or Python"],
    learningOutcomes: ["Build end-to-end test automation frameworks with Playwright", "Run automated test suites within CI/CD pipelines", "Generate comprehensive test execution reports"],
    whoShouldJoin: ["Manual testers and engineers seeking QA automation engineer positions"],
    toolsRequired: ["VS Code", "Node.js"],
    isFeatured: false,
    isPopular: true,
    order: 32
  },
  {
    title: "Digital Marketing",
    slug: "digital-marketing",
    category: "Marketing & Growth",
    shortDescription: "Learn search engine marketing, social media campaigns, email automation, performance marketing, and Google Analytics (GA4).",
    detailedDescription: "Gain practical skills to drive customer acquisition. Master meta ads, Google search ads, conversion rate optimization (CRO), email drip campaigns, and funnel analytics.",
    iconName: "Megaphone",
    technologies: ["Google Analytics 4", "Google Ads", "Meta Ads Manager", "Mailchimp", "Canva"],
    skillsCovered: ["Paid Ad Campaign Setup", "Conversion Funnels", "GA4 Event Tracking", "Email Marketing Automation", "Content Strategy"],
    difficulty: "Beginner",
    prerequisites: ["Basic computer and internet literacy"],
    learningOutcomes: ["Launch and optimize high-converting digital advertising campaigns", "Track user funnels with Google Analytics 4", "Build automated email marketing workflows"],
    whoShouldJoin: ["Students interested in digital marketing, growth, and tech startups"],
    toolsRequired: ["Web browser"],
    isFeatured: false,
    isPopular: false,
    order: 33
  },
  {
    title: "SEO (Search Engine Optimization)",
    slug: "seo",
    category: "Marketing & Growth",
    shortDescription: "Master technical SEO, keyword research, on-page optimization, backlink strategies, site audits, and Core Web Vitals.",
    detailedDescription: "Rank websites on top of search engine result pages. Learn keyword intent analysis, schema markup, Core Web Vitals optimization, site speed improvements, and organic link building.",
    iconName: "Search",
    technologies: ["Google Search Console", "Ahrefs / SEMrush Basics", "Screaming Frog", "PageSpeed Insights"],
    skillsCovered: ["Keyword Research", "Technical SEO Audits", "On-Page Content Optimization", "Core Web Vitals", "Structured Data Markup"],
    difficulty: "Beginner",
    prerequisites: ["Basic understanding of how websites work"],
    learningOutcomes: ["Perform end-to-end technical SEO audits", "Optimize content and meta-tags to rank for targeted keywords", "Diagnose and fix indexing and Core Web Vitals issues"],
    whoShouldJoin: ["Web developers, digital marketers, and content creators"],
    toolsRequired: ["Google Search Console", "Web browser"],
    isFeatured: false,
    isPopular: false,
    order: 34
  },
  {
    title: "Graphic Designing",
    slug: "graphic-designing",
    category: "Design & Product",
    shortDescription: "Learn visual communication, typography, branding, poster design, social media creatives, and vector illustration with Photoshop & Illustrator.",
    detailedDescription: "Master the fundamentals of visual aesthetics and commercial design. Create brand identities, marketing assets, vector graphics, and digital compositions.",
    iconName: "PenTool",
    technologies: ["Adobe Photoshop", "Adobe Illustrator", "Canva Pro", "Figma"],
    skillsCovered: ["Visual Composition", "Color Harmony", "Typography & Hierarchy", "Brand Identity Design", "Social Media Graphics"],
    difficulty: "Beginner",
    prerequisites: ["Passion for visual arts and design"],
    learningOutcomes: ["Design professional brand guidelines and logos", "Create high-impact marketing and social media graphics", "Prepare print-ready and web-optimized asset packages"],
    whoShouldJoin: ["Creative students wanting to build freelance or agency design portfolios"],
    toolsRequired: ["Photoshop / Illustrator or Canva"],
    isFeatured: false,
    isPopular: false,
    order: 35
  },
  {
    title: "WordPress Development",
    slug: "wordpress-development",
    category: "Web Development",
    shortDescription: "Build custom business websites, e-commerce stores with WooCommerce, custom themes, Elementor layouts, and plugin setups.",
    detailedDescription: "Master the world's most popular content management system. Learn custom theme structure, WooCommerce checkout flows, security hardening, and performance caching.",
    iconName: "FileCode",
    technologies: ["WordPress", "WooCommerce", "Elementor", "PHP Basics", "MySQL"],
    skillsCovered: ["Custom CMS Setup", "WooCommerce E-Commerce", "Page Builders & Custom CSS", "WordPress Security", "Speed Optimization"],
    difficulty: "Beginner",
    prerequisites: ["Basic HTML/CSS is helpful"],
    learningOutcomes: ["Build e-commerce and corporate websites in WordPress", "Configure payment gateways and product catalogs with WooCommerce", "Implement speed caching and security plugins"],
    whoShouldJoin: ["Students looking for quick freelancing and agency web development opportunities"],
    toolsRequired: ["Local by Flywheel / XAMPP", "Web Browser"],
    isFeatured: false,
    isPopular: false,
    order: 36
  },
  {
    title: "Git & GitHub",
    slug: "git-and-github",
    category: "Core Engineering",
    shortDescription: "Master version control: branching strategies, merge conflicts, pull requests, interactive rebasing, GitHub workflows, and team collaboration.",
    detailedDescription: "Become proficient with the developer's primary tool. Learn git commit history, cherry-picking, stashing, pull request reviews, GitHub Issues, and branch protection rules.",
    iconName: "GitBranch",
    technologies: ["Git CLI", "GitHub", "GitHub CLI", "VS Code GitLens"],
    skillsCovered: ["Branching & Merging", "Resolving Merge Conflicts", "Rebase & Cherry-Pick", "GitHub PR Workflows", "Open Source Contribution"],
    difficulty: "Beginner",
    prerequisites: ["None"],
    learningOutcomes: ["Navigate complex Git branches and resolve merge conflicts smoothly", "Follow standard team Git workflows and pull request reviews", "Contribute confidently to open-source software repositories"],
    whoShouldJoin: ["Every engineering student wanting to work like a professional software engineer"],
    toolsRequired: ["Git", "GitHub Account", "VS Code"],
    isFeatured: false,
    isPopular: true,
    order: 37
  },
  {
    title: "API Development",
    slug: "api-development",
    category: "Web Development",
    shortDescription: "Design, document, and test scalable REST and GraphQL APIs: OpenAPI/Swagger, rate limiting, authentication, caching, and Postman testing.",
    detailedDescription: "Specialize in the backbone of modern web applications. Learn API design best practices, versioning, pagination patterns, rate-limiting, Swagger documentation, and automated test collections.",
    iconName: "Network",
    technologies: ["Postman", "OpenAPI / Swagger", "Node.js", "Express", "GraphQL Basics"],
    skillsCovered: ["RESTful Standards", "API Documentation (Swagger)", "Authentication (Bearer/OAuth)", "Pagination & Filtering", "Automated Postman Tests"],
    difficulty: "Intermediate",
    prerequisites: ["Familiarity with any backend programming language"],
    learningOutcomes: ["Design industry-standard RESTful APIs", "Generate automated OpenAPI interactive documentation", "Write comprehensive automated API test suites in Postman"],
    whoShouldJoin: ["Backend developers and full-stack software engineers"],
    toolsRequired: ["Postman", "VS Code"],
    isFeatured: false,
    isPopular: false,
    order: 38
  },
  {
    title: "TypeScript Development",
    slug: "typescript-development",
    category: "Web Development",
    shortDescription: "Master static typing in JavaScript: Generics, utility types, interfaces, type narrowing, tsconfig optimizations, and full-stack typing.",
    detailedDescription: "Elevate your JavaScript code to enterprise standards. Learn strict types, union & intersection types, mapped types, declaration files, and integrate TypeScript with React and Node.js.",
    iconName: "FileCheck",
    technologies: ["TypeScript 5+", "Node.js", "TS-Node", "ESLint"],
    skillsCovered: ["Static Type Systems", "Generics & Utility Types", "Type Narrowing & Guards", "Declaration Files (.d.ts)", "React with TypeScript"],
    difficulty: "Intermediate",
    prerequisites: ["JavaScript fundamentals"],
    learningOutcomes: ["Write bug-free, self-documenting typed JavaScript applications", "Use complex Generics and conditional types effectively", "Migrate untyped JavaScript codebases to strict TypeScript"],
    whoShouldJoin: ["Frontend and backend developers wanting robust type safety in their code"],
    toolsRequired: ["VS Code", "Node.js"],
    isFeatured: false,
    isPopular: true,
    order: 39
  },
  {
    title: "Computer Fundamentals",
    slug: "computer-fundamentals",
    category: "Core Engineering",
    shortDescription: "Build deep foundations in Operating Systems, Computer Networks, Database concepts, and Computer Architecture.",
    detailedDescription: "Master core computer science university subjects: CPU scheduling, virtual memory, TCP/IP stack, OSI layers, DNS, relational database design, and boolean algebra.",
    iconName: "Laptop",
    technologies: ["Linux CLI", "Wireshark", "C/C++ Simulation", "OS / CN Theory"],
    skillsCovered: ["OS Memory & Process Management", "TCP/IP & OSI Networking", "Computer Architecture Basics", "File Systems", "Technical Placement Prep"],
    difficulty: "Beginner",
    prerequisites: ["None"],
    learningOutcomes: ["Understand low-level computer operations and OS kernels", "Explain networking protocols and socket communication clearly", "Ace core CS placement interview questions"],
    whoShouldJoin: ["First/second year college students and non-CS background learners"],
    toolsRequired: ["Linux Terminal / VM"],
    isFeatured: false,
    isPopular: false,
    order: 40
  }
];

export const sampleCurriculums: Record<string, {
  modules: Array<{
    title: string;
    description: string;
    estimatedHours: number;
    lessons: Array<{
      title: string;
      description: string;
      contentType: 'video' | 'article' | 'pdf' | 'code';
      videoUrl?: string;
      articleContent?: string;
      durationMinutes: number;
      unlockDay: number;
      codeSnippet?: { language: string; code: string; filename: string };
    }>;
    assignment?: {
      title: string;
      description: string;
      instructions: string;
      requirements: string[];
      maxScore: number;
    };
    project?: {
      title: string;
      description: string;
      requirements: string[];
      technologies: string[];
      maxMarks: number;
      isCapstone?: boolean;
    };
    quiz?: {
      title: string;
      description: string;
      questions: Array<{
        question: string;
        options: string[];
        correctAnswer: number;
        explanation: string;
      }>;
    };
  }>;
}> = {
  "mern-stack-development": {
    modules: [
      {
        title: "Module 1: Web Development & Architecture Fundamentals",
        description: "Understanding client-server model, HTTP/HTTPS, browser engines, Git version control, and development setup.",
        estimatedHours: 6,
        lessons: [
          {
            title: "How Websites Work: Client vs Server Architecture",
            description: "Deep dive into request-response lifecycle, DNS resolution, and HTTP methods.",
            contentType: "video",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            durationMinutes: 18,
            unlockDay: 1,
            articleContent: "Web applications operate on a distributed client-server paradigm. The client (browser) initiates requests via HTTP/HTTPS, and the server processes the request and sends back HTML, JSON, or media assets."
          },
          {
            title: "Setting up Modern Development Environment (VS Code, Node.js, Git)",
            description: "Configure VS Code with essential extensions, Node.js v20 LTS, and Git identity.",
            contentType: "code",
            durationMinutes: 20,
            unlockDay: 2,
            codeSnippet: {
              language: "bash",
              filename: "setup.sh",
              code: "# Verify environment setup\nnode -v\nnpm -v\ngit --version\ngit config --global user.name 'Your Name'\ngit config --global user.email 'you@example.com'"
            }
          }
        ],
        quiz: {
          title: "Module 1 Assessment: Web Basics & Git",
          description: "Test your understanding of HTTP protocols, status codes, and basic Git commands.",
          questions: [
            {
              question: "Which HTTP status code signifies that a resource was successfully created on the server?",
              options: ["200 OK", "201 Created", "204 No Content", "301 Moved Permanently"],
              correctAnswer: 1,
              explanation: "HTTP 201 Created is the standard response indicating that the request succeeded and led to the creation of a resource."
            },
            {
              question: "What does the command 'git commit -m' do?",
              options: [
                "Uploads code to GitHub",
                "Records changes to the local repository with a descriptive message",
                "Downloads changes from remote",
                "Discards all uncommitted changes"
              ],
              correctAnswer: 1,
              explanation: "git commit creates a snapshot of staged changes into the local git repository history."
            }
          ]
        }
      },
      {
        title: "Module 2: Advanced JavaScript (ES6+) for Modern Web",
        description: "Master closures, event loop, Promises, Async/Await, and functional array methods.",
        estimatedHours: 8,
        lessons: [
          {
            title: "Asynchronous JavaScript: Event Loop, Microtasks & Promises",
            description: "Detailed walkthrough of JavaScript single-threaded concurrency and Promise lifecycle.",
            contentType: "article",
            durationMinutes: 25,
            unlockDay: 3,
            articleContent: "JavaScript utilizes an event loop to handle non-blocking asynchronous operations. The Call Stack executes synchronous code, while microtasks (Promises) and macrotasks (setTimeout) are queued in their respective task queues."
          },
          {
            title: "ES6+ Modern Syntax: Destructuring, Spread, Modules & Map/Filter/Reduce",
            description: "Write concise, readable, and immutable JavaScript code.",
            contentType: "code",
            durationMinutes: 22,
            unlockDay: 4,
            codeSnippet: {
              language: "javascript",
              filename: "functional-js.js",
              code: "const students = [\n  { name: 'Aarav', score: 88, active: true },\n  { name: 'Pooja', score: 94, active: true },\n  { name: 'Rohan', score: 62, active: false },\n];\n\nconst topStudentNames = students\n  .filter(s => s.active && s.score >= 80)\n  .map(s => s.name);\n\nconsole.log(topStudentNames); // ['Aarav', 'Pooja']"
            }
          }
        ],
        assignment: {
          title: "Assignment 1: Asynchronous Task Manager Library",
          description: "Build a robust JavaScript utility that fetches paginated data from an API, handles network errors gracefully with retry logic, and filters results.",
          instructions: "Create a GitHub repository with clean modular ES6 code. Include unit tests or demonstration script in an index.js file.",
          requirements: [
            "Use async/await with try/catch error handling",
            "Implement retry logic up to 3 times on network failure",
            "Write modular functions with JSDoc comments",
            "Submit your public GitHub repository URL"
          ],
          maxScore: 100
        }
      },
      {
        title: "Module 3: React.js Component Architecture & State Management",
        description: "Build modular UIs with React functional components, useState, useEffect, custom hooks, and Tailwind CSS.",
        estimatedHours: 10,
        lessons: [
          {
            title: "React Fundamentals: JSX, Props, and State Mechanics",
            description: "Understand the Virtual DOM, reconciliation, and unidirectional data flow.",
            contentType: "video",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            durationMinutes: 28,
            unlockDay: 5
          },
          {
            title: "Mastering useEffect & Custom Hooks for API Data Fetching",
            description: "Avoid memory leaks, race conditions, and unnecessary re-renders in React hooks.",
            contentType: "code",
            durationMinutes: 24,
            unlockDay: 6,
            codeSnippet: {
              language: "javascript",
              filename: "useFetch.js",
              code: "import { useState, useEffect } from 'react';\n\nexport function useFetch(url) {\n  const [data, setData] = useState(null);\n  const [loading, setLoading] = useState(true);\n  const [error, setError] = useState(null);\n\n  useEffect(() => {\n    let isMounted = true;\n    setLoading(true);\n    fetch(url)\n      .then(res => res.json())\n      .then(json => { if (isMounted) setData(json); })\n      .catch(err => { if (isMounted) setError(err.message); })\n      .finally(() => { if (isMounted) setLoading(false); });\n    return () => { isMounted = false; };\n  }, [url]);\n\n  return { data, loading, error };\n}"
            }
          }
        ],
        project: {
          title: "Mini Project: Real-time Tech Product Catalog & Cart",
          description: "Build a responsive React application featuring product search, category filtering, cart management using Context API or Zustand, and responsive design.",
          requirements: [
            "Responsive layout across mobile and desktop",
            "Search and instant category filters",
            "Persist shopping cart items in localStorage",
            "Deploy to Vercel/Netlify with live URL"
          ],
          technologies: ["React.js", "Tailwind CSS", "Lucide React", "Vercel"],
          maxMarks: 100
        }
      },
      {
        title: "Module 4: Node.js & Express RESTful API Engineering",
        description: "Design modular backend servers, Express middleware, request validation, and error-handling pipelines.",
        estimatedHours: 10,
        lessons: [
          {
            title: "Express Server Architecture: Controllers, Routes, and Services",
            description: "Organize backend code cleanly following MVC principles.",
            contentType: "article",
            durationMinutes: 30,
            unlockDay: 7,
            articleContent: "Structuring Express code into clear layers (Routes -> Controllers -> Services -> Models) ensures code readability, easy unit testing, and team scalability."
          },
          {
            title: "Global Error Handling Middleware and Zod Validation in Express",
            description: "Catch errors globally and return standardized JSON error envelopes.",
            contentType: "code",
            durationMinutes: 25,
            unlockDay: 8,
            codeSnippet: {
              language: "javascript",
              filename: "errorHandler.js",
              code: "export const errorHandler = (err, req, res, next) => {\n  const statusCode = err.statusCode || 500;\n  return res.status(statusCode).json({\n    success: false,\n    message: err.message || 'Internal Server Error',\n    stack: process.env.NODE_ENV === 'production' ? null : err.stack,\n  });\n};"
            }
          }
        ]
      },
      {
        title: "Module 5: MongoDB Schema Design & Mongoose ORM",
        description: "Model complex relationships, write aggregation pipelines, and index database collections for query speed.",
        estimatedHours: 8,
        lessons: [
          {
            title: "Mongoose Schema Design: 1-to-N Relationships, Population & Indexing",
            description: "Design schemas for users, products, orders, and reviews.",
            contentType: "video",
            videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
            durationMinutes: 26,
            unlockDay: 9
          },
          {
            title: "MongoDB Aggregation Pipeline: $match, $group, $lookup, and $project",
            description: "Run complex analytical queries inside MongoDB engine directly.",
            contentType: "code",
            durationMinutes: 22,
            unlockDay: 10,
            codeSnippet: {
              language: "javascript",
              filename: "aggregation.js",
              code: "const analytics = await Order.aggregate([\n  { $match: { paymentStatus: 'paid' } },\n  { $group: {\n      _id: '$program',\n      totalRevenue: { $sum: '$finalAmount' },\n      totalStudents: { $sum: 1 },\n    }\n  },\n  { $sort: { totalRevenue: -1 } }\n]);"
            }
          }
        ]
      },
      {
        title: "Module 6: Security, JWT Authentication & Protected Routes",
        description: "Implement secure registration, bcrypt password hashing, JWT cookies, and role-based access control.",
        estimatedHours: 8,
        lessons: [
          {
            title: "Secure Authentication Flow: Bcrypt, JWT and HTTP-Only Cookies",
            description: "Prevent XSS and CSRF attacks by storing JWT tokens in secure HTTP-only cookies.",
            contentType: "article",
            durationMinutes: 30,
            unlockDay: 11,
            articleContent: "Never store sensitive JWT tokens in localStorage where malicious scripts can access them via XSS. Always use HttpOnly, Secure, and SameSite cookie flags for session management."
          }
        ]
      },
      {
        title: "Module 7: Final Production Capstone Project",
        description: "Design, build, and deploy an end-to-end production MERN application with full authentication, dashboard, payment flow, and media uploads.",
        estimatedHours: 20,
        lessons: [
          {
            title: "Capstone Project Guidelines & Production Deployment Checklist",
            description: "Step-by-step instructions for submitting your final internship project for evaluation.",
            contentType: "article",
            durationMinutes: 35,
            unlockDay: 12,
            articleContent: "The final capstone evaluates your proficiency in frontend architecture, database modeling, REST API design, authentication security, and cloud deployment."
          }
        ],
        project: {
          title: "Capstone Project: Production-Ready Full Stack Platform",
          description: "Build a complete web application with student/user authentication, admin dashboard, interactive features, database persistence with MongoDB, and cloud deployment.",
          requirements: [
            "Complete authentication system with JWT and role protection",
            "CRUD operations on at least 2 database models",
            "Responsive and clean modern UI with Tailwind CSS",
            "Deployed live URL on Vercel/Render/Railway with GitHub repo"
          ],
          technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
          maxMarks: 100,
          isCapstone: true
        }
      }
    ]
  }
};
