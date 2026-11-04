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

const TOTAL_PAGES = 34;
const STORAGE_KEY = "elevit-microprocessor-microcontroller-notes2-page";

export default function NotesViewer() {
  const [page, setPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [pageInput, setPageInput] = useState("1");
  const [copied, setCopied] = useState(false);
  const [progressLoaded, setProgressLoaded] = useState(false);

  const readerRef = useRef<HTMLDivElement>(null);

  const progress = Math.round((page / TOTAL_PAGES) * 100);

  // Restore saved reading position.
  useEffect(() => {
    try {
      const savedPage = Number(localStorage.getItem(STORAGE_KEY));

      if (
        Number.isInteger(savedPage) &&
        savedPage >= 1 &&
        savedPage <= TOTAL_PAGES
      ) {
        setPage(savedPage);
        setPageInput(String(savedPage));
      }
    } catch {
      // Reader remains usable if browser storage is unavailable.
    }

    setProgressLoaded(true);
  }, []);

  // Save reading progress.
  useEffect(() => {
    if (!progressLoaded) return;

    try {
      localStorage.setItem(STORAGE_KEY, String(page));
    } catch {
      // Ignore storage errors.
    }
  }, [page, progressLoaded]);

  useEffect(() => {
    setPageInput(String(page));
  }, [page]);

  // Synchronize fullscreen state.
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  const goToPage = useCallback((nextPage: number) => {
    const safePage = Math.min(
      TOTAL_PAGES,
      Math.max(1, Math.floor(nextPage))
    );

    setPage(safePage);
    setPageInput(String(safePage));
  }, []);

  const previousPage = useCallback(() => {
    goToPage(page - 1);
  }, [page, goToPage]);

  const nextPage = useCallback(() => {
    goToPage(page + 1);
  }, [page, goToPage]);

  // Keyboard shortcuts.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;

      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.isContentEditable;

      if (isTyping) return;

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        previousPage();
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        nextPage();
      }

      if (event.key === "+" || event.key === "=") {
        setZoom((current) => Math.min(200, current + 10));
      }

      if (event.key === "-") {
        setZoom((current) => Math.max(50, current - 10));
      }

      if (event.key === "0") {
        setZoom(100);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [previousPage, nextPage]);

  // Restore the page from a shared ?page=N link.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sharedPage = Number(params.get("page"));

    if (
      params.has("page") &&
      Number.isInteger(sharedPage) &&
      sharedPage >= 1 &&
      sharedPage <= TOTAL_PAGES
    ) {
      goToPage(sharedPage);
    }
  }, [goToPage]);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await readerRef.current?.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      console.error("Fullscreen is not available:", error);
    }
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}${window.location.pathname}?page=${page}`;

    const shareData = {
      title: "Microprocessor and Microcontroller Notes – Set 2 | ELEVIT",
      text: `Read Microprocessor and Microcontroller Notes Set 2 – Page ${page} of ${TOTAL_PAGES}.`,
      url: shareUrl,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        try {
          await navigator.clipboard.writeText(shareUrl);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 2000);
        } catch {
          alert("Unable to share this link in your browser.");
        }
      }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const resetProgress = () => {
    goToPage(1);
    setZoom(100);

    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors.
    }
  };

  const submitPage = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const requestedPage = Number(pageInput);

    if (
      Number.isInteger(requestedPage) &&
      requestedPage >= 1 &&
      requestedPage <= TOTAL_PAGES
    ) {
      goToPage(requestedPage);
    } else {
      setPageInput(String(page));
    }
  };

  return (
    <div
      ref={readerRef}
      className="notes-reader overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0D1422] shadow-[0_20px_70px_rgba(0,0,0,0.25)] sm:rounded-3xl"
    >
      {/* READER HEADER */}
      <div className="border-b border-white/[0.07] bg-[#111B2B] p-4 sm:p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <BookOpen size={17} className="text-[#38DDF2]" />
              Microprocessor and Microcontroller
            </div>

            <p className="mt-1 text-xs text-[#8292AC]">
              Notes Set 2 · {TOTAL_PAGES} pages
            </p>
          </div>

          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-[#CBD5E1] transition hover:border-[#38DDF2]/40 hover:text-[#38DDF2]"
          >
            {copied ? <Check size={15} /> : <Share2 size={15} />}
            {copied ? "Link copied" : "Share"}
          </button>
        </div>

        {/* READING PROGRESS */}
        <div className="mt-5">
          <div className="mb-2 flex justify-between text-xs">
            <span className="text-[#8292AC]">Reading progress</span>

            <span className="font-semibold tabular-nums text-[#38DDF2]">
              {progress}%
            </span>
          </div>

          <div
            className="h-1.5 overflow-hidden rounded-full bg-white/[0.08]"
            role="progressbar"
            aria-valuenow={progress}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Reading progress"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#38DDF2] to-[#4D9BF5] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* TOOLBAR */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] px-3 py-3 sm:px-5">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={previousPage}
            disabled={page === 1}
            aria-label="Previous page"
            className="rounded-lg border border-white/10 p-2 text-[#CBD5E1] transition hover:border-[#38DDF2]/40 hover:text-[#38DDF2] disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft size={18} />
          </button>

          <form onSubmit={submitPage} className="flex items-center gap-2">
            <input
              aria-label="Go to page number"
              type="number"
              min={1}
              max={TOTAL_PAGES}
              value={pageInput}
              onChange={(event) => setPageInput(event.target.value)}
              className="w-14 rounded-lg border border-white/10 bg-[#070B16] px-2 py-2 text-center text-sm text-white outline-none focus:border-[#38DDF2]"
            />

            <span className="text-xs text-[#8292AC]">
              / {TOTAL_PAGES}
            </span>

            <button
              type="submit"
              className="rounded-lg bg-[#38DDF2]/10 px-3 py-2 text-xs font-semibold text-[#38DDF2] transition hover:bg-[#38DDF2]/20"
            >
              Go
            </button>
          </form>

          <button
            type="button"
            onClick={nextPage}
            disabled={page === TOTAL_PAGES}
            aria-label="Next page"
            className="rounded-lg border border-white/10 p-2 text-[#CBD5E1] transition hover:border-[#38DDF2]/40 hover:text-[#38DDF2] disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setZoom((current) => Math.max(50, current - 10))}
            disabled={zoom <= 50}
            aria-label="Zoom out"
            className="rounded-lg border border-white/10 p-2 text-[#CBD5E1] transition hover:border-[#38DDF2]/40 hover:text-[#38DDF2] disabled:opacity-30"
          >
            <ZoomOut size={17} />
          </button>

          <button
            type="button"
            onClick={() => setZoom(100)}
            title="Reset zoom"
            className="min-w-14 rounded-lg border border-white/10 px-2 py-2 text-xs font-medium tabular-nums text-[#CBD5E1] transition hover:border-[#38DDF2]/40"
          >
            {zoom}%
          </button>

          <button
            type="button"
            onClick={() => setZoom((current) => Math.min(200, current + 10))}
            disabled={zoom >= 200}
            aria-label="Zoom in"
            className="rounded-lg border border-white/10 p-2 text-[#CBD5E1] transition hover:border-[#38DDF2]/40 hover:text-[#38DDF2] disabled:opacity-30"
          >
            <ZoomIn size={17} />
          </button>

          <button
            type="button"
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            className="rounded-lg border border-white/10 p-2 text-[#CBD5E1] transition hover:border-[#38DDF2]/40 hover:text-[#38DDF2]"
          >
            {isFullscreen ? (
              <Minimize size={17} />
            ) : (
              <Maximize size={17} />
            )}
          </button>

          <button
            type="button"
            onClick={handlePrint}
            aria-label="Print or save notes as PDF"
            className="rounded-lg border border-white/10 p-2 text-[#CBD5E1] transition hover:border-[#38DDF2]/40 hover:text-[#38DDF2]"
          >
            <Printer size={17} />
          </button>
        </div>
      </div>

      {/* CURRENT PAGE */}
      <div className="bg-[#080D17] p-3 sm:p-6">
        <div className="mb-3 flex items-center justify-between px-1">
          <span className="text-xs font-medium text-[#8292AC]">
            CURRENT PAGE
          </span>

          <span className="text-xs font-semibold text-[#38DDF2]">
            {String(page).padStart(2, "0")} / {TOTAL_PAGES}
          </span>
        </div>

        <div className="overflow-auto rounded-xl bg-[#1A2433] p-2 sm:rounded-2xl sm:p-4">
          <div
            className="mx-auto transition-all duration-200"
            style={{
              width: `${zoom}%`,
              minWidth: zoom > 100 ? "600px" : "0",
              maxWidth: "100%",
            }}
          >
            <img
              key={page}
              src={`/notes/microprocessor-and-microcontroller/Notes2/${page}.jpg`}
              alt={`Microprocessor and Microcontroller Notes Set 2 – Page ${page}`}
              loading="eager"
              draggable={false}
              className="block h-auto w-full rounded-md bg-white shadow-lg"
            />
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={previousPage}
            disabled={page === 1}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-xs font-semibold text-[#CBD5E1] transition hover:border-[#38DDF2]/40 hover:text-[#38DDF2] disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ChevronLeft size={15} />
            Previous
          </button>

          <span className="text-xs text-[#8292AC]">
            Page {page} of {TOTAL_PAGES}
          </span>

          <button
            type="button"
            onClick={nextPage}
            disabled={page === TOTAL_PAGES}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#38DDF2] to-[#4D9BF5] px-4 py-2.5 text-xs font-semibold text-[#07111F] transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-30"
          >
            Next
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      {/* READER FOOTER */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/[0.07] bg-[#111B2B] px-4 py-4 sm:px-5">
        <button
          type="button"
          onClick={resetProgress}
          className="inline-flex items-center gap-2 text-xs text-[#8292AC] transition hover:text-[#38DDF2]"
        >
          <RotateCcw size={14} />
          Reset progress
        </button>

        <p className="text-xs text-[#8292AC]">
          Your reading progress is saved in this browser.
        </p>
      </div>

      {/* ALL PAGES – PRINT ONLY */}
      <div className="print-notes">
        {Array.from({ length: TOTAL_PAGES }, (_, index) => {
          const printPage = index + 1;

          return (
            <div className="print-page" key={printPage}>
              <img
                src={`/notes/microprocessor-and-microcontroller/Notes2/${printPage}.jpg`}
                alt={`Microprocessor and Microcontroller Notes Set 2 page ${printPage}`}
              />
            </div>
          );
        })}
      </div>

      <style jsx global>{`
        .print-notes {
          display: none;
        }

        @media print {
          @page {
            size: A4 portrait;
            margin: 0;
          }

          html,
          body {
            background: white !important;
            margin: 0 !important;
            padding: 0 !important;
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

          .print-page {
            display: flex;
            width: 100%;
            height: 100vh;
            align-items: center;
            justify-content: center;
            page-break-after: always;
            break-after: page;
            overflow: hidden;
          }

          .print-page:last-child {
            page-break-after: auto;
            break-after: auto;
          }

          .print-page img {
            display: block;
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }
      `}</style>
    </div>
  );
}