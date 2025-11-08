import { useEffect, useMemo, useState } from 'react';

// Helper to generate time slots between 10:00 and 20:00 every 30 minutes
function generateSlots() {
  const slots = [];
  for (let h = 10; h <= 20; h++) {
    for (let m of [0, 30]) {
      const label = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
      slots.push(label);
    }
  }
  return slots;
}

export default function BookingForm({ selectedOffer, onSubmit }) {
  const [zone, setZone] = useState('cannes');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('10:00');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  const disabled = !selectedOffer || !date || !time || !name || !phone;

  const price = useMemo(() => {
    if (!selectedOffer) return 0;
    if (selectedOffer.id === 'formule-3') return 0; // sur devis
    const base = selectedOffer.price.replace('€', '');
    return Number(base);
  }, [selectedOffer]);

  useEffect(() => {
    if (!selectedOffer) return;
    // reset fields when offer changes
    setZone('cannes');
    setDate('');
    setTime('10:00');
  }, [selectedOffer]);

  const slots = useMemo(() => generateSlots(), []);

  function handleSubmit(e) {
    e.preventDefault();
    if (disabled) return;
    onSubmit?.({
      offerId: selectedOffer.id,
      offerTitle: selectedOffer.title,
      duration: selectedOffer.duration,
      zone,
      date,
      time,
      name,
      phone,
      notes,
      amount: price,
      currency: 'EUR',
    });
  }

  return (
    <section className="py-12 sm:py-16 bg-gray-50">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 text-center">
          Détails de la réservation
        </h2>
        <form onSubmit={handleSubmit} className="mt-8 grid gap-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Formule sélectionnée</label>
            <div className="mt-2 rounded-lg border bg-white p-4 text-gray-900">
              {selectedOffer ? (
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-semibold">{selectedOffer.title}</span>
                  <span className="text-sm text-gray-600">
                    {selectedOffer.duration} • {selectedOffer.price}
                  </span>
                </div>
              ) : (
                <span className="text-gray-500">Aucune formule sélectionnée</span>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Zone</label>
            <select
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="cannes">Cannes (frais inclus)</option>
              <option value="hors-cannes">Hors Cannes (frais non inclus)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Heure de début</label>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {slots.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Nom complet</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Votre nom"
              className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Téléphone (SMS/WhatsApp)</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Ex: +33 6 12 34 56 78"
              className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Adresse, préférences, etc."
              className="mt-2 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="sm:col-span-2 flex items-center justify-between rounded-xl bg-white border p-4">
            <div className="text-sm text-gray-700">
              {selectedOffer?.id === 'formule-3' ? (
                <span>Événement sur devis — vous serez recontacté.</span>
              ) : (
                <span>Montant à payer: <strong>{price} €</strong></span>
              )}
            </div>
            <button
              type="submit"
              disabled={disabled}
              className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white shadow hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Continuer
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
