# Mogeeb.ai - Arabic AI Platform

A modern, professional React website for Mogeeb.ai, the leading Arabic artificial intelligence platform serving the MENA region.

## 🌟 Features

- **Clean, Modern Design**: Professional website with dark teal (#28565a) and vibrant orange (#fa7412) brand colors
- **Live Chatbot Demo**: Interactive Arabic AI chatbot demonstration with bilingual support
- **Smooth Animations**: Elegant animations powered by Framer Motion
- **Responsive Design**: Fully responsive layout optimized for all devices
- **Arabic NLP Showcase**: Highlighting AraBERT integration and n8n workflows
- **Company Statistics**: Visual presentation of 500K+ users and regional impact
- **Bilingual Content**: English and Arabic content throughout the site

## 🛠️ Technology Stack

- **Framework**: Next.js 14 with TypeScript
- **Styling**: Tailwind CSS with custom brand colors
- **Animations**: Framer Motion for smooth, playful animations
- **Icons**: Lucide React for modern iconography
- **Development**: Hot reloading and optimized builds

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mogeeb-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:3000` (or `http://localhost:3001` if 3000 is in use)

### Build for Production

```bash
npm run build
npm start
```

## 📱 Features Overview

### Hero Section
- Dynamic text animation showcasing key messages
- Animated floating elements and chatbot mockup
- Call-to-action buttons with hover effects
- Real-time statistics preview

### Interactive Chatbot Demo
- Live Arabic AI conversation simulation
- Bilingual message support (Arabic/English)
- Realistic typing indicators and animations
- Quick question suggestions
- Real-time message handling

### Features Showcase
- Six key feature cards with custom animations
- Hover effects and smooth transitions
- Arabic NLP, n8n integration, scalability highlights
- MENA region focus and SME specialization

### Statistics & Achievements
- Animated counter components
- 500K+ users, 15+ countries served
- Partnership highlights and company milestones
- Visual timeline of company journey

### About Section
- Company mission and vision
- Technology stack overview
- Core values with bilingual descriptions
- Interactive timeline of company growth

## 🎨 Design System

### Brand Colors
- **Primary Teal**: `#28565a` - Main brand color for headers, buttons
- **Secondary Orange**: `#fa7412` - Accent color for highlights, CTAs
- **Background**: Clean white with subtle gradients
- **Text**: Gray scale for optimal readability

### Typography
- Modern sans-serif fonts for excellent readability
- Hierarchical text sizing (text-4xl to text-sm)
- Bold headings with gradient text effects
- Bilingual text support (English/Arabic)

### Animations
- Fade-in transitions for content reveal
- Hover effects on interactive elements
- Smooth scroll-triggered animations
- Playful floating elements and micro-interactions

## 🌍 Internationalization

The website features bilingual content:
- **English**: Primary language for international reach
- **Arabic**: Native language support for MENA region
- Proper RTL (Right-to-Left) text direction where appropriate
- Cultural sensitivity in design and messaging

## 📦 Project Structure

```
src/
├── app/
│   ├── globals.css          # Global styles and Tailwind config
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main homepage component
├── components/
│   ├── Navbar.tsx           # Navigation with mobile responsive menu
│   ├── HeroSection.tsx      # Hero with animations and CTAs
│   ├── FeaturesSection.tsx  # Six feature cards with hover effects
│   ├── ChatbotDemo.tsx      # Interactive chatbot demonstration
│   ├── StatsSection.tsx     # Animated statistics and achievements
│   ├── AboutSection.tsx     # Company information and timeline
│   └── Footer.tsx           # Footer with links and newsletter
└── ...
```

## 🔧 Configuration

### Tailwind Configuration
Custom colors and animations are defined in `tailwind.config.js`:
- Brand colors: `teal`, `orange`, `brand-teal`, `brand-orange`
- Custom animations: `fade-in`, `slide-up`, `bounce-gentle`
- Responsive breakpoints for mobile-first design

### Next.js Configuration
- TypeScript support enabled
- App Router for modern routing
- Optimized image handling
- ESLint integration for code quality

## 🚀 Deployment

### Netlify Deployment

This project is configured for easy deployment to Netlify:

1. **Push to GitHub**: Ensure your code is pushed to GitHub
2. **Sign up/login to Netlify**: Visit [netlify.com](https://netlify.com)
3. **Import project**: Click "New site from Git" and select your GitHub repository
4. **Configure build settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`
5. **Deploy**: Click "Deploy site"

The `netlify.toml` file in the repository root handles all necessary configuration.

The website is also ready for deployment on:
- **Vercel** (recommended for Next.js)
- **AWS Amplify**
- **Traditional hosting** with static export

### Environment Variables
No environment variables required for basic functionality.

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

This project is proprietary software owned by Mogeeb.ai. All rights reserved.

## 📞 Support

For technical support or questions about Mogeeb.ai:
- Website: [www.mogeeb.ai](https://mogeeb.ai)
- Email: support@mogeeb.ai
- LinkedIn: [Mogeeb AI](https://linkedin.com/company/mogeeb-ai)

---

**Built with ❤️ for the MENA region** | **مصنوع بحب لمنطقة الشرق الأوسط وشمال أفريقيا**