import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPage } from "@/components/landing/landing-page";
import { getLandingPage, landingPages } from "@/config/landing-pages";
import { GeoLandingPage } from "@/we/geo-landing-page";
import { getHomepageData } from "@/we/homepage-data";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return landingPages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getLandingPage(slug);
  if (!page) return {};

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: {
      canonical: `https://humankind.center/hi/${page.slug}`,
    },
    keywords: page.geo
      ? [
          page.geo.h1,
          "humankind",
          "Sedona",
          "conscious community",
          "Sedona events",
          "spiritual events",
          "wellness events",
        ]
      : undefined,
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: `https://humankind.center/hi/${page.slug}`,
      siteName: "humankind",
      images: [{ url: page.geo?.image ?? "/og-image.jpg" }],
    },
  };
}

export default async function HiLandingPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getLandingPage(slug);
  if (!page) notFound();

  if (page.geo) {
    const { events, broadcast } = await getHomepageData();
    return <GeoLandingPage page={page} events={events} broadcast={broadcast} />;
  }

  return <LandingPage page={page} />;
}
