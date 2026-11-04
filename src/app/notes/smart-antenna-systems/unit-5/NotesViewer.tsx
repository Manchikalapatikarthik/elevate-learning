
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize,
  Minimize,
  Printer,
  Share2,
  RotateCcw,
  BookOpen,
  Check,
} from "lucide-react";

const TOTAL_PAGES = 14;
const STORAGE_KEY = "elevit-smart-antenna-unit5-page";

export default function NotesViewer() {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progressLoaded, setProgressLoaded] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const readerRef = useRef<HTMLDivElement>(null);

  const imagePath = (page: number) =>
    `/notes/smart-antenna-systems/unit-5/5-${String(page).padStart(2, "0")}.jpg`;

  const goToPage = useCallback((page: number) => {
    if (page < 1 || page > TOTAL_PAGES) return;
    setCurrentPage(page);
  }, []);

  // Restore saved reading progress and any shared page number.
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const sharedPage = Number(params.get("page"));
      const savedPage = Number(localStorage.getItem(STORAGE_KEY));

      if (
        params.has("page") &&
        Number.isInteger(sharedPage) &&
        sharedPage >= 1 &&
        sharedPage <= TOTAL_PAGES
      ) {
        setCurrentPage(sharedPage);
      } else if (
        Number.isInteger(savedPage) &&
        savedPage >= 1 &&
        savedPage <= TOTAL_PAGES
      ) {
        setCurrentPage(savedPage);
      }
    } catch {
      // The reader remains usable if browser storage is unavailable.
    }

    setProgressLoaded(true);
  }, []);

  // Save the current page after the initial restore is complete.
  useEffect(() => {
    if (!progressLoaded) return;

    try {
      localStorage.setItem(STORAGE_KEY, String(currentPage));
    } catch {
      // Continue without saving if browser storage is unavailable.
    }
  }, [currentPage, progressLoaded]);

  // Keep the page number in the URL so the current page can be shared.
  useEffect(() => {
    if (!progressLoaded) return;

    const url = new URL(window.location.href);
    url.searchParams.set("page", String(currentPage));

    window.history.replaceState({}, "", url.toString());
  }, [currentPage, progressLoaded]);

  // Keyboard navigation and zoom shortcuts.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;

      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (event.key === "ArrowRight") {
        setCurrentPage((page) => Math.min(TOTAL_PAGES, page + 1));
      } else if (event.key === "ArrowLeft") {
        setCurrentPage((page) => Math.max(1, page - 1));
      } else if (event.key === "+" || event.key === "=") {
        setZoom((value) => Math.min(200, value + 10));
      } else if (event.key === "-") {
        setZoom((value) => Math.max(50, value - 10));
      } else if (event.key === "0") {
        setZoom(100);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Track fullscreen changes, including browser Escape key.
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(document.fullscreenElement === readerRef.current);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener(
        "fullscreenchange",
        handleFullscreenChange
      );
    };
  }, []);

  const changeZoom = (amount: number) => {
    setZoom((value) => Math.min(200, Math.max(50, value + amount)));
  };

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement && readerRef.current) {
        await readerRef.current.requestFullscreen();
      } else if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error("Fullscreen could not be activated:", error);
    }
  };

  const printNotes = () => {
    window.print();
  };

  const sharePage = async () => {
    const shareUrl = new URL(window.location.href);
    shareUrl.searchParams.set("page", String(currentPage));

    try {
      if (navigator.share) {
        await navigator.share({
          title: "Smart Antenna Systems – Unit 5 Notes",
          text: `Read page ${currentPage} of Measurements and Waveguides.`,
          url: shareUrl.toString(),
        });
      } else {
        await navigator.clipboard.writeText(shareUrl.toString());
        setShareCopied(true);
        window.setTimeout(() => setShareCopied(false), 2000);
      }
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        console.error("Sharing failed:", error);
      }
    }
  };

  const progress = Math.round((currentPage / TOTAL_PAGES) * 100);

  return (
    <>
      <div
        ref={readerRef}
        className="notes-reader relative overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0D1422] shadow-[0_20px_70px_rgba(0,0,0,0.3)]"
      >
        {/* READER HEADER */}
        <div className="border-b border-white/[0.07] px-4 py-5 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#38DDF2]/20 bg-[#38DDF2]/[0.07]">
                <BookOpen size={21} className="text-[#38DDF2]" />
              </div>

              <div>
                <h2 className="text-base font-bold text-white sm:text-lg">
                  Measurements and Waveguides
                </h2>
                <p className="mt-1 text-xs text-[#8292AC]">
                  Smart Antenna Systems · Unit 5
                </p>
              </div>
            </div>

            <span className="rounded-full border border-[#38DDF2]/15 bg-[#38DDF2]/[0.06] px-3 py-1.5 text-xs font-medium text-[#38DDF2]">
              {TOTAL_PAGES} Pages
            </span>
          </div>

          {/* READING PROGRESS */}
          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between text-xs">
              <span className="text-[#8292AC]">Reading progress</span>
              <span className="font-semibold text-[#38DDF2]">
                {progress}%
              </span>
            </div>

            <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#38DDF2] to-[#4D9BF5] transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* TOOLBAR */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] bg-white/[0.02] px-3 py-3 sm:px-5">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => changeZoom(-10)}
              disabled={zoom <= 50}
              aria-label="Zoom out"
              className="rounded-lg p-2 text-[#CBD5E1] transition hover:bg-white/[0.07] hover:text-[#38DDF2] disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ZoomOut size={18} />
            </button>

            <span className="min-w-[48px] text-center text-xs font-semibold tabular-nums text-[#CBD5E1]">
              {zoom}%
            </span>

            <button
              type="button"
              onClick={() => changeZoom(10)}
              disabled={zoom >= 200}
              aria-label="Zoom in"
              className="rounded-lg p-2 text-[#CBD5E1] transition hover:bg-white/[0.07] hover:text-[#38DDF2] disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ZoomIn size={18} />
            </button>

            <button
              type="button"
              onClick={() => setZoom(100)}
              aria-label="Reset zoom"
              title="Reset zoom"
              className="ml-1 rounded-lg p-2 text-[#8292AC] transition hover:bg-white/[0.07] hover:text-[#38DDF2]"
            >
              <RotateCcw size={16} />
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
              title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
              className="rounded-lg p-2 text-[#CBD5E1] transition hover:bg-white/[0.07] hover:text-[#38DDF2]"
            >
              {isFullscreen ? (
                <Minimize size={18} />
              ) : (
                <Maximize size={18} />
              )}
            </button>

            <button
              type="button"
              onClick={printNotes}
              aria-label="Print all notes"
              title="Print all notes"
              className="rounded-lg p-2 text-[#CBD5E1] transition hover:bg-white/[0.07] hover:text-[#38DDF2]"
            >
              <Printer size={18} />
            </button>

            <button
              type="button"
              onClick={sharePage}
              aria-label="Share current page"
              title="Share current page"
              className="flex items-center gap-2 rounded-lg p-2 text-[#CBD5E1] transition hover:bg-white/[0.07] hover:text-[#38DDF2]"
            >
              {shareCopied ? (
                <Check size={18} className="text-[#38DDF2]" />
              ) : (
                <Share2 size={18} />
              )}
              <span className="hidden text-xs sm:inline">
                {shareCopied ? "Copied" : "Share"}
              </span>
            </button>
          </div>
        </div>

        {/* CURRENT PAGE */}
        <div className="bg-[#080D18] px-3 py-5 sm:px-6 sm:py-8">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-semibold text-[#CBD5E1]">
              Page {String(currentPage).padStart(2, "0")}{" "}
              <span className="font-normal text-[#718096]">
                of {TOTAL_PAGES}
              </span>
            </p>

            <span className="rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-xs text-[#8292AC]">
              Unit 5
            </span>
          </div>

          <div className="overflow-auto rounded-xl bg-white shadow-[0_10px_40px_rgba(0,0,0,0.25)] sm:rounded-2xl">
            <div
              className="mx-auto transition-all duration-200"
              style={{
                width: `${zoom}%`,
                minWidth: zoom > 100 ? "100%" : undefined,
              }}
            >
              <img
                key={currentPage}
                src={imagePath(currentPage)}
                alt={`Smart Antenna Systems Unit 5 – Page ${currentPage}`}
                className="block h-auto w-full"
                loading="eager"
                draggable={false}
              />
            </div>
          </div>
        </div>

        {/* PAGE NAVIGATION */}
        <div className="border-t border-white/[0.07] px-3 py-5 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="inline-flex items-center gap-2 rounded-xl border border-white/[0.09] bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-[#CBD5E1] transition hover:border-[#38DDF2]/30 hover:bg-[#38DDF2]/[0.06] hover:text-[#38DDF2] disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft size={17} />
              Previous
            </button>

            <div className="flex items-center gap-2">
              <label
                htmlFor="notes-page-number"
                className="text-xs text-[#8292AC]"
              >
                Page
              </label>

              <input
                id="notes-page-number"
                type="number"
                min={1}
                max={TOTAL_PAGES}
                value={currentPage}
                onChange={(event) => {
                  const value = Number(event.target.value);
                  if (
                    Number.isInteger(value) &&
                    value >= 1 &&
                    value <= TOTAL_PAGES
                  ) {
                    goToPage(value);
                  }
                }}
                className="w-14 rounded-lg border border-white/[0.1] bg-[#111827] px-2 py-2 text-center text-sm font-semibold text-white outline-none transition focus:border-[#38DDF2]/50"
              />

              <span className="text-xs text-[#8292AC]">
                / {TOTAL_PAGES}
              </span>
            </div>

            <button
              type="button"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === TOTAL_PAGES}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#38DDF2] to-[#4D9BF5] px-4 py-2.5 text-sm font-semibold text-[#07111F] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-30"
            >
              Next
              <ChevronRight size={17} />
            </button>
          </div>

          {/* PAGE DOTS */}
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {Array.from({ length: TOTAL_PAGES }, (_, index) => index + 1).map(
              (page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => goToPage(page)}
                  aria-label={`Go to page ${page}`}
                  aria-current={currentPage === page ? "page" : undefined}
                  className={`h-2.5 rounded-full transition-all ${
                    currentPage === page
                      ? "w-7 bg-[#38DDF2]"
                      : "w-2.5 bg-white/[0.16] hover:bg-[#38DDF2]/50"
                  }`}
                />
              )
            )}
          </div>

          <p className="mt-5 text-center text-xs leading-6 text-[#718096]">
            Your reading progress is saved on this browser. Use the arrow
            keys to navigate and + / − to zoom.
          </p>
        </div>
      </div>

      {/* PRINT-ONLY NOTES */}
      <div className="print-notes">
        {Array.from({ length: TOTAL_PAGES }, (_, index) => index + 1).map(
          (page) => (
            <img
              key={page}
              src={imagePath(page)}
              alt={`Smart Antenna Systems Unit 5 – Page ${page}`}
            />
          )
        )}
      </div>

      {/* PRINT STYLES */}
      <style jsx global>{`
        .print-notes {
          display: none;
        }

        @media print {
          @page {
            size: A4 portrait;
            margin: 8mm;
          }

          html,
          body {
            background: white !important;
            color: black !important;
          }

          body * {
            visibility: hidden !important;
          }

          .print-notes,
          .print-notes * {
            visibility: visible !important;
          }

          .print-notes {
            display: block !important;
            position: absolute !important;
            inset: 0 !important;
            width: 100% !important;
            background: white !important;
          }

          .print-notes img {
            display: block !important;
            width: 100% !important;
            height: auto !important;
            max-height: 277mm !important;
            object-fit: contain !important;
            margin: 0 auto !important;
            page-break-after: always;
            break-after: page;
          }

          .print-notes img:last-child {
            page-break-after: auto;
            break-after: auto;
          }
        }
      `}</style>
    </>
  );
}
