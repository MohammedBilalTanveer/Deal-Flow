import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Filter } from "lucide-react";

interface FilterBarProps {
  selectedSector: string;
  setSelectedSector: (value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
}

export function FilterBar({ selectedSector, setSelectedSector, sortBy, setSortBy }: FilterBarProps) {
  return (
    <div className="flex items-center gap-3 px-6 py-4 border-b border-slate-200 bg-slate-50">
      <Filter className="text-slate-500" size={18} />
      
      <Select value={selectedSector} onValueChange={setSelectedSector}>
        <SelectTrigger className="w-[180px] bg-white border-slate-300 text-slate-900">
          <SelectValue placeholder="Sector" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Sectors</SelectItem>
          <SelectItem value="ai">AI/ML</SelectItem>
          <SelectItem value="fintech">FinTech</SelectItem>
          <SelectItem value="healthtech">HealthTech</SelectItem>
          <SelectItem value="saas">SaaS</SelectItem>
          <SelectItem value="blockchain">Blockchain</SelectItem>
          <SelectItem value="climate">Climate Tech</SelectItem>
        </SelectContent>
      </Select>

      <Select value={sortBy} onValueChange={setSortBy}>
        <SelectTrigger className="w-[180px] bg-white border-slate-300 text-slate-900">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ai-priority">AI Priority</SelectItem>
          <SelectItem value="recent">Most Recent</SelectItem>
          <SelectItem value="funding">Funding Amount</SelectItem>
          <SelectItem value="sector">Sector</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}