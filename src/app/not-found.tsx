import Link from "next/link";

const NotFound = () => {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center bg-[#111111] px-4 text-center text-white">
      <p className="text-7xl font-black text-[#ccff00]">404</p>

      <h1 className="mt-4 text-3xl font-black uppercase">
        Page Not Found
      </h1>

      <p className="mt-2 text-gray-400">
        Sorry, the page you are looking for does not exist.
      </p>

      <Link
        href="/"
        className="mt-6 rounded-full bg-[#ccff00] px-6 py-3 font-black uppercase text-black transition hover:scale-105"
      >
        Back to Home
      </Link>
    </main>
  );
};

export default NotFound;