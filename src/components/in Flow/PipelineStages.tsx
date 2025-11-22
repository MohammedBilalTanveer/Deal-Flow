import { CheckCircle2, Circle, Clock } from "lucide-react";
import { Badge } from "../ui/badge";

export function PipelineStages() {
  const stages = [
    { name: "New Submissions", count: 24, color: "bg-blue-500", active: true },
    { name: "Under Review", count: 18, color: "bg-yellow-500", active: false },
    { name: "Due Diligence", count: 12, color: "bg-orange-500", active: false },
    { name: "Partner Review", count: 8, color: "bg-purple-500", active: false },
    { name: "Term Sheet", count: 3, color: "bg-emerald-500", active: false },
    { name: "Closed", count: 47, color: "bg-slate-400", active: false },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <div className="mb-4">
        <h2 className="text-slate-900 mb-1">Pipeline Overview</h2>
        <p className="text-slate-600 text-sm">Track deals through your investment process</p>
      </div>
      
      <div className="space-y-3">
        {stages.map((stage, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer group"
          >
            <div className="flex items-center gap-3 flex-1">
              <div className={`w-2 h-2 rounded-full ${stage.color}`} />
              <span className="text-slate-700 group-hover:text-slate-900">{stage.name}</span>
            </div>
            <Badge className="bg-slate-100 text-slate-700 border-0">
              {stage.count}
            </Badge>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-600">Total Active Deals</span>
          <span className="text-slate-900">65</span>
        </div>
      </div>
    </div>
  );
}
