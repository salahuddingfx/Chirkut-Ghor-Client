import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumb = ({ items }) => {
  return (
    <nav className="max-w-7xl mx-auto px-4 pt-4 pb-2 flex items-center gap-1.5 text-sm text-gray-500 flex-wrap">
      <Link to="/" className="hover:text-maroon transition-colors flex items-center gap-1">
        <Home className="h-3.5 w-3.5" />
        Home
      </Link>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="h-3 w-3 text-gray-300 shrink-0" />
          {item.to ? (
            <Link to={item.to} className="hover:text-maroon transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-900 font-medium">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
