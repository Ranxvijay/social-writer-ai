const plans = [
  { name: 'Starter', price: '$9/mo', features: ['Social Post AI'] },
  { name: 'Pro', price: '$29/mo', features: ['Social Post AI', 'Video Script AI'] },
  { name: 'Enterprise', price: '$99/mo', features: ['All AI Features', 'Custom Model'] },
];

export default function PlanSelect({ selected, onSelect }) {
  return (
    <div className="flex gap-6 mb-8">
      {plans.map(plan => (
        <div key={plan.name} className={`border p-4 rounded ${selected === plan.name ? 'border-blue-600' : ''}`}>
          <h3 className="font-bold text-lg">{plan.name}</h3>
          <p className="font-semibold">{plan.price}</p>
          <ul className="text-sm mt-2 mb-4">
            {plan.features.map(f => <li key={f}>✓ {f}</li>)}
          </ul>
          <button
            className={`bg-blue-600 text-white p-2 rounded w-full ${selected === plan.name ? 'opacity-50' : ''}`}
            onClick={() => onSelect(plan.name)}
            disabled={selected === plan.name}
          >
            {selected === plan.name ? 'Current Plan' : 'Choose'}
          </button>
        </div>
      ))}
    </div>
  );
}
