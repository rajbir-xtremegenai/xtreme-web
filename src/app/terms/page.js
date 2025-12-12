export async function generateMetadata() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  return {
    title: "Terms and Conditions - Xtreme Gen AI",
    description: "Read the terms and conditions for using Xtreme Gen AI's website, services, and AI-powered solutions.",
    // metadataBase: new URL(baseUrl),
    openGraph: {
      title: "Terms and Conditions - Xtreme Gen AI",
      description: "Our terms and conditions for using the Xtreme Gen AI website and services.",
      url: `${baseUrl}/terms`,
      siteName: "Xtreme Gen AI",
      type: "website",
    },
    alternates: {
      canonical: `${baseUrl}/terms`,
    },
  };
}

const sections = [
  {
    title: "1. Introduction",
    body: [
      `Welcome to Xtreme Gen AI Private Limited ("Company," "we," "us," or "our"). These Terms and Conditions ("Terms") govern your access to and use of our website located at <a href="https://xtremegenai.com" class="text-purple-300 underline decoration-purple-300/50 underline-offset-4 transition hover:text-purple-200">https://xtremegenai.com</a>, our AI-powered tools, software solutions, applications, and related services (collectively, the "Services").`,
      `By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, please do not use our Services.`,
    ],
  },
  {
    title: "2. Acceptance of Terms",
    body: [
      "By accessing, browsing, or using our Services, you acknowledge that you have read, understood, and agree to be bound by these Terms and all applicable laws and regulations. If you are using our Services on behalf of an organization, you represent and warrant that you have the authority to bind that organization to these Terms.",
    ],
  },
  {
    title: "3. Eligibility",
    body: [
      "You must be at least 18 years old or the age of majority in your jurisdiction to use our Services. By using our Services, you represent and warrant that:",
    ],
    list: [
      "You are at least 18 years old",
      "You have the legal capacity to enter into a binding agreement",
      "You will comply with all applicable laws and regulations",
      "You will not use our Services for any illegal or unauthorized purpose",
    ],
  },
  {
    title: "4. Description of Services",
    body: [
      "Xtreme Gen AI provides AI-powered tools, software solutions, content creation services, customer support solutions, data entry services, and related technology services. We reserve the right to modify, suspend, or discontinue any aspect of our Services at any time without prior notice.",
    ],
  },
  {
    title: "5. User Accounts and Registration",
    subSections: [
      {
        subTitle: "a) Account Creation",
        list: [
          "You may be required to create an account to access certain features of our Services",
          "You agree to provide accurate, current, and complete information during registration",
          "You are responsible for maintaining the confidentiality of your account credentials",
          "You agree to notify us immediately of any unauthorized access to your account",
        ],
      },
      {
        subTitle: "b) Account Security",
        list: [
          "You are solely responsible for all activities that occur under your account",
          "You must use a strong, unique password for your account",
          "You must not share your account credentials with any third party",
          "We are not liable for any loss or damage arising from unauthorized use of your account",
        ],
      },
    ],
  },
  {
    title: "6. Acceptable Use Policy",
    body: [
      "You agree not to use our Services in any way that:",
    ],
    list: [
      "Violates any applicable laws, regulations, or third-party rights",
      "Infringes upon intellectual property rights of others",
      "Is fraudulent, deceptive, or misleading",
      "Transmits malicious code, viruses, or harmful software",
      "Attempts to gain unauthorized access to our systems or networks",
      "Interferes with or disrupts the Services or servers connected to the Services",
      "Uses automated systems to access the Services without our prior written consent",
      "Collects or stores personal data about other users without their consent",
      "Impersonates any person or entity or misrepresents your affiliation with any person or entity",
      "Is used for any illegal or unauthorized purpose",
    ],
  },
  {
    title: "7. Intellectual Property Rights",
    subSections: [
      {
        subTitle: "a) Our Intellectual Property",
        list: [
          "All content, features, functionality, and technology of our Services are owned by Xtreme Gen AI or its licensors",
          "This includes but is not limited to text, graphics, logos, icons, images, audio clips, software, and code",
          "Our Services are protected by copyright, trademark, patent, and other intellectual property laws",
          "You may not copy, modify, distribute, sell, or lease any part of our Services without our prior written consent",
        ],
      },
      {
        subTitle: "b) Your Content",
        list: [
          "You retain ownership of any content you submit, post, or display through our Services",
          "By submitting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and distribute your content as necessary to provide the Services",
          "You represent and warrant that you have all necessary rights to grant us this license",
          "You are solely responsible for the content you submit and its accuracy",
        ],
      },
    ],
  },
  {
    title: "8. AI-Generated Content",
    body: [
      "Our Services may utilize artificial intelligence to generate content. You understand and agree that:",
    ],
    list: [
      "AI-generated content may not always be accurate, complete, or error-free",
      "You are responsible for reviewing and verifying any AI-generated content before use",
      "We do not guarantee the accuracy, completeness, or suitability of AI-generated content",
      "You may not use AI-generated content in a way that violates applicable laws or third-party rights",
      "AI-generated content should not be used as a substitute for professional advice",
    ],
  },
  {
    title: "9. Fees and Payment",
    subSections: [
      {
        subTitle: "a) Pricing",
        list: [
          "Some Services may require payment of fees as specified on our website or in a separate agreement",
          "We reserve the right to modify our pricing at any time with reasonable notice",
          "All fees are quoted in the currency specified at the time of purchase",
        ],
      },
      {
        subTitle: "b) Payment Terms",
        list: [
          "Payment terms will be specified in your service agreement or invoice",
          "You agree to pay all applicable fees in accordance with the payment terms",
          "All fees are non-refundable unless otherwise specified or required by law",
          "We reserve the right to suspend or terminate Services for non-payment",
        ],
      },
      {
        subTitle: "c) Taxes",
        list: [
          "You are responsible for paying all applicable taxes, duties, and fees",
          "All prices are exclusive of applicable taxes unless otherwise stated",
        ],
      },
    ],
  },
  {
    title: "10. Privacy and Data Protection",
    body: [
      "Your use of our Services is also governed by our Privacy Policy, which is incorporated into these Terms by reference. By using our Services, you consent to the collection, use, and disclosure of your information as described in our Privacy Policy.",
    ],
  },
  {
    title: "11. Third-Party Services and Links",
    body: [
      "Our Services may contain links to third-party websites, services, or resources. We are not responsible for the availability, accuracy, or content of such third-party services. Your interactions with third-party services are solely between you and the third party.",
    ],
  },
  {
    title: "12. Disclaimers and Warranties",
    body: [
      "TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, OUR SERVICES ARE PROVIDED \"AS IS\" AND \"AS AVAILABLE\" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR ACCURACY.",
      "We do not warrant that our Services will be uninterrupted, error-free, secure, or free from viruses or other harmful components. We do not guarantee the accuracy, completeness, or reliability of any content or information provided through our Services.",
    ],
  },
  {
    title: "13. Limitation of Liability",
    body: [
      "TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL XTREME GEN AI, ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF OUR SERVICES.",
      "Our total liability for any claims arising out of or related to these Terms or our Services shall not exceed the amount you paid us in the twelve (12) months preceding the claim, or one hundred dollars ($100), whichever is greater.",
    ],
  },
  {
    title: "14. Indemnification",
    body: [
      "You agree to indemnify, defend, and hold harmless Xtreme Gen AI, its officers, directors, employees, agents, and affiliates from and against any and all claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys' fees) arising out of or related to:",
    ],
    list: [
      "Your use of our Services",
      "Your violation of these Terms",
      "Your violation of any applicable laws or regulations",
      "Your infringement of any third-party rights",
      "Any content you submit, post, or transmit through our Services",
    ],
  },
  {
    title: "15. Termination",
    subSections: [
      {
        subTitle: "a) Termination by You",
        list: [
          "You may stop using our Services at any time",
          "You may close your account at any time by contacting us",
        ],
      },
      {
        subTitle: "b) Termination by Us",
        list: [
          "We may suspend or terminate your access to our Services at any time, with or without cause or notice",
          "We may terminate your access if you violate these Terms or engage in fraudulent, illegal, or harmful activities",
          "Upon termination, your right to use the Services will immediately cease",
        ],
      },
      {
        subTitle: "c) Effect of Termination",
        list: [
          "Upon termination, all rights granted to you under these Terms will immediately cease",
          "Sections of these Terms that by their nature should survive termination will survive, including but not limited to intellectual property rights, disclaimers, limitation of liability, and indemnification",
        ],
      },
    ],
  },
  {
    title: "16. Modifications to Terms",
    body: [
      "We reserve the right to modify these Terms at any time. We will provide notice of material changes by posting the updated Terms on our website and updating the \"Last Updated\" date. Your continued use of our Services after such modifications constitutes your acceptance of the updated Terms.",
    ],
  },
  {
    title: "17. Governing Law and Dispute Resolution",
    subSections: [
      {
        subTitle: "a) Governing Law",
        list: [
          "These Terms shall be governed by and construed in accordance with the laws of India",
          "Any disputes arising out of or relating to these Terms shall be subject to the exclusive jurisdiction of the courts located in India",
        ],
      },
      {
        subTitle: "b) Dispute Resolution",
        list: [
          "In the event of any dispute, you agree to first contact us to attempt to resolve the dispute informally",
          "If we are unable to resolve the dispute informally, it shall be resolved through binding arbitration in accordance with the Arbitration and Conciliation Act, 2015",
          "Notwithstanding the above, we may seek injunctive relief in any court of competent jurisdiction to protect our intellectual property rights",
        ],
      },
    ],
  },
  {
    title: "18. Severability",
    body: [
      "If any provision of these Terms is found to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect. The invalid, illegal, or unenforceable provision shall be modified to the minimum extent necessary to make it valid, legal, and enforceable.",
    ],
  },
  {
    title: "19. Entire Agreement",
    body: [
      "These Terms, together with our Privacy Policy and any other legal notices published by us on our website, constitute the entire agreement between you and Xtreme Gen AI regarding your use of our Services and supersede all prior or contemporaneous communications and proposals, whether oral or written, between you and Xtreme Gen AI.",
    ],
  },
  {
    title: "20. Waiver",
    body: [
      "Our failure to enforce any right or provision of these Terms shall not constitute a waiver of such right or provision. Any waiver of any provision of these Terms will be effective only if in writing and signed by an authorized representative of Xtreme Gen AI.",
    ],
  },
];

export default function TermsPage() {
  return (
    <section className="px-4 py-24 lg:py-28">
      <div className="mx-auto max-w-5xl rounded-2xl border border-white/5 bg-slate-900/70 p-6 shadow-xl backdrop-blur-md sm:p-10 lg:p-12">
        <header className="text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-slate-200">
            Xtreme Gen AI Private Limited
          </p>
          <h1 className="mt-3 text-3xl font-bold leading-tight text-transparent sm:text-4xl bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-400 bg-clip-text">
            Terms and Conditions
          </h1>
          <div className="mt-4 space-y-2 text-sm text-slate-200 sm:text-base">
            
            <p>
              <span className="font-semibold text-slate-100">Last Updated:</span> 19th Sep 2024
            </p>
            <p>
              <span className="font-semibold text-slate-100">Website:</span>{" "}
              <a
                href="https://xtremegenai.com"
                className="text-purple-300 underline decoration-purple-300/50 underline-offset-4 transition hover:text-purple-200"
              >
                https://xtremegenai.com
              </a>
            </p>
          </div>
        </header>

        <div className="mt-12 space-y-10 text-slate-100">
          {sections.map((section) => (
            <article key={section.title} className="rounded-xl border border-white/5 bg-white/5 p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-purple-200 sm:text-2xl">{section.title}</h2>

              {section.body?.map((paragraph, index) => (
                <p
                  key={index}
                  className="mt-4 text-sm leading-relaxed text-slate-200 sm:text-base"
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              ))}

              {section.list && (
                <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-200 sm:text-base">
                  {section.list.map((item, index) => (
                    <li
                      key={index}
                      className="relative pl-5"
                      dangerouslySetInnerHTML={{
                        __html: `<span class="absolute left-0 top-1 text-purple-300">•</span>${item}`,
                      }}
                    />
                  ))}
                </ul>
              )}

              {section.subSections?.map((sub) => (
                <div key={sub.subTitle} className="mt-6 rounded-lg border border-white/5 bg-slate-900/40 p-4">
                  <h3 className="text-lg font-semibold text-purple-100">{sub.subTitle}</h3>
                  {sub.body && (
                    <div className="mt-3 space-y-2 text-sm leading-relaxed text-slate-200 sm:text-base">
                      {sub.body.map((paragraph, index) => (
                        <p
                          key={index}
                          dangerouslySetInnerHTML={{ __html: paragraph }}
                        />
                      ))}
                    </div>
                  )}
                  {sub.list && (
                    <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-200 sm:text-base">
                      {sub.list.map((item, index) => (
                        <li
                          key={index}
                          className="relative pl-5"
                          dangerouslySetInnerHTML={{
                            __html: `<span class="absolute left-0 top-1 text-purple-300">•</span>${item}`,
                          }}
                        />
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </article>
          ))}

          <article className="rounded-xl border border-white/5 bg-white/5 p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-purple-200 sm:text-2xl">21. Contact Information</h2>
            <div className="mt-4 space-y-2 text-sm leading-relaxed text-slate-200 sm:text-base">
              <p>If you have any questions, concerns, or requests regarding these Terms, please contact us:</p>
              <p className="font-semibold text-purple-100">Xtreme Gen AI Private Limited</p>
              <p>
                Email:{" "}
                <a
                  href="mailto:peush@xtremegenai.com"
                  className="text-purple-300 underline decoration-purple-300/50 underline-offset-4 transition hover:text-purple-200"
                >
                  peush@xtremegenai.com
                </a>
              </p>
              <p>
                Website:{" "}
                <a
                  href="https://xtremegenai.com"
                  className="text-purple-300 underline decoration-purple-300/50 underline-offset-4 transition hover:text-purple-200"
                >
                  https://xtremegenai.com
                </a>
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
