import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { ScrollArea } from './ui/scroll-area';
import { 
  Sparkles, 
  Send, 
  TrendingUp, 
  TrendingDown,
  AlertTriangle,
  Target,
  Users,
  Lightbulb,
  BarChart3,
  Network,
  Zap,
  Award,
  Brain
} from 'lucide-react';
import { mockStartups } from '../lib/mockData';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  data?: any;
  timestamp: Date;
}

interface PredictionCard {
  type: 'fundraising' | 'success' | 'risk' | 'competition' | 'market' | 'outlier';
  title: string;
  items: any[];
}

export function Intelligence() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: "👋 Hey! I'm your AI Deal Intelligence assistant. I can help you discover patterns, predict outcomes, and answer complex questions about your deal flow. Try asking me something like:\n\n• \"Show me companies raising in AI infra next quarter\"\n• \"Explain why this founder is exceptional\"\n• \"What's our conviction history on fintech deals?\"\n• \"Which startups are likely to succeed?\"",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const parseQuery = (query: string): { intent: string; entities: any } => {
    const lowerQuery = query.toLowerCase();
    
    // Intent detection
    if (lowerQuery.includes('raising') || lowerQuery.includes('fundraising')) {
      return { intent: 'fundraising_prediction', entities: { sector: lowerQuery.match(/(ai|fintech|healthtech|saas|climate)/i)?.[0] } };
    }
    if (lowerQuery.includes('founder') && (lowerQuery.includes('exceptional') || lowerQuery.includes('why'))) {
      return { intent: 'founder_analysis', entities: {} };
    }
    if (lowerQuery.includes('conviction') || lowerQuery.includes('history')) {
      return { intent: 'conviction_history', entities: { sector: lowerQuery.match(/(fintech|healthtech|saas|ai|climate)/i)?.[0] } };
    }
    if (lowerQuery.includes('network') || lowerQuery.includes('knows')) {
      return { intent: 'network_analysis', entities: {} };
    }
    if (lowerQuery.includes('probability') || lowerQuery.includes('series a')) {
      return { intent: 'series_a_probability', entities: {} };
    }
    if (lowerQuery.includes('likely to succeed') || lowerQuery.includes('winners')) {
      return { intent: 'success_prediction', entities: {} };
    }
    if (lowerQuery.includes('risk') || lowerQuery.includes('failure')) {
      return { intent: 'risk_prediction', entities: {} };
    }
    if (lowerQuery.includes('competitive') || lowerQuery.includes('hot')) {
      return { intent: 'competition_prediction', entities: {} };
    }
    if (lowerQuery.includes('market') && lowerQuery.includes('expanding')) {
      return { intent: 'market_expansion', entities: {} };
    }
    if (lowerQuery.includes('outlier') || lowerQuery.includes('unusual')) {
      return { intent: 'outlier_detection', entities: {} };
    }
    
    return { intent: 'general', entities: {} };
  };

  const generateResponse = (intent: string, entities: any): { text: string; data?: any } => {
    switch (intent) {
      case 'fundraising_prediction':
        const sector = entities.sector || 'AI';
        const fundraisingCompanies = mockStartups
          .filter(s => !entities.sector || s.sector.toLowerCase().includes(sector.toLowerCase()))
          .slice(0, 4)
          .map(s => ({
            ...s,
            fundraisingProb: Math.floor(Math.random() * 30) + 60,
            expectedRound: s.stage === 'Seed' ? 'Series A' : 'Series B',
            timeframe: 'Q1 2025'
          }));
        
        return {
          text: `Based on growth patterns, burn rate signals, and founder activity, I've identified ${fundraisingCompanies.length} ${sector} companies likely to raise in the next quarter:`,
          data: { type: 'fundraising', companies: fundraisingCompanies }
        };

      case 'founder_analysis':
        const topFounder = mockStartups[0].founders[0];
        return {
          text: `Let me break down what makes ${topFounder.name} exceptional:\n\n🎓 **Elite Background**: ${topFounder.background}\n\n🚀 **Pattern Recognition**: Founders with 2+ exits have a 4.2x higher success rate. ${topFounder.name}'s track record puts them in the top 5% of founders we track.\n\n📈 **Execution Velocity**: Their current startup achieved product-market fit 60% faster than the average Series A company.\n\n🧲 **Talent Magnet**: They've attracted 5 senior hires from FAANG companies in the last quarter, indicating strong founder reputation.\n\n💡 **Domain Expertise**: Deep technical knowledge combined with industry experience - a rare combination that predicts success.`,
          data: { type: 'founder', founder: topFounder }
        };

      case 'conviction_history':
        const targetSector = entities.sector || 'fintech';
        return {
          text: `Here's our conviction history on ${targetSector}:\n\n✅ **Strong Conviction (8-10)**: 4 deals, 75% follow-on rate\n🟡 **Medium Conviction (5-7)**: 6 deals, 33% follow-on rate\n❌ **Low Conviction (<5)**: 2 deals, 0% passed\n\n📊 **Pattern Analysis**:\n• We tend to score ${targetSector} founders with 2+ years domain experience 40% higher\n• Companies with enterprise customers in this sector outperform by 2.3x\n• Our average time-to-decision on ${targetSector} deals: 18 days`,
          data: { type: 'conviction', sector: targetSector }
        };

      case 'network_analysis':
        return {
          text: `Let me map out the network connections:\n\n🔗 **Direct Connections**: 23 portfolio founders know these startup founders\n🤝 **Mutual Investors**: 5 co-investors in similar deals\n🎯 **Advisor Overlap**: 8 shared advisors with our portfolio\n\n**Key Insights**:\n• Sarah Chen (Quantum Health AI) worked with 3 of your portfolio CTOs at Google\n• Michael Roberts published papers with your portfolio founder at DeepMind\n• Strong referral potential from existing network`,
          data: { type: 'network', connections: mockStartups.slice(0, 5) }
        };

      case 'series_a_probability':
        const seriesACompanies = mockStartups.slice(0, 5).map(s => ({
          ...s,
          seriesAProb: Math.floor(Math.random() * 30) + 60,
          keyFactors: ['Revenue growth', 'Team quality', 'Market timing']
        }));
        return {
          text: `Based on 500+ historical Series A patterns, here are the probability predictions:`,
          data: { type: 'series_a', companies: seriesACompanies }
        };

      case 'success_prediction':
        const successCompanies = mockStartups
          .map(s => ({
            ...s,
            successScore: Math.floor(Math.random() * 20) + 75,
            factors: [
              { name: 'Founder Quality', score: Math.floor(Math.random() * 20) + 80 },
              { name: 'Market Timing', score: Math.floor(Math.random() * 20) + 80 },
              { name: 'Execution Velocity', score: Math.floor(Math.random() * 20) + 80 },
              { name: 'Network Effects', score: Math.floor(Math.random() * 20) + 70 }
            ]
          }))
          .sort((a, b) => b.successScore - a.successScore)
          .slice(0, 5);
        
        return {
          text: `Based on my Superhuman Pattern Recognition across 10,000+ startups, here are the founders most likely to succeed:`,
          data: { type: 'success', companies: successCompanies }
        };

      case 'risk_prediction':
        const riskCompanies = mockStartups.slice(0, 4).map(s => ({
          ...s,
          riskScore: Math.floor(Math.random() * 40) + 20,
          riskFactors: ['High burn rate', 'Competitive market', 'Team turnover'].slice(0, Math.floor(Math.random() * 2) + 1)
        }));
        return {
          text: `⚠️ Risk assessment based on 50+ failure signals:`,
          data: { type: 'risk', companies: riskCompanies }
        };

      case 'competition_prediction':
        return {
          text: `🔥 **Competitive Round Intelligence**:\n\nBased on founder LinkedIn activity, hiring velocity, and investor meeting patterns, these rounds will likely be highly competitive:\n\n• Quantum Health AI - 8+ VCs in process, likely oversubscribed\n• SupplyChain.ai - Tier 1 VCs showing strong interest\n• DevSecure - YC demo day hype building\n\n**Recommendation**: Move quickly on high-conviction deals. Average time from first contact to term sheet in competitive rounds: 12 days.`,
          data: { type: 'competition' }
        };

      case 'market_expansion':
        return {
          text: `📈 **Market Expansion Signals**:\n\n🚀 **Rapidly Expanding**:\n• AI Infrastructure - 340% growth in deal flow\n• Climate Tech - 220% increase in funding\n• HealthTech AI - 180% growth trajectory\n\n📊 **Leading Indicators**:\n• Google search trends up 400% for AI infra\n• Enterprise adoption rate accelerating\n• Regulatory tailwinds in climate sector\n\n💡 **Recommendation**: Increase allocation to AI infrastructure and climate tech by 25% based on market momentum.`,
          data: { type: 'market_expansion' }
        };

      case 'outlier_detection':
        const outliers = [
          {
            company: mockStartups[0],
            outlierType: 'Exceptional Team Velocity',
            insight: 'Hired 15 engineers in 60 days - 5x faster than average. Signal: Strong product-market fit or major funding event incoming.',
            confidence: 94
          },
          {
            company: mockStartups[1],
            outlierType: 'Unusual Revenue Growth',
            insight: 'Revenue grew 340% YoY while maintaining 90%+ gross margins. This pattern historically predicts unicorn status.',
            confidence: 89
          },
          {
            company: mockStartups[2],
            outlierType: 'Stealth Expansion',
            insight: 'Opened 3 international offices in 90 days. Pattern suggests undisclosed funding or acquisition preparation.',
            confidence: 82
          }
        ];
        return {
          text: `🎯 **Outlier Detection** - Superhuman Pattern Recognition:\n\nI've identified unusual patterns that deviate 3+ standard deviations from normal startup behavior:`,
          data: { type: 'outliers', items: outliers }
        };

      default:
        return {
          text: `I can help you with:\n\n🔮 **Predictions**: Fundraising, success rates, risks, market trends\n🧠 **Analysis**: Founder quality, network connections, conviction history\n⚡ **Alerts**: Outlier detection, competitive rounds, market expansion\n\nWhat would you like to know?`
        };
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI processing
    setTimeout(() => {
      const { intent, entities } = parseQuery(input);
      const response = generateResponse(intent, entities);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: response.text,
        data: response.data,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const renderMessageData = (data: any) => {
    if (!data) return null;

    switch (data.type) {
      case 'fundraising':
        return (
          <div className="space-y-3 mt-3">
            {data.companies.map((company: any) => (
              <Card key={company.id} className="bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white flex-shrink-0">
                      {company.name.substring(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-sm truncate">{company.name}</h4>
                        <Badge variant="outline" className="text-xs">{company.sector}</Badge>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <div className="flex items-center justify-between text-xs mb-1">
                            <span className="text-slate-600">Fundraising Probability</span>
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                              {company.fundraisingProb}%
                            </span>
                          </div>
                          <Progress value={company.fundraisingProb} className="h-2" />
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <div className="text-slate-600">Expected Round</div>
                            <div>{company.expectedRound}</div>
                          </div>
                          <div>
                            <div className="text-slate-600">Timeframe</div>
                            <div className="text-orange-600">{company.timeframe}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case 'success':
        return (
          <div className="space-y-3 mt-3">
            {data.companies.map((company: any, idx: number) => (
              <Card key={company.id} className="bg-white border-slate-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : '🏆'}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-sm">{company.name}</h4>
                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs">
                          {company.successScore}% Success Score
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {company.factors.map((factor: any, i: number) => (
                          <div key={i} className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-slate-600">{factor.name}</span>
                              <span className="text-xs">{factor.score}</span>
                            </div>
                            <Progress value={factor.score} className="h-1" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case 'risk':
        return (
          <div className="space-y-3 mt-3">
            {data.companies.map((company: any) => (
              <Card key={company.id} className="bg-gradient-to-br from-red-50 to-orange-50 border-red-200">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-sm">{company.name}</h4>
                        <Badge variant="destructive" className="text-xs">
                          {company.riskScore}% Risk Score
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {company.riskFactors.map((factor: string, i: number) => (
                          <Badge key={i} variant="outline" className="text-xs text-red-700 border-red-300">
                            {factor}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case 'series_a':
        return (
          <div className="space-y-3 mt-3">
            {data.companies.map((company: any) => (
              <Card key={company.id} className="bg-white border-slate-200">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-sm">{company.name}</h4>
                        <Badge variant="outline" className="text-xs">{company.stage}</Badge>
                      </div>
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-slate-600">Series A Probability</span>
                          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {company.seriesAProb}%
                          </span>
                        </div>
                        <Progress value={company.seriesAProb} className="h-2" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      case 'outliers':
        return (
          <div className="space-y-3 mt-3">
            {data.items.map((item: any, idx: number) => (
              <Card key={idx} className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-300">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="text-sm">{item.company.name}</h4>
                        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs">
                          {item.outlierType}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-700 mb-2">{item.insight}</p>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-slate-600">Confidence:</span>
                        <Progress value={item.confidence} className="h-1.5 flex-1 max-w-[100px]" />
                        <span className="text-yellow-700">{item.confidence}%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  const suggestedQueries = [
    { icon: TrendingUp, text: "Show me companies raising in AI infra next quarter", color: "blue" },
    { icon: Award, text: "Which founders are likely to succeed?", color: "green" },
    { icon: AlertTriangle, text: "Which startups are at risk?", color: "red" },
    { icon: Target, text: "What's our conviction history on fintech deals?", color: "purple" },
    { icon: Network, text: "Who in our network knows these founders?", color: "pink" },
    { icon: Lightbulb, text: "Detect outliers in our deal flow", color: "yellow" }
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl">AI Pulse</h1>
          </div>
          <p className="text-slate-600">Natural language deal intelligence powered by superhuman pattern recognition</p>
        </div>
        
        <div className="flex gap-2">
          <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
            <Zap className="w-3 h-3 mr-1" />
            Live Predictions
          </Badge>
          <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <Brain className="w-3 h-3 mr-1" />
            Pattern Recognition
          </Badge>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chat */}
        <Card className="lg:col-span-2">
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              Conversational Intelligence
            </CardTitle>
            <CardDescription>Ask me anything about your deal flow</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[600px] p-6" ref={scrollRef}>
              <div className="space-y-4">
                {messages.map((message) => (
                  <div 
                    key={message.id} 
                    className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`max-w-[85%] ${message.type === 'user' ? 'order-2' : ''}`}>
                      <div className={`rounded-lg p-4 ${
                        message.type === 'user' 
                          ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white ml-auto' 
                          : 'bg-slate-100 text-slate-900'
                      }`}>
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      </div>
                      {renderMessageData(message.data)}
                      <p className="text-xs text-slate-500 mt-1 px-2">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-slate-100 rounded-lg p-4">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            
            {/* Input */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input 
                  placeholder="Ask me anything about your deals..." 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  className="flex-1"
                />
                <Button onClick={handleSend} className="bg-gradient-to-r from-blue-600 to-purple-600">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Suggested Queries & Quick Actions */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Suggested Queries</CardTitle>
              <CardDescription>Click to try</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {suggestedQueries.map((query, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-3 px-3"
                  onClick={() => setInput(query.text)}
                >
                  <query.icon className={`w-4 h-4 mr-2 flex-shrink-0 text-${query.color}-600`} />
                  <span className="text-sm">{query.text}</span>
                </Button>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Prediction Models</CardTitle>
              <CardDescription>Active AI engines</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { name: 'Fundraising Predictor', status: 'Live', accuracy: 89 },
                { name: 'Success Likelihood', status: 'Live', accuracy: 84 },
                { name: 'Risk Assessment', status: 'Live', accuracy: 91 },
                { name: 'Market Expansion', status: 'Live', accuracy: 87 },
                { name: 'Outlier Detection', status: 'Live', accuracy: 93 }
              ].map((model, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                  <div className="flex-1">
                    <div className="text-xs mb-1">{model.name}</div>
                    <div className="flex items-center gap-2">
                      <Progress value={model.accuracy} className="h-1 flex-1" />
                      <span className="text-xs text-slate-600">{model.accuracy}%</span>
                    </div>
                  </div>
                  <Badge variant="outline" className="ml-2 text-xs">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1" />
                    {model.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-purple-600" />
                Pattern Recognition
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0">
                  AI
                </div>
                <p className="text-xs text-slate-700">
                  Analyzing 10,000+ startup patterns across 50+ signals to identify success predictors
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
