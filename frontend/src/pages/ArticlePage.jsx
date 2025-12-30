import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, User, Calendar, ChevronRight, Share2, Bookmark } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import Layout from '../components/layout/Layout';
import ArticleCard from '../components/cards/ArticleCard';
import { fetchArticleBySlug, fetchArticlesByCategory } from '../services/api';

const ArticlePage = () => {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadArticle = async () => {
      setLoading(true);
      try {
        const articleData = await fetchArticleBySlug(slug);
        setArticle(articleData);
        
        if (articleData) {
          const related = await fetchArticlesByCategory(articleData.category, slug, 3);
          setRelatedArticles(related);
        }
      } catch (error) {
        console.error('Error loading article:', error);
      } finally {
        setLoading(false);
      }
    };
    loadArticle();
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-[#888680]">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (!article) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-[#d9fb06] font-black text-3xl mb-4">Article Not Found</h1>
            <p className="text-[#888680] mb-6">The article you're looking for doesn't exist.</p>
            <Link to="/">
              <Button className="bg-[#d9fb06] text-[#1a1c1b] hover:bg-[rgba(217,251,6,0.8)] rounded-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const formattedDate = new Date(article.publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-[#302f2c] py-3 border-b border-[rgba(63,72,22,0.5)]">
        <div className="max-w-[87.5rem] mx-auto px-5 md:px-10">
          <nav className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-[#888680] hover:text-[#d9fb06] transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 text-[#888680]" />
            <Link to={`/category/${article.category}`} className="text-[#888680] hover:text-[#d9fb06] transition-colors">
              {article.categoryName}
            </Link>
            <ChevronRight className="w-4 h-4 text-[#888680]" />
            <span className="text-[#d9fb06] truncate max-w-[200px]">{article.title}</span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <section className="bg-[#1a1c1b] pt-8 md:pt-12 pb-6">
        <div className="max-w-4xl mx-auto px-5 md:px-10">
          <Link to={`/category/${article.category}`}>
            <Badge className="bg-[#d9fb06] text-[#1a1c1b] hover:bg-[rgba(217,251,6,0.8)] mb-4">
              {article.categoryName}
            </Badge>
          </Link>
          
          <h1 className="font-black text-3xl md:text-4xl lg:text-5xl text-[#d9fb06] uppercase leading-tight mb-6">
            {article.title}
          </h1>
          
          <p className="text-[#dfddd6] text-lg md:text-xl leading-relaxed mb-6">
            {article.excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-[#888680]">
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {article.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {formattedDate}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {article.readingTime} min read
            </span>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <section className="bg-[#1a1c1b]">
        <div className="max-w-4xl mx-auto px-5 md:px-10">
          <div className="relative aspect-[16/9] rounded-lg overflow-hidden">
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="bg-[#1a1c1b] py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-5 md:px-10">
          <div className="flex gap-8">
            {/* Share Sidebar - Desktop */}
            <div className="hidden lg:flex flex-col gap-3 sticky top-24 h-fit">
              <button className="w-10 h-10 rounded-full bg-[#302f2c] flex items-center justify-center text-[#888680] hover:text-[#d9fb06] hover:bg-[#3f4816] transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full bg-[#302f2c] flex items-center justify-center text-[#888680] hover:text-[#d9fb06] hover:bg-[#3f4816] transition-colors">
                <Bookmark className="w-4 h-4" />
              </button>
            </div>

            {/* Main Content */}
            <article 
              className="flex-1 prose prose-invert max-w-none
                prose-headings:text-[#d9fb06] prose-headings:font-bold prose-headings:uppercase
                prose-h2:text-xl prose-h2:md:text-2xl prose-h2:mt-8 prose-h2:mb-4
                prose-h3:text-lg prose-h3:md:text-xl prose-h3:mt-6 prose-h3:mb-3
                prose-p:text-[#dfddd6] prose-p:leading-relaxed prose-p:mb-4
                prose-a:text-[#d9fb06] prose-a:no-underline hover:prose-a:underline
                prose-strong:text-[#d9fb06]
                prose-ul:text-[#dfddd6] prose-li:mb-2
                prose-ol:text-[#dfddd6]"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          </div>

          {/* Share Bar - Mobile */}
          <div className="flex lg:hidden items-center justify-center gap-3 mt-8 pt-6 border-t border-[rgba(63,72,22,0.5)]">
            <span className="text-[#888680] text-sm">Share this article:</span>
            <button className="w-10 h-10 rounded-full bg-[#302f2c] flex items-center justify-center text-[#888680] hover:text-[#d9fb06] hover:bg-[#3f4816] transition-colors">
              <Share2 className="w-4 h-4" />
            </button>
            <button className="w-10 h-10 rounded-full bg-[#302f2c] flex items-center justify-center text-[#888680] hover:text-[#d9fb06] hover:bg-[#3f4816] transition-colors">
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* AdSense Placeholder */}
      <section className="bg-[#302f2c] py-6">
        <div className="max-w-4xl mx-auto px-5 md:px-10">
          <div className="border border-dashed border-[#3f4816] rounded-lg py-8 text-center">
            <span className="text-[#888680] text-sm">Advertisement Space</span>
          </div>
        </div>
      </section>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <section className="bg-[#1a1c1b] py-12 md:py-16">
          <div className="max-w-[87.5rem] mx-auto px-5 md:px-10">
            <h2 className="font-black text-2xl text-[#d9fb06] uppercase mb-8">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedArticles.map((relArticle) => (
                <ArticleCard key={relArticle.id} article={relArticle} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back Navigation */}
      <section className="bg-[#302f2c] py-8">
        <div className="max-w-[87.5rem] mx-auto px-5 md:px-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Link to={`/category/${article.category}`}>
              <Button variant="outline" className="border-[#d9fb06] text-[#d9fb06] hover:bg-[#d9fb06] hover:text-[#1a1c1b] rounded-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to {article.categoryName}
              </Button>
            </Link>
            <Link to="/articles">
              <Button className="bg-[#d9fb06] text-[#1a1c1b] hover:bg-[rgba(217,251,6,0.8)] rounded-full">
                Browse All Articles
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ArticlePage;
