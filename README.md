# Moonlit River Dreams - Portfolio Template

A beautiful, animated portfolio template for 2D Artists, UI/UX Designers, and Creative Professionals. Built with Next.js 14, featuring a unique day-night cycle sky animation that transitions as you scroll through sections.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?style=flat-square&logo=tailwind-css)
![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?style=flat-square&logo=greensock)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

## Features

- **Day-Night Cycle Animation** - Continuous sky gradient that scrolls with page transitions, simulating time passing from midnight to sunset
- **Slideshow Navigation** - Fixed viewport with smooth page-flip transitions (no traditional scrolling)
- **Realistic Sun/Moon** - Multi-layered celestial bodies with glow effects and proper positioning for each time of day
- **Twinkling Stars** - Canvas-based star field with randomized twinkle animations
- **Drifting Clouds** - SVG clouds that change color based on time of day
- **Sliding Nav Indicator** - Smooth animated indicator that slides between navigation items
- **Responsive Design** - Fully responsive across all devices
- **Touch & Keyboard Support** - Swipe gestures and keyboard navigation
- **GSAP Animations** - Smooth, professional animations throughout

## Sections

| Section | Time of Day | Theme |
|---------|-------------|-------|
| Home | Midnight (12 AM) | Deep night sky with moon and stars |
| About | Dawn (5-6 AM) | Rising sun with warm orange gradients |
| Works | Morning (9-10 AM) | Bright sky with sun rays |
| Skills | Noon (12 PM) | Clear blue sky with sun at peak |
| Contact | Sunset (6 PM) | Golden hour with setting sun |

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/moonlit-portfolio.git
cd moonlit-portfolio
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio.

## Customization

### Personal Information

Edit `src/lib/constants.ts` to update your personal information:

```typescript
export const siteConfig = {
  name: "Your Name",
  title: "Your Name | Your Title",
  tagline: "Your tagline here",
  
  social: {
    email: "your@email.com",
    linkedin: "https://linkedin.com/in/yourprofile",
    behance: "https://behance.net/yourprofile",
    // ... add or remove social links
  },
  
  about: {
    intro: "Hello, I'm [Name]",
    description: "Your bio here...",
    education: {
      school: "Your University",
      major: "Your Major",
      year: "20XX - 20XX"
    }
  },
  
  skills: {
    tools: [
      { name: "Photoshop", icon: "Ps" },
      // ... your tools
    ],
    capabilities: [
      { label: "2D Game Art" },
      // ... your capabilities
    ]
  }
};

export const portfolioItems = [
  {
    id: 1,
    title: "Project Name",
    category: "Category",
    image: "/portfolio/image.jpg",
    description: "Project description...",
    tools: ["Tool1", "Tool2"],
    year: "2024"
  },
  // ... add more projects
];
```

### Assets

- **Logo**: Replace `/public/logo.png` with your logo/avatar
- **CV**: Place your CV at `/public/cv.pdf`
- **Portfolio Images**: Add project images to `/public/portfolio/`
- **Favicon**: Replace `/public/favicon.ico`

### Colors

Edit the CSS variables in `src/app/globals.css`:

```css
:root {
  --deep-night: #0A0A0F;
  --midnight-blue: #0F1123;
  --moon-glow: #E8E4D9;
  --celestial-blue: #6B7FD7;
  --river-teal: #5BA4A4;
  /* ... customize your color palette */
}
```

### Sky Gradients

Modify sky colors in `src/components/layout/ContinuousSky.tsx` for each time of day.

## Project Structure

```
src/
├── app/
│   ├── globals.css      # Global styles & CSS variables
│   ├── layout.tsx       # Root layout with fonts
│   └── page.tsx         # Main page with navigation logic
├── components/
│   ├── layout/
│   │   ├── Header.tsx       # Navigation with sliding indicator
│   │   ├── ContinuousSky.tsx # Day-night sky animation
│   │   ├── StarField.tsx    # Canvas star animation
│   │   └── Clouds.tsx       # Drifting cloud SVGs
│   └── sections/
│       ├── HeroSection.tsx      # Home/Midnight
│       ├── AboutSection.tsx     # About/Dawn
│       ├── PortfolioSection.tsx # Works/Morning
│       ├── SkillsSection.tsx    # Skills/Noon
│       └── ContactSection.tsx   # Contact/Sunset
└── lib/
    ├── constants.ts     # Site configuration & data
    └── utils.ts         # Utility functions
```

## Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [GSAP](https://greensock.com/gsap/)
- **Fonts**: [Google Fonts](https://fonts.google.com/) (Quicksand, Inter)

## Deployment

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/moonlit-portfolio)

### Netlify

```bash
npm run build
# Deploy the `.next` folder
```

### Static Export

```bash
# Add to next.config.js:
# output: 'export'

npm run build
# Deploy the `out` folder
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Lighthouse Score: 95+ (Performance)
- First Contentful Paint: < 1s
- Optimized images with Next.js Image component
- Minimal JavaScript bundle

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Design inspired by the beauty of Vietnamese moonlit rivers
- Sun/moon effects inspired by traditional East Asian art
- Built with love for the creative community

## Author

**Moonlit River Dreams Template**

Created as a portfolio for 2D Artists and UI/UX Designers who want their work to shine under beautiful skies.

---

If you found this template useful, please consider giving it a star on GitHub!
