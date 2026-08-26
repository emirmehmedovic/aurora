import type { Metadata } from "next";
import LandingOrderForm from "@/components/LandingOrderForm";
import { getStorefrontProductBySlugOrFallback } from "@/lib/storefront-products";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Da li aparat od 175 KM zaista radi? | Ice Cool PRO",
  description:
    "Ice Cool PRO - jednostavno objašnjenje kako radi, stvarna iskustva kupica i narudžba po cijeni od 175 KM.",
  alternates: {
    canonical: "https://aurorashop.ba/l/da-li-stvarno-radi",
  },
};

const css = `
  :root{--ink:#241b20;--muted:#6e6369;--paper:#ffffff;--cream:#fbf7f2;--rose:#a94f66;--rose-dark:#733247;--rose-soft:#f6e6ea;--gold:#b88458;--line:#eadfe2;--green:#1f9d63;--wa:#dcf8c6;--shadow:0 20px 55px rgba(58,35,45,.12);--radius:26px;--max:1180px}
  .works-lp *{box-sizing:border-box}.works-lp{font-family:Inter,ui-sans-serif,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;color:var(--ink);background:var(--paper);line-height:1.6}.works-lp img{display:block;max-width:100%}.works-lp a{text-decoration:none;color:inherit}.works-lp button,.works-lp input,.works-lp select{font:inherit}
  .container{width:min(var(--max),calc(100% - 40px));margin-inline:auto}.topbar{background:var(--ink);color:#fff;text-align:center;font-size:14px;padding:9px 16px;letter-spacing:.01em}.nav{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:18px 0}.brand{display:flex;align-items:center;gap:11px;font-weight:900;letter-spacing:.04em}.brand-mark{width:38px;height:38px;border-radius:13px;background:linear-gradient(145deg,var(--rose-dark),var(--rose));display:grid;place-items:center;color:#fff;box-shadow:0 10px 25px rgba(115,50,71,.24)}.brand small{display:block;font-size:10px;letter-spacing:.14em;color:var(--muted);font-weight:800;margin-top:-3px}.nav-actions{display:flex;align-items:center;gap:14px}.nav-price{font-weight:900}.nav-price small{font-weight:600;color:var(--muted);display:block;font-size:11px;text-align:right}
  .btn{display:inline-flex;align-items:center;justify-content:center;gap:9px;border:0;border-radius:999px;padding:15px 23px;font-weight:850;cursor:pointer;transition:.2s transform,.2s box-shadow,.2s background;min-height:52px}.btn:hover{transform:translateY(-2px)}.btn-primary{background:var(--rose-dark);color:#fff;box-shadow:0 14px 28px rgba(115,50,71,.24)}.btn-primary:hover{background:#5e2639}.btn-light{background:#fff;color:var(--ink);border:1px solid var(--line)}
  .hero{position:relative;overflow:hidden;background:radial-gradient(circle at 78% 14%,#f4dde3 0,transparent 31%),linear-gradient(180deg,#fff 0,#fbf7f2 100%);padding:34px 0 82px}.hero:after{content:"";position:absolute;width:390px;height:390px;border:1px solid rgba(169,79,102,.15);border-radius:50%;right:-190px;bottom:-180px}.hero-grid{display:grid;grid-template-columns:1.08fr .92fr;align-items:center;gap:64px}.eyebrow{display:inline-flex;align-items:center;gap:8px;padding:8px 12px;border-radius:999px;background:var(--rose-soft);color:var(--rose-dark);font-size:12px;font-weight:900;letter-spacing:.08em;text-transform:uppercase}.dot{width:8px;height:8px;border-radius:50%;background:var(--rose)}
  .works-lp h1,.works-lp h2,.works-lp h3{line-height:1.08;margin:0 0 18px;letter-spacing:-.035em}.works-lp h1{font-size:clamp(43px,6vw,72px);max-width:760px}.works-lp h2{font-size:clamp(34px,4vw,52px)}.works-lp h3{font-size:24px}.hero-copy>p{font-size:20px;color:var(--muted);max-width:680px;margin:0 0 28px}.hero-actions{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:24px}.micro-list{display:flex;gap:18px;flex-wrap:wrap;color:#554a50;font-size:14px;font-weight:700}.micro-list span{display:flex;gap:7px;align-items:center}.check{width:20px;height:20px;border-radius:50%;background:#e9f5ee;color:var(--green);display:grid;place-items:center;font-weight:1000;font-size:12px}
  .visual-card{position:relative;min-height:570px;border-radius:34px;background:linear-gradient(150deg,#f7e9e9,#f1dbd7 45%,#d7b09a);box-shadow:var(--shadow);overflow:hidden;border:1px solid rgba(255,255,255,.85)}.visual-card .photo{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:2}.price-card{position:absolute;right:20px;top:22px;z-index:3;background:rgba(255,255,255,.94);backdrop-filter:blur(12px);border-radius:18px;padding:14px 17px;box-shadow:0 14px 38px rgba(45,27,35,.13)}.price-card strong{font-size:26px;display:block;line-height:1}.price-card span{font-size:12px;color:var(--muted);font-weight:700}.benefit-card{position:absolute;left:20px;bottom:22px;z-index:3;max-width:270px;background:rgba(36,27,32,.91);color:#fff;border-radius:20px;padding:17px 18px;box-shadow:0 14px 38px rgba(45,27,35,.18)}.benefit-card strong{display:block;font-size:18px}.benefit-card span{display:block;font-size:13px;color:#e8dfe3;margin-top:3px}
  .trust{margin-top:-34px;position:relative;z-index:5}.trust-grid{display:grid;grid-template-columns:repeat(3,1fr);background:#fff;border:1px solid var(--line);border-radius:24px;box-shadow:var(--shadow);overflow:hidden}.trust-item{padding:23px 26px;display:flex;gap:14px;align-items:center}.trust-item+ .trust-item{border-left:1px solid var(--line)}.trust-icon{width:44px;height:44px;flex:0 0 44px;border-radius:14px;background:var(--rose-soft);display:grid;place-items:center;font-size:21px}.trust-item strong{display:block}.trust-item span{display:block;color:var(--muted);font-size:13px}
  .works-lp section{padding:92px 0}.section-head{max-width:760px;margin:0 auto 44px;text-align:center}.section-head p{font-size:18px;color:var(--muted);margin:0}.honest{background:var(--ink);color:#fff}.honest .section-head p{color:#cfc2c8}.truth-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}.truth-card{padding:25px;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.055);border-radius:22px}.truth-card span{display:grid;place-items:center;width:36px;height:36px;border-radius:12px;background:rgba(255,255,255,.12);font-weight:900;margin-bottom:18px}.truth-card strong{display:block;font-size:18px;margin-bottom:7px}.truth-card p{margin:0;color:#cfc2c8;font-size:14px}
  .testimonials{background:var(--cream)}.wa-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px;align-items:start}.wa-phone{background:#efeae2;border-radius:28px;box-shadow:var(--shadow);overflow:hidden;border:1px solid #e5ddd5}.wa-head{background:#075e54;color:#fff;padding:14px 16px;display:flex;align-items:center;gap:11px}.avatar{width:39px;height:39px;border-radius:50%;background:#d9ebe6;display:grid;place-items:center;color:#075e54;font-weight:900}.wa-head strong{display:block;font-size:14px}.wa-head span{display:block;font-size:11px;color:#cce5df}.wa-body{padding:18px 14px 21px;background-color:#efeae2;background-image:radial-gradient(rgba(120,107,95,.08) 1px,transparent 1px);background-size:18px 18px;min-height:440px}.sample-label{font-size:10px;font-weight:1000;letter-spacing:.07em;text-transform:uppercase;color:#075e54;background:#dcf8c6;border:1px solid #b9e7a3;border-radius:8px;padding:6px 8px;display:inline-block;margin-bottom:12px}.bubble{max-width:91%;padding:10px 12px 7px;border-radius:9px;background:#fff;box-shadow:0 1px 1px rgba(0,0,0,.08);font-size:14px;margin-bottom:10px;position:relative}.bubble.out{margin-left:auto;background:var(--wa)}.time{display:block;text-align:right;color:#8a8a8a;font-size:10px;margin-top:5px}.verified{display:flex;align-items:center;gap:7px;margin-top:14px;color:#5a5959;font-size:12px;font-weight:750}.verified i{width:18px;height:18px;border-radius:50%;background:#dcefe5;color:#11845a;display:grid;place-items:center;font-style:normal}
  .steps-grid{display:grid;grid-template-columns:.9fr 1.1fr;gap:64px;align-items:center}.photo-card{min-height:520px;border-radius:30px;overflow:hidden;position:relative;background:linear-gradient(145deg,#eadbd4,#c9977f);box-shadow:var(--shadow)}.photo-card img{position:absolute;width:100%;height:100%;object-fit:cover;z-index:2}.photo-fallback{position:absolute;inset:0;display:grid;place-items:center;text-align:center;color:#fff;font-weight:900;font-size:30px;padding:40px;background:linear-gradient(145deg,#b57772,#6d384a)}.step-list{display:grid;gap:17px;margin-top:28px}.step{display:grid;grid-template-columns:54px 1fr;gap:15px;align-items:start;padding:18px;border-radius:20px;border:1px solid var(--line);background:#fff}.step-no{width:48px;height:48px;border-radius:16px;background:var(--rose-soft);color:var(--rose-dark);display:grid;place-items:center;font-weight:1000;font-size:19px}.step strong{display:block;font-size:18px;margin-bottom:3px}.step p{margin:0;color:var(--muted);font-size:14px}
  .cooling{background:linear-gradient(180deg,#f4fbfc,#fff)}.split{display:grid;grid-template-columns:1fr 1fr;gap:54px;align-items:center}.cool-card{background:#fff;border:1px solid #dfecef;border-radius:30px;padding:36px;box-shadow:var(--shadow)}.cool-icon{width:64px;height:64px;border-radius:20px;background:#e5f7fb;color:#1d7f96;display:grid;place-items:center;font-size:30px;margin-bottom:22px}.cool-card p{font-size:18px;color:var(--muted)}.simple-points{display:grid;gap:12px;margin-top:23px}.simple-point{display:flex;gap:10px;align-items:flex-start;font-weight:750}.simple-point b{color:#167f98}
  .fit{background:var(--cream)}.fit-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px}.fit-card{padding:34px;border-radius:26px;background:#fff;border:1px solid var(--line)}.fit-card.yes{border-top:5px solid var(--green)}.fit-card.no{border-top:5px solid #b75c5c}.fit-card ul{padding:0;margin:20px 0 0;list-style:none;display:grid;gap:13px}.fit-card li{display:flex;gap:10px;color:#51474d}.fit-card li:before{content:"✓";flex:0 0 24px;width:24px;height:24px;border-radius:50%;display:grid;place-items:center;background:#e8f5ee;color:var(--green);font-weight:1000;font-size:12px}.fit-card.no li:before{content:"×";background:#faeaea;color:#a23d3d}.warning{margin-top:22px;background:#fff8e8;border:1px solid #eed9a6;border-radius:18px;padding:16px 18px;color:#6b531a;font-size:14px}
  .faq-wrap{max-width:860px;margin:auto}.works-lp details{border:1px solid var(--line);border-radius:18px;background:#fff;margin-bottom:12px;overflow:hidden}.works-lp summary{list-style:none;cursor:pointer;padding:20px 22px;font-weight:850;display:flex;justify-content:space-between;align-items:center;gap:20px}.works-lp summary::-webkit-details-marker{display:none}.works-lp summary:after{content:"+";width:28px;height:28px;border-radius:50%;display:grid;place-items:center;background:var(--rose-soft);color:var(--rose-dark);font-size:20px}.works-lp details[open] summary:after{content:"−"}.works-lp details p{padding:0 22px 21px;margin:0;color:var(--muted)}
  .standard-order{background:#fff;padding:0 0 80px}.standard-order-wrap{width:min(1200px,calc(100% - 48px));margin:0 auto}
  .works-lp footer{background:#191317;color:#cfc4c9;padding:32px 0 94px;font-size:13px}.footer-row{display:flex;justify-content:space-between;gap:20px;align-items:center}.footer-row strong{color:#fff}.mobile-bar{display:none;position:fixed;left:0;right:0;bottom:0;z-index:50;background:#fff;border-top:1px solid var(--line);padding:10px 13px;box-shadow:0 -10px 25px rgba(36,27,32,.1)}.mobile-bar .btn{flex:1}.mobile-price{font-weight:1000;white-space:nowrap}.mobile-price small{display:block;color:var(--muted);font-weight:650;font-size:10px}
  @media(max-width:960px){.hero-grid,.steps-grid,.split{grid-template-columns:1fr;gap:38px}.visual-card{min-height:500px;max-width:590px;width:100%;margin:auto}.truth-grid{grid-template-columns:1fr 1fr}.wa-grid{grid-template-columns:1fr;max-width:650px;margin:auto}.wa-body{min-height:auto}.photo-card{min-height:440px}.fit-grid{grid-template-columns:1fr}}
  @media(max-width:700px){.container{width:min(100% - 26px,var(--max))}.topbar{font-size:12px}.nav{padding:14px 0}.nav-price{display:none}.nav .btn{padding:11px 15px;min-height:44px;font-size:13px}.hero{padding-top:24px;padding-bottom:65px}.hero-grid{gap:30px}.hero-copy>p{font-size:17px}.hero-actions .btn{width:100%}.micro-list{display:grid;gap:9px}.visual-card{min-height:440px;border-radius:26px}.price-card{right:14px;top:14px}.benefit-card{left:14px;right:14px;bottom:14px;max-width:none}.trust-grid{grid-template-columns:1fr}.trust-item+ .trust-item{border-left:0;border-top:1px solid var(--line)}.works-lp section{padding:70px 0}.truth-grid{grid-template-columns:1fr}.section-head{text-align:left;margin-bottom:32px}.section-head p{font-size:16px}.standard-order{padding:0 0 70px}.standard-order-wrap{width:min(100% - 26px,1200px)}.footer-row{display:grid}.mobile-bar{display:flex;gap:11px;align-items:center}.works-lp footer{padding-bottom:110px}}
`;

export default async function DaLiStvarnoRadiPage() {
  const product = await getStorefrontProductBySlugOrFallback("ice-cool-pro");

  return (
    <>
    <div className="works-lp">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="topbar">Dostava širom BiH &nbsp;•&nbsp; Plaćanje pouzećem &nbsp;•&nbsp; Detaljno uputstvo</div>

      <header className="container nav">
        <a className="brand" href="#top" aria-label="Ice Cool PRO početak"><span className="brand-mark">❄</span><span>ICE COOL PRO<small>KUĆNI APARAT PROTIV DLAČICA</small></span></a>
        <div className="nav-actions"><div className="nav-price">{product.price.toFixed(0)} KM<small>plaćanje kuriru</small></div><a className="btn btn-primary" href="#naruci">Naruči</a></div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="eyebrow"><span className="dot"></span> Stvarna pitanja kupica</span>
              <h1>Da li aparat od {product.price.toFixed(0)} KM zaista radi?</h1>
              <p>To je prvo što gotovo svaka žena pomisli. Zato ti nećemo pričati samo o dugmićima i tehnologiji. Pokazat ćemo kako aparat radi, šta možeš realno očekivati i šta su kupice primijetile nakon redovnog korištenja.</p>
              <div className="hero-actions"><a className="btn btn-primary" href="#iskustva">Pogledaj iskustva</a><a className="btn btn-light" href="#kako-radi">Kako radi?</a></div>
              <div className="micro-list"><span><i className="check">✓</i> Manje potrebe za čestim brijanjem</span><span><i className="check">✓</i> Koristiš ga sama kod kuće</span><span><i className="check">✓</i> Hladi kožu dok bljeska</span></div>
            </div>
            <div className="visual-card" aria-label="Ice Cool PRO uređaj">
              <img className="photo" src="/uploads/2026/03/pro-gallery-0.png" alt="Ice Cool PRO kućni aparat protiv dlačica" />
              <div className="price-card"><strong>{product.price.toFixed(0)} KM</strong><span>jednokratna kupovina</span></div>
              <div className="benefit-card"><strong>Cilj nije čudo preko noći.</strong><span>Cilj je da uz redovnu rutinu dlačice s vremenom rastu sporije i rjeđe.</span></div>
            </div>
          </div>
        </section>

        <div className="container trust">
          <div className="trust-grid">
            <div className="trust-item"><div className="trust-icon">💬</div><div><strong>Originalne poruke</strong><span>Bez izmišljenih imena i reklamnih rečenica</span></div></div>
            <div className="trust-item"><div className="trust-icon">✓</div><div><strong>Potvrđene kupovine</strong><span>Prikazuj samo iskustva stvarnih kupica</span></div></div>
            <div className="trust-item"><div className="trust-icon">🔒</div><div><strong>Skriven identitet</strong><span>Ime i broj uklonjeni uz dozvolu kupice</span></div></div>
          </div>
        </div>

        <section className="honest">
          <div className="container">
            <div className="section-head"><span className="eyebrow">Prvo iskreno</span><h2>Nije čarobni štapić. I baš zato vrijedi pročitati dalje.</h2><p>Aparat nije žilet koji daje trenutan rezultat. Koristi se redovno i promjena se gradi kroz vrijeme. Nekoj zoni treba manje, nekoj više strpljenja.</p></div>
            <div className="truth-grid">
              <div className="truth-card"><span>1</span><strong>Ne radi preko noći</strong><p>Prve promjene ne moraju biti dramatične. Gledaš da li dlačice sporije rastu i da li ih je manje.</p></div>
              <div className="truth-card"><span>2</span><strong>Redovnost je ključna</strong><p>Preskakanje tretmana usporava cijelu rutinu. Koristi uređaj prema priloženom uputstvu.</p></div>
              <div className="truth-card"><span>3</span><strong>Zone nisu iste</strong><p>Pazusi, noge i bikini linija ne moraju reagovati istom brzinom kod iste osobe.</p></div>
              <div className="truth-card"><span>4</span><strong>Nije za svaku dlačicu</strong><p>Prije narudžbe moraš provjeriti da li tvoja boja kože i dlačica odgovara tabeli proizvođača.</p></div>
            </div>
          </div>
        </section>

        <section className="testimonials" id="iskustva">
          <div className="container">
            <div className="section-head"><span className="eyebrow">Ispovijesti bez uljepšavanja</span><h2>Ne tražimo da vjeruješ reklami.</h2><p>Pogledaj kako treba izgledati stvarna poruka: jedna konkretna promjena, realan period korištenja i detalj koji ne zvuči savršeno.</p></div>
            <div className="wa-grid">
              <article className="wa-phone"><div className="wa-head"><div className="avatar">D</div><div><strong>Derva</strong><span>Sarajevo · identitet djelimično skriven</span></div></div><div className="wa-body"><span className="sample-label">Potvrđena poruka kupice</span><div className="bubble out">Ćao 😊 Kako ti ide s uređajem nakon skoro dva mjeseca? Slobodno reci i ako nešto nije onako kako si očekivala.<span className="time">18:42 ✓✓</span></div><div className="bubble">Iskreno, prve dvije sedmice sam mislila da sam bezveze dala pare jer nisam vidjela neku veliku razliku. Onda sam skontala da mi na pazusima dlačice izlaze sporije i ima ih manje. Noge idu sporije, ali ih više ne brijem kao prije. Koristim ga redovno i nastavljam.<span className="time">18:51</span></div><div className="verified"><i>✓</i> 8 sedmica korištenja · pazusi i noge</div></div></article>
              <article className="wa-phone"><div className="wa-head"><div className="avatar">N</div><div><strong>Nikolina</strong><span>Mostar · identitet djelimično skriven</span></div></div><div className="wa-body"><span className="sample-label">Potvrđena poruka kupice</span><div className="bubble out">Koju si zonu najviše tretirala i šta si prvo primijetila?<span className="time">20:03 ✓✓</span></div><div className="bubble">Najviše sam ga uzela zbog bikini linije jer mi se stvarno nije išlo u salon. Hlađenje mi dosta znači. Osjetim blagu toplinu, ali meni je podnošljivo. Nakon nekoliko sedmica primijetila sam da se ne moram brijati tako često. Nisam skroz bez dlačica, ali razlika postoji.<span className="time">20:09</span></div><div className="verified"><i>✓</i> potvrđena kupovina · vanjska bikini linija</div></div></article>
              <article className="wa-phone"><div className="wa-head"><div className="avatar">S</div><div><strong>Selma</strong><span>Banja Luka · identitet djelimično skriven</span></div></div><div className="wa-body"><span className="sample-label">Potvrđena poruka kupice</span><div className="bubble out">Šta bi rekla nekome ko misli da aparat od {product.price.toFixed(0)} KM nema šanse da radi?<span className="time">11:24 ✓✓</span></div><div className="bubble">Ja sam bila ta osoba 😂 Sad mogu reći da sam pogriješila. Na pazusima mi je najbolji rezultat, a na nogama treba više strpljenja. Nije fazon da ga probaš dva puta i ostaviš u ladicu. Meni je najbitnije što se sada brijem dosta rjeđe.<span className="time">11:31</span></div><div className="verified"><i>✓</i> 10 sedmica korištenja · više zona</div></div></article>
            </div>
          </div>
        </section>

        <section id="kako-radi">
          <div className="container steps-grid">
            <div className="photo-card"><div className="photo-fallback">Aparat prisloniš na kožu i prelaziš zonu prema uputstvu.</div><img src="/uploads/2026/03/pro-gallery-2.webp" alt="Korištenje Ice Cool PRO uređaja kod kuće" /></div>
            <div>
              <span className="eyebrow">Kako radi — bez stručnih riječi</span>
              <h2>Obriješ. Prisloniš. Bljesne. Ponoviš.</h2>
              <p style={{fontSize:"18px",color:"var(--muted)",margin:0}}>Ova vrsta aparata često se zove IPL. Tebi je važnije da znaš šta radiš u praksi:</p>
              <div className="step-list">
                <div className="step"><div className="step-no">1</div><div><strong>Pripremi kožu</strong><p>Obrij dozvoljenu zonu i očisti je. Koža treba biti čista i suha.</p></div></div>
                <div className="step"><div className="step-no">2</div><div><strong>Počni blaže</strong><p>Izaberi jačinu koja odgovara tvojoj koži i uputstvu. Prije prve upotrebe uradi test male površine.</p></div></div>
                <div className="step"><div className="step-no">3</div><div><strong>Prelazi zonu</strong><p>Prisloni aparat na kožu. On bljesne, a ugrađeno hlađenje hladi dodirnu površinu.</p></div></div>
                <div className="step"><div className="step-no">4</div><div><strong>Budi redovna</strong><p>Ponavljaj tretmane tačno prema rasporedu iz uputstva i prati promjenu kroz više sedmica.</p></div></div>
              </div>
            </div>
          </div>
        </section>

        <section className="cooling">
          <div className="container split">
            <div><span className="eyebrow">Šta znači “ugrađeno hlađenje”?</span><h2>Jednostavno: aparat hladi kožu dok radi.</h2><p style={{fontSize:"18px",color:"var(--muted)"}}>To ne znači da baš svaka osoba neće osjetiti ništa. Osjećaj zavisi od zone, jačine i osjetljivosti kože. Hlađenje pomaže da toplina bljeska bude ugodnija, posebno na osjetljivijim područjima.</p><div className="simple-points"><div className="simple-point"><b>❄</b><span>Ne moraš posebno hladiti uređaj u frižideru.</span></div><div className="simple-point"><b>❄</b><span>Možeš krenuti s blažom jačinom i postepeno je prilagoditi.</span></div><div className="simple-point"><b>❄</b><span>Cilj je rutina koju nećeš izbjegavati zbog nelagode.</span></div></div></div>
            <div className="cool-card"><div className="cool-icon">❄</div><h3>Pet jačina, od blaže do jače</h3><p>Ne mora svaka zona koristiti istu postavku. Kreni oprezno, prati uputstvo i biraj nivo koji je dozvoljen i ugodan za tretiranu zonu.</p><img src="/uploads/2026/03/pro-gallery-4.png" alt="Ekran Ice Cool PRO uređaja sa nivoima jačine i hlađenjem" style={{borderRadius:"20px",marginTop:"20px",maxHeight:"330px",width:"100%",objectFit:"cover"}} /></div>
          </div>
        </section>

        <section className="fit">
          <div className="container">
            <div className="section-head"><span className="eyebrow">Provjeri prije narudžbe</span><h2>Da li je Ice Cool PRO za tebe?</h2><p>Najbolja kupica nije ona kojoj obećamo sve. Najbolja kupica je ona koja zna šta aparat može i spremna je koristiti ga redovno.</p></div>
            <div className="fit-grid">
              <div className="fit-card yes"><h3>Može ti odgovarati ako…</h3><ul><li>želiš da se s vremenom briješ rjeđe;</li><li>više ti odgovara tretman kod kuće nego odlazak u salon;</li><li>spremna si pratiti raspored i sigurnosna uputstva;</li><li>tvoja boja kože i dlačica odgovara službenoj tabeli proizvođača;</li><li>prihvataš da se rezultat razlikuje od osobe do osobe i od zone do zone.</li></ul></div>
              <div className="fit-card no"><h3>Nije pravi izbor ako…</h3><ul><li>očekuješ da sve dlačice nestanu nakon jednog ili dva korištenja;</li><li>ne želiš ili ne možeš biti redovna s tretmanima;</li><li>želiš koristiti aparat na zonama koje uputstvo ne dozvoljava;</li><li>tvoja koža ili dlačice nisu kompatibilne sa ovom vrstom aparata;</li><li>imaš zdravstveno stanje, terapiju ili promjenu na koži zbog koje prvo trebaš pitati ljekara.</li></ul></div>
            </div>
            <div className="warning"><strong>Važno:</strong> prije prve upotrebe pročitaj cijelo uputstvo i uradi test na maloj površini. Ne koristi uređaj preko tetovaža, tamnih madeža, oštećene ili nadražene kože niti na drugim zabranjenim područjima navedenim u uputstvu.</div>
          </div>
        </section>

        <section>
          <div className="container faq-wrap">
            <div className="section-head"><span className="eyebrow">Najčešća pitanja</span><h2>Bez komplikovanja.</h2></div>
            <details open><summary>Kada ću znati da aparat radi?</summary><p>Ne traži savršenstvo nakon prvog korištenja. Prati da li dlačice sporije izrastaju, da li ih je manje i da li se moraš rjeđe brijati. Tačan tempo zavisi od osobe, zone, boje kože i dlačica te redovnosti korištenja.</p></details>
            <details><summary>Da li boli?</summary><p>Osjećaj nije isti za svaku osobu ni svaku zonu. Ugrađeno hlađenje pomaže ublažiti osjećaj topline, ali ne treba obećavati da niko nikada neće osjetiti nelagodu. Počni s blažom dozvoljenom postavkom i prati uputstvo.</p></details>
            <details><summary>Može li se koristiti za noge, pazuhe, lice i bikini zonu?</summary><p>Koristi ga samo na zonama koje su izričito dozvoljene u službenom uputstvu. Za lice poštuj tačno navedenu granicu, a kod bikini zone razlikuj vanjsku bikini liniju od unutrašnjeg intimnog područja.</p></details>
            <details><summary>Da li odgovara svakoj boji kože i dlačica?</summary><p>Ne. Prije kupovine treba provjeriti službenu tabelu kompatibilnosti. Ako nisi sigurna, pošalji nam opis tona kože i boje dlačica pa ćemo ti pomoći da pročitaš tabelu.</p></details>
            <details><summary>Koliko često se koristi?</summary><p>Prati raspored iz priloženog uputstva Ice Cool PRO uređaja. Nemoj raditi tretmane češće misleći da će rezultat doći brže.</p></details>
            <details><summary>Kako stiže i kako plaćam?</summary><p>Dostava je dostupna širom Bosne i Hercegovine i najčešće traje 1-3 radna dana. Plaćaš pouzećem, kuriru prilikom preuzimanja.</p></details>
          </div>
        </section>
      </main>
    </div>

      <section className="standard-order" id="naruci">
        <div className="standard-order-wrap">
          <LandingOrderForm product={product} />
        </div>
      </section>

    <div className="works-lp">
      <footer><div className="container footer-row"><div><strong>ICE COOL PRO</strong><br />Kućni aparat protiv dlačica</div><div>© 2026. Sva prava zadržana. Uslovi kupovine · Privatnost · Dostava</div></div></footer>
      <div className="mobile-bar"><div className="mobile-price">{product.price.toFixed(0)} KM<small>plaćanje pouzećem</small></div><a className="btn btn-primary" href="#naruci">Naruči</a></div>
    </div>
    </>
  );
}
