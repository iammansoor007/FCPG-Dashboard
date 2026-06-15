import connectToDatabase from '@/lib/mongodb';
import Post from '@/models/Post';
import Category from '@/models/Category';
import Link from 'next/link';
import { Metadata } from 'next';
import { BASE_URL } from '@/lib/constants';
import SiteContent from '@/models/Content';
import BlogFilter from '@/components/blog/BlogFilter';

export const revalidate = 60; // Cache for 1 minute

export async function generateMetadata(): Promise<Metadata> {
  await connectToDatabase();
  const content = await SiteContent.findOne({ key: 'complete_data' }).lean() as any;
  const blogData = content?.data?.blogPage;
  const seo = blogData?.seo || {};
  const pageUrl = `${BASE_URL}/blog`;

  return {
    title: {
      absolute: seo.metaTitle
    },
    description: seo.metaDescription || blogData?.hero?.description,
    alternates: {
      canonical: seo.canonicalUrl || pageUrl,
    },
    openGraph: {
      title: seo.ogTitle || seo.metaTitle || blogData?.hero?.title,
      description: seo.ogDescription || seo.metaDescription || blogData?.hero?.description,
      url: pageUrl,
      type: 'website',
      images: seo.featuredImage ? [{ url: seo.featuredImage }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.twitterTitle || seo.ogTitle || seo.metaTitle,
      description: seo.twitterDescription || seo.ogDescription || seo.metaDescription,
      images: [seo.featuredImage || seo.twitterImage || seo.ogImage].filter(Boolean) as string[],
    },
    robots: {
      index: seo.metaRobotsIndex !== 'noindex',
      follow: seo.metaRobotsFollow !== 'nofollow',
      ...(seo.metaRobotsIndex !== 'noindex' && {
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      })
    }
  };
}

export default async function BlogIndexPage() {
  await connectToDatabase();
  
  const [posts, categories] = await Promise.all([
    Post.find({ status: 'published' })
      .populate('categories author')
      .sort({ publishedAt: -1 }),
    Category.find({}).lean()
  ]);

  const serializablePosts = JSON.parse(JSON.stringify(posts));
  const serializableCategories = JSON.parse(JSON.stringify(categories));

  return (
    <div className="min-h-screen bg-white">
      {/* Simple Clean Hero */}
      <section className="relative h-[400px] flex items-center justify-center bg-slate-900 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
            alt="Blog Header"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="flex items-center justify-center gap-2 text-white/60 text-xs font-bold uppercase tracking-[0.3em] mb-4">
            <Link href="/" className="text-white/60 hover:text-white transition-colors">Home</Link>
            <span className="opacity-30">/</span>
            <span className="text-white">Blog</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight">Our Insights</h1>
          <p className="text-slate-400 mt-4 text-lg max-w-2xl mx-auto">Latest news, guides and updates from RealRoof.</p>
        </div>
      </section>

      <BlogFilter posts={serializablePosts} categories={serializableCategories} />
    </div>
  );
}

