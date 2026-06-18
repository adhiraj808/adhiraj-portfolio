# 🚀 Custom Glow Portfolio Template

A modern, highly customizable, and responsive dark-theme portfolio website template built with Next.js, Framer Motion, and Tailwind CSS. It features glowing border effects, hover glare transitions, and smooth scrolling animations.

## 📁 Project Structure

```text
├── public/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── contact/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── hero/
│   │   │   ├── hero-section.tsx
│   │   │   └── images/
│   │   │       ├── 4thSection-croped.png
│   │   │       └── man-alone.jpg
│   │   ├── layout/
│   │   ├── sections/
│   │   └── shared/
│   ├── data/
│   │   └── site-content.ts
│   └── lib/
│       └── utils.ts
├── package.json
└── tsconfig.json
```

---

## 🛠️ How to Setup & Customize (For Others)

If you want to use this repository to build your own portfolio, follow these steps:

### 1. Installation
Clone the repository and install the dependencies:
```bash
git clone <your-repository-url>
cd updated-portfolio
npm install
```

### 2. Configure Environment Variables
This template uses Nodemailer to send emails through the contact form. 
1. Copy the `.env.example` file to create a `.env` file:
   ```bash
   cp .env.example .env
   ```
2. Open `.env` and fill in your SMTP credentials (do NOT commit this `.env` file to GitHub):
   ```env
   EMAIL_USER=your-email@example.com
   EMAIL_PASS=your-app-password
   ```

### 3. Customize Your Content
You do not need to edit complex HTML/CSS to change your details. All of the website's content is central in a single file:
*   Open **`src/data/site-content.ts`**.
*   Modify the `navItems`, `keyMetrics`, `projects`, and `skills` objects with your own information.

### 4. Replace Images & CV
*   **Hero Images**: Replace the files in `src/components/hero/images/` with your own images (keep the names `4thSection-croped.png` and `man-alone.jpg` or update their references in `src/components/hero/hero-section.tsx`).
*   **CV/Resume**: Replace `public/resume.pdf` with your own resume PDF.

### 5. Running & Building
*   Start the local development server:
    ```bash
    npm run dev
    ```
*   Build the production bundle:
    ```bash
    npm run build
    ```

---

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details. You are free to copy, modify, and distribute this template for your own portfolio.
