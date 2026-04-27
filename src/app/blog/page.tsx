"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer/Footer";
import BlogCard from "@/components/blog/BlogCard";
import { blogPosts } from "@/lib/blog-data";
import { Search } from "lucide-react";

export default function BlogPage() {
  return (
    <div className="bg-[var(--background)] min-h-screen">
      <Navbar />

      <main className="pt-32 pb-24">
        {/* Blog Hero */}
        <section className="relative px-6 mb-24 overflow-hidden">
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-subtle border border-insight-teal/20 mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-insight-teal animate-pulse" />
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-insight-teal">Insights & Updates</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black tracking-tighter mb-8"
            >
              The <span className="gradient-text">Dataflowra</span> Blog
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-[var(--text-muted)] max-w-2xl mx-auto font-medium"
            >
              Expert perspectives on edge computing, real-time data streaming, 
              and the future of distributed infrastructure.
            </motion.p>
          </div>

          {/* Background Atmosphere */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-insight-teal/5 blur-[120px] rounded-full -z-10" />
        </section>

        {/* Search & Filter Bar */}
        <section className="px-6 mb-16">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex items-center gap-4 overflow-x-auto pb-2 no-scrollbar w-full md:w-auto">
              {["All Posts", "Technology", "Security", "Infrastructure", "Product"].map((cat, i) => (
                <button
                  key={cat}
                  className={`px-6 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                    i === 0 
                    ? "bg-white text-black border-white" 
                    : "glass-subtle border-white/10 text-[var(--text-muted)] hover:border-white/20"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-80 group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)] group-focus-within:text-insight-teal transition-colors" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-12 pr-6 py-3 rounded-full glass border border-white/10 outline-none focus:border-insight-teal/30 transition-all text-sm"
              />
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="px-6 mt-32">
          <div className="max-w-5xl mx-auto glass rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-insight-teal/5 to-aura-violet/5 -z-10" />
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Stay ahead of the curve.</h2>
            <p className="text-[var(--text-muted)] text-lg mb-10 max-w-xl mx-auto font-medium">
              Join 5,000+ infrastructure engineers receiving our bi-weekly deep dives.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-2xl glass-subtle border border-white/10 outline-none focus:border-insight-teal/30 transition-all"
              />
              <button className="px-8 py-4 rounded-2xl bg-white text-black font-bold hover:scale-105 active:scale-95 transition-all">
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
