import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  LayoutGrid,
  List,
  ChevronRight,
  Clock,
  CheckCircle2,
  XCircle,
  Eye
} from 'lucide-react';
import { mockStartups } from '../lib/mockData';

export function DealTracker() {
  const dealsByStage = {
    new: mockStartups.filter(s => s.dealStatus === 'new'),
    contacted: mockStartups.filter(s => s.dealStatus === 'contacted'),
    meeting: mockStartups.filter(s => s.dealStatus === 'meeting'),
    diligence: mockStartups.filter(s => s.dealStatus === 'diligence'),
    passed: mockStartups.filter(s => s.dealStatus === 'passed')
  };

  const stages = [
    { key: 'new', label: 'New', icon: Eye, color: 'bg-blue-500' },
    { key: 'contacted', label: 'Contacted', icon: Clock, color: 'bg-purple-500' },
    { key: 'meeting', label: 'Meeting', icon: CheckCircle2, color: 'bg-green-500' },
    { key: 'diligence', label: 'Due Diligence', icon: LayoutGrid, color: 'bg-orange-500' },
    { key: 'passed', label: 'Passed', icon: XCircle, color: 'bg-gray-400' }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">Deal Tracker</h1>
          <p className="text-slate-600">Manage your entire deal pipeline in one place</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <LayoutGrid className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="icon">
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Pipeline Overview */}
      <div className="grid grid-cols-5 gap-4">
        {stages.map((stage) => {
          const Icon = stage.icon;
          const count = dealsByStage[stage.key as keyof typeof dealsByStage].length;
          return (
            <Card key={stage.key}>
              <CardContent className="p-6">
                <div className={`w-10 h-10 ${stage.color} rounded-lg flex items-center justify-center mb-3`}>
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div className="text-3xl mb-1">{count}</div>
                <div className="text-sm text-slate-600">{stage.label}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-5 gap-4">
        {stages.map((stage) => {
          const deals = dealsByStage[stage.key as keyof typeof dealsByStage];
          return (
            <div key={stage.key} className="space-y-3">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${stage.color}`} />
                <h3 className="text-sm">{stage.label}</h3>
                <Badge variant="secondary" className="ml-auto text-xs">
                  {deals.length}
                </Badge>
              </div>
              <div className="space-y-2">
                {deals.map((deal) => (
                  <Card key={deal.id} className="cursor-pointer hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-sm truncate flex-1">{deal.name}</h4>
                        <Badge className="ml-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs">
                          {deal.score}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-600 mb-3 line-clamp-2">{deal.tagline}</p>
                      <div className="flex items-center gap-1 mb-2">
                        <Badge variant="outline" className="text-xs">{deal.sector}</Badge>
                      </div>
                      <div className="text-xs text-slate-500">{deal.lastUpdated}</div>
                    </CardContent>
                  </Card>
                ))}
                {deals.length === 0 && (
                  <div className="text-center py-8 text-sm text-slate-400">
                    No deals in this stage
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Updates */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                startup: 'Quantum Health AI',
                action: 'Moved to New',
                user: 'AI Discovery',
                time: '2 hours ago',
                type: 'new'
              },
              {
                startup: 'SupplyChain.ai',
                action: 'Moved to Contacted',
                user: 'John Doe',
                time: '5 hours ago',
                type: 'progress'
              },
              {
                startup: 'ClimateCarbon',
                action: 'Meeting scheduled for tomorrow',
                user: 'John Doe',
                time: '6 hours ago',
                type: 'meeting'
              },
              {
                startup: 'FinFlow',
                action: 'Started due diligence',
                user: 'Sarah Chen',
                time: '1 day ago',
                type: 'diligence'
              },
              {
                startup: 'EduTech Pro',
                action: 'Marked as passed',
                user: 'John Doe',
                time: '2 days ago',
                type: 'passed'
              }
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'new' ? 'bg-blue-500' :
                  activity.type === 'progress' ? 'bg-purple-500' :
                  activity.type === 'meeting' ? 'bg-green-500' :
                  activity.type === 'diligence' ? 'bg-orange-500' :
                  'bg-gray-400'
                }`} />
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{activity.startup}</span>
                    {' '}- {activity.action}
                  </p>
                  <p className="text-xs text-slate-500">{activity.user} · {activity.time}</p>
                </div>
                <Button variant="ghost" size="icon">
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
