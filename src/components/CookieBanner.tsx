"use client";

import { useEffect, useRef, useState } from "react";

const STORAGE_KEY = "cookie_consent_v2";
const LEGACY_KEY = "cookie_consent";
const EXPIRY_MS = 13 * 30 * 24 * 60 * 60 * 1000; // 13 mois max CNIL

type ConsentData = {
  value: "accepted" | "refused" | "custom";
  expires: number;
  preferences: { analytics: boolean };
};

function getStoredConsent(): ConsentData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentData;
    if (Date.now() > parsed.expires) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

function saveConsent(data: Omit<ConsentData, "expires">) {
  const toStore: ConsentData = { ...data, expires: Date.now() + EXPIRY_MS };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [closing, setClosing] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);
  const firstBtnRef = useRef<HTMLButtonElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Migration depuis l'ancienne clé sans expiration
    const legacy = localStorage.getItem(LEGACY_KEY);
    if (legacy && !localStorage.getItem(STORAGE_KEY)) {
      saveConsent({
        value: legacy as "accepted" | "refused",
        preferences: { analytics: legacy === "accepted" },
      });
      localStorage.removeItem(LEGACY_KEY);
    }
    if (!getStoredConsent()) {
      setVisible(true);
    }
  }, []);

  useEffect(() => {
    if (visible) {
      // Focus le premier bouton dès que la bannière est visible
      requestAnimationFrame(() => firstBtnRef.current?.focus());
    }
  }, [visible, showPreferences]);

  // Focus trap dans la bannière
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") {
      dismiss("refused");
      return;
    }
    if (e.key !== "Tab") return;
    const focusable = bannerRef.current?.querySelectorAll<HTMLElement>(
      "button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex='-1'])",
    );
    if (!focusable?.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const dismiss = (value: "accepted" | "refused" | "custom", analytics?: boolean) => {
    saveConsent({
      value,
      preferences: { analytics: analytics ?? value === "accepted" },
    });
    setClosing(true);
    setTimeout(() => setVisible(false), 400);
  };

  if (!visible) return null;

  const bannerClass = closing ? "cookie-banner cookie-banner-out" : "cookie-banner cookie-banner-in";

  if (showPreferences) {
    return (
      <div
        ref={bannerRef}
        className={bannerClass}
        role="dialog"
        aria-label="Personnaliser les préférences cookies"
        aria-modal="true"
        onKeyDown={handleKeyDown}
      >
        <div className="cookie-banner-inner cookie-banner-prefs">
          <p className="cookie-banner-title">Personnaliser mes préférences</p>

          <div className="cookie-pref-row">
            <div className="cookie-pref-info">
              <span className="cookie-pref-label">Cookies nécessaires</span>
              <span className="cookie-pref-desc">
                Indispensables au fonctionnement du site (session, consentement). Ne peuvent pas être désactivés.
              </span>
            </div>
            <span className="cookie-pref-always" aria-label="Toujours actifs">Toujours actifs</span>
          </div>

          <div className="cookie-pref-row">
            <div className="cookie-pref-info">
              <span className="cookie-pref-label">Cookies analytiques</span>
              <span className="cookie-pref-desc">
                Permettent de mesurer l'audience et d'améliorer le service (aucun tracker tiers actuellement actif).
              </span>
            </div>
            <label className="cookie-toggle" aria-label="Activer les cookies analytiques">
              <input
                type="checkbox"
                checked={analyticsEnabled}
                onChange={(e) => setAnalyticsEnabled(e.target.checked)}
              />
              <span className="cookie-toggle-track" aria-hidden="true" />
            </label>
          </div>

          <div className="cookie-banner-actions cookie-banner-actions-full">
            <button
              ref={firstBtnRef}
              type="button"
              className="cookie-banner-btn cookie-banner-btn-refuse"
              onClick={() => setShowPreferences(false)}
            >
              Retour
            </button>
            <button
              type="button"
              className="cookie-banner-btn cookie-banner-btn-accept"
              onClick={() => dismiss("custom", analyticsEnabled)}
            >
              Confirmer mes choix
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={bannerRef}
      className={bannerClass}
      role="dialog"
      aria-label="Consentement aux cookies"
      aria-modal="true"
      onKeyDown={handleKeyDown}
    >
      <div className="cookie-banner-inner">
        <div className="cookie-banner-text">
          <p className="cookie-banner-title">Cookies &amp; confidentialité</p>
          <p className="cookie-banner-desc">
            Ce site utilise des cookies essentiels à son fonctionnement. En continuant, vous acceptez notre{" "}
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
            ref={firstBtnRef}
            type="button"
            className="cookie-banner-btn cookie-banner-btn-refuse"
            onClick={() => dismiss("refused")}
          >
            Refuser
          </button>
          <button
            type="button"
            className="cookie-banner-btn cookie-banner-btn-customize"
            onClick={() => setShowPreferences(true)}
          >
            Personnaliser
          </button>
          <button
            type="button"
            className="cookie-banner-btn cookie-banner-btn-accept"
            onClick={() => dismiss("accepted")}
          >
            Tout accepter
          </button>
        </div>
      </div>
    </div>
  );
}
