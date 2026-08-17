import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import { CheckCircle, MessageCircle, Truck } from "lucide-react";

export const metadata: Metadata = {
  title: "Dostava i Podrška - Ice Cool PRO™",
  description: "Informacije o besplatnoj dostavi, plaćanju pouzećem, reklamacijama i podršci za Ice Cool PRO™ IPL uređaje.",
};

export default function SupportPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-violet-50/30 via-white/40 to-purple-50/20 backdrop-blur-lg border border-white/20 rounded-3xl p-8 md:p-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Dostava i podrška</h1>
            
            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-white/50 rounded-2xl p-6 border border-white/20 text-center">
                <Truck className="w-8 h-8 text-[#563435] mb-3 mx-auto" />
                <h3 className="font-semibold text-gray-800 mb-2">Besplatno</h3>
                <p className="text-sm text-gray-600">Dostava u cijeloj BiH</p>
              </div>
              <div className="bg-white/50 rounded-2xl p-6 border border-white/20 text-center">
                <CheckCircle className="w-8 h-8 text-[#563435] mb-3 mx-auto" />
                <h3 className="font-semibold text-gray-800 mb-2">Pouzećem</h3>
                <p className="text-sm text-gray-600">Plaćanje pri preuzimanju</p>
              </div>
              <div className="bg-white/50 rounded-2xl p-6 border border-white/20 text-center">
                <MessageCircle className="w-8 h-8 text-[#563435] mb-3 mx-auto" />
                <h3 className="font-semibold text-gray-800 mb-2">Direktno</h3>
                <p className="text-sm text-gray-600">Podrška prije narudžbe</p>
              </div>
            </div>

            <div className="prose prose-gray max-w-none space-y-6">
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Dostava</h2>
                <p className="text-gray-600 leading-relaxed">
                  Dostava je besplatna na teritoriji cijele BiH. Paket šaljemo kurirskom službom, a uobičajeni rok dostave je 1-3 radna dana, zavisno od lokacije i opterećenja kurira.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Plaćanje</h2>
                <p className="text-gray-600 leading-relaxed">
                  Plaćanje se vrši pouzećem, direktno kuriru prilikom preuzimanja paketa. Prije slanja narudžbe možemo vas kontaktirati radi potvrde adrese i dostupnosti.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Podrška prije kupovine</h2>
                <p className="text-gray-600 leading-relaxed">
                  Ako niste sigurni koji model odgovara vašoj koži, dlačicama ili zoni tretmana, kontaktirajte nas prije narudžbe. Rado ćemo pomoći da izaberete odgovarajući uređaj i pojasniti način korištenja.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Zamjena modela prije slanja</h2>
                <p className="text-gray-600 leading-relaxed">
                  Ako želite promijeniti naručeni model prije nego što paket bude poslan, javite nam se što prije putem telefona, WhatsAppa ili emaila. Ako paket još nije preuzet od kurira, narudžbu možemo prilagoditi.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Reklamacije</h2>
                <p className="text-gray-600 leading-relaxed mb-3">
                  Ako primite pogrešan ili oštećen proizvod, kontaktirajte nas odmah nakon preuzimanja. U poruci navedite broj narudžbe, opis problema i fotografije paketa/proizvoda ako je moguće.
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Provjera narudžbe i isporuke</li>
                  <li>Upute za dalje korake</li>
                  <li>Zamjena u slučaju pogrešno isporučenog proizvoda</li>
                  <li>Rješavanje reklamacije u skladu sa važećim propisima</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Kontakt</h2>
                <p className="text-gray-600 leading-relaxed">
                  Za pitanja o narudžbi, dostavi ili reklamaciji, kontaktirajte nas na:<br />
                  Email: <a href="mailto:info@icecoolpro.ba" className="text-[#563435] hover:underline">info@icecoolpro.ba</a><br />
                  WhatsApp: <a href="https://wa.me/38761904759" className="text-[#563435] hover:underline">Pišite nam na WhatsApp</a><br />
                  <br />
                  Navedite:<br />
                  - Broj narudžbe<br />
                  - Kratak opis pitanja ili reklamacije<br />
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
