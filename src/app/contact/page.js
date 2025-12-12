"use client";

import { useEffect, useState } from "react";



const PHONE_NUMBERS = {
    IN: { label: "+91 99100 56588", note: "Sales & Partnerships (India)" },
    US: { label: "+1 229 351 1010", note: "Sales & Partnerships (US)" },
    DEFAULT: { label: "+1 229 351 1010", note: "Global" },
};

function detectRegion() {
    try {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone || "";
        const locale =
            typeof navigator !== "undefined"
                ? navigator.language || navigator.languages?.[0] || ""
                : "";

        const isIndiaTimezone =
            timezone.includes("Asia/Kolkata") || timezone.includes("Asia/Calcutta");
        const isIndiaLocale = locale.toLowerCase().includes("en-in") || locale.toLowerCase().includes("hi");

        if (isIndiaTimezone || isIndiaLocale) return "IN";
        return "US";
    } catch (error) {
        console.warn("Could not detect region:", error);
        return "DEFAULT";
    }
}

export default function ContactPage() {
    const [phone, setPhone] = useState(PHONE_NUMBERS.DEFAULT);
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        const region = detectRegion();
        setPhone(PHONE_NUMBERS[region] || PHONE_NUMBERS.DEFAULT);
        setIsReady(true);
    }, []);

    return (
        <section className="px-4 py-24 lg:py-28">
            <div className="mx-auto max-w-5xl rounded-2xl border border-white/5 bg-slate-900/70 p-6 shadow-xl backdrop-blur-md sm:p-10 lg:p-12">
                <header className="text-center">
                    <p className="text-sm font-semibold uppercase tracking-widest text-slate-200">
                        Xtreme Gen AI Private Limited
                    </p>
                    <h1 className="mt-3 text-3xl font-bold leading-tight text-transparent sm:text-4xl bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-400 bg-clip-text">
                        Contact Us
                    </h1>
                    <p className="mt-4 text-sm text-slate-200 sm:text-base">
                        We are here to help with product demos, partnerships, and support.
                    </p>
                </header>

                <div className="mt-12 grid gap-6 sm:grid-cols-2">
                    <article className="flex h-full flex-col gap-4 rounded-xl border border-white/5 bg-white/5 p-6 shadow-sm">
                        <div className="flex items-center gap-3">
                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/20 text-purple-200">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="h-5 w-5" fill="currentColor">
                                    <path d="M480-440v-360q0-17 11.5-28.5T520-840h280q17 0 28.5 11.5T840-800v200q0 17-11.5 28.5T800-560H600L480-440Zm80-200h200v-120H560v120Zm0 0v-120 120Zm238 520q-125 0-247-54.5T329-329Q229-429 174.5-551T120-798q0-18 12-30t30-12h162q14 0 25 9.5t13 22.5l26 140q2 16-1 27t-11 19l-97 98q20 37 47.5 71.5T387-386q31 31 65 57.5t72 48.5l94-94q9-9 23.5-13.5T670-390l138 28q14 4 23 14.5t9 23.5v162q0 18-12 30t-30 12ZM241-600l66-66-17-94h-89q5 41 14 81t26 79Zm358 358q39 17 79.5 27t81.5 13v-88l-94-19-67 67ZM241-600Zm358 358Z" />
                                </svg>
                            </span>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-purple-200">Call Us</p>
                                <p className="text-sm text-slate-200">Talk to our team</p>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-2xl font-semibold text-slate-100">
                                {isReady ? phone.label : "Detecting number..."}
                            </p>
                            <p className="text-sm text-slate-300">
                                {isReady ? phone.note : "Choosing the best line for you"}
                            </p>
                        </div>
                        <p className="text-xs text-slate-400">
                            Available Monday to Friday, 9:00 AM – 6:30 PM IST
                        </p>
                    </article>

                    <article className="flex h-full flex-col gap-4 rounded-xl border border-white/5 bg-white/5 p-6 shadow-sm">
                        <div className="flex items-center gap-3">
                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/20 text-purple-200">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="h-5 w-5" fill="currentColor">
                                    <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm320-280L160-640v400h640v-400L480-440Zm0-80 320-200H160l320 200ZM160-640v-80 480-400Z" />
                                </svg>
                            </span>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-purple-200">Email</p>
                                <p className="text-sm text-slate-200">For product demos & support</p>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <a
                                href="mailto:peush@xtremegenai.com"
                                className="text-lg font-semibold text-purple-200 underline decoration-purple-200/60 underline-offset-4 transition hover:text-purple-100"
                            >
                                peush@xtremegenai.com
                            </a>
                            <p className="text-sm text-slate-300">We reply within one business day</p>
                        </div>
                        <p className="text-xs text-slate-400">
                            Share your use case and team size to help us tailor the response.
                        </p>
                    </article>

                    <article className="flex h-full flex-col gap-4 rounded-xl border border-white/5 bg-white/5 p-6 shadow-sm">
                        <div className="flex items-center gap-3">
                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/20 text-purple-200">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="h-5 w-5" fill="currentColor">
                                    <path d="M480-480q33 0 56.5-23.5T560-560q0-33-23.5-56.5T480-640q-33 0-56.5 23.5T400-560q0 33 23.5 56.5T480-480Zm0 294q122-112 181-203.5T720-552q0-109-69.5-178.5T480-800q-101 0-170.5 69.5T240-552q0 71 59 162.5T480-186Zm0 106Q319-217 239.5-334.5T160-552q0-150 96.5-239T480-880q127 0 223.5 89T800-552q0 100-79.5 217.5T480-80Zm0-480Z" />
                                </svg>
                            </span>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-purple-200">Visit Us</p>
                                <p className="text-sm text-slate-200">Corporate Office</p>
                            </div>
                        </div>
                        <div className="space-y-1">
                            <p className="text-lg font-semibold text-slate-100">Xtreme Gen AI, 6th Floor, Good Earth Business Bay 1, Sector-58, Gurgaon, Haryana, 122102</p>
                            <p className="text-sm text-slate-300">Schedule a meeting with our team</p>
                        </div>
                        <p className="text-xs text-slate-400">
                            For on-site sessions, please email us to book a time slot.
                        </p>
                    </article>

                    <article className="flex h-full flex-col gap-4 rounded-xl border border-white/5 bg-white/5 p-6 shadow-sm">
                        <div className="flex items-center gap-3">
                            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-purple-500/20 text-purple-200">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" className="h-5 w-5" fill="currentColor">
                                    <path d="M240-120v-80h480v80H240Zm0-200v-80h480v80H240Zm0-200v-80h480v80H240Z" />
                                </svg>
                            </span>
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-purple-200">Resources</p>
                                <p className="text-sm text-slate-200">Support & Compliance</p>
                            </div>
                        </div>
                        <div className="space-y-2 text-sm text-slate-200">
                            <a
                                className="block font-semibold text-purple-200 underline decoration-purple-200/60 underline-offset-4 transition hover:text-purple-100"
                                href="/privacy-policy"
                            >
                                Privacy Policy
                            </a>
                            <a
                                className="block font-semibold text-purple-200 underline decoration-purple-200/60 underline-offset-4 transition hover:text-purple-100"
                                href="/terms"
                            >
                                Terms & Conditions
                            </a>
                        </div>
                        <p className="text-xs text-slate-400">
                            Review our policies before sharing data or integrating with our APIs.
                        </p>
                    </article>
                </div>
            </div>
        </section>
    );
}
