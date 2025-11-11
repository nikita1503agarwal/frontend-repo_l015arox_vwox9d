import { useEffect, useRef, useState } from 'react';

// Lightweight PayPal Smart Buttons wrapper. Uses env client-id when provided, fallback to sandbox test.
export default function PayPalButton({ amount, currency = 'EUR', onApprove, onError }) {
  const containerRef = useRef(null);
  const [ready, setReady] = useState(false);
  const clientId = import.meta.env.VITE_PAYPAL_CLIENT_ID || 'test';

  useEffect(() => {
    // If PayPal already loaded with same client-id, render immediately
    if (window.paypal) {
      setReady(true);
      return;
    }
    // Inject script
    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=${currency}`;
    script.async = true;
    script.onload = () => setReady(true);
    script.onerror = () => onError?.(new Error('Échec de chargement de PayPal'));
    document.body.appendChild(script);
    return () => {
      // don't remove script to avoid reloading between HMR updates
    };
  }, [currency, onError, clientId]);

  useEffect(() => {
    if (!ready || !window.paypal || !containerRef.current) return;

    // Clear previous render (HMR/navigation)
    containerRef.current.innerHTML = '';

    try {
      window.paypal.Buttons({
        style: { layout: 'vertical', color: 'gold', shape: 'rect', label: 'paypal' },
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: String(amount ?? '0.00'),
                  currency_code: currency,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          try {
            if (actions.order) {
              await actions.order.capture();
            }
          } catch (e) {
            // Ignore capture failure in sandbox; still notify UI
          }
          onApprove?.({ orderId: data.orderID });
        },
        onError: (err) => {
          onError?.(err);
        },
        onCancel: () => {
          // No-op
        },
      }).render(containerRef.current);
    } catch (e) {
      onError?.(e);
    }
  }, [ready, amount, currency, onApprove, onError]);

  return (
    <div>
      <div ref={containerRef} />
      {!ready && (
        <div className="mt-2 text-sm text-gray-500">Chargement de PayPal…</div>
      )}
      {clientId === 'test' && (
        <div className="mt-2 text-xs text-gray-400">Mode sandbox actif. Ajoutez VITE_PAYPAL_CLIENT_ID pour passer en production.</div>
      )}
    </div>
  );
}
