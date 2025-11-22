import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { 
  TrendingUp, 
  Target, 
  Zap, 
  Database, 
  Brain, 
  Mail, 
  BarChart3, 
  Network,
  Search,
  Sparkles,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

interface LandingPageProps {
  onEnterDashboard: () => void;
}

export function LandingPage({ onEnterDashboard }: LandingPageProps) {
  const features = [
    {
      icon: Search,
      title: 'Smart Discovery',
      description: 'AI-powered crawling of Crunchbase, AngelList, YC, LinkedIn, ProductHunt, GitHub, and Twitter/X to find high-potential startups.',
      pain: 'Solves: Discovery inefficiency'
    },
    {
      icon: Brain,
      title: 'AI Deal Scoring Engine',
      description: 'ML-powered evaluation of founding teams, traction, market potential, and investor fit with explainable scoring.',
      pain: 'Solves: Evaluation bottleneck & Noise vs. quality'
    },
    {
      icon: Mail,
      title: 'Automated Outreach',
      description: 'Generate personalized emails to high-score startups with Gmail, Outlook, and HubSpot integration.',
      pain: 'Solves: Time inefficiency'
    },
    {
      icon: BarChart3,
      title: 'Deal Tracking Dashboard',
      description: 'Unified view of all deals with filters by stage, score, sector, and daily top-5 startup alerts.',
      pain: 'Solves: Fragmented data'
    },
    {
      icon: TrendingUp,
      title: 'Continuous Monitoring',
      description: 'Track momentum shifts, funding rounds, team changes, and growth signals in real-time.',
      pain: 'Solves: Missed signals'
    },
    {
      icon: Network,
      title: 'Network Intelligence',
      description: 'Visualize mutual connections, portfolio synergies, and predict next unicorn probability.',
      pain: 'Solves: Network leverage gaps'
    }
  ];

  const painPoints = [
    'Too many startup leads, very few worth investing in',
    'Finding early, high-potential startups before everyone else',
    'Analysts spend hours reviewing decks and founders',
    'Info spread across Crunchbase, LinkedIn, Pitchbook, internal CRMs',
    'No continuous tracking of emerging startups or momentum shifts'
  ];

  const capabilities = [
    { label: 'Startups Tracked', value: '50K+' },
    { label: 'Data Sources', value: '15+' },
    { label: 'AI Accuracy', value: '94%' },
    { label: 'Time Saved', value: '20hrs/week' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl">flowFound</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-slate-600 hover:text-slate-900 transition">Features</a>
            <a href="#how-it-works" className="text-slate-600 hover:text-slate-900 transition">How it Works</a>
            <a href="#pricing" className="text-slate-600 hover:text-slate-900 transition">Pricing</a>
            <Button variant="outline" size="sm">Sign In</Button>
            <Button size="sm" onClick={onEnterDashboard}>View Demo</Button>
          </nav>
          <Button className="md:hidden" onClick={onEnterDashboard}>Demo</Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Badge className="bg-blue-50 text-blue-700 border-blue-200">
            AI-Powered Deal Flow Intelligence
          </Badge>
          <h1 className="text-5xl lg:text-7xl tracking-tight">
            Find the next <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">unicorn</span> before everyone else
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            An AI-driven platform that identifies, scores, and tracks the most investable startups aligned with your thesis. Stop drowning in noise. Start investing in winners.
          </p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Button size="lg" onClick={onEnterDashboard} className="gap-2">
              Explore Dashboard <ArrowRight className="w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline">Book a Demo</Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12">
            {capabilities.map((stat) => (
              <div key={stat.label} className="space-y-1">
                <div className="text-3xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl text-center mb-4">The Problem with Traditional Deal Flow</h2>
            <p className="text-slate-400 text-center mb-12">VCs face critical challenges in today's fast-moving startup ecosystem</p>
            <div className="grid md:grid-cols-2 gap-4">
              {painPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                  <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                  </div>
                  <p className="text-slate-300">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl mb-4">Intelligent Deal Flow, Powered by AI</h2>
            <p className="text-xl text-slate-600">
              Every feature designed to solve your biggest pain points
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card key={feature.title} className="border-2 hover:border-blue-200 transition-colors">
                  <CardHeader>
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                    <CardDescription className="text-sm">
                      <Badge variant="outline" className="text-xs mb-3 mt-1 border-green-200 text-green-700 bg-green-50">
                        {feature.pain}
                      </Badge>
                      <p>{feature.description}</p>
                    </CardDescription>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-gradient-to-br from-blue-50 to-purple-50 py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl text-center mb-16">How flowFound Works</h2>
            <div className="space-y-8">
              {[
                {
                  step: '01',
                  title: 'Connect Your Thesis',
                  description: 'Define your investment criteria: sectors, stages, geography, and thesis keywords.',
                  icon: Target
                },
                {
                  step: '02',
                  title: 'AI Discovers & Scores',
                  description: 'Our engine crawls 15+ sources, extracts data with LLMs, and scores startups on team, traction, and fit.',
                  icon: Brain
                },
                {
                  step: '03',
                  title: 'Review Top Deals',
                  description: 'Get daily alerts with top 5 startups. Review AI-generated summaries and scoring explanations.',
                  icon: TrendingUp
                },
                {
                  step: '04',
                  title: 'Automate Outreach',
                  description: 'Send personalized emails to founders with one click. Track responses and schedule meetings.',
                  icon: Zap
                }
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.step} className="flex gap-6 items-start">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center">
                        <Icon className="w-8 h-8 text-blue-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-blue-600 mb-1">STEP {item.step}</div>
                      <h3 className="text-2xl mb-2">{item.title}</h3>
                      <p className="text-slate-600">{item.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-blue-600 to-purple-600 border-0 text-white">
            <CardContent className="p-12 text-center space-y-6">
              <h2 className="text-4xl">Ready to transform your deal flow?</h2>
              <p className="text-xl text-blue-100">
                Join leading VCs who are finding better deals, faster.
              </p>
              <div className="flex items-center justify-center gap-4 flex-wrap pt-4">
                <Button size="lg" variant="secondary" onClick={onEnterDashboard} className="gap-2">
                  Explore Dashboard <ArrowRight className="w-4 h-4" />
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                  Schedule Demo
                </Button>
              </div>
              <div className="flex items-center justify-center gap-6 pt-6 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>14-day free trial</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-slate-50 py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl">flowFound</span>
            </div>
            <p className="text-sm text-slate-600">
              © 2025 flowFound. AI-Powered VC Deal Flow Intelligence.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}