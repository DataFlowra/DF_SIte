"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, User } from "lucide-react";
import Link from "next/link";
import { BlogPost } from "@/lib/blog-data";
import Image from "next/image";

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export default function BlogCard({ post, index }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="group relative flex flex-col glass rounded-[2.5rem] overflow-hidden border border-white/10 hover:border-insight-teal/30 transition-all duration-500"
    >
      {/* Image Wrap */}
      <div className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-6 left-6 z-20">
          <span className="px-4 py-1.5 rounded-full glass-subtle border border-white/20 text-[10px] font-bold uppercase tracking-widest text-white">
            {post.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-8 flex-1 flex flex-col">
        <div className="flex items-center gap-4 mb-4 text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {post.readTime}
          </div>
          <div className="w-1 h-1 rounded-full bg-white/20" />
          <div>{post.date}</div>
        </div>

        <h3 className="text-2xl font-bold mb-4 group-hover:text-insight-teal transition-colors leading-tight">
          {post.title}
        </h3>
        
        <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-8 flex-1">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between pt-6 border-t border-white/5">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 rounded-full overflow-hidden border border-white/10 shadow-lg">
              <Image 
                src={post.author.avatar} 
                alt={post.author.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="text-xs">
              <div className="font-bold text-[var(--text-primary)]">{post.author.name}</div>
              <div className="text-[var(--text-muted)] opacity-60">{post.author.role}</div>
            </div>
          </div>

          <Link
            href={`/blog/${post.slug}`}
            className="w-10 h-10 rounded-full glass-subtle border border-white/10 flex items-center justify-center group/btn hover:bg-insight-teal/10 hover:border-insight-teal/30 transition-all"
          >
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform text-insight-teal" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
