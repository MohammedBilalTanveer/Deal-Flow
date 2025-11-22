import { Sparkles, Brain, Target, Zap } from "lucide-react";
import { Progress } from "../ui/progress";

export function AIInsights() {
  return (
    <div className="bg-white border border-violet-200 rounded-2xl overflow-hidden shadow-sm">
      <div className="p-6 border-b border-violet-200 bg-gradient-to-r from-violet-50 to-transparent">
        <div className="flex items-center gap-2 mb-1">
          <Brain className="text-violet-600" size={20} />
          <h2 className="text-slate-900">AI Insights</h2>
        </div>
        <p className="text-slate-600 text-sm">Learning from your preferences</p>
      </div>
      
      <div className="p-6 space-y-6">
        {/* Trending Sectors */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Target className="text-violet-600" size={16} />
            <h3 className="text-slate-900 text-sm">Trending in Your Pipeline</h3>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-slate-700 text-sm">AI/ML</span>
                <span className="text-violet-700 text-sm">34%</span>
              </div>
              <Progress value={34} className="h-2 bg-slate-200" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-slate-700 text-sm">FinTech</span>
                <span className="text-violet-700 text-sm">28%</span>
              </div>
              <Progress value={28} className="h-2 bg-slate-200" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-slate-700 text-sm">HealthTech</span>
                <span className="text-violet-700 text-sm">22%</span>
              </div>
              <Progress value={22} className="h-2 bg-slate-200" />
            </div>
          </div>
        </div>

        {/* Learning Insights */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="text-violet-600" size={16} />
            <h3 className="text-slate-900 text-sm">What I've Learned</h3>
          </div>
          <div className="space-y-3">
            <div className="bg-slate-50 border border-violet-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <Zap className="text-yellow-600 flex-shrink-0 mt-0.5" size={14} />
                <p className="text-slate-700 text-xs">
                  You engage more with B2B SaaS companies raising Series A
                </p>
              </div>
            </div>
            <div className="bg-slate-50 border border-violet-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <Zap className="text-yellow-600 flex-shrink-0 mt-0.5" size={14} />
                <p className="text-slate-700 text-xs">
                  Deals mentioning "AI-powered" have 2.3x higher open rate
                </p>
              </div>
            </div>
            <div className="bg-slate-50 border border-violet-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <Zap className="text-yellow-600 flex-shrink-0 mt-0.5" size={14} />
                <p className="text-slate-700 text-xs">
                  You prefer warm intros from Sarah Chen and Michael Ross
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-gradient-to-br from-violet-50 to-transparent border border-violet-200 rounded-lg p-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-slate-600 text-xs mb-1">Avg Response Time</p>
              <p className="text-slate-900">2.3h</p>
            </div>
            <div>
              <p className="text-slate-600 text-xs mb-1">Deal Velocity</p>
              <p className="text-slate-900">+18%</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}