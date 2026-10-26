import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Award, 
  Users, 
  Heart, 
  Compass, 
  Leaf, 
  Globe, 
  Target, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';

const VALUES = [
  {
    icon: ShieldCheck,
    title: 'Safety Without Compromise',
    description: 'Zero tolerance for substandard gear. Every trek leader holds BMC/AMC mountaineering certifications and wilderness emergency medicine licenses.',
    color: 'text-blue-500 bg-blue-50 dark:bg-blue-950/40',
  },
  {
    icon: Leaf,
    title: 'Leave No Trace Behind',
    description: 'We are committed to eco-tourism. Every expedition adheres strictly to global Leave No Trace principles and supports trail clean-up drives.',
    color: 'text-emerald-500 bg-emerald-50 dark:bg-emerald-950/40',
  },
  {
    icon: Globe,
    title: 'Empowering Local Communities',
    description: 'Over 85% of our guide and logistic fees go directly to indigenous mountain guides, porters, homestays, and local village ecosystems.',
    color: 'text-amber-500 bg-amber-50 dark:bg-amber-950/40',
  },
  {
    icon: Target,
    title: 'Radical Pricing Transparency',
    description: 'No hidden permits, no surprise equipment surcharges at base camps. What you see is what you pay, backed by flexible refund terms.',
    color: 'text-purple-500 bg-purple-50 dark:bg-purple-950/40',
  },
];

const LEADERSHIP = [
  {
    name: 'Vikramaditya Rathore',
    role: 'Founder & Head of Expeditions',
    bio: 'Mountaineer with 14 Himalayan summits including Everest & Kanchenjunga base routes. Former Indian Army Wilderness Instructor.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Dr. Ananya Sen',
    role: 'Chief Medical & Wilderness Officer',
    bio: 'Specialist in High Altitude Cerebral/Pulmonary Edema (HACE/HAPE) management with 12 years in mountain search & rescue.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
  },
  {
    name: 'Kabir Singhania',
    role: 'VP of Technology & Cloud Infrastructure',
    bio: 'Passionate trail runner and ex-Silicon Valley engineer architecting real-time satellite telemetry and booking pipelines.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=400&q=80',
  },
];

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-24">
      {/* Hero Section */}
      <section className="text-center max-w-3xl mx-auto space-y-6">
        <Badge variant="primary">
          Our Purpose & Journey
        </Badge>
        <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
          Pioneering the Next Era of <span className="text-blue-600 dark:text-blue-400">Adventure Tourism</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
          AdventureX was conceived with a straightforward vision: to bring safety, reliability, and modern cloud scalability to the fragmented world of wilderness sports and expeditions.
        </p>
      </section>

      {/* Story & Visual Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <Badge variant="secondary">
            The Genesis
          </Badge>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Born from Campfires and Ridge Summits
          </h2>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            In 2023, after witnessing countless travelers struggle with unverified local guides, opaque pricing, and outdated safety standards in the high Himalayas, a group of avid trekkers and engineers founded AdventureX.
          </p>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            Today, AdventureX operates as a curated marketplace connecting verified local operators, equipment providers, and certified outdoor leaders directly with travelers from across the globe.
          </p>

          <div className="pt-4 grid grid-cols-2 gap-6 border-t border-slate-200 dark:border-slate-800">
            <div>
              <p className="text-3xl font-black text-blue-600 dark:text-blue-400">100%</p>
              <p className="text-xs font-semibold text-slate-500 uppercase mt-1">Audit-Passed Operators</p>
            </div>
            <div>
              <p className="text-3xl font-black text-emerald-600 dark:text-emerald-400">Zero</p>
              <p className="text-xs font-semibold text-slate-500 uppercase mt-1">Fatalities Record</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-800">
            <img
              src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=900&q=80"
              alt="Himalayan mountain team"
              className="w-full h-[420px] object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 hidden sm:flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <p className="text-base font-bold text-slate-900 dark:text-white">Certified Mountaineering</p>
              <p className="text-xs text-slate-500">ISO 21101 Adventure Tourism Standards</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-white dark:bg-slate-900/60 p-8 sm:p-14 rounded-3xl border border-slate-200/80 dark:border-slate-800">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="accent" className="mb-2">What Drives Us</Badge>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Our Core Values</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300 text-sm">The founding pillars that guide every trail, itinerary, and expedition we approve.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {VALUES.map((val) => {
            const Icon = val.icon;
            return (
              <div key={val.title} className="flex gap-4 p-5 rounded-2xl border border-slate-100 dark:border-slate-800/80 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                <div className={`w-12 h-12 rounded-xl shrink-0 flex items-center justify-center ${val.color}`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{val.title}</h3>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{val.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Leadership & Advisory */}
      <section className="space-y-10">
        <div className="text-center max-w-2xl mx-auto">
          <Badge variant="primary" className="mb-2">Wilderness Council</Badge>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">Leadership & Safety Board</h2>
          <p className="mt-2 text-slate-600 dark:text-slate-300 text-sm">Guided by veterans with decades of high-altitude and technical outdoor experience.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {LEADERSHIP.map((member) => (
            <div key={member.name} className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm p-6 text-center space-y-4">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden ring-4 ring-blue-500/20 shadow-md">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{member.name}</h3>
                <p className="text-xs font-semibold text-blue-600 dark:text-blue-400">{member.role}</p>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Box */}
      <section className="rounded-3xl bg-slate-900 text-white p-8 sm:p-14 text-center space-y-6">
        <h2 className="text-3xl font-extrabold text-white">Ready to Explore the Outdoors?</h2>
        <p className="text-slate-200 max-w-xl mx-auto text-sm sm:text-base font-medium">
          Discover hundreds of verified expeditions or reach out to our expedition specialists for custom group departures.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Button variant="primary" icon={ArrowRight} iconPosition="right" onClick={() => navigate('/destinations')}>
            View Destinations
          </Button>
          <Button variant="outlineWhite" onClick={() => navigate('/contact')}>
            Get in Touch
          </Button>
        </div>
      </section>
    </div>
  );
};

export default About;
