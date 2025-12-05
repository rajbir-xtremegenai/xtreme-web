'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { pageview, GA_MEASUREMENT_ID } from '../lib/gtag';
import Script from 'next/script';

const GoogleAnalytics = () => {
    const pathname = usePathname();
    const [consent, setConsent] = useState(false);

    useEffect(() => {
        const consentValue = localStorage.getItem('cookie_consent');
        setConsent(consentValue === 'true');
    }, []);

    useEffect(() => {
        if (!GA_MEASUREMENT_ID || typeof window === 'undefined' || !consent) {
            return;
        }
        const handleRouteChange = (url) => {
            pageview(url);
        };
        handleRouteChange(pathname);
    }, [pathname, consent]);

    if (!GA_MEASUREMENT_ID || !consent) {
        return null;
    }

    return (
        <>
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', '${GA_MEASUREMENT_ID}', {
                            send_page_view: false,
                        });
                    `,
                }}
            />
        </>
    );
};

export default GoogleAnalytics;
