import { Flame, TrendingUp, ArrowRight } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { mockMessages } from "./data/mockData";

export function HotDeals() {
  const hotDeals = mockMessages.filter(msg => msg.isHot).slice(0, 5);

  return (
    <div className="bg-white border border-orange-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="p-6 border-b border-orange-200 bg-gradient-to-r from-orange-50 to-transparent">
        <div className="flex items-center gap-2 mb-1">
          <Flame className="text-orange-600" size={20} />
          <h2 className="text-slate-900">Hot Deals</h2>
        </div>
        <p className="text-slate-600 text-sm">AI-identified high-priority opportunities</p>
      </div>
      
      <div className="p-4 space-y-3">
        {hotDeals.map((deal, index) => (
          <div
            key={deal.id}
            className="bg-slate-50 border border-slate-200 rounded-xl p-4 hover:bg-slate-100 transition-colors cursor-pointer group"
          >
            <div className="flex items-start gap-3">
              <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white rounded-lg w-8 h-8 flex items-center justify-center flex-shrink-0">
                {index + 1}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-slate-900 text-sm mb-1 truncate group-hover:text-orange-700 transition-colors">
                  {deal.company}
                </h3>
                <p className="text-slate-600 text-xs mb-2 line-clamp-2">{deal.summary}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge className="bg-indigo-100 text-indigo-700 border-0 text-xs">
                    {deal.sector}
                  </Badge>
                  {deal.fundingAmount && (
                    <Badge className="bg-emerald-100 text-emerald-700 border-0 text-xs">
                      ${deal.fundingAmount}M
                    </Badge>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div className="bg-emerald-100 px-2 py-1 rounded text-emerald-700 text-xs">
                  {deal.aiScore}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <Button 
          variant="ghost" 
          className="w-full text-orange-700 hover:text-orange-800 hover:bg-orange-50"
        >
          View All Hot Deals
          <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </div>
  );
}