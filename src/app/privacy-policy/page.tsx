
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";

const SITE_URL = "https://www.elevateorbit.in";
const CONTACT_EMAIL = "elevateorbit.contribute@gmail.com";

export const metadata: Metadata = {
  title: "Privacy Policy | ELEVIT",
  description:
    "Read the ELEVIT Privacy Policy to understand how we collect, use, store and protect information when you use our engineering learning platform.",
  alternates: {
    canonical: `${SITE_URL}/privacy-policy`,
  },
  openGraph: {
    title: "Privacy Policy | ELEVIT",
    description:
      "Learn how ELEVIT handles your personal information and protects your privacy.",
    url: `${SITE_URL}/privacy-policy`,
    siteName: "ELEVIT – Elevate Orbit",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const sections = [
  {
    title: "1. Introduction",
    content: (
      <>
        Welcome to ELEVIT, an educational platform operated under the
        name Elevate Orbit ("ELEVIT", "we", "our" or "us").

        <p className="mt-3">
          Our website, available at elevateorbit.in, provides engineering
          study notes, educational resources, tutorials, student tools,
          learning materials and other academic resources.
        </p>

        <p className="mt-3">
          This Privacy Policy explains what information we collect,
          how we use it, when it may be shared and what choices are
          available to you when using our website and services.
        </p>

        <p className="mt-3">
          By using ELEVIT, you acknowledge that you have had the
          opportunity to read this policy. Where consent is legally
          required, we will seek it through an appropriate process.
        </p>
      </>
    ),
  },
  {
    title: "2. Information We Collect",
    content: (
      <>
        We may collect or process the following categories of information,
        depending on the features you use:

        <ul className="mt-4 list-disc space-y-3 pl-6">
          <li>
            <strong className="text-white">Account information:</strong>{" "}
            Your email address, display name, profile image and
            authentication-related information when you create an account
            or sign in using Firebase Authentication.
          </li>

          <li>
            <strong className="text-white">Information you submit:</strong>{" "}
            Information, messages, enquiries, files or other content
            voluntarily submitted through website forms, contribution
            features or upload functionality.
          </li>

          <li>
            <strong className="text-white">Usage information:</strong>{" "}
            Website pages visited, referring pages, browser and device
            information and analytics events used to understand website
            performance and usage.
          </li>

          <li>
            <strong className="text-white">Study preferences:</strong>{" "}
            Notes-reading progress, page preferences and similar settings
            that may be stored locally in your browser.
          </li>

          <li>
            <strong className="text-white">Technical information:</strong>{" "}
            Information processed by our hosting and infrastructure
            providers to operate, maintain and secure the website.
          </li>
        </ul>

        <p className="mt-4">
          Please avoid submitting passwords, financial details, sensitive
          personal information or confidential documents through general
          contact or upload features unless the relevant feature explicitly
          requires and securely supports such information.
        </p>
      </>
    ),
  },
  {
    title: "3. How We Use Information",
    content: (
      <>
        We may use information for the following purposes:

        <ul className="mt-4 list-disc space-y-2 pl-6">
          <li>Creating and managing student accounts.</li>
          <li>Providing educational content and learning resources.</li>
          <li>Supporting authentication and account functionality.</li>
          <li>Saving notes-reading preferences and study progress.</li>
          <li>Processing enquiries, contributions and file submissions.</li>
          <li>Understanding website usage and improving performance.</li>
          <li>Maintaining website security and preventing misuse.</li>
          <li>Communicating important service-related information.</li>
          <li>Meeting applicable legal obligations.</li>
        </ul>

        <p className="mt-4">
          We aim to collect and use only information reasonably necessary
          for the purposes described in this policy.
        </p>
      </>
    ),
  },
  {
    title: "4. Third-Party Services",
    content: (
      <>
        ELEVIT uses third-party services to provide certain website
        functionality. These providers may process information in
        accordance with their own privacy policies and applicable terms.

        <div className="mt-5 space-y-5">
          <div>
            <strong className="text-white">
              Firebase Authentication
            </strong>
            <p className="mt-1">
              Used to support account creation, authentication and
              student sign-in.
            </p>
            <a
              href="https://firebase.google.com/support/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-[#38DDF2] hover:underline"
            >
              Firebase Privacy Information →
            </a>
          </div>

          <div>
            <strong className="text-white">Vercel Analytics</strong>
            <p className="mt-1">
              Used to understand website traffic, page usage and
              performance so that we can improve ELEVIT.
            </p>
            <a
              href="https://vercel.com/docs/analytics/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-[#38DDF2] hover:underline"
            >
              Vercel Analytics Privacy Information →
            </a>
          </div>

          <div>
            <strong className="text-white">UploadThing</strong>
            <p className="mt-1">
              Used in connection with file-upload functionality.
              Files submitted through this feature may be processed
              and stored by UploadThing and its relevant infrastructure
              providers according to the service configuration.
            </p>
            <a
              href="https://uploadthing.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-[#38DDF2] hover:underline"
            >
              UploadThing Privacy Information →
            </a>
          </div>

          <div>
            <strong className="text-white">Vercel Hosting</strong>
            <p className="mt-1">
              Provides website hosting, deployment and infrastructure
              services.
            </p>
            <a
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-[#38DDF2] hover:underline"
            >
              Vercel Privacy Policy →
            </a>
          </div>
        </div>

        <p className="mt-5">
          We may introduce additional service providers as new ELEVIT
          features are developed. This policy will be updated when
          our data practices materially change.
        </p>
      </>
    ),
  },
  {
    title: "5. Cookies and Browser Storage",
    content: (
      <>
        ELEVIT may use cookies, local storage and similar technologies
        to support website functionality and understand usage.

        <ul className="mt-4 list-disc space-y-2 pl-6">
          <li>
            Local storage may save your notes-reading progress and
            preferences on your device.
          </li>
          <li>
            Authentication-related storage may support account sessions
            and sign-in functionality.
          </li>
          <li>
            Analytics technologies may process information about
            website visits and interactions.
          </li>
        </ul>

        <p className="mt-4">
          You can manage or clear browser storage through your browser
          settings. Clearing storage may remove locally saved study
          progress or affect website functionality.
        </p>

        <p className="mt-3">
          If advertising services are introduced, additional cookies
          or similar technologies may be used as explained in the
          advertising section of this policy.
        </p>
      </>
    ),
  },
  {
    title: "6. File Uploads and Contributions",
    content: (
      <>
        ELEVIT may provide facilities for users to submit files,
        educational material, suggestions or contributions.

        <p className="mt-3">
          When using these facilities:
        </p>

        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>
            Submit only files and information that you have permission
            to share.
          </li>
          <li>
            Avoid uploading passwords, financial information or
            unnecessary sensitive personal data.
          </li>
          <li>
            Do not upload copyrighted material without appropriate
            permission.
          </li>
          <li>
            Uploaded content may be processed by the third-party
            infrastructure used to provide the feature.
          </li>
        </ul>

        <p className="mt-4">
          If you want to enquire about a submitted file or request
          deletion, contact us using the email address provided below.
          Any deletion request will be handled subject to applicable
          law, technical limitations and legitimate retention needs.
        </p>
      </>
    ),
  },
  {
    title: "7. Advertising and Google AdSense",
    content: (
      <>
        ELEVIT does not currently display Google AdSense advertisements.

        <p className="mt-3">
          We may introduce advertising services in the future to
          support the maintenance and development of the platform.
        </p>

        <p className="mt-3">
          If Google AdSense or other advertising providers are
          introduced, those providers may use cookies, web beacons,
          IP addresses and similar technologies to serve, measure
          or personalise advertisements.
        </p>

        <p className="mt-3">
          Third-party advertising providers may place or read cookies
          on your browser and collect information as a result of
          advertisements displayed on ELEVIT.
        </p>

        <p className="mt-3">
          Where applicable, users will be provided with information
          about advertising technologies, relevant privacy choices
          and consent mechanisms required by law.
        </p>

        <p className="mt-3">
          This policy will be updated to identify the relevant
          advertising services and explain their data practices
          before advertising is activated.
        </p>

        <a
          href="https://policies.google.com/technologies/partner-sites"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block text-[#38DDF2] hover:underline"
        >
          How Google uses information from partner websites →
        </a>
      </>
    ),
  },
  {
    title: "8. Sharing of Information",
    content: (
      <>
        We do not sell personal information as part of our current
        operating practices.

        <p className="mt-3">
          Information may be shared with relevant service providers
          when necessary to operate authentication, hosting, analytics,
          file uploads and other website functionality.
        </p>

        <p className="mt-3">
          Information may also be disclosed where required by law,
          legal process or a valid governmental request, or where
          reasonably necessary to protect the rights, safety and
          security of ELEVIT and its users.
        </p>
      </>
    ),
  },
  {
    title: "9. Data Retention and Security",
    content: (
      <>
        We aim to retain personal information only for as long as
        reasonably necessary for the purposes for which it was
        collected, subject to applicable legal requirements.

        <p className="mt-3">
          Retention periods may differ depending on the type of
          information, the feature being used and the relevant
          service provider's configuration.
        </p>

        <p className="mt-3">
          We take reasonable measures intended to protect information
          against unauthorised access, loss, misuse or alteration.
        </p>

        <p className="mt-3">
          However, no method of electronic transmission or storage
          can be guaranteed to be completely secure.
        </p>
      </>
    ),
  },
  {
    title: "10. Your Privacy Choices and Requests",
    content: (
      <>
        Subject to applicable law, you may contact us to:

        <ul className="mt-4 list-disc space-y-2 pl-6">
          <li>Ask what personal information may be associated with you.</li>
          <li>Request correction of inaccurate information.</li>
          <li>Request deletion of personal information where applicable.</li>
          <li>Raise concerns about the handling of your information.</li>
          <li>Withdraw consent where consent is the applicable basis for processing.</li>
        </ul>

        <p className="mt-4">
          We may ask you to verify your identity before processing
          a request. Some information may need to be retained where
          required by law or for legitimate security purposes.
        </p>

        <p className="mt-3">
          You can send privacy-related requests to:
        </p>

        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="mt-2 inline-block font-medium text-[#38DDF2] hover:underline"
        >
          {CONTACT_EMAIL}
        </a>
      </>
    ),
  },
  {
    title: "11. Children's Privacy",
    content: (
      <>
        ELEVIT is an educational platform intended for students
        and general learners.

        <p className="mt-3">
          We do not knowingly collect children's personal information
          without meeting applicable legal requirements, including
          applicable parental consent requirements.
        </p>

        <p className="mt-3">
          If a parent or lawful guardian believes that a child has
          provided personal information inappropriately, they may
          contact us to request assistance.
        </p>
      </>
    ),
  },
  {
    title: "12. External Websites",
    content: (
      <>
        ELEVIT may contain links to external websites, educational
        platforms and third-party services.

        <p className="mt-3">
          We do not control the content, security or privacy practices
          of these external websites. Visiting them is subject to
          their own terms and privacy policies.
        </p>

        <p className="mt-3">
          We recommend reviewing the privacy policy of any external
          service before sharing personal information with it.
        </p>
      </>
    ),
  },
  {
    title: "13. Changes to This Privacy Policy",
    content: (
      <>
        We may update this Privacy Policy when our website features,
        services, data practices or applicable legal requirements change.

        <p className="mt-3">
          The latest version will be published on this page with
          an updated revision date.
        </p>

        <p className="mt-3">
          We encourage users to review this page periodically.
        </p>
      </>
    ),
  },
  {
    title: "14. Contact Information",
    content: (
      <>
        For privacy questions, account-related concerns, data requests
        or enquiries about this policy, contact the ELEVIT team.

        <div className="mt-4 rounded-xl border border-[#38DDF2]/15 bg-[#38DDF2]/[0.05] p-5">
          <p className="font-semibold text-white">
            ELEVIT – Elevate Orbit
          </p>

          <p className="mt-2 text-sm">
            Email:
          </p>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-1 inline-block break-all font-medium text-[#38DDF2] hover:underline"
          >
            {CONTACT_EMAIL}
          </a>

          <p className="mt-4 text-sm">
            Website:
          </p>

          <a
            href={SITE_URL}
            className="mt-1 inline-block text-[#38DDF2] hover:underline"
          >
            www.elevateorbit.in
          </a>
        </div>

        <p className="mt-4">
          You can also visit our{" "}
          <Link
            href="/contact"
            className="font-medium text-[#38DDF2] hover:underline"
          >
            Contact page
          </Link>{" "}
          for general enquiries.
        </p>
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070B16] text-[#F8FAFC]">
      {/* BACKGROUND */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-220px] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#4D9BF5]/[0.07] blur-[140px]" />

        <div className="absolute right-[-180px] top-[1000px] h-[400px] w-[400px] rounded-full bg-[#9B7BFF]/[0.05] blur-[140px]" />
      </div>

      <Navbar />

      {/* HEADER */}
      <section className="relative px-6 pb-12 pt-40 sm:pt-44">
        <div className="mx-auto max-w-5xl">
          <Link
            href="/"
            className="mb-9 inline-flex items-center gap-2 text-sm text-[#94A9C5] transition hover:text-[#38DDF2]"
          >
            <span aria-hidden="true">←</span>
            Back to Home
          </Link>

          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-[#38DDF2]">
            ELEVIT · LEGAL INFORMATION
          </p>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Privacy Policy
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-[#94A9C5] sm:text-lg">
            Your privacy matters to us. Learn how ELEVIT collects,
            uses and protects information when you use our
            engineering learning platform.
          </p>

          <p className="mt-5 text-sm text-[#718096]">
            Last updated: 5 November 2026
          </p>

          <div className="mt-10 h-px bg-gradient-to-r from-[#38DDF2]/30 via-white/[0.08] to-transparent" />
        </div>
      </section>

      {/* POLICY */}
      <section className="relative px-5 pb-24 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 rounded-2xl border border-[#38DDF2]/15 bg-[#38DDF2]/[0.04] p-5">
            <p className="text-sm leading-7 text-[#CBD5E1]">
              <strong className="text-[#38DDF2]">
                Your privacy is important.
              </strong>{" "}
              This policy explains the information practices associated
              with ELEVIT. Where applicable law requires consent,
              additional consent mechanisms will be provided.
            </p>
          </div>

          <div className="space-y-5">
            {sections.map((section) => (
              <article
                key={section.title}
                className="rounded-2xl border border-white/[0.07] bg-gradient-to-br from-[#141D30] to-[#101521] p-6 sm:p-8"
              >
                <h2 className="text-lg font-bold leading-relaxed text-white sm:text-xl">
                  {section.title}
                </h2>

                <div className="mt-4 text-sm leading-8 text-[#94A9C5] sm:text-base">
                  {section.content}
                </div>
              </article>
            ))}
          </div>

          <div className="mt-10 rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 text-center">
            <p className="text-sm leading-7 text-[#94A9C5]">
              Thank you for being part of ELEVIT.
            </p>

            <p className="mt-2 font-semibold text-[#38DDF2]">
              Learn. Build. Grow.
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative border-t border-white/[0.06] px-6 py-9">
        <div className="mx-auto max-w-7xl text-center">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-xs text-[#8292AC]">
            <Link href="/about" className="transition hover:text-[#38DDF2]">
              About
            </Link>

            <Link href="/contact" className="transition hover:text-[#38DDF2]">
              Contact
            </Link>

            <Link
              href="/privacy-policy"
              className="text-[#38DDF2]"
            >
              Privacy Policy
            </Link>
          </div>

          <p className="mt-5 text-sm text-[#718096]">
            <span className="font-semibold text-[#38DDF2]">
              ELEVIT
            </span>
            {" "}· By Elevate Orbit
          </p>

          <p className="mt-2 text-xs text-[#526078]">
            Learn. Build. Grow.
          </p>
        </div>
      </footer>
    </main>
  );
}
