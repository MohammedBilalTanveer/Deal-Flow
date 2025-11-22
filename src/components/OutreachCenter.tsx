import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Mail,
  Send,
  Sparkles,
  Copy,
  RefreshCw,
  TrendingUp,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { mockStartups } from '../lib/mockData';

export function OutreachCenter() {
  const [selectedStartup, setSelectedStartup] = useState(mockStartups[0].id);
  const [emailContent, setEmailContent] = useState('');

  const startup = mockStartups.find(s => s.id === selectedStartup);

  const generateEmail = () => {
    if (!startup) return;
    
    const template = `Subject: Impressed by ${startup.name}'s growth in ${startup.sector}

Hi ${startup.founders[0].name},

I came across ${startup.name} and was genuinely impressed by your work in ${startup.sector.toLowerCase()}. ${startup.tagline.toLowerCase()} is exactly the kind of innovation we look for.

A few things that stood out:
• ${startup.signals[0]}
• ${startup.signals[1]}
• Your background at ${startup.founders[0].background.split(',')[0]}

At [Your Firm], we focus on ${startup.stage} companies in ${startup.sector.toLowerCase()}, and I'd love to learn more about your vision and growth plans.

Would you have 20 minutes next week for a quick call?

Best regards,
John Doe
Partner, [Your Firm]`;

    setEmailContent(template);
  };

  const outreachStats = [
    { label: 'Emails Sent', value: '47', change: '+12 this week' },
    { label: 'Response Rate', value: '68%', change: '+5% vs last month' },
    { label: 'Meetings Booked', value: '12', change: '3 this week' },
    { label: 'Pending Response', value: '18', change: 'Avg. 2.3 days' }
  ];

  const recentOutreach = [
    {
      startup: 'Quantum Health AI',
      status: 'pending',
      sentDate: '2 hours ago',
      founder: 'Dr. Sarah Chen'
    },
    {
      startup: 'SupplyChain.ai',
      status: 'replied',
      sentDate: '1 day ago',
      founder: 'James Park',
      response: 'Interested in meeting next week'
    },
    {
      startup: 'DevSecure',
      status: 'pending',
      sentDate: '2 days ago',
      founder: 'Alex Kumar'
    },
    {
      startup: 'FinFlow',
      status: 'meeting',
      sentDate: '3 days ago',
      founder: 'David Lee',
      response: 'Meeting scheduled for Friday 2pm'
    }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl mb-2">Outreach Center</h1>
        <p className="text-slate-600">AI-powered personalized outreach to high-score startups</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {outreachStats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <div className="text-3xl mb-1">{stat.value}</div>
              <div className="text-sm text-slate-600 mb-1">{stat.label}</div>
              <div className="text-xs text-green-600">{stat.change}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Email Generator */}
        <Card>
          <CardHeader>
            <CardTitle>Generate Personalized Email</CardTitle>
            <CardDescription>AI creates custom outreach based on startup insights</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm mb-2 block">Select Startup</label>
              <Select value={selectedStartup} onValueChange={setSelectedStartup}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {mockStartups.map((startup) => (
                    <SelectItem key={startup.id} value={startup.id}>
                      {startup.name} - Score: {startup.score}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {startup && (
              <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                <h4 className="text-sm">Quick Facts:</h4>
                <div className="text-sm text-slate-700 space-y-1">
                  <div>• Sector: {startup.sector}</div>
                  <div>• Stage: {startup.stage}</div>
                  <div>• Founder: {startup.founders[0].name} ({startup.founders[0].role})</div>
                  <div>• Key Signal: {startup.signals[0]}</div>
                  <div>• Mutual Connections: {startup.mutualConnections}</div>
                </div>
              </div>
            )}

            <Button className="w-full gap-2" onClick={generateEmail}>
              <Sparkles className="w-4 h-4" />
              Generate AI Email
            </Button>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm">Email Content</label>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={generateEmail}>
                    <RefreshCw className="w-3 h-3" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(emailContent)}>
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <Textarea 
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                placeholder="Click 'Generate AI Email' to create personalized outreach"
                className="min-h-[300px] font-mono text-sm"
              />
            </div>

            <div className="flex gap-2">
              <Button className="flex-1 gap-2">
                <Send className="w-4 h-4" />
                Send via Gmail
              </Button>
              <Button variant="outline" className="flex-1">
                Save Draft
              </Button>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
              <p className="text-sm text-blue-900">
                💡 <span className="font-medium">Pro Tip:</span> Emails mentioning mutual connections have 3x higher response rates
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Recent Outreach */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Outreach</CardTitle>
            <CardDescription>Track responses and follow-ups</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOutreach.map((item, index) => (
                <div key={index} className="border rounded-lg p-4 space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="mb-1">{item.startup}</h4>
                      <p className="text-sm text-slate-600">To: {item.founder}</p>
                    </div>
                    <Badge variant={
                      item.status === 'replied' ? 'default' :
                      item.status === 'meeting' ? 'default' :
                      'secondary'
                    } className={
                      item.status === 'replied' ? 'bg-green-500' :
                      item.status === 'meeting' ? 'bg-blue-500' :
                      ''
                    }>
                      {item.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                      {item.status === 'replied' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                      {item.status === 'meeting' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </Badge>
                  </div>

                  {item.response && (
                    <div className="bg-green-50 border border-green-200 rounded p-2 text-sm">
                      <span className="text-green-700">"{item.response}"</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm text-slate-500">
                    <span>Sent {item.sentDate}</span>
                    <Button variant="ghost" size="sm">View Thread</Button>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full mt-4">
              View All Outreach
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Email Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Email Templates</CardTitle>
          <CardDescription>Pre-built templates optimized for response rate</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                name: 'Initial Outreach',
                description: 'First contact with founders',
                responseRate: '65%'
              },
              {
                name: 'Follow-up',
                description: 'Gentle reminder after 5 days',
                responseRate: '42%'
              },
              {
                name: 'Warm Introduction',
                description: 'Leverage mutual connections',
                responseRate: '78%'
              }
            ].map((template, index) => (
              <Card key={index} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="text-sm">{template.name}</h4>
                    <Badge variant="secondary" className="text-xs bg-green-50 text-green-700">
                      {template.responseRate}
                    </Badge>
                  </div>
                  <p className="text-xs text-slate-600">{template.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
