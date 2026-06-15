"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, BookOpen, ArrowRight, Calendar, User, Clock, ChevronRight } from "lucide-react";

interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featuredImage?: string;
  publishedAt: string;
  categories?: { _id: string; name: string }[];
  author?: { name: string; image?: string };
}

interface Category {
  _id: string;
  name: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

export default function BlogFilter({
  posts,
  categories,
}: {
  posts: Post[];
  categories: Category[];
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        selectedCategory === "All" ||
        post.categories?.some((c) => c.name === selectedCategory);
      
      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        post.title.toLowerCase().includes(query) ||
        post.excerpt?.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [posts, selectedCategory, searchQuery]);

  // Extract the latest post as the "Featured Post" (only show when not searching and on "All" category)
  const showFeatured = selectedCategory === "All" && searchQuery.trim() === "" && posts.length > 0;
  const featuredPost = showFeatured ? posts[0] : null;
  const regularPosts = showFeatured ? filteredPosts.slice(1) : filteredPosts;

  const wordCount = (text: string) => text ? text.split(/\s+/).length : 0;
  const readTime = (text: string) => Math.max(1, Math.ceil(wordCount(text) / 200));

  return (
    <div className="bg-white text-[#072642] min-h-screen pb-24">
      {/* ── HERO HEADER SECTION ── */}
      <section className="relative min-h-[380px] lg:min-h-[440px] overflow-hidden bg-[#031b31] flex items-center text-white">
        <motion.div
          animate={{ scale: [1, 1.04, 1] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full opacity-30 select-none pointer-events-none"
        >
          <img
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop"
            alt="Blog Header"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#031b31] via-[#031b31]/95 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#031b31]/60 via-transparent to-transparent z-10" />

        {/* Architect blueprint grid dots & lines */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-10 opacity-[0.06]">
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="blog-dots" width="40" height="40" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="#ffffff" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#blog-dots)" />
          </svg>
          <div className="absolute top-6 right-8 text-[9px] font-mono text-[#c99b31]/40 tracking-widest">BLUEPRINT_REF: BLOG_INDEX // ARCH_V2</div>
          <div className="absolute bottom-6 left-8 text-[9px] font-mono text-[#c99b31]/20 tracking-wider hidden md:block">LOCALLY OWNED & OPERATED // SOUTHEAST COVERAGE</div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#c99b31] to-transparent z-20 opacity-70" />

        <div className="relative mx-auto w-full max-w-[1160px] px-4 sm:px-6 lg:px-8 py-16 z-20">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.12 } } }}
            className="max-w-[640px]"
          >
            {/* Tagline Badge */}
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-4 bg-[#c99b31]/10 border border-[#c99b31]/20 px-3.5 py-1 rounded-full">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#c99b31] animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c99b31]">
                Knowledge & Insights
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]"
            >
              The RealRoof <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c99b31] via-[#f1cd7c] to-[#c99b31]">
                Editorial Logs
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeUp}
              className="mt-6 text-sm sm:text-base leading-relaxed text-white/70 max-w-xl font-medium"
            >
              Expert guides, local storm reports, architectural material breakdowns, and structural maintenance protocols designed by our licensed roof management team.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── DYNAMIC SEARCH & FILTER PANEL ── */}
      <div className="border-b border-slate-100 bg-slate-50/50 sticky top-0 z-30 backdrop-blur-md">
        <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                selectedCategory === "All"
                  ? "bg-[#031b31] text-white border-[#031b31] shadow-md shadow-[#031b31]/10"
                  : "bg-white text-slate-500 border-slate-200 hover:border-slate-350 hover:text-slate-800"
              }`}
            >
              All Categories
            </button>
            {categories.slice(0, 5).map((cat) => (
              <button
                key={cat._id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 border ${
                  selectedCategory === cat.name
                    ? "bg-[#031b31] text-white border-[#031b31] shadow-md shadow-[#031b31]/10"
                    : "bg-white text-slate-500 border-slate-200 hover:border-slate-350 hover:text-slate-800"
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#c99b31] transition-colors" />
            <input
              type="text"
              placeholder="Search logs & files..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-sm outline-none focus:ring-2 focus:ring-[#c99b31]/15 focus:border-[#c99b31] transition-all text-slate-900 font-semibold"
            />
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#c99b31] scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 rounded-b-xl" />
          </div>
        </div>
      </div>

      <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {/* ── FEATURED POST (Hero layout) ── */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="group relative bg-[#031b31] text-white rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 flex flex-col lg:flex-row min-h-[480px]">
              
              {/* Gold corners */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#c99b31]/40 rounded-tl-[2rem] z-20 pointer-events-none" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#c99b31]/40 rounded-tr-[2rem] z-20 pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#c99b31]/40 rounded-bl-[2rem] z-20 pointer-events-none" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#c99b31]/40 rounded-br-[2rem] z-20 pointer-events-none" />

              {/* Left Column: Image */}
              <div className="lg:w-3/5 relative min-h-[300px] lg:min-h-full overflow-hidden">
                {featuredPost.featuredImage ? (
                  <img
                    src={featuredPost.featuredImage}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-slate-700" />
                  </div>
                )}
                {/* Dark overlay on mobile to maintain contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#031b31] via-transparent to-transparent lg:hidden" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#031b31]/50 hidden lg:block" />
              </div>

              {/* Right Column: Content */}
              <div className="lg:w-2/5 p-8 sm:p-12 lg:p-14 flex flex-col justify-between relative z-10">
                <div className="space-y-6">
                  {/* Category & Stats */}
                  <div className="flex items-center gap-3 flex-wrap">
                    {featuredPost.categories?.[0] && (
                      <span className="bg-[#c99b31] text-white px-3 py-1 text-[10px] font-black uppercase tracking-wider rounded-md">
                        {featuredPost.categories[0].name}
                      </span>
                    )}
                    <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {new Date(featuredPost.publishedAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="text-[10px] font-bold text-white/50 uppercase tracking-widest flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {readTime(featuredPost.content)} Min Read
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl sm:text-3xl font-bold leading-tight group-hover:text-[#c99b31] transition-colors duration-300">
                    {featuredPost.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-white/70 text-sm leading-relaxed font-medium">
                    {featuredPost.excerpt ||
                      featuredPost.content.replace(/<[^>]*>/g, "").substring(0, 160)}
                    ...
                  </p>
                </div>

                {/* Author Card & CTA */}
                <div className="mt-8 pt-8 border-t border-white/10 flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    <img
                      src={
                        featuredPost.author?.image ||
                        `https://ui-avatars.com/api/?name=${featuredPost.author?.name || "Admin"}&background=c99b31&color=fff`
                      }
                      alt={featuredPost.author?.name || "RealRoof"}
                      className="w-10 h-10 rounded-full object-cover border border-white/20"
                    />
                    <div>
                      <span className="text-[10px] font-bold text-[#c99b31] uppercase tracking-wider block">Author</span>
                      <span className="text-xs font-semibold text-white/80">{featuredPost.author?.name || "RealRoof Team"}</span>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${featuredPost.slug}`}
                    className="inline-flex items-center gap-2 bg-white text-[#031b31] hover:bg-[#c99b31] hover:text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300 group/btn"
                  >
                    Read Article
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* ── REGULAR POSTS GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {regularPosts.map((post, idx) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: Math.min(idx * 0.05, 0.3) }}
                className="flex"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col bg-white border border-slate-100 rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-[#031b31]/5 hover:border-[#c99b31]/30 transition-all duration-300 w-full"
                >
                  {/* Card Image Area */}
                  <div className="aspect-[4/3] relative overflow-hidden bg-slate-100">
                    {post.featuredImage ? (
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-slate-50 flex items-center justify-center">
                        <BookOpen className="w-10 h-10 text-slate-200" />
                      </div>
                    )}
                    {post.categories?.[0] && (
                      <div className="absolute top-4 left-4 z-10">
                        <span className="bg-white/95 backdrop-blur-sm text-[#031b31] px-3 py-1 text-[9px] font-black uppercase tracking-wider rounded-md shadow-sm border border-slate-100">
                          {post.categories[0].name}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Content Area */}
                  <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                    <div className="space-y-4">
                      {/* Meta info */}
                      <div className="flex items-center gap-3 text-slate-400 text-[10px] font-bold uppercase tracking-wider">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {new Date(post.publishedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {readTime(post.content)} min
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#031b31] transition-colors leading-snug line-clamp-2">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-slate-500 text-sm leading-relaxed line-clamp-2">
                        {post.excerpt ||
                          post.content.replace(/<[^>]*>/g, "").substring(0, 100)}
                      </p>
                    </div>

                    {/* Bottom Link */}
                    <div className="mt-6 pt-5 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={
                            post.author?.image ||
                            `https://ui-avatars.com/api/?name=${post.author?.name || "Admin"}&background=031b31&color=fff`
                          }
                          alt={post.author?.name || "RealRoof"}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="text-[11px] text-slate-500 font-semibold">{post.author?.name || "RealRoof"}</span>
                      </div>

                      <span className="inline-flex items-center gap-1 text-[#c99b31] text-[11px] font-extrabold uppercase tracking-widest group-hover:text-[#031b31] transition-colors duration-300">
                        Read Logs{" "}
                        <ChevronRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* ── EMPTY STATE ── */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-[2rem] border border-slate-100 max-w-xl mx-auto shadow-sm">
            <BookOpen className="w-12 h-12 text-[#c99b31]/40 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-900">No articles matched</h3>
            <p className="text-slate-500 mt-2 text-sm max-w-xs mx-auto">
              We couldn't find any documents matching your filters or search terms. Try widening your filters.
            </p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-6 bg-[#031b31] text-white hover:bg-[#c99b31] hover:text-white px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-300"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
