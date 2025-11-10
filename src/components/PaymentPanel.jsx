import { useMemo } from 'react';
import { Shield, Calendar } from 'lucide-react';
import PayPalButton from './PayPalButton';

export default function PaymentPanel({ draft, onConfirm }) {
  const isQuote = draft?.offerId === 'formule-3';

  const summary = useMemo(() => {
    if (!draft) return null;
    return [
      { label: 'Formule', value: draft.offerTitle },
      { label: 'Date', value: draft.date },
      { label: 'Heure', value: draft.time },
      { label: 'Zone', value: draft.zone === 'cannes' ? 'Cannes' : 'Hors Cannes' },
      { label: 'Durée', value: draft.duration },
      !isQuote ? { label: 'Montant', value: `${draft.amount} €` } : null,
    ].filter(Boolean);
  }, [draft, isQuote]);

  if (!draft) return null;

  return (
    <section className="py-12">
      <div className="mx-auto max-w-6xl px-6 grid gap-8 lg:grid-cols-2">
        <div className="rounded-2xl border bg-white p-6">
          <h3 className="text-xl font-bold text-gray-900">Récapitulatif</h3>
          <dl className="mt-6 space-y-3">
            {summary.map((item) => (
              <div key={item.label} className="flex items-center justify-between text-sm">
                <dt className="text-gray-600">{item.label}</dt>
                <dd className="font-medium text-gray-900">{item.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6 rounded-lg bg-gray-50 p-4 text-sm text-gray-700">
            Le rendez-vous est confirmé automatiquement après paiement.
          </div>
        </div>

        <div className="rounded-2xl border bg-white p-6">
          <h3 className="text-xl font-bold text-gray-900">Paiement</h3>
          {isQuote ? (
            <div className="mt-4 text-sm text-gray-700">
              Pour les événements, nous vous contactons rapidement pour établir un devis personnalisé.
            </div>
          ) : (
            <div className="mt-4 space-y-4 text-sm text-gray-700">
              <p>Régler par PayPal pour valider immédiatement votre créneau.</p>
              <PayPalButton
                amount={draft.amount}
                currency={draft.currency || 'EUR'}
                onApprove={({ orderId }) => onConfirm?.({ method: 'paypal', orderId })}
                onError={(err) => alert('Erreur PayPal: ' + (err?.message || 'inconnue'))}
              />
            </div>
          )}

          <div className="mt-6 grid gap-3 text-sm text-gray-600">
            <div className="inline-flex items-center gap-2"><Shield className="h-4 w-4"/> Paiement sécurisé</div>
            <div className="inline-flex items-center gap-2"><Calendar className="h-4 w-4"/> Créneau ajouté à votre agenda</div>
          </div>
        </div>
      </div>
    </section>
  );
}
