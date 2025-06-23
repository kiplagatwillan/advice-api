import { useState, useEffect } from 'react';

function AdviceGenerator() {
  const [advice, setAdvice] = useState("Click the button to get advice!");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAdvice = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('https://api.adviceslip.com/advice');
      if (!response.ok) {
        throw new Error('Failed to fetch advice');
      }
      const data = await response.json();
      setAdvice(data.slip.advice);
    } catch (err) {
      setError(err.message);
      setAdvice("Couldn't fetch new advice. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <div className="advice-container">
      <h1>Advice Generator</h1>
      <div className="advice-box">
        {error ? (
          <p className="error">{error}</p>
        ) : (
          <p className="advice-text">"{advice}"</p>
        )}
      </div>
      <button 
        onClick={fetchAdvice}
        disabled={loading}
        className="advice-button"
      >
        {loading ? 'Loading...' : 'Get New Advice'}
      </button>
    </div>
  );
}
export default AdviceGenerator;