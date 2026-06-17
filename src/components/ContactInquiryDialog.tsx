"use client";

import * as React from "react";
import { createPortal } from "react-dom";

type Status = "idle" | "loading" | "success" | "error";

type FieldErrors = {
  fullName?: string;
  email?: string;
  phone?: string;
  formation?: string;
  message?: string;
};

type ContactInquiryDialogProps = {
  trigger: React.ReactElement<React.ButtonHTMLAttributes<HTMLButtonElement>>;
  title?: string;
  description?: string;
  messageLabel?: string;
  messagePlaceholder?: string;
  submitLabel?: string;
  showFormationField?: boolean;
  formationLabel?: string;
  defaultFormation?: string;
};

const formationOptions = [
  "Développement Web / Full Stack - BTS SIO",
  "Data & IA",
  "Cybersécurité",
  "Je ne sais pas encore",
];

export function ContactInquiryDialog({
  trigger,
  title = "Demande de renseignements",
  description = "Indiquez vos coordonnées et la formation qui vous intéresse. Nous reviendrons vers vous rapidement.",
  messageLabel = "Message",
  messagePlaceholder = "Votre demande, vos disponibilités ou vos questions...",
  submitLabel = "Envoyer",
  showFormationField = true,
  formationLabel = "Formation souhaitée",
  defaultFormation = "",
}: ContactInquiryDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [status, setStatus] = React.useState<Status>("idle");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [fieldErrors, setFieldErrors] = React.useState<FieldErrors>({});
  const openTimeRef = React.useRef<number>(0);
  const dialogRef = React.useRef<HTMLDivElement>(null);
  const previousFocusRef = React.useRef<HTMLElement | null>(null);
  const titleId = React.useId();
  const descriptionId = React.useId();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (!open) return;

    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.requestAnimationFrame(() => {
      const firstInput = dialogRef.current?.querySelector<HTMLElement>(
        "input, select, textarea, button",
      );
      firstInput?.focus();
    });

    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus();
    };
  }, [open]);

  // Auto-close after success
  React.useEffect(() => {
    if (status !== "success") return;
    const timer = setTimeout(() => closeDialog(), 3500);
    return () => clearTimeout(timer);
  }, [status]);

  function clearFieldError(field: keyof FieldErrors) {
    setFieldErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    const form = event.currentTarget;

    const nom = (form.elements.namedItem("fullName") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const telephone = (form.elements.namedItem("phone") as HTMLInputElement).value.trim();
    const formation = showFormationField
      ? (form.elements.namedItem("formation") as HTMLSelectElement)?.value ?? ""
      : "";
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim();

    const errors: FieldErrors = {};
    if (!nom) errors.fullName = "Veuillez renseigner votre nom complet.";
    if (!email) {
      errors.email = "Veuillez renseigner votre email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = "L'adresse email n'est pas valide.";
    }
    if (!telephone) errors.phone = "Veuillez renseigner votre téléphone.";
    if (showFormationField && !formation) errors.formation = "Veuillez sélectionner une formation.";
    if (!message) errors.message = "Veuillez renseigner votre message.";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      const firstErrorField = form.querySelector<HTMLElement>("[aria-invalid='true']");
      firstErrorField?.focus();
      return;
    }

    setFieldErrors({});
    setStatus("loading");

    const payload = {
      nom,
      email,
      telephone,
      formation,
      message,
      _url: (form.elements.namedItem("_url") as HTMLInputElement)?.value ?? "",
      _t: String(openTimeRef.current),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const json = (await res.json()) as { success?: boolean; error?: string };

      if (!res.ok) {
        setStatus("error");
        setErrorMessage(json.error ?? "Une erreur est survenue. Veuillez réessayer.");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMessage("Erreur réseau. Vérifiez votre connexion et réessayez.");
    }
  }

  function openDialog() {
    setIsClosing(false);
    setStatus("idle");
    setErrorMessage("");
    setFieldErrors({});
    openTimeRef.current = Date.now();
    setOpen(true);
  }

  function closeDialog() {
    setIsClosing(true);
  }

  function handleDialogKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      closeDialog();
      return;
    }

    if (event.key !== "Tab") return;

    const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    );

    if (!focusableElements?.length) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }

  const triggerElement = React.cloneElement(trigger, {
    onClick: (event) => {
      trigger.props.onClick?.(event);
      if (!event.defaultPrevented) openDialog();
    },
  });

  return (
    <>
      {triggerElement}
      {mounted && open
        ? createPortal(
            <div
              className={`contact-dialog-overlay ${isClosing ? "is-closing" : "is-opening"}`}
              onAnimationEnd={(event) => {
                if (isClosing && event.target === event.currentTarget) {
                  setOpen(false);
                  setStatus("idle");
                }
              }}
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) closeDialog();
              }}
            >
              <div
                ref={dialogRef}
                className={`contact-dialog-content ${isClosing ? "is-closing" : "is-opening"}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby={titleId}
                aria-describedby={descriptionId}
                onKeyDown={handleDialogKeyDown}
              >
                <button
                  type="button"
                  className="contact-dialog-close"
                  aria-label="Fermer la modale"
                  onClick={closeDialog}
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.25"
                    strokeLinecap="round"
                  >
                    <path d="M6 6l12 12" />
                    <path d="M18 6l-12 12" />
                  </svg>
                </button>

                <div className="contact-dialog-header">
                  <h2 id={titleId} className="contact-dialog-title">
                    {title}
                  </h2>
                  <p id={descriptionId} className="contact-dialog-description">
                    {description}
                  </p>
                </div>

                {status === "success" ? (
                  <div style={{ textAlign: "center", padding: "2rem 0" }}>
                    <div
                      aria-hidden="true"
                      style={{
                        width: 56,
                        height: 56,
                        borderRadius: "50%",
                        background:
                          "linear-gradient(135deg,rgba(92,111,255,.25),rgba(173,107,255,.25))",
                        border: "1px solid rgba(173,107,255,.5)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 1.25rem",
                      }}
                    >
                      <svg
                        width="26"
                        height="26"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#ad6bff"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <p
                      style={{
                        color: "#fff",
                        fontWeight: 500,
                        fontSize: "1.1rem",
                        marginBottom: ".5rem",
                      }}
                    >
                      Message envoyé !
                    </p>
                    <p style={{ color: "#9ca3af", fontSize: ".9rem" }}>
                      Nous reviendrons vers vous très prochainement.
                    </p>
                  </div>
                ) : (
                  <form
                    className="contact-dialog-form"
                    onSubmit={handleSubmit}
                    noValidate
                  >
                    {/* Honeypot — invisible pour les humains, piège pour les bots */}
                    <div
                      aria-hidden="true"
                      style={{
                        position: "absolute",
                        left: "-9999px",
                        top: "-9999px",
                        opacity: 0,
                        pointerEvents: "none",
                      }}
                    >
                      <label htmlFor="contact-url">
                        Ne pas remplir ce champ
                      </label>
                      <input
                        id="contact-url"
                        name="_url"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                      />
                    </div>

                    <div className="contact-dialog-field">
                      <label htmlFor="contact-full-name">Nom complet</label>
                      <input
                        id="contact-full-name"
                        name="fullName"
                        type="text"
                        autoComplete="name"
                        maxLength={100}
                        disabled={status === "loading"}
                        aria-invalid={!!fieldErrors.fullName}
                        aria-describedby={fieldErrors.fullName ? "err-fullName" : undefined}
                        onChange={() => clearFieldError("fullName")}
                        style={fieldErrors.fullName ? { borderColor: "#f87171" } : undefined}
                      />
                      {fieldErrors.fullName && (
                        <span id="err-fullName" className="contact-dialog-field-error" role="alert">
                          {fieldErrors.fullName}
                        </span>
                      )}
                    </div>

                    <div className="contact-dialog-grid">
                      <div className="contact-dialog-field">
                        <label htmlFor="contact-email">Email</label>
                        <input
                          id="contact-email"
                          name="email"
                          type="email"
                          autoComplete="email"
                          maxLength={254}
                          disabled={status === "loading"}
                          aria-invalid={!!fieldErrors.email}
                          aria-describedby={fieldErrors.email ? "err-email" : undefined}
                          onChange={() => clearFieldError("email")}
                          style={fieldErrors.email ? { borderColor: "#f87171" } : undefined}
                        />
                        {fieldErrors.email && (
                          <span id="err-email" className="contact-dialog-field-error" role="alert">
                            {fieldErrors.email}
                          </span>
                        )}
                      </div>

                      <div className="contact-dialog-field">
                        <label htmlFor="contact-phone">Téléphone</label>
                        <input
                          id="contact-phone"
                          name="phone"
                          type="tel"
                          autoComplete="tel"
                          maxLength={20}
                          disabled={status === "loading"}
                          aria-invalid={!!fieldErrors.phone}
                          aria-describedby={fieldErrors.phone ? "err-phone" : undefined}
                          onChange={() => clearFieldError("phone")}
                          style={fieldErrors.phone ? { borderColor: "#f87171" } : undefined}
                        />
                        {fieldErrors.phone && (
                          <span id="err-phone" className="contact-dialog-field-error" role="alert">
                            {fieldErrors.phone}
                          </span>
                        )}
                      </div>
                    </div>

                    {showFormationField ? (
                      <div className="contact-dialog-field">
                        <label htmlFor="contact-formation">
                          {formationLabel}
                        </label>
                        <select
                          id="contact-formation"
                          name="formation"
                          defaultValue={defaultFormation}
                          disabled={status === "loading"}
                          aria-invalid={!!fieldErrors.formation}
                          aria-describedby={fieldErrors.formation ? "err-formation" : undefined}
                          onChange={() => clearFieldError("formation")}
                          style={fieldErrors.formation ? { borderColor: "#f87171" } : undefined}
                        >
                          <option value="">Sélectionnez une formation</option>
                          {formationOptions.map((formation) => (
                            <option key={formation} value={formation}>
                              {formation}
                            </option>
                          ))}
                        </select>
                        {fieldErrors.formation && (
                          <span id="err-formation" className="contact-dialog-field-error" role="alert">
                            {fieldErrors.formation}
                          </span>
                        )}
                      </div>
                    ) : null}

                    <div className="contact-dialog-field">
                      <label htmlFor="contact-message">{messageLabel}</label>
                      <textarea
                        id="contact-message"
                        name="message"
                        rows={5}
                        placeholder={messagePlaceholder}
                        maxLength={2000}
                        disabled={status === "loading"}
                        aria-invalid={!!fieldErrors.message}
                        aria-describedby={fieldErrors.message ? "err-message" : undefined}
                        onChange={() => clearFieldError("message")}
                        style={fieldErrors.message ? { borderColor: "#f87171" } : undefined}
                      />
                      {fieldErrors.message && (
                        <span id="err-message" className="contact-dialog-field-error" role="alert">
                          {fieldErrors.message}
                        </span>
                      )}
                    </div>

                    {status === "error" && errorMessage ? (
                      <p
                        role="alert"
                        style={{
                          color: "#f87171",
                          fontSize: ".875rem",
                          margin: 0,
                          padding: ".6rem .9rem",
                          background: "rgba(239,68,68,.08)",
                          border: "1px solid rgba(239,68,68,.25)",
                          borderRadius: 10,
                        }}
                      >
                        {errorMessage}
                      </p>
                    ) : null}

                    <div className="contact-dialog-actions">
                      <button
                        type="button"
                        className="contact-dialog-button secondary"
                        onClick={closeDialog}
                        disabled={status === "loading"}
                      >
                        Fermer
                      </button>
                      <button
                        type="submit"
                        className="contact-dialog-button primary"
                        disabled={status === "loading"}
                        style={
                          status === "loading"
                            ? { opacity: 0.7, cursor: "not-allowed" }
                            : undefined
                        }
                      >
                        {status === "loading" ? (
                          <>
                            <svg
                              aria-hidden="true"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              style={{
                                marginRight: 8,
                                animation: "spin 0.8s linear infinite",
                              }}
                            >
                              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                            </svg>
                            Envoi en cours…
                          </>
                        ) : (
                          submitLabel
                        )}
                      </button>
                    </div>

                    {/* Notice RGPD obligatoire — Art. 13 RGPD */}
                    <p className="contact-dialog-rgpd">
                      Les données collectées sont utilisées uniquement pour répondre à votre demande.
                      Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification
                      et de suppression. Pour l&apos;exercer :{" "}
                      <a href="mailto:contact@lgc-rd.fr" className="contact-dialog-rgpd-link">
                        contact@lgc-rd.fr
                      </a>
                      {" — "}
                      <button
                        type="button"
                        className="contact-dialog-rgpd-link"
                        onClick={() => {
                          const btn = document.querySelector<HTMLButtonElement>("[data-open-policy]");
                          btn?.click();
                        }}
                      >
                        Politique de confidentialité
                      </button>
                    </p>
                  </form>
                )}
              </div>
            </div>,
            document.body,
          )
        : null}
    </>
  );
}
