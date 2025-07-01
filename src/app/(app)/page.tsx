"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { motion } from "framer-motion";
import Autoplay from "embla-carousel-autoplay";
import messages from "@/messages.json";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { StarsBackground } from "@/components/ui/stars-background";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { FlipWords } from "@/components/ui/flip-words";

export default function Home() {
  const words = ["mystery", "secrecy", "whispers", "hidden truths", "anonymity"];

  const extraMessages = [
    {
      title: "Anonymous Whisper",
      content: "Your work changed how I see the world. Never stop.",
      received: "just now",
    },
    {
      title: "Shhh... Secret!",
      content: "I admire your honesty, even when no one knows it’s you.",
      received: "2 mins ago",
    },
  ];

  const mysteryFacts = [
    "Truth doesn't need a name.",
    "Anonymous words echo deeper.",
    "Not all heroes show their faces.",
  ];

  const anonymousSubtitles = [
    "hidden voices",
    "deep reflections",
    "nameless wisdom",
  ];

  return (
    <>
      <main className="relative bg-black text-white min-h-screen overflow-hidden">
        <StarsBackground />
        <ShootingStars />

        {/* Hero Section */}
        <section className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-4 md:px-24 pt-20 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight"
          >
            Dive into the world of{" "}
            <FlipWords
              words={words}
              className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-300 to-teal-200"
            />
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-4 text-lg text-gray-300 max-w-xl"
          >
            True Mystery - Where your identity remains a secret.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8"
          >
            <Link href="/sign-up">
              <button className="relative inline-flex items-center justify-center px-8 py-3 text-sm font-semibold text-black bg-gradient-to-r from-cyan-300 to-teal-400 rounded-full shadow-lg hover:scale-105 hover:shadow-cyan-400/40 transition-all duration-300 overflow-hidden">
                <span className="z-10">Get Started</span>
                <span className="absolute inset-0 bg-white/10 blur-lg opacity-20" />
                <span className="absolute -inset-1 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 opacity-30 blur-xl z-0" />
              </button>
            </Link>
          </motion.div>

          {/* Carousel */}
          <div className="mt-12 w-full max-w-xl z-10">
            <Carousel plugins={[Autoplay({ delay: 2500 })]}>
              <CarouselContent>
                {[...messages, ...extraMessages].map((message, index) => (
                  <CarouselItem key={index} className="p-4">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                      viewport={{ once: true }}
                    >
                      <Card className="bg-white/10 border border-white/10 backdrop-blur-lg rounded-2xl shadow-[0_0_20px_rgba(0,255,255,0.05)] hover:shadow-[0_0_30px_rgba(0,255,255,0.15)] transition duration-300">
                        <CardHeader className="text-left">
                          <CardTitle className="text-lg font-semibold text-white">
                            {message.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-row items-start space-x-4 text-sm text-white">
                          <Mail className="w-6 h-6 text-cyan-400 mt-1" />
                          <div className="text-left">
                            <p className="mb-1 text-white/90">
                              <span className="text-cyan-400 mr-1">You said:</span>
                              {message.content}
                            </p>
                            <p className="text-xs text-gray-400">{message.received}</p>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </section>

        {/* Info Section */}
        <section className="relative z-10 mt-24 max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-br from-purple-400 to-pink-400 bg-clip-text mb-4">
              👤 Built For Everyone
            </h2>
            <p className="text-gray-300 max-w-2xl mx-auto text-base md:text-lg">
              Whether you re a curious soul, a bold messenger, or a creative mind looking for raw truth — this space is yours to explore.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              🌌 Real Thoughts. No Filters.
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
              Speak or receive what truly matters. Mystery Message lets you connect without bias, ego, or identity — just pure expression in its most honest form.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 md:px-0">
            {[
              {
                title: "No Identity Needed",
                description: "Let your words speak for themselves. No names, no judgments.",
                icon: "👻",
              },
              {
                title: "Lightning Fast",
                description: "Generate a link and start connecting — instantly and securely.",
                icon: "🚀",
              },
              {
                title: "Free Forever",
                description: "Access all features without cost. Just focus on truth and connection.",
                icon: "🎁",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="border text-cyan-300 border-cyan-400/30 bg-white/5 backdrop-blur-lg rounded-xl p-6 shadow-[0_0_20px_rgba(0,255,255,0.1)] hover:shadow-[0_0_30px_rgba(0,255,255,0.2)] transition-all duration-300"
              >
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-cyan-300">
                  {item.title}
                </h3>
                <p className="text-gray-300 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Anonymous Truths Section */}
        <section className="relative w-full max-w-4xl mx-auto mt-28 px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-br from-cyan-200  from-cyan-300 via-sky-300 to-teal-200 bg-clip-text">
              ✨ Anonymous Truths
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.6 }}
              className="mt-3 w-24 h-1 bg-cyan-300 mx-auto rounded-full shadow-cyan-200/30 shadow-md origin-left"
            />
            <p className="text-gray-400 mt-2 max-w-xl mx-auto text-sm">
              Fewer voices. Deeper echoes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mysteryFacts.map((fact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, rotateX: -90 }}
                whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  ease: "easeOut",
                }}
                viewport={{ once: true }}
                className="group relative p-6 rounded-xl border border-cyan-400/20 bg-white/5 backdrop-blur-md shadow-[0_0_20px_rgba(0,255,255,0.05)] hover:shadow-[0_0_40px_rgba(0,255,255,0.2)] hover:scale-105 transition duration-300 overflow-hidden"
              >
                <div className="absolute top-1 left-1 w-2 h-2 bg-cyan-400 rounded-full blur-sm" />
                <div className="absolute bottom-1 right-1 w-2 h-2 bg-teal-300 rounded-full blur-sm" />
                <div className="absolute text-5xl opacity-10 blur-sm top-4 right-6 animate-bounce-slow select-none pointer-events-none">
                  🕵️‍♀️
                </div>
                <h3 className="text-cyan-200 font-mono text-xs uppercase tracking-wide mb-2">
                  {anonymousSubtitles[index]}
                </h3>
                <p className="text-white text-base leading-relaxed relative z-10">
                  “{fact}”
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 mb-4 px-6 max-w-2xl text-center text-gray-400 text-sm italic z-10 mx-auto"
        >
          <p>Sometimes the quietest voices carry the deepest truths.</p>
        </motion.div>
      </main>

      <footer className="text-center p-6 bg-[#0a0a0a] text-gray-400 text-sm border-t border-white/10">
        © 2025 True Mystery. All rights reserved.
      </footer>
    </>
  );
}
