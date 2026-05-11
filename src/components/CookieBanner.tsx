"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "cookie_consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  const dismiss = (accepted: boolean) => {
    localStorage.setItem(STORAGE_KEY, accepted ? "accepted" : "refused");
    setClosing(true);
    setTimeout(() => setVisible(false), 400);
  };

  if (!visible) return null;

  return (
    <div
      className={closing ? "cookie-banner cookie-banner-out" : "cookie-banner cookie-banner-in"}
      role="dialog"
      aria-label="Consentement aux cookies"
    >
      <div className="cookie-banner-inner">
        <div className="cookie-banner-text">
          <p className="cookie-banner-title">Cookies &amp; confidentialité</p>
          <p className="cookie-banner-desc">
            Ce site utilise des cookies pour améliorer votre expérience. En continuant, vous acceptez notre{" "}
            <button
              type="button"
              className="cookie-banner-link"
              onClick={() => {
                const btn = document.querySelector<HTMLButtonElement>("[data-open-policy]");
                btn?.click();
              }}
            >
              politique de confidentialité
            </button>
            .
          </p>
        </div>
        <div className="cookie-banner-actions">
          <button
            type="button"
            className="cookie-banner-btn cookie-banner-btn-refuse"
            onClick={() => dismiss(false)}
          >
            Refuser
          </button>
          <button
            type="button"
            className="cookie-banner-btn cookie-banner-btn-accept"
            onClick={() => dismiss(true)}
          >
            Tout accepter
          </button>
        </div>
      </div>
    </div>
  );
}
