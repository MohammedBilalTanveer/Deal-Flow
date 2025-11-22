import { FileText, Download, Eye, TrendingUp, Building2, Users, Calendar, ExternalLink } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

interface DealCardProps {
  deal: {
    id: string;
    company: string;
    sector: string;
    stage: string;
    fundingAmount: number;
    valuation: number;
    founders: string[];
    pitchDeckUrl?: string;
    thumbnailUrl?: string;
    submittedDate: string;
    aiScore: number;
    highlights: string[];
  };
}

export function DealCard({ deal }: DealCardProps) {
  return (
    <Card className="border-slate-200 hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-slate-900">{deal.company}</h3>
              <Badge className="bg-emerald-100 text-emerald-700 border-0 text-xs">
                {deal.aiScore} Match
              </Badge>
            </div>
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
              <div className="flex items-center gap-1">
                <Building2 size={14} />
                <span>{deal.sector}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>{deal.submittedDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pitch Deck Preview */}
        {deal.thumbnailUrl && (
          <div className="relative mb-4 rounded-lg overflow-hidden bg-slate-100 aspect-video group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button size="sm" className="bg-white text-slate-900 hover:bg-slate-100">
                <Eye size={16} className="mr-2" />
                View Pitch Deck
              </Button>
            </div>
            <div className="w-full h-full flex items-center justify-center">
              <FileText className="text-slate-400" size={48} />
              <div className="absolute top-2 right-2 bg-indigo-600 text-white px-2 py-1 rounded text-xs">
                12 slides
              </div>
            </div>
          </div>
        )}

        {/* Deal Details */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
            <p className="text-xs text-slate-600 mb-1">Seeking</p>
            <p className="text-slate-900">${deal.fundingAmount}M</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
            <p className="text-xs text-slate-600 mb-1">Valuation</p>
            <p className="text-slate-900">${deal.valuation}M</p>
          </div>
        </div>

        {/* Stage & Founders */}
        <div className="space-y-2 mb-4">
          <Badge variant="outline" className="border-violet-300 text-violet-700 bg-violet-50">
            {deal.stage}
          </Badge>
          <div className="flex items-center gap-1 text-sm text-slate-600">
            <Users size={14} />
            <span>{deal.founders.join(", ")}</span>
          </div>
        </div>

        {/* Highlights */}
        {deal.highlights && deal.highlights.length > 0 && (
          <div className="mb-4 space-y-2">
            {deal.highlights.map((highlight, index) => (
              <div key={index} className="flex items-start gap-2 text-sm">
                <TrendingUp size={14} className="text-emerald-600 mt-0.5 flex-shrink-0" />
                <span className="text-slate-700">{highlight}</span>
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button size="sm" className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white">
            <Eye size={16} className="mr-2" />
            Review Deal
          </Button>
          <Button size="sm" variant="outline" className="border-slate-300 text-slate-700">
            <Download size={16} />
          </Button>
          <Button size="sm" variant="outline" className="border-slate-300 text-slate-700">
            <ExternalLink size={16} />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
