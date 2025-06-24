"use client";
import { productType } from "@/constants";
import { Repeat } from "lucide-react";
interface Props {
  selectedTab: string;
  onTabSelect: (tab: string) => void;
}

const HomeTabbar = ({ selectedTab, onTabSelect }: Props) => {
  return (
    <>
      <div className="tabbar-scrollbar-hide flex items-center gap-3 text-sm font-semibold bg-gradient-to-r from-white via-blue-50 to-fuchsia-50/80 backdrop-blur-xl rounded-2xl shadow-2xl px-5 py-3 md:px-10 md:py-4 border border-white/60 relative ring-1 ring-fuchsia-100/60">
        <div className="flex items-center gap-2 relative flex-wrap">
          {productType?.map((item) => (
            <button
              onClick={() => onTabSelect(item?.title)}
              key={item?.title}
              className={`relative px-6 py-2 md:px-8 md:py-2.5 rounded-full transition-all duration-200 border border-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400 font-bold
                ${selectedTab === item?.title
                  ? "bg-gradient-to-r from-blue-600 via-fuchsia-500 to-pink-500 text-white shadow-xl scale-110 border-fuchsia-300/60 ring-2 ring-fuchsia-200/40 drop-shadow-lg"
                  : "bg-white text-darkColor hover:bg-fuchsia-50 hover:text-fuchsia-700 hover:shadow-lg hover:scale-105"}
              `}
            >
              <span className="relative z-10 drop-shadow-sm">{item?.title}</span>
              {/* Glow for active tab */}
              {selectedTab === item?.title && (
                <span className="absolute inset-0 rounded-full bg-fuchsia-400/10 blur-md pointer-events-none animate-fade-in" />
              )}
            </button>
          ))}
        </div>
        <div className="relative group ml-3">
          <button
            className="border border-gray-200 px-3 py-2 rounded-full bg-white text-darkColor hover:bg-fuchsia-100 hover:text-fuchsia-700 hover:scale-110 hover:shadow-fuchsia-300/30 transition-all duration-200 shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400"
            aria-label="Refresh"
          >
            <Repeat className="w-5 h-5" />
          </button>
          <span className="absolute left-1/2 -bottom-8 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-gray-900 text-white text-xs rounded px-2 py-1 pointer-events-none transition-opacity duration-200 whitespace-nowrap shadow-lg z-20">
            Refresh
          </span>
        </div>
      </div>
      <style jsx>{`
        .tabbar-scrollbar-hide {
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE and Edge */
        }
        .tabbar-scrollbar-hide::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.7s cubic-bezier(.4,0,.2,1) both;
        }
      `}</style>
    </>
  );
};

export default HomeTabbar;