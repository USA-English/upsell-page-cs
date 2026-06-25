import Script from "next/script";
import AnimatedProgressBar from "@/components/AnimatedProgressBar";

const heroBackground =
  "https://pages.greatpages.com.br/lp.leandrocraig.com-up1/1779908478/imagens/desktop/2810123_1_17484831886837bc746b7c3.png";

const frameBackground =
  "https://pages.greatpages.com.br/lp.leandrocraig.com-up1/1779908478/imagens/desktop/2810123_1_17484831886837bc746bc3d732676545.svg";

const videoCover =
  "https://images.converteai.net/b397f94e-104c-4be6-9167-4643573103b7/players/6837bc40927070651cf06433/cover.jpg";

const whatsappHref =
  "https://wa.me/5511922235589?text=Ol%C3%A1%2C%20comprei%20o%20Conversation%20Strategies%20e%20queria%20saber%20mais%20sobre%20o%20Speaking%20Rooms!";

function VturbPlayer() {
  return (
    <div
      className="mx-auto w-full max-w-[637px] bg-contain bg-center bg-no-repeat p-[4.6%] shadow-video"
      style={{ backgroundImage: `url(${frameBackground})` }}
    >
      <div
        id="vid_6837bc40927070651cf06433"
        className="relative mx-auto aspect-video w-full overflow-hidden bg-black"
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
      className="vturb-cta-group mx-auto mt-4 w-full max-w-[360px] flex-col gap-3"
      data-vturb-target="upsell-ctas"
    >
      <button className="ticto-upsell-button min-h-[50px] rounded-[10px] bg-buy px-4 py-2 text-center font-[Arial] text-[21px] font-black uppercase text-white">
        COMPRAR AGORA
      </button>
      <button className="ticto-refuse-button min-h-[38px] rounded-[10px] bg-refuse px-4 py-2 text-center font-[Roboto] text-[15px] font-medium uppercase text-white">
        NÃO QUERO, OBRIGADO
      </button>
      <a
        href={whatsappHref}
        className="min-h-[50px] rounded-[10px] bg-whatsapp px-4 py-2 text-center font-[Arial] text-[21px] font-black uppercase text-white"
      >
        AINDA ESTOU COM DÚVIDAS
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

      <section
        className="min-h-[543px] bg-cover bg-[59%_44%] px-3 pb-12 pt-6 sm:min-h-[711px] sm:px-6 sm:pt-5"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <h1 className="mx-auto max-w-[560px] text-center font-montserrat text-lg font-bold leading-[1.4] text-gold sm:mt-[68px] sm:text-[28px] sm:leading-[1.1]">
          Assista o TUTORIAL abaixo com atenção para finalizar sua compra.
        </h1>

        <div className="mx-auto mt-6 max-w-[637px] sm:mt-10">
          <VturbPlayer />
        </div>

        <HiddenCtas />
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
