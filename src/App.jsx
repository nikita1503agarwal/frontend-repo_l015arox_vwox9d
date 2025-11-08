import { useState } from 'react';
import Hero from './components/Hero';
import Pricing from './components/Pricing';
import BookingForm from './components/BookingForm';
import PaymentPanel from './components/PaymentPanel';

function App() {
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [draft, setDraft] = useState(null);
  const [status, setStatus] = useState('idle');

  function handleBookingSubmit(payload) {
    setDraft(payload);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }

  function handleConfirmPayment({ method }) {
    setStatus('processing');
    // For now, we simulate a confirmation without backend; integration can be added later.
    setTimeout(() => {
      setStatus('confirmed');
    }, 800);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Hero />
      <Pricing selected={selectedOffer} onSelect={setSelectedOffer} />
      <BookingForm selectedOffer={selectedOffer} onSubmit={handleBookingSubmit} />
      <PaymentPanel draft={draft} onConfirm={handleConfirmPayment} />

      {status === 'confirmed' && (
        <div className="mx-auto max-w-3xl px-6 pb-16">
          <div className="rounded-xl border bg-green-50 p-6 text-green-800">
            Votre demande a été enregistrée. Vous recevrez un SMS de confirmation avec la facture et le lien de paiement.
          </div>
        </div>
      )}

      <footer className="py-10 text-center text-sm text-gray-500">© {new Date().getFullYear()} Massage Cannes — Tous droits réservés</footer>
    </div>
  );
}

export default App;
