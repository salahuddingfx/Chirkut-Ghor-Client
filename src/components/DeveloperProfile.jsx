import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Github, Facebook, Globe, Mail, MapPin, Code2, ExternalLink, Heart, Coffee, Rocket } from 'lucide-react';

const DeveloperProfile = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  const techStack = [
    { name: 'React', color: 'bg-cyan-500/10 text-cyan-600 border-cyan-200' },
    { name: 'Next.js', color: 'bg-slate-500/10 text-slate-700 border-slate-200' },
    { name: 'Vue.js', color: 'bg-emerald-500/10 text-emerald-600 border-emerald-200' },
    { name: 'Node.js', color: 'bg-green-500/10 text-green-600 border-green-200' },
    { name: 'Express', color: 'bg-gray-500/10 text-gray-600 border-gray-200' },
    { name: 'MongoDB', color: 'bg-green-500/10 text-green-700 border-green-200' },
    { name: 'Tailwind', color: 'bg-sky-500/10 text-sky-600 border-sky-200' },
    { name: 'TypeScript', color: 'bg-blue-500/10 text-blue-600 border-blue-200' },
    { name: 'PostgreSQL', color: 'bg-indigo-500/10 text-indigo-600 border-indigo-200' },
    { name: 'Docker', color: 'bg-blue-500/10 text-blue-500 border-blue-200' },
    { name: 'AWS', color: 'bg-amber-500/10 text-amber-600 border-amber-200' },
    { name: 'Firebase', color: 'bg-orange-500/10 text-orange-600 border-orange-200' },
  ];

  const socialLinks = [
    { icon: Github, label: 'GitHub', url: 'https://github.com/salahuddingfx', color: 'hover:bg-gray-800' },
    { icon: Facebook, label: 'Facebook', url: 'https://facebook.com/salahuddingfx', color: 'hover:bg-blue-600' },
    { icon: Globe, label: 'Portfolio', url: 'https://salahuddin.codes', color: 'hover:bg-maroon' },
    { icon: Mail, label: 'Email', url: 'mailto:salauddinkaderappy@gmail.com', color: 'hover:bg-red-500' },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-gradient-to-br from-maroon via-pink-600 to-rose-500 p-6 sm:p-8 text-white flex-shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-5">
            <div className="relative shrink-0">
              <img
                src="https://github.com/salahuddingfx.png"
                alt="Salah Uddin Kader"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-3 border-white/30 shadow-xl"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-white/20 items-center justify-center text-3xl sm:text-4xl font-black hidden">
                SK
              </div>
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-3 border-white" />
            </div>

            <div className="min-w-0">
              <h2 className="text-xl sm:text-2xl font-bold leading-tight">Salah Uddin Kader</h2>
              <p className="text-white/80 text-sm mt-1">Full Stack Developer</p>
              <div className="flex items-center gap-1.5 mt-2 text-white/70 text-xs">
                <MapPin className="h-3.5 w-3.5" />
                <span>Cox's Bazar, Bangladesh</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-5">
          {/* About */}
          <div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Passionate MERN Stack Developer with 1.5+ years building scalable web apps.
              I craft beautiful interfaces and robust backends. Available for freelance & full-time.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: Code2, label: 'Projects', value: '15+' },
              { icon: Coffee, label: 'Experience', value: '1.5 Yrs' },
              { icon: Heart, label: 'Clients', value: '20+' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="bg-pink-50 rounded-2xl p-3 text-center">
                <Icon className="h-5 w-5 text-maroon mx-auto mb-1" />
                <div className="text-lg font-bold text-maroon">{value}</div>
                <div className="text-xs text-slate-500">{label}</div>
              </div>
            ))}
          </div>

          {/* Tech Stack */}
          <div>
            <h3 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
              <Rocket className="h-4 w-4 text-maroon" />
              Tech Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {techStack.map(({ name, color }) => (
                <span
                  key={name}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${color}`}
                >
                  {name}
                </span>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div className="grid grid-cols-2 gap-2">
            {socialLinks.map(({ icon: Icon, label, url, color }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 p-3 rounded-xl bg-slate-50 text-slate-700 ${color} hover:text-white transition-all duration-200 group`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                <span className="text-sm font-medium">{label}</span>
                <ExternalLink className="h-3.5 w-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="flex-shrink-0 p-5 sm:p-7 pt-0 space-y-3">
          <Link
            to="/developer"
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full py-3 border border-gray-200 text-gray-700 font-semibold rounded-2xl hover:bg-gray-50 transition-colors text-sm"
          >
            View Full Profile
            <ExternalLink className="h-4 w-4" />
          </Link>
          <a
            href="mailto:salauddinkaderappy@gmail.com"
            className="flex items-center justify-center gap-2 w-full py-3.5 bg-maroon hover:bg-maroon-dark text-white font-bold rounded-2xl transition-colors text-sm"
          >
            <Mail className="h-5 w-5" />
            Get In Touch
          </a>
        </div>
      </div>
    </div>
  );
};

export default DeveloperProfile;
