import { useState, useEffect } from 'react';
import SocialPostForm from '../components/SocialPostForm';
import VideoScriptForm from '../components/VideoScriptForm';
import PlanSelect from '../components/PlanSelect';

export default function Dashboard() {
  const [plan, setPlan] = useState('Starter');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) window.location = '/';
    // Fetch user plan from backend if needed
  }, []);

  function handlePlanChange(newPlan) {
    setPlan(newPlan);
    // Optionally, trigger payment flow
  }

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to Social Writer AI</h1>
      <PlanSelect selected={plan} onSelect={handlePlanChange} />
      <SocialPostForm />
      {plan !== 'Starter' && <VideoScriptForm />}
    </div>
  );
}
