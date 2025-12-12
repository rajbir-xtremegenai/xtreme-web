import React from "react";
import Link from "next/link";

function Footer() {
  return (
    <footer className="w-full py-10">
      <div className="mx-auto w-[95%] max-w-6xl rounded-2xl border border-white/10 bg-white/5 px-5 py-6 backdrop-blur-md opacity-80">
        <div className="flex flex-col items-center gap-3 text-center text-gray-300 md:flex-row md:items-center md:justify-between md:text-left">
          <p className="text-sm font-normal md:text-base">
            © Xtreme Gen AI 2025. All rights reserved.
          </p>

          <div className="flex flex-col items-center gap-2 text-xs md:flex-row md:gap-4 md:text-sm">
            <Link
              href="/privacy-policy"
              className="underline underline-offset-4 transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>

            <span className="flex items-center gap-2 text-gray-400">
              <span className="text-gray-500">Credits:</span>
              <a
                href="https://www.freepik.com/"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 transition-colors hover:text-white"
              >
                Freepik
              </a>
              <span className="text-gray-500">,</span>
              <a
                href="https://www.vecteezy.com/video/"
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4 transition-colors hover:text-white"
              >
                Vecteezy
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
