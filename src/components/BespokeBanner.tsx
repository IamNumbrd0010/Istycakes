import React, { useState } from 'react';
import { Sparkles, Star, ChevronRight, CheckCircle2, ArrowLeftRight } from 'lucide-react';

interface BespokeBannerProps {
  onStartCustomizing: () => void;
}

export const BespokeBanner: React.FC<BespokeBannerProps> = ({ onStartCustomizing }) => {
  const [activeComparison, setActiveComparison] = useState<'split' | 'inspiration' | 'creation'>('split');

  return (
    <section className="bg-[#FFF0EE]/80 py-12 md:py-20 my-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[2rem] p-6 sm:p-10 lg:p-14 shadow-xl border border-[#ffd9dd] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Copy & Recreate CTA */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-1.5 text-[#D4AF37] text-xs font-bold uppercase tracking-wider bg-[#fdf8e6] px-3.5 py-1.5 rounded-full border border-[#f5e6b3]">
              <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
              <span>Bespoke Cakes</span>
            </div>

            <h2 className="font-['DM_Serif_Display',serif] text-3xl sm:text-4xl lg:text-5xl text-[#2b1613] leading-tight">
              Have a cake <span className="text-[#944552]">design in mind?</span>
            </h2>

            <p className="text-base sm:text-lg text-[#534344] leading-relaxed">
              Bring your Pinterest, Instagram, or personal inspiration to life. We’ll recreate your
              dream cake with exceptional craftsmanship, exact flavor balance, and immaculate floral details.
            </p>

            <ul className="space-y-2.5 text-sm text-[#2b1613]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#944552] shrink-0" />
                <span>Send any photo, sketch, or moodboard directly</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#944552] shrink-0" />
                <span>Custom tier sizing, bespoke flavors &amp; luxury gold detailing</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#944552] shrink-0" />
                <span>Real-time price breakdown &amp; WhatsApp consultation</span>
              </li>
            </ul>

            <div className="pt-2">
              <button
                onClick={onStartCustomizing}
                className="inline-flex items-center gap-2.5 bg-[#d97d8a] hover:bg-[#944552] text-white font-bold text-base px-8 py-4 rounded-full shadow-md hover:shadow-lg transition-all duration-300 hover:scale-102"
              >
                <Sparkles className="w-5 h-5 text-[#ffe088]" />
                <span>Recreate My Cake</span>
              </button>
            </div>
          </div>

          {/* Right Column: Visual Comparison (Inspiration vs Creation) */}
          <div className="lg:col-span-6 relative">
            {/* View Mode Toggle Controls */}
            <div className="flex items-center justify-end gap-2 mb-3">
              <span className="text-xs font-semibold text-[#79545c] flex items-center gap-1">
                <ArrowLeftRight className="w-3.5 h-3.5" /> Compare:
              </span>
              <div className="inline-flex bg-[#fdf2f4] p-1 rounded-lg border border-[#ffd9dd]">
                <button
                  onClick={() => setActiveComparison('split')}
                  className={`text-xs font-bold px-2.5 py-1 rounded-md transition-colors ${
                    activeComparison === 'split' ? 'bg-[#944552] text-white' : 'text-[#79545c] hover:text-[#944552]'
                  }`}
                >
                  Both
                </button>
                <button
                  onClick={() => setActiveComparison('inspiration')}
                  className={`text-xs font-bold px-2.5 py-1 rounded-md transition-colors ${
                    activeComparison === 'inspiration' ? 'bg-[#944552] text-white' : 'text-[#79545c] hover:text-[#944552]'
                  }`}
                >
                  Inspiration
                </button>
                <button
                  onClick={() => setActiveComparison('creation')}
                  className={`text-xs font-bold px-2.5 py-1 rounded-md transition-colors ${
                    activeComparison === 'creation' ? 'bg-[#944552] text-white' : 'text-[#79545c] hover:text-[#944552]'
                  }`}
                >
                  Our Creation
                </button>
              </div>
            </div>

            {/* Comparison Container */}
            <div className="relative h-[320px] sm:h-[380px] w-full flex items-center justify-center">
              {/* Left Image: Pinterest/Social Inspiration */}
              <div
                className={`absolute transition-all duration-500 rounded-2xl overflow-hidden shadow-xl border-4 border-white bg-white ${
                  activeComparison === 'inspiration'
                    ? 'inset-0 z-30 scale-100 rotate-0'
                    : activeComparison === 'creation'
                    ? 'opacity-20 scale-90 -translate-x-12'
                    : 'left-0 top-4 w-[58%] h-[82%] z-10 -rotate-6 origin-bottom-left hover:rotate-0 hover:z-25'
                }`}
              >
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqRfYbmtYP-z-mLz_WveebWrAg58toj99hFOgJh_c4rJ6E72buPZBiAkvlwsB0RwAbQCsVW_nrcY5ZdimhkTfXVFR-VsasnhKrDljM6-dxWWVRvT0OVI0fFb6I53bx_G4UgrZrdLUd_joe6ofDadGix4r96LD0VMs87YzdGjvRmzAvbWetTWviojqH-HVjcx9ZldloiSCp9im8qGnclchEsVzmnHZsL2xcvWbNMqm_Sushi4y2EcGBDQ"
                  alt="Customer Inspiration Photo"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 left-3 bg-[#944552] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow">
                  Your Inspiration
                </div>
              </div>

              {/* Right Image: IstyCakes Recreated Real Cake */}
              <div
                className={`absolute transition-all duration-500 rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-white ${
                  activeComparison === 'creation'
                    ? 'inset-0 z-30 scale-100'
                    : activeComparison === 'inspiration'
                    ? 'opacity-20 scale-90 translate-x-12'
                    : 'right-0 top-0 w-[62%] h-[92%] z-20 hover:scale-102'
                }`}
              >
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAfp3xKF7ujYvy98XYoyAJzIRX2GWXXyq6EhtA_jYSXHr1HgsaFMorUnnbktUILyYqFHaIfTqsWmu9-kGE3V8Owc-Mm0Dix19gRvKPfIFer4oahdIsBjam74DY1xT0g8_C2veS88I2q5FrrOEgo3aVp_3vTMQBpsBj6m5jJpz7SJtn2Td64QidXDGUfWkacmAWIulkqoMvJ9B46GqKrRcX2vniWo-k9E5LQGEErZfJEu10olhpTzZ5kOg"
                  alt="IstyCakes Real Finished Creation"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-3 right-3 bg-[#944552] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow">
                  Our Creation ✨
                </div>
              </div>

              {/* Center interactive chevron indicator */}
              {activeComparison === 'split' && (
                <div className="absolute z-30 bg-white rounded-full p-2.5 shadow-xl border border-[#ffd9dd] text-[#944552] animate-pulse">
                  <ChevronRight className="w-5 h-5" />
                </div>
              )}
            </div>

            <p className="text-center text-xs text-[#79545c] mt-4 italic">
              Real photo sent by customer Chioma O. &amp; our finished handcrafted wedding tier.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
