import { useState } from 'react';
import Hero from './components/Hero';
import Pricing from './components/Pricing';
import BookingForm from './components/BookingForm';
import PaymentPanel from './components/PaymentPanel';

const API_BASE = import.meta.env.VITE_BACKEND_URL || '';

async function apiCreateBooking(payload) {
  if (!API_BASE) return { ok: false };
  const res = await fetch(`${API_BASE}/api/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error('Erreur API');
  return res.json();
}

function App() {
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [draft, setDraft] = useState(null);
  const [status, setStatus] = useState('idle');
  const [orderId, setOrderId] = useState(null);
  const [serverInfo, setServerInfo] = useState(null);

  function handleBookingSubmit(payload) {
    setDraft(payload);
    setStatus('idle');
    setOrderId(null);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  }

  async function handleConfirmPayment({ method, orderId }) {
    if (method === 'paypal' && orderId) {
      setOrderId(orderId);
      setStatus('processing');
      try {
        const result = await apiCreateBooking({
          ...draft,
          offerId: draft.offerId,
          offerTitle: draft.offerTitle,
          duration: draft.duration,
          paypalOrderId: orderId,
        });
        setServerInfo(result);
        setStatus('confirmed');
      } catch (e) {
        setStatus('error');
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Hero />
      <Pricing selected={selectedOffer} onSelect={setSelectedOffer} />
      <BookingForm selectedOffer={selectedOffer} onSubmit={handleBookingSubmit} />
      <PaymentPanel draft={draft} onConfirm={handleConfirmPayment} />

      {status === 'confirmed' && (
        <div className="mx-auto max-w-3xl px-6 pb-16 space-y-4">
          <div className="rounded-xl border bg-green-50 p-6 text-green-800">
            Paiement confirmé via PayPal. Votre rendez-vous est réservé. Numéro de transaction: {orderId}
          </div>
          {serverInfo && (
            <div className="rounded-xl border bg-white p-6 text-gray-800 text-sm">
              <div className="font-semibold mb-2">Récapitulatif envoyé par SMS</div>
              <ul className="list-disc pl-5 space-y-1">
                <li>Statut: {serverInfo.status}</li>
                <li>SMS: {serverInfo.smsSent ? 'envoyé' : 'non envoyé'}</li>
                {serverInfo.cancelUrl && <li>Annuler: {serverInfo.cancelUrl}</li>}
                {serverInfo.modifyUrl && <li>Modifier: {serverInfo.modifyUrl}</li>}
              </ul>
            </div>
          )}
        </div>
      )}

      {status === 'error' && (
        <div className="mx-auto max-w-3xl px-6 pb-16">
          <div className="rounded-xl border bg-red-50 p-6 text-red-800">
            Une erreur est survenue lors de l'enregistrement. Merci de réessayer.
          </div>
        </div>
      )}

      <footer className="py-10 text-center text-sm text-gray-500">© {new Date().getFullYear()} Massage Cannes — Tous droits réservés</footer>
    </div>
  );
}

export default App;
