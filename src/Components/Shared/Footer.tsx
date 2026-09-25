import Image from "next/image";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-[#0b0b0b] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
        
        {/* Left - Brand */}
        <div className="flex items-center gap-2">
          <Image
            src={logo}
            alt="FitLog Logo"
            width={36}
            height={36}
            className="h-8 w-8 object-contain"
          />

          <span className="text-xl font-black tracking-wider">
            FIT<span className="text-[#ccff00]">LOG</span>
          </span>
        </div>

        {/* Right - Copyright */}
        <p className="text-center text-xs text-gray-400 sm:text-right sm:text-sm">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
};

export default Footer;