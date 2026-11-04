
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
const STORAGE_KEY = "elevit-smart-antenna-unit2-page";

export default function NotesViewer() {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progressLoaded, setProgressLoaded] = useState(false);
  const [copied, setCopied] = useState(false);

  const readerRef = useRef<HTMLDivElement>(null);

  const progress = Math.round((currentPage / TOTAL_PAGES) * 100);

  // Preserve original filenames: 2-01.jpg through 2-14.jpg.
  const imagePath = (page: number) =>
    `/notes/smart-antenna-systems/unit-2/2-${String(page).padStart(2, "0")}.jpg`;

  const goToPage = useCallback((page: number) => {
    const nextPage = Math.max(1, Math.min(TOTAL_PAGES, page));

    setCurrentPage(nextPage);

    const url = new URL(window.location.href);
    url.searchParams.set("page", String(nextPage));

    window.history.replaceState({}, "", url.toString());
  }, []);

  // Restore shared page or saved reading position.
  useEffect(() => {
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

    setProgressLoaded(true);
  }, []);

  // Save reading progress.
  useEffect(() => {
    if (progressLoaded) {
      localStorage.setItem(STORAGE_KEY, String(currentPage));
    }
  }, [currentPage, progressLoaded]);

  // Keyboard shortcuts.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement;

      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (event.key === "ArrowRight") {
        goToPage(currentPage + 1);
      } else if (event.key === "ArrowLeft") {
        goToPage(currentPage - 1);
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
  }, [currentPage, goToPage]);

  // Sync fullscreen state with browser.
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () =>
      document.removeEventListener(
        "fullscreenchange",
        handleFullscreenChange
      );
  }, []);

  const toggleFullscreen = async () => {
    if (!readerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await readerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // Fullscreen may be unavailable in some browsers.
    }
  };

  const handleShare = async () => {
    const url = new URL(window.location.href);
    url.searchParams.set("page", String(currentPage));

    try {
      await navigator.clipboard.writeText(url.toString());
      setCopied(true);

      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this page link:", url.toString());
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      ref={readerRef}
      className="overflow-hidden rounded-2xl border border-white/10 bg-[#141722] shadow-2xl shadow-black/30"
    >
      {/* READER TOOLBAR */}

      <div className="border-b border-white/10 p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="rounded-xl bg-[#38DDF2]/10 p-2">
              <BookOpen className="h-5 w-5 text-[#38DDF2]" />
            </div>

            <div>
              <p className="font-semibold text-white">Notes Reader</p>
              <p className="text-xs text-[#94A9C5]">
                Smart Antenna Systems · Unit 2
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setZoom((value) => Math.max(50, value - 10))}
              disabled={zoom <= 50}
              aria-label="Zoom out"
              className="rounded-lg border border-white/10 p-2 text-[#94A9C5] transition hover:border-[#38DDF2]/40 hover:text-[#38DDF2] disabled:opacity-30"
            >
              <ZoomOut size={18} />
            </button>

            <span className="min-w-12 text-center text-sm font-medium text-white">
              {zoom}%
            </span>

            <button
              onClick={() => setZoom((value) => Math.min(200, value + 10))}
              disabled={zoom >= 200}
              aria-label="Zoom in"
              className="rounded-lg border border-white/10 p-2 text-[#94A9C5] transition hover:border-[#38DDF2]/40 hover:text-[#38DDF2] disabled:opacity-30"
            >
              <ZoomIn size={18} />
            </button>

            <button
              onClick={() => setZoom(100)}
              aria-label="Reset zoom"
              title="Reset zoom"
              className="rounded-lg border border-white/10 p-2 text-[#94A9C5] transition hover:text-[#38DDF2]"
            >
              <RotateCcw size={17} />
            </button>

            <button
              onClick={toggleFullscreen}
              aria-label="Toggle fullscreen"
              title="Fullscreen"
              className="rounded-lg border border-white/10 p-2 text-[#94A9C5] transition hover:text-[#38DDF2]"
            >
              {isFullscreen ? (
                <Minimize size={18} />
              ) : (
                <Maximize size={18} />
              )}
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-[#94A9C5] transition hover:border-[#38DDF2]/40 hover:text-[#38DDF2]"
            >
              {copied ? <Check size={16} /> : <Share2 size={16} />}
              <span className="hidden sm:inline">
                {copied ? "Copied!" : "Share"}
              </span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#38DDF2] to-[#4D9BF5] px-3 py-2 text-sm font-semibold text-[#070B16] transition hover:brightness-110"
            >
              <Printer size={16} />
              <span>Print / PDF</span>
            </button>
          </div>
        </div>

        {/* READING PROGRESS */}

        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="text-[#94A9C5]">Reading progress</span>

            <span className="font-semibold text-[#38DDF2]">
              {progress}%
            </span>
          </div>

          <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#38DDF2] to-[#9B7BFF] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* CURRENT PAGE */}

      <div className="bg-[#070B16] p-3 sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm font-medium text-[#94A9C5]">
            Page <span className="text-white">{currentPage}</span> of{" "}
            {TOTAL_PAGES}
          </p>

          <div className="flex items-center gap-2">
            <label
              htmlFor="notes-page-jump"
              className="text-xs text-[#94A9C5]"
            >
              Go to page
            </label>

            <input
              id="notes-page-jump"
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
              className="w-16 rounded-lg border border-white/10 bg-[#141722] px-2 py-1.5 text-center text-sm text-white outline-none focus:border-[#38DDF2]"
            />
          </div>
        </div>

        {/* IMAGE DISPLAY */}

        <div className="overflow-auto rounded-xl bg-[#202431] p-2 sm:p-4">
          <img
            key={currentPage}
            src={imagePath(currentPage)}
            alt={`Smart Antenna Systems Unit 2 handwritten notes - Page ${currentPage}`}
            className="mx-auto h-auto rounded-md shadow-xl"
            style={{
              width: `${zoom}%`,
              minWidth: zoom > 100 ? "600px" : "0",
              maxWidth: "none",
            }}
            loading="eager"
          />
        </div>

        {/* PAGE NAVIGATION */}

        <div className="mt-5 flex items-center justify-between gap-3">
          <button
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-white transition hover:border-[#38DDF2]/40 hover:text-[#38DDF2] disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft size={18} />
            <span className="hidden sm:inline">Previous</span>
          </button>

          <div className="flex max-w-[55%] items-center gap-1 overflow-x-auto py-2">
            {Array.from(
              { length: TOTAL_PAGES },
              (_, index) => index + 1
            ).map((page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                aria-label={`Go to page ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
                className={`h-2 shrink-0 rounded-full transition-all ${
                  currentPage === page
                    ? "w-6 bg-[#38DDF2]"
                    : "w-2 bg-white/20 hover:bg-white/50"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === TOTAL_PAGES}
            className="flex items-center gap-2 rounded-xl bg-[#38DDF2] px-4 py-3 text-sm font-semibold text-[#070B16] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight size={18} />
          </button>
        </div>

        <p className="mt-4 text-center text-xs leading-6 text-[#71849F]">
          Keyboard shortcuts: ← / → navigate · + / − zoom · 0 reset zoom
        </p>
      </div>

      {/* PRINT-ONLY PAGES */}

      <div className="print-notes">
        {Array.from(
          { length: TOTAL_PAGES },
          (_, index) => index + 1
        ).map((page) => (
          <img
            key={page}
            src={imagePath(page)}
            alt={`Smart Antenna Systems Unit 2 - Page ${page}`}
          />
        ))}
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
            position: absolute;
            inset: 0;
            width: 100%;
            background: white !important;
          }

          .print-notes img {
            display: block;
            width: 100%;
            height: auto;
            max-height: 277mm;
            object-fit: contain;
            margin: 0 auto;
            page-break-after: always;
            break-after: page;
          }

          .print-notes img:last-child {
            page-break-after: auto;
            break-after: auto;
          }
        }
      `}</style>
    </div>
  );
}
