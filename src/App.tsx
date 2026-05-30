import { useMemo, useState } from 'react';
import confetti from 'canvas-confetti';

type Wish = {
  title: string;
  body: string;
};

type NewsArticle = {
  source: string;
  section: string;
  headline: string;
  dek: string;
  stamp: string;
};

const wishes: Wish[] = [
  {
    title: 'Master Teacher Magic',
    body: 'May your year be full of A+ days, delighted students, and well-deserved joy.'
  },
  {
    title: 'Kitchen Joy',
    body: 'May every recipe turn golden, every dessert sparkle, and every meal gather smiles.'
  },
  {
    title: 'Schnauzer Energy',
    body: 'May your days be as loyal, playful, and full of zoomies as your favorite schnauzers.'
  },
  {
    title: 'Birthday Glow-Up',
    body: 'Big laughter, cozy moments, and a year that feels made exactly for you, Wendi.'
  }
];

const gallery = [
  { src: '/images/schnauzer-party.svg', alt: 'Schnauzer in a party hat' },
  { src: '/images/birthday-cake.svg', alt: 'Birthday cake with candles' },
  { src: '/images/teacher-star.svg', alt: 'Teacher-themed gold star' },
  { src: '/images/cooking-fun.svg', alt: 'Cooking-themed illustration' },
  { src: '/images/balloon-burst.svg', alt: 'Colorful birthday balloons' },
  { src: '/images/schnauzer-cooking.svg', alt: 'Schnauzer with cooking hat' },
  { src: '/images/gift-box.svg', alt: 'Birthday gift box' },
  { src: '/images/schnauzer-hearts.svg', alt: 'Schnauzer with hearts' }
];

const celebrations: NewsArticle[] = [
  {
    source: 'Birthday Daily',
    section: 'Education',
    headline: 'Classroom Joy Index Soars Under Wendi Leadership',
    dek: 'Students report more confidence, more curiosity, and way more smiling in every lesson she leads.',
    stamp: 'Top Story'
  },
  {
    source: 'The Cozy Kitchen Times',
    section: 'Food + Fun',
    headline: 'Local Genius Wendi Declares Every Meal a Celebration',
    dek: 'From weeknight comfort to party-level desserts, her cooking is officially classified as happiness.',
    stamp: "Editor's Pick"
  },
  {
    source: 'Schnauzer Signal',
    section: 'Dogs',
    headline: 'Tail-Wag Council Names Wendi Human of the Year',
    dek: 'Experts cite elite cuddle standards, unmatched snack timing, and outstanding schnauzer enthusiasm.',
    stamp: 'Breaking'
  },
  {
    source: 'Sunshine Post',
    section: 'Community',
    headline: 'Wendi Effect: Rooms Become Better the Moment She Arrives',
    dek: 'Friends, family, and colleagues confirm she raises the vibe wherever she goes.',
    stamp: 'Special Report'
  },
  {
    source: 'Party Network',
    section: 'Birthday Watch',
    headline: 'Celebration Analysts Predict Wendi Will Have Her Best Year Yet',
    dek: 'Forecast includes laughter spikes, memory-making moments, and a 100% chance of joy.',
    stamp: 'Live'
  },
  {
    source: 'Good News Wire',
    section: 'Inspiration',
    headline: 'Experts Agree: Wendi Is Amazing, Full Stop',
    dek: 'After extensive review, researchers found her kindness, brilliance, and heart to be off the charts.',
    stamp: 'Verified'
  }
];

function launchConfetti(): void {
  const defaults = {
    spread: 65,
    ticks: 150,
    gravity: 0.85,
    decay: 0.93,
    startVelocity: 32,
    colors: ['#ff6b6b', '#ff922b', '#ffd43b', '#12b886', '#228be6', '#fa5252']
  };

  confetti({ ...defaults, particleCount: 100, scalar: 0.9, origin: { x: 0.2, y: 0.65 } });
  confetti({ ...defaults, particleCount: 130, scalar: 1.1, origin: { x: 0.8, y: 0.65 } });
  confetti({ ...defaults, particleCount: 150, scalar: 1.3, origin: { x: 0.5, y: 0.45 } });
}

const LLAMA_URL = 'http://schnode.local:8081/v1/chat/completions';
const LLAMA_MODEL = 'gemma-3-it-4B-Q4_K_M.gguf';

async function fetchAiWish(): Promise<string> {
  const res = await fetch(LLAMA_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: LLAMA_MODEL,
      messages: [
        {
          role: 'system',
          content:
            'You are a warm, witty birthday wish writer. Keep responses to 2-3 sentences max. No introductions or sign-offs.'
        },
        {
          role: 'user',
          content:
            'Write a unique, heartfelt birthday wish for Wendi — a phenomenal teacher who loves cooking and adores her schnauzers Hermann and Fibs. Make it personal, fun, and joyful.'
        }
      ],
      max_tokens: 120,
      temperature: 0.9
    })
  });
  if (!res.ok) throw new Error(`AI server error: ${res.status}`);
  const data = await res.json();
  return data.choices[0].message.content.trim();
}

export default function App() {
  const [partyMode, setPartyMode] = useState(false);
  const [wishIndex, setWishIndex] = useState(0);
  const [showGuests, setShowGuests] = useState(false);
  const [aiWish, setAiWish] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);

  const wish = useMemo(() => wishes[wishIndex], [wishIndex]);

  const onGetWishes = () => {
    setWishIndex((current) => (current + 1) % wishes.length);
    setPartyMode(true);
    setShowGuests(true);
    launchConfetti();
    window.setTimeout(() => setPartyMode(false), 2200);
    window.setTimeout(() => setShowGuests(false), 3600);
  };

  const onAiWish = async () => {
    setAiLoading(true);
    setAiError(null);
    setAiWish(null);
    try {
      const wish = await fetchAiWish();
      setAiWish(wish);
      launchConfetti();
    } catch (e) {
      setAiError('The AI wishing machine is taking a break 🐾 Try again!');
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className={`page ${partyMode ? 'party-mode' : ''}`}>
      <div className="ambient ambient-a" />
      <div className="ambient ambient-b" />
      <main className="content">
        <section className="hero card reveal-up">
          <p className="eyebrow">Birthday Broadcast • Live from the Party Zone</p>
          <h1>Happy Birthday, Wendi!</h1>
          <p className="subtitle">
            For a phenomenal teacher, a creative cook, and a schnauzer superfan - this page is your confetti-filled celebration.
          </p>
          <div className="button-row">
            <button className="wish-button" onClick={onGetWishes}>
              Get Birthday Wishes
            </button>
            <button className="wish-button ai-button" onClick={onAiWish} disabled={aiLoading}>
              {aiLoading ? '✨ Thinking…' : '🤖 AI Birthday Wish'}
            </button>
          </div>
          <article className="wish-panel" aria-live="polite">
            <h2>{wish.title}</h2>
            <p>{wish.body}</p>
          </article>
          {(aiWish || aiError || aiLoading) && (
            <article className="wish-panel ai-wish-panel" aria-live="polite">
              <h2>✨ AI Says…</h2>
              {aiLoading && <p className="ai-loading">Summoning birthday magic from the AI…</p>}
              {aiError && <p className="ai-error">{aiError}</p>}
              {aiWish && <p>{aiWish}</p>}
            </article>
          )}
        </section>

        <section className="news-desk card reveal-up-delayed" aria-label="Celebration news desk">
          <header className="news-header">
            <p>Special Edition</p>
            <h2>Wendi Celebration Newswire</h2>
          </header>
          <div className="news-grid">
            {celebrations.map((story) => (
              <article className="news-card" key={story.headline}>
                <p className="news-meta">
                  <span>{story.source}</span>
                  <span>{story.section}</span>
                </p>
                <h3>{story.headline}</h3>
                <p>{story.dek}</p>
                <span className="news-stamp">{story.stamp}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="gallery card reveal-up-delayed" aria-label="Birthday and schnauzer gallery">
          {gallery.map((item) => (
            <figure className="tile" key={item.src}>
              <img src={item.src} alt={item.alt} loading="lazy" />
            </figure>
          ))}
        </section>

        <section
          className={`guest-pop ${showGuests ? 'is-visible' : ''}`}
          aria-live="polite"
          aria-hidden={!showGuests}
        >
          <article className="guest-card brad">
            <img
              src="http://schnode.local:3002/_astro/breimer_profile.DYMzLsg8_2iwWhu.webp"
              alt="Brad Reimer portrait"
              loading="lazy"
            />
            <p>Brad says: Happy Birthday, Wendi!</p>
          </article>
          <article className="guest-card hermann">
            <img
              src="http://schnode.local:3002/_astro/hermann_profile.BB4SKGlN_Z2cin5p.webp"
              alt="Hermann schnauzer portrait"
              loading="lazy"
            />
            <p>Hermann says: Happy Birthday, Wendi!</p>
          </article>
          <article className="guest-card fibs">
            <img
              src="http://schnode.local:3002/_astro/fibs_profile.BQUKAJ6l_Z1C3dz5.webp"
              alt="Fibs schnauzer portrait"
              loading="lazy"
            />
            <p>Fibs says: Happy Birthday, Wendi!</p>
          </article>
        </section>
      </main>
    </div>
  );
}
