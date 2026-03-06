import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import { RotateCcw, Shield, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Politika Povrata - Ice Cool PRO™",
  description: "Informacije o povratu Ice Cool PRO™ proizvoda.",
};

export default function ReturnPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-violet-50/30 via-white/40 to-purple-50/20 backdrop-blur-lg border border-white/20 rounded-3xl p-8 md:p-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Politika Povrata</h1>
            
            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white/50 rounded-2xl p-6 border border-white/20 text-center">
                <RotateCcw className="w-8 h-8 text-[#563435] mb-3 mx-auto" />
                <h3 className="font-semibold text-gray-800 mb-2">14 dana</h3>
                <p className="text-sm text-gray-600">Za povrat proizvoda</p>
              </div>
              <div className="bg-white/50 rounded-2xl p-6 border border-white/20 text-center">
                <Shield className="w-8 h-8 text-[#563435] mb-3 mx-auto" />
                <h3 className="font-semibold text-gray-800 mb-2">100% povrat</h3>
                <p className="text-sm text-gray-600">Pun povrat novca</p>
              </div>
              <div className="bg-white/50 rounded-2xl p-6 border border-white/20 text-center">
                <CheckCircle className="w-8 h-8 text-[#563435] mb-3 mx-auto" />
                <h3 className="font-semibold text-gray-800 mb-2">Jednostavno</h3>
                <p className="text-sm text-gray-600">Bez komplikacija</p>
              </div>
            </div>

            <div className="prose prose-gray max-w-none space-y-6">
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Pravo na povrat</h2>
                <p className="text-gray-600 leading-relaxed">
                  Imate pravo na povrat proizvoda u roku od <strong>14 dana</strong> od dana preuzimanja, bez navođenja razloga. Ovo pravo je zagarantovano Zakonom o zaštiti potrošača.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Uslovi za povrat</h2>
                <p className="text-gray-600 leading-relaxed mb-3">
                  Da biste ostvarili pravo na povrat, proizvod mora ispunjavati sljedeće uslove:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Proizvod je u originalnom pakovanju</li>
                  <li>Proizvod nije korišten</li>
                  <li>Svi dodaci i dokumentacija su prisutni</li>
                  <li>Proizvod nije oštećen</li>
                  <li>Zaštitne folije i plombe su netaknute</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Kako vratiti proizvod?</h2>
                <ol className="list-decimal list-inside text-gray-600 space-y-3">
                  <li>Kontaktirajte nas putem email-a ili telefona</li>
                  <li>Navedite broj narudžbe i razlog povrata</li>
                  <li>Dobijate instrukcije za povrat</li>
                  <li>Pošaljite proizvod na našu adresu</li>
                  <li>Nakon prijema i provjere, vraćamo vam novac</li>
                </ol>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Troškovi povrata</h2>
                <p className="text-gray-600 leading-relaxed">
                  Troškove povrata snosi kupac, osim u slučaju da je proizvod neispravan ili pogrešno isporučen. U tom slučaju, mi snosimo sve troškove.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Povrat novca</h2>
                <p className="text-gray-600 leading-relaxed">
                  Novac će vam biti vraćen u roku od <strong>14 dana</strong> od dana kada primimo vraćeni proizvod. Povrat se vrši na isti način na koji ste platili (gotovina, bankovna transakcija).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Zamjena proizvoda</h2>
                <p className="text-gray-600 leading-relaxed">
                  Ako želite zamijeniti proizvod za drugi model, kontaktirajte nas. Razliku u cijeni možete platiti ili dobiti povrat, zavisno od cijene novog proizvoda.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Reklamacije</h2>
                <p className="text-gray-600 leading-relaxed mb-3">
                  Ako proizvod ima proizvodne defekte, imate pravo na:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Besplatnu popravku</li>
                  <li>Zamjenu za novi proizvod</li>
                  <li>Povrat novca</li>
                  <li>Sniženje cijene</li>
                </ul>
                <p className="text-gray-600 leading-relaxed mt-3">
                  Reklamacije se rješavaju u skladu sa Zakonom o zaštiti potrošača i garancijom proizvođača (12 mjeseci).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Izuzeci</h2>
                <p className="text-gray-600 leading-relaxed mb-3">
                  Pravo na povrat ne možete ostvariti u sljedećim slučajevima:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Proizvod je korišten ili oštećen</li>
                  <li>Originalno pakovanje je uništeno</li>
                  <li>Prošlo je više od 14 dana od preuzimanja</li>
                  <li>Proizvod je oštećen nepravilnom upotrebom</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Kontakt za povrat</h2>
                <p className="text-gray-600 leading-relaxed">
                  Za povrat proizvoda, kontaktirajte nas na:<br />
                  Email: <a href="mailto:info@icecoolpro.ba" className="text-[#563435] hover:underline">info@icecoolpro.ba</a><br />
                  Telefon: +387 XX XXX XXX<br />
                  <br />
                  Navedite:<br />
                  - Broj narudžbe<br />
                  - Razlog povrata<br />
                  - Vaše kontakt informacije
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
