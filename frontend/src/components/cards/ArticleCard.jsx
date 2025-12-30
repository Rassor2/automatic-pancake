import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { Badge } from '../ui/badge';

const ArticleCard = ({ article, variant = 'default' }) => {
  const { slug, title, excerpt, image, categoryName, category, readingTime, publishedAt } = article;

  const formattedDate = new Date(publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  if (variant === 'featured') {
    return (
      <Link 
        to={`/article/${slug}`}
        className="group block bg-[#302f2c] rounded-lg overflow-hidden border border-[rgba(63,72,22,0.5)] hover:border-[#3f4816] transition-all duration-300"
      >
        <div className="relative aspect-[16/9] overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1c1b]/80 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <Link to={`/category/${category}`}>
              <Badge className="bg-[#d9fb06] text-[#1a1c1b] hover:bg-[rgba(217,251,6,0.8)] mb-2">
                {categoryName}
              </Badge>
            </Link>
            <h3 className="text-[#d9fb06] font-bold text-xl md:text-2xl leading-tight line-clamp-2">
              {title}
            </h3>
          </div>
        </div>
        <div className="p-5">
          <p className="text-[#888680] text-sm line-clamp-2 mb-4">
            {excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-[#888680] text-xs">
              <span>{formattedDate}</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {readingTime} min read
              </span>
            </div>
            <span className="text-[#d9fb06] text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
              Read More
              <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link 
      to={`/article/${slug}`}
      className="group flex flex-col h-full bg-[#302f2c] rounded-lg overflow-hidden border border-[rgba(63,72,22,0.5)] hover:border-[#3f4816] transition-all duration-300"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3">
          <Badge className="bg-[#d9fb06] text-[#1a1c1b] hover:bg-[rgba(217,251,6,0.8)] text-xs">
            {categoryName}
          </Badge>
        </div>
      </div>
      <div className="flex flex-col flex-grow p-4">
        <h3 className="text-[#d9fb06] font-semibold text-base leading-snug mb-2 line-clamp-2 group-hover:text-[rgba(217,251,6,0.8)] transition-colors">
          {title}
        </h3>
        <p className="text-[#888680] text-sm line-clamp-2 mb-3 flex-grow">
          {excerpt}
        </p>
        <div className="flex items-center justify-between text-xs text-[#888680]">
          <span>{formattedDate}</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {readingTime} min
          </span>
        </div>
      </div>
    </Link>
  );
};

export default ArticleCard;
