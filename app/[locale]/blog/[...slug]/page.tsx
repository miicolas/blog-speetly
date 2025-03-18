import { ArticleLayout } from "@/components/blog/article-layout";
import { notFound } from "next/navigation";
import { getArticleBySlug, getRelatedArticles } from "@/lib/blog";
import { Metadata } from "next";

interface BlogPostPageProps {
    params: {
        locale: string;
        slug: string[];
    };
}

export async function generateMetadata({
    params,
}: BlogPostPageProps): Promise<Metadata> {
    const article = await getArticleBySlug(params.slug[0], params.locale);

    if (!article) {
        return {};
    }

    return {
        title: article.title,
        description: article.description,
        openGraph: {
            title: article.title,
            description: article.description,
            type: "article",
            publishedTime: article.publishDate.toISOString(),
            authors: [article.author.name],
            tags: article.tags,
        },
        twitter: {
            card: "summary_large_image",
            title: article.title,
            description: article.description,
        },
    };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const article = await getArticleBySlug(params.slug[0], params.locale);

    if (!article) {
        notFound();
    }

    const relatedArticles = await getRelatedArticles(params.slug[0], article.tags, params.locale);
    const url = `${process.env.NEXT_PUBLIC_SITE_URL}/${params.locale}/blog/${params.slug[0]}`;

    return (
        <ArticleLayout
            title={article.title}
            description={article.description}
            author={article.author}
            publishDate={article.publishDate}
            readingTime={article.readingTime}
            category={article.category}
            content={article.content}
            tags={article.tags}
            relatedArticles={relatedArticles}
            url={url}
        />
    );
}
