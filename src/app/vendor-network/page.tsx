import VendorNetworkTemplate from "@/components/templates/VendorNetworkTemplate";
import { Metadata } from "next";
import connectToDatabase from "@/lib/mongodb";
import SiteContent from "@/models/Content";
import Script from "next/script";
import { generateSchema } from "@/lib/schema-generator";
import { BASE_URL } from "@/lib/constants";

export async function generateMetadata(): Promise<Metadata> {
  await connectToDatabase();
  const content = await SiteContent.findOne({ key: "complete_data" }).lean() as any;
  const vendorData = content?.data?.vendorNetwork;
  const seo = vendorData?.seo || {};
  const pageUrl = `${BASE_URL}/vendor-network`;
  
  return {
    metadataBase: new URL(BASE_URL),
    title: {
      absolute: seo.metaTitle || "Approved Vendor Network"
    },
    description: seo.metaDescription || "Approved vendor network built for speed, compliance, and quality.",
    alternates: {
      canonical: seo.canonicalUrl || pageUrl,
    },
    openGraph: {
      title: seo.ogTitle || seo.metaTitle || "Approved Vendor Network",
      description: seo.ogDescription || seo.metaDescription || "Approved vendor network built for speed, compliance, and quality.",
      url: pageUrl,
      siteName: "RealRoof",
      type: "website",
      images: seo.featuredImage ? [{ url: seo.featuredImage }] : [],
    },
    twitter: {
      card: "summary_large_image",
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

export default async function VendorNetworkPage() {
  await connectToDatabase();
  const content = await SiteContent.findOne({ key: "complete_data" }).lean() as any;
  const vendorData = content?.data?.vendorNetwork || {};

  const schema = generateSchema({
    title: "Approved Vendor Network",
    description: "Approved vendor network built for speed, compliance, and quality.",
    slug: "/vendor-network",
    type: "WebPage"
  });

  const pageData = {
    content: {
      vendorNetwork: {
        ...(content?.data?.vendorNetwork || {})
      }
    }
  };

  return (
    <>
      <Script
        id="json-ld-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <VendorNetworkTemplate pageData={pageData} />
    </>
  );
}
