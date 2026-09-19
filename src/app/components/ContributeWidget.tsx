"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const EMAIL = "elevateorbit.contribute@gmail.com";

export default function ContributeWidget() {
  const [open, setOpen] = useState(false);

  // Open the popup when the homepage intro explicitly finishes
  useEffect(() => {
    const handleTransitionComplete = () => {
      setOpen(true);
    };

    window.addEventListener(
      "elevate:transition-complete",
      handleTransitionComplete
    );

    return () => {
      window.removeEventListener(
        "elevate:transition-complete",
        handleTransitionComplete
      );
    };
  }, []);

  // Open the popup from the Navbar
  useEffect(() => {
    const handleOpen = () => {
      setOpen(true);
    };

    window.addEventListener("elevate:open-contribute", handleOpen);

    return () => {
      window.removeEventListener("elevate:open-contribute", handleOpen);
    };
  }, []);

  const closePopup = () => {
    setOpen(false);

    // Tell Navbar that the popup has been closed
    window.dispatchEvent(
      new Event("elevate:contribute-closed")
    );
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/55 px-4 backdrop-blur-md"
        >
          {/* Popup */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.92,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.92,
              y: 20,
            }}
            transition={{
              duration: 0.35,
              ease: "easeOut",
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="contribute-title"
            className="
              relative
              w-full
              max-w-md
              rounded-3xl
              border border-zinc-700
              bg-zinc-950
              p-7
              text-white
              shadow-2xl
              shadow-black/50
            "
          >
            {/* Close */}
            <button
              onClick={closePopup}
              aria-label="Close contribution popup"
              className="
                absolute
                right-5
                top-5
                text-xl
                text-zinc-400
                transition
                hover:text-white
              "
            >
              ✕
            </button>

            {/* Title */}
            <div className="pr-8">
              <h2
                id="contribute-title"
                className="text-2xl font-bold"
              >
                Contribute to Elevate Orbit
              </h2>

              <p className="mt-2 text-sm text-zinc-500">
                Help us improve the platform
              </p>
            </div>

            {/* Description */}
            <p className="mt-6 text-base leading-7 text-zinc-300">
              Have notes, corrections, suggestions, useful resources,
              project ideas, or anything that could help other students?
              We'd love to hear from you.
            </p>

            {/* Email */}
            <div className="mt-5 rounded-2xl border border-zinc-800 bg-black px-4 py-3">
              <p className="break-all text-sm text-zinc-400">
                {EMAIL}
              </p>
            </div>

            {/* Gmail */}
            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                EMAIL
              )}&su=${encodeURIComponent(
                "Contribution to Elevate Orbit"
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="
                mt-5
                block
                rounded-2xl
                bg-white
                px-5
                py-3.5
                text-center
                font-semibold
                text-black
                transition
                duration-300
                hover:scale-[1.02]
                hover:bg-zinc-200
              "
            >
              📧 Send Your Contribution
            </a>

            {/* Footer */}
            <p className="mt-4 text-center text-xs text-zinc-600">
              Your contribution can help improve Elevate Orbit for everyone.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}