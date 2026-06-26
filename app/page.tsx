import Script from "next/script";
import AnimatedProgressBar from "@/components/AnimatedProgressBar";

const heroBackground = "/images/background-desktop.webp";
const mobileHeroBackground = "/images/backdrop-mobile.webp";

const frameBackground =
  "https://pages.greatpages.com.br/lp.leandrocraig.com-up1/1779908478/imagens/desktop/2810123_1_17484831886837bc746bc3d732676545.svg";

const videoCover =
  "https://images.converteai.net/b397f94e-104c-4be6-9167-4643573103b7/players/6837bc40927070651cf06433/cover.jpg";

const hubLoginHref = "https://hub.speakingrooms.com.br/login";

function VturbPlayer() {
  return (
    <div
      className="relative mx-auto w-full max-w-[637px] overflow-hidden rounded-md bg-contain bg-center bg-no-repeat p-[4.6%] shadow-video backdrop-blur-[30px]"
      style={{ backgroundImage: `url(${frameBackground})` }}
    >
      <div className="absolute inset-0 bg-white/10" />
      <div
        id="vid_6837bc40927070651cf06433"
        className="relative z-10 mx-auto aspect-video w-full overflow-hidden bg-black"
      >
        <img
          id="thumb_6837bc40927070651cf06433"
          src={videoCover}
          alt="thumbnail"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          id="backdrop_6837bc40927070651cf06433"
          className="absolute inset-0 bg-black/20"
        />
      </div>
      <Script id="scr_6837bc40927070651cf06433" strategy="afterInteractive">
        {`var s=document.createElement("script");s.src="https://scripts.converteai.net/b397f94e-104c-4be6-9167-4643573103b7/players/6837bc40927070651cf06433/player.js";s.async=true;document.head.appendChild(s);`}
      </Script>
    </div>
  );
}

function HiddenCtas() {
  return (
    <div
      id="vturb-cta-group"
      className="vturb-cta-group mx-auto mt-10 w-full max-w-[640px] flex-col items-center gap-5 sm:mt-14"
      data-vturb-target="upsell-ctas"
    >
      <div className="relative flex w-full flex-col items-center justify-center gap-3">
        <div className="text-center font-[Arial] text-lg font-black uppercase text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.7)] sm:hidden">
          ÚLTIMA CHANCE ❗
          <span aria-hidden="true" className="block leading-none">
            ↓
          </span>
        </div>
        <button className="ticto-upsell-button min-h-[56px] w-full max-w-[500px] rounded-[10px] bg-buy px-5 py-3 text-center font-[Arial] text-[18px] font-black uppercase leading-tight text-white sm:text-[20px]">
          COMPRAR O PRESENTE MISTERIOSO POR R$9,90
        </button>
        <div className="absolute left-[calc(50%+270px)] top-1/2 hidden -translate-y-1/2 whitespace-nowrap text-center font-[Arial] text-lg font-black uppercase text-white drop-shadow-[0_2px_3px_rgba(0,0,0,0.7)] sm:block sm:text-left">
          <span aria-hidden="true">← </span>ÚLTIMA CHANCE ❗
        </div>
      </div>

      <a
        href={hubLoginHref}
        className="ticto-refuse-button flex min-h-[38px] w-full max-w-[360px] items-center justify-center rounded-[10px] bg-refuse px-4 py-2 text-center font-[Roboto] text-[15px] font-medium text-white"
      >
        Não quero o presente.
      </a>

      <a
        href={hubLoginHref}
        className="flex min-h-[38px] w-full max-w-[360px] items-center justify-center rounded-[10px] bg-[#0349b9] px-4 py-2 text-center font-[Roboto] text-[15px] font-medium text-white"
      >
        Já comprei por R$2 na tela anterior 😎
      </a>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <header className="flex min-h-10 items-center justify-center bg-alert px-5 py-2 text-center sm:min-h-[72px]">
        <div className="flex w-full max-w-[980px] flex-col items-center justify-center gap-3 sm:flex-row sm:justify-start sm:gap-10">
          <h2 className="font-montserrat text-base leading-snug text-white sm:min-w-[430px] sm:whitespace-nowrap sm:text-2xl">
            ⚠️ Sua compra não está concluída
          </h2>
          <div className="w-full max-w-[316px] sm:max-w-[391px]">
            <AnimatedProgressBar durationMs={45000} finalPercent={88} />
          </div>
        </div>
      </header>

      <section className="relative isolate min-h-[calc(100vh-40px)] overflow-hidden px-3 pb-12 pt-6 sm:min-h-[calc(100vh-72px)] sm:px-6 sm:pt-5">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center sm:hidden"
          style={{ backgroundImage: `url(${mobileHeroBackground})` }}
        />
        <div
          className="absolute inset-0 -z-10 hidden bg-cover bg-[59%_44%] sm:block"
          style={{ backgroundImage: `url(${heroBackground})` }}
        />
        <div className="relative z-10">
          <h1 className="mx-auto w-[88%] max-w-[430px] text-center font-montserrat text-lg font-bold leading-[1.4] text-gold sm:mt-[68px] sm:w-auto sm:max-w-[560px] sm:text-[28px] sm:leading-[1.1]">
            Assista o TUTORIAL abaixo com atenção para finalizar sua compra.
          </h1>

          <div className="mx-auto mt-6 max-w-[637px] sm:mt-10 sm:scale-[1.05]">
            <VturbPlayer />
          </div>

          <HiddenCtas />
        </div>
      </section>

      <Script id="vturb-cta-bridge" strategy="afterInteractive">
        {`
          (function () {
            function showCtas() {
              var group = document.getElementById("vturb-cta-group");
              if (group) group.classList.add("is-visible");
              document.body.classList.add("show-upsell-ctas");
            }

            window.showUpsellCtas = showCtas;
            window.addEventListener("vturb:show-ctas", showCtas);
            window.addEventListener("message", function (event) {
              if (event && event.data && event.data.type === "show-upsell-ctas") {
                showCtas();
              }
            });

            if (new URLSearchParams(window.location.search).get("showCtas") === "1") {
              showCtas();
            }
          })();
        `}
      </Script>
    </main>
  );
}
