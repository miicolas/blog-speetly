import { useTranslations } from "next-intl";
import { getAllArticles, BlogArticle } from "@/lib/blog";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog.meta" });

  return {
    title: t("title"),
    description: t("description"),
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: "https://speetly.com/blog",
      type: "website",
      images: [
        {
          url: "https://speetly.com/images/og-image.png",
          width: 1200,
          height: 630,
          alt: "Speetly Freelance Blog Cover",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["https://speetly.com/images/og-image.png"],
    },
    alternates: {
      canonical: "https://speetly.com/blog",
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const articles = await getAllArticles(locale);
  return <BlogPageContent articles={articles} />;
}

function BlogPageContent({ articles }: { articles: BlogArticle[] }) {
  const t = useTranslations("blog");

  return (
    <div className="mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">{t("title")}</h1>
        <div className="grid gap-6">
          {articles.map((article) => (
            <Card key={article.slug} className="p-6">
              <Link href={`/blog/${article.slug}`}>
                <article className="space-y-3">
                  <div className="space-y-1">
                    <h2 className="text-2xl font-semibold hover:text-primary transition-colors">
                      {article.title}
                    </h2>
                    <p className="text-muted-foreground">
                      {article.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Image
                        src={article.author.image}
                        alt={article.author.name}
                        className="w-6 h-6 rounded-full object-cover"
                        width={24}
                        height={24}
                      />
                      <span>
                        {t("publishedBy")} {article.author.name}
                      </span>
                    </div>
                    <span>•</span>
                    <time dateTime={article.publishDate.toISOString()}>
                      {formatDate(article.publishDate)}
                    </time>
                    <span>•</span>
                    <span>{article.readingTime}</span>
                  </div>
                  <div className="flex gap-2">
                    {article.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 bg-muted rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              </Link>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
