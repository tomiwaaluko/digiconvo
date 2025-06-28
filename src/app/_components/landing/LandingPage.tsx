"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  MessageSquare,
  Brain,
  Heart,
  Sparkles,
  ArrowRight,
  Globe,
  Users,
  Shield,
} from "lucide-react";
import { ThemeToggle } from "../theme/ThemeToggle";

export function LandingPage() {
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Conversations",
      description:
        "Experience natural, intelligent conversations with advanced AI technology",
    },
    {
      icon: Heart,
      title: "Emotion Recognition",
      description:
        "Real-time emotion analysis to understand and respond to your feelings",
    },
    {
      icon: Sparkles,
      title: "Multiple Scenarios",
      description:
        "Choose from various conversation scenarios tailored to your needs",
    },
    {
      icon: Globe,
      title: "Accessible Anywhere",
      description: "Responsive design that works perfectly on any device",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 transition-colors duration-300 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Navigation */}
      <nav className="border-b border-white/20 bg-white/10 px-6 py-4 backdrop-blur-sm dark:border-gray-700/20 dark:bg-gray-900/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            <span className="text-xl font-bold text-gray-800 dark:text-gray-200">
              DigiConvo
            </span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link
              href="/app"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-white transition-colors duration-200 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20 text-center">
        <div className="mx-auto max-w-4xl">
          <h1 className="mb-6 text-5xl leading-tight font-bold text-gray-800 md:text-6xl dark:text-gray-100">
            Experience the Future of
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              AI Conversations
            </span>
          </h1>

          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600 dark:text-gray-300">
            DigiConvo brings you emotionally intelligent AI conversations with
            real-time emotion analysis, multiple scenarios, and natural
            interactions that adapt to your needs.
          </p>

          <div className="mb-16 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/app"
              className="group flex transform items-center justify-center gap-2 rounded-xl bg-indigo-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-all duration-200 hover:-translate-y-1 hover:bg-indigo-700 hover:shadow-xl dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              Start Chatting
              <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>

            <button className="rounded-xl border-2 border-gray-300 px-8 py-4 text-lg font-semibold text-gray-700 transition-all duration-200 hover:border-indigo-600 hover:text-indigo-600 dark:border-gray-600 dark:text-gray-300 dark:hover:border-indigo-400 dark:hover:text-indigo-400">
              Learn More
            </button>
          </div>

          {/* Feature Preview */}
          <div className="rounded-2xl border border-white/20 bg-white/60 p-8 shadow-xl backdrop-blur-sm">
            <div className="mb-6 text-center">
              <div className="mb-4 inline-flex rounded-full bg-indigo-100 p-3">
                {React.createElement(features[currentFeature]!.icon, {
                  className: "w-8 h-8 text-indigo-600",
                })}
              </div>
              <h3 className="mb-2 text-2xl font-bold text-gray-800">
                {features[currentFeature]!.title}
              </h3>
              <p className="text-gray-600">
                {features[currentFeature]!.description}
              </p>
            </div>

            {/* Feature indicators */}
            <div className="flex justify-center gap-2">
              {features.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    index === currentFeature
                      ? "w-8 bg-indigo-600"
                      : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-white/40 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-16 text-center text-3xl font-bold text-gray-800 md:text-4xl">
            Why Choose DigiConvo?
          </h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Brain,
                title: "Advanced AI",
                description:
                  "Powered by Google Gemini for intelligent, context-aware responses",
              },
              {
                icon: Heart,
                title: "Emotion Analysis",
                description:
                  "Real-time emotion detection to create more empathetic conversations",
              },
              {
                icon: Users,
                title: "Multiple Scenarios",
                description:
                  "From casual chat to professional support, choose your conversation style",
              },
              {
                icon: Shield,
                title: "Privacy First",
                description:
                  "Your conversations are secure and private by design",
              },
              {
                icon: Globe,
                title: "Cross-Platform",
                description:
                  "Works seamlessly across all devices and screen sizes",
              },
              {
                icon: Sparkles,
                title: "Modern Interface",
                description:
                  "Beautiful, intuitive design that makes chatting a pleasure",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="rounded-xl border border-white/20 bg-white/60 p-6 backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:bg-white/80 hover:shadow-lg"
              >
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-lg bg-indigo-100 p-2">
                    <feature.icon className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 text-center">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-6 text-3xl font-bold text-gray-800 md:text-4xl">
            Ready to Start Your AI Conversation?
          </h2>
          <p className="mb-8 text-xl text-gray-600">
            Join thousands of users experiencing the future of AI communication
            today.
          </p>

          <Link
            href="/app"
            className="group inline-flex transform items-center gap-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 px-12 py-6 text-xl font-semibold text-white shadow-xl transition-all duration-200 hover:-translate-y-1 hover:from-indigo-700 hover:to-purple-700 hover:shadow-2xl"
          >
            Get Started Now
            <ArrowRight className="h-6 w-6 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/20 bg-white/10 px-6 py-8 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <MessageSquare className="h-6 w-6 text-indigo-600" />
            <span className="text-lg font-semibold text-gray-800">
              DigiConvo
            </span>
          </div>
          <p className="text-gray-600">
            Emotionally intelligent AI conversations for everyone.
          </p>
        </div>
      </footer>
    </div>
  );
}
