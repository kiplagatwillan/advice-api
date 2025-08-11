import { useState, useEffect } from 'react';
import { RefreshCcw } from 'lucide-react';

export default function App() {
  const [advice, setAdvice] = useState('');
  const [adviceId, setAdviceId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAdvice = async () => {
    setLoading(true);
    setError(null);
    setAdvice('');

    try {
      const response = await fetch(`https://api.adviceslip.com/advice?t=${Math.random()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch new advice. Please check your network connection.');
      }
      const data = await response.json();
      setAdvice(data.slip.advice);
      setAdviceId(data.slip.id);
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
    <>
      <style>
        {`
          /* Import font from Google Fonts */
          @import url('https://fonts.googleapis.com/css2?family=Inter:ital,wght@0,400;0,700;1,400&display=swap');

          /* Basic reset */
          * {
            padding: 0;
            margin: 0;
            box-sizing: border-box;
            font-family: 'Inter', sans-serif;
          }

          /* Main App Container */
          .app-container {
            min-height: 100vh;
            background-color: #0f172a; /* bg-slate-900 */
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem; /* p-4 */
          }

          /* Advice Card */
          .advice-card {
            background-color: #1e293b; /* bg-slate-800 */
            color: #e2e8f0; /* text-slate-200 */
            border-radius: 0.75rem; /* rounded-xl */
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25); /* shadow-2xl */
            padding: 1.5rem; /* p-6 */
            max-width: 32rem; /* max-w-lg */
            width: 100%;
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          @media (min-width: 768px) {
            .advice-card {
              padding: 2rem; /* md:p-8 */
            }
          }

          /* Advice ID Header */
          .advice-header {
            color: #34d399; /* text-emerald-400 */
            font-size: 0.75rem; /* text-xs */
            letter-spacing: 0.2em; /* tracking-widest */
            font-weight: 600; /* font-semibold */
            margin-bottom: 1.5rem; /* mb-6 */
            text-transform: uppercase;
          }

          @media (min-width: 768px) {
            .advice-header {
              font-size: 0.875rem; /* md:text-sm */
            }
          }

          /* Advice Text Container */
          .advice-text-container {
            min-height: 120px;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .advice-text {
            font-size: 1.25rem; /* text-xl */
            font-weight: 700; /* font-bold */
            font-style: italic;
            padding-left: 0.5rem; /* px-2 */
            padding-right: 0.5rem; /* px-2 */
          }

          @media (min-width: 768px) {
            .advice-text {
              font-size: 1.5rem; /* md:text-2xl */
            }
          }

          /* Separator */
          .separator {
            margin-top: 2rem; /* my-8 */
            margin-bottom: 2rem;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 1rem; /* gap-4 */
          }

          .separator-line {
            flex-grow: 1;
            height: 1px;
            background-color: #475569; /* bg-slate-600 */
          }

          .separator-dot-container {
            flex-shrink: 0;
            display: flex;
            gap: 0.375rem; /* gap-1.5 */
          }

          .separator-dot {
            width: 0.375rem; /* w-1.5 */
            height: 1rem; /* h-4 */
            background-color: #34d399; /* bg-emerald-400 */
            border-radius: 9999px; /* rounded-full */
          }

          /* Button */
          .advice-button {
            position: relative;
            margin-top: 2rem; /* mt-8 */
            background-color: #34d399; /* bg-emerald-400 */
            color: #0f172a; /* text-slate-900 */
            padding: 1.25rem; /* p-5 */
            border-radius: 9999px; /* rounded-full */
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); /* shadow-lg */
            cursor: pointer;
            border: none;
            transition-property: all;
            transition-duration: 300ms;
          }

          .advice-button:hover {
            box-shadow: 0 10px 15px -3px rgba(52, 211, 153, 0.5), 0 4px 6px -2px rgba(52, 211, 153, 0.05); /* hover:shadow-emerald-400 */
          }

          .advice-button:disabled {
            background-color: #475569; /* disabled:bg-slate-700 */
            cursor: not-allowed;
          }

          .button-icon {
            width: 1.5rem; /* w-6 */
            height: 1.5rem; /* h-6 */
            transition-property: transform;
            transition-duration: 300ms;
          }

          .advice-button:hover .button-icon {
            transform: rotate(180deg);
          }

          /* Tooltip */
          .tooltip {
            position: absolute;
            bottom: 100%;
            margin-bottom: 0.5rem; /* mb-2 */
            opacity: 0;
            transition-property: opacity;
            transition-duration: 300ms;
            padding: 0.5rem; /* p-2 */
            font-size: 0.75rem; /* text-xs */
            background-color: #334155; /* bg-slate-700 */
            color: #fff; /* text-white */
            border-radius: 0.375rem; /* rounded-md */
            white-space: nowrap;
          }

          .advice-button:hover .tooltip {
            opacity: 1;
          }

          /* Spinner Animation */
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          .spinner {
            width: 1.5rem; /* w-6 */
            height: 1.5rem; /* h-6 */
            border: 4px solid #0f172a; /* border-slate-900 */
            border-top-color: #fff; /* border-t-white */
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }

          .main-spinner {
            width: 3rem; /* w-12 */
            height: 3rem; /* h-12 */
            border: 4px solid #475569; /* border-slate-600 */
            border-top-color: #34d399; /* border-t-emerald-400 */
            border-radius: 50%;
            animation: spin 1s linear infinite;
          }
        `}
      </style>
      <div className="app-container">
        <div className="advice-card">
          <h2 className="advice-header">
            Advice #{adviceId}
          </h2>

          <div className="advice-text-container">
            {loading ? (
              <div className="main-spinner"></div>
            ) : (
              <p className="advice-text">
                "{advice}"
              </p>
            )}
          </div>

          <div className="separator">
            <div className="separator-line"></div>
            <div className="separator-dot-container">
              <div className="separator-dot"></div>
              <div className="separator-dot"></div>
            </div>
            <div className="separator-line"></div>
          </div>

          <button
            onClick={fetchAdvice}
            disabled={loading}
            className="advice-button"
          >
            {loading ? (
              <div className="spinner"></div>
            ) : (
              <RefreshCcw className="button-icon" />
            )}

            <span className="tooltip">
              Get new advice
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
