import { Plus, Upload, Users, Calendar, FileText, TrendingUp, Share2 } from "lucide-react";
import { Button } from "../ui/button";

interface QuickActionsProps {
  onUploadDeck?: () => void;
  onCircleShare?: () => void;
}

export function QuickActions({ onUploadDeck, onCircleShare }: QuickActionsProps) {
  const actions = [
    { name: "Circle Share", icon: Share2, color: "bg-indigo-600 hover:bg-indigo-700", onClick: onCircleShare },
    { name: "Upload Deck", icon: Upload, color: "bg-emerald-600 hover:bg-emerald-700", onClick: onUploadDeck },
    { name: "Schedule Meeting", icon: Calendar, color: "bg-purple-600 hover:bg-purple-700" },
    { name: "Portfolio Update", icon: TrendingUp, color: "bg-orange-600 hover:bg-orange-700" },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
      <div className="mb-4">
        <h2 className="text-slate-900 mb-1">Quick Actions</h2>
        <p className="text-slate-600 text-sm">Frequently used tools</p>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant="outline"
            onClick={action.onClick}
            className={`${action.color} text-white border-0 flex flex-col items-center justify-center h-24 hover:shadow-md transition-all`}
          >
            <action.icon size={24} className="mb-2" />
            <span className="text-sm">{action.name}</span>
          </Button>
        ))}
      </div>
    </div>
  );
}