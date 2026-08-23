from __future__ import annotations

from typing import Any

JOB_POSTINGS = [
    {
        "id": "job-1",
        "slug": "senior-backend-engineer-fastapi-python",
        "title": "Senior Backend Engineer (FastAPI / Python)",
        "company": "Pathao",
        "location": "Dhaka, Bangladesh",
        "workType": "On-site",
        "category": "Software Development",
        "salary": "BDT 180,000 - 240,000 / month",
        "departmentTarget": "CSE",
        "targetConvocation": "19th, 20th & 21st Convocation",
        "trustScore": 98,
        "aiMatchScore": 91,
        "description": "Build high-throughput APIs for ride-sharing, payments, and logistics services using Python, FastAPI, PostgreSQL, and Redis.",
        "requirements": [
            "BS in Computer Science & Engineering from NSU.",
            "3+ years of production experience in Python, FastAPI, and PostgreSQL.",
            "Strong knowledge of microservices, caching, and distributed API design."
        ],
        "responsibilities": [
            "Design and maintain resilient backend services with sub-50ms latency.",
            "Collaborate with mobile and ML engineering teams for secure API integration.",
            "Implement observability, automated testing, and CI/CD deployment pipelines."
        ],
        "benefits": [
            "Competitive salary and bi-annual performance bonuses",
            "Comprehensive health insurance and annual learning stipend",
            "Modern engineering culture with sponsored tech conference passes"
        ],
        "postedBy": "Pathao Talent Team",
        "postedDate": "1 day ago",
        "applicationCount": 68,
        "isFeatured": True,
        "companyVerified": True,
    },
    {
        "id": "job-2",
        "slug": "ai-product-manager",
        "title": "AI Product Manager",
        "company": "ByteScale Labs",
        "location": "Dhaka, Bangladesh (Hybrid)",
        "workType": "Hybrid",
        "category": "Product & Project Management",
        "salary": "BDT 150,000 - 190,000 / month",
        "departmentTarget": "CSE / BBA",
        "targetConvocation": "19th, 20th & 21st Convocation",
        "trustScore": 99,
        "aiMatchScore": 94,
        "description": "Drive product strategy and roadmap execution for generative AI tools, trust scoring engines, and automated recruitment pipelines.",
        "requirements": [
            "Bachelor's degree in Computer Science, Business Analytics, or related NSU program.",
            "2+ years of experience leading software or AI product feature lifecycles.",
            "Comfort working directly with ML scientists and frontend developers."
        ],
        "responsibilities": [
            "Define product requirements, quarterly roadmap priorities, and OKRs.",
            "Conduct user research with recruiters and hiring managers in Dhaka.",
            "Ensure product releases meet strict trust, quality, and accuracy metrics."
        ],
        "benefits": [
            "Flexible hybrid work culture",
            "Learning stipend for AI product management and LLM certifications",
            "Performance milestone equity options"
        ],
        "postedBy": "ByteScale Labs HR",
        "postedDate": "2 days ago",
        "applicationCount": 42,
        "isFeatured": True,
        "companyVerified": True,
    },
    {
        "id": "job-3",
        "slug": "data-analyst-fraud-risk",
        "title": "Data Analyst — Fraud & Risk Analytics",
        "company": "bKash Limited",
        "location": "Dhaka, Bangladesh",
        "workType": "On-site",
        "category": "AI & Data Science",
        "salary": "BDT 80,000 - 115,000 / month",
        "departmentTarget": "CSE / EEE / Economics",
        "targetConvocation": "20th & 21st Convocation",
        "trustScore": 99,
        "aiMatchScore": 88,
        "description": "Join the financial crime compliance team to analyze transaction anomalies and model fraud detection algorithms protecting millions of wallet users.",
        "requirements": [
            "Strong SQL querying and Python data analysis skills (Pandas, Scikit-Learn).",
            "Experience building BI dashboards (Power BI / Tableau / Metabase).",
            "NSU graduate with analytical and problem-solving mindset."
        ],
        "responsibilities": [
            "Analyze large-scale mobile transaction streams for unusual behavior.",
            "Build automated reporting dashboards for fraud prevention and regulatory compliance.",
            "Collaborate with security engineers to patch high-risk payment vectors."
        ],
        "benefits": [
            "Festival bonuses, provident fund, and gratuity scheme",
            "Full family health & life insurance coverage",
            "Structured career growth path in Bangladesh's top MFS provider"
        ],
        "postedBy": "bKash Intelligence Team",
        "postedDate": "3 days ago",
        "applicationCount": 85,
        "isFeatured": False,
        "companyVerified": True,
    },
    {
        "id": "job-4",
        "slug": "junior-frontend-developer-react",
        "title": "Junior Frontend Developer (React / Next.js)",
        "company": "Brain Station 23",
        "location": "Dhaka, Bangladesh",
        "workType": "On-site",
        "category": "Software Development",
        "salary": "BDT 40,000 - 60,000 / month",
        "departmentTarget": "CSE",
        "targetConvocation": "21st Convocation",
        "trustScore": 97,
        "aiMatchScore": 92,
        "description": "Develop responsive, modern web interfaces for global enterprise clients using React, Next.js, and TypeScript.",
        "requirements": [
            "BS in Computer Science & Engineering from NSU.",
            "Proficiency in React.js, TypeScript, Tailwind CSS, and HTML5/CSS3.",
            "Familiarity with REST APIs, Git version control, and responsive design."
        ],
        "responsibilities": [
            "Convert Figma design mockups into pixel-perfect web components.",
            "Integrate RESTful backend endpoints with robust error handling.",
            "Participate in code reviews and agile sprint planning."
        ],
        "benefits": [
            "Dedicated senior mentor during probationary period",
            "Annual salary increment and performance bonuses",
            "Lunch and snacks provided at modern Banani office"
        ],
        "postedBy": "Brain Station 23 HR",
        "postedDate": "3 days ago",
        "applicationCount": 94,
        "isFeatured": True,
        "companyVerified": True,
    },
    {
        "id": "job-5",
        "slug": "mid-level-django-developer",
        "title": "Mid-Level Software Engineer (Python / Django)",
        "company": "Therap Services",
        "location": "Dhaka, Bangladesh",
        "workType": "On-site",
        "category": "Software Development",
        "salary": "BDT 85,000 - 120,000 / month",
        "departmentTarget": "CSE",
        "targetConvocation": "19th & 20th Convocation",
        "trustScore": 98,
        "aiMatchScore": 89,
        "description": "Maintain and enhance HIPAA-compliant healthcare SaaS software used across the US and Canada.",
        "requirements": [
            "2+ years of experience with Python, Django / FastAPI, and Oracle/PostgreSQL.",
            "Strong grasp of OOP principles, unit testing, and relational database schema design.",
            "Good English communication skills for North American cross-functional meetings."
        ],
        "responsibilities": [
            "Implement secure backend APIs handling sensitive patient data.",
            "Optimize complex database queries for enterprise-scale reporting.",
            "Write comprehensive automated tests ensuring zero regressions."
        ],
        "benefits": [
            "Two festival bonuses and annual profit sharing",
            "Subsidized transport and premium medical benefits",
            "Exceptional job stability in international healthcare tech"
        ],
        "postedBy": "Therap Talent Acquisition",
        "postedDate": "4 days ago",
        "applicationCount": 51,
        "isFeatured": False,
        "companyVerified": True,
    },
    {
        "id": "job-6",
        "slug": "senior-devops-cloud-engineer",
        "title": "Senior DevOps & Cloud Infrastructure Engineer",
        "company": "Optimizely",
        "location": "Dhaka / Remote",
        "workType": "Hybrid",
        "category": "DevOps & Cloud",
        "salary": "BDT 170,000 - 230,000 / month",
        "departmentTarget": "CSE / EEE",
        "targetConvocation": "19th & 20th Convocation",
        "trustScore": 99,
        "aiMatchScore": 87,
        "description": "Manage multi-region Kubernetes clusters on AWS/GCP, automated CI/CD deployment pipelines, and infrastructure-as-code.",
        "requirements": [
            "3+ years managing production Kubernetes and AWS or GCP workloads.",
            "Hands-on expertise in Terraform, Docker, Helm, and GitHub Actions.",
            "Experience implementing Prometheus, Grafana, and ELK stack observability."
        ],
        "responsibilities": [
            "Automate deployment pipelines and reduce mean-time-to-recovery (MTTR).",
            "Maintain 99.99% uptime for digital experience optimization platform.",
            "Perform security hardening and cost-optimization audits on cloud assets."
        ],
        "benefits": [
            "Full remote flexibility with home office setup budget",
            "Top-tier compensation with USD pegged incentive schemes",
            "Annual global team summit in Europe/US"
        ],
        "postedBy": "Optimizely Global HR",
        "postedDate": "5 days ago",
        "applicationCount": 38,
        "isFeatured": True,
        "companyVerified": True,
    },
    {
        "id": "job-7",
        "slug": "flutter-mobile-app-developer",
        "title": "Mobile Application Developer (Flutter / Dart)",
        "company": "Chaldal",
        "location": "Dhaka, Bangladesh",
        "workType": "On-site",
        "category": "Mobile Development",
        "salary": "BDT 70,000 - 105,000 / month",
        "departmentTarget": "CSE",
        "targetConvocation": "20th & 21st Convocation",
        "trustScore": 96,
        "aiMatchScore": 90,
        "description": "Create intuitive e-commerce mobile shopping experiences for over 1 million registered Bangladeshi households using Flutter.",
        "requirements": [
            "1.5+ years of Flutter & Dart mobile application development.",
            "Experience with state management (Bloc / Riverpod / Provider) and local caching (Hive/SQLite).",
            "Understanding of push notifications, geolocation, and payment SDK integration."
        ],
        "responsibilities": [
            "Develop modular, highly responsive Flutter UI components for Android & iOS.",
            "Optimize app startup time, frame rates, and offline shopping capabilities.",
            "Deploy weekly releases to Google Play Store and Apple App Store."
        ],
        "benefits": [
            "Subsidized grocery discounts from Chaldal platform",
            "Free daily lunch, snacks, and recreation lounge",
            "Collaborative culture with fast merit-based promotions"
        ],
        "postedBy": "Chaldal Engineering",
        "postedDate": "5 days ago",
        "applicationCount": 63,
        "isFeatured": False,
        "companyVerified": True,
    },
    {
        "id": "job-8",
        "slug": "junior-qa-automation-engineer",
        "title": "Junior QA Automation Engineer (Selenium / Playwright)",
        "company": "KAZ Software",
        "location": "Dhaka, Bangladesh",
        "workType": "On-site",
        "category": "Quality Assurance",
        "salary": "BDT 35,000 - 55,000 / month",
        "departmentTarget": "CSE",
        "targetConvocation": "21st Convocation",
        "trustScore": 95,
        "aiMatchScore": 86,
        "description": "Design, write, and execute automated end-to-end and API tests for fintech and e-learning web platforms.",
        "requirements": [
            "BS in CSE from NSU with sound understanding of SDLC and STLC.",
            "Knowledge of JavaScript/Python scripting with Playwright, Selenium, or Cypress.",
            "Experience with Postman API testing and bug tracking in Jira."
        ],
        "responsibilities": [
            "Author automated test scripts for user onboarding and checkout flows.",
            "Perform regression testing and file detailed bug reports with reproduction steps.",
            "Integrate automated test runs into CI/CD build gates."
        ],
        "benefits": [
            "Mentorship from veteran ISTQB-certified test leads",
            "Festival bonuses, daily catered lunch, and annual company retreat",
            "Friendly work hours with strict work-life balance"
        ],
        "postedBy": "KAZ People Ops",
        "postedDate": "6 days ago",
        "applicationCount": 77,
        "isFeatured": False,
        "companyVerified": True,
    },
    {
        "id": "job-9",
        "slug": "machine-learning-engineer-nlp",
        "title": "Machine Learning Engineer (NLP / LLM Systems)",
        "company": "Intelligent Machines",
        "location": "Dhaka, Bangladesh (Hybrid)",
        "workType": "Hybrid",
        "category": "AI & Data Science",
        "salary": "BDT 150,000 - 210,000 / month",
        "departmentTarget": "CSE / EEE",
        "targetConvocation": "19th & 20th Convocation",
        "trustScore": 99,
        "aiMatchScore": 95,
        "description": "Develop and deploy Bengali NLP models, document extraction transformers, and conversational AI agents for financial institutions.",
        "requirements": [
            "2+ years practical ML experience with PyTorch, Hugging Face Transformers, and FastAPI.",
            "Deep understanding of NLP techniques, embeddings, vector databases, and model quantization.",
            "Published research or demonstrable open-source projects in AI/ML."
        ],
        "responsibilities": [
            "Fine-tune open-source LLMs and transformers on proprietary bilingual datasets.",
            "Deploy low-latency inferencing microservices using Docker and Triton server.",
            "Conduct experiments to benchmark accuracy, hallucination rates, and latency."
        ],
        "benefits": [
            "Direct access to high-performance GPU compute clusters",
            "Sponsored conference travel (NeurIPS, EMNLP, CVPR)",
            "Generous stock options and flexible working arrangements"
        ],
        "postedBy": "Intelligent Machines AI Lab",
        "postedDate": "1 week ago",
        "applicationCount": 49,
        "isFeatured": True,
        "companyVerified": True,
    },
    {
        "id": "job-10",
        "slug": "associate-software-engineer-go",
        "title": "Associate Software Engineer (Golang / Microservices)",
        "company": "ShopUp",
        "location": "Dhaka, Bangladesh",
        "workType": "On-site",
        "category": "Software Development",
        "salary": "BDT 45,000 - 65,000 / month",
        "departmentTarget": "CSE",
        "targetConvocation": "21st Convocation",
        "trustScore": 97,
        "aiMatchScore": 88,
        "description": "Build high-throughput supply chain microservices powering thousands of retail merchants across Bangladesh.",
        "requirements": [
            "Fresh NSU CSE graduate with strong foundation in Data Structures & Algorithms.",
            "Familiarity with Golang or strong desire to cross-train from C++/Java.",
            "Basic understanding of SQL, REST APIs, and concurrency patterns."
        ],
        "responsibilities": [
            "Assist in implementing inventory tracking and logistics routing microservices.",
            "Write clean, unit-tested Go code following idiomatic patterns.",
            "Investigate production issues and collaborate on root-cause analysis."
        ],
        "benefits": [
            "Comprehensive training program under senior backend architects",
            "Two festival bonuses, provident fund, and medical insurance",
            "Catered meals, snack bar, and gym membership subsidy"
        ],
        "postedBy": "ShopUp Careers",
        "postedDate": "1 week ago",
        "applicationCount": 112,
        "isFeatured": False,
        "companyVerified": True,
    },
    {
        "id": "job-11",
        "slug": "fullstack-nextjs-engineer",
        "title": "Full Stack Engineer (Next.js / TypeScript / Node.js)",
        "company": "Dynamic Solution Innovators",
        "location": "Dhaka, Bangladesh",
        "workType": "Hybrid",
        "category": "Software Development",
        "salary": "BDT 80,000 - 120,000 / month",
        "departmentTarget": "CSE",
        "targetConvocation": "19th, 20th & 21st Convocation",
        "trustScore": 98,
        "aiMatchScore": 93,
        "description": "Develop full-stack web applications for international enterprise clients using Next.js App Router, TypeScript, and Node.js.",
        "requirements": [
            "2+ years experience building production full stack web apps with Next.js and Node.js.",
            "Proficiency in PostgreSQL/Prisma, Redis, Docker, and REST/GraphQL APIs.",
            "Solid experience with state management, authentication (JWT/OAuth), and Tailwind CSS."
        ],
        "responsibilities": [
            "Build scalable frontend interfaces and performant serverless/backend endpoints.",
            "Optimize Core Web Vitals, SSR caching, and database indexing.",
            "Participate in sprint retrospectives, client demos, and architecture discussions."
        ],
        "benefits": [
            "Bi-weekly hybrid work flexibility (2 days WFH)",
            "Gratuity, provident fund, and comprehensive medical insurance",
            "Continuous learning sponsorship for AWS/Cloud certifications"
        ],
        "postedBy": "DSI Talent Team",
        "postedDate": "1 week ago",
        "applicationCount": 71,
        "isFeatured": True,
        "companyVerified": True,
    },
    {
        "id": "job-12",
        "slug": "cybersecurity-operations-analyst",
        "title": "Cybersecurity SOC Analyst (L2)",
        "company": "Grameenphone",
        "location": "Dhaka, Bangladesh",
        "workType": "On-site",
        "category": "Security & Networks",
        "salary": "BDT 90,000 - 130,000 / month",
        "departmentTarget": "CSE / EEE",
        "targetConvocation": "19th & 20th Convocation",
        "trustScore": 99,
        "aiMatchScore": 86,
        "description": "Protect critical telecommunications and digital finance infrastructure from advanced persistent threats and vulnerability exploits.",
        "requirements": [
            "2+ years experience in Security Operations Center (SOC) monitoring and incident response.",
            "Proficiency with SIEM tools (Splunk / QRadar / Microsoft Sentinel) and Wireshark.",
            "Relevant certifications preferred (CompTIA Security+, CEH, or CCNA CyberOps)."
        ],
        "responsibilities": [
            "Triage real-time security alerts, investigate IOCs, and execute containment procedures.",
            "Perform vulnerability assessments and coordinate remediation with systems teams.",
            "Author post-incident forensic reports and improve threat hunting playbooks."
        ],
        "benefits": [
            "Top tier corporate benefits package and performance bonuses",
            "International telecom training programs and certifications support",
            "Transportation facility and subsidized cafeteria"
        ],
        "postedBy": "Grameenphone InfoSec",
        "postedDate": "1 week ago",
        "applicationCount": 35,
        "isFeatured": False,
        "companyVerified": True,
    },
    {
        "id": "job-13",
        "slug": "lead-system-architect",
        "title": "Lead Software Systems Architect",
        "company": "Augmedix Bangladesh",
        "location": "Dhaka, Bangladesh",
        "workType": "Hybrid",
        "category": "Software Development",
        "salary": "BDT 220,000 - 290,000 / month",
        "departmentTarget": "CSE",
        "targetConvocation": "19th Convocation",
        "trustScore": 99,
        "aiMatchScore": 90,
        "description": "Lead the technical architecture of AI-assisted medical documentation platforms deployed across top US hospital networks.",
        "requirements": [
            "6+ years of software engineering with at least 2 years in a technical leadership role.",
            "Deep expertise in distributed systems, event-driven architectures (Kafka/RabbitMQ), and cloud resilience.",
            "Strong background in HIPAA compliance, data privacy, and zero-trust security."
        ],
        "responsibilities": [
            "Define system architecture roadmaps, technical standards, and non-functional requirements.",
            "Mentor senior engineers and lead cross-departmental technical governance committees.",
            "Evaluate cutting-edge technologies to continually improve real-time transcription latency."
        ],
        "benefits": [
            "US Dollar indexed compensation package with performance equity",
            "Comprehensive health benefits for employee, spouse, and dependents",
            "Flexible hybrid work environment and generous PTO"
        ],
        "postedBy": "Augmedix Talent Team",
        "postedDate": "2 weeks ago",
        "applicationCount": 24,
        "isFeatured": True,
        "companyVerified": True,
    },
    {
        "id": "job-14",
        "slug": "junior-ui-ux-product-designer",
        "title": "Junior UI/UX Product Designer",
        "company": "ShareTrip",
        "location": "Dhaka, Bangladesh",
        "workType": "On-site",
        "category": "UI/UX & Design",
        "salary": "BDT 35,000 - 55,000 / month",
        "departmentTarget": "CSE / Architecture",
        "targetConvocation": "21st Convocation",
        "trustScore": 96,
        "aiMatchScore": 89,
        "description": "Design visually stunning and frictionless flight, hotel, and holiday booking experiences on web and mobile for Bangladesh's leading travel tech brand.",
        "requirements": [
            "NSU graduate in CSE, Architecture, or related design discipline.",
            "Strong portfolio demonstrating Figma wireframing, high-fidelity prototypes, and design systems.",
            "Understanding of user psychology, mobile-first design, and accessibility standards."
        ],
        "responsibilities": [
            "Create user flows, wireframes, and polished UI component libraries in Figma.",
            "Conduct usability testing and iterate on booking funnel friction points.",
            "Handoff specs and assets to frontend development teams with clear guidelines."
        ],
        "benefits": [
            "Exclusive travel and vacation perks across South Asia",
            "Young, dynamic, and design-led team environment",
            "Festival bonuses, lunch, and flexible timings"
        ],
        "postedBy": "ShareTrip Design Studio",
        "postedDate": "2 weeks ago",
        "applicationCount": 88,
        "isFeatured": False,
        "companyVerified": True,
    },
    {
        "id": "job-15",
        "slug": "data-engineer-etl-pipelines",
        "title": "Data Engineer (Spark / Airflow / Snowflake)",
        "company": "bKash Limited",
        "location": "Dhaka, Bangladesh",
        "workType": "Hybrid",
        "category": "AI & Data Science",
        "salary": "BDT 95,000 - 135,000 / month",
        "departmentTarget": "CSE / EEE",
        "targetConvocation": "19th & 20th Convocation",
        "trustScore": 99,
        "aiMatchScore": 91,
        "description": "Architect robust real-time and batch data pipelines processing hundreds of millions of daily financial events.",
        "requirements": [
            "2+ years experience building production ETL/ELT data pipelines.",
            "Proficiency in Python/Scala, Apache Spark, Apache Airflow, and PostgreSQL/Snowflake.",
            "Strong knowledge of data warehousing principles, dimensional modeling, and streaming data."
        ],
        "responsibilities": [
            "Design and operate fault-tolerant data ingestion pipelines from transactional DBs.",
            "Maintain centralized data lakes ensuring high data quality and schema consistency.",
            "Partner with data science and business intelligence teams to provision analytic tables."
        ],
        "benefits": [
            "Industry leading financial sector benefits package",
            "Provident fund, gratuity, and performance bonus structure",
            "Generous family medical coverage and wellness programs"
        ],
        "postedBy": "bKash Big Data Team",
        "postedDate": "2 weeks ago",
        "applicationCount": 47,
        "isFeatured": True,
        "companyVerified": True,
    },
    {
        "id": "job-16",
        "slug": "ios-swift-engineer",
        "title": "iOS Application Engineer (Swift / SwiftUI)",
        "company": "Selise Digital Platforms",
        "location": "Dhaka, Bangladesh",
        "workType": "Hybrid",
        "category": "Mobile Development",
        "salary": "BDT 80,000 - 120,000 / month",
        "departmentTarget": "CSE",
        "targetConvocation": "20th & 21st Convocation",
        "trustScore": 97,
        "aiMatchScore": 87,
        "description": "Develop high-end enterprise and consumer iOS applications for Swiss and European clients using Swift and modern architectural patterns.",
        "requirements": [
            "2+ years native iOS development with Swift and SwiftUI / UIKit.",
            "Experience with MVVM/VIPER architectures, Core Data, and REST/WebSocket APIs.",
            "Solid grasp of Apple Human Interface Guidelines and App Store submission workflows."
        ],
        "responsibilities": [
            "Build clean, animated, and memory-efficient native iOS user interfaces.",
            "Write modular business logic with unit and snapshot tests.",
            "Collaborate with European product managers in daily standups."
        ],
        "benefits": [
            "Swiss-standard work culture with 3 days hybrid WFH option",
            "Two festival bonuses and annual performance reward",
            "Subsidized international certification and German/English language training"
        ],
        "postedBy": "Selise People & Culture",
        "postedDate": "2 weeks ago",
        "applicationCount": 39,
        "isFeatured": False,
        "companyVerified": True,
    },
    {
        "id": "job-17",
        "slug": "cloud-infrastructure-architect",
        "title": "Cloud Infrastructure Architect (AWS / Azure)",
        "company": "TigerIT Bangladesh",
        "location": "Dhaka, Bangladesh",
        "workType": "On-site",
        "category": "DevOps & Cloud",
        "salary": "BDT 180,000 - 250,000 / month",
        "departmentTarget": "CSE / EEE",
        "targetConvocation": "19th & 20th Convocation",
        "trustScore": 98,
        "aiMatchScore": 89,
        "description": "Architect biometric identity databases and national-scale identity platforms on secure government cloud infrastructure.",
        "requirements": [
            "4+ years designing high-security cloud and on-premise infrastructure solutions.",
            "Deep expertise in Linux kernel tuning, high-availability PostgreSQL clusters, and SAN storage.",
            "Strong knowledge of network security, HSM encryption, and disaster recovery planning."
        ],
        "responsibilities": [
            "Design highly available server topology capable of handling millions of biometric queries.",
            "Ensure compliance with international national security and data sovereignty standards.",
            "Lead incident triage for tier-1 national infrastructure deployments."
        ],
        "benefits": [
            "Exceptional compensation and project milestone completion bonuses",
            "Comprehensive executive health insurance and transport facility",
            "Opportunity to work on historic, nation-scale digital governance projects"
        ],
        "postedBy": "TigerIT Enterprise HR",
        "postedDate": "3 weeks ago",
        "applicationCount": 29,
        "isFeatured": True,
        "companyVerified": True,
    },
    {
        "id": "job-18",
        "slug": "trainee-software-engineer",
        "title": "Trainee Software Engineer (Full Stack Bootcamp)",
        "company": "Enosis Solutions",
        "location": "Dhaka, Bangladesh",
        "workType": "On-site",
        "category": "Software Development",
        "salary": "BDT 30,000 - 45,000 / month",
        "departmentTarget": "CSE",
        "targetConvocation": "21st Convocation",
        "trustScore": 98,
        "aiMatchScore": 94,
        "description": "Jumpstart your career with our rigorous 6-month software engineering mentorship program working directly on US client applications.",
        "requirements": [
            "Fresh graduate in BSc in CSE from NSU with high academic standing.",
            "Excellent fundamentals in Object-Oriented Programming, C++/Java/Python, and Algorithms.",
            "Strong problem-solving capability and passion for writing clean, maintainable code."
        ],
        "responsibilities": [
            "Complete structured full stack software engineering training modules.",
            "Develop features and write automated tests under 1-on-1 mentorship of senior architects.",
            "Transition into a full-time Software Engineer role upon successful completion."
        ],
        "benefits": [
            "Full salary during the 6-month intensive training period",
            "Guaranteed promotion to Software Engineer (BDT 60,000+) upon evaluation",
            "Breakfast, lunch, snacks, and comprehensive medical coverage provided"
        ],
        "postedBy": "Enosis University Relations",
        "postedDate": "3 weeks ago",
        "applicationCount": 165,
        "isFeatured": True,
        "companyVerified": True,
    }
]


def get_job_postings() -> list[dict[str, Any]]:
    return JOB_POSTINGS


def get_job_posting_by_slug(slug: str) -> dict[str, Any] | None:
    return next((job for job in JOB_POSTINGS if job["slug"] == slug), None)
