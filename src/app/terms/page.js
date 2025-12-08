export async function generateMetadata() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  return {
    title: "Terms and Conditions - CARSINUSA",
    description: "Read the terms and conditions for using the CARSINUSA website.",
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: "Terms and Conditions - CARSINUSA",
      description: "Our terms and conditions for using the CARSINUSA website.",
      url: `${baseUrl}/terms`,
      siteName: "CARSINUSA",
      type: "website",
    },
    alternates: {
      canonical: `${baseUrl}/terms`,
    },
  };
}

export default function TermsPage() {
  return (
    <div className="bg-white py-12 px-6 sm:px-8">
      <div className="container mx-auto max-w-4xl prose prose-lg text-gray-900">
        <h1>Terms and Conditions for XtremeGenAI</h1>
        <p><strong>Effective Date:</strong> September 1, 2025</p>
        <p>These Terms and Conditions (&quot;Terms&quot;) govern your access to and use of the website www.xtremegenai.com (the &quot;Site&quot;), operated by XtremeGenAI (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;). By accessing or using the Site, you agree to be bound by these Terms and our Privacy Policy. If you do not agree, do not use the Site. These Terms may be updated, and continued use after changes constitutes acceptance.</p>
        <h2>Acceptance of Terms</h2>
        <p>Your use of the Site constitutes acceptance of these Terms. You represent that you are at least 18 years old and legally capable of entering into this agreement. If using the Site on behalf of an entity, you warrant your authority to bind that entity.</p>
        <h2>Description of Service</h2>
        <p>The Site is a blog providing informational content about cars from popular brands, including specifications, features (e.g., interior, safety, exterior, comfort &amp; convenience), body dimensions &amp; capacity, engine and transmission details, and images. All content is for general informational and educational purposes only. We do not sell vehicles, facilitate transactions, or act as a dealer, broker, or agent for any brand. Content is compiled from publicly available sources and may include human-generated summaries or interpretations.</p>
        <h2>User Accounts</h2>
        <p>The Site does not currently require user accounts. If features like comments or subscriptions are added, you may need to provide accurate information and maintain security. You are responsible for all activities under your account.</p>
        <h2>Content Ownership and Intellectual Property</h2>
        <p>All original content on the Site (e.g., text, layouts, designs) is owned by us or our licensors and protected by copyright, trademark, and other intellectual property laws. Car information (e.g., specs, features) is factual data derived from public sources and is not claimed as proprietary. We do not use brand logos, slogans, or themes. Images are sourced from brand media sites intended for news, blogs, and influencers, used under fair use principles for informational purposes. We believe in good faith that our use of such images and factual data constitutes fair use or is otherwise permitted, but we will promptly remove any content upon receipt of a valid request or notice from the rights holder.</p>
        <p>You are granted a limited, non-exclusive, revocable, non-transferable license to access and view content for personal, non-commercial use. You may not copy, modify, distribute, sell, or create derivative works from Site content without our written permission. Any unauthorized use terminates this license.</p>
        <h2>Copyright Complaints (DMCA Policy)</h2>
        <p>We respect the intellectual property rights of others and comply with the Digital Millennium Copyright Act (DMCA), 17 U.S.C. &sect; 512. If you are a copyright owner or an agent thereof and believe that any content on the Site infringes upon your copyrights, you may submit a notification pursuant to the DMCA by providing our Designated Copyright Agent with the following information in writing:</p>
        <ul>
          <li>A physical or electronic signature of a person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
          <li>Identification of the copyrighted work claimed to have been infringed, or, if multiple copyrighted works at a single online site are covered by a single notification, a representative list of such works at that site.</li>
          <li>Identification of the material that is claimed to be infringing or to be the subject of infringing activity and that is to be removed or access to which is to be disabled, and information reasonably sufficient to permit us to locate the material.</li>
          <li>Information reasonably sufficient to permit us to contact the complaining party, such as an address, telephone number, and, if available, an electronic mail address at which the complaining party may be contacted.</li>
          <li>A statement that the complaining party has a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.</li>
          <li>A statement that the information in the notification is accurate, and under penalty of perjury, that the complaining party is authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
        </ul>
        <p>Notifications of claimed infringement should be sent to our Designated Copyright Agent:</p>
        <p>XtremeGenAI Team<br />carsinusateam@gmail.com</p>
        <p>We will respond expeditiously to remove or disable access to the allegedly infringing material. We may terminate or suspend access for users who are repeat infringers. If we remove or disable access to material in response to a notice, we will make reasonable attempts to notify the affected user. The user may then submit a counter-notification to our Designated Copyright Agent, which must include:</p>
        <ul>
          <li>The user&apos;s physical or electronic signature.</li>
          <li>Identification of the material that has been removed or to which access has been disabled and the location at which the material appeared before it was removed or access to it was disabled.</li>
          <li>A statement under penalty of perjury that the user has a good faith belief that the material was removed or disabled as a result of mistake or misidentification.</li>
          <li>The user&apos;s name, address, and telephone number(s).</li>
          <li>A statement that the user consents to the jurisdiction of the Federal District Court for the judicial district in which the address is located, or if the user&apos;s address is outside of the United States, for any judicial district in which we may be found, and that the user will accept service of process from the person who provided notification or an agent of such person.</li>
        </ul>
        <p>Upon receipt of a valid counter-notification, we will promptly provide the complaining party with a copy and inform them that we will replace the removed material or cease disabling access to it within 10-14 business days unless we receive notice that the complaining party has filed a court action seeking an injunction.</p>
        <h2>User-Generated Content</h2>
        <p>If the Site allows comments or submissions, you grant us a perpetual, irrevocable, royalty-free, worldwide license to use, modify, and display such content. You warrant that your content does not infringe third-party rights and is not unlawful, defamatory, or obscene. We may remove or edit content at our discretion but are not obligated to monitor it.</p>
        <h2>Prohibited Conduct</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use the Site for illegal purposes or in violation of laws.</li>
          <li>Copy, scrape, or harvest content systematically.</li>
          <li>Post harmful, false, or infringing material.</li>
          <li>Interfere with Site functionality (e.g., viruses, overloads).</li>
          <li>Impersonate others or misrepresent affiliations.</li>
          <li>Use content commercially without permission.</li>
        </ul>
        <p>Violations may result in access termination and legal action.</p>
        <h2>Disclaimers and Warranties</h2>
        <p>THE SITE AND ALL CONTENT ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO ACCURACY, COMPLETENESS, RELIABILITY, MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. WE DO NOT WARRANT THAT THE CONTENT IS ERROR-FREE, TIMELY, SECURE, OR UNINTERRUPTED.</p>
        <p>#CRUCIAL DISCLAIMER ON ACCURACY: THE INFORMATION PROVIDED BY CARSINUSA.COM IS FOR GENERAL INFORMATIONAL PURPOSES ONLY. WHILE WE STRIVE FOR ACCURACY, CAR INFORMATION (INCLUDING SPECIFICATIONS, FEATURES, DIMENSIONS, AND OTHER DATA) IS SOURCED FROM PUBLICLY AVAILABLE INFORMATION AND IS SUBJECT TO POTENTIAL HUMAN ERRORS IN TRANSCRIPTION, INTERPRETATION, OR UPDATES. THIS DATA MAY CONTAIN INACCURACIES, OMISSIONS, OR BE OUT OF DATE.</p>
        <p>UNDER NO CIRCUMSTANCE SHALL WE HAVE ANY LIABILITY TO YOU FOR ANY LOSS OR DAMAGE OF ANY KIND INCURRED AS A RESULT OF THE USE OF THE SITE OR RELIANCE ON ANY INFORMATION PROVIDED. YOUR USE OF THE SITE AND YOUR RELIANCE ON ANY INFORMATION IS SOLELY AT YOUR OWN RISK. YOU ARE STRONGLY ADVISED TO VERIFY ALL INFORMATION DIRECTLY WITH AN AUTHORIZED DEALERSHIP OR THE OFFICIAL MANUFACTURER BEFORE MAKING ANY DECISIONS.</p>
        <p>We are not affiliated with, endorsed by, or sponsored by any car brands mentioned. Content does not constitute official representations, professional advice, or endorsements. Images are used for illustrative and editorial purposes under fair use principles; we do not claim ownership and will remove any upon a valid request from a rights holder.</p>
        <h2>Limitation of Liability</h2>
        <p>TO THE MAXIMUM EXTENT PERMITTED BY LAW, WE, OUR AFFILIATES, OFFICERS, EMPLOYEES, AND AGENTS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES (INCLUDING LOST PROFITS, DATA, OR GOODWILL) ARISING FROM SITE USE, EVEN IF ADVISED OF THE POSSIBILITY. OUR TOTAL LIABILITY SHALL NOT EXCEED $100 OR THE AMOUNT YOU PAID US IN THE PRIOR 12 MONTHS, WHICHEVER IS GREATER.</p>
        <p>THIS LIMITATION APPLIES REGARDLESS OF LEGAL THEORY (CONTRACT, TORT, ETC.) AND EVEN IF A LIMITED REMEDY FAILS ITS ESSENTIAL PURPOSE. SOME JURISDICTIONS DO NOT ALLOW SUCH LIMITATIONS, SO THEY MAY NOT APPLY TO YOU.</p>
        <h2>Indemnification</h2>
        <p>You agree to indemnify, defend, and hold us harmless from any claims, losses, liabilities, damages, costs, and expenses (including attorneys&apos; fees) arising from your use of the Site, violation of these Terms, or infringement of third-party rights.</p>
        <h2>Termination</h2>
        <p>We may terminate or suspend your access to the Site at any time, without notice, for any reason, including violations of these Terms. Provisions that should survive termination (e.g., disclaimers, limitations, indemnification) will remain in effect.</p>
        <h2>Governing Law</h2>
        <p>These Terms are governed by the laws of the State of Delaware, USA, without regard to conflict of laws principles. You consent to the exclusive jurisdiction of courts in Delaware for any disputes.</p>
        <h2>Dispute Resolution</h2>
        <p>Any disputes arising from these Terms or Site use shall be resolved through binding arbitration in Delaware under the American Arbitration Association rules, rather than court, except for small claims or injunctive relief related to IP. No class actions; disputes are individual only.</p>
        <h2>Miscellaneous</h2>
        <p>These Terms constitute the entire agreement between you and us. If any provision is unenforceable, the remainder remains valid. Our failure to enforce a right does not waive it. You may not assign these Terms; we may assign them freely.</p>
        <h2>Changes to Terms</h2>
        <p>We may update these Terms at any time. Changes will be posted with the updated effective date. Significant changes may be notified prominently.</p>
        <h2>Contact Information</h2>
        <p>For questions about these Terms, contact:<br />XtremeGenAI Team<br />carsinusateam@gmail.com</p>
      </div>
    </div>
  );
}
