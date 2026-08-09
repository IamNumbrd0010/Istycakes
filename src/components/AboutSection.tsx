import React from 'react';
import { BAKERY_INFO } from '../data/cakes';
import { Sparkles, Heart, Award, Clock, ShieldCheck, MessageCircle, UtensilsCrossed } from 'lucide-react';

interface AboutSectionProps {
  onOpenBespoke: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onOpenBespoke }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Hero Story Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#944552] bg-[#fdf2f4] px-3.5 py-1.5 rounded-full border border-[#ffd9dd]">
            <Heart className="w-3.5 h-3.5 fill-[#944552]" />
            <span>Our Baking Story</span>
          </div>

          <h1 className="font-['DM_Serif_Display',serif] text-4xl sm:text-5xl text-[#2b1613] leading-tight">
            Baked with Passion, <br />
            <span className="text-[#944552] italic">Crafted for Joy</span>
          </h1>

          <p className="text-base text-[#534344] leading-relaxed">
            Welcome to <strong>{BAKERY_INFO.name}</strong>, where artistry meets indulgence. Our journey
            started with a simple mission: to create bespoke celebration cakes that do not compromise
            on taste, texture, or elegance.
          </p>

          <p className="text-sm text-[#534344] leading-relaxed">
            Every creation is handcrafted from scratch using authentic Belgian chocolates, real French butter,
            fresh seasonal berries, and Madagascar Bourbon vanilla beans. Whether it's an intimate birthday,
            a grand Lagos wedding, or a corporate milestone, we turn your cake dreams into edible masterpieces.
          </p>

          <div className="pt-2 flex flex-wrap gap-4">
            <button
              onClick={onOpenBespoke}
              className="inline-flex items-center gap-2 bg-[#944552] hover:bg-[#7a2e3b] text-white font-bold text-sm px-7 py-3.5 rounded-full shadow-md transition-all duration-200"
            >
              <Sparkles className="w-4 h-4 text-[#ffe088]" />
              <span>Design Your Dream Cake</span>
            </button>
          </div>
        </div>

        {/* Story Photo Mosaic */}
        <div className="lg:col-span-6 grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="rounded-3xl overflow-hidden shadow-lg border-2 border-white aspect-[3/4]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdB5A5q6ISEspaZ81CRhPoCI-Axf1o0wECO5o-jQyBtJ7hT8a45Cypyr1g14N6nObqiD0lLIfroPyUHdNKDx_2q-CLRjrRk3HjHMHO2uHibLYysFzGZ29F8LcIxA9auKWBTjFd8fe3aEcWW3NZ54arr66yhUlDOMYcqmnNDPGdPaPVeBUUFy9eiQyapFPeGMvo6ebkWO-u9Fk9RTJ8_9EfVn1KKWXvczRkTWlDteq0VilLwXnMKjNSlQ"
                alt="Artisan cake piping"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="space-y-4 pt-8">
            <div className="rounded-3xl overflow-hidden shadow-lg border-2 border-white aspect-[3/4]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOC9KxSN8WHKdqUKOuEXX5BeqVpTeeiBVfHkWnPI1EOU7mxxeQxpaO6OUOzInzKbGbS1mviss0QPWAXNqaQ1cRiAqJDxQrqLltrPVyi1rAW7we6RHJDebnD2SuGoJUNhJS855lDcGv5JlcSLB_KoZS6f2zqqXP0o40JQ2-HaRckVUOGwcsPgBWPy5XI2YSK2JiDwkfQIZEbs2qZJM8sGqmX5PeRjrdThKwGQucn8Oj_I9P7CWXukaY_g"
                alt="Floral wedding tier"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 4 Pillars of Excellence */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-[#ffd9dd]">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-[#944552]">
            Our Commitment
          </span>
          <h3 className="font-['DM_Serif_Display',serif] text-3xl text-[#2b1613]">
            The IstyCakes Promise
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center space-y-3">
            <div className="w-14 h-14 bg-[#fdf2f4] rounded-2xl flex items-center justify-center mx-auto text-[#944552]">
              <Award className="w-7 h-7" />
            </div>
            <h4 className="font-['DM_Serif_Display',serif] text-xl text-[#2b1613]">
              Bespoke Artistry
            </h4>
            <p className="text-xs text-[#534344] leading-relaxed">
              Every detail is meticulously crafted, from delicate wafer paper floristry to 24-karat gold leaf flakes.
            </p>
          </div>

          <div className="text-center space-y-3">
            <div className="w-14 h-14 bg-[#fdf2f4] rounded-2xl flex items-center justify-center mx-auto text-[#944552]">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h4 className="font-['DM_Serif_Display',serif] text-xl text-[#2b1613]">
              Impeccable Hygiene
            </h4>
            <p className="text-xs text-[#534344] leading-relaxed">
              Baked in a certified sanitary kitchen studio with strict temperature control and premium food safety standards.
            </p>
          </div>

          <div className="text-center space-y-3">
            <div className="w-14 h-14 bg-[#fdf2f4] rounded-2xl flex items-center justify-center mx-auto text-[#944552]">
              <Clock className="w-7 h-7" />
            </div>
            <h4 className="font-['DM_Serif_Display',serif] text-xl text-[#2b1613]">
              Always On Time
            </h4>
            <p className="text-xs text-[#534344] leading-relaxed">
              We respect your timeline. Dedicated logistics ensure your cake arrives chilled, stable, and ready to stun guests.
            </p>
          </div>
        </div>
      </div>

      {/* Services Breakdown */}
      <div className="space-y-6">
        <h3 className="font-['DM_Serif_Display',serif] text-3xl text-center text-[#2b1613]">
          Celebrations We Cater
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: 'Luxury Weddings',
              desc: 'Grand multi-tier wedding cakes customized to match your wedding palette, floral installations, and theme.',
            },
            {
              title: 'Milestone Birthdays',
              desc: 'Showstopping drip cakes, character themes, and elegant vintage Lambeth rosettes for all ages.',
            },
            {
              title: 'Surprise Packages',
              desc: 'Curated gift boxes with mini cakes, luxury cupcakes, balloons, wine, and personalized greeting cards.',
            },
            {
              title: 'Cocktail Small Chops',
              desc: 'Crispy samosas, golden spring rolls, puff puff, peppered gizzard, and artisan pastries for high-end events.',
            },
          ].map((srv, idx) => (
            <div key={idx} className="bg-[#FFF8F7] p-6 rounded-2xl border border-[#ffd9dd] space-y-2">
              <h4 className="font-['DM_Serif_Display',serif] text-lg text-[#944552]">{srv.title}</h4>
              <p className="text-xs text-[#534344] leading-relaxed">{srv.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
