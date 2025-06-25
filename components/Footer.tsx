import Link from "next/link";
import Logo from "@/components/new/Logo";
import FooterTop from "./new/FooterTop";
import SocialMedia from "@/components/new/SocialMedia";
import { categoriesData, quickLinksData } from "@/constants";

const Footer = () => {
  return (
    <footer
      className="relative overflow-hidden backdrop-blur-xl bg-white/70 dark:bg-neutral-900/80 shadow-2xl border-0 rounded-t-3xl mt-8 sm:mt-16"
      style={{
        boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
      }}
    >
      {/* Animated gradient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 animate-gradient-move"
        style={{
          background:
            "linear-gradient(120deg, rgba(255,255,255,0.2) 0%, rgba(0,184,255,0.08) 50%, rgba(255,0,184,0.08) 100%)",
          filter: "blur(32px)",
        }}
      />
      <style>{`
        .animate-gradient-move {
          background-size: 200% 200%;
          animation: gradientMove 8s ease-in-out infinite;
        }
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .footer-link {
          position: relative;
          transition: color 0.2s, font-weight 0.2s;
        }
        .footer-link:after {
          content: '';
          position: absolute;
          left: 0; right: 0; bottom: -2px;
          height: 2px;
          background: linear-gradient(90deg, #00b8ff 0%, #ff00b8 100%);
          opacity: 0;
          transition: opacity 0.2s, transform 0.2s;
          transform: scaleX(0.7);
        }
        .footer-link:hover, .footer-link:focus {
          color: #111827 !important;
          font-weight: 600;
        }
        .footer-link:hover:after, .footer-link:focus:after {
          opacity: 1;
          transform: scaleX(1);
        }
        .footer-newsletter-input {
          background: rgba(255,255,255,0.7);
          border: none;
          box-shadow: 0 2px 8px 0 rgba(0,0,0,0.04);
          transition: box-shadow 0.2s, background 0.2s;
        }
        .footer-newsletter-input:focus {
          background: #fff;
          box-shadow: 0 4px 16px 0 rgba(0,184,255,0.10);
        }
        .footer-newsletter-btn {
          background: linear-gradient(90deg, #00b8ff 0%, #ff00b8 100%);
          color: #fff;
          font-weight: 600;
          box-shadow: 0 2px 8px 0 rgba(0,0,0,0.04);
          transition: background 0.2s, box-shadow 0.2s;
        }
        .footer-newsletter-btn:hover {
          background: linear-gradient(90deg, #ff00b8 0%, #00b8ff 100%);
          box-shadow: 0 4px 16px 0 rgba(0,184,255,0.10);
        }
      `}</style>
      <div className="relative z-10 mx-auto w-full max-w-7xl px-2 sm:px-4 md:px-6 lg:px-8">
        {/* Top section with contact info */}
        <FooterTop />

        {/* Main footer content */}
        <div className="py-8 sm:py-14 grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4 sm:space-y-5 flex flex-col items-center sm:items-start text-center sm:text-left">
            <Logo className="text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-fuchsia-500 to-pink-500 drop-shadow-lg">
              E-commerce
            </Logo>
            <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base leading-relaxed font-medium mt-2">
              Elevate Your Style with the Best in Fashion
              <br />
              Discover top fashion and lifestyle brands curated to help you look your best and feel confident — all in one place.
            </p>
            <SocialMedia
              className="text-darkColor/70 flex justify-center sm:justify-start"
              iconClassName="border-0 shadow-none hover:shadow-[0_0_12px_#00b8ff,0_0_24px_#ff00b8] hover:text-fuchsia-500 transition-all duration-200"
              tooltipClassName="bg-darkColor text-white"
            />
          </div>
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 sm:mb-5 text-base sm:text-lg tracking-wide">
              Quick Links
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinksData?.map((item) => (
                <li key={item?.title}>
                  <Link
                    href={item?.href}
                    className="footer-link text-gray-600 dark:text-gray-300 text-sm sm:text-base font-medium"
                  >
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 sm:mb-5 text-base sm:text-lg tracking-wide">
              Categories
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              {categoriesData.map((item) => (
                <li key={item?.title}>
                  <Link
                    href={`/category${item?.href}`}
                    className="footer-link text-gray-600 dark:text-gray-300 text-sm sm:text-base font-medium"
                  >
                    {item?.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 sm:mb-5 text-base sm:text-lg tracking-wide">
              Newsletter
            </h3>
            <p className="text-gray-700 dark:text-gray-300 text-sm sm:text-base mb-2 sm:mb-4 font-medium">
              Subscribe to our newsletter to receive updates and exclusive offers.
            </p>
            <form className="space-y-2 sm:space-y-3 w-full max-w-xs mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                required
                className="footer-newsletter-input w-full px-3 py-2 rounded-xl focus:outline-none text-sm sm:text-base"
              />
              <button
                type="submit"
                className="footer-newsletter-btn w-full px-3 py-2 rounded-xl transition-colors text-sm sm:text-base"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        {/* Bottom copyright section */}
        <div className="py-4 sm:py-6 border-t-0 text-center text-xs sm:text-base text-gray-500 dark:text-gray-400 font-medium tracking-wide">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="font-bold text-gray-900 dark:text-white">E-commerce</span>. All rights reserved. Crafted with ❤ by Kritam Ban
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;