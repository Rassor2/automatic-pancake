import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap, TrendingUp, DollarSign, Award, RefreshCw, Lightbulb } from 'lucide-react';

const iconMap = {
  GraduationCap,
  TrendingUp,
  DollarSign,
  Award,
  RefreshCw,
  Lightbulb
};

const CategoryCard = ({ category }) => {
  const { slug, name, description, icon, articleCount } = category;
  const IconComponent = iconMap[icon] || GraduationCap;

  return (
    <Link 
      to={`/category/${slug}`}
      className="group block bg-[#302f2c] rounded-lg p-5 border border-[rgba(63,72,22,0.5)] hover:border-[#3f4816] hover:bg-[#3f4816] transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-lg bg-[#1a1c1b] flex items-center justify-center">
          <IconComponent className="w-5 h-5 text-[#d9fb06]" />
        </div>
        <ArrowRight className="w-5 h-5 text-[#888680] group-hover:text-[#d9fb06] group-hover:translate-x-1 transition-all" />
      </div>
      <h3 className="text-[#d9fb06] font-semibold text-base mb-2">
        {name}
      </h3>
      <p className="text-[#888680] text-sm line-clamp-2 mb-3">
        {description}
      </p>
      <span className="text-[#888680] text-xs">
        {articleCount} articles
      </span>
    </Link>
  );
};

export default CategoryCard;
