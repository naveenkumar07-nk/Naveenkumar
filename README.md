# Shankar Travels Portfolio Website

A premium, modern portfolio website built for Shankar Travels to showcase their vehicles (Force Urbania and Traveller) and services. The website features a beautiful dark theme (Charcoal & Gold) and full bilingual support (Tamil & English).

## Tech Stack
- **Framework:** [Next.js (App Router)](https://nextjs.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## Getting Started

Follow these steps to run the website on your local computer.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your computer.

### 1. Install Dependencies
Open a terminal in the project folder and run:
```bash
npm install
```

### 2. Run the Development Server
To start the website locally, run:
```bash
npm run dev
```

### 3. View the Website
Open your browser and navigate to:
[http://localhost:3000](http://localhost:3000)

---

## How to Customize Content

### Updating Images
All images are located in the `public/images/` directory. To update an image, simply replace the file in that directory with your new image, ensuring the file name matches.
- Hero Background: `public/images/main_photo.jpeg`
- Urbania: `public/images/urbania.jpg`
- Traveller: `public/images/travells_photo.jpeg`
- Owner Photo: `public/images/owner_photo.jpg`

### Updating Text (Tamil / English)
All text content is managed through a central dictionary file. To change any text (like descriptions, names, or titles):
1. Open `src/locales/index.ts`
2. You will see both `en` (English) and `ta` (Tamil) sections.
3. Update the text strings inside the quotes.

### Updating Phone Numbers
- Open `src/components/layout/MobileBottomBar.tsx` to update the sticky mobile contact numbers.
- Open `src/components/sections/Team.tsx` to update the owner and driver contact numbers.
- Open `src/components/sections/Contact.tsx` to update the main footer contact numbers.
