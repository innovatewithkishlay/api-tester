# API Tester

[![Open Source](https://img.shields.io/badge/open--source-brightgreen)](https://github.com/innovatewithkishlay/api-tester)  
[![License: MIT](https://img.shields.io/github/license/innovatewithkishlay/api-tester)](https://github.com/innovatewithkishlay/api-tester/blob/main/LICENSE)

A delightfully open-source API testing tool built with React and TypeScript.  
Quickly build, send, and view API requests with support for all the HTTP verbs you love (GET, POST, PUT, PATCH, DELETE), customizable headers, JSON request bodies, syntax-highlighted responses, request history, and environment variable substitution — all in a UI that won’t make your eyes bleed.

Environment variables make creating reusable API requests a breeze. It’s like Postman, but lighter, faster, and with fewer corporate popups.

Open source and community contributions are always welcome (and encouraged)!

**Visit the repo:** [https://github.com/innovatewithkishlay/api-tester](https://github.com/innovatewithkishlay/api-tester)

---

## Features

- **HTTP methods:** GET, POST, PUT, PATCH, DELETE (the classics)
- **Editable request URL, headers, and JSON body**
- **Syntax-highlighted JSON response viewer** (with status and timing)
- **Request history panel** (click to relive your greatest hits)
- **Environment variables manager** for reusable values (e.g., `{{baseUrl}}`, `{{token}}`)
- **Automatic variable substitution** across URL, headers, and body
- **Responsive, clean UI** with Tailwind CSS
- **LocalStorage persistence** for history and environments
- **Light mode UI** for simplicity (dark mode fans, sorry!)

---

## Folder Structure

```
api-tester/
├── node_modules/             # Where dependencies go to hang out
├── public/                   # Static assets and index.html
├── src/
│   ├── components/           # React components
│   │   ├── ApiForm.tsx           # Main API testing form and logic
│   │   ├── EnvironmentManager.tsx# Environment variables management UI
│   │   ├── HistoryPanel.tsx      # Request history UI
│   │   ├── ResponseViewer.tsx    # API response display with syntax highlighting
│   │   └── App.tsx               # Root app component
│   ├── assets/               # Images, fonts, etc. (if any)
│   ├── main.tsx              # React entry point
│   └── index.css             # Tailwind CSS imports and global styles
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript config
├── package.json              # NPM project metadata and scripts
├── README.md                 # This file!
└── vite.config.ts            # Vite build config
```

---

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn (pick your favorite)

### Installation

```bash
# Clone the repo
git clone https://github.com/innovatewithkishlay/api-tester.git
cd api-tester

# Install dependencies
npm install
# or, if you prefer yarn
yarn install

# Start the dev server
npm run dev
# or
yarn dev
```

Now open [http://localhost:5173](http://localhost:5173) in your browser and bask in the glory of your new API testing tool.

---

## Usage

### 1. Manage Environments

- Use the Environments panel at the top to create named environments (e.g., Development, Staging, Production).
- Add key-value pairs for variables like `baseUrl`, `token`, etc.
- Environments are saved locally (in your browser’s localStorage, not in the cloud — your secrets are safe).

### 2. Select Active Environment

- Pick your active environment from the dropdown.
- Variables from this environment will be substituted in your requests (magic!).

### 3. Build and Send Requests

- Select HTTP method (GET, POST, PUT, PATCH, DELETE).
- Enter the request URL. Use variables like `{{baseUrl}}/api/users`.
- Add or edit request headers (with variable substitution, e.g., `Authorization: Bearer {{token}}`).
- For methods with bodies (POST, PUT, PATCH), enter valid JSON and use variables.
- Click **Send Request** and watch the magic happen.

### 4. View Responses and History

- See status code, time taken, headers, and JSON data (with syntax highlighting, because you deserve it).
- Request history panel lists previous requests — click to reload and relive your finest moments.

---

## Contribution

Contributions make the open source world go round!  
If you have suggestions or improvements:

1. **Fork** the repository.
2. **Create your feature branch:**
  ```bash
  git checkout -b feature/your-feature-name
  ```
3. **Commit your changes:**
  ```bash
  git commit -m "Add some feature"
  ```
4. **Push to your branch:**
  ```bash
  git push origin feature/your-feature-name
  ```
5. **Open a Pull Request** on GitHub.

Please make sure your code lints and passes tests (if any).  
Bonus points for funny commit messages.

---

## License

MIT License — do what you want, just don’t blame me if you break the internet.

---

## Contact

**Kishlay Verma**  
GitHub: [@innovatewithkishlay](https://github.com/innovatewithkishlay)

---

Thank you for using and contributing to API Tester! 🚀  
Now go break some APIs (responsibly)!
