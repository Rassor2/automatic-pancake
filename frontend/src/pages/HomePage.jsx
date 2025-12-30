import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Users, Target } from 'lucide-react';
import { Button } from '../components/ui/button';
import Layout from '../components/layout/Layout';
import ArticleCard from '../components/cards/ArticleCard';
import CategoryCard from '../components/cards/CategoryCard';
import { featuredArticles, articles, categories } from '../data/mock';

const HomePage = () => {
  const latestArticles = articles.slice(0, 6);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-[#1a1c1b] overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1622675103136-e4b90c9a33d6?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzh8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkZXZlbG9wbWVudHxlbnwwfHx8fDE3NjcxMjkzMzB8MA&ixlib=rb-4.1.0&q=85" 
            alt="Career guidance"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1a1c1b] via-[#1a1c1b]/90 to-[#1a1c1b]/60" />
        </div>
        
        <div className="relative max-w-[87.5rem] mx-auto px-5 md:px-10 py-20 md:py-32">
          <div className="max-w-2xl">
            <span className="inline-block text-[#888680] text-sm font-medium uppercase tracking-wider mb-4">
              Education & Career Resource
            </span>
            <h1 className="font-black text-4xl md:text-5xl lg:text-6xl text-[#d9fb06] uppercase leading-[0.9] mb-6">
              Navigate Your Career Path
            </h1>
            <p className="text-[#dfddd6] text-lg md:text-xl leading-relaxed mb-8">
              Your trusted resource for education and career guidance. Make informed decisions about your academic journey and professional future.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/articles">
                <Button className="bg-[#d9fb06] text-[#1a1c1b] hover:bg-[rgba(217,251,6,0.8)] font-semibold rounded-full px-6 py-5 text-base">
                  Explore Articles
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/newsletter">
                <Button variant="outline" className="border-[#d9fb06] text-[#d9fb06] hover:bg-[#d9fb06] hover:text-[#1a1c1b] font-semibold rounded-full px-6 py-5 text-base">
                  Subscribe Free
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#302f2c] py-8 md:py-10">
        <div className="max-w-[87.5rem] mx-auto px-5 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center">
              <span className="block text-[#d9fb06] font-black text-3xl md:text-4xl">12+</span>
              <span className="text-[#888680] text-sm">Expert Articles</span>
            </div>
            <div className="text-center">
              <span className="block text-[#d9fb06] font-black text-3xl md:text-4xl">6</span>
              <span className="text-[#888680] text-sm">Categories</span>
            </div>
            <div className="text-center">
              <span className="block text-[#d9fb06] font-black text-3xl md:text-4xl">100%</span>
              <span className="text-[#888680] text-sm">Free Resources</span>
            </div>
            <div className="text-center">
              <span className="block text-[#d9fb06] font-black text-3xl md:text-4xl">24/7</span>
              <span className="text-[#888680] text-sm">Access</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Articles Section */}
      <section className="bg-[#1a1c1b] py-12 md:py-20">
        <div className="max-w-[87.5rem] mx-auto px-5 md:px-10">
          <div className="flex items-end justify-between mb-8 md:mb-10">
            <div>
              <span className="text-[#888680] text-sm font-medium uppercase tracking-wider">
                Featured Content
              </span>
              <h2 className="font-black text-2xl md:text-3xl text-[#d9fb06] uppercase mt-2">
                Top Articles
              </h2>
            </div>
            <Link 
              to="/articles" 
              className="hidden md:flex items-center gap-2 text-[#d9fb06] hover:text-[rgba(217,251,6,0.8)] text-sm font-medium transition-colors"
            >
              View All Articles
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} variant="featured" />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link to="/articles">
              <Button variant="outline" className="border-[#d9fb06] text-[#d9fb06] hover:bg-[#d9fb06] hover:text-[#1a1c1b] font-semibold rounded-full">
                View All Articles
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
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

      {/* Categories Section */}
      <section className="bg-[#1a1c1b] py-12 md:py-20">
        <div className="max-w-[87.5rem] mx-auto px-5 md:px-10">
          <div className="text-center mb-10 md:mb-12">
            <span className="text-[#888680] text-sm font-medium uppercase tracking-wider">
              Browse Topics
            </span>
            <h2 className="font-black text-2xl md:text-3xl text-[#d9fb06] uppercase mt-2">
              Explore Categories
            </h2>
            <p className="text-[#888680] text-base mt-3 max-w-xl mx-auto">
              Find articles tailored to your career stage and educational needs.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="bg-[#302f2c] py-12 md:py-20">
        <div className="max-w-[87.5rem] mx-auto px-5 md:px-10">
          <div className="flex items-end justify-between mb-8 md:mb-10">
            <div>
              <span className="text-[#888680] text-sm font-medium uppercase tracking-wider">
                Fresh Insights
              </span>
              <h2 className="font-black text-2xl md:text-3xl text-[#d9fb06] uppercase mt-2">
                Latest Articles
              </h2>
            </div>
            <Link 
              to="/articles" 
              className="hidden md:flex items-center gap-2 text-[#d9fb06] hover:text-[rgba(217,251,6,0.8)] text-sm font-medium transition-colors"
            >
              Browse All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {latestArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-[#1a1c1b] py-12 md:py-20">
        <div className="max-w-[87.5rem] mx-auto px-5 md:px-10">
          <div className="text-center mb-10 md:mb-12">
            <span className="text-[#888680] text-sm font-medium uppercase tracking-wider">
              Why CareerPath
            </span>
            <h2 className="font-black text-2xl md:text-3xl text-[#d9fb06] uppercase mt-2">
              Your Trusted Guide
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-[#302f2c] flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-[#d9fb06]" />
              </div>
              <h3 className="text-[#d9fb06] font-semibold text-lg mb-2">Expert Content</h3>
              <p className="text-[#888680] text-sm">
                Well-researched articles written by career professionals and education experts.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-[#302f2c] flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-[#d9fb06]" />
              </div>
              <h3 className="text-[#d9fb06] font-semibold text-lg mb-2">Practical Advice</h3>
              <p className="text-[#888680] text-sm">
                Actionable guidance you can apply immediately to your career decisions.
              </p>
            </div>
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-[#302f2c] flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-[#d9fb06]" />
              </div>
              <h3 className="text-[#d9fb06] font-semibold text-lg mb-2">For Everyone</h3>
              <p className="text-[#888680] text-sm">
                Resources for students, job seekers, and professionals at any career stage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA Section */}
      <section className="bg-[#3f4816] py-12 md:py-16">
        <div className="max-w-[87.5rem] mx-auto px-5 md:px-10">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-black text-2xl md:text-3xl text-[#d9fb06] uppercase mb-4">
              Stay Informed
            </h2>
            <p className="text-[#dfddd6] text-base mb-6">
              Get the latest career insights and education tips delivered to your inbox weekly.
            </p>
            <Link to="/newsletter">
              <Button className="bg-[#d9fb06] text-[#1a1c1b] hover:bg-[rgba(217,251,6,0.8)] font-semibold rounded-full px-8 py-5 text-base">
                Subscribe to Newsletter
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HomePage;
