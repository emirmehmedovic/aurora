import type { Metadata } from "next";
import LandingOrderForm from "@/components/LandingOrderForm";
import { getStorefrontProductBySlugOrFallback } from "@/lib/storefront-products";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Bikini zona nema sezonu | Ice Cool PRO",
  description:
    "Ice Cool PRO za kućnu rutinu vanjske bikini linije - više privatnosti, manje potrebe za čestim brijanjem i ugrađeno hlađenje.",
  alternates: {
    canonical: "https://aurorashop.ba/l/bikini-zona-nema-sezonu",
  },
};

const css = `
  :root{--ink:#26161f;--muted:#74636c;--paper:#fff;--cream:#fff9f7;--plum:#571d38;--plum-2:#7b2d4f;--rose:#c56f8e;--rose-soft:#fae9ef;--peach:#f3d6ca;--line:#eddfe5;--green:#16865f;--wa:#dcf8c6;--shadow:0 22px 60px rgba(66,27,46,.13);--max:1180px}
  .bikini-lp *{box-sizing:border-box}.bikini-lp{font-family:Inter,ui-sans-serif,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;color:var(--ink);background:#fff;line-height:1.6}.bikini-lp a{text-decoration:none;color:inherit}.bikini-lp img{display:block;max-width:100%}.bikini-lp button,.bikini-lp input,.bikini-lp select{font:inherit}
  .container{width:min(var(--max),calc(100% - 40px));margin-inline:auto}.topbar{background:var(--plum);color:#fff;text-align:center;padding:9px 16px;font-size:14px}.nav{height:78px;display:flex;align-items:center;justify-content:space-between;gap:20px}.brand{display:flex;align-items:center;gap:11px;font-weight:1000;letter-spacing:.04em}.brand-mark{width:40px;height:40px;border-radius:14px;background:linear-gradient(145deg,var(--plum),var(--rose));display:grid;place-items:center;color:#fff;box-shadow:0 10px 25px rgba(87,29,56,.24)}.brand small{display:block;font-size:10px;letter-spacing:.13em;color:var(--muted);font-weight:850;margin-top:-3px}.nav-right{display:flex;align-items:center;gap:14px}.price{font-weight:1000}.price small{display:block;font-size:10px;color:var(--muted);text-align:right}
  .btn{display:inline-flex;align-items:center;justify-content:center;gap:9px;min-height:52px;padding:15px 24px;border:0;border-radius:999px;font-weight:900;cursor:pointer;transition:.2s transform,.2s box-shadow,.2s background}.btn:hover{transform:translateY(-2px)}.btn-primary{background:var(--plum);color:#fff;box-shadow:0 14px 30px rgba(87,29,56,.25)}.btn-primary:hover{background:#401226}.btn-ghost{background:#fff;border:1px solid var(--line);color:var(--ink)}
  .hero{position:relative;overflow:hidden;background:radial-gradient(circle at 82% 20%,#f7dce5 0,transparent 33%),linear-gradient(180deg,#fff 0,#fff7f4 100%);padding:40px 0 86px}.hero:before{content:"";position:absolute;left:-120px;bottom:-160px;width:420px;height:420px;border-radius:50%;background:rgba(197,111,142,.08)}.hero-grid{display:grid;grid-template-columns:1.06fr .94fr;align-items:center;gap:62px}.eyebrow{display:inline-flex;align-items:center;gap:8px;padding:8px 12px;border-radius:999px;background:var(--rose-soft);color:var(--plum-2);font-size:12px;font-weight:1000;letter-spacing:.08em;text-transform:uppercase}
  .bikini-lp h1,.bikini-lp h2,.bikini-lp h3{line-height:1.08;letter-spacing:-.035em;margin:0 0 18px}.bikini-lp h1{font-size:clamp(47px,6.2vw,78px)}.bikini-lp h2{font-size:clamp(35px,4.4vw,54px)}.bikini-lp h3{font-size:24px}.hero-copy>p{font-size:20px;color:var(--muted);max-width:680px;margin:0 0 27px}.hero-actions{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:24px}.chips{display:flex;gap:10px;flex-wrap:wrap}.chip{padding:9px 12px;border:1px solid var(--line);border-radius:999px;background:rgba(255,255,255,.75);font-size:13px;font-weight:800;color:#5a4651}
  .hero-art{position:relative;min-height:570px;border-radius:36px;background:linear-gradient(145deg,#f2dcd7,#c78e86 55%,#7a3b4e);box-shadow:var(--shadow);overflow:hidden}.hero-art:after{content:"";position:absolute;inset:20px;border:1px solid rgba(255,255,255,.45);border-radius:28px;z-index:1}.hero-art img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:2}.floating{position:absolute;z-index:3;background:rgba(255,255,255,.94);backdrop-filter:blur(12px);border-radius:19px;padding:14px 17px;box-shadow:0 16px 40px rgba(58,19,39,.15)}.floating.top{top:22px;right:20px}.floating.bottom{left:20px;bottom:22px;max-width:285px;background:rgba(38,22,31,.92);color:#fff}.floating strong{display:block;font-size:19px}.floating span{display:block;color:var(--muted);font-size:12px;font-weight:750}.floating.bottom span{color:#e9dfe4;font-size:13px}
  .bridge{margin-top:-35px;position:relative;z-index:5}.bridge-box{display:grid;grid-template-columns:repeat(3,1fr);background:#fff;border-radius:24px;border:1px solid var(--line);box-shadow:var(--shadow);overflow:hidden}.bridge-item{padding:23px 25px;display:flex;gap:14px;align-items:center}.bridge-item+.bridge-item{border-left:1px solid var(--line)}.bridge-icon{width:45px;height:45px;border-radius:15px;background:var(--rose-soft);display:grid;place-items:center;font-size:21px}.bridge-item strong{display:block}.bridge-item span{display:block;color:var(--muted);font-size:13px}
  .bikini-lp section{padding:92px 0}.section-head{max-width:790px;margin:0 auto 43px;text-align:center}.section-head p{font-size:18px;color:var(--muted);margin:0}.cycle{background:var(--plum);color:#fff;text-align:center}.cycle .section-head p{color:#dfcfd7}.cycle-line{font-size:clamp(32px,5vw,58px);font-weight:1000;line-height:1.16;letter-spacing:-.035em;max-width:900px;margin:0 auto 35px}.cycle-line span{color:#f1a9c1}.cycle-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.cycle-card{padding:26px;border:1px solid rgba(255,255,255,.13);border-radius:22px;background:rgba(255,255,255,.055);text-align:left}.cycle-card b{font-size:20px;display:block;margin-bottom:7px}.cycle-card p{margin:0;color:#dfcfd7;font-size:14px}
  .privacy{background:var(--cream)}.privacy-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}.privacy-card{padding:31px;border:1px solid var(--line);border-radius:25px;background:#fff;box-shadow:0 12px 35px rgba(69,31,49,.06)}.privacy-icon{width:52px;height:52px;border-radius:18px;background:var(--rose-soft);display:grid;place-items:center;font-size:24px;margin-bottom:20px}.privacy-card p{margin:0;color:var(--muted)}
  .story-grid{display:grid;grid-template-columns:.9fr 1.1fr;gap:64px;align-items:center}.story-copy p{font-size:18px;color:var(--muted)}.wa-phone{background:#efeae2;border-radius:31px;box-shadow:var(--shadow);overflow:hidden;border:1px solid #e5ddd5;max-width:520px;margin:auto}.wa-head{background:#075e54;color:#fff;padding:14px 16px;display:flex;gap:11px;align-items:center}.avatar{width:41px;height:41px;border-radius:50%;background:#d8ede7;color:#075e54;display:grid;place-items:center;font-weight:1000}.wa-head strong{display:block;font-size:14px}.wa-head span{display:block;color:#cce7df;font-size:11px}.wa-body{padding:18px 14px 23px;background-color:#efeae2;background-image:radial-gradient(rgba(120,107,95,.08) 1px,transparent 1px);background-size:18px 18px}.sample-label{font-size:10px;font-weight:1000;letter-spacing:.07em;text-transform:uppercase;color:#075e54;background:#dcf8c6;border:1px solid #b9e7a3;border-radius:8px;padding:6px 8px;display:inline-block;margin-bottom:13px}.bubble{max-width:91%;padding:10px 12px 7px;border-radius:9px;background:#fff;box-shadow:0 1px 1px rgba(0,0,0,.08);font-size:14px;margin-bottom:10px}.bubble.out{margin-left:auto;background:var(--wa)}.time{display:block;text-align:right;color:#8b8b8b;font-size:10px;margin-top:5px}.verified{display:flex;align-items:center;gap:8px;font-size:12px;color:#5b5959;font-weight:800;margin-top:14px}.verified i{width:18px;height:18px;border-radius:50%;background:#ddefe6;color:#11845a;display:grid;place-items:center;font-style:normal}
  .explain{background:linear-gradient(180deg,#fff,#fff7f4)}.explain-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:55px;align-items:center}.steps{display:grid;gap:15px;margin-top:27px}.step{display:grid;grid-template-columns:51px 1fr;gap:15px;border:1px solid var(--line);border-radius:20px;padding:18px;background:#fff}.step-no{width:47px;height:47px;border-radius:16px;background:var(--rose-soft);color:var(--plum-2);display:grid;place-items:center;font-weight:1000;font-size:19px}.step strong{display:block;font-size:18px}.step p{margin:3px 0 0;color:var(--muted);font-size:14px}.image-card{position:relative;min-height:520px;border-radius:30px;overflow:hidden;background:linear-gradient(145deg,#dba8a3,#744056);box-shadow:var(--shadow)}.image-card img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:2}.image-fallback{position:absolute;inset:0;display:grid;place-items:center;padding:42px;text-align:center;color:#fff;font-size:30px;font-weight:1000}
  .safety{background:#fff}.safety-box{display:grid;grid-template-columns:.8fr 1.2fr;gap:35px;padding:42px;border-radius:30px;background:#fff8ea;border:1px solid #ead6a8}.safety-mark{width:82px;height:82px;border-radius:26px;background:#f6e1ae;display:grid;place-items:center;font-size:36px}.safety-box h2{font-size:clamp(31px,4vw,46px)}.safety-box p{font-size:17px;color:#695527}.safety-list{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:20px}.safety-item{background:rgba(255,255,255,.72);border:1px solid #eadab8;border-radius:15px;padding:13px 14px;font-size:14px;font-weight:750;color:#5d4b25}
  .proof{background:var(--cream)}.proof-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}.proof-card{padding:25px;border-radius:22px;background:#fff;border:1px solid var(--line)}.proof-card span{display:grid;place-items:center;width:42px;height:42px;border-radius:15px;background:var(--rose-soft);margin-bottom:17px;font-size:20px}.proof-card strong{display:block;font-size:18px;margin-bottom:6px}.proof-card p{margin:0;color:var(--muted);font-size:14px}.fit-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px}.fit-card{border:1px solid var(--line);border-radius:26px;padding:32px;background:#fff}.fit-card.good{border-top:5px solid var(--green)}.fit-card.caution{border-top:5px solid #b65c5c}.fit-card ul{list-style:none;padding:0;margin:18px 0 0;display:grid;gap:13px}.fit-card li{display:flex;gap:10px;color:#54434c}.fit-card li:before{content:"✓";width:24px;height:24px;flex:0 0 24px;border-radius:50%;background:#e7f4ed;color:var(--green);display:grid;place-items:center;font-size:12px;font-weight:1000}.fit-card.caution li:before{content:"×";background:#f9e8e8;color:#a14141}
  .faq-wrap{max-width:860px;margin:auto}.bikini-lp details{border:1px solid var(--line);border-radius:18px;background:#fff;margin-bottom:12px;overflow:hidden}.bikini-lp summary{list-style:none;cursor:pointer;padding:20px 22px;font-weight:900;display:flex;align-items:center;justify-content:space-between;gap:20px}.bikini-lp summary::-webkit-details-marker{display:none}.bikini-lp summary:after{content:"+";width:28px;height:28px;border-radius:50%;display:grid;place-items:center;background:var(--rose-soft);color:var(--plum-2);font-size:20px}.bikini-lp details[open] summary:after{content:"−"}.bikini-lp details p{padding:0 22px 21px;margin:0;color:var(--muted)}
  .standard-order{background:#fff;padding:0 0 80px}.standard-order-wrap{width:min(1200px,calc(100% - 48px));margin:0 auto}
  .bikini-lp footer{background:#1c1017;color:#cfc0c8;padding:32px 0 94px;font-size:13px}.footer-row{display:flex;justify-content:space-between;gap:20px;align-items:center}.footer-row strong{color:#fff}.mobile-bar{display:none;position:fixed;left:0;right:0;bottom:0;z-index:50;background:#fff;border-top:1px solid var(--line);padding:10px 13px;box-shadow:0 -10px 25px rgba(38,22,31,.1)}.mobile-bar .btn{flex:1}.mobile-price{font-weight:1000;white-space:nowrap}.mobile-price small{display:block;color:var(--muted);font-size:10px;font-weight:700}
  @media(max-width:960px){.hero-grid,.story-grid,.explain-grid{grid-template-columns:1fr;gap:39px}.hero-art{min-height:520px;max-width:590px;width:100%;margin:auto}.cycle-grid,.privacy-grid{grid-template-columns:1fr}.proof-grid{grid-template-columns:1fr 1fr}.safety-box{grid-template-columns:1fr}.fit-grid{grid-template-columns:1fr}}
  @media(max-width:700px){.container{width:min(100% - 26px,var(--max))}.topbar{font-size:12px}.nav{height:68px}.price{display:none}.nav .btn{padding:11px 15px;min-height:44px;font-size:13px}.hero{padding:25px 0 66px}.hero-grid{gap:30px}.hero-copy>p{font-size:17px}.hero-actions .btn{width:100%}.hero-art{min-height:445px;border-radius:27px}.floating.top{top:14px;right:14px}.floating.bottom{left:14px;right:14px;bottom:14px;max-width:none}.bridge-box{grid-template-columns:1fr}.bridge-item+.bridge-item{border-left:0;border-top:1px solid var(--line)}.bikini-lp section{padding:70px 0}.section-head{text-align:left;margin-bottom:31px}.section-head p{font-size:16px}.cycle{text-align:left}.cycle-line{font-size:38px}.proof-grid{grid-template-columns:1fr}.safety-box{padding:25px}.safety-list{grid-template-columns:1fr}.image-card{min-height:430px}.standard-order{padding:0 0 70px}.standard-order-wrap{width:min(100% - 26px,1200px)}.footer-row{display:grid}.mobile-bar{display:flex;gap:11px;align-items:center}.bikini-lp footer{padding-bottom:112px}}
`;

export default async function BikiniZonaNemaSezonuPage() {
  const product = await getStorefrontProductBySlugOrFallback("ice-cool-pro");

  return (
    <>
    <div className="bikini-lp">
      <style dangerouslySetInnerHTML={{ __html: css }} />
      <div className="topbar">Dostava širom BiH &nbsp;•&nbsp; Plaćanje pouzećem &nbsp;•&nbsp; Detaljno uputstvo</div>

      <header className="container nav">
        <a className="brand" href="#top"><span className="brand-mark">❄</span><span>ICE COOL PRO<small>KUĆNI APARAT PROTIV DLAČICA</small></span></a>
        <div className="nav-right"><div className="price">{product.price.toFixed(0)} KM<small>plaćanje kuriru</small></div><a className="btn btn-primary" href="#naruci">Naruči</a></div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">Više privatnosti. Manje ponavljanja.</span>
              <h1>Bikini zona nema sezonu.</h1>
              <p>Nije stvar samo mora i kupaćeg. To je zona o kojoj mnoge žene vode računa cijele godine — a brijanje se brzo mora ponoviti. Ice Cool PRO koristiš sama kod kuće, bez zakazivanja i bez odlaska u salon.</p>
              <div className="hero-actions"><a className="btn btn-primary" href="#kako-radi">Pogledaj kako radi</a><a className="btn btn-ghost" href="#ispovijest">Pročitaj iskustvo</a></div>
              <div className="chips"><span className="chip">Kod kuće</span><span className="chip">Bez termina</span><span className="chip">Hladi kožu dok radi</span><span className="chip">{product.price.toFixed(0)} KM</span></div>
            </div>
            <div className="hero-art">
              <img src="/uploads/2026/03/pro-gallery-0.png" alt="Ice Cool PRO uređaj za kućnu upotrebu" />
              <div className="floating top"><strong>{product.price.toFixed(0)} KM</strong><span>plaćanje pouzećem</span></div>
              <div className="floating bottom"><strong>Neke stvari je lakše raditi kod kuće.</strong><span>Sama biraš vrijeme, jačinu i tempo svoje rutine.</span></div>
            </div>
          </div>
        </section>

        <div className="container bridge">
          <div className="bridge-box">
            <div className="bridge-item"><div className="bridge-icon">🔒</div><div><strong>Privatnost</strong><span>Rutinu radiš sama, u svom prostoru</span></div></div>
            <div className="bridge-item"><div className="bridge-icon">❄</div><div><strong>Ugrađeno hlađenje</strong><span>Pomaže ublažiti osjećaj topline</span></div></div>
            <div className="bridge-item"><div className="bridge-icon">🗓</div><div><strong>Bez zakazivanja</strong><span>Koristiš prema uputstvu kada ti odgovara</span></div></div>
          </div>
        </div>

        <section className="cycle">
          <div className="container">
            <div className="section-head"><span className="eyebrow" style={{background:"rgba(255,255,255,.12)",color:"#fff"}}>Poznat krug</span><h2>Nije problem samo dlačica.</h2><p>Problem je što cijeli postupak stalno kreće ispočetka.</p></div>
            <div className="cycle-line">Obriješ. Kratko je glatko. <span>Bockanje se vrati.</span> Pa opet.</div>
            <div className="cycle-grid">
              <div className="cycle-card"><b>Stalno ponavljanje</b><p>Brijanje rješava ono što vidiš tog dana, ali ne mijenja brzinu budućeg rasta.</p></div>
              <div className="cycle-card"><b>Planiranje unaprijed</b><p>More, trening, vikend ili običan dan — opet razmišljaš kada trebaš obrijati zonu.</p></div>
              <div className="cycle-card"><b>Manjak privatnosti</b><p>Nekim ženama salon jednostavno nije ugodan izbor za ovu zonu.</p></div>
            </div>
          </div>
        </section>

        <section className="privacy">
          <div className="container">
            <div className="section-head"><span className="eyebrow">Zašto ovaj ugao traje cijele godine</span><h2>Jer potreba nije vezana samo za ljeto.</h2><p>Kupaći je samo jedan povod. Privatnost, osjećaj urednosti i manje čestog brijanja relevantni su u januaru isto kao i u julu.</p></div>
            <div className="privacy-grid">
              <div className="privacy-card"><div className="privacy-icon">🏠</div><h3>Sama, kod kuće</h3><p>Nema presvlačenja pred nepoznatom osobom, odlaska i čekanja. Rutinu radiš u svom kupatilu.</p></div>
              <div className="privacy-card"><div className="privacy-icon">⏱</div><h3>Kada tebi odgovara</h3><p>Nema termina. Aparat uzmeš kada je vrijeme za tretman prema uputstvu, bez uklapanja u tuđe radno vrijeme.</p></div>
              <div className="privacy-card"><div className="privacy-icon">↘</div><h3>Cilj: rjeđe brijanje</h3><p>Uz redovno korištenje cilj je da dlačice s vremenom rastu sporije i rjeđe — ne savršenstvo nakon jednog bljeska.</p></div>
            </div>
          </div>
        </section>

        <section id="ispovijest">
          <div className="container story-grid">
            <div className="story-copy">
              <span className="eyebrow">Anonimna ispovijest</span>
              <h2>“Najviše mi znači što sve radim sama.”</h2>
              <p>Intimna tema traži više povjerenja nego obična recenzija. Zato kupici ne treba izmišljeno ime ni fotografija s interneta. Dovoljni su njene stvarne riječi, period korištenja i jasna dozvola da poruku objaviš anonimno.</p>
              <p><strong>Najuvjerljivija poruka nije savršena.</strong> Može reći da je jedna zona reagovala brže, druga sporije, da je prvo bila skeptična ili da još uvijek povremeno koristi žilet.</p>
              <a className="btn btn-primary" href="#naruci">Provjeri odgovara li ti</a>
            </div>
            <article className="wa-phone">
              <div className="wa-head"><div className="avatar">N</div><div><strong>Nikolina</strong><span>Mostar · identitet djelimično skriven</span></div></div>
              <div className="wa-body">
                <span className="sample-label">Potvrđena poruka kupice</span>
                <div className="bubble out">Ćao 😊 Prošlo je dovoljno vremena od kupovine pa me zanima potpuno iskreno: kako ti ide s vanjskom bikini linijom? Možeš reći i ako nešto nije onako kako si očekivala.<span className="time">19:08 ✓✓</span></div>
                <div className="bubble">Uzela sam ga prvenstveno zbog te zone. Meni je najveća prednost što sve radim sama kod kuće i ne moram zakazivati salon. Prvih nekoliko korištenja nisam znala šta da očekujem, a onda sam primijetila da se bockanje ne vraća tako brzo kao prije.<span className="time">19:16</span></div>
                <div className="bubble out">Kako ti je hlađenje i moraš li se još brijati?<span className="time">19:18 ✓✓</span></div>
                <div className="bubble">Hlađenje mi je super jer mi je ta zona osjetljiva. Nisam potpuno bez dlačica i neću lagati, ali brijem se dosta rjeđe. Na jednom dijelu ide brže, na drugom sporije. Nastavljam koristiti po uputstvu.<span className="time">19:24</span></div>
                <div className="verified"><i>✓</i> potvrđena kupovina · više sedmica korištenja</div>
              </div>
            </article>
          </div>
        </section>

        <section className="explain" id="kako-radi">
          <div className="container explain-grid">
            <div>
              <span className="eyebrow">Kako radi — narodski</span>
              <h2>Obriješ vanjsku liniju. Prisloniš aparat. On bljesne i hladi.</h2>
              <p style={{fontSize:"18px",color:"var(--muted)",margin:0}}>Ova vrsta aparata zove se IPL, ali nije potrebno da pamtiš skraćenicu. Bitno je da znaš kako izgleda sigurna kućna rutina.</p>
              <div className="steps">
                <div className="step"><div className="step-no">1</div><div><strong>Provjeri smiješ li ga koristiti</strong><p>Boja kože i dlačica mora odgovarati službenoj tabeli, a zona mora biti dozvoljena u uputstvu.</p></div></div>
                <div className="step"><div className="step-no">2</div><div><strong>Obrij i očisti kožu</strong><p>Koža treba biti čista, suha i bez iritacije. Prije prve upotrebe uradi test male površine.</p></div></div>
                <div className="step"><div className="step-no">3</div><div><strong>Počni blažom jačinom</strong><p>Ice Cool PRO ima pet jačina. Izaberi dozvoljenu postavku koja ti je ugodna.</p></div></div>
                <div className="step"><div className="step-no">4</div><div><strong>Ponavljaj prema uputstvu</strong><p>Ne koristi češće misleći da će brže djelovati. Redovnost je važnija od pretjerivanja.</p></div></div>
              </div>
            </div>
            <div className="image-card"><div className="image-fallback">Kućna rutina, bez salona i bez termina.</div><img src="/uploads/2026/03/pro-gallery-2.webp" alt="Ice Cool PRO uređaj u kućnom okruženju" /></div>
          </div>
        </section>

        <section className="safety">
          <div className="container">
            <div className="safety-box">
              <div className="safety-mark">!</div>
              <div>
                <h2>Bikini zona nije isto što i cijela intimna regija.</h2>
                <p>Na stranici i u oglasima koristi tačan izraz <strong>vanjska bikini linija</strong> ako je ta zona dozvoljena u službenom uputstvu. Uređaj se ne koristi na sluznici, unutrašnjem genitalnom području niti na bilo kojoj zoni koju proizvođač nije izričito odobrio.</p>
                <div className="safety-list"><div className="safety-item">Samo dozvoljena vanjska površina kože</div><div className="safety-item">Nikada preko sluznice ili genitalnog područja</div><div className="safety-item">Ne preko tetovaža i tamnih madeža</div><div className="safety-item">Ne na oštećenoj, nadraženoj ili upaljenoj koži</div></div>
              </div>
            </div>
          </div>
        </section>

        <section className="proof">
          <div className="container">
            <div className="section-head"><span className="eyebrow">Šta zapravo dobiješ</span><h2>Ne prodajemo skraćenicu. Prodajemo jednostavniju rutinu.</h2><p>Tehničke karakteristike imaju smisla tek kada ih prevedeš u korist koju žena odmah razumije.</p></div>
            <div className="proof-grid">
              <div className="proof-card"><span>🏠</span><strong>Kućna privatnost</strong><p>Tretman radiš sama, bez odlaska u salon.</p></div>
              <div className="proof-card"><span>❄</span><strong>Hladi dok radi</strong><p>Hlađenje pomaže ublažiti osjećaj topline.</p></div>
              <div className="proof-card"><span>1–5</span><strong>Pet jačina</strong><p>Možeš krenuti blaže i prilagoditi dozvoljenoj zoni.</p></div>
              <div className="proof-card"><span>↘</span><strong>Cilj je rjeđe brijanje</strong><p>Promjenu gradiš kroz redovno korištenje, ne preko noći.</p></div>
            </div>
          </div>
        </section>

        <section>
          <div className="container">
            <div className="section-head"><span className="eyebrow">Je li ovo za tebe?</span><h2>Pošten odgovor prije kupovine.</h2></div>
            <div className="fit-grid">
              <div className="fit-card good"><h3>Može biti dobar izbor ako…</h3><ul><li>želiš više privatnosti nego što ti nudi salon;</li><li>želiš da se s vremenom briješ rjeđe;</li><li>spremna si redovno pratiti uputstvo;</li><li>tvoja boja kože i dlačica odgovara tabeli proizvođača;</li><li>razumiješ da se rezultat razlikuje po osobama i zonama.</li></ul></div>
              <div className="fit-card caution"><h3>Nije dobar izbor ako…</h3><ul><li>želiš tretirati unutrašnje intimno područje;</li><li>očekuješ potpuno uklanjanje nakon nekoliko dana;</li><li>ne možeš biti redovna s rutinom;</li><li>tvoja koža ili dlačice nisu kompatibilne;</li><li>imaš promjenu na koži ili terapiju zbog koje prvo trebaš pitati ljekara.</li></ul></div>
            </div>
          </div>
        </section>

        <section style={{background:"var(--cream)"}}>
          <div className="container faq-wrap">
            <div className="section-head"><span className="eyebrow">Najčešća pitanja</span><h2>Diskretno i jasno.</h2></div>
            <details open><summary>Smije li se koristiti na bikini zoni?</summary><p>Samo na vanjskoj bikini liniji ako je ta zona izričito dozvoljena u službenom uputstvu Ice Cool PRO uređaja. Ne koristi se na sluznici niti unutrašnjem genitalnom području.</p></details>
            <details><summary>Da li će dlačice potpuno nestati?</summary><p>Ne obećavamo isti ili potpun rezultat svakoj osobi. Cilj kućne rutine je postepeno smanjenje rasta i manje potrebe za čestim brijanjem. Rezultat zavisi od boje kože i dlačica, zone i redovnosti.</p></details>
            <details><summary>Da li je tretman bolan?</summary><p>Osjećaj varira. Ugrađeno hlađenje pomaže da toplina bljeska bude ugodnija, ali ne treba obećavati da niko neće osjetiti ništa. Počni blaže i prati uputstvo.</p></details>
            <details><summary>Moram li prestati brijati?</summary><p>Ne. Zona se prema uputstvu obično priprema brijanjem prije tretmana. Aparat nije namijenjen korištenju preko duge dlačice. Prati tačne korake iz pakovanja.</p></details>
            <details><summary>Može li se koristiti cijele godine?</summary><p>Rutina nije vezana za sezonu, ali moraš poštovati sva upozorenja o suncu, preplanulosti i njezi kože iz službenog uputstva. Ako je koža svježe preplanula ili izložena jakom suncu, ne nagađaj — provjeri uputstvo prije tretmana.</p></details>
            <details><summary>Kako naručujem?</summary><p>Uneseš podatke ispod, potvrdiš narudžbu i plaćaš kuriru prilikom preuzimanja. Dostava je 1-3 radna dana za većinu lokacija u BiH.</p></details>
          </div>
        </section>
      </main>
    </div>

      <section className="standard-order" id="naruci">
        <div className="standard-order-wrap">
          <LandingOrderForm product={product} />
        </div>
      </section>

    <div className="bikini-lp">
      <footer><div className="container footer-row"><div><strong>ICE COOL PRO</strong><br />Kućni aparat protiv dlačica</div><div>© 2026. Sva prava zadržana. Uslovi kupovine · Privatnost · Dostava</div></div></footer>
      <div className="mobile-bar"><div className="mobile-price">{product.price.toFixed(0)} KM<small>plaćanje pouzećem</small></div><a className="btn btn-primary" href="#naruci">Naruči</a></div>
    </div>
    </>
  );
}
