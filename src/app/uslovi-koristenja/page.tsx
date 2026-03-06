import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uslovi Korištenja - Ice Cool PRO™",
  description: "Uslovi korištenja Ice Cool PRO™ webshopa.",
};

export default function TermsPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-violet-50/30 via-white/40 to-purple-50/20 backdrop-blur-lg border border-white/20 rounded-3xl p-8 md:p-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Uslovi Korištenja</h1>
            
            <div className="prose prose-gray max-w-none space-y-6">
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Prihvatanje uslova</h2>
                <p className="text-gray-600 leading-relaxed">
                  Korištenjem Ice Cool PRO™ webshopa, prihvatate ove uslove korištenja. Ako se ne slažete sa bilo kojim dijelom ovih uslova, molimo vas da ne koristite našu web stranicu.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Proizvodi i cijene</h2>
                <p className="text-gray-600 leading-relaxed">
                  Sve cijene su izražene u konvertibilnim markama (KM) i uključuju PDV. Zadržavamo pravo promjene cijena bez prethodne najave. Cijene važeće u trenutku narudžbe će biti primijenjene.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Narudžbe</h2>
                <p className="text-gray-600 leading-relaxed mb-3">
                  Slanjem narudžbe, potvrđujete da ste punoljetni i da su sve informacije koje ste pružili tačne. Zadržavamo pravo odbijanja ili otkazivanja bilo koje narudžbe.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Plaćanje</h2>
                <p className="text-gray-600 leading-relaxed">
                  Prihvatamo plaćanje pouzećem (gotovina prilikom preuzimanja). Plaćanje se vrši kuriru prilikom dostave proizvoda.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Dostava</h2>
                <p className="text-gray-600 leading-relaxed">
                  Dostava je besplatna na teritoriji cijele BiH. Rok dostave je 2-5 radnih dana. Nismo odgovorni za kašnjenja uzrokovana kurirskom službom ili višom silom.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Povrat i reklamacije</h2>
                <p className="text-gray-600 leading-relaxed">
                  Imate pravo na povrat proizvoda u roku od 14 dana od dana preuzimanja. Proizvod mora biti u originalnom pakovanju i nekorišten. Troškove povrata snosi kupac.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Garancija</h2>
                <p className="text-gray-600 leading-relaxed">
                  Svi proizvodi dolaze sa 12 mjeseci garancije proizvođača. Garancija pokriva proizvodne defekte, ali ne pokriva oštećenja nastala nepravilnom upotrebom.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Intelektualna svojina</h2>
                <p className="text-gray-600 leading-relaxed">
                  Sav sadržaj na ovoj web stranici (tekst, slike, logotipi) je zaštićen autorskim pravima i ne smije se koristiti bez naše pisane dozvole.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Ograničenje odgovornosti</h2>
                <p className="text-gray-600 leading-relaxed">
                  Nismo odgovorni za bilo kakvu indirektnu, slučajnu ili posljedičnu štetu nastalu korištenjem naših proizvoda ili usluga.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Izmjene uslova</h2>
                <p className="text-gray-600 leading-relaxed">
                  Zadržavamo pravo izmjene ovih uslova u bilo kojem trenutku. Izmjene stupaju na snagu odmah nakon objavljivanja na web stranici.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">11. Kontakt</h2>
                <p className="text-gray-600 leading-relaxed">
                  Za pitanja o uslovima korištenja, kontaktirajte nas na: <a href="mailto:info@icecoolpro.ba" className="text-[#563435] hover:underline">info@icecoolpro.ba</a>
                </p>
              </section>

              <section>
                <p className="text-sm text-gray-500 mt-8">
                  Posljednje ažurirano: {new Date().toLocaleDateString("bs-BA", { year: "numeric", month: "long", day: "numeric" })}
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
