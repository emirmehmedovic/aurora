import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politika Privatnosti - Ice Cool PRO™",
  description: "Politika privatnosti i zaštite podataka Ice Cool PRO™ webshopa.",
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-violet-50/30 via-white/40 to-purple-50/20 backdrop-blur-lg border border-white/20 rounded-3xl p-8 md:p-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Politika Privatnosti</h1>
            
            <div className="prose prose-gray max-w-none space-y-6">
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Uvod</h2>
                <p className="text-gray-600 leading-relaxed">
                  Ice Cool PRO™ poštuje vašu privatnost i posvećen je zaštiti vaših ličnih podataka. Ova politika privatnosti objašnjava kako prikupljamo, koristimo i štitimo vaše informacije.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Podaci koje prikupljamo</h2>
                <p className="text-gray-600 leading-relaxed mb-3">Prikupljamo sljedeće vrste podataka:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Ime i prezime</li>
                  <li>Kontakt informacije (telefon, email)</li>
                  <li>Adresa dostave</li>
                  <li>Informacije o narudžbi</li>
                  <li>Podaci o korištenju web stranice (cookies, IP adresa)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Kako koristimo vaše podatke</h2>
                <p className="text-gray-600 leading-relaxed mb-3">Vaše podatke koristimo za:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Procesiranje i dostavu narudžbi</li>
                  <li>Komunikaciju o statusu narudžbe</li>
                  <li>Pružanje korisničke podrške</li>
                  <li>Poboljšanje naših usluga</li>
                  <li>Marketing komunikaciju (samo uz vašu saglasnost)</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Zaštita podataka</h2>
                <p className="text-gray-600 leading-relaxed">
                  Koristimo odgovarajuće tehničke i organizacijske mjere za zaštitu vaših ličnih podataka od neovlaštenog pristupa, gubitka ili zloupotrebe.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Dijeljenje podataka</h2>
                <p className="text-gray-600 leading-relaxed">
                  Ne prodajemo niti dijelimo vaše lične podatke trećim stranama, osim kada je to neophodno za procesiranje narudžbe (npr. kurirske službe) ili kada je zakonski obavezno.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Vaša prava</h2>
                <p className="text-gray-600 leading-relaxed mb-3">Imate pravo na:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Pristup vašim ličnim podacima</li>
                  <li>Ispravku netačnih podataka</li>
                  <li>Brisanje vaših podataka</li>
                  <li>Ograničenje obrade podataka</li>
                  <li>Prigovor na obradu podataka</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Cookies</h2>
                <p className="text-gray-600 leading-relaxed">
                  Koristimo cookies za poboljšanje korisničkog iskustva. Možete kontrolisati upotrebu cookies kroz postavke vašeg browsera.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Kontakt</h2>
                <p className="text-gray-600 leading-relaxed">
                  Za pitanja o politici privatnosti, kontaktirajte nas na: <a href="mailto:info@icecoolpro.ba" className="text-[#563435] hover:underline">info@icecoolpro.ba</a>
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
