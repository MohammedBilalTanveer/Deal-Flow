import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Search, 
  Filter,
  TrendingUp,
  MapPin,
  Users,
  DollarSign,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { mockStartups, Startup } from '../lib/mockData';
import { DealDetailDialog } from './DealDetailDialog';

export function DiscoveryFeed() {
  const [selectedDeal, setSelectedDeal] = useState<Startup | null>(null);
  const [filterSector, setFilterSector] = useState('all');
  const [filterStage, setFilterStage] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredStartups = mockStartups.filter(startup => {
    const matchesSector = filterSector === 'all' || startup.sector === filterSector;
    const matchesStage = filterStage === 'all' || startup.stage === filterStage;
    const matchesSearch = searchQuery === '' || 
      startup.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      startup.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesSector && matchesStage && matchesSearch;
  });

  const sectors = Array.from(new Set(mockStartups.map(s => s.sector)));
  const stages = Array.from(new Set(mockStartups.map(s => s.stage)));

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">Smart Discovery</h1>
          <p className="text-slate-600">AI-curated startups matching your investment thesis</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-sm">
            Last updated: 2 hours ago
          </Badge>
          <Button className="gap-2">
            <Sparkles className="w-4 h-4" />
            Refresh Feed
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Search startups by name or keyword..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filterSector} onValueChange={setFilterSector}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Sector" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sectors</SelectItem>
                {sectors.map(sector => (
                  <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterStage} onValueChange={setFilterStage}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stages</SelectItem>
                {stages.map(stage => (
                  <SelectItem key={stage} value={stage}>{stage}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-slate-600">
          Showing {filteredStartups.length} startups
        </p>
        <Select defaultValue="score-high">
          <SelectTrigger className="w-[200px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="score-high">Highest Score</SelectItem>
            <SelectItem value="score-low">Lowest Score</SelectItem>
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="traction">Best Traction</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Startup Cards */}
      <div className="grid gap-4">
        {filteredStartups.map((startup) => (
          <Card key={startup.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex gap-6">
                {/* Score Badge */}
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex flex-col items-center justify-center text-white">
                    <div className="text-3xl">{startup.score}</div>
                    <div className="text-xs opacity-80">Score</div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl">{startup.name}</h3>
                        <Badge variant="outline">{startup.sector}</Badge>
                        <Badge variant="outline">{startup.stage}</Badge>
                        {startup.unicornProbability && startup.unicornProbability > 70 && (
                          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                            🦄 {startup.unicornProbability}% Unicorn Potential
                          </Badge>
                        )}
                      </div>
                      <p className="text-slate-600 mb-3">{startup.tagline}</p>
                      <div className="flex items-center gap-4 text-sm text-slate-500">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {startup.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {startup.founders.length} founder{startup.founders.length > 1 ? 's' : ''}
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          {startup.metrics.revenue}
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-4 h-4" />
                          {startup.metrics.growth}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Score Breakdown */}
                  <div className="grid grid-cols-4 gap-3 mb-4">
                    <div className="bg-slate-50 rounded-lg p-2 text-center">
                      <div className="text-sm text-slate-600 mb-1">Team</div>
                      <div className="text-lg">{startup.scoreBreakdown.team}</div>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-2 text-center">
                      <div className="text-sm text-slate-600 mb-1">Traction</div>
                      <div className="text-lg">{startup.scoreBreakdown.traction}</div>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-2 text-center">
                      <div className="text-sm text-slate-600 mb-1">Market</div>
                      <div className="text-lg">{startup.scoreBreakdown.market}</div>
                    </div>
                    <div className="bg-slate-50 rounded-lg p-2 text-center">
                      <div className="text-sm text-slate-600 mb-1">Fit</div>
                      <div className="text-lg">{startup.scoreBreakdown.fit}</div>
                    </div>
                  </div>

                  {/* Signals */}
                  <div className="mb-4">
                    <div className="text-sm text-slate-600 mb-2">Key Signals:</div>
                    <div className="flex flex-wrap gap-2">
                      {startup.signals.map((signal, index) => (
                        <Badge key={index} variant="secondary" className="bg-green-50 text-green-700 border-green-200">
                          {signal}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Investor Fit */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                    <div className="text-sm">
                      <span className="text-blue-700">💡 Investor Fit: </span>
                      <span className="text-slate-700">{startup.investorFit}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <Button onClick={() => setSelectedDeal(startup)}>
                      View Full Analysis
                    </Button>
                    <Button variant="outline">Generate Outreach Email</Button>
                    <Button variant="ghost" size="icon">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Deal Detail Dialog */}
      {selectedDeal && (
        <DealDetailDialog 
          startup={selectedDeal} 
          open={!!selectedDeal}
          onOpenChange={(open) => !open && setSelectedDeal(null)}
        />
      )}
    </div>
  );
}
