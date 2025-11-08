import { Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 pt-16 pb-8 sm:pt-24 sm:pb-12">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-600">
            <Sparkles className="h-4 w-4" />
            Massage & Bien‑être à Cannes et alentours
          </div>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
            Réservation de massage en toute simplicité
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Choisissez votre formule, sélectionnez une date et recevez une confirmation par SMS ou WhatsApp.
            Paiement sécurisé via PayPal ou Wise. Créneaux automatiquement bloqués une fois réservés.
          </p>
        </div>
      </div>
    </section>
  );
}
