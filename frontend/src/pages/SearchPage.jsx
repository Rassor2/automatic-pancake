import React, { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, ArrowLeft } from 'lucide-react';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import Layout from '../components/layout/Layout';
import ArticleCard from '../components/cards/ArticleCard';
import { searchArticles } from '../data/mock';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(query);
  const results = searchArticles(query);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <Layout>
      {/* Search Header */}
      <section className="bg-[#1a1c1b] py-12 md:py-16">
        <div className="max-w-[87.5rem] mx-auto px-5 md:px-10">
          <h1 className="font-black text-3xl md:text-4xl text-[#d9fb06] uppercase mb-6">
            Search Articles
          </h1>
          
          <form onSubmit={handleSearch} className="max-w-xl">
            <div className="relative">
              <Input
                type="text"
                placeholder="Search for articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#302f2c] border-[#3f4816] text-[#d9fb06] placeholder:text-[#888680] focus:border-[#d9fb06] pr-12 py-6 text-base"
              />
              <button 
                type="submit" 
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#d9fb06] rounded-full flex items-center justify-center text-[#1a1c1b] hover:bg-[rgba(217,251,6,0.8)] transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Search Results */}
      <section className="bg-[#302f2c] py-12 md:py-16">
        <div className="max-w-[87.5rem] mx-auto px-5 md:px-10">
          {query ? (
            <>
              <p className="text-[#888680] mb-8">
                {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
              </p>
              
              {results.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {results.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-[#888680] text-lg mb-4">
                    No articles found matching your search.
                  </p>
                  <Link to="/articles">
                    <Button className="bg-[#d9fb06] text-[#1a1c1b] hover:bg-[rgba(217,251,6,0.8)] rounded-full">
                      Browse All Articles
                    </Button>
                  </Link>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-[#888680] text-lg mb-4">
                Enter a search term to find articles.
              </p>
              <Link to="/articles">
                <Button className="bg-[#d9fb06] text-[#1a1c1b] hover:bg-[rgba(217,251,6,0.8)] rounded-full">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Browse All Articles
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default SearchPage;
