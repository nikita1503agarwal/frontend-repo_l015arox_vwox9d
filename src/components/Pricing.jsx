const offers = [
  {
    id: 'formule-1',
    title: 'Semaine (10h–20h)',
    duration: '2h',
    price: '150€',
    zone: 'Cannes',
    transport: 'Frais de transport inclus à Cannes. Hors Cannes: non inclus.',
    highlight: true,
  },
  {
    id: 'formule-2',
    title: 'Week-end (10h–20h)',
    duration: '2h',
    price: '250€',
    zone: 'Cannes',
    transport: 'Frais de transport inclus à Cannes. Hors Cannes: non inclus.',
  },
  {
    id: 'formule-3',
    title: 'Événement',
    duration: 'Sur devis',
    price: '—',
    zone: 'Personnalisé',
    transport: 'Tarifs et déplacement sur mesure selon besoin.',
  },
];

export default function Pricing({ selected, onSelect }) {
  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 text-center">
          Choisissez votre formule
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {offers.map((o) => (
            <button
              key={o.id}
              onClick={() => onSelect(o)}
              className={`group relative rounded-2xl border p-6 text-left transition-all ${
                selected?.id === o.id
                  ? 'border-blue-600 ring-2 ring-blue-200'
                  : 'border-gray-200 hover:border-gray-300'
              } ${o.highlight ? 'bg-blue-50/40' : 'bg-white'}`}
            >
              <div className="flex items-baseline justify-between">
                <h3 className="text-xl font-bold text-gray-900">{o.title}</h3>
                <span className="text-blue-600 font-semibold">{o.price}</span>
              </div>
              <p className="mt-2 text-sm text-gray-600">Durée: {o.duration}</p>
              <p className="mt-2 text-sm text-gray-600">Zone: {o.zone}</p>
              <p className="mt-4 text-sm text-gray-700">{o.transport}</p>
              <div className={`mt-6 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                selected?.id === o.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
              }`}>
                {selected?.id === o.id ? 'Sélectionnée' : 'Sélectionner'}
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
