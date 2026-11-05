
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";

const SITE_URL = "https://www.elevateorbit.in";
const CONTACT_EMAIL = "elevateorbit.contribute@gmail.com";

export const metadata: Metadata = {
  title: "Terms & Conditions | ELEVIT",
  description:
    "Read the Terms and Conditions governing the use of ELEVIT, its engineering study resources, educational content and student services.",
  alternates: {
    canonical: `${SITE_URL}/terms`,
  },
  openGraph: {
    title: "Terms & Conditions | ELEVIT",
    description:
      "Understand the terms and conditions for using the ELEVIT learning platform.",
    url: `${SITE_URL}/terms`,
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
    title: "1. Introduction and Acceptance",
    content: (
      <>
        Welcome to ELEVIT, an educational platform operated under the name
        Elevate Orbit ("ELEVIT", "we", "our" or "us").

        <p className="mt-3">
          These Terms and Conditions govern your access to and use of
          our website, available at elevateorbit.in, including its
          educational resources, engineering notes, articles, tools
          and other services.
        </p>

        <p className="mt-3">
          By accessing or using ELEVIT, you agree to these Terms and
          Conditions. If you do not agree with them, please discontinue
          using the website.
        </p>
      </>
    ),
  },
  {
    title: "2. Eligibility and User Responsibilities",
    content: (
      <>
        You agree to use ELEVIT responsibly and in accordance with
        applicable laws.

        <ul className="mt-4 list-disc space-y-2 pl-6">
          <li>Provide accurate information when using account features.</li>
          <li>Use the platform for lawful educational and informational purposes.</li>
          <li>Do not misuse, disrupt or attempt to damage website functionality.</li>
          <li>Do not attempt unauthorised access to accounts, servers or systems.</li>
          <li>Do not use the platform to distribute harmful, misleading or unlawful content.</li>
          <li>Respect the rights and privacy of other users.</li>
        </ul>
      </>
    ),
  },
  {
    title: "3. Educational Content and Study Materials",
    content: (
      <>
        ELEVIT provides educational resources, including engineering
        notes, study materials, articles, tutorials and other learning
        resources.

        <p className="mt-3">
          These materials are intended to support learning and academic
          preparation. They are provided for general educational and
          informational purposes.
        </p>

        <p className="mt-3">
          We make reasonable efforts to maintain useful and accurate
          content, but we do not guarantee that every resource is
          complete, error-free, current or suitable for every academic
          syllabus or examination.
        </p>

        <p className="mt-3">
          Users should verify important academic information with
          their official syllabus, textbooks, instructors and other
          authoritative educational sources.
        </p>
      </>
    ),
  },
  {
    title: "4. Intellectual Property Rights",
    content: (
      <>
        Unless otherwise stated, the ELEVIT website design, branding,
        original written content, graphics, software and other
        original materials are owned by or licensed to ELEVIT and
        are protected by applicable intellectual property laws.

        <p className="mt-3">
          You may access and use available educational materials
          for personal, non-commercial learning purposes.
        </p>

        <p className="mt-3">
          Unless you have permission or a legal right to do so,
          you must not:
        </p>

        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>Republish or commercially redistribute ELEVIT content.</li>
          <li>Copy or reproduce substantial portions of original website content.</li>
          <li>Remove copyright notices, branding or ownership information.</li>
          <li>Present ELEVIT's original work as your own.</li>
          <li>Use ELEVIT branding or materials in a misleading manner.</li>
        </ul>

        <p className="mt-4">
          Third-party materials remain subject to the rights and
          licences of their respective owners.
        </p>
      </>
    ),
  },
  {
    title: "5. User Accounts and Security",
    content: (
      <>
        Certain ELEVIT features may require you to create an account
        or sign in through Firebase Authentication.

        <p className="mt-3">
          You are responsible for maintaining the security of your
          account credentials and for activities carried out through
          your account, subject to applicable law.
        </p>

        <p className="mt-3">
          You should notify us if you suspect unauthorised access
          or misuse of your account.
        </p>

        <p className="mt-3">
          We may restrict or suspend access to accounts where
          reasonably necessary to protect the platform, its users
          or its services, subject to applicable law.
        </p>
      </>
    ),
  },
  {
    title: "6. User Submissions and Contributions",
    content: (
      <>
        ELEVIT may allow users to submit educational resources,
        files, suggestions, feedback or other contributions.

        <p className="mt-3">
          By submitting content, you confirm that:
        </p>

        <ul className="mt-3 list-disc space-y-2 pl-6">
          <li>You have the right or permission to submit the content.</li>
          <li>Your submission does not knowingly violate another person's rights.</li>
          <li>Your submission does not contain unlawful or harmful material.</li>
          <li>You have not included confidential information without authorisation.</li>
        </ul>

        <p className="mt-4">
          You retain ownership of content you own. By submitting
          content for consideration or publication, you grant ELEVIT
          permission to review and, where agreed or clearly indicated
          by the submission process, use that content for the relevant
          contribution purpose.
        </p>

        <p className="mt-3">
          Submission does not guarantee publication, acceptance,
          attribution or compensation.
        </p>
      </>
    ),
  },
  {
    title: "7. Prohibited Activities",
    content: (
      <>
        You must not use ELEVIT to:

        <ul className="mt-4 list-disc space-y-2 pl-6">
          <li>Violate applicable laws or regulations.</li>
          <li>Upload malware, malicious code or harmful files.</li>
          <li>Attempt to compromise website security.</li>
          <li>Scrape, overload or interfere with website infrastructure without permission.</li>
          <li>Impersonate another person or misrepresent your identity.</li>
          <li>Infringe copyright, trademarks or other intellectual property rights.</li>
          <li>Distribute spam, fraudulent content or abusive material.</li>
          <li>Use automated methods to misuse website features.</li>
        </ul>
      </>
    ),
  },
  {
    title: "8. Third-Party Services and External Links",
    content: (
      <>
        ELEVIT may rely on third-party services such as Firebase,
        Vercel, UploadThing and other providers to support website
        functionality.

        <p className="mt-3">
          Some features may also link to external websites or
          services.
        </p>

        <p className="mt-3">
          Third-party services are governed by their own terms,
          conditions and privacy policies. ELEVIT does not control
          all aspects of their operation and is not responsible
          for their independent practices.
        </p>
      </>
    ),
  },
  {
    title: "9. Availability and Changes to Services",
    content: (
      <>
        We aim to keep ELEVIT available and functioning properly.
        However, uninterrupted availability cannot be guaranteed.

        <p className="mt-3">
          We may update, modify, suspend or discontinue website
          features, content or services as the platform develops.
        </p>

        <p className="mt-3">
          We may also perform maintenance, security updates or
          technical changes that temporarily affect access.
        </p>
      </>
    ),
  },
  {
    title: "10. Advertising and Third-Party Promotions",
    content: (
      <>
        ELEVIT may introduce advertising or promotional services
        in the future to support the operation and development
        of the platform.

        <p className="mt-3">
          Advertisements, if introduced, may be provided by
          third-party advertising providers and may be subject
          to their own terms and policies.
        </p>

        <p className="mt-3">
          The presence of an advertisement does not necessarily
          constitute an endorsement or guarantee of the advertised
          product or service by ELEVIT.
        </p>
      </>
    ),
  },
  {
    title: "11. Disclaimer of Warranties",
    content: (
      <>
        ELEVIT is provided on an "as is" and "as available" basis,
        to the extent permitted by applicable law.

        <p className="mt-3">
          We do not guarantee that the website will always be
          available, uninterrupted, secure or free from errors.
        </p>

        <p className="mt-3">
          We make no blanket guarantee that educational materials
          will meet every user's academic, professional or
          examination requirements.
        </p>
      </>
    ),
  },
  {
    title: "12. Limitation of Liability",
    content: (
      <>
        To the extent permitted by applicable law, ELEVIT will
        not be liable for indirect, incidental or consequential
        losses arising from the use of, or inability to use,
        the website or its resources.

        <p className="mt-3">
          Nothing in these Terms excludes or limits liability
          that cannot legally be excluded or limited under
          applicable law.
        </p>
      </>
    ),
  },
  {
    title: "13. Privacy",
    content: (
      <>
        Your use of ELEVIT is also subject to our Privacy Policy,
        which explains how information may be collected, used
        and handled.

        <p className="mt-3">
          Please review our{" "}
          <Link
            href="/privacy-policy"
            className="font-medium text-[#38DDF2] hover:underline"
          >
            Privacy Policy
          </Link>{" "}
          for further information.
        </p>
      </>
    ),
  },
  {
    title: "14. Suspension and Termination",
    content: (
      <>
        We may restrict or suspend access to some or all website
        features if we reasonably believe that these Terms have
        been violated, the platform is being misused or security
        is at risk.

        <p className="mt-3">
          Where appropriate and legally permitted, we may provide
          notice or an opportunity to address the issue.
        </p>
      </>
    ),
  },
  {
    title: "15. Changes to These Terms",
    content: (
      <>
        We may revise these Terms and Conditions as ELEVIT
        develops or applicable legal requirements change.

        <p className="mt-3">
          Updated terms will be published on this page with
          a revised date.
        </p>

        <p className="mt-3">
          Continued use of ELEVIT after changes take effect
          will be subject to the updated terms, to the extent
          permitted by applicable law.
        </p>
      </>
    ),
  },
  {
    title: "16. Governing Law",
    content: (
      <>
        These Terms and Conditions are intended to be governed
        by the laws of India, subject to applicable conflict
        of law principles and mandatory consumer protection
        requirements.
      </>
    ),
  },
  {
    title: "17. Contact Information",
    content: (
      <>
        If you have questions about these Terms and Conditions,
        you can contact the ELEVIT team.

        <div className="mt-4 rounded-xl border border-[#38DDF2]/15 bg-[#38DDF2]/[0.05] p-5">
          <p className="font-semibold text-white">
            ELEVIT – Elevate Orbit
          </p>

          <p className="mt-3 text-sm">Email:</p>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-1 inline-block break-all font-medium text-[#38DDF2] hover:underline"
          >
            {CONTACT_EMAIL}
          </a>

          <p className="mt-3 text-sm">Website:</p>

          <a
            href={SITE_URL}
            className="mt-1 inline-block text-[#38DDF2] hover:underline"
          >
            www.elevateorbit.in
          </a>
        </div>
      </>
    ),
  },
];

export default function TermsPage() {
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
            Terms &amp; Conditions
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-[#94A9C5] sm:text-lg">
            Please read these terms carefully before using ELEVIT.
            They explain the rules and responsibilities associated
            with our educational platform and services.
          </p>

          <p className="mt-5 text-sm text-[#718096]">
            Last updated: 5 November 2026
          </p>

          <div className="mt-10 h-px bg-gradient-to-r from-[#38DDF2]/30 via-white/[0.08] to-transparent" />
        </div>
      </section>

      {/* TERMS CONTENT */}
      <section className="relative px-5 pb-24 sm:px-6">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 rounded-2xl border border-[#38DDF2]/15 bg-[#38DDF2]/[0.04] p-5">
            <p className="text-sm leading-7 text-[#CBD5E1]">
              <strong className="text-[#38DDF2]">
                Please use ELEVIT responsibly.
              </strong>{" "}
              These terms help maintain a useful, safe and respectful
              learning environment for everyone.
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
            <Link
              href="/about"
              className="transition hover:text-[#38DDF2]"
            >
              About
            </Link>

            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="transition hover:text-[#38DDF2]"
            >
              Contact
            </a>

            <Link
              href="/privacy-policy"
              className="transition hover:text-[#38DDF2]"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="text-[#38DDF2]"
            >
              Terms &amp; Conditions
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
