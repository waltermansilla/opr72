"use client";

import { useCallback, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { opr72Content } from "@/data/opr72-content";

const { certificate, cv } = opr72Content.representative.documents;

const newTabProps = {
  target: "_blank" as const,
  rel: "noopener noreferrer",
};

function DocBtnArrow() {
  return (
    <span className="opr-rep-doc-btn-arrow" aria-hidden>
      <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M7 17 17 7M17 7H9M17 7v8"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

function DocBtnIcon() {
  return (
    <span className="opr-rep-doc-btn-icon" aria-hidden>
      <svg className="opr-rep-doc-icon" viewBox="0 0 24 24" fill="none">
        <path
          d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <path
          d="M14 2v6h6M9 13h6M9 17h4"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

function openInNewTab(href: string) {
  window.open(href, "_blank", "noopener,noreferrer");
}

export default function Opr72RepDocuments() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  const closeModal = useCallback(() => setModalOpen(false), []);

  const handleCertChoice = useCallback(
    (href: string) => {
      openInNewTab(href);
      closeModal();
    },
    [closeModal],
  );

  useEffect(() => {
    setPortalTarget(document.body);
  }, []);

  useEffect(() => {
    if (!modalOpen) {
      setModalVisible(false);
      return;
    }

    const frame = requestAnimationFrame(() => setModalVisible(true));
    const { body } = document;
    body.classList.add("opr-rep-cert-modal-open");

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      cancelAnimationFrame(frame);
      body.classList.remove("opr-rep-cert-modal-open");
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [modalOpen, closeModal]);

  return (
    <>
      <div className="opr-rep-actions">
        <div className="opr-rep-cert-col">
          <a href={certificate.scan} {...newTabProps} className="opr-rep-doc-btn opr-rep-doc-btn-desktop">
            <DocBtnIcon />
            <span className="opr-rep-doc-btn-label">{certificate.label}</span>
            <DocBtnArrow />
          </a>

          <button
            type="button"
            className="opr-rep-doc-btn opr-rep-doc-btn-mobile"
            onClick={() => setModalOpen(true)}
          >
            <DocBtnIcon />
            <span className="opr-rep-doc-btn-label">{certificate.label}</span>
            <DocBtnArrow />
          </button>

          <a
            href={certificate.photo}
            {...newTabProps}
            className="opr-rep-photo-link opr-rep-photo-link-desktop"
            aria-label={certificate.photoLabel}
          >
            <svg className="opr-rep-photo-link-icon" viewBox="0 0 24 24" fill="none" aria-hidden>
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.75" />
              <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
              <path
                d="m21 15-5-5L5 21"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span>Foto original</span>
            <span className="opr-rep-photo-link-arrow" aria-hidden>
              <svg viewBox="0 0 24 24" fill="none">
                <path
                  d="M7 17 17 7M17 7H9M17 7v8"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
        </div>

        <a href={cv.file} {...newTabProps} className="opr-rep-doc-btn">
          <DocBtnIcon />
          <span className="opr-rep-doc-btn-label">{cv.label}</span>
          <DocBtnArrow />
        </a>
      </div>

      {modalOpen &&
        portalTarget &&
        createPortal(
          <div
            className="opr-rep-cert-modal fixed inset-0 z-[10003] flex items-end justify-center sm:items-center"
            role="presentation"
          >
            <button
              type="button"
              className={`opr-modal-backdrop opr-rep-cert-modal-backdrop absolute inset-0 bg-[var(--opr-navy)]/60 backdrop-blur-sm ${modalVisible ? "is-open" : ""}`}
              aria-label="Cerrar"
              onClick={closeModal}
            />

            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="opr-rep-cert-modal-title"
              className={`opr-modal-panel opr-rep-cert-modal-panel relative mx-auto w-full max-w-md px-4 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-0 sm:pb-0 ${modalVisible ? "is-open" : ""}`}
            >
              <div className="overflow-hidden rounded-2xl bg-white shadow-[0_20px_56px_rgba(7,20,40,0.22)]">
                <div className="border-b border-[var(--opr-navy)]/8 px-5 py-4">
                  <h4
                    id="opr-rep-cert-modal-title"
                    className="font-[family-name:var(--font-opr-display)] text-lg font-bold text-[var(--opr-navy)]"
                  >
                    {certificate.label}
                  </h4>
                  <p className="mt-1 text-sm text-[var(--opr-navy)]/65">Elegí cómo ver el certificado</p>
                </div>

                <div className="space-y-2 p-4">
                  <button
                    type="button"
                    className="opr-rep-cert-modal-option"
                    onClick={() => handleCertChoice(certificate.scan)}
                  >
                    <DocBtnIcon />
                    <span className="opr-rep-doc-btn-label">{certificate.scanLabel}</span>
                    <DocBtnArrow />
                  </button>
                  <button
                    type="button"
                    className="opr-rep-cert-modal-option"
                    onClick={() => handleCertChoice(certificate.photo)}
                  >
                    <span className="opr-rep-doc-btn-icon" aria-hidden>
                      <svg className="opr-rep-doc-icon" viewBox="0 0 24 24" fill="none">
                        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.75" />
                        <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
                        <path
                          d="m21 15-5-5L5 21"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="opr-rep-doc-btn-label">{certificate.photoShortLabel}</span>
                    <DocBtnArrow />
                  </button>
                </div>

                <div className="border-t border-[var(--opr-navy)]/8 px-4 py-3">
                  <button
                    type="button"
                    className="opr-rep-cert-modal-cancel"
                    onClick={closeModal}
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>,
          portalTarget,
        )}
    </>
  );
}
