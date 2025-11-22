import { Mail, Linkedin, MessageCircle, TrendingUp, DollarSign, Building2, Clock } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { cn } from "../../lib/utils";

interface Message {
  id: string;
  source: string;
  sender: string;
  company: string;
  sector: string;
  summary: string;
  fundingAmount?: number;
  stage?: string;
  aiScore: number;
  timestamp: string;
  isHot?: boolean;
  aiInsight?: string;
}

interface MessageCardProps {
  message: Message;
}

export function MessageCard({ message }: MessageCardProps) {
  const getSourceIcon = (source: string) => {
    switch (source) {
      case "linkedin":
        return <Linkedin size={16} className="text-blue-600" />;
      case "email":
        return <Mail size={16} className="text-purple-600" />;
      case "whatsapp":
        return <MessageCircle size={16} className="text-green-600" />;
      default:
        return null;
    }
  };

  const getSourceColor = (source: string) => {
    switch (source) {
      case "linkedin":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "email":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "whatsapp":
        return "bg-green-50 text-green-700 border-green-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  const getAIScoreColor = (score: number) => {
    if (score >= 85) return "text-emerald-600";
    if (score >= 70) return "text-yellow-600";
    return "text-slate-600";
  };

  return (
    <div className={cn(
      "p-6 hover:bg-slate-50 transition-colors cursor-pointer group",
      message.isHot && "bg-gradient-to-r from-orange-50 to-transparent border-l-2 border-l-orange-500"
    )}>
      <div className="flex items-start gap-4">
        <div className="flex-1 space-y-3">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-slate-900 group-hover:text-indigo-700 transition-colors">
                  {message.sender}
                </h3>
                <Badge className={cn("border", getSourceColor(message.source))}>
                  <span className="flex items-center gap-1">
                    {getSourceIcon(message.source)}
                    <span className="capitalize text-xs">{message.source}</span>
                  </span>
                </Badge>
                {message.isHot && (
                  <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0">
                    🔥 Hot Deal
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Building2 size={14} />
                <span>{message.company}</span>
                <span className="text-slate-600">•</span>
                <Clock size={14} />
                <span>{message.timestamp}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="text-right">
                <div className="text-xs text-slate-400 mb-1">AI Score</div>
                <div className={cn("text-lg", getAIScoreColor(message.aiScore))}>
                  {message.aiScore}
                </div>
              </div>
            </div>
          </div>

          {/* Summary */}
          <p className="text-slate-700 leading-relaxed">
            {message.summary}
          </p>

          {/* Details */}
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="outline" className="border-indigo-300 text-indigo-700 bg-indigo-50">
              {message.sector}
            </Badge>
            {message.fundingAmount && (
              <Badge variant="outline" className="border-emerald-300 text-emerald-700 bg-emerald-50">
                <DollarSign size={12} className="mr-1" />
                ${message.fundingAmount}M
              </Badge>
            )}
            {message.stage && (
              <Badge variant="outline" className="border-violet-300 text-violet-700 bg-violet-50">
                {message.stage}
              </Badge>
            )}
          </div>

          {/* AI Insight */}
          {message.aiInsight && (
            <div className="bg-gradient-to-r from-violet-50 to-transparent border-l-2 border-l-violet-500 pl-4 py-2">
              <div className="flex items-start gap-2">
                <TrendingUp size={16} className="text-violet-600 mt-0.5" />
                <p className="text-sm text-violet-800">{message.aiInsight}</p>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button size="sm" variant="outline" className="border-indigo-300 text-indigo-700 hover:bg-indigo-50 hover:border-indigo-400">
              View Full Thread
            </Button>
            <Button size="sm" variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-400">
              Add to Pipeline
            </Button>
            <Button size="sm" variant="ghost" className="text-slate-600 hover:text-slate-900 hover:bg-slate-100">
              Archive
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}