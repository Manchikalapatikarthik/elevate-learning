
import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "../components/Navbar";

const CONTACT_EMAIL = "elevateorbit.contribute@gmail.com";

export const metadata: Metadata = {
  title: "Contact ELEVIT | Elevate Orbit",
  description:
    "Get in touch with ELEVIT for general enquiries, privacy requests, educational contributions, and support.",
  alternates: {
    canonical: "https://www.elevateorbit.in/contact",
  },
  openGraph: {
    title: "Contact ELEVIT | Elevate Orbit",
    description: "Connect with the ELEVIT team.",
    url: "https://www.elevateorbit.in/contact",
    siteName: "ELEVIT",
    type: "website",
  },
};

const contactOptions = [
  {
    number: "01",
    title: "General Enquiries",
    description:
      "Questions, suggestions, feedback, or anything you'd like to discuss about ELEVIT.",
    subject: "General Enquiry - ELEVIT",
    label: "Send a general enquiry",
  },
  {
    number: "02",
    title: "Privacy & Account Support",
    description:
      "Contact us about your personal information, privacy concerns, or account-related requests.",
    subject: "Privacy and Account Request - ELEVIT",
    label: "Contact privacy support",
  },
  {
    number: "03",
    title: "Contributions & Resources",
    description:
      "Want to contribute study notes, educational resources, articles, or collaborate with ELEVIT?",
    subject: "Contribution - ELEVIT",
    label: "Discuss a contribution",
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#070B16] text-[#F8FAFC]">
      <Navbar />

      <section className="relative overflow-hidden px-5 pb-16 pt-24 sm:px-8 sm:pt-32">
        <div className="pointer-events-none absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-[#38DDF2]/10 blur-[120px]" />

        <div className="relative mx-auto max-w-5xl">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#38DDF2]/20 bg-[#38DDF2]/5 px-4 py-2 text-sm text-[#38DDF2]">
            <span className="h-2 w-2 rounded-full bg-[#38DDF2]" />
            We'd love to hear from you
          </div>

          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
            Let's start a{" "}
            <span className="text-[#38DDF2]">conversation.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-[#94A9C5] sm:text-lg">
            Have a question, an idea, or something you'd like to contribute?
            Whether you're a student, educator, or collaborator, we're here
            to listen.
          </p>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {contactOptions.map((option) => (
              <div
                key={option.number}
                className="flex flex-col rounded-2xl border border-white/10 bg-[#141722] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#38DDF2]/40"
              >
                <span className="text-sm font-semibold text-[#38DDF2]">
                  {option.number}
                </span>

                <h2 className="mt-5 text-xl font-semibold">
                  {option.title}
                </h2>

                <p className="mt-3 flex-1 text-sm leading-7 text-[#94A9C5]">
                  {option.description}
                </p>

                <a
                  href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(option.subject)}`}
                  className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#38DDF2] transition hover:text-white"
                >
                  {option.label}
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            ))}
          </div>

          <div className="mt-8 rounded-2xl border border-[#38DDF2]/20 bg-[#38DDF2]/5 p-7 sm:p-9">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-[#38DDF2]">
              Reach us directly
            </p>

            <h2 className="mt-3 text-2xl font-semibold">
              One email connects you with ELEVIT.
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#94A9C5]">
              Choose a suitable subject line so we can understand your
              message and direct it appropriately.
            </p>

            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-6 inline-flex max-w-full break-all rounded-xl border border-[#38DDF2]/30 bg-[#070B16] px-5 py-3 text-sm font-semibold text-[#38DDF2] transition hover:bg-[#38DDF2]/10"
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          <div className="mt-14 border-t border-white/10 pt-8">
            <h2 className="text-xl font-semibold">Explore ELEVIT</h2>
            <p className="mt-3 text-sm leading-7 text-[#94A9C5]">
              Continue exploring our learning resources and discover what
              ELEVIT has to offer.
            </p>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <Link href="/" className="text-[#38DDF2] hover:text-white">
                Home
              </Link>
              <Link href="/about" className="text-[#38DDF2] hover:text-white">
                About
              </Link>
              <Link href="/notes" className="text-[#38DDF2] hover:text-white">
                Notes
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
