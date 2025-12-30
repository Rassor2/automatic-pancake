import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import ArticleCard from '../components/cards/ArticleCard';
import { fetchArticles, fetchCategories } from '../services/api';

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [arts, cats] = await Promise.all([
          fetchArticles(),
          fetchCategories()
        ]);
        setArticles(arts);
        setCategories(cats);
      } catch (error) {
        console.error('Error loading articles:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);
  return (
    <Layout>
      {/* Page Header */}
      <section className="bg-[#1a1c1b] py-12 md:py-16">
        <div className="max-w-[87.5rem] mx-auto px-5 md:px-10">
          <h1 className="font-black text-3xl md:text-4xl text-[#d9fb06] uppercase mb-4">
            All Articles
          </h1>
          <p className="text-[#888680] text-base md:text-lg max-w-2xl">
            Browse our complete collection of career guidance and education articles.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-[#302f2c] py-4 sticky top-16 md:top-20 z-30 border-b border-[rgba(63,72,22,0.5)]">
        <div className="max-w-[87.5rem] mx-auto px-5 md:px-10">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
            <Link
              to="/articles"
              className="px-4 py-2 bg-[#d9fb06] text-[#1a1c1b] rounded-full text-sm font-medium whitespace-nowrap"
            >
              All
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                className="px-4 py-2 bg-[#1a1c1b] text-[#d9fb06] rounded-full text-sm font-medium whitespace-nowrap hover:bg-[#3f4816] transition-colors"
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="bg-[#1a1c1b] py-12 md:py-16">
        <div className="max-w-[87.5rem] mx-auto px-5 md:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* AdSense Placeholder */}
      <section className="bg-[#302f2c] py-6">
        <div className="max-w-[87.5rem] mx-auto px-5 md:px-10">
          <div className="border border-dashed border-[#3f4816] rounded-lg py-8 text-center">
            <span className="text-[#888680] text-sm">Advertisement Space</span>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ArticlesPage;
