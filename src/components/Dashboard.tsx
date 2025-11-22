import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ArrowLeft, 
  Sparkles, 
  Search,
  Filter,
  Bell,
  Settings,
  LogOut
} from 'lucide-react';
import { DiscoveryFeed } from './DiscoveryFeed';
import { DealTracker } from './DealTracker';
import { OutreachCenter } from './OutreachCenter';
import { Intelligence } from './Intelligence';
import { OverviewDashboard } from './OverviewDashboard';
import { ThesisSettings } from './ThesisSettings';
import { Dashboard as InFlowDashboard } from './in Flow/Dashboard'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface DashboardProps {
  onBack: () => void;
  onReconfigure?: () => void;
  onLogout?: () => void;
}

export function Dashboard({ onBack, onReconfigure, onLogout }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Get user data from localStorage
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  const initials = userData.name 
    ? userData.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'JD';

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="px-6 py-3">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack} className="gap-2 h-8">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
              <div className="h-6 w-px bg-slate-200" />
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg">flowFound</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => setSettingsOpen(true)}>
                <Settings className="w-5 h-5" />
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="w-8 h-8 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white text-sm hover:opacity-90 transition-opacity">
                    {initials}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm">{userData.name || 'User'}</p>
                      <p className="text-xs text-muted-foreground">{userData.email || 'user@example.com'}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => setSettingsOpen(true)}>
                    <Settings className="mr-2 size-4" />
                    Fund Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={onLogout} className="text-red-600">
                    <LogOut className="mr-2 size-4" />
                    Log Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6 h-9">
              <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
              <TabsTrigger value="discovery" className="text-xs">
                Discovery
                <Badge className="ml-2 bg-blue-500 text-white text-xs" variant="secondary">23</Badge>
              </TabsTrigger>
              <TabsTrigger value="tracker" className="text-xs">Deal Tracker</TabsTrigger>
              <TabsTrigger value="outreach" className="text-xs">Outreach</TabsTrigger>
              <TabsTrigger value="inflow" className="text-xs">inFlow</TabsTrigger>
              <TabsTrigger value="intelligence" className="text-xs">Intelligence</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </header>

      {/* Main Content */}
      <main className="px-6 py-6">
        <Tabs value={activeTab} className="w-full">
          <TabsContent value="overview" className="mt-0">
            <OverviewDashboard />
          </TabsContent>
          <TabsContent value="discovery" className="mt-0">
            <DiscoveryFeed />
          </TabsContent>
          <TabsContent value="tracker" className="mt-0">
            <DealTracker />
          </TabsContent>
          <TabsContent value="outreach" className="mt-0">
            <OutreachCenter />
          </TabsContent>
          <TabsContent value="inflow" className="mt-0">
            <InFlowDashboard />
          </TabsContent>
          <TabsContent value="intelligence" className="mt-0">
            <Intelligence />
          </TabsContent>
        </Tabs>
      </main>

      {/* Settings Dialog */}
      <ThesisSettings 
        open={settingsOpen} 
        onOpenChange={setSettingsOpen}
        onReconfigure={() => {
          if (onReconfigure) {
            onReconfigure();
          }
        }}
      />
    </div>
  );
}