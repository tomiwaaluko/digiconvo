"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import {
  MessageSquare,
  Brain,
  Heart,
  Sparkles,
  ArrowRight,
  Globe,
  Users,
  Zap,
  Eye,
  Star,
  Play,
  ChevronDown,
} from "lucide-react";
import { ThemeToggle } from "../theme/ThemeToggle";

export function LandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [chatMessages, setChatMessages] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const [particles, setParticles] = useState<Array<{ left: number; top: number; delay: number; duration: number }>>([]);
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);

  const fullText = "AI Conversations";

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Conversations",
      description:
        "Experience natural, intelligent conversations with advanced AI technology",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: Heart,
      title: "Emotion Recognition",
      description:
        "Real-time emotion analysis to understand and respond to your feelings",
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-500/10",
    },
    {
      icon: Sparkles,
      title: "Multiple Scenarios",
      description:
        "Choose from various conversation scenarios tailored to your needs",
      color: "from-purple-500 to-indigo-500",
      bgColor: "bg-purple-500/10",
    },
    {
      icon: Globe,
      title: "Accessible Anywhere",
      description: "Responsive design that works perfectly on any device",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
    },
  ];

  const demoMessages = [
    {
      sender: "user",
      text: "I'm feeling anxious about my presentation tomorrow",
      emotion: "😰",
    },
    {
      sender: "ai",
      text: "I understand your anxiety. Let's work through some techniques to help you feel more confident.",
      emotion: "💙",
    },
    {
      sender: "user",
      text: "That would be really helpful, thank you!",
      emotion: "😊",
    },
    {
      sender: "ai",
      text: "First, let's practice some deep breathing exercises together...",
      emotion: "🧘",
    },
  ];

  // Initialize client-side state
  useEffect(() => {
    setIsClient(true);
    // Generate particles only on client
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
    }));
    setParticles(newParticles);
  }, []);

  // Mouse tracking for parallax effect
  useEffect(() => {
    if (!isClient) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [isClient]);

  // Demo chat animation
  useEffect(() => {
    const timer = setInterval(() => {
      setChatMessages((prev) => (prev + 1) % (demoMessages.length + 1));
    }, 2000);
    return () => clearInterval(timer);
  }, [demoMessages.length]);

  // Typing effect for the heading
  useEffect(() => {
    if (!isClient) return;
    
    let index = 0;
    const typingTimer = setInterval(() => {
      if (index <= fullText.length) {
        setTypedText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(typingTimer);
      }
    }, 100);

    // Cursor blinking effect
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => {
      clearInterval(typingTimer);
      clearInterval(cursorTimer);
    };
  }, [isClient, fullText]);

  return (
    <div className="min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 transition-all duration-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 blur-3xl transition-transform duration-[3000ms]"
          style={{
            transform: isClient ? `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)` : 'translate(0px, 0px)',
          }}
        />
        <div
          className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-br from-indigo-400/20 to-pink-400/20 blur-3xl transition-transform duration-[3000ms]"
          style={{
            transform: isClient ? `translate(${-mousePosition.x * 0.01}px, ${-mousePosition.y * 0.01}px)` : 'translate(0px, 0px)',
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 h-60 w-60 rounded-full bg-gradient-to-br from-cyan-400/10 to-blue-400/10 blur-3xl transition-transform duration-[4000ms]"
          style={{
            transform: isClient 
              ? `translate(-50%, -50%) translate(${mousePosition.x * 0.015}px, ${mousePosition.y * 0.015}px)`
              : 'translate(-50%, -50%) translate(0px, 0px)',
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {isClient && particles.map((particle, i) => (
          <div
            key={i}
            className={`absolute h-2 w-2 animate-pulse rounded-full bg-gradient-to-r from-blue-400 to-purple-400 opacity-20`}
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="relative z-50 border-b border-blue-200/30 bg-blue-50/80 px-6 py-4 backdrop-blur-xl dark:border-blue-700/20 dark:bg-gray-900/80">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="group flex cursor-pointer items-center gap-2">
            <div className="relative">
              <MessageSquare className="h-8 w-8 text-indigo-600 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 dark:text-indigo-400" />
              <div className="absolute -inset-2 rounded-full bg-indigo-600/20 opacity-0 blur-sm transition-all duration-300 group-hover:scale-125 group-hover:opacity-100"></div>
            </div>
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-xl font-bold text-transparent">
              DigiConvo
            </span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/chat"
              className="group relative overflow-hidden rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-2 font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-purple-500/40 dark:hover:shadow-indigo-500/25"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative px-6 py-20 text-center">
        <div className="mx-auto max-w-6xl">
          {/* Typewriter heading */}
          <div className="mb-8">
            <h1 className="mb-2 text-5xl font-bold text-blue-900 md:text-7xl dark:text-gray-100">
              <span className="inline-block">Experience the Future of </span>
              <span className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
                {typedText}
                {showCursor && <span className="text-indigo-600 dark:text-indigo-400">|</span>}
              </span>
            </h1>
            <div className="mx-auto h-1 w-32 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400"></div>
          </div>

          <p className="mx-auto mb-12 max-w-3xl text-xl leading-relaxed text-blue-700 dark:text-gray-300">
            DigiConvo brings you emotionally intelligent AI conversations with
            real-time emotion analysis, multiple scenarios, and natural
            interactions that adapt to your needs.
          </p>

          {/* CTA Buttons */}
          <div className="mb-16 flex flex-col justify-center gap-6 sm:flex-row">
            <Link
              href="/chat"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/40 dark:hover:shadow-indigo-500/25"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Play className="h-5 w-5" />
                Start Chatting
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </Link>

            <button className="group rounded-2xl border-2 border-indigo-200 bg-white/50 px-8 py-4 text-lg font-semibold text-blue-700 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-300 hover:bg-white/80 dark:border-indigo-700 dark:bg-gray-800/50 dark:text-gray-300 dark:hover:bg-gray-800/80">
              <span className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Watch Demo
              </span>
            </button>
          </div>

          {/* Interactive Demo Chat */}
          <div className="mx-auto max-w-2xl">
            <div className="rounded-3xl border border-blue-200/30 bg-blue-50/80 p-6 shadow-2xl backdrop-blur-xl dark:border-gray-700/20 dark:bg-gray-800/80">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-400 dark:bg-red-500"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-400 dark:bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-400 dark:bg-green-500"></div>
                </div>
                <span className="text-sm text-blue-600 dark:text-gray-400">
                  Live Demo
                </span>
              </div>

              <div className="h-64 space-y-4 overflow-hidden">
                {demoMessages.slice(0, chatMessages).map((message, index) => (
                  <div
                    key={index}
                    className={`animate-slideInUp flex items-start gap-3`}
                    style={{ animationDelay: `${index * 0.5}s` }}
                  >
                    <div
                      className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm ${
                        message.sender === "user"
                          ? "bg-indigo-100 dark:bg-indigo-900"
                          : "bg-purple-100 dark:bg-purple-900"
                      }`}
                    >
                      {message.emotion}
                    </div>
                    <div
                      className={`flex-1 rounded-2xl p-3 ${
                        message.sender === "user"
                          ? "ml-auto max-w-xs bg-indigo-500 !text-white dark:bg-indigo-600"
                          : "max-w-sm bg-blue-50 text-blue-900 dark:bg-gray-700 dark:text-gray-200"
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                    </div>
                  </div>
                ))}
                {chatMessages > 0 && chatMessages <= demoMessages.length && (
                  // Only show "analyzing" after user messages (odd indices) and before AI responses
                  chatMessages % 2 === 1 && (
                    <div className="flex items-center gap-2 text-blue-600 dark:text-gray-400">
                      <div className="flex gap-1">
                        <div
                          className="h-2 w-2 animate-bounce rounded-full bg-blue-400 dark:bg-gray-500"
                          style={{ animationDelay: "0ms" }}
                        ></div>
                        <div
                          className="h-2 w-2 animate-bounce rounded-full bg-blue-400 dark:bg-gray-500"
                          style={{ animationDelay: "150ms" }}
                        ></div>
                        <div
                          className="h-2 w-2 animate-bounce rounded-full bg-blue-400 dark:bg-gray-500"
                          style={{ animationDelay: "300ms" }}
                        ></div>
                      </div>
                      <span className="text-sm">AI is analyzing emotion...</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform animate-bounce">
          <ChevronDown className="h-6 w-6 text-blue-400 dark:text-gray-500" />
        </div>
      </section>

      {/* Features Section */}
      <section className="relative px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-blue-900 md:text-5xl dark:text-gray-100">
              Powered by{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Gemini
              </span>
            </h2>
            <p className="text-xl text-blue-700 dark:text-gray-300">
              Discover what makes DigiConvo extraordinary
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-3xl p-8 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl ${feature.bgColor} border border-blue-200/20 backdrop-blur-sm dark:border-white/20`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative z-10">
                  <div
                    className={`mb-6 inline-flex rounded-2xl bg-gradient-to-r ${feature.color} p-4 shadow-lg`}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="mb-4 text-xl font-bold text-blue-900 dark:text-gray-100">
                    {feature.title}
                  </h3>
                  <p className="leading-relaxed text-blue-700 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>

                {/* Hover effect background */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 transition-all duration-500 group-hover:opacity-10`}
                ></div>

                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-gradient-to-br from-white/10 to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative bg-gradient-to-r from-indigo-500/10 to-purple-500/10 px-6 py-20 backdrop-blur-sm">
        <div className="mx-auto max-w-4xl text-center">
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                number: "10K+",
                label: "Active Users",
                icon: Users,
              },
              {
                number: "1M+",
                label: "Conversations",
                icon: MessageSquare,
              },
              {
                number: "99%",
                label: "Satisfaction",
                icon: Star,
              },
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="mb-4 inline-flex rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 p-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="mb-2 text-4xl font-bold text-blue-900 dark:text-gray-100">
                  {stat.number}
                </div>
                <div className="font-medium text-blue-700 dark:text-gray-300">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative px-6 py-20 text-center">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl bg-gradient-to-r from-indigo-600 to-purple-600 p-12 text-white shadow-2xl">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              Ready to Transform Your Conversations?
            </h2>
            <p className="mb-8 text-xl opacity-90">
              Join thousands experiencing the future of AI communication.
            </p>              <Link
                href="/chat"
                className="group inline-flex transform items-center gap-3 rounded-2xl bg-white px-8 py-4 text-xl font-semibold text-indigo-600 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/40 dark:hover:shadow-indigo-500/25"
              >
              <Zap className="h-6 w-6" />
              Get Started Free
              <ArrowRight className="h-6 w-6 transition-transform duration-300 group-hover:translate-x-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-blue-200/30 bg-blue-50/50 px-6 py-12 backdrop-blur-xl dark:border-blue-700/20 dark:bg-gray-900/50">
        <div className="mx-auto max-w-7xl text-center">
          <div className="mb-6 flex items-center justify-center gap-2">
            <MessageSquare className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-2xl font-bold text-transparent">
              DigiConvo
            </span>
          </div>
          <p className="mb-6 text-blue-700 dark:text-gray-300">
            Emotionally intelligent AI conversations for everyone.
          </p>

          <div className="flex justify-center gap-6 text-sm text-blue-600 dark:text-gray-400">
            <a
              href="#"
              className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              Privacy
            </a>
            <a
              href="#"
              className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              Terms
            </a>
            <a
              href="#"
              className="transition-colors hover:text-indigo-600 dark:hover:text-indigo-400"
            >
              Support
            </a>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideInUp {
          animation: slideInUp 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
