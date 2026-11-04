
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

const TOTAL_PAGES = 13;
const STORAGE_KEY = "elevit-computer-networks-unit5-page";

export default function NotesViewer() {
  const [currentPage, setCurrentPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [progressLoaded, setProgressLoaded] = useState(false);
  const [copied, setCopied] = useState(false);

  const readerRef = useRef<HTMLDivElement>(null);

  const goToPage = useCallback((page: number) => {
    const nextPage = Math.min(TOTAL_PAGES, Math.max(1, page));

    setCurrentPage(nextPage);

    const url = new URL(window.location.href);
    url.searchParams.set("page", String(nextPage));
    window.history.replaceState({}, "", url.toString());
  }, []);

  // Restore a shared page or the last-read page.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedPage = Number(params.get("page"));

    if (
      params.has("page") &&
      Number.isInteger(sharedPage) &&
      sharedPage >= 1 &&
      sharedPage <= TOTAL_PAGES
    ) {
      setCurrentPage(sharedPage);
    } else {
      const savedPage = Number(localStorage.getItem(STORAGE_KEY));

      if (
        Number.isInteger(savedPage) &&
        savedPage >= 1 &&
        savedPage <= TOTAL_PAGES
      ) {
        setCurrentPage(savedPage);
      }
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
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
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

  // Track fullscreen changes.
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const toggleFullscreen = async () => {
    if (!readerRef.current) return;

    try {
      if (!document.fullscreenElement) {
        await readerRef.current.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error("Fullscreen could not be activated:", error);
    }
  };

  const sharePage = async () => {
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

  const resetProgress = () => {
    localStorage.removeItem(STORAGE_KEY);
    goToPage(1);
    setZoom(100);
  };

  const progress = (currentPage / TOTAL_PAGES) * 100;

  return (
    <div
      ref={readerRef}
      className="w-full rounded-2xl border border-white/10 bg-[#0d1220] p-3 shadow-2xl sm:p-5"
    >
      {/* Reader heading */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 text-cyan-400">
            <BookOpen size={18} />
            <span className="text-sm font-semibold tracking-wide">
              ELEVIT NOTES READER
            </span>
          </div>
          <p className="mt-1 text-sm text-slate-400">
            Computer Networks · Unit 5
          </p>
        </div>

        <button
          onClick={toggleFullscreen}
          className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-300 transition hover:border-cyan-400/50 hover:text-cyan-300"
          aria-label="Toggle fullscreen"
        >
          {isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}
          <span className="hidden sm:inline">
            {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          </span>
        </button>
      </div>

      {/* Reading progress */}
      <div className="mb-5">
        <div className="mb-2 flex justify-between text-xs text-slate-400">
          <span>Reading progress</span>
          <span>
            {currentPage} of {TOTAL_PAGES} pages · {Math.round(progress)}%
          </span>
        </div>

        <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Zoom, print and share controls */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-[#141b2c] p-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoom((value) => Math.max(50, value - 10))}
            disabled={zoom <= 50}
            className="rounded-lg p-2 text-slate-300 transition hover:bg-white/10 disabled:opacity-30"
            aria-label="Zoom out"
          >
            <ZoomOut size={18} />
          </button>

          <span className="min-w-12 text-center text-sm font-medium text-white">
            {zoom}%
          </span>

          <button
            onClick={() => setZoom((value) => Math.min(200, value + 10))}
            disabled={zoom >= 200}
            className="rounded-lg p-2 text-slate-300 transition hover:bg-white/10 disabled:opacity-30"
            aria-label="Zoom in"
          >
            <ZoomIn size={18} />
          </button>

          <button
            onClick={() => setZoom(100)}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-white/10 hover:text-cyan-300"
            aria-label="Reset zoom"
            title="Reset zoom"
          >
            <RotateCcw size={16} />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 rounded-lg bg-cyan-500/10 px-3 py-2 text-sm text-cyan-300 transition hover:bg-cyan-500/20"
          >
            <Printer size={16} />
            <span>Print / PDF</span>
          </button>

          <button
            onClick={sharePage}
            className="flex items-center gap-2 rounded-lg bg-blue-500/10 px-3 py-2 text-sm text-blue-300 transition hover:bg-blue-500/20"
          >
            {copied ? <Check size={16} /> : <Share2 size={16} />}
            <span>{copied ? "Copied!" : "Share Page"}</span>
          </button>
        </div>
      </div>

      {/* Current page */}
      <div className="overflow-auto rounded-xl bg-[#080b13] p-2 sm:p-4">
        <div className="mx-auto flex min-h-[300px] justify-center">
          <img
            key={currentPage}
            src={`/notes/computer-networks/unit-5/${currentPage}.jpg`}
            alt={`Computer Networks Unit 5 - Application Layer - Page ${currentPage}`}
            className="h-auto max-w-none rounded-lg shadow-xl"
            style={{
              width: `${zoom}%`,
              minWidth: zoom > 100 ? "600px" : "0",
            }}
            loading="eager"
          />
        </div>
      </div>

      {/* Previous / next navigation */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-slate-300 transition hover:border-cyan-400/50 hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronLeft size={18} />
          Previous
        </button>

        <div className="flex items-center gap-2">
          <span className="hidden text-sm text-slate-400 sm:inline">
            Page
          </span>

          <input
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
            className="w-16 rounded-lg border border-white/10 bg-[#141b2c] px-2 py-2 text-center text-sm text-white outline-none focus:border-cyan-400"
            aria-label="Go to page number"
          />

          <span className="text-sm text-slate-400">/ {TOTAL_PAGES}</span>
        </div>

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === TOTAL_PAGES}
          className="flex items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-[#07111d] transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-30"
        >
          Next
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Quick page selector */}
      <div className="mt-5">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Jump to page
        </p>

        <div className="flex flex-wrap gap-2">
          {Array.from({ length: TOTAL_PAGES }, (_, index) => index + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`h-9 w-9 rounded-lg text-xs font-medium transition ${
                  currentPage === page
                    ? "bg-cyan-400 text-[#07111d]"
                    : "border border-white/10 bg-white/5 text-slate-400 hover:border-cyan-400/50 hover:text-cyan-300"
                }`}
                aria-label={`Go to page ${page}`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </button>
            )
          )}
        </div>
      </div>

      {/* Reset progress */}
      <div className="mt-5 flex justify-end">
        <button
          onClick={resetProgress}
          className="text-xs text-slate-500 transition hover:text-red-400"
        >
          Reset reading progress
        </button>
      </div>

      <p className="mt-4 text-center text-xs text-slate-500">
        Keyboard shortcuts: ← → Navigate · + / − Zoom · 0 Reset zoom
      </p>

      {/* All pages for printing */}
      <div className="print-notes">
        {Array.from({ length: TOTAL_PAGES }, (_, index) => index + 1).map(
          (page) => (
            <div className="print-page" key={page}>
              <img
                src={`/notes/computer-networks/unit-5/${page}.jpg`}
                alt={`Application Layer Notes - Page ${page}`}
              />
            </div>
          )
        )}
      </div>

      {/* Print styling */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 8mm;
          }

          body {
            background: white !important;
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
            left: 0;
            top: 0;
            width: 100%;
            background: white;
          }

          .print-page {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 275mm;
            page-break-after: always;
            break-after: page;
          }

          .print-page:last-child {
            page-break-after: auto;
            break-after: auto;
          }

          .print-page img {
            display: block;
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
          }
        }

        @media screen {
          .print-notes {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
