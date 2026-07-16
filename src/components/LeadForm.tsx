import { FileSpreadsheet, Send, CheckCircle2 } from "lucide-react";

interface LeadFormProps {
  formData: {
    name: string;
    email: string;
    phone: string;
    address: string;
    leadType: string;
    notes: string;
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    name: string;
    email: string;
    phone: string;
    address: string;
    leadType: string;
    notes: string;
  }>>;
  handleFormSubmit: (e: React.FormEvent) => void;
  formSubmitted: boolean;
}

export default function LeadForm({
  formData,
  setFormData,
  handleFormSubmit,
  formSubmitted,
}: LeadFormProps) {
  return (
    <section id="lead-form" className="bg-card border border-line rounded-2xl p-6 md:p-8 space-y-6 shadow-sm">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-line pb-4">
        <div>
          <h3 className="text-xl font-serif font-bold text-ink flex items-center gap-2">
            <FileSpreadsheet className="h-5.5 w-5.5 text-bay" />
            Deal Review & Contract Desk
          </h3>
          <p className="text-xs text-slate-500">
            Register opportunity details with Konrad Schultz (FL Lic #3188541, Beachfront Realty) for custom contract drafting
          </p>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-sage/10 text-sage border border-sage/20 text-xs font-semibold">
          <span className="h-1.5 w-1.5 rounded-full bg-sage animate-pulse"></span>
          Fiduciary Intake Active
        </div>
      </div>

      <form onSubmit={handleFormSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase font-mono">Broker / Associate Name</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Full Legal Name"
                className="w-full bg-surface border border-line rounded px-3 py-2 text-xs text-ink placeholder:text-slate-400 focus:outline-none focus:border-bay"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase font-mono">Associate Email</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                placeholder="broker@office.com"
                className="w-full bg-surface border border-line rounded px-3 py-2 text-xs text-ink placeholder:text-slate-400 focus:outline-none focus:border-bay"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase font-mono">Associate Mobile Contact</label>
              <input
                type="text"
                required
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="(305) 555-0199"
                className="w-full bg-surface border border-line rounded px-3 py-2 text-xs text-ink placeholder:text-slate-400 focus:outline-none focus:border-bay"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase font-mono">Intended Creative Strategy</label>
              <select
                value={formData.leadType}
                onChange={(e) => setFormData(prev => ({ ...prev, leadType: e.target.value }))}
                className="w-full bg-surface border border-line rounded px-3 py-2 text-xs text-ink focus:outline-none focus:border-bay"
              >
                <option value="Subject-To Assumable Mortgage">Subject-To (Assumable Mortgage)</option>
                <option value="Seller-Financing wrap">Seller-Financing (Wrap-Around)</option>
                <option value="Assessment Arbitrage Buyout">Assessment Arbitrage (Lump-Sum Buyout)</option>
                <option value="Branded Contract Assignment">Branded Condo Assignment</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-500 uppercase font-mono">Distressed Target Address / Unit</label>
            <input
              type="text"
              required
              value={formData.address}
              onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
              placeholder="e.g., 1201 Brickell Bay Dr, Unit 2204, Miami, FL 33131"
              className="w-full bg-surface border border-line rounded px-3 py-2 text-xs text-ink placeholder:text-slate-400 focus:outline-none focus:border-bay"
            />
          </div>
        </div>

        <div className="space-y-4 flex flex-col justify-between">
          <div className="space-y-1 flex-1 flex flex-col">
            <label className="text-[10px] font-bold text-slate-500 uppercase font-mono">Underwriting Details & Contract Stipulations</label>
            <textarea
              rows={4}
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Note down interest rate offsets, outstanding board special assessments, title conditions, or motivational distress triggers..."
              className="w-full bg-surface border border-line rounded p-3 text-xs text-ink font-sans flex-1 placeholder:text-slate-400 focus:outline-none focus:border-bay"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-[10px] text-slate-400 leading-relaxed max-w-sm">
              By registering this opportunity, it will be mapped into a custom FAR/BAR contract addendum for Beachfront Realty broker compliance review.
            </span>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-bay hover:bg-bay/90 text-white font-bold uppercase tracking-wider text-xs rounded-lg flex items-center justify-center gap-1.5 shadow-md cursor-pointer transition-colors"
            >
              <Send className="h-4 w-4" />
              Register Opportunity
            </button>
          </div>
        </div>
      </form>

      {/* Form Submission Success Overlay */}
      {formSubmitted && (
        <div className="p-4 bg-sage/10 border border-sage/45 rounded-xl text-sage text-xs flex items-center gap-3">
          <CheckCircle2 className="h-5 w-5 shrink-0 text-sage" />
          <div>
            <h5 className="font-bold text-ink">Opportunity Mapped with Florida License Closing Desk</h5>
            <p className="mt-0.5 text-slate-600 font-sans">
              Konrad Schultz has received this Subject-To profile. An initial Title Search and RMLO compliance audit is queueing. A draft addendum will be delivered to <strong className="text-ink">{formData.email}</strong> shortly.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
