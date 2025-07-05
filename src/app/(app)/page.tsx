"use client";

import Link from "next/link";
import { Mail, Lock, Rocket, Gift } from "lucide-react";
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
    "Hidden voices",
    "Deep reflections",
    "Nameless wisdom",
  ];

  return (
    <>
      <main className="relative bg-black text-white min-h-screen overflow-hidden pt-16">
        <StarsBackground />
        <ShootingStars />

        {/* Hero Section */}
        <section className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-4 md:px-24 text-center pt-20">
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
            Mystery Threads - Where your identity remains a secret.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8"
          >

          <Link href="/sign-up">
            <div
              className="inline-block rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-sky-400 to-fuchsia-500 
                        hover:shadow-[0_0_30px_rgba(56,189,248,0.6)] transition-all duration-300"
            >
              <button
                className="relative inline-flex items-center justify-center px-8 py-3 rounded-full text-sm font-semibold text-white 
                          bg-black w-full h-full shadow-[0_0_20px_rgba(0,0,0,0.6)]"
              >
                <span className="relative z-10 tracking-wide">Get Started</span>
              </button>
            </div>
          </Link>






          </motion.div>

          {/* Carousel */}
          <div className="mt-6 md:mt-12 w-full max-w-xl z-10">
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
                      <Card className="bg-white/5 border border-white/5 backdrop-blur-lg rounded-2xl shadow-[0_0_20px_rgba(0,255,255,0.05)] hover:shadow-[0_0_30px_rgba(0,255,255,0.15)] transition duration-300">
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
        <section className="relative z-10 mt-12 md:mt-20 max-w-5xl mx-auto px-4 text-center space-y-20 md:space-y-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-fuchsia-400">👤 Built For Everyone</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
              Whether you’re a curious soul, a bold messenger, or a creative mind looking for raw truth — this space is yours to explore.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">🌌 Real Thoughts. No Filters.</h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-base md:text-lg">
              Speak or receive what truly matters. Mystery Message lets you connect without bias, ego, or identity — just pure expression in its most honest form.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[{
              title: "No Identity Needed",
              description: "Let your words speak for themselves. No names, no judgments.",
              icon: <Lock className="w-8 h-8 text-purple-300" />,
              hoverColor: "group-hover:text-purple-300",
            }, {
              title: "Lightning Fast",
              description: "Generate a link and start connecting — instantly and securely.",
              icon: <Rocket className="w-8 h-8 text-pink-400" />,
              hoverColor: "group-hover:text-pink-400",
            }, {
              title: "Free Forever",
              description: "Access all features without cost. Just focus on truth and connection.",
              icon: <Gift className="w-8 h-8 text-emerald-300" />,
              hoverColor: "group-hover:text-emerald-300",
            }].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="group border border-cyan-400/30 bg-white/5 backdrop-blur-lg rounded-xl p-6 shadow-[0_0_20px_rgba(0,255,255,0.1)] hover:shadow-[0_0_30px_rgba(0,255,255,0.2)] transition-all duration-300 text-center flex flex-col items-center"
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className={`text-lg font-semibold mb-2 text-white transition-colors duration-300 ${item.hoverColor}`}>
                  {item.title}
                </h3>
                <p className="text-gray-300 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Anonymous Truths Section */}
        <section className="relative w-full max-w-5xl mx-auto mt-28 px-4 z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-br from-cyan-200 via-sky-300 to-teal-200 bg-clip-text">
              <span className="text-cyan-300">✨</span> Anonymous Truths
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mysteryFacts.map((fact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="border text-cyan-300 border-cyan-400/30 bg-white/5 backdrop-blur-lg rounded-xl p-6 shadow-[0_0_20px_rgba(0,255,255,0.1)] hover:shadow-[0_0_30px_rgba(0,255,255,0.2)] transition-all duration-300"
              >
                <h3 className="text-lg font-semibold mb-2 text-cyan-300">
                  {anonymousSubtitles[index]}
                </h3>
                <p className="text-gray-300 text-sm">“{fact}”</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center p-6 bg-[#0a0a0a] text-gray-400 text-sm border-t border-white/10 mt-24">
          © 2025 Mystery Threads. All rights reserved.
        </footer>
      </main>
    </>
  );
}
