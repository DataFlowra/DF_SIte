"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/footer/Footer";
import { blogPosts } from "@/lib/blog-data";
import { ArrowLeft, Clock, Calendar, User, Share2, Twitter, Linkedin, Facebook } from "lucide-react";
import Link from "next/link";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post not found</h1>
          <Link href="/blog" className="text-insight-teal hover:underline">Back to blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--background)] min-h-screen">
      <Navbar />

      <main className="pt-32 pb-24">
        {/* Article Header */}
        <article className="px-6">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-12"
            >
              <Link href="/blog" className="group inline-flex items-center gap-2 text-sm font-bold text-[var(--text-muted)] hover:text-insight-teal transition-colors">
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to all articles
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="px-4 py-1.5 rounded-full glass-subtle border border-insight-teal/20 text-[10px] font-bold uppercase tracking-widest text-insight-teal">
                  {post.category}
                </span>
                <div className="flex items-center gap-2 text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">
                  <Clock className="w-3.5 h-3.5" />
                  {post.readTime}
                </div>
              </div>

              <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-10 leading-[1.1]">
                {post.title}
              </h1>

              {/* Author Info */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-8 pb-12 border-b border-white/10 mb-12">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-insight-teal to-aura-violet flex items-center justify-center text-lg font-bold text-white shadow-xl">
                    {post.author.avatar}
                  </div>
                  <div>
                    <div className="text-lg font-bold text-[var(--text-primary)]">{post.author.name}</div>
                    <div className="text-sm text-[var(--text-muted)]">{post.author.role}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-sm font-bold text-[var(--text-muted)]">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </div>
                  <div className="w-px h-6 bg-white/10" />
                  <div className="flex items-center gap-3">
                    <button className="w-10 h-10 rounded-xl glass-subtle border border-white/5 flex items-center justify-center hover:text-insight-teal hover:border-insight-teal/20 transition-all">
                      <Twitter size={18} />
                    </button>
                    <button className="w-10 h-10 rounded-xl glass-subtle border border-white/5 flex items-center justify-center hover:text-insight-teal hover:border-insight-teal/20 transition-all">
                      <Linkedin size={18} />
                    </button>
                    <button className="w-10 h-10 rounded-xl glass-subtle border border-white/5 flex items-center justify-center hover:text-insight-teal hover:border-insight-teal/20 transition-all">
                      <Share2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Featured Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative h-[300px] md:h-[500px] rounded-[3rem] overflow-hidden mb-16 border border-white/5 shadow-2xl"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Content Area */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="max-w-none 
                [&_h2]:text-3xl [&_h2]:md:text-4xl [&_h2]:font-black [&_h2]:tracking-tighter [&_h2]:text-[var(--text-primary)] [&_h2]:mb-6 [&_h2]:mt-12
                [&_h3]:text-2xl [&_h3]:font-bold [&_h3]:tracking-tight [&_h3]:text-[var(--text-primary)] [&_h3]:mb-4 [&_h3]:mt-8
                [&_p]:text-lg [&_p]:text-[var(--text-muted)] [&_p]:leading-relaxed [&_p]:mb-6
                [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-6 [&_ul]:text-[var(--text-muted)]
                [&_li]:mb-2 [&_li]:leading-relaxed
                [&_strong]:text-[var(--text-primary)] [&_strong]:font-bold
                [&_blockquote]:border-l-4 [&_blockquote]:border-insight-teal [&_blockquote]:bg-insight-teal/5 [&_blockquote]:py-4 [&_blockquote]:px-8 [&_blockquote]:rounded-2xl [&_blockquote]:italic [&_blockquote]:my-10 [&_blockquote_p]:mb-0"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags / Footer */}
            <div className="mt-20 pt-12 border-t border-white/10">
              <div className="flex flex-wrap gap-3">
                {["Cloud", "Edge Computing", "Data Science", "Security"].map((tag) => (
                  <span key={tag} className="px-4 py-2 rounded-xl glass-subtle border border-white/5 text-xs font-bold text-[var(--text-muted)] hover:border-insight-teal/20 hover:text-insight-teal transition-all cursor-pointer">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </article>

        {/* Next Post / CTA */}
        <section className="mt-32 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="glass rounded-[3rem] p-12 md:p-20 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-insight-teal/10 to-aura-violet/10 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left">
                <div className="max-w-xl">
                  <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight leading-tight">
                    Ready to scale your <span className="gradient-text">Data Architecture?</span>
                  </h2>
                  <p className="text-[var(--text-muted)] text-lg font-medium">
                    Deploy your first edge node in minutes. No credit card required.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/register" className="px-10 py-5 bg-white text-black font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl">
                    Get Started Free
                  </Link>
                  <Link href="/contact" className="px-10 py-5 glass border border-white/10 font-bold rounded-2xl hover:bg-white/5 transition-all">
                    Talk to Sales
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
