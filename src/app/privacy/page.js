export async function generateMetadata() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  return {
    title: "Privacy Policy - CARSINUSA",
    description: "Read the privacy policy for CARSINUSA to understand how we collect, use, and protect your data.",
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: "Privacy Policy - CARSINUSA",
      description: "Our privacy policy outlines our commitment to protecting your personal information.",
      url: `${baseUrl}/privacy`,
      siteName: "CARSINUSA",
      type: "website",
    },
    alternates: {
      canonical: `${baseUrl}/privacy`,
    },
  };
}

export default function PrivacyPage() {
  return (
    <div className="container mx-auto p-4 md:p-8 lg:p-12">
      <div className="prose max-w-none text-gray-800">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">Privacy Policy for CarsInUSA</h1>
        <p className="text-center text-sm text-gray-600 mb-8">Effective Date: September 1, 2025</p>

        <p>
          This Privacy Policy describes how CarsInUSA (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects, uses, shares, and protects information when you visit our website at www.carsinusa.com (the &quot;Site&quot;). By accessing or using the Site, you agree to the terms of this Privacy Policy. If you do not agree, please do not use the Site. This policy may be updated from time to time, and your continued use of the Site after changes constitutes acceptance of those updates. We encourage you to review this policy periodically.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Scope</h2>
        <p>
          This Privacy Policy applies solely to information collected through the Site, including any mobile versions or related services. It does not apply to information collected offline, through third-party sites linked from our Site, or by any third parties, even if they are mentioned on our Site. The Site is not intended for children under the age of 18, and we do not knowingly collect personal information from them.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Information We Collect</h2>

        <h3 className="text-xl font-semibold mt-4 mb-1">Personal Information</h3>
        <p>
          We may collect personal information that you voluntarily provide, such as:
        </p>
        <ul className="list-disc list-inside ml-4">
          <li>Identifiers: Name, email address, postal address, phone number.</li>
          <li>Contact details when you submit inquiries via forms (e.g., contact us or newsletter subscriptions).</li>
          <li>Any other information you choose to provide in communications with us.</li>
        </ul>
        <p className="mt-2">
          We do not collect sensitive personal information (e.g., social security numbers, financial details, precise geolocation, racial or ethnic origin) unless explicitly provided by you for a specific purpose, and even then, only with your consent.
        </p>

        <h3 className="text-xl font-semibold mt-4 mb-1">Non-Personal Information</h3>
        <p>
          We automatically collect non-personal information, including:
        </p>
        <ul className="list-disc list-inside ml-4">
          <li>Device and usage data: IP address, browser type, operating system, referring URLs, pages viewed, time spent on pages, and clickstream data.</li>
          <li>Aggregated or anonymized data derived from user interactions for analytics purposes.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-4 mb-1">How We Collect It</h3>
        <ul className="list-disc list-inside ml-4">
          <li>Directly from You: Through forms, emails, or other interactions on the Site.</li>
          <li>Automatically: Using cookies, web beacons, server logs, and similar tracking technologies to analyze trends, administer the Site, and gather demographic information.</li>
          <li>From Third Parties: We may receive data from analytics providers (e.g., Google Analytics) or advertising networks to improve Site functionality and user experience. We do not collect data from social media unless you interact with embedded features.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Use of Information</h2>
        <p>
          We use the collected information for legitimate business purposes, including:
        </p>
        <ul className="list-disc list-inside ml-4">
          <li>Operating and improving the Site (e.g., responding to inquiries, customizing content).</li>
          <li>Sending administrative communications, such as updates to this policy.</li>
          <li>Analyzing usage patterns to enhance user experience and Site performance.</li>
          <li>Marketing and advertising, including targeted ads based on your interests (with opt-out options).</li>
          <li>Complying with legal obligations, preventing fraud, and protecting our rights.</li>
          <li>Any other purpose disclosed at the time of collection or with your consent.</li>
        </ul>
        <p className="mt-2">
          We retain information only as long as necessary for these purposes or as required by law, after which it is securely deleted or anonymized.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Sharing and Disclosure</h2>
        <p>
          We do not sell, rent, or share your personal information with third parties for their direct marketing purposes without your consent. We may share information:
        </p>
        <ul className="list-disc list-inside ml-4">
          <li>With service providers (e.g., hosting, analytics, email services) who are contractually obligated to use it only for providing services to us and to maintain confidentiality.</li>
          <li>In aggregated or de-identified form for research or analytics.</li>
          <li>To comply with legal processes, such as subpoenas, court orders, or to protect our rights, safety, or property.</li>
          <li>In the event of a merger, acquisition, or asset sale, where information may be transferred as a business asset.</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Cookies and Tracking Technologies</h2>
        <p>
          We use cookies and similar technologies (e.g., pixels, beacons) for essential functions (e.g., session management), performance analytics, and targeted advertising. Third-party services like Google Analytics may place cookies to track interactions. You can manage cookies through your browser settings, but disabling them may limit Site functionality. For interest-based ads, you can opt out via tools like the Network Advertising Initiative (NAI) opt-out page or Digital Advertising Alliance (DAA) opt-out page. We honor &quot;Do Not Track&quot; signals where applicable.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">User Choices and Rights</h2>
        <p>
          You have the following rights regarding your personal information:
        </p>
        <ul className="list-disc list-inside ml-4">
          <li>Access: Request details about the information we hold about you.</li>
          <li>Correction or Deletion: Request updates or deletion of your information.</li>
          <li>Opt-Out: Unsubscribe from marketing emails via the link in emails or by contacting us. Opt out of cookie-based tracking as described above.</li>
          <li>Limit Use of Sensitive Information: We do not use sensitive information for purposes beyond what&apos;s necessary, but you can request limitations.</li>
        </ul>
        <p className="mt-2">
          To exercise these rights, contact us at carsinusateam@gmail.com. We will respond within a reasonable timeframe, subject to verification of your identity. Residents of certain states (e.g., California under CCPA/CPRA) may have additional rights, such as opting out of &quot;sales&quot; or &quot;sharing&quot; of personal information (though we do not engage in monetary sales).
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Security</h2>
        <p>
          We implement reasonable administrative, technical, and physical safeguards to protect information from unauthorized access, loss, or misuse. However, no system is completely secure, and we cannot guarantee absolute security. You are responsible for protecting your own data and using secure connections.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Children&apos;s Privacy</h2>
        <p>
          The Site is not directed to children under 18. We do not knowingly collect personal information from children. If we become aware of such collection, we will delete it promptly. Parents or guardians who believe we have collected such information should contact us immediately.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">International Transfers</h2>
        <p>
          The Site is operated in the United States. If you access it from outside the U.S., your information may be transferred to and processed in the U.S., where data protection laws may differ. By using the Site, you consent to such transfers.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Changes to Policy</h2>
        <p>
          We may update this policy at any time. Changes will be posted on the Site with the updated effective date. Significant changes may be highlighted or notified via email if we have your address.
        </p>

        <h2 className="text-2xl font-semibold mt-6 mb-2">Contact Information</h2>
        <p>
          For questions, requests, or concerns about this Privacy Policy, contact:
          <br />
          CarsInUSA Team
          <br />
          <a href="mailto:carsinusateam@gmail.com" className="text-blue-600 hover:underline">carsinusateam@gmail.com</a>
        </p>
      </div>
    </div>
  );
}
