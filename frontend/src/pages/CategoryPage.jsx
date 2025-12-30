import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import Layout from '../components/layout/Layout';
import ArticleCard from '../components/cards/ArticleCard';
import { fetchCategoryBySlug, fetchArticlesByCategory, fetchCategories } from '../services/api';
import { GraduationCap, TrendingUp, DollarSign, Award, RefreshCw, Lightbulb } from 'lucide-react';

const iconMap = {
  GraduationCap,
  TrendingUp,
  DollarSign,
  Award,
  RefreshCw,
  Lightbulb
};

const CategoryPage = () => {
  const { slug } = useParams();
  const [category, setCategory] = useState(null);
  const [categoryArticles, setCategoryArticles] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [cat, articles, cats] = await Promise.all([
          fetchCategoryBySlug(slug),
          fetchArticlesByCategory(slug),
          fetchCategories()
        ]);
        setCategory(cat);
        setCategoryArticles(articles);
        setAllCategories(cats);
      } catch (error) {
        console.error('Error loading category:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
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

  if (!category) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-[#d9fb06] font-black text-3xl mb-4">Category Not Found</h1>
            <p className="text-[#888680] mb-6">The category you're looking for doesn't exist.</p>
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

  const IconComponent = iconMap[category.icon] || GraduationCap;

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
            <span className="text-[#d9fb06]">{category.name}</span>
          </nav>
        </div>
      </div>

      {/* Category Header */}
      <section className="bg-[#1a1c1b] py-12 md:py-16">
        <div className="max-w-[87.5rem] mx-auto px-5 md:px-10">
          <div className="flex items-start gap-4 md:gap-6">
            <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-[#3f4816] flex items-center justify-center flex-shrink-0">
              <IconComponent className="w-7 h-7 md:w-8 md:h-8 text-[#d9fb06]" />
            </div>
            <div>
              <h1 className="font-black text-3xl md:text-4xl text-[#d9fb06] uppercase mb-3">
                {category.name}
              </h1>
              <p className="text-[#888680] text-base md:text-lg max-w-2xl">
                {category.description}
              </p>
              <span className="inline-block mt-3 text-[#888680] text-sm">
                {categoryArticles.length} articles in this category
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="bg-[#302f2c] py-12 md:py-16">
        <div className="max-w-[87.5rem] mx-auto px-5 md:px-10">
          {categoryArticles.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {categoryArticles.map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-[#888680] text-lg mb-4">No articles in this category yet.</p>
              <Link to="/articles">
                <Button className="bg-[#d9fb06] text-[#1a1c1b] hover:bg-[rgba(217,251,6,0.8)] rounded-full">
                  Browse All Articles
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* AdSense Placeholder */}
      <section className="bg-[#1a1c1b] py-6">
        <div className="max-w-[87.5rem] mx-auto px-5 md:px-10">
          <div className="border border-dashed border-[#3f4816] rounded-lg py-8 text-center">
            <span className="text-[#888680] text-sm">Advertisement Space</span>
          </div>
        </div>
      </section>

      {/* Other Categories */}
      <section className="bg-[#1a1c1b] py-12 md:py-16">
        <div className="max-w-[87.5rem] mx-auto px-5 md:px-10">
          <h2 className="font-black text-xl md:text-2xl text-[#d9fb06] uppercase mb-6">
            Explore Other Categories
          </h2>
          <div className="flex flex-wrap gap-3">
            {categories
              .filter(cat => cat.slug !== slug)
              .map((cat) => (
                <Link
                  key={cat.id}
                  to={`/category/${cat.slug}`}
                  className="px-4 py-2 bg-[#302f2c] text-[#d9fb06] rounded-full text-sm font-medium hover:bg-[#3f4816] transition-colors"
                >
                  {cat.name}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CategoryPage;
