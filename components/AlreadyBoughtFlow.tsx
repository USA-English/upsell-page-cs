"use client";

import { useState } from "react";

const makeWebhookUrl =
  "https://hook.us2.make.com/22jehst3h93w5vi01r3vel961clrzkee";
const finalConvertedUrl = "https://typ-final-converted-cs.leandrocraig.com/";
const fallbackDelayMs = 10000;

function buildRedirectUrl(destination: string) {
  const currentUrl = new URL(window.location.href);
  const newUrl = new URL(destination);

  currentUrl.searchParams.forEach((value, key) => {
    newUrl.searchParams.append(key, value);
  });

  return newUrl.toString();
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function wait(ms: number) {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
}

export default function AlreadyBoughtFlow() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [wasDenied, setWasDenied] = useState(false);
  const normalizedEmail = email.trim().toLowerCase();
  const canVerifyPurchase = isValidEmail(normalizedEmail);

  function closeDialog() {
    if (isSubmitting) return;
    setIsOpen(false);
    setEmail("");
    setError("");
    setWasDenied(false);
  }

  function redirectToFinalConverted() {
    window.location.href = buildRedirectUrl(finalConvertedUrl);
  }

  async function handleFallback(startedAt: number) {
    const elapsed = Date.now() - startedAt;
    if (elapsed < fallbackDelayMs) {
      await wait(fallbackDelayMs - elapsed);
    }

    redirectToFinalConverted();
  }

  async function handleVerifyClick() {
    if (!isValidEmail(normalizedEmail)) {
      setError("Informe um email válido para continuar.");
      return;
    }

    setError("");
    setIsSubmitting(true);
    const startedAt = Date.now();

    try {
      const url = new URL(makeWebhookUrl);
      url.searchParams.set("email", normalizedEmail);

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: { Accept: "application/json" },
        cache: "no-store"
      });

      if (!response.ok) {
        await handleFallback(startedAt);
        return;
      }

      const data = (await response.json()) as { hasGift?: unknown };

      if (data.hasGift === true) {
        redirectToFinalConverted();
        return;
      }

      if (data.hasGift === false) {
        setWasDenied(true);
        setIsSubmitting(false);
        return;
      }

      await handleFallback(startedAt);
    } catch {
      await handleFallback(startedAt);
    }
  }

  return (
    <>
      <button
        id="alreadyBoughtButton"
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex min-h-[38px] w-full max-w-[360px] items-center justify-center rounded-[10px] bg-[#0349b9] px-4 py-2 text-center font-[Roboto] text-[15px] font-medium text-white"
      >
        Já comprei por R$2 na tela anterior 😎
      </button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6"
          role="presentation"
        >
          <div
            aria-modal="true"
            role="dialog"
            aria-labelledby="already-bought-title"
            className="w-full max-w-[420px] rounded-[10px] bg-white p-6 text-center text-[#111]"
          >
            {wasDenied ? (
              <>
                <h2
                  id="already-bought-title"
                  className="font-montserrat text-xl font-bold leading-tight"
                >
                  Ops! Parece que você não comprou o presente misterioso!
                </h2>
                <p className="mt-4 font-open text-base leading-relaxed">
                  Esse botão só pode ser acionado pelos alunos que compraram o
                  Presente Misterioso na página anterior 😉
                </p>
                <button
                  type="button"
                  onClick={closeDialog}
                  className="mt-6 min-h-[42px] w-full rounded-[10px] bg-[#0349b9] px-5 py-2 font-[Roboto] text-[15px] font-medium text-white"
                >
                  Voltar
                </button>
              </>
            ) : (
              <div>
                <h2
                  id="already-bought-title"
                  className="font-montserrat text-xl font-bold leading-tight"
                >
                  Confirme seu email de compra
                </h2>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (error) setError("");
                  }}
                  disabled={isSubmitting}
                  placeholder="seuemail@exemplo.com"
                  className="mt-5 h-12 w-full rounded-[8px] border border-[#c9c9c9] px-4 text-left font-open text-base outline-none focus:border-[#0349b9]"
                  autoComplete="email"
                  autoFocus
                />
                {error ? (
                  <p className="mt-3 text-left font-open text-sm text-[#cb2a2a]">
                    {error}
                  </p>
                ) : null}
                <button
                  type="button"
                  onClick={handleVerifyClick}
                  disabled={isSubmitting || !canVerifyPurchase}
                  className="mt-5 min-h-[44px] w-full rounded-[10px] bg-[#0349b9] px-5 py-2 font-[Roboto] text-[15px] font-medium text-white disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Verificando..." : "Verificar compra"}
                </button>
                <button
                  type="button"
                  onClick={closeDialog}
                  disabled={isSubmitting}
                  className="mt-3 min-h-[38px] w-full rounded-[10px] border border-[#d4d4d4] px-5 py-2 font-[Roboto] text-[15px] font-medium text-[#333] disabled:cursor-not-allowed disabled:opacity-70"
                >
                  Voltar
                </button>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
