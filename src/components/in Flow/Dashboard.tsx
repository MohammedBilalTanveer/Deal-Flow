import { useState } from "react";
import { MessageFeed } from "./MessageFeed";
import { HotDeals } from "./HotDeals";
import { AIInsights } from "./AIInsights";
import { FilterBar } from "./FilterBar";
import { LogoScroll } from "./LogoScroll";
import { DealCard } from "./DealCard";
import { PipelineStages } from "./PipelineStages";
import { QuickActions } from "./QuickActions";
import { UploadDeckPage } from "./UploadDeckPage";
import { CircleSharePage } from "./CircleSharePage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Zap, TrendingUp, Sparkles } from "lucide-react";
import { mockDeals } from "./data/mockDeals";

export function Dashboard() {
  const [selectedSource, setSelectedSource] = useState<string>("all");
  const [selectedSector, setSelectedSector] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("ai-priority");
  const [showUploadDeck, setShowUploadDeck] = useState<boolean>(false);
  const [showCircleShare, setShowCircleShare] = useState<boolean>(false);

  if (showUploadDeck) {
    return <UploadDeckPage onClose={() => setShowUploadDeck(false)} />;
  }

  if (showCircleShare) {
    return <CircleSharePage onClose={() => setShowCircleShare(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Animated background grid */}
      <div className="fixed inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      <div className="relative">
        <LogoScroll />
        
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white border border-indigo-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm mb-1">Unread Messages</p>
                  <p className="text-slate-900 text-3xl">247</p>
                </div>
                <div className="bg-indigo-100 p-3 rounded-xl">
                  <Zap className="text-indigo-600" size={24} />
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-emerald-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm mb-1">Hot Deals</p>
                  <p className="text-slate-900 text-3xl">18</p>
                </div>
                <div className="bg-emerald-100 p-3 rounded-xl">
                  <TrendingUp className="text-emerald-600" size={24} />
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-violet-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-slate-600 text-sm mb-1">AI Confidence</p>
                  <p className="text-slate-900 text-3xl">94%</p>
                </div>
                <div className="bg-violet-100 p-3 rounded-xl">
                  <Sparkles className="text-violet-600" size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Message Feed */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
                <Tabs defaultValue="all" className="w-full">
                  <div className="border-b border-slate-200 bg-slate-50 px-6 pt-4">
                    <TabsList className="bg-white border border-slate-200">
                      <TabsTrigger 
                        value="all"
                        className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
                      >
                        All Messages
                      </TabsTrigger>
                      <TabsTrigger 
                        value="linkedin"
                        className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
                      >
                        LinkedIn
                      </TabsTrigger>
                      <TabsTrigger 
                        value="email"
                        className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
                      >
                        Email
                      </TabsTrigger>
                      <TabsTrigger 
                        value="whatsapp"
                        className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white"
                      >
                        WhatsApp
                      </TabsTrigger>
                    </TabsList>
                  </div>
                  
                  <FilterBar
                    selectedSector={selectedSector}
                    setSelectedSector={setSelectedSector}
                    sortBy={sortBy}
                    setSortBy={setSortBy}
                  />
                  
                  <TabsContent value="all" className="m-0">
                    <MessageFeed source="all" sector={selectedSector} sortBy={sortBy} />
                  </TabsContent>
                  <TabsContent value="linkedin" className="m-0">
                    <MessageFeed source="linkedin" sector={selectedSector} sortBy={sortBy} />
                  </TabsContent>
                  <TabsContent value="email" className="m-0">
                    <MessageFeed source="email" sector={selectedSector} sortBy={sortBy} />
                  </TabsContent>
                  <TabsContent value="whatsapp" className="m-0">
                    <MessageFeed source="whatsapp" sector={selectedSector} sortBy={sortBy} />
                  </TabsContent>
                </Tabs>
              </div>

              {/* Deals with Pitch Decks Section */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="mb-6">
                  <h2 className="text-slate-900 mb-1">Recent Deal Submissions</h2>
                  <p className="text-slate-600 text-sm">Deals with pitch decks ready for review</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockDeals.slice(0, 4).map((deal) => (
                    <DealCard key={deal.id} deal={deal} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Hot Deals & AI Insights */}
            <div className="space-y-6">
              <QuickActions 
                onUploadDeck={() => setShowUploadDeck(true)}
                onCircleShare={() => setShowCircleShare(true)}
              />
              <HotDeals />
              <PipelineStages />
              <AIInsights />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}