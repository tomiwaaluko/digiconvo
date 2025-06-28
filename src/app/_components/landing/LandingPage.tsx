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
  Shield 
} from "lucide-react";

export function LandingPage() {
  const [currentFeature, setCurrentFeature] = useState(0);
  
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Conversations",
      description: "Experience natural, intelligent conversations with advanced AI technology"
    },
    {
      icon: Heart,
      title: "Emotion Recognition",
      description: "Real-time emotion analysis to understand and respond to your feelings"
    },
    {
      icon: Sparkles,
      title: "Multiple Scenarios",
      description: "Choose from various conversation scenarios tailored to your needs"
    },
    {
      icon: Globe,
      title: "Accessible Anywhere",
      description: "Responsive design that works perfectly on any device"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="px-6 py-4 border-b border-white/20 backdrop-blur-sm bg-white/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-8 h-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-800">DigiConvo</span>
          </div>
          <Link
            href="/app"
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
            Experience the Future of
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {" "}AI Conversations
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            DigiConvo brings you emotionally intelligent AI conversations with real-time 
            emotion analysis, multiple scenarios, and natural interactions that adapt to your needs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/app"
              className="group px-8 py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-200 flex items-center gap-2 justify-center text-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Start Chatting
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            
            <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:border-indigo-600 hover:text-indigo-600 transition-all duration-200 text-lg font-semibold">
              Learn More
            </button>
          </div>

          {/* Feature Preview */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-white/20">
            <div className="text-center mb-6">
              <div className="inline-flex p-3 bg-indigo-100 rounded-full mb-4">
                {React.createElement(features[currentFeature]!.icon, {
                  className: "w-8 h-8 text-indigo-600"
                })}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
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
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentFeature ? "bg-indigo-600 w-8" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="px-6 py-20 bg-white/40">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
            Why Choose DigiConvo?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Brain,
                title: "Advanced AI",
                description: "Powered by Google Gemini for intelligent, context-aware responses"
              },
              {
                icon: Heart,
                title: "Emotion Analysis",
                description: "Real-time emotion detection to create more empathetic conversations"
              },
              {
                icon: Users,
                title: "Multiple Scenarios",
                description: "From casual chat to professional support, choose your conversation style"
              },
              {
                icon: Shield,
                title: "Privacy First",
                description: "Your conversations are secure and private by design"
              },
              {
                icon: Globe,
                title: "Cross-Platform",
                description: "Works seamlessly across all devices and screen sizes"
              },
              {
                icon: Sparkles,
                title: "Modern Interface",
                description: "Beautiful, intuitive design that makes chatting a pleasure"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white/60 backdrop-blur-sm rounded-xl p-6 hover:bg-white/80 transition-all duration-200 hover:shadow-lg hover:-translate-y-1 border border-white/20"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <feature.icon className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Ready to Start Your AI Conversation?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of users experiencing the future of AI communication today.
          </p>
          
          <Link
            href="/app"
            className="group inline-flex px-12 py-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 items-center gap-3 text-xl font-semibold shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            Get Started Now
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-white/20 bg-white/10 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <MessageSquare className="w-6 h-6 text-indigo-600" />
            <span className="text-lg font-semibold text-gray-800">DigiConvo</span>
          </div>
          <p className="text-gray-600">
            Emotionally intelligent AI conversations for everyone.
          </p>
        </div>
      </footer>
    </div>
  );
}
