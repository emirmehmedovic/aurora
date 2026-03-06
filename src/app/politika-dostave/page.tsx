import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import { Truck, Package, Clock, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Politika Dostave - Ice Cool PRO™",
  description: "Informacije o dostavi Ice Cool PRO™ proizvoda.",
};

export default function ShippingPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-violet-50/30 via-white/40 to-purple-50/20 backdrop-blur-lg border border-white/20 rounded-3xl p-8 md:p-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-8">Politika Dostave</h1>
            
            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-white/50 rounded-2xl p-6 border border-white/20">
                <Truck className="w-8 h-8 text-[#563435] mb-3" />
                <h3 className="font-semibold text-gray-800 mb-2">Besplatna dostava</h3>
                <p className="text-sm text-gray-600">Na cijelu teritoriju BiH</p>
              </div>
              <div className="bg-white/50 rounded-2xl p-6 border border-white/20">
                <Clock className="w-8 h-8 text-[#563435] mb-3" />
                <h3 className="font-semibold text-gray-800 mb-2">Rok dostave</h3>
                <p className="text-sm text-gray-600">2-5 radnih dana</p>
              </div>
              <div className="bg-white/50 rounded-2xl p-6 border border-white/20">
                <Package className="w-8 h-8 text-[#563435] mb-3" />
                <h3 className="font-semibold text-gray-800 mb-2">Praćenje pošiljke</h3>
                <p className="text-sm text-gray-600">SMS i email notifikacije</p>
              </div>
              <div className="bg-white/50 rounded-2xl p-6 border border-white/20">
                <MapPin className="w-8 h-8 text-[#563435] mb-3" />
                <h3 className="font-semibold text-gray-800 mb-2">Dostava na adresu</h3>
                <p className="text-sm text-gray-600">Direktno na vašu kućnu adresu</p>
              </div>
            </div>

            <div className="prose prose-gray max-w-none space-y-6">
              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Kako funkcioniše dostava?</h2>
                <ol className="list-decimal list-inside text-gray-600 space-y-3">
                  <li>Naručite proizvod putem našeg webshopa</li>
                  <li>Naš tim će vas kontaktirati radi potvrde narudžbe</li>
                  <li>Proizvod se pakuje i šalje kurirskom službom</li>
                  <li>Dobijate SMS i email sa brojem za praćenje</li>
                  <li>Kurir vas kontaktira prije dostave</li>
                  <li>Preuzimate paket i plaćate pouzećem</li>
                </ol>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Rokovi dostave</h2>
                <p className="text-gray-600 leading-relaxed mb-3">
                  Standardni rok dostave je 2-5 radnih dana od dana potvrde narudžbe. Rok zavisi od lokacije:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li><strong>Sarajevo i okolina:</strong> 1-2 radna dana</li>
                  <li><strong>Veći gradovi (Banja Luka, Mostar, Tuzla, Zenica):</strong> 2-3 radna dana</li>
                  <li><strong>Ostale lokacije:</strong> 3-5 radnih dana</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Troškovi dostave</h2>
                <p className="text-gray-600 leading-relaxed">
                  <strong>Dostava je potpuno besplatna</strong> za sve narudžbe na teritoriji Bosne i Hercegovine. Nema skrivenih troškova.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Praćenje pošiljke</h2>
                <p className="text-gray-600 leading-relaxed">
                  Nakon što se paket pošalje, dobijate SMS i email sa brojem za praćenje. Možete pratiti status vaše pošiljke u realnom vremenu.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Preuzimanje paketa</h2>
                <p className="text-gray-600 leading-relaxed mb-3">
                  Prilikom preuzimanja paketa:
                </p>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Provjerite da li je paket oštećen</li>
                  <li>Otvorite paket u prisustvu kurira</li>
                  <li>Provjerite sadržaj</li>
                  <li>Platite pouzećem (gotovina)</li>
                  <li>Potpišite potvrdu o preuzimanju</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Šta ako nisam kod kuće?</h2>
                <p className="text-gray-600 leading-relaxed">
                  Kurir će vas kontaktirati prije dostave. Ako niste dostupni, možete dogovoriti novi termin dostave ili preuzeti paket u najbližoj pošti/depo-u kurirske službe.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Oštećena pošiljka</h2>
                <p className="text-gray-600 leading-relaxed">
                  Ako primjetite da je paket oštećen, imate pravo odbiti preuzimanje. U tom slučaju, kontaktirajte nas odmah i poslat ćemo vam novi proizvod bez dodatnih troškova.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Kontakt</h2>
                <p className="text-gray-600 leading-relaxed">
                  Za pitanja o dostavi, kontaktirajte nas na:<br />
                  Email: <a href="mailto:info@icecoolpro.ba" className="text-[#563435] hover:underline">info@icecoolpro.ba</a><br />
                  Telefon: +387 XX XXX XXX
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
