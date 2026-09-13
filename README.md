# DecodeLabs
ALL Projects I Completed During My INTERNSHIP in DecodeLabs

Welcome to my project repository! This directory contains a collection of my backend applications, microservices, and experiments, built with a focus on clean architecture, modular code, and lightweight dependencies.

---

## 🛠 Tech Stack Overview

- **Runtime & Frameworks:** Node.js, Express.js
- **Databases:** MongoDB / PostgreSQL / MySQL
- **Tooling & Utilities:** Environment Configs (`dotenv`), CORS, REST APIs
- **Version Control:** Git, GitHub

---

## 📂 Featured Projects

### 1. 📦 [Project 1]
> A brief 1-2 sentence description of what this project does and the main problem it solves.

- **Key Features:**
  - Standardized JSON API responses (`{ success, data, message }`)
  - Modular routing (`routes`, `controllers`, `config`)
  - Integrated error handling and environment variable configuration
- **Tech Used:** Node.js, Express, MongoDB
- **Folder / Link:** `./project-one`

---

### 2. 🔑 [Project 2]
> A brief 1-2 sentence description of this second project (e.g., Auth Service, Task Manager).

- **Key Features:**
  - User registration and JWT authentication
  - Protected middleware routes
  - Role-based access control
- **Tech Used:** Node.js, Express, JSON Web Tokens
- **Folder / Link:** `./project-two`

---

### 3. ⚡ [Project 3]
> A brief 1-2 sentence description of a lightweight microservice or utility application.

- **Key Features:**
  - Real-time data processing or RESTful CRUD operations
  - Minimal dependency setup for fast boot times
- **Tech Used:** Node.js, Express
- **Folder / Link:** `./project-three`

---

## 🤖 AI Agent Prompt (For Junior/Intern Workflows)

Use the following system prompt to keep AI-generated backends clean, minimal, and dependency-light:

```text
Act as a Senior Backend Lead guiding an Intern Developer. 

Your goal is to generate clean, minimal, production-ready Node.js / Express backend code for the requested features without unnecessary bloat or secondary artifacts.

### RULES & CONSTRAINTS:
1. LEAN ARCHITECTURE:
   - Provide ONLY essential core application code files.
   - Do NOT output package-lock.json, Postman collections, OpenAPI/Swagger specifications, or heavy external setup files unless explicitly asked.
   - Keep dependencies lightweight. Stick strictly to standard production essentials (e.g., Express, dotenv, cors). Avoid installing unnecessary dev dependencies or extra validation/documentation libs for basic setup.

2. CLEAN & ACCESSIBLE CODE (INTERN-FRIENDLY):
   - Use ES Modules (`import/export`) or CommonJS modular structure cleanly separated into `routes`, `controllers`, and `config`.
   - Write simple, clear code comments explaining key business logic and middleware flow.
   - Implement basic error handling using standard `try/catch` and simple standard responses: `{ success: true|false, data, message }`.

3. OUTPUT FORMAT:
   - Provide a simplified `package.json` with only core scripts (`start`, `dev`).
   - Group file outputs logically inside readable code blocks with clear filenames at the top of each block.
