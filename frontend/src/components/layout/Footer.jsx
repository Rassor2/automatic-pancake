import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight } from 'lucide-react';
import { fetchCategories } from '../../services/api';

const Footer = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const cats = await fetchCategories();
        setCategories(cats);
      } catch (error) {
        console.error('Error loading categories:', error);
      }
    };
    loadCategories();
  }, []);
  return (
    <footer className="bg-[#302f2c] border-t border-[rgba(63,72,22,0.5)]">
      <div className="max-w-[87.5rem] mx-auto px-5 md:px-10 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-block mb-4">
              <span className="font-black text-2xl text-[#d9fb06] uppercase tracking-tight">
                CareerPath
              </span>
            </Link>
            <p className="text-[#888680] text-sm leading-relaxed mb-6">
              Your trusted resource for education and career guidance. 
              Helping students and professionals make informed decisions about their future.
            </p>
            <Link 
              to="/newsletter" 
              className="inline-flex items-center gap-2 text-[#d9fb06] hover:text-[rgba(217,251,6,0.8)] text-sm font-medium transition-colors"
            >
              <Mail className="w-4 h-4" />
              Subscribe to Newsletter
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Categories Column */}
          <div>
            <h4 className="text-[#d9fb06] font-semibold text-sm uppercase tracking-wider mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    to={`/category/${category.slug}`}
                    className="text-[#888680] hover:text-[#d9fb06] text-sm transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h4 className="text-[#d9fb06] font-semibold text-sm uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to="/articles"
                  className="text-[#888680] hover:text-[#d9fb06] text-sm transition-colors"
                >
                  All Articles
                </Link>
              </li>
              <li>
                <Link
                  to="/newsletter"
                  className="text-[#888680] hover:text-[#d9fb06] text-sm transition-colors"
                >
                  Newsletter
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-[#888680] hover:text-[#d9fb06] text-sm transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-[#d9fb06] font-semibold text-sm uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-[#888680] hover:text-[#d9fb06] text-sm transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-service"
                  className="text-[#888680] hover:text-[#d9fb06] text-sm transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[rgba(63,72,22,0.5)]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#888680] text-sm">
              © {new Date().getFullYear()} CareerPath. All rights reserved.
            </p>
            <p className="text-[#888680] text-xs">
              Empowering careers through quality education guidance.
            </p>
          </div>
        </div>
      </div>

      {/* AdSense Placeholder */}
      <div className="bg-[#1a1c1b] py-4">
        <div className="max-w-[87.5rem] mx-auto px-5 md:px-10">
          <div className="border border-dashed border-[#3f4816] rounded-lg py-3 text-center">
            <span className="text-[#888680] text-xs">Advertisement Space</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
