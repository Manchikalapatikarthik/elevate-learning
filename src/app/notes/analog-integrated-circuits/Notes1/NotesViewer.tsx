
"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Check,
  ChevronDown,
  Download,
  Maximize,
  Minimize,
  RotateCcw,
  Share2,
  ZoomIn,
  ZoomOut,
} from "lucide-react";

const TOTAL_PAGES = 64;
const STORAGE_KEY = "elevit-analog-integrated-circuits-notes1-page";

const getImagePath = (page: number) =>
  `/notes/anolog-integrated-circuit/Notes1/${page}.jpg`;

export default function NotesViewer() {
  const [page, setPage] = useState(1);
  const [zoom, setZoom] = useState(100);
  const [fullscreen, setFullscreen] = useState(false);
  const [saved, setSaved] = useState(false);
  const [shareMessage, setShareMessage] = useState("");
  const [showPageInput, setShowPageInput] = useState(false);

  const viewerRef = useRef<HTMLDivElement>(null);
  const pageInputRef = useRef<HTMLInputElement>(null);

  const progress = Math.round((page / TOTAL_PAGES) * 100);

  const goToPage = useCallback((nextPage: number) => {
    const safePage = Math.max(1, Math.min(TOTAL_PAGES, nextPage));

    setPage(safePage);
    setShowPageInput(false);

    const url = new URL(window.location.href);
    url.searchParams.set("page", String(safePage));
    window.history.replaceState({}, "", url.toString());
  }, []);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const sharedPage = Number(params.get("page"));

      if (
        params.has("page") &&
        Number.isInteger(sharedPage) &&
        sharedPage >= 1 &&
        sharedPage <= TOTAL_PAGES
      ) {
        setPage(sharedPage);
        return;
      }

      const savedPage = Number(localStorage.getItem(STORAGE_KEY));

      if (
        Number.isInteger(savedPage) &&
        savedPage >= 1 &&
        savedPage <= TOTAL_PAGES
      ) {
        setPage(savedPage);
      }
    } catch (error) {
      console.error("Could not restore reading progress:", error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, String(page));
      setSaved(true);
    } catch (error) {
      console.error("Could not save reading progress:", error);
      setSaved(false);
    }
  }, [page]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;

      if (
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        goToPage(page + 1);
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goToPage(page - 1);
      }

      if (event.key === "+" || event.key === "=") {
        setZoom((value) => Math.min(200, value + 10));
      }

      if (event.key === "-") {
        setZoom((value) => Math.max(50, value - 10));
      }

      if (event.key === "Escape" && fullscreen) {
        void document.exitFullscreen?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [page, fullscreen, goToPage]);

  const toggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await viewerRef.current?.requestFullscreen?.();
      } else {
        await document.exitFullscreen?.();
      }
    } catch (error) {
      console.error("Fullscreen is unavailable:", error);
    }
  };

  const shareNotes = async () => {
    const shareUrl = new URL(window.location.href);
    shareUrl.searchParams.set("page", String(page));

    const shareData = {
      title: "Analog Integrated Circuits Handwritten Notes | ELEVIT",
      text: `Read Analog Integrated Circuits handwritten notes - Page ${page} of ${TOTAL_PAGES}.`,
      url: shareUrl.toString(),
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        setShareMessage("Share options opened.");
      } else if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl.toString());
        setShareMessage("Page link copied!");
      } else {
        setShareMessage("Sharing is not supported in this browser.");
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") return;
      setShareMessage("Could not share the link. Please try again.");
    }

    window.setTimeout(() => setShareMessage(""), 3000);
  };

  const submitPageNumber = () => {
    const value = Number(pageInputRef.current?.value);

    if (Number.isInteger(value) && value >= 1 && value <= TOTAL_PAGES) {
      goToPage(value);
    } else {
      setShowPageInput(false);
    }
  };

  return (
    <>
      <section className="relative px-4 pb-16 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <div
            ref={viewerRef}
            className={`overflow-hidden rounded-3xl border border-white/[0.09] bg-[#101827] shadow-2xl ${
              fullscreen ? "flex h-screen flex-col rounded-none border-0" : ""
            }`}
          >
            {/* READER TOOLBAR */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.07] bg-[#111C2D] px-4 py-4 sm:px-6">
              <div>
                <p className="text-sm font-semibold text-white">Notes Set 1</p>
                <p className="mt-1 text-[10px] text-[#8292AC]">
                  64 handwritten pages
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => setZoom((v) => Math.max(50, v - 10))}
                  disabled={zoom <= 50}
                  aria-label="Zoom out"
                  className="rounded-lg border border-white/[0.08] p-2.5 text-[#94A9C5] hover:text-white disabled:opacity-30"
                >
                  <ZoomOut size={17} />
                </button>

                <span className="min-w-12 text-center text-xs tabular-nums text-[#BCEFFF]">
                  {zoom}%
                </span>

                <button
                  type="button"
                  onClick={() => setZoom((v) => Math.min(200, v + 10))}
                  disabled={zoom >= 200}
                  aria-label="Zoom in"
                  className="rounded-lg border border-white/[0.08] p-2.5 text-[#94A9C5] hover:text-white disabled:opacity-30"
                >
                  <ZoomIn size={17} />
                </button>

                <button
                  type="button"
                  onClick={() => setZoom(100)}
                  title="Reset zoom"
                  className="rounded-lg border border-white/[0.08] p-2.5 text-[#94A9C5] hover:text-white"
                >
                  <RotateCcw size={16} />
                </button>

                <button
                  type="button"
                  onClick={toggleFullscreen}
                  title="Full screen"
                  className="rounded-lg border border-white/[0.08] p-2.5 text-[#94A9C5] hover:text-white"
                >
                  {fullscreen ? <Minimize size={17} /> : <Maximize size={17} />}
                </button>

                <button
                  type="button"
                  onClick={shareNotes}
                  title="Share this page"
                  className="rounded-lg border border-white/[0.08] p-2.5 text-[#94A9C5] hover:text-white"
                >
                  <Share2 size={17} />
                </button>

                <button
                  type="button"
                  onClick={() => window.print()}
                  title="Print or save all pages as PDF"
                  className="flex items-center gap-2 rounded-lg border border-[#38DDF2]/20 bg-[#38DDF2]/[0.08] px-3 py-2.5 text-xs font-medium text-[#BCEFFF] hover:bg-[#38DDF2]/[0.15]"
                >
                  <Download size={16} />
                  <span className="hidden sm:inline">Save PDF</span>
                </button>
              </div>
            </div>

            {/* READING PROGRESS */}
            <div className="border-b border-white/[0.06] px-4 py-4 sm:px-6">
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="text-[#94A9C5]">Reading progress</span>
                <span className="font-medium text-[#BCEFFF]">
                  {page} / {TOTAL_PAGES} · {progress}%
                </span>
              </div>

              <div
                className="h-1.5 overflow-hidden rounded-full bg-[#202B3D]"
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div
                  className="h-full rounded-full bg-gradient-to-r from-[#38DDF2] via-[#4D9BF5] to-[#9B7BFF] transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* DOCUMENT PAGE */}
            <div
              className={`flex min-h-[450px] flex-1 items-start justify-center overflow-auto bg-[#080D17] p-3 sm:p-8 ${
                fullscreen ? "min-h-0" : ""
              }`}
            >
              <div
                className="relative mx-auto shrink-0 transition-all duration-200"
                style={{
                  width: `${zoom}%`,
                  maxWidth: zoom === 100 ? "900px" : "none",
                  minWidth: zoom > 100 ? "600px" : "0",
                }}
              >
                <Image
                  key={page}
                  src={getImagePath(page)}
                  alt={`Analog Integrated Circuits handwritten notes, page ${page} of 64`}
                  width={1200}
                  height={1700}
                  priority
                  unoptimized
                  draggable={false}
                  className="h-auto w-full select-none rounded-md bg-white shadow-2xl"
                  sizes="(max-width: 768px) 100vw, 900px"
                />
              </div>
            </div>

            {/* PAGE CONTROLS */}
            <div className="border-t border-white/[0.07] bg-[#111C2D] px-4 py-4 sm:px-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => goToPage(page - 1)}
                  disabled={page <= 1}
                  className="flex items-center gap-2 rounded-xl border border-white/[0.08] px-4 py-3 text-sm text-[#CBD5E1] hover:text-white disabled:opacity-30"
                >
                  <ArrowLeft size={16} />
                  Previous
                </button>

                <div className="flex items-center gap-3">
                  {showPageInput ? (
                    <form
                      onSubmit={(event) => {
                        event.preventDefault();
                        submitPageNumber();
                      }}
                      className="flex items-center gap-2"
                    >
                      <input
                        ref={pageInputRef}
                        type="number"
                        min={1}
                        max={TOTAL_PAGES}
                        defaultValue={page}
                        autoFocus
                        aria-label="Go to page number"
                        className="w-16 rounded-lg border border-[#38DDF2]/30 bg-[#080D17] px-2 py-2 text-center text-sm text-white outline-none"
                      />
                      <button
                        type="submit"
                        className="rounded-lg bg-[#38DDF2] px-3 py-2 text-xs font-semibold text-[#07111D]"
                      >
                        Go
                      </button>
                    </form>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setShowPageInput(true)}
                      className="flex items-center gap-2 rounded-xl border border-white/[0.08] px-4 py-3 text-sm text-[#BCEFFF]"
                    >
                      Page {page} of {TOTAL_PAGES}
                      <ChevronDown size={15} />
                    </button>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => goToPage(page + 1)}
                  disabled={page >= TOTAL_PAGES}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#38DDF2] to-[#4D9BF5] px-4 py-3 text-sm font-semibold text-[#07111D] hover:brightness-110 disabled:opacity-30"
                >
                  Next
                  <ArrowRight size={16} />
                </button>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-[10px] text-[#64748B]">
                <span>Use ← and → arrow keys to navigate pages.</span>
                <span className="flex items-center gap-1.5">
                  {saved ? (
                    <>
                      <Check size={12} className="text-[#4DDBA5]" />
                      Reading progress saved on this device
                    </>
                  ) : (
                    <>
                      <Bookmark size={12} />
                      Progress could not be saved
                    </>
                  )}
                </span>
              </div>

              {shareMessage && (
                <p role="status" className="mt-3 text-center text-xs text-[#38DDF2]">
                  {shareMessage}
                </p>
              )}
            </div>
          </div>

          {/* ALL PAGES FOR PRINT / SAVE AS PDF */}
          <div className="print-notes hidden">
            {Array.from({ length: TOTAL_PAGES }, (_, index) => {
              const printPage = index + 1;

              return (
                <div key={printPage} className="print-note-page">
                  <p className="print-page-number">
                    Analog Integrated Circuits · Page {printPage} of {TOTAL_PAGES}
                  </p>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getImagePath(printPage)}
                    alt={`Analog Integrated Circuits handwritten notes page ${printPage}`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <style jsx global>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 10mm;
          }

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

          .print-note-page {
            display: flex !important;
            flex-direction: column !important;
            align-items: center !important;
            justify-content: center !important;
            width: 100% !important;
            height: 275mm !important;
            page-break-after: always !important;
            break-after: page !important;
          }

          .print-note-page:last-child {
            page-break-after: auto !important;
            break-after: auto !important;
          }

          .print-page-number {
            width: 100% !important;
            margin-bottom: 5mm !important;
            color: #333 !important;
            font-size: 9pt !important;
            text-align: center !important;
          }

          .print-note-page img {
            display: block !important;
            width: auto !important;
            max-width: 100% !important;
            max-height: 255mm !important;
            object-fit: contain !important;
          }
        }
      `}</style>
    </>
  );
}
