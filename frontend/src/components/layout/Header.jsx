import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { categories } from '../../data/mock';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a1c1b] border-b border-[rgba(63,72,22,0.5)]">
      <div className="max-w-[87.5rem] mx-auto px-5 md:px-10">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="font-black text-xl md:text-2xl text-[#d9fb06] uppercase tracking-tight">
              CareerPath
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link 
              to="/" 
              className="nav-link text-[#d9fb06] hover:text-[rgba(217,251,6,0.8)] px-4 py-2 text-sm font-medium transition-colors"
            >
              Home
            </Link>
            {categories.slice(0, 5).map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="nav-link text-[#d9fb06] hover:text-[rgba(217,251,6,0.8)] px-4 py-2 text-sm font-medium transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </nav>

          {/* Desktop Search & Actions */}
          <div className="hidden lg:flex items-center gap-3">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-48 bg-[#302f2c] border-[#3f4816] text-[#d9fb06] placeholder:text-[#888680] focus:border-[#d9fb06] pr-9"
              />
              <button 
                type="submit" 
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#888680] hover:text-[#d9fb06] transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
            <Link to="/newsletter">
              <Button className="bg-[#d9fb06] text-[#1a1c1b] hover:bg-[rgba(217,251,6,0.8)] font-semibold rounded-full px-5">
                Subscribe
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 text-[#d9fb06]"
            >
              <Search className="w-5 h-5" />
            </button>
            
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2 text-[#d9fb06]">
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#1a1c1b] border-l-[#3f4816] w-[280px]">
                <div className="flex flex-col h-full pt-8">
                  <nav className="flex flex-col gap-1">
                    <Link 
                      to="/" 
                      className="text-[#d9fb06] hover:bg-[#302f2c] px-4 py-3 rounded-lg font-medium transition-colors"
                    >
                      Home
                    </Link>
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        to={`/category/${category.slug}`}
                        className="text-[#d9fb06] hover:bg-[#302f2c] px-4 py-3 rounded-lg font-medium transition-colors"
                      >
                        {category.name}
                      </Link>
                    ))}
                  </nav>
                  <div className="mt-auto pb-8">
                    <Link to="/newsletter" className="block">
                      <Button className="w-full bg-[#d9fb06] text-[#1a1c1b] hover:bg-[rgba(217,251,6,0.8)] font-semibold rounded-full">
                        Subscribe to Newsletter
                      </Button>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="lg:hidden pb-4">
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#302f2c] border-[#3f4816] text-[#d9fb06] placeholder:text-[#888680] focus:border-[#d9fb06] pr-9"
                autoFocus
              />
              <button 
                type="submit" 
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#888680] hover:text-[#d9fb06] transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
