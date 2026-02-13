import React, { useState, useEffect } from "react";
import { Check, AlertCircle, Info, RotateCcw, Activity } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import lungsIcon from "@/assets/lungs-icon.png";
import peIcon from "@/assets/pe-icon.png";

type Criterion = {
  id: string;
  label: string;
  points: number;
  description?: string;
};

const criteria: Criterion[] = [
  {
    id: "cancer",
    label: "Active cancer",
    description: "Treatment ongoing, within 6 months, or palliative",
    points: 1,
  },
  {
    id: "paralysis",
    label: "Paralysis, paresis, or immobilization",
    description: "Plaster immobilization of the lower extremities",
    points: 1,
  },
  {
    id: "bedridden",
    label: "Recently bedridden > 3 days or major surgery",
    description: "Within 4 weeks requiring general or regional anesthesia",
    points: 1,
  },
  {
    id: "tenderness",
    label: "Localized tenderness",
    description: "Along the distribution of the deep venous system",
    points: 1,
  },
  {
    id: "swollen_leg",
    label: "Entire leg swollen",
    points: 1,
  },
  {
    id: "calf_swelling",
    label: "Calf swelling > 3 cm",
    description: "Compared to the asymptomatic side (measured 10 cm below tibial tuberosity)",
    points: 1,
  },
  {
    id: "pitting_edema",
    label: "Pitting edema",
    description: "Confined to the symptomatic leg",
    points: 1,
  },
  {
    id: "collateral_veins",
    label: "Collateral superficial veins",
    description: "Non-varicose",
    points: 1,
  },
  {
    id: "previous_dvt",
    label: "Previously documented DVT",
    points: 1,
  },
  {
    id: "alternative_diagnosis",
    label: "Alternative diagnosis at least as likely as DVT",
    points: -2,
  },
];

export default function WellsCriteriaCalculator() {
  const [selectedCriteria, setSelectedCriteria] = useState<Record<string, boolean>>({});
  const [score, setScore] = useState(0);

  useEffect(() => {
    const newScore = criteria.reduce((acc, criterion) => {
      return acc + (selectedCriteria[criterion.id] ? criterion.points : 0);
    }, 0);
    setScore(newScore);
  }, [selectedCriteria]);

  const toggleCriterion = (id: string) => {
    setSelectedCriteria((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const reset = () => {
    setSelectedCriteria({});
  };

  const getRiskGroup = (score: number) => {
    if (score >= 3) return { label: "High Probability", color: "text-red-600", bg: "bg-red-50", border: "border-red-200" };
    if (score >= 1) return { label: "Moderate Probability", color: "text-orange-600", bg: "bg-orange-50", border: "border-orange-200" };
    return { label: "Low Probability", color: "text-green-600", bg: "bg-green-50", border: "border-green-200" };
  };

  const risk = getRiskGroup(score);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-8">
      {/* Schedule Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-4">
          <div className="bg-primary/10 p-2 rounded-xl border border-primary/20">
            <img src={lungsIcon} alt="Lungs" className="w-10 h-10 object-contain" />
          </div>
          <div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">WELLS CRITERIA</h2>
            <div className="flex items-center gap-2 text-primary font-bold text-xs tracking-widest uppercase">
              <Activity className="w-3 h-3" />
              DVT Assessment Protocol
            </div>
          </div>
        </div>
        <div className="hidden sm:block">
           <img src={peIcon} alt="Pulmonary" className="w-12 h-12 opacity-50 grayscale hover:grayscale-0 transition-all cursor-help" />
        </div>
      </div>

      <Card className="border-2 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)] overflow-hidden rounded-none">
        <div className="grid grid-cols-[1fr_100px] bg-slate-900 text-white font-bold uppercase tracking-tighter text-sm py-3 px-6">
          <div>CLINICAL FEATURE</div>
          <div className="text-center">POINTS</div>
        </div>
        
        <CardContent className="p-0">
          <div className="divide-y-2 divide-slate-900">
            {criteria.map((criterion) => (
              <motion.div 
                key={criterion.id}
                className={cn(
                  "grid grid-cols-[1fr_100px] items-center transition-all cursor-pointer group",
                  selectedCriteria[criterion.id] ? "bg-primary text-white" : "hover:bg-slate-50"
                )}
                onClick={() => toggleCriterion(criterion.id)}
              >
                <div className="py-4 px-6 border-r-2 border-slate-900">
                  <div className="font-bold text-lg leading-tight uppercase tracking-tight">
                    {criterion.label}
                  </div>
                  {criterion.description && (
                    <div className={cn(
                      "text-xs mt-1 font-medium",
                      selectedCriteria[criterion.id] ? "text-blue-100" : "text-slate-500"
                    )}>
                      {criterion.description}
                    </div>
                  )}
                </div>
                
                <div className="text-center font-black text-2xl flex items-center justify-center h-full tabular-nums">
                  {criterion.points > 0 ? "+" : ""}{criterion.points}
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button 
          variant="outline" 
          onClick={reset} 
          className="rounded-none border-2 border-slate-900 font-bold uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
        >
          <RotateCcw className="mr-2 h-4 w-4" /> Reset Calculator
        </Button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          key={score}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <Card className={cn("border-4 shadow-[12px_12px_0px_0px_rgba(15,23,42,1)] rounded-none", risk.border, risk.bg)}>
            <CardContent className="p-8 grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-2 border-b-2 md:border-b-0 md:border-r-2 border-slate-200 pb-6 md:pb-0 md:pr-8">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">FINAL CALCULATION</p>
                <div className="text-7xl font-black text-slate-900 tabular-nums tracking-tighter">
                  {score} <span className="text-2xl font-bold text-slate-500 uppercase">PTS</span>
                </div>
              </div>

              <div className="text-left md:pl-8 space-y-3">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">RISK ASSESSMENT</p>
                <div className={cn("text-4xl font-black uppercase tracking-tighter leading-none italic", risk.color)}>
                  {risk.label}
                </div>
                <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
                  {score >= 3 ? <AlertCircle className="h-5 w-5 text-red-500" /> : <Check className="h-5 w-5 text-green-500" />}
                  <span>PROTOCOL: {score >= 3 ? "URGENT US REQUIRED" : score >= 1 ? "CONSIDER D-DIMER" : "DVT UNLIKELY"}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
      
      <div className="border-l-4 border-slate-200 pl-6 py-2 max-w-lg italic">
        <p className="text-sm font-medium text-slate-500 leading-relaxed">
          "The Wells score is a critical diagnostic tool in modern medicine for preventing Pulmonary Embolism (PE) through early DVT detection."
        </p>
      </div>
    </div>
  );
}
