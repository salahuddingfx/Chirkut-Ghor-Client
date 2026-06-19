import React from 'react';
import { Link } from 'react-router-dom';
import {
  Code2, Github, Facebook, Globe, Mail, MapPin, ExternalLink, Heart,
  Coffee, Rocket, ArrowLeft, Briefcase, GraduationCap, Zap, Shield,
  Database, Server, Layout, Smartphone, Palette, GitBranch, Cloud
} from 'lucide-react';
import Breadcrumb from '../components/Breadcrumb';
import Seo from '../components/Seo';

const Developer = () => {
  const techStack = [
    { name: 'React', icon: Layout, color: 'bg-cyan-500/10 text-cyan-600 border-cyan-200' },
    { name: 'Next.js', icon: Zap, color: 'bg-slate-500/10 text-slate-700 border-slate-200' },
    { name: 'Vue.js', icon: Layout, color: 'bg-emerald-500/10 text-emerald-600 border-emerald-200' },
    { name: 'Node.js', icon: Server, color: 'bg-green-500/10 text-green-600 border-green-200' },
    { name: 'Express', icon: Server, color: 'bg-gray-500/10 text-gray-600 border-gray-200' },
    { name: 'MongoDB', icon: Database, color: 'bg-green-500/10 text-green-700 border-green-200' },
    { name: 'PostgreSQL', icon: Database, color: 'bg-indigo-500/10 text-indigo-600 border-indigo-200' },
    { name: 'Tailwind CSS', icon: Palette, color: 'bg-sky-500/10 text-sky-600 border-sky-200' },
    { name: 'TypeScript', icon: Code2, color: 'bg-blue-500/10 text-blue-600 border-blue-200' },
    { name: 'Docker', icon: Shield, color: 'bg-blue-500/10 text-blue-500 border-blue-200' },
    { name: 'AWS', icon: Cloud, color: 'bg-amber-500/10 text-amber-600 border-amber-200' },
    { name: 'Firebase', icon: Zap, color: 'bg-orange-500/10 text-orange-600 border-orange-200' },
  ];

  const projects = [
    {
      name: 'Chirkut Ghor',
      description: 'Full-stack e-commerce platform for handmade gifts with real-time inventory, AI chat assistant, payment integration, and admin dashboard.',
      tech: ['React', 'Node.js', 'MongoDB', 'Express', 'Socket.io'],
      url: null,
      highlight: true,
    },
    {
      name: 'Nextora Studio',
      description: 'Digital agency website showcasing services and portfolio for web development, UI/UX design, and brand identity.',
      tech: ['Next.js', 'Tailwind CSS', 'Vercel'],
      url: 'https://nextorastudio.tech',
    },
  ];

  const services = [
    { icon: Layout, title: 'Frontend Development', desc: 'React, Next.js, Vue.js — responsive, performant UIs' },
    { icon: Server, title: 'Backend Development', desc: 'Node.js, Express, REST APIs, GraphQL' },
    { icon: Database, title: 'Database Design', desc: 'MongoDB, PostgreSQL, Firebase' },
    { icon: Smartphone, title: 'Responsive Design', desc: 'Mobile-first, pixel-perfect interfaces' },
    { icon: GitBranch, title: 'Version Control', desc: 'Git, GitHub, CI/CD pipelines' },
    { icon: Shield, title: 'DevOps & Deployment', desc: 'Docker, AWS, Vercel, cloud infrastructure' },
  ];

  return (
    <div className="min-h-screen bg-pink-50 py-8 sm:py-12 md:py-16 px-4">
      <Breadcrumb items={[{ label: 'Developer' }]} />
      <Seo
        title="Developer | Salah Uddin Kader — Full Stack Developer"
        description="Meet Salah Uddin Kader, Full Stack Developer behind Chirkut Ghor. MERN stack specialist, founder of Nextora Studio."
        path="/developer"
      />

      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <Link to="/" className="text-maroon text-sm font-semibold hover:underline inline-flex items-center gap-1.5 mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        {/* Hero Card */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 mb-6">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            <div className="relative shrink-0">
              <img
                src="https://github.com/salahuddingfx.png"
                alt="Salah Uddin Kader"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-gray-100"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextElementSibling.style.display = 'flex';
                }}
              />
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gray-100 items-center justify-center text-4xl font-black hidden">
                SK
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white" />
            </div>

            <div className="text-center sm:text-left">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Salah Uddin Kader</h1>
              <p className="text-gray-500 text-sm sm:text-base mt-1">Full Stack Developer &mdash; MERN Stack</p>
              <div className="flex items-center justify-center sm:justify-start gap-1.5 mt-2 text-gray-400 text-sm">
                <MapPin className="h-4 w-4" />
                <span>Cox's Bazar, Bangladesh</span>
              </div>
              <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-4">
                <a href="https://salahuddin.codes" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 hover:border-maroon text-gray-700 hover:text-maroon rounded-xl text-sm font-medium transition-colors">
                  <Globe className="h-4 w-4" />
                  salahuddin.codes
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
                <a href="https://nextorastudio.tech" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 hover:border-maroon text-gray-700 hover:text-maroon rounded-xl text-sm font-medium transition-colors">
                  <Briefcase className="h-4 w-4" />
                  Nextora Studio
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {[
                { icon: Code2, label: 'Projects', value: '15+' },
                { icon: Coffee, label: 'Experience', value: '1.5+ Yrs' },
                { icon: Heart, label: 'Clients', value: '20+' },
              ].map((item) => (
                <div key={item.label} className="bg-pink-50 rounded-2xl p-4 text-center">
                  <item.icon className="h-5 w-5 text-maroon mx-auto mb-2" />
                  <div className="text-xl font-bold text-gray-900">{item.value}</div>
                  <div className="text-xs text-gray-500">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* About */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-maroon" />
            About
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            Passionate MERN Stack Developer with 1.5+ years of hands-on experience building scalable web applications.
            I specialize in crafting beautiful, responsive interfaces and robust backend systems. From e-commerce platforms
            to SaaS dashboards, I deliver end-to-end solutions that businesses and users love.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            When I'm not coding, I'm running <strong>Nextora Studio</strong> — a digital agency providing web development,
            UI/UX design, and brand identity services to clients worldwide. Available for freelance projects and full-time opportunities.
          </p>
        </div>

        {/* Services */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-maroon" />
            Services
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {services.map((svc) => (
              <div key={svc.title} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50">
                <div className="w-9 h-9 rounded-lg bg-maroon/10 flex items-center justify-center shrink-0">
                  <svc.icon className="h-4.5 w-4.5 text-maroon" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-gray-900">{svc.title}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{svc.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Rocket className="h-5 w-5 text-maroon" />
            Tech Stack
          </h2>
          <div className="flex flex-wrap gap-2">
            {techStack.map(({ name, color }) => (
              <span key={name} className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${color}`}>
                {name}
              </span>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Code2 className="h-5 w-5 text-maroon" />
            Featured Projects
          </h2>
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.name} className={`p-4 rounded-xl border ${project.highlight ? 'border-maroon/20 bg-maroon/5' : 'border-gray-100 bg-gray-50'}`}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900">{project.name}</h3>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {project.tech.map((t) => (
                        <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-white border border-gray-200 text-gray-600 font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  {project.url && (
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="shrink-0 p-2 text-gray-400 hover:text-maroon transition-colors">
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nextora Studio */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden mb-6">
          <div className="p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Nextora Studio</h2>
                <p className="text-gray-500 text-xs">Digital Agency</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              A full-service digital agency specializing in web development, UI/UX design,
              and brand identity. We build digital experiences that transform businesses.
            </p>
            <a
              href="https://nextorastudio.tech"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 border border-gray-200 hover:border-maroon text-gray-700 hover:text-maroon rounded-xl text-sm font-medium transition-colors"
            >
              Visit Website
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { label: 'Web Development', desc: 'Full-stack apps & SPAs' },
                { label: 'UI/UX Design', desc: 'User-centered interfaces' },
                { label: 'Brand Identity', desc: 'Logo, guidelines, assets' },
              ].map(({ label, desc }) => (
                <div key={label} className="text-center p-3 rounded-xl bg-gray-50">
                  <h3 className="text-sm font-semibold text-gray-900">{label}</h3>
                  <p className="text-xs text-gray-500 mt-1">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Social + Contact */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 sm:p-8 mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
            <Mail className="h-5 w-5 text-maroon" />
            Connect
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { icon: Globe, label: 'Portfolio', url: 'https://salahuddin.codes', sub: 'salahuddin.codes' },
              { icon: Briefcase, label: 'Nextora Studio', url: 'https://nextorastudio.tech', sub: 'nextorastudio.tech' },
              { icon: Github, label: 'GitHub', url: 'https://github.com/salahuddingfx', sub: 'salahuddingfx' },
              { icon: Facebook, label: 'Facebook', url: 'https://facebook.com/salahuddingfx', sub: 'salahuddingfx' },
              { icon: Mail, label: 'Email', url: 'mailto:salauddinkaderappy@gmail.com', sub: 'salauddinkaderappy@gmail.com' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.url}
                target={link.url.startsWith('mailto') ? undefined : '_blank'}
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 hover:bg-maroon/5 hover:border-maroon/20 border border-transparent transition-all group"
              >
                <div className="w-9 h-9 rounded-lg bg-maroon/10 flex items-center justify-center shrink-0">
                  <link.icon className="h-4 w-4 text-maroon" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{link.label}</p>
                  <p className="text-xs text-gray-500 truncate">{link.sub}</p>
                </div>
                <ExternalLink className="h-3.5 w-3.5 text-gray-400 group-hover:text-maroon ml-auto shrink-0 transition-colors" />
              </a>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="text-center">
          <a
            href="mailto:salauddinkaderappy@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 bg-maroon text-white font-semibold rounded-xl hover:bg-maroon-dark transition-colors text-sm"
          >
            <Mail className="h-5 w-5" />
            Get In Touch
          </a>
        </div>
      </div>
    </div>
  );
};

export default Developer;
