import { useState, useRef, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { ScrollArea } from "./ui/scroll-area";
import {
  Sparkles,
  Send,
  TrendingUp,
  AlertTriangle,
  Target,
  Network,
  Lightbulb,
  Zap,
  Award,
  Brain,
} from "lucide-react";
import { mockStartups } from "../lib/mockData";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  data?: any;
  timestamp: Date;
}

export function Intelligence() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "👋 Hey! I'm your AI Deal Intelligence assistant.\nTry asking me something like:\n• \"Show me companies raising in AI infra next quarter\"\n• \"Which startups are likely to succeed?\"",
      timestamp: new Date(),
    },
  ]);

  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // ❌ FIX: ScrollArea cannot accept ref → using wrapper div
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // --- INTENT PARSER ---
  const parseQuery = (query: string) => {
    const lower = query.toLowerCase();

    if (lower.includes("raising")) return { intent: "fundraising_prediction" };
    if (lower.includes("likely to succeed")) return { intent: "success_prediction" };
    if (lower.includes("risk")) return { intent: "risk_prediction" };
    if (lower.includes("outlier")) return { intent: "outlier_detection" };

    return { intent: "general" };
  };

  // --- RESPONSE GENERATOR (UNCHANGED) ---
  const generateResponse = (intent: string) => {
    switch (intent) {
      case "fundraising_prediction":
        return {
          text: "Here are the companies likely to raise next quarter:",
        };
      case "success_prediction":
        return { text: "These founders show the highest probability of success:" };
      case "risk_prediction":
        return { text: "⚠️ Risk analysis for selected startups:" };
      case "outlier_detection":
        return { text: "Here are unusual patterns in your deal flow:" };
      default:
        return { text: "How can I help you with your deal flow?" };
    }
  };

  // --- SEND HANDLER ---
  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((p) => [...p, userMessage]);
    setInput("");
    setIsTyping(true);

    // simulate AI response
    setTimeout(() => {
      const { intent } = parseQuery(input);
      const res = generateResponse(intent);

      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: res.text,
        timestamp: new Date(),
      };

      setMessages((p) => [...p, assistantMsg]);
      setIsTyping(false);
    }, 700);
  };

  const suggestedQueries = [
    { icon: TrendingUp, text: "Show me companies raising next quarter" },
    { icon: Award, text: "Which founders are likely to succeed?" },
    { icon: AlertTriangle, text: "Which startups are at risk?" },
    { icon: Target, text: "What's our conviction history on fintech deals?" },
    { icon: Network, text: "Who in our network knows these founders?" },
    { icon: Lightbulb, text: "Detect outliers in our deal flow" },
  ];

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl">AI Pulse</h1>
          </div>
          <p className="text-slate-600">
            Natural language deal intelligence powered by superhuman pattern recognition
          </p>
        </div>

        <div className="flex gap-2">
          <Badge className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
            <Zap className="w-3 h-3 mr-1" />
            Live Predictions
          </Badge>
        </div>
      </div>

      {/* LAYOUT */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* CHAT PANEL */}
        <Card className="lg:col-span-2">
          <CardHeader className="border-b">
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              Conversational Intelligence
            </CardTitle>
            <CardDescription>Ask me anything about your deal flow</CardDescription>
          </CardHeader>

          <CardContent className="p-0">
            {/* WRAPPER WITH REF (FIXED) */}
            <div ref={scrollRef}>
              <ScrollArea className="h-[600px] p-6">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.type === "user" ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-[85%] ${
                          msg.type === "user" ? "order-2" : ""
                        }`}
                      >
                        <div
                          className={`rounded-lg p-4 ${
                            msg.type === "user"
                              ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white ml-auto"
                              : "bg-slate-100 text-slate-900"
                          }`}
                        >
                          <p className="text-sm whitespace-pre-wrap">
                            {msg.content}
                          </p>
                        </div>

                        <p className="text-xs text-slate-500 mt-1 px-2">
                          {msg.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-slate-100 rounded-lg p-4">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                          <div
                            className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                            style={{ animationDelay: "150ms" }}
                          />
                          <div
                            className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                            style={{ animationDelay: "300ms" }}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </div>

            {/* INPUT SECTION — FIXED & COMPLETED */}
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask something about your deal flow..."
                  className="flex-1"
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <Button onClick={handleSend}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              {/* SUGGESTED QUERIES */}
              <div className="flex flex-wrap gap-2 mt-3">
                {suggestedQueries.map((q, i) => (
                  <Button
                    key={i}
                    variant="secondary"
                    size="sm"
                    onClick={() => setInput(q.text)}
                    className="flex items-center gap-2"
                  >
                    <q.icon className="w-4 h-4" />
                    {q.text}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* RIGHT PANEL EMPTY FOR NOW */}
        <div className="hidden lg:block">{/* future metrics panel */}</div>
      </div>
    </div>
  );
}
