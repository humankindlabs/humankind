import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LandingPage } from "@/components/landing/landing-page";
import { getLandingPage, landingPages } from "@/config/landing-pages";

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
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: `https://humankind.center/hi/${page.slug}`,
      siteName: "humankind",
      images: [{ url: "/og-image.jpg" }],
    },
  };
}

export default async function HiLandingPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getLandingPage(slug);
  if (!page) notFound();

  return <LandingPage page={page} />;
}
