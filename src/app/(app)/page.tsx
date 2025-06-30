"use client";
import { Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Autoplay from "embla-carousel-autoplay";
import messages from "@/messages.json";
import { StarsBackground } from "@/components/ui/stars-background";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { FlipWords } from "@/components/ui/flip-words";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { motion } from "framer-motion";

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
    {
      title: "Mystery Note",
      content: "You’re making more of a difference than you think.",
      received: "a moment ago",
    },
  ];

  const mysteryFacts = [
    "Truth doesn't need a name.",
    "Silence is often louder than words.",
    "Anonymous words echo deeper.",
    "Not all heroes show their faces.",
    "Real feedback lives behind shadows.",
    "Unseen voices often hold the boldest truths.",
    "Sometimes the truest confessions are unsigned.",
  ];

  return (
    <>
      <main className="relative bg-black text-white min-h-screen overflow-hidden">
        <StarsBackground />
        <ShootingStars />

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center min-h-[80vh] px-4 md:px-24 pt-20 text-center z-10">
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight"
          >
            Dive into the world of {" "}
            <FlipWords
              words={words}
              className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-teal-300"
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

          {/* Carousel */}
          <div className="mt-10 w-full max-w-xl">
            <Carousel plugins={[Autoplay({ delay: 2500 })]} className="z-10">
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
                            <p className="text-xs text-gray-400">
                              {message.received}
                            </p>
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

        {/* Anonymous Truths Section */}
        <section className="w-full max-w-5xl mx-auto mt-28 px-4 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-sky-400 to-teal-300 text-transparent bg-clip-text">
              Anonymous Truths
            </h2>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.6 }}
              className="mt-2 w-24 h-1 bg-cyan-400 mx-auto rounded-full shadow-cyan-400/30 shadow-md origin-left"
            />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mysteryFacts.map((fact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8, rotateX: -90 }}
                whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
                transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
                viewport={{ once: true }}
                className={`relative p-6 rounded-xl bg-white/5 border border-cyan-400/20 backdrop-blur-md shadow-lg transition duration-300 hover:scale-105 hover:shadow-cyan-500/30 group ${
                  index === mysteryFacts.length - 1 ? "lg:col-start-2 justify-self-center" : ""
                }`}
              >
                <div className="absolute top-1 left-1 w-2 h-2 bg-cyan-300 rounded-full blur-sm" />
                <div className="absolute bottom-1 right-1 w-2 h-2 bg-teal-300 rounded-full blur-sm" />
                <h3 className="text-cyan-300 font-mono text-xs uppercase tracking-wide mb-2">
                  anonymous insight
                </h3>
                <p className="text-white/90 text-base leading-relaxed">“{fact}”</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Ending Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 mb-4 px-6 max-w-2xl text-center text-gray-400 text-sm italic z-10 mx-auto"
        >
          <p>Sometimes the quietest voices carry the deepest truths.</p>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="text-center p-6 bg-[#0a0a0a] text-gray-400 text-sm border-t border-white/10">
        © 2025 True Mystery. All rights reserved.
      </footer>
    </>
  );
}
