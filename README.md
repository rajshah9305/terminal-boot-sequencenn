# Terminal Boot Sequence

A retro-futuristic terminal boot animation with CRT effects, built with React, Tailwind CSS, and Framer Motion. This project showcases a stylized system boot sequence with color-coded messages, scanlines, and vignette effects.

## 🎨 Features

- **Retro Terminal Aesthetic**: Authentic CRT scanlines and grain effects
- **Color-Coded Messages**: Different message types (success, warning, error, system, hero) with distinct styling
- **Smooth Animations**: Framer Motion-powered entrance animations and cursor blinking
- **Responsive Design**: Works seamlessly on mobile and desktop devices
- **Dark Theme**: Optimized dark color scheme for terminal feel
- **Auto-Scrolling**: Terminal output automatically scrolls as new lines appear
- **Production-Ready**: TypeScript, error handling, and best practices included

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ (or pnpm 9+)
- pnpm (recommended) or npm/yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/terminal-boot-sequence.git
cd terminal-boot-sequence

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

The application will be available at `http://localhost:3000`

### Build for Production

```bash
# Build the project
pnpm build

# Preview production build
pnpm preview
```

## 📦 Project Structure

```
terminal-boot-sequence/
├── client/
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── contexts/        # React contexts
│   │   ├── pages/           # Page components
│   │   │   └── Home.tsx     # Terminal boot sequence
│   │   ├── App.tsx          # Main app component
│   │   ├── index.css        # Global styles
│   │   └── main.tsx         # Entry point
│   └── index.html           # HTML template
├── server/                  # Express server (placeholder)
├── package.json             # Dependencies and scripts
├── vercel.json              # Vercel deployment config
├── tsconfig.json            # TypeScript configuration
└── tailwind.config.ts       # Tailwind CSS configuration
```

## 🛠️ Tech Stack

- **React 19**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS 4**: Utility-first CSS framework
- **Framer Motion**: Animation library
- **Vite**: Build tool and dev server
- **Wouter**: Lightweight router
- **shadcn/ui**: Component library

## 🎯 Customization

### Boot Sequence Messages

Edit the `BOOT_SEQUENCE` array in `client/src/pages/Home.tsx` to customize messages:

```typescript
const BOOT_SEQUENCE: BootLine[] = [
  { id: '1', text: 'Your custom message', style: 'success', delay: 100 },
  // Add more lines...
];
```

### Color Scheme

Modify the dark theme colors in `client/src/index.css`:

```css
.dark {
  --primary: var(--color-orange-500);
  --background: oklch(0.08 0.002 0);
  --foreground: oklch(0.95 0.001 0);
  /* ... other colors ... */
}
```

### Animations

Adjust animation timings in `client/src/pages/Home.tsx`:

```typescript
// Terminal window entrance
initial={{ scale: 0.95, opacity: 0 }}
animate={{ scale: 1, opacity: 1 }}
transition={{ duration: 0.5 }}

// Cursor blink
animate={{ opacity: [1, 0] }}
transition={{ repeat: Infinity, duration: 0.8 }}
```

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will automatically detect the configuration and deploy
4. Environment variables are automatically configured

```bash
# Or deploy via CLI
npm install -g vercel
vercel
```

### Other Platforms

- **Netlify**: Connect GitHub repo, set build command to `pnpm build`
- **GitHub Pages**: Configure for static hosting
- **Self-hosted**: Build with `pnpm build` and serve the `dist` folder

## 📝 Scripts

```bash
# Development
pnpm dev          # Start dev server with hot reload
pnpm check        # TypeScript type checking
pnpm format       # Format code with Prettier

# Production
pnpm build        # Build for production
pnpm preview      # Preview production build locally
pnpm start        # Start production server
```

## 🎨 Design Philosophy

This project follows a **retro-futuristic terminal aesthetic** with modern motion design:

- **Typography**: JetBrains Mono for monospace, Inter for UI text
- **Colors**: Dark background with orange accent (primary), green for success, orange for warnings
- **Effects**: CRT scanlines, grain texture, vignette, and subtle shadows
- **Motion**: Smooth entrance animations, blinking cursor, auto-scroll
- **Responsiveness**: Mobile-first approach with adaptive sizing

## 🔧 Environment Variables

Create a `.env.local` file for local development (optional):

```env
VITE_ANALYTICS_ENDPOINT=https://analytics.example.com
VITE_ANALYTICS_WEBSITE_ID=your_website_id
```

See `.env.example` for all available variables.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues, questions, or suggestions, please open an issue on GitHub.

---

**Built with ❤️ using React, Tailwind CSS, and Framer Motion**
