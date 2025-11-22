import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { 
  TrendingUp, 
  TrendingDown,
  Users,
  Target,
  Mail,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { mockStartups } from '../lib/mockData';

export function OverviewDashboard() {
  const topDeals = mockStartups.slice(0, 5);
  
  const stats = [
    {
      label: 'New Deals Today',
      value: '23',
      change: '+12%',
      trend: 'up',
      icon: Target
    },
    {
      label: 'High Score (>90)',
      value: '8',
      change: '+3',
      trend: 'up',
      icon: Sparkles
    },
    {
      label: 'Meetings Scheduled',
      value: '5',
      change: '+2',
      trend: 'up',
      icon: Users
    },
    {
      label: 'Response Rate',
      value: '68%',
      change: '+5%',
      trend: 'up',
      icon: Mail
    }
  ];

  const recentActivity = [
    {
      type: 'discovery',
      title: 'Quantum Health AI',
      description: 'New high-score startup discovered',
      time: '2h ago',
      score: 94
    },
    {
      type: 'response',
      title: 'SupplyChain.ai replied',
      description: 'Founder interested in meeting next week',
      time: '4h ago'
    },
    {
      type: 'meeting',
      title: 'ClimateCarbon meeting',
      description: 'First call scheduled for tomorrow 2pm',
      time: '6h ago'
    },
    {
      type: 'signal',
      title: 'DevSecure momentum shift',
      description: 'GitHub stars +2K, featured on HN',
      time: '8h ago'
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">Welcome back, John</h1>
          <p className="text-slate-600">Here's what's happening with your deal flow today</p>
        </div>
        <Button className="gap-2">
          <Sparkles className="w-4 h-4" />
          Run AI Discovery
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardDescription>{stat.label}</CardDescription>
                  <Icon className="w-4 h-4 text-slate-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl mb-1">{stat.value}</div>
                <div className={`text-sm flex items-center gap-1 ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {stat.change}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Top Deals Today */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Top 5 Startups Today</CardTitle>
              <CardDescription>Highest scoring deals that match your thesis</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="gap-2">
              View All <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topDeals.map((deal, index) => (
              <div key={deal.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-slate-50 transition-colors">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
                  #{index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="truncate">{deal.name}</h3>
                    <Badge variant="outline" className="text-xs">{deal.sector}</Badge>
                    <Badge variant="outline" className="text-xs">{deal.stage}</Badge>
                  </div>
                  <p className="text-sm text-slate-600 truncate">{deal.tagline}</p>
                </div>
                <div className="flex items-center gap-4 flex-shrink-0">
                  <div className="text-right">
                    <div className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {deal.score}
                    </div>
                    <div className="text-xs text-slate-500">AI Score</div>
                  </div>
                  <Button size="sm" variant="outline">View Details</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest updates across your pipeline</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    activity.type === 'discovery' ? 'bg-blue-100' :
                    activity.type === 'response' ? 'bg-green-100' :
                    activity.type === 'meeting' ? 'bg-purple-100' :
                    'bg-orange-100'
                  }`}>
                    {activity.type === 'discovery' && <Sparkles className="w-4 h-4 text-blue-600" />}
                    {activity.type === 'response' && <Mail className="w-4 h-4 text-green-600" />}
                    {activity.type === 'meeting' && <Users className="w-4 h-4 text-purple-600" />}
                    {activity.type === 'signal' && <TrendingUp className="w-4 h-4 text-orange-600" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-sm">{activity.title}</h4>
                      {activity.score && (
                        <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                          {activity.score}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-slate-600">{activity.description}</p>
                    <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pipeline Status */}
        <Card>
          <CardHeader>
            <CardTitle>Pipeline Overview</CardTitle>
            <CardDescription>Deal progression across stages</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { stage: 'New Discoveries', count: 23, total: 50, color: 'bg-blue-500' },
              { stage: 'Contacted', count: 12, total: 50, color: 'bg-purple-500' },
              { stage: 'Meetings Scheduled', count: 5, total: 50, color: 'bg-green-500' },
              { stage: 'Due Diligence', count: 3, total: 50, color: 'bg-orange-500' },
              { stage: 'Term Sheet', count: 1, total: 50, color: 'bg-pink-500' }
            ].map((item) => (
              <div key={item.stage}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">{item.stage}</span>
                  <span className="text-sm">{item.count} deals</span>
                </div>
                <Progress value={(item.count / item.total) * 100} className={item.color} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
          <CardContent className="p-6">
            <Target className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="mb-2">Update Thesis</h3>
            <p className="text-sm text-slate-600 mb-4">Refine your investment criteria and scoring preferences</p>
            <Button variant="outline" size="sm">Configure</Button>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-6">
            <Mail className="w-8 h-8 text-green-600 mb-3" />
            <h3 className="mb-2">Review Outreach</h3>
            <p className="text-sm text-slate-600 mb-4">3 founders responded to your emails this week</p>
            <Button variant="outline" size="sm">View Responses</Button>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
          <CardContent className="p-6">
            <CheckCircle2 className="w-8 h-8 text-orange-600 mb-3" />
            <h3 className="mb-2">Weekly Report</h3>
            <p className="text-sm text-slate-600 mb-4">Your deal flow summary is ready for review</p>
            <Button variant="outline" size="sm">Download</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
