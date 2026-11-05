
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";

export const metadata: Metadata = {
  title: "Disclaimer | ELEVIT - Elevate Orbit",
  description:
    "Read the ELEVIT disclaimer covering educational content, accuracy, external links, intellectual property and website usage.",
  alternates: {
    canonical: "https://www.elevateorbit.in/disclaimer",
  },
};

const sections = [
  {
    title: "1. General Information",
    content: (
      <p>
        ELEVIT (Elevate Orbit) is an educational platform that provides
        engineering notes, study materials, articles, project information,
        technology resources and other learning content. The information
        available on this website is intended for general educational and
        informational purposes.
      </p>
    ),
  },
  {
    title: "2. Educational Purpose Only",
    content: (
      <p>
        The content published on ELEVIT is intended to support learning and
        academic preparation. It should not be treated as a substitute for
        official university materials, prescribed textbooks, faculty
        instructions, laboratory supervision or professional guidance.
        Students should refer to their institution's official syllabus and
        academic requirements.
      </p>
    ),
  },
  {
    title: "3. Accuracy and Completeness",
    content: (
      <p>
        We make reasonable efforts to provide useful and accurate educational
        information. However, we do not guarantee that all content is always
        complete, accurate, current or free from errors. Technical information,
        software, academic syllabi and technologies may change over time.
        Readers should independently verify important information before
        relying on it.
      </p>
    ),
  },
  {
    title: "4. Study Notes and Learning Resources",
    content: (
      <p>
        Study notes, handwritten materials, PDFs, explanations and other
        resources are provided to assist students. Differences may exist
        between these materials and the requirements of individual universities
        or examination boards. ELEVIT does not guarantee examination results,
        grades, academic performance or any particular learning outcome.
      </p>
    ),
  },
  {
    title: "5. Projects and Technical Information",
    content: (
      <p>
        Project descriptions, circuit diagrams, code examples, hardware
        instructions and technical demonstrations are shared for educational
        purposes. Actual results may vary depending on components, equipment,
        software versions and implementation conditions. Always follow
        appropriate safety precautions and consult qualified supervision
        before attempting electrical, electronic or hardware experiments.
      </p>
    ),
  },
  {
    title: "6. External Links",
    content: (
      <p>
        ELEVIT may contain links to external websites, tools, platforms and
        resources. These websites are operated by third parties. We do not
        control their content, availability, privacy practices or policies.
        Visiting external websites is at your own discretion.
      </p>
    ),
  },
  {
    title: "7. Third-Party Services and Advertising",
    content: (
      <p>
        ELEVIT may use third-party services for hosting, analytics,
        authentication, file uploads and advertising. These services may
        operate under their own terms, privacy policies and data practices.
        If advertising services such as Google AdSense are enabled, third-party
        vendors may use cookies or similar technologies as described in our
        Privacy Policy.
      </p>
    ),
  },
  {
    title: "8. Intellectual Property",
    content: (
      <p>
        Website branding, original written content, design elements and other
        materials created by ELEVIT are protected by applicable intellectual
        property laws. Third-party materials remain the property of their
        respective owners. If you believe material on this website infringes
        your rights, please contact us with relevant details.
      </p>
    ),
  },
  {
    title: "9. User Contributions",
    content: (
      <p>
        Resources, notes, articles or other materials submitted by users may
        be reviewed before publication. Contributors are responsible for
        ensuring they have the necessary rights and permissions to share their
        submissions. Please do not submit copyrighted or confidential
        materials without authorization.
      </p>
    ),
  },
  {
    title: "10. Limitation of Responsibility",
    content: (
      <p>
        To the extent permitted by applicable law, ELEVIT is not responsible
        for losses or damages arising from reliance on website content,
        interruptions in website availability, technical errors or the use
        of external services. Nothing in this disclaimer excludes liability
        that cannot legally be excluded.
      </p>
    ),
  },
  {
    title: "11. Changes to This Disclaimer",
    content: (
      <p>
        We may update this Disclaimer when website features, services or
        applicable requirements change. Any updated version will be published
        on this page with a revised date.
      </p>
    ),
  },
  {
    title: "12. Contact",
    content: (
      <p>
        If you have questions, concerns or requests relating to this
        Disclaimer or content published on ELEVIT, contact us at:
        {" "}
        <a
          href="mailto:elevateorbit.contribute@gmail.com"
          className="font-medium text-[#38DDF2] hover:text-white"
        >
          elevateorbit.contribute@gmail.com
        </a>
        .
      </p>
    ),
  },
];

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-[#070B16] text-[#F8FAFC]">
      <Navbar />

      <section className="relative overflow-hidden px-5 pb-20 pt-28 sm:px-8 sm:pt-36">
        <div className="pointer-events-none absolute left-1/2 top-10 h-80 w-80 -translate-x-1/2 rounded-full bg-[#38DDF2]/10 blur-[130px]" />

        <div className="relative mx-auto max-w-5xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#38DDF2]/20 bg-[#38DDF2]/5 px-4 py-2 text-sm text-[#38DDF2]">
            <span className="h-2 w-2 rounded-full bg-[#38DDF2]" />
            ELEVIT Legal Information
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Website <span className="text-[#38DDF2]">Disclaimer</span>
          </h1>

          <p className="mt-6 max-w-3xl text-base leading-8 text-[#94A9C5] sm:text-lg">
            Important information about the educational resources, technical
            content and services available on ELEVIT – Elevate Orbit.
          </p>

          <p className="mt-5 text-sm text-[#71829C]">
            Last updated: November 5, 2026
          </p>

          <div className="mt-12 rounded-2xl border border-[#38DDF2]/20 bg-[#141722] p-6 sm:p-8">
            <p className="text-sm leading-8 text-[#B4C5DC]">
              By accessing or using ELEVIT, you acknowledge that you have
              read and understood this Disclaimer. Please also review our
              Privacy Policy and Terms & Conditions to understand the
              applicable website policies.
            </p>
          </div>

          <div className="mt-10 space-y-5">
            {sections.map((section, index) => (
              <section
                key={section.title}
                className="rounded-2xl border border-white/[0.08] bg-[#101725] p-6 sm:p-8"
              >
                <h2 className="text-lg font-semibold text-white sm:text-xl">
                  {section.title}
                </h2>

                <div className="mt-4 text-sm leading-8 text-[#94A9C5] sm:text-base">
                  {section.content}
                </div>
              </section>
            ))}
          </div>

          <div className="mt-14 border-t border-white/10 pt-8">
            <h2 className="text-xl font-semibold">Explore ELEVIT</h2>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-4 text-sm">
              <Link href="/" className="text-[#38DDF2] hover:text-white">
                Home
              </Link>
              <Link href="/about" className="text-[#38DDF2] hover:text-white">
                About
              </Link>
              <Link href="/contact" className="text-[#38DDF2] hover:text-white">
                Contact
              </Link>
              <Link href="/privacy-policy" className="text-[#38DDF2] hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-[#38DDF2] hover:text-white">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
