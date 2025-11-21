import React, { useState, useEffect, useCallback } from 'react';
import './Quiz.css';

const Quiz = ({ quizInfo, onComplete }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(900); // 15 minutes

  // Get questions based on quiz type and category
  const getQuestionsByCategory = useCallback((info) => {
    // Enhanced question database with job-specific and skill-specific questions
    const questionDatabase = {
      // Job-specific questions
      frontend: {
        beginner: [
          {
            id: 1,
            question: "What is the primary purpose of React's virtual DOM?",
            options: [
              "To improve server-side rendering",
              "To optimize DOM manipulation performance",
              "To handle CSS animations",
              "To manage API calls"
            ],
            correct: 1,
            explanation: "Virtual DOM improves performance by minimizing direct DOM manipulation."
          },
          {
            id: 2,
            question: "Which CSS property is used for flexbox layout?",
            options: [
              "display: grid;",
              "display: flex;",
              "display: block;",
              "display: inline;"
            ],
            correct: 1,
            explanation: "display: flex; enables flexbox layout model."
          },
          {
            id: 3,
            question: "What does HTML stand for?",
            options: [
              "Hyper Text Markup Language",
              "High Tech Modern Language",
              "Hyper Transfer Markup Language",
              "Home Tool Markup Language"
            ],
            correct: 0,
            explanation: "HTML stands for Hyper Text Markup Language."
          },
          {
            id: 4,
            question: "Which JavaScript method is used to select an element by ID?",
            options: [
              "document.querySelector()",
              "document.getElementById()",
              "document.getElementByClass()",
              "document.findElement()"
            ],
            correct: 1,
            explanation: "getElementById() specifically selects elements by their ID attribute."
          },
          {
            id: 5,
            question: "What is the purpose of media queries in CSS?",
            options: [
              "To handle user media uploads",
              "To create responsive designs",
              "To optimize images",
              "To manage audio files"
            ],
            correct: 1,
            explanation: "Media queries enable responsive design for different screen sizes."
          },
          {
            id: 6,
            question: "Which tool is commonly used for JavaScript package management?",
            options: [
              "npm",
              "pip",
              "maven",
              "gradle"
            ],
            correct: 0,
            explanation: "npm (Node Package Manager) is the standard for JavaScript packages."
          },
          {
            id: 7,
            question: "What is the role of a frontend framework?",
            options: [
              "To handle database operations",
              "To provide structure for building user interfaces",
              "To manage server infrastructure",
              "To optimize network requests"
            ],
            correct: 1,
            explanation: "Frontend frameworks provide structure and tools for building UIs."
          },
          {
            id: 8,
            question: "Which HTML tag is used for creating a hyperlink?",
            options: [
              "<link>",
              "<a>",
              "<href>",
              "<url>"
            ],
            correct: 1,
            explanation: "<a> tag creates hyperlinks in HTML."
          },
          {
            id: 9,
            question: "What is the purpose of CSS preprocessors like SASS?",
            options: [
              "To compile JavaScript",
              "To add programming features to CSS",
              "To optimize images",
              "To handle form validation"
            ],
            correct: 1,
            explanation: "SASS adds variables, nesting, and other features to CSS."
          },
          {
            id: 10,
            question: "Which method is used to make HTTP requests in JavaScript?",
            options: [
              "fetch()",
              "request()",
              "get()",
              "call()"
            ],
            correct: 0,
            explanation: "fetch() is the modern way to make HTTP requests in JavaScript."
          }
        ],
        intermediate: [
          {
            id: 11,
            question: "What is React component lifecycle?",
            options: [
              "Methods that execute at different stages of component existence",
              "A way to style components",
              "A state management pattern",
              "A testing framework"
            ],
            correct: 0,
            explanation: "Lifecycle methods run during mounting, updating, and unmounting phases."
          },
          {
            id: 12,
            question: "What is the purpose of Redux in React applications?",
            options: [
              "To handle routing",
              "To manage global state",
              "To style components",
              "To make API calls"
            ],
            correct: 1,
            explanation: "Redux provides predictable state management for React apps."
          },
          {
            id: 13,
            question: "What are CSS Grid and Flexbox used for?",
            options: [
              "Database operations",
              "Layout and positioning",
              "Form validation",
              "API integration"
            ],
            correct: 1,
            explanation: "Both are modern CSS layout systems for creating complex layouts."
          },
          {
            id: 14,
            question: "What is TypeScript primarily used for?",
            options: [
              "Adding static typing to JavaScript",
              "Styling web pages",
              "Database management",
              "Server configuration"
            ],
            correct: 0,
            explanation: "TypeScript adds static type definitions to JavaScript."
          },
          {
            id: 15,
            question: "What is Webpack's main purpose?",
            options: [
              "Module bundling and asset optimization",
              "Database migration",
              "API testing",
              "CSS preprocessing"
            ],
            correct: 0,
            explanation: "Webpack bundles JavaScript modules and other assets for production."
          },
          {
            id: 16,
            question: "What are Progressive Web Apps (PWAs)?",
            options: [
              "Web apps that work like native mobile apps",
              "Server-side rendered apps",
              "Desktop-only applications",
              "Command-line tools"
            ],
            correct: 0,
            explanation: "PWAs provide native app-like experience on the web."
          },
          {
            id: 17,
            question: "What is the virtual DOM in React?",
            options: [
              "A direct copy of the real DOM",
              "A lightweight JavaScript representation of the real DOM",
              "A database for storing DOM elements",
              "A browser extension"
            ],
            correct: 1,
            explanation: "Virtual DOM is a lightweight copy used for efficient updates."
          },
          {
            id: 18,
            question: "What is CSS-in-JS?",
            options: [
              "Writing CSS within JavaScript files",
              "A new programming language",
              "A database query language",
              "A server-side framework"
            ],
            correct: 0,
            explanation: "CSS-in-JS allows writing CSS styles in JavaScript."
          },
          {
            id: 19,
            question: "What is the purpose of React hooks?",
            options: [
              "To use state and lifecycle features in functional components",
              "To handle routing",
              "To manage databases",
              "To style components"
            ],
            correct: 0,
            explanation: "Hooks enable state and lifecycle features in functional components."
          },
          {
            id: 20,
            question: "What is server-side rendering (SSR)?",
            options: [
              "Rendering web pages on the server before sending to client",
              "A database optimization technique",
              "A CSS framework",
              "A JavaScript runtime"
            ],
            correct: 0,
            explanation: "SSR renders pages on server for better performance and SEO."
          }
        ],
        advanced: [
          {
            id: 21,
            question: "What is React Fiber architecture?",
            options: [
              "A complete rewrite of React's core algorithm",
              "A state management library",
              "A CSS framework",
              "A testing tool"
            ],
            correct: 0,
            explanation: "Fiber is React's new reconciliation algorithm for better performance."
          },
          {
            id: 22,
            question: "What are React Error Boundaries?",
            options: [
              "Components that catch JavaScript errors in their child component tree",
              "CSS error handlers",
              "API error catchers",
              "Database error handlers"
            ],
            correct: 0,
            explanation: "Error Boundaries catch JS errors in child components and display fallback UI."
          },
          {
            id: 23,
            question: "What is code splitting in React?",
            options: [
              "Splitting code into smaller bundles that can be loaded on demand",
              "Dividing code into multiple files",
              "A testing strategy",
              "A deployment technique"
            ],
            correct: 0,
            explanation: "Code splitting improves performance by loading only necessary code."
          },
          {
            id: 24,
            question: "What is the Context API in React?",
            options: [
              "A way to pass data through the component tree without prop drilling",
              "A database context",
              "A styling context",
              "A routing context"
            ],
            correct: 0,
            explanation: "Context API enables data sharing without passing props manually."
          },
          {
            id: 25,
            question: "What are React Portals?",
            options: [
              "A way to render children into a DOM node outside parent hierarchy",
              "Database portals",
              "API gateways",
              "CSS portals"
            ],
            correct: 0,
            explanation: "Portals render content outside parent DOM hierarchy (modals, tooltips)."
          },
          {
            id: 26,
            question: "What is memoization in React?",
            options: [
              "Caching expensive computations to improve performance",
              "A memory management technique",
              "A database optimization",
              "A network optimization"
            ],
            correct: 0,
            explanation: "Memoization caches results to avoid redundant calculations."
          },
          {
            id: 27,
            question: "What is the difference between controlled and uncontrolled components?",
            options: [
              "Controlled components manage form data via state, uncontrolled via DOM",
              "Controlled by server vs controlled by client",
              "A styling difference",
              "A performance difference"
            ],
            correct: 0,
            explanation: "Controlled components use React state, uncontrolled use DOM directly."
          },
          {
            id: 28,
            question: "What is React Suspense?",
            options: [
              "A component that lets you wait for some code to load",
              "A state management tool",
              "A testing framework",
              "A deployment tool"
            ],
            correct: 0,
            explanation: "Suspense enables better loading states for async operations."
          },
          {
            id: 29,
            question: "What are React Fragments?",
            options: [
              "A way to group multiple elements without adding extra DOM nodes",
              "Broken components",
              "Database fragments",
              "Code fragments"
            ],
            correct: 0,
            explanation: "Fragments group elements without creating extra DOM nodes."
          },
          {
            id: 30,
            question: "What is the purpose of useMemo and useCallback hooks?",
            options: [
              "To optimize performance by memoizing values and functions",
              "To handle API calls",
              "To manage routing",
              "To style components"
            ],
            correct: 0,
            explanation: "These hooks optimize performance by preventing unnecessary re-renders."
          }
        ]
      },
      backend: {
        beginner: [
          {
            id: 31,
            question: "What is Node.js?",
            options: [
              "A JavaScript runtime built on Chrome's V8 engine",
              "A frontend framework",
              "A database system",
              "A CSS preprocessor"
            ],
            correct: 0,
            explanation: "Node.js allows JavaScript to run on the server side."
          },
          {
            id: 32,
            question: "What is the purpose of Express.js?",
            options: [
              "To create web applications and APIs",
              "To style web pages",
              "To manage databases",
              "To compile JavaScript"
            ],
            correct: 0,
            explanation: "Express.js is a minimal web framework for Node.js."
          },
          {
            id: 33,
            question: "What is REST API?",
            options: [
              "An architectural style for designing networked applications",
              "A database system",
              "A programming language",
              "A testing framework"
            ],
            correct: 0,
            explanation: "REST is an architectural style for building web services."
          },
          {
            id: 34,
            question: "What is middleware in Express.js?",
            options: [
              "Functions that have access to request and response objects",
              "A database layer",
              "A frontend component",
              "A deployment tool"
            ],
            correct: 0,
            explanation: "Middleware functions process requests before they reach route handlers."
          },
          {
            id: 35,
            question: "What is the purpose of environment variables?",
            options: [
              "To store configuration settings outside of code",
              "To style applications",
              "To manage user interfaces",
              "To compile code"
            ],
            correct: 0,
            explanation: "Environment variables store config settings securely."
          },
          {
            id: 36,
            question: "What is CORS?",
            options: [
              "Cross-Origin Resource Sharing - a security feature",
              "A database system",
              "A programming language",
              "A testing framework"
            ],
            correct: 0,
            explanation: "CORS allows controlled access to resources from different origins."
          },
          {
            id: 37,
            question: "What is the purpose of package.json in Node.js?",
            options: [
              "To manage project dependencies and scripts",
              "To style the application",
              "To deploy the application",
              "To test the application"
            ],
            correct: 0,
            explanation: "package.json contains project metadata and dependencies."
          },
          {
            id: 38,
            question: "What is MongoDB?",
            options: [
              "A NoSQL document database",
              "A frontend framework",
              "A CSS preprocessor",
              "A testing tool"
            ],
            correct: 0,
            explanation: "MongoDB is a popular NoSQL database."
          },
          {
            id: 39,
            question: "What is JWT (JSON Web Token)?",
            options: [
              "A standard for securely transmitting information as JSON objects",
              "A database query language",
              "A styling framework",
              "A deployment tool"
            ],
            correct: 0,
            explanation: "JWT is used for authentication and information exchange."
          },
          {
            id: 40,
            question: "What is the purpose of bcrypt?",
            options: [
              "To hash passwords securely",
              "To style web pages",
              "To manage databases",
              "To compile code"
            ],
            correct: 0,
            explanation: "bcrypt is used for password hashing and security."
          }
        ],
        intermediate: [
          {
            id: 41,
            question: "What is database indexing?",
            options: [
              "A technique to improve database query performance",
              "A way to style databases",
              "A programming language feature",
              "A deployment strategy"
            ],
            correct: 0,
            explanation: "Indexing speeds up data retrieval in databases."
          },
          {
            id: 42,
            question: "What is the difference between SQL and NoSQL databases?",
            options: [
              "SQL is relational, NoSQL is non-relational",
              "SQL is for frontend, NoSQL for backend",
              "SQL is faster than NoSQL",
              "NoSQL is older than SQL"
            ],
            correct: 0,
            explanation: "SQL databases are relational, NoSQL are document/key-value based."
          },
          {
            id: 43,
            question: "What is API rate limiting?",
            options: [
              "Controlling the number of requests a client can make",
              "A database feature",
              "A styling technique",
              "A testing method"
            ],
            correct: 0,
            explanation: "Rate limiting protects APIs from abuse and overuse."
          },
          {
            id: 44,
            question: "What is microservices architecture?",
            options: [
              "Developing an application as a suite of small services",
              "A database architecture",
              "A styling pattern",
              "A testing framework"
            ],
            correct: 0,
            explanation: "Microservices break applications into independently deployable services."
          },
          {
            id: 45,
            question: "What is containerization?",
            options: [
              "Packaging an application with its dependencies into a container",
              "A database technique",
              "A styling method",
              "A testing approach"
            ],
            correct: 0,
            explanation: "Containerization ensures consistent environment across deployments."
          },
          {
            id: 46,
            question: "What is the purpose of Redis?",
            options: [
              "In-memory data structure store used as database, cache, and message broker",
              "A frontend framework",
              "A CSS preprocessor",
              "A testing tool"
            ],
            correct: 0,
            explanation: "Redis is used for caching, sessions, and real-time applications."
          },
          {
            id: 47,
            question: "What is GraphQL?",
            options: [
              "A query language for APIs that allows clients to request exactly what they need",
              "A database system",
              "A programming language",
              "A styling framework"
            ],
            correct: 0,
            explanation: "GraphQL provides more efficient API queries compared to REST."
          },
          {
            id: 48,
            question: "What is the purpose of message queues?",
            options: [
              "To enable asynchronous communication between services",
              "To style applications",
              "To manage databases",
              "To compile code"
            ],
            correct: 0,
            explanation: "Message queues handle background processing and service communication."
          },
          {
            id: 49,
            question: "What is database normalization?",
            options: [
              "Organizing data to reduce redundancy and improve integrity",
              "A styling technique",
              "A deployment strategy",
              "A testing method"
            ],
            correct: 0,
            explanation: "Normalization minimizes data duplication and ensures data integrity."
          },
          {
            id: 50,
            question: "What is the purpose of load balancing?",
            options: [
              "Distributing network traffic across multiple servers",
              "A database feature",
              "A styling technique",
              "A testing approach"
            ],
            correct: 0,
            explanation: "Load balancing improves application availability and performance."
          }
        ],
        advanced: [
          {
            id: 51,
            question: "What is database sharding?",
            options: [
              "Partitioning data across multiple databases to improve performance",
              "A styling technique",
              "A deployment strategy",
              "A testing method"
            ],
            correct: 0,
            explanation: "Sharding horizontally partitions data across multiple databases."
          },
          {
            id: 52,
            question: "What is the CAP theorem?",
            options: [
              "A theorem about distributed systems (Consistency, Availability, Partition tolerance)",
              "A database design pattern",
              "A programming principle",
              "A testing methodology"
            ],
            correct: 0,
            explanation: "CAP theorem states that distributed systems can't guarantee all three properties simultaneously."
          },
          {
            id: 53,
            question: "What is event sourcing?",
            options: [
              "Storing state changes as a sequence of events",
              "A styling pattern",
              "A deployment technique",
              "A testing approach"
            ],
            correct: 0,
            explanation: "Event sourcing persists state changes as immutable events."
          },
          {
            id: 54,
            question: "What is the purpose of circuit breakers in microservices?",
            options: [
              "To prevent cascading failures when services are unavailable",
              "To style services",
              "To deploy services",
              "To test services"
            ],
            correct: 0,
            explanation: "Circuit breakers stop requests to failing services to prevent system-wide failures."
          },
          {
            id: 55,
            question: "What is database replication?",
            options: [
              "Copying and maintaining database objects in multiple databases",
              "A styling technique",
              "A deployment strategy",
              "A testing method"
            ],
            correct: 0,
            explanation: "Replication provides data redundancy and improves availability."
          },
          {
            id: 56,
            question: "What is the purpose of API gateways?",
            options: [
              "To act as a single entry point for API requests and handle cross-cutting concerns",
              "To style APIs",
              "To deploy APIs",
              "To test APIs"
            ],
            correct: 0,
            explanation: "API gateways handle routing, security, and monitoring for microservices."
          },
          {
            id: 57,
            question: "What is eventual consistency?",
            options: [
              "A consistency model where updates eventually propagate to all nodes",
              "A database design pattern",
              "A programming principle",
              "A testing methodology"
            ],
            correct: 0,
            explanation: "Eventual consistency guarantees that all nodes will eventually have the same data."
          },
          {
            id: 58,
            question: "What is the purpose of service discovery?",
            options: [
              "To automatically detect services in a distributed system",
              "To style services",
              "To deploy services",
              "To test services"
            ],
            correct: 0,
            explanation: "Service discovery helps microservices find and communicate with each other."
          },
          {
            id: 59,
            question: "What is database connection pooling?",
            options: [
              "Reusing database connections to improve performance",
              "A styling technique",
              "A deployment strategy",
              "A testing method"
            ],
            correct: 0,
            explanation: "Connection pooling reduces overhead of creating new database connections."
          },
          {
            id: 60,
            question: "What is the purpose of distributed tracing?",
            options: [
              "To monitor and troubleshoot requests across multiple services",
              "To style distributed systems",
              "To deploy distributed systems",
              "To test distributed systems"
            ],
            correct: 0,
            explanation: "Distributed tracing tracks requests as they flow through microservices."
          }
        ]
      },
      fullstack: {
        beginner: [
          {
            id: 61,
            question: "What is the MERN stack?",
            options: [
              "MongoDB, Express.js, React, Node.js",
              "MySQL, Express.js, React, Node.js",
              "MongoDB, Ember.js, React, Node.js",
              "MongoDB, Express.js, Redux, Node.js"
            ],
            correct: 0,
            explanation: "MERN stack consists of MongoDB, Express.js, React, and Node.js."
          },
          {
            id: 62,
            question: "What is the role of a full-stack developer?",
            options: [
              "To work on both frontend and backend parts of an application",
              "To only work on databases",
              "To only work on user interfaces",
              "To only work on servers"
            ],
            correct: 0,
            explanation: "Full-stack developers handle both client-side and server-side development."
          },
          {
            id: 63,
            question: "What is version control?",
            options: [
              "Managing changes to source code over time",
              "A database feature",
              "A styling technique",
              "A deployment tool"
            ],
            correct: 0,
            explanation: "Version control tracks and manages code changes (e.g., Git)."
          },
          {
            id: 64,
            question: "What is the purpose of environment variables in full-stack development?",
            options: [
              "To store configuration settings for different environments",
              "To style applications",
              "To manage databases",
              "To compile code"
            ],
            correct: 0,
            explanation: "Environment variables store different configs for dev, staging, production."
          },
          {
            id: 65,
            question: "What is API integration?",
            options: [
              "Connecting frontend applications with backend services",
              "A database technique",
              "A styling method",
              "A testing approach"
            ],
            correct: 0,
            explanation: "API integration connects client applications with server APIs."
          },
          {
            id: 66,
            question: "What is the purpose of package managers?",
            options: [
              "To manage project dependencies and libraries",
              "To style applications",
              "To deploy applications",
              "To test applications"
            ],
            correct: 0,
            explanation: "Package managers handle installation and versioning of dependencies."
          },
          {
            id: 67,
            question: "What is the difference between development and production environments?",
            options: [
              "Development is for coding/testing, production is for live users",
              "Development is faster than production",
              "Production has more features than development",
              "Development is for databases only"
            ],
            correct: 0,
            explanation: "Development environment is for building, production is for end-users."
          },
          {
            id: 68,
            question: "What is the purpose of build tools?",
            options: [
              "To automate tasks like compilation, testing, and bundling",
              "To style applications",
              "To manage databases",
              "To deploy applications"
            ],
            correct: 0,
            explanation: "Build tools automate development workflows and optimize code for production."
          },
          {
            id: 69,
            question: "What is the role of a database in full-stack applications?",
            options: [
              "To store and manage application data",
              "To style the user interface",
              "To handle user interactions",
              "To compile code"
            ],
            correct: 0,
            explanation: "Databases persist and manage application data."
          },
          {
            id: 70,
            question: "What is the purpose of authentication in web applications?",
            options: [
              "To verify user identity and control access",
              "To style the application",
              "To optimize performance",
              "To manage databases"
            ],
            correct: 0,
            explanation: "Authentication ensures only authorized users can access certain features."
          }
        ],
        intermediate: [
          {
            id: 71,
            question: "What is the purpose of environment-specific configuration?",
            options: [
              "To use different settings for development, testing, and production",
              "To style applications differently",
              "To use different programming languages",
              "To change database types"
            ],
            correct: 0,
            explanation: "Different environments need different configurations (API URLs, keys, etc.)."
          },
          {
            id: 72,
            question: "What is the role of a reverse proxy?",
            options: [
              "To handle requests on behalf of backend servers and provide load balancing",
              "To style web pages",
              "To manage databases",
              "To compile code"
            ],
            correct: 0,
            explanation: "Reverse proxies handle client requests and distribute them to backend servers."
          },
          {
            id: 73,
            question: "What is the purpose of logging in full-stack applications?",
            options: [
              "To track application behavior and debug issues",
              "To style applications",
              "To manage users",
              "To compile code"
            ],
            correct: 0,
            explanation: "Logging helps monitor application health and troubleshoot problems."
          },
          {
            id: 74,
            question: "What is the difference between stateful and stateless applications?",
            options: [
              "Stateful remembers previous interactions, stateless does not",
              "Stateful is faster than stateless",
              "Stateless has more features",
              "Stateful is for frontend only"
            ],
            correct: 0,
            explanation: "Stateful apps maintain session state, stateless apps don't store client data between requests."
          },
          {
            id: 75,
            question: "What is the purpose of API documentation?",
            options: [
              "To describe how to use and integrate with an API",
              "To style the API",
              "To deploy the API",
              "To test the API"
            ],
            correct: 0,
            explanation: "API documentation helps developers understand and use APIs correctly."
          },
          {
            id: 76,
            question: "What is the role of caching in full-stack applications?",
            options: [
              "To store frequently accessed data for faster retrieval",
              "To style applications",
              "To manage databases",
              "To compile code"
            ],
            correct: 0,
            explanation: "Caching improves performance by reducing redundant computations and database queries."
          },
          {
            id: 77,
            question: "What is the purpose of error handling in APIs?",
            options: [
              "To provide meaningful error messages and proper HTTP status codes",
              "To style error pages",
              "To deploy applications",
              "To test applications"
            ],
            correct: 0,
            explanation: "Proper error handling helps clients understand and handle errors gracefully."
          },
          {
            id: 78,
            question: "What is the role of environment variables in security?",
            options: [
              "To store sensitive information like API keys and database passwords",
              "To style secure pages",
              "To manage user permissions",
              "To compile secure code"
            ],
            correct: 0,
            explanation: "Environment variables keep sensitive data out of source code."
          },
          {
            id: 79,
            question: "What is the purpose of input validation?",
            options: [
              "To ensure data integrity and prevent security vulnerabilities",
              "To style input fields",
              "To deploy applications",
              "To test applications"
            ],
            correct: 0,
            explanation: "Input validation protects against malicious data and ensures data quality."
          },
          {
            id: 80,
            question: "What is the role of monitoring in production applications?",
            options: [
              "To track application performance and detect issues",
              "To style monitoring dashboards",
              "To manage databases",
              "To compile code"
            ],
            correct: 0,
            explanation: "Monitoring ensures application reliability and helps identify performance bottlenecks."
          }
        ],
        advanced: [
          {
            id: 81,
            question: "What is the purpose of feature flags?",
            options: [
              "To enable/disable features without deploying new code",
              "To style features differently",
              "To manage database features",
              "To test features"
            ],
            correct: 0,
            explanation: "Feature flags allow controlled feature rollout and A/B testing."
          },
          {
            id: 82,
            question: "What is the role of distributed systems in modern applications?",
            options: [
              "To scale applications across multiple servers and handle large workloads",
              "To style distributed components",
              "To manage distributed databases only",
              "To compile distributed code"
            ],
            correct: 0,
            explanation: "Distributed systems enable horizontal scaling and high availability."
          },
          {
            id: 83,
            question: "What is the purpose of continuous integration/continuous deployment (CI/CD)?",
            options: [
              "To automate testing and deployment processes",
              "To style deployment pipelines",
              "To manage database deployments",
              "To compile code continuously"
            ],
            correct: 0,
            explanation: "CI/CD automates building, testing, and deploying applications."
          },
          {
            id: 84,
            question: "What is the role of microservices in large-scale applications?",
            options: [
              "To break applications into smaller, independently deployable services",
              "To style micro-interactions",
              "To manage small databases",
              "To compile small codebases"
            ],
            correct: 0,
            explanation: "Microservices improve scalability, maintainability, and team autonomy."
          },
          {
            id: 85,
            question: "What is the purpose of API versioning?",
            options: [
              "To manage changes to APIs without breaking existing clients",
              "To style different API versions",
              "To deploy API versions",
              "To test API versions"
            ],
            correct: 0,
            explanation: "API versioning allows evolving APIs while maintaining backward compatibility."
          },
          {
            id: 86,
            question: "What is the role of container orchestration?",
            options: [
              "To manage the deployment, scaling, and operation of containerized applications",
              "To style containers",
              "To manage container databases",
              "To compile container code"
            ],
            correct: 0,
            explanation: "Container orchestration automates container management in production."
          },
          {
            id: 87,
            question: "What is the purpose of distributed caching?",
            options: [
              "To share cache across multiple application instances",
              "To style cached content",
              "To manage cache databases",
              "To compile cache code"
            ],
            correct: 0,
            explanation: "Distributed caching provides consistent cache across multiple servers."
          },
          {
            id: 88,
            question: "What is the role of service mesh in microservices?",
            options: [
              "To handle service-to-service communication, security, and observability",
              "To style service interfaces",
              "To manage service databases",
              "To compile service code"
            ],
            correct: 0,
            explanation: "Service mesh provides infrastructure for reliable microservices communication."
          },
          {
            id: 89,
            question: "What is the purpose of canary deployments?",
            options: [
              "To roll out changes to a small subset of users before full deployment",
              "To style deployment pages",
              "To manage deployment databases",
              "To compile deployment code"
            ],
            correct: 0,
            explanation: "Canary deployments reduce risk by testing changes with a small user group."
          },
          {
            id: 90,
            question: "What is the role of observability in modern applications?",
            options: [
              "To understand system behavior through metrics, logs, and traces",
              "To style observable components",
              "To manage observable databases",
              "To compile observable code"
            ],
            correct: 0,
            explanation: "Observability provides deep insights into system performance and issues."
          }
        ]
      }
    };

    if (info.type === 'job') {
      // For job quizzes, use the quiz category (frontend, backend, fullstack)
      const categoryQuestions = questionDatabase[info.category] || questionDatabase.frontend;
      const level = info.level || 'beginner'; // Default to beginner if no level specified
      return categoryQuestions[level] || categoryQuestions.beginner;
    } else if (info.type === 'skill') {
      // For skill quizzes, use JavaScript questions (you can expand this)
      const skillQuestions = questionDatabase.frontend; // Using frontend questions for skills
      return skillQuestions[info.level] || skillQuestions.beginner;
    }
    
    // Default fallback
    return questionDatabase.frontend.beginner;
  }, []); // Empty dependency array since questionDatabase is now defined inside

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      
      // Also shuffle options for each question
      if (shuffled[i].options) {
        const options = [...shuffled[i].options];
        const correctAnswer = options[shuffled[i].correct];
        
        for (let k = options.length - 1; k > 0; k--) {
          const l = Math.floor(Math.random() * (k + 1));
          [options[k], options[l]] = [options[l], options[k]];
        }
        
        shuffled[i].correct = options.indexOf(correctAnswer);
        shuffled[i].options = options;
      }
    }
    return shuffled;
  };

  useEffect(() => {
    const quizQuestions = getQuestionsByCategory(quizInfo);
    const shuffledQuestions = shuffleArray(quizQuestions).slice(0, 10);
    setQuestions(shuffledQuestions);
    setLoading(false);
  }, [quizInfo, getQuestionsByCategory]);

  // Debug useEffect to track state changes
  useEffect(() => {
    console.log('Quiz State:', {
      quizCompleted,
      score,
      currentQuestion,
      answersCount: Object.keys(answers).length,
      questionsCount: questions.length
    });
  }, [quizCompleted, score, currentQuestion, answers, questions]);

  const handleQuizComplete = useCallback(() => {
    // Calculate score directly to ensure accuracy
    const correctAnswers = questions.filter(q => answers[q.id] === q.correct).length;
    const totalQuestions = questions.length;
    const finalScore = Math.round((correctAnswers / totalQuestions) * 100);
    
    console.log('Quiz completed!', {
      score: finalScore,
      correctAnswers,
      totalQuestions,
      answers: answers
    });

    // Set the score and mark as completed
    setScore(finalScore);
    setQuizCompleted(true);
    
    // Save quiz result to localStorage
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    const quizResults = userData.quizResults || [];
    
    const newResult = {
      id: Date.now(), // Unique ID for this attempt
      type: quizInfo.type,
      skill: quizInfo.skill || quizInfo.role,
      company: quizInfo.company || 'Skill Assessment',
      level: quizInfo.level || 'beginner',
      category: quizInfo.category || 'Programming',
      score: finalScore,
      correctAnswers: correctAnswers,
      totalQuestions: totalQuestions,
      timeTaken: 900 - timeRemaining,
      date: new Date().toISOString(),
      answers: questions.map(question => ({
        questionId: question.id,
        question: question.question,
        userAnswer: answers[question.id],
        correctAnswer: question.correct,
        isCorrect: answers[question.id] === question.correct,
        explanation: question.explanation
      }))
    };
    
    console.log('Saving quiz result:', newResult);
    
    userData.quizResults = [newResult, ...quizResults]; // Add to beginning of array
    localStorage.setItem('user', JSON.stringify(userData));
    
    if (onComplete) {
      onComplete(finalScore);
    }
  }, [questions, answers, quizInfo, timeRemaining, onComplete]);

  // Timer effect
  useEffect(() => {
    if (!loading && !quizCompleted && timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeRemaining === 0) {
      handleQuizComplete();
    }
  }, [loading, quizCompleted, timeRemaining, handleQuizComplete]);

  const handleAnswer = (questionId, answerIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      // Use setTimeout to ensure all state updates are processed
      setTimeout(() => {
        handleQuizComplete();
      }, 100);
    }
  };

  const prevQuestion = () => {
    setCurrentQuestion(prev => Math.max(0, prev - 1));
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (loading) {
    return (
      <div className="quiz-loading">
        <div className="loading-spinner"></div>
        <p>Preparing your assessment...</p>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="quiz-error">
        <i className="fas fa-exclamation-triangle"></i>
        <p>No questions available for this assessment.</p>
      </div>
    );
  }

  if (quizCompleted) {
    // Calculate score directly here to ensure it's always accurate
    const correctAnswers = questions.filter(q => answers[q.id] === q.correct).length;
    const totalQuestions = questions.length;
    const finalScore = Math.round((correctAnswers / totalQuestions) * 100);
    
    return (
      <div className="quiz-results">
        <div className="results-header">
          <div className={`results-icon ${finalScore >= 70 ? 'excellent' : finalScore >= 50 ? 'good' : 'poor'}`}>
            {finalScore >= 70 ? '🏆' : finalScore >= 50 ? '⭐' : '📚'}
          </div>
          <h3>Assessment Complete!</h3>
          <p>
            {quizInfo.type === 'job' 
              ? `Your ${quizInfo.company} ${quizInfo.role} Assessment Results`
              : `Your ${quizInfo.skill} Skill Assessment Results`
            }
          </p>
        </div>

        <div className="score-display">
          <div className="score-circle" style={{'--score-percent': `${finalScore}%`}}>
            <span className="score-percent">{finalScore}%</span>
            <div className="score-text">Score</div>
          </div>
          <div className="score-details">
            <div className="detail-item">
              <span className="detail-label">Correct Answers:</span>
              <span className="detail-value">{correctAnswers}/{totalQuestions}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Time Taken:</span>
              <span className="detail-value">{formatTime(900 - timeRemaining)}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Difficulty:</span>
              <span className="detail-value">{quizInfo.level || 'Mixed'}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Assessment Type:</span>
              <span className="detail-value">
                {quizInfo.type === 'job' ? 'Company Assessment' : 'Skill Assessment'}
              </span>
            </div>
          </div>
        </div>

        <div className="performance-feedback">
          <h4>
            {finalScore >= 80 ? 'Excellent Work! 🎉' : 
             finalScore >= 60 ? 'Good Job! 👍' : 
             'Keep Practicing! 💪'}
          </h4>
          <p>
            {finalScore >= 80 ? 'You have demonstrated strong knowledge in this area.' :
             finalScore >= 60 ? 'You have a good understanding of the fundamentals.' :
             'Review the concepts and try again to improve your understanding.'}
          </p>
          
          {finalScore < 70 && (
            <div className="improvement-tips">
              <h5>Tips for Improvement:</h5>
              <ul>
                <li>Review the questions you answered incorrectly</li>
                <li>Practice more with similar difficulty level</li>
                <li>Focus on the key concepts of {quizInfo.category}</li>
                <li>Take the assessment again to track your progress</li>
              </ul>
            </div>
          )}
        </div>

        <div className="results-actions">
          <button 
            className="btn-retry" 
            onClick={() => {
              // Reset the quiz completely
              setCurrentQuestion(0);
              setAnswers({});
              setQuizCompleted(false);
              setScore(0);
              setTimeRemaining(900);
            }}
          >
            <i className="fas fa-redo"></i>
            Retry Assessment
          </button>
          <button 
            className="btn-review" 
            onClick={() => {
              // Navigate to profile page
              window.location.href = '/profile';
            }}
          >
            <i className="fas fa-chart-bar"></i>
            View Profile
          </button>
        </div>

        {/* Detailed Results Section */}
        <div className="detailed-results">
          <h4>Question Review</h4>
          <div className="questions-review">
            {questions.map((question, index) => {
              const userAnswer = answers[question.id];
              const isCorrect = userAnswer === question.correct;
              
              return (
                <div key={question.id} className={`question-review ${isCorrect ? 'correct' : 'incorrect'}`}>
                  <div className="question-header">
                    <span className="question-number">Question {index + 1}</span>
                    <span className={`result-status ${isCorrect ? 'correct' : 'incorrect'}`}>
                      {isCorrect ? '✓ Correct' : '✗ Incorrect'}
                    </span>
                  </div>
                  <p className="review-question">{question.question}</p>
                  <div className="answer-comparison">
                    <div className="user-answer">
                      <strong>Your answer:</strong> {question.options[userAnswer]}
                    </div>
                    {!isCorrect && (
                      <div className="correct-answer">
                        <strong>Correct answer:</strong> {question.options[question.correct]}
                      </div>
                    )}
                  </div>
                  {question.explanation && (
                    <div className="explanation">
                      <strong>Explanation:</strong> {question.explanation}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const selectedAnswer = answers[question.id];
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const isLastQuestion = currentQuestion === questions.length - 1;

  return (
    <div className="quiz">
      <div className="quiz-header">
        <div className="quiz-info">
          <h3>
            {quizInfo.type === 'job' 
              ? `${quizInfo.company} - ${quizInfo.role}`
              : `${quizInfo.skill} Skill Assessment`
            }
          </h3>
          <p>
            {quizInfo.type === 'job' 
              ? `Company Assessment • ${quizInfo.category}`
              : `${quizInfo.level} Level • ${quizInfo.category}`
            }
          </p>
        </div>
        <div className="quiz-meta">
          <div className="timer">
            <i className="fas fa-clock"></i>
            {formatTime(timeRemaining)}
          </div>
          <div className="quiz-progress">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </div>
      </div>

      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{width: `${progress}%`}}
        ></div>
      </div>

      <div className="quiz-content">
        <div className="question">
          <h4>{question.question}</h4>
          <div className="options">
            {question.options.map((option, index) => (
              <label 
                key={index} 
                className={`option ${selectedAnswer === index ? 'selected' : ''}`}
              >
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  checked={selectedAnswer === index}
                  onChange={() => handleAnswer(question.id, index)}
                />
                <span className="option-text">{option}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="quiz-navigation">
          <button
            onClick={prevQuestion}
            disabled={currentQuestion === 0}
            className="nav-button prev"
          >
            <i className="fas fa-arrow-left"></i>
            Previous
          </button>
          
          <div className="question-counter">
            {currentQuestion + 1} / {questions.length}
          </div>

          <button
            onClick={nextQuestion}
            disabled={selectedAnswer === undefined}
            className={`nav-button next ${isLastQuestion ? 'finish-btn' : ''}`}
          >
            {isLastQuestion ? 'Finish Assessment' : 'Next Question'}
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;