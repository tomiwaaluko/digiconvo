# DigiConvo 🎤🔊

**An AI-powered conversation practice platform for developing emotional intelligence and communication skills**

**An AI-powered conversation practice platform for developing emotional intelligence and communication skills**

DigiConvo is a modern web application that uses Google Gemini AI to provide realistic conversation practice scenarios with real-time emotion analysis and feedback. Users can practice difficult conversations in a safe environment while receiving AI-powered coaching to improve their communication effectiveness.

---

## 🌟 Features

### Core Functionality

- **AI-Powered Conversations**: Natural dialogue with AI personas using Google Gemini
- **Real-time Emotion Analysis**: Instant feedback on emotional tone and communication effectiveness
- **Multiple Scenarios**: 6+ pre-built conversation scenarios across different categories
- **Voice Integration**: Speech-to-text input and text-to-speech AI responses
- **Session Management**: Save, export, and review conversation sessions
- **Responsive Design**: Seamless experience across desktop, tablet, and mobile devices

### Advanced Capabilities

- **Conversation Analysis**: Upload screenshots of text conversations for detailed AI analysis
- **Persona-Based Interactions**: Each scenario features unique AI personalities with distinct emotional tendencies
- **Progress Tracking**: Emotion timeline and conversation flow analysis
- **Dark/Light Mode**: Customizable themes with smooth transitions

---

## 🚀 Installation & Setup

### Prerequisites

- **Node.js** 18.0 or higher
- **npm** 10.0 or higher
- **PostgreSQL** database (optional for frontend-only development)
- **Google Gemini API Key** (required for AI features)

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/digiconvo.git
   cd digiconvo
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your configuration:

   ```bash
   # Required for AI features
   GEMINI_API_KEY="your_gemini_api_key_here"

   # Optional for database features
   DATABASE_URL="postgresql://username:password@localhost:5432/digiconvo"

   # Development environment
   NODE_ENV="development"
   ```

4. **Set up the database** (Optional)

   ```bash
   npm run db:push
   npm run db:generate
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:3000`

---

## 📖 Usage

### Getting Started

1. **Launch the application** and you'll see the landing page with feature overview
2. **Click "Start Chatting"** to access the main interface
3. **Select a scenario** from the sidebar (Personal, Professional, Social, Family categories)
4. **Begin conversation** by typing your message or using voice input
5. **Receive AI responses** with realistic persona-based reactions
6. **Monitor emotion analysis** in the right panel for real-time feedback

### Available Scenarios

- **Breakup Conversation** (Personal, Hard) - Practice ending relationships compassionately
- **Job Interview** (Professional, Medium) - Prepare for challenging interview questions
- **Friend Conflict** (Social, Medium) - Navigate disagreements with friends
- **Parent Discussion** (Family, Hard) - Handle difficult family conversations
- **Team Conflict Resolution** (Professional, Medium) - Mediate workplace disputes
- **Difficult Customer** (Professional, Easy) - Practice customer service skills

### Voice Features

- **Speech-to-Text**: Click the microphone button to speak your messages
- **Text-to-Speech**: AI responses are automatically spoken (can be toggled)
- **Voice Controls**: Mute/unmute and voice input toggles in floating action button

### Conversation Analysis

- **Upload Screenshots**: Use the upload page to analyze existing text conversations
- **AI Feedback**: Receive detailed analysis including tone assessment and improvement suggestions
- **Export Results**: Save analysis reports for later review

---

## ⚙️ Configuration

### Environment Variables

```bash
# Core Configuration
NODE_ENV="development|production"

# AI Integration
GEMINI_API_KEY="your_gemini_api_key"           # Required for AI features

# Database (Optional)
DATABASE_URL="postgresql://..."                # Optional for session persistence
```

### Customization Options

- **Themes**: Light/dark mode toggle available in header
- **Voice Settings**: Enable/disable TTS in floating action button
- **Emotion Panel**: Toggle visibility for distraction-free conversations
- **Mobile Layout**: Responsive panels that adapt to screen size

---

## 🛠️ Dependencies

### Core Technologies

- **[Next.js 15](https://nextjs.org)** - React framework with App Router
- **[TypeScript 5](https://www.typescriptlang.org)** - Type-safe development
- **[tRPC 11](https://trpc.io)** - End-to-end typesafe APIs
- **[Tailwind CSS 4](https://tailwindcss.com)** - Utility-first styling
- **[Prisma 6](https://prisma.io)** - Database ORM (optional)

### AI & Analytics

- **[@google/genai](https://www.npmjs.com/package/@google/genai)** - Google Gemini integration
- **[@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai)** - Additional Gemini features

### UI & Animations

- **[Framer Motion 12](https://www.framer.com/motion)** - Smooth animations
- **[Lucide React](https://lucide.dev)** - Beautiful icons
- **[Radix UI](https://www.radix-ui.com)** - Accessible components
- **[React Hook Form 7](https://react-hook-form.com)** - Form management

### State Management

- **[Zustand 5](https://github.com/pmndrs/zustand)** - Lightweight state management
- **[TanStack Query 5](https://tanstack.com/query)** - Server state management

---

## 📁 Project Structure

```
digiconvo/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── _components/        # Reusable UI components
│   │   │   ├── chat/          # Chat interface components
│   │   │   ├── emotion/       # Emotion analysis panel
│   │   │   ├── landing/       # Landing page components
│   │   │   ├── sidebar/       # Scenario selection
│   │   │   └── ui/            # Base UI components
│   │   ├── api/               # API routes
│   │   ├── chat/              # Chat page
│   │   └── upload/            # Conversation analysis page
│   ├── components/            # Shared components
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utilities and services
│   ├── server/                # tRPC server setup
│   │   └── api/routers/       # API endpoint definitions
│   ├── stores/                # Zustand state stores
│   └── styles/                # Global styles
├── prisma/                    # Database schema
├── public/                    # Static assets
└── configuration files        # Next.js, TypeScript, etc.
```

---

## 💻 Technologies Used

### Frontend Stack

- **Next.js 15** with App Router for modern React development
- **TypeScript** for type safety and better developer experience
- **Tailwind CSS** for rapid, responsive styling
- **Framer Motion** for smooth animations and transitions

### Backend & APIs

- **tRPC** for type-safe API endpoints
- **Google Gemini AI** for natural language processing and emotion analysis
- **Prisma** with PostgreSQL for data persistence (optional)
- **Web Speech API** for browser-based speech recognition

### Development Tools

- **ESLint** with Next.js configuration for code quality
- **Prettier** with Tailwind plugin for consistent formatting
- **TypeScript strict mode** for maximum type safety

---

## 👥 Intended Audience

### Primary Users

- **Communication Coaches** - Training clients in difficult conversation scenarios
- **HR Professionals** - Preparing for sensitive workplace discussions
- **Relationship Counselors** - Helping clients practice challenging conversations
- **Students & Professionals** - Developing emotional intelligence and communication skills

### Use Cases

- **Interview Preparation** - Practice answering difficult questions with confidence
- **Conflict Resolution Training** - Learn to mediate disputes effectively
- **Customer Service Excellence** - Handle challenging customer interactions
- **Personal Relationship Skills** - Navigate breakups, family discussions, and friend conflicts
- **Professional Development** - Improve workplace communication and leadership skills

---

## 🤝 Contributing

We welcome contributions to make DigiConvo even better! Here's how you can help:

### Development Setup

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Follow our coding standards (ESLint + Prettier configured)
4. Write meaningful commit messages
5. Test your changes thoroughly

### Contribution Guidelines

- **Bug Reports**: Use GitHub Issues with detailed reproduction steps
- **Feature Requests**: Propose new features with use cases and benefits
- **Code Contributions**: Ensure TypeScript compliance and add tests where applicable
- **Documentation**: Help improve README, code comments, and user guides

### Code Standards

- Use TypeScript strict mode
- Follow ESLint and Prettier configurations
- Write self-documenting code with clear variable names
- Add JSDoc comments for complex functions
- Ensure responsive design for all new UI components

### Testing

```bash
npm run lint          # Check code quality
npm run typecheck     # Verify TypeScript compilation
npm run build         # Test production build
```

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

### What this means:

- ✅ **Commercial use** - Use in commercial projects
- ✅ **Modification** - Modify and adapt the code
- ✅ **Distribution** - Share and distribute freely
- ✅ **Private use** - Use in private projects
- ⚠️ **License and copyright notice** - Include original license in distributions

---

## 🙏 Acknowledgments

- **Google Gemini AI** for providing advanced language models and emotion analysis
- **T3 Stack** for the excellent Next.js, TypeScript, and tRPC foundation
- **Vercel** for seamless deployment and hosting platform
- **Open Source Community** for the amazing libraries and tools that make this possible

---

## 📞 Support & Contact

- **GitHub Issues**: Report bugs and request features
- **Documentation**: Check the [FRONTEND_README.md](FRONTEND_README.md) for detailed UI implementation notes
- **Project Repository**: [https://github.com/your-username/digiconvo](https://github.com/your-username/digiconvo)

---

**Built with ❤️ using Next.js, TypeScript, Tailwind CSS, and Google Gemini AI**
