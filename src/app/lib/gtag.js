// src/lib/gtag.js
export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID || "";
export const IS_DEBUG_MODE = process.env.NEXT_PUBLIC_DEBUG_MODE === "true";

const hasConsent = () => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem('cookie_consent') === 'true';
}

export const pageview = (url) => {
    if (typeof window === "undefined" || !window.gtag || !GA_MEASUREMENT_ID || !hasConsent()) return;

    window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: url,
        send_page_view: false, // Page views are tracked manually
        debug_mode: IS_DEBUG_MODE,
    });
};


export const event = ({ action, params }) => {
    if (typeof window === "undefined" || !window.gtag || !GA_MEASUREMENT_ID || !hasConsent()) return;
    window.gtag("event", action, params);
};
