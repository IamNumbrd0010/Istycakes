import React, { useState } from 'react';
import { INSTAGRAM_POSTS, BAKERY_INFO } from '../data/cakes';
import { Instagram, Heart, MessageCircle, ExternalLink, X } from 'lucide-react';

export const InstagramGallery: React.FC = () => {
  const [selectedPost, setSelectedPost] = useState<any | null>(null);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-[#944552]">
          Follow Our Sweet Journey
        </span>
        <h2 className="font-['DM_Serif_Display',serif] text-3xl sm:text-4xl text-[#2b1613]">
          Instagram <span className="text-[#944552] italic">Gallery</span>
        </h2>
        <a
          href={BAKERY_INFO.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#944552] hover:underline"
        >
          <Instagram className="w-4 h-4" />
          <span>{BAKERY_INFO.instagram}</span>
        </a>
      </div>

      {/* 6 Photo Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {INSTAGRAM_POSTS.map((post) => (
          <div
            key={post.id}
            onClick={() => setSelectedPost(post)}
            className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-sm border border-[#ffd9dd] bg-[#fdf2f4]"
          >
            <img
              src={post.image}
              alt="IstyCakes Instagram creation"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            {/* Hover overlay with likes and Instagram badge */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white gap-2 p-2 text-center">
              <Instagram className="w-5 h-5 text-white/90" />
              <div className="flex items-center gap-3 text-xs font-bold">
                <span className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5 fill-white" /> {post.likes}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="w-3.5 h-3.5 fill-white" /> {post.comments}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA Button */}
      <div className="text-center mt-8">
        <a
          href={BAKERY_INFO.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-xs font-bold px-6 py-3 rounded-full bg-[#d97d8a] text-white hover:bg-[#944552] transition-colors shadow-md"
        >
          <Instagram className="w-4 h-4" />
          <span>View More Creations on Instagram</span>
        </a>
      </div>

      {/* Instagram Post Detail Modal */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-[#ffd9dd] relative animate-in zoom-in-95">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="relative aspect-square w-full bg-black">
              <img
                src={selectedPost.image}
                alt="Instagram post"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#fdf2f4] flex items-center justify-center text-[#944552]">
                    <Instagram className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#2b1613]">{BAKERY_INFO.instagram}</h4>
                    <p className="text-[10px] text-[#79545c]">Lagos, Nigeria</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-[#79545c]">
                  <span className="flex items-center gap-1 font-bold text-[#944552]">
                    <Heart className="w-4 h-4 fill-[#944552]" /> {selectedPost.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" /> {selectedPost.comments}
                  </span>
                </div>
              </div>

              <p className="text-xs text-[#534344] leading-relaxed">
                {selectedPost.caption}
              </p>

              <div className="pt-2 flex items-center justify-between border-t border-[#ffd9dd]/60">
                <span className="text-[11px] text-[#79545c]">Direct message us for cake inquiries</span>
                <a
                  href={BAKERY_INFO.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-[#944552] flex items-center gap-1 hover:underline"
                >
                  <span>Open Instagram</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
