import { Link, Route, Switch } from "wouter";
import WellsCriteriaCalculator from "@/components/WellsCriteriaCalculator";
import medicalBg from "@/assets/medical-bg.png";
import { Info } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 relative font-sans">
      {/* Background Image Overlay */}
      <div 
        className="fixed inset-0 z-0 opacity-40 pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: `url(${medicalBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />
      {/* Header */}
      <header className="relative z-10 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm">C</div> */}
            <h1 className="font-display font-bold text-xl text-slate-900 tracking-tight">MedCalc<span className="text-primary">Pro</span></h1>
          </div>
          <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-600">
            <a href="#" className="hover:text-primary transition-colors">YAZEED</a>
            <a href="#" className="hover:text-primary transition-colors">About</a>
            <a href="#" className="hover:text-primary transition-colors">Guidelines</a>
          </nav>
        </div>
      </header>
      {/* Main Content */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-[1fr_300px] gap-12 items-start">
          
          {/* Calculator Section */}
          <div className="space-y-8">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold font-display text-slate-900">Wells Criteria for DVT</h2>
              <p className="text-slate-600 text-lg leading-relaxed">
                A risk stratification score used to estimate the pre-test probability of deep vein thrombosis (DVT).
              </p>
            </div>
            
            <WellsCriteriaCalculator />
          </div>

          {/* Sidebar Info */}
          <div className="space-y-6 lg:sticky lg:top-24">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Info className="h-4 w-4 text-primary" />
                Interpretation
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <span className="text-slate-600">High Risk (≥3)</span>
                  <span className="font-semibold text-red-600">75% Probability</span>
                </div>
                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                  <span className="text-slate-600">Moderate (1-2)</span>
                  <span className="font-semibold text-orange-600">17% Probability</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-600">Low Risk (≤0)</span>
                  <span className="font-semibold text-green-600">3% Probability</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-600 text-white rounded-xl shadow-md p-6 space-y-4">
              <h3 className="font-bold">Clinical Pearl</h3>
              <p className="text-sm text-blue-50 leading-relaxed">
                In patients with low pre-test probability (score ≤0), a negative D-dimer result essentially rules out DVT without need for ultrasound.
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
