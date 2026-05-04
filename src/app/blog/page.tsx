"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer/Footer";
import BlogCard from "@/components/blog/BlogCard";
import { blogPosts } from "@/lib/blog-data";
import { Search, Loader2, CheckCircle2, Send } from "lucide-react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { api } from "@/lib/api-client";

export default function BlogPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Posts");

  const categories = ["All Posts", "Analytics", "Operations", "Technology"];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = activeCategory === "All Posts" || post.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsLoading(true);
    setError(null);

    if (!executeRecaptcha) {
      setError("reCAPTCHA service is not ready. Please try again.");
      setIsLoading(false);
      return;
    }

    try {
      const recaptchaToken = await executeRecaptcha("newsletter");
      const result = await api.post("/api/mail/newsletter", {
        email,
        name: "Blog Subscriber",
        recaptcha_token: recaptchaToken
      });

      if (result.status === "success") {
        setSubmitted(true);
        setEmail("");
      } else {
        setError(result.message || "Failed to subscribe.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

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
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                    activeCategory === cat 
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="w-full pl-12 pr-6 py-3 rounded-full glass border border-white/10 outline-none focus:border-insight-teal/30 transition-all text-sm"
              />
            </div>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post, i) => (
                  <BlogCard key={post.slug} post={post} index={i} />
                ))
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  key="no-results"
                  className="col-span-full py-20 text-center"
                >
                  <p className="text-xl text-[var(--text-muted)]">No articles found matching your criteria.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="px-6 mt-32">
          <div className="max-w-5xl mx-auto glass rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-insight-teal/5 to-aura-violet/5 -z-10" />
            
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6"
                >
                  <div className="w-20 h-20 bg-insight-teal/10 rounded-full flex items-center justify-center mx-auto mb-8">
                    <CheckCircle2 className="w-10 h-10 text-insight-teal" />
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[var(--text-primary)]">Synchronization Complete</h2>
                  <p className="text-[var(--text-muted)] text-lg max-w-xl mx-auto font-medium">
                    Welcome to the network. Please verify your email to activate the data link.
                  </p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="text-xs font-bold uppercase tracking-[0.2em] text-insight-teal hover:underline"
                  >
                    Subscribe another email
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-[var(--text-primary)]">Stay ahead of the curve.</h2>
                  <p className="text-[var(--text-muted)] text-lg mb-10 max-w-xl mx-auto font-medium">
                    Join 5,000+ infrastructure engineers receiving our bi-weekly deep dives.
                  </p>
                  
                  <form onSubmit={handleSubscribe} className="max-w-md mx-auto space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        className="flex-1 px-6 py-4 rounded-2xl glass-subtle border border-white/10 outline-none focus:border-insight-teal/30 transition-all text-[var(--text-primary)]"
                      />
                      <button 
                        disabled={isLoading}
                        className="px-8 py-4 rounded-2xl bg-white text-black font-bold hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                      >
                        {isLoading ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            <span>Subscribe</span>
                            <Send className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                    {error && (
                      <p className="text-xs font-bold text-red-500 uppercase tracking-widest">{error}</p>
                    )}
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
