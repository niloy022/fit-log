
import Link from "next/link";
import Image from "next/image";
import banner from "@/assets/banner.png";

const Banner = () => {
  return (
    <section className="bg-[#0b0b0b] px-4 py-12 text-white sm:px-6 md:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2 lg:gap-16">

        {/* Left Content */}
        <div className="order-2 lg:order-1">

          {/* Eyebrow */}
          <p className="mb-4 text-sm font-bold tracking-[0.25em] text-[#ccff00]">
            WORKOUT LIBRARY
          </p>

          {/* Heading */}
          <div className="order-1 ">
            <h1 className="max-w-3xl text-4xl font-black uppercase leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
            TRAIN WITH INTENT.
            <br />
            LOG EVERY SET.
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-xl text-base leading-7 text-gray-400 sm:text-lg">
            FitLog is a dark, no-nonsense gym companion: pick a lift,
            lock it into today&apos;s plan, and watch the week&apos;s work
            add up.
          </p>

          {/* CTA */}
          <Link
            href="#library"
            className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-[#ccff00] px-5 py-3 text-sm font-black uppercase tracking-wide text-black transition hover:scale-105 hover:bg-[#b8e600]"
          >
            Browse Workouts

            <span className="text-lg">→</span>
          </Link>
        </div>
</div>
 
        {/* Right Image */}
       <div className="order-2">
          <div className="relative overflow-hidden">
            <Image 
            src={banner} 
            alt="FitLog workout banner" width={1200} height={600} priority className="w-full h-auto object-contain max-h-[500]" />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to- from-black/40 to-transparent" />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Banner;

