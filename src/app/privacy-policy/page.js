export const metadata = {
  title: "Privacy Policy",
};

const sections = [
  {
    title: "1. Introduction",
    body: [
      `Xtreme Gen AI Private Limited ("Company," "we," "us," or "our") values your privacy and is committed to protecting your personal data in compliance with the Digital Personal Data Protection Act, 2023 ("DPDP Act") and other applicable laws in India.`,
    ],
  },
  {
    title: "2. Definitions",
    list: [
      "<strong>Personal Data:</strong> Any information that relates to an identified or identifiable individual.",
      "<strong>Processing:</strong> Any operation performed on personal data, such as collection, use, storage, sharing, or deletion.",
      "<strong>Data Principal:</strong> The individual to whom the personal data belongs.",
      "<strong>Data Fiduciary:</strong> The entity that determines the purpose and means of processing personal data.",
      "<strong>Data Protection Officer (DPO):</strong> The individual responsible for overseeing data protection compliance.",
    ],
  },
  {
    title: "3. Scope and Application",
    body: [
      "This Privacy Policy applies to all users, customers, clients, and other stakeholders who interact with Xtreme Gen AI through its website, applications, AI-powered tools, software solutions, and related services.",
    ],
    subSections: [
      {
        subTitle: "a) Who Does This Policy Apply To?",
        list: [
          "Website Visitors",
          "Registered Users and Customers",
          "Clients and Business Partners",
          "Third Parties and Vendors",
          "Employees and Job Applicants",
        ],
      },
      {
        subTitle: "b) What Types of Data Are Covered?",
        list: [
          "Personally Identifiable Information (PII)",
          "Technical and Usage Data",
          "AI Interaction Data",
          "Financial Information",
          "Communication Data",
          "Sensitive Personal Data (where applicable)",
        ],
      },
      {
        subTitle: "c) Where and How Do We Collect Data?",
        list: [
          "Direct interactions via website, applications, and customer support",
          "Automated data collection through cookies, analytics tools",
          "Third-party integrations",
          "Publicly available sources",
        ],
      },
    ],
  },
  {
    title: "4. Types of Personal Data Collected",
    body: ["We may collect various types of personal data, including but not limited to:"],
    list: [
      "Personally Identifiable Information (PII)",
      "Technical and Usage Data",
      "AI Interaction and User Content",
      "Communication Data",
      "Sensitive Personal Data",
    ],
  },
  {
    title: "5. Purpose of Data Collection",
    body: ["We collect and process personal data solely for purposes requested by our clients, including:"],
    list: ["Providing services", "Facilitating client requests", "Legal compliance", "Client communication"],
  },
  {
    title: "6. Legal Basis for Processing",
    list: ["Consent", "Contractual necessity", "Legal compliance", "Legitimate interest"],
  },
  {
    title: "7. Data Sharing and Disclosure",
    body: ["We do not share personal data with third-party marketing services. Data may be shared with:"],
    list: ["Trusted service providers", "Legal and regulatory authorities", "Business transfers"],
  },
  {
    title: "8. Data Security Measures",
    list: [
      "End-to-end encryption",
      "Secure servers with restricted access",
      "Periodic security audits",
      "Multi-factor authentication",
    ],
  },
  {
    title: "9. Data Retention Policy",
    body: [
      `We retain personal data only as long as necessary. Clients may request deletion by contacting <a href="mailto:peush@xtremegenai.com">peush@xtremegenai.com</a>.`,
    ],
  },
  {
    title: "10. User Rights Under the DPDP Act",
    list: [
      "Right to Access",
      "Right to Correction",
      "Right to Erasure",
      "Right to Data Portability",
      "Right to Withdraw Consent",
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[var(--color-bg-dark)]">
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 md:pb-24">
        <div className="rounded-2xl border border-white/5 bg-slate-900/70 p-6 shadow-xl backdrop-blur-md sm:p-10 lg:p-12">
          <header className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-slate-200">
              Xtreme Gen AI Private Limited
            </p>
            <h1 className="mt-3 text-3xl font-bold leading-tight text-transparent sm:text-4xl bg-gradient-to-r from-purple-500 via-violet-500 to-indigo-400 bg-clip-text">
              Privacy Policy
            </h1>
            <div className="mt-4 space-y-2 text-sm text-slate-200 sm:text-base">
              <p>
                <span className="font-semibold text-slate-100">Effective Date:</span> 19th Sep 2024
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

                {section.body?.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-4 text-sm leading-relaxed text-slate-200 sm:text-base"
                    dangerouslySetInnerHTML={{ __html: paragraph }}
                  />
                ))}

                {section.list && (
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-200 sm:text-base">
                    {section.list.map((item) => (
                      <li
                        key={item}
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
                    <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-200 sm:text-base">
                      {sub.list.map((item) => (
                        <li
                          key={item}
                          className="relative pl-5"
                          dangerouslySetInnerHTML={{
                            __html: `<span class="absolute left-0 top-1 text-purple-300">•</span>${item}`,
                          }}
                        />
                      ))}
                    </ul>
                  </div>
                ))}
              </article>
            ))}

            <article className="rounded-xl border border-white/5 bg-white/5 p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-purple-200 sm:text-2xl">11. Contact Information</h2>
              <div className="mt-4 space-y-2 text-sm leading-relaxed text-slate-200 sm:text-base">
                <p>For any questions, contact:</p>
                <p className="font-semibold text-purple-100">Data Protection Officer (DPO)</p>
                <p>
                  Email:{" "}
                  <a
                    href="mailto:peush@xtremegenai.com"
                    className="text-purple-300 underline decoration-purple-300/50 underline-offset-4 transition hover:text-purple-200"
                  >
                    peush@xtremegenai.com
                  </a>
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
