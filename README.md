
# 🌿 EcoTrack — Sustainability Home Score App

EcoTrack is a lightweight, responsive web app that calculates a **sustainability score** for a home and displays a personalized result with emoji, color themes, and a clean UI.
It also includes a **light/dark mode toggle with animated sun/moon icons** that stays fixed while scrolling.

---

## ✨ Features

### ✔ Score-Based Feedback

Scores are categorized into three levels:

| Score Range | Emoji | Label                                |
| ----------- | ----- | ------------------------------------ |
| **100**     | 🌟    | Perfect — outstanding sustainability |
| **70–99**   | 🌿    | Green Home — thriving                |
| **40–69**   | 😐    | Neutral — room to grow               |
| **0–39**    | 🗑️   | Wasteful — small changes help        |

Each result comes with custom background, text, and accent colors.

---

### 🌗 Light/Dark Mode Toggle

* Floating button fixed at the top-right
* Smooth **rotate animation** when switching themes
* Uses **Sun** for dark mode and **Moon** for light mode
* Fully Tailwind-friendly (`dark:` classes supported)

---

## 🛠️ Tech Stack

* **React** (with hooks)
* **TailwindCSS** for styling
* **Lucide Icons** (Sun & Moon)
* Optional: Emojis for icon fallback

---

## 📦 Installation

```bash
git clone https://github.com/your-repo/ecoscore-app.git
cd ecoscore-app
npm install
npm run dev
```

Open in browser:

```
http://localhost:5173
```

---

## 🧩 Core Files

### `ThemeToggle.jsx`

Contains the floating Sun/Moon theme switcher with rotation animation.

### `tailwind.config.js`

Includes custom `spinOnce` keyframes for icon animation.

### `scoreLogic.js` (or inside component)

Returns the correct emoji, label, and colors based on the user’s score.

---

## 🔧 How Scoring Works

```js
if (score === 100) {...}
else if (score >= 70) {...}
else if (score >= 40) {...}
else {...}
```

Your UI reads this output and styles the component accordingly.

---

## 🎨 UI/UX Highlights

* Soft colors with Tailwind tokens
* Smooth icon rotation
* Floating controls that stay on screen
* Fully mobile-responsive
* Clean, accessible layout

---

## 🚀 Future Enhancements (optional)

* Save user score locally for history
* Add tips for improving sustainability
* Add charts using Recharts
* Include a multi-step questionnaire

---

## 🧾 Credits

This project’s base design and structure were created using Anything AI.

---

## 📄 License

MIT License — free to use, modify, and share.


