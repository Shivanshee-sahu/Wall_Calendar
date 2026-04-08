# 📅 Vibrant Flow Calendar

A polished, interactive React calendar component built for the Frontend Engineering Challenge. This project translates the classic physical wall calendar aesthetic into a high-performance, responsive web experience.

---
## 🚀 Live Demo
👉https://wall-calendar-inky.vercel.app/

---

## ✨ Key Features

- **Wall Calendar Aesthetic:**  
  Features a prominent hero image anchor with a spiral-binding visual effect.

- **Dynamic Seasonal Themes:**  
  The UI automatically shifts its color palette (hue, saturation, and light) and hero imagery based on the current month.

- **Interactive Day Range Selector:**  
  Fluid date range selection logic with clear visual indicators for start dates, end dates, and spanning ranges.

- **Integrated Notes System:**  
  A persistent notes panel that allows users to attach memos to specific date ranges, featuring search and delete functionality.

- **3D Page Flip Animations:**  
  Custom CSS keyframe animations that simulate the physical act of flipping a wall calendar page when navigating months.

- **Fully Responsive:**  
  A "Mobile-First" approach using Tailwind CSS. Desktop features a balanced side-by-side split, while mobile gracefully stacks for touch-friendly use.

---

## 🛠️ Tech Stack

- **Framework:** React 18 with TypeScript  
- **Styling:** Tailwind CSS (with custom HSL variable mapping for dynamic themes)  
- **Icons:** Lucide React  
- **Date Utility:** date-fns  
- **UI Components:** Radix UI (Tooltips) & Shadcn UI (Buttons/Inputs)  
- **State Management:** React Hooks (`useState`, `useMemo`, `useCallback`) with `localStorage` for data persistence  

---

## 🧠 Design Choices & Philosophy

### 1. Dynamic Theming
Instead of a static "one-size-fits-all" design, I implemented a Seasonal Theme engine. By mapping HSL color variables to the current month, the entire interface breathes and changes color naturally as the user navigates the year, enhancing the "physical calendar" feel.

### 2. 3D Transitions
To stand out, I utilized the `perspective` and `rotateX` CSS properties. This adds a layer of depth and delight, making the transition between months feel tactile rather than just a simple state change.

### 3. Balanced UX
I chose a 40/60 split for the desktop view. This ensures the calendar grid remains large enough for readability (especially for the date numbers) while giving the notes section enough horizontal space for long-form text.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)  
- npm (installed by default with Node)  

---

### Installation

Clone the repository:

```bash
git clone <repo-link>
cd daily-flow-calendar
