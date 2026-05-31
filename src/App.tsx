import { useMemo, useState, type CSSProperties } from 'react';
import confetti from 'canvas-confetti';

type CelebrationVariation = {
  title: string;
  body: string;
  pops: string[];
  surprises: string[];
  confetti: {
    colors: string[];
    spread: number;
    startVelocity: number;
    scalar: number;
  };
};

type NewsArticle = {
  source: string;
  section: string;
  headline: string;
  dek: string;
  stamp: string;
};

const celebrationVariations: CelebrationVariation[] = [
  {
    title: 'Schnauzer Zoomie Cake Dash',
    body: 'Fibs and Hermann launch into turbo zoomies the moment a birthday cake appears.',
    pops: ['🐾 Zoomie alert!', '🎂 Cake sprint!', '✨ Paw confetti!'],
    surprises: ['Hermann does a surprise spin for bonus cake.', 'Fibs discovers a hidden sprinkle stash.'],
    confetti: {
      colors: ['#ff6b6b', '#ffd43b', '#ff922b'],
      spread: 62,
      startVelocity: 30,
      scalar: 1
    }
  },
  {
    title: 'Sprinkle Snout Celebration',
    body: 'Birthday sprinkles are flying and both schnauzers are on official frosting patrol duty.',
    pops: ['🧁 Sprinkle pop!', '🐶 Snout boop!', '🎉 Frosting burst!'],
    surprises: ['Cake confetti turns into glittery paw prints.', 'A sneaky cupcake appears for schnauzer quality control.'],
    confetti: {
      colors: ['#ff5d8f', '#9775fa', '#ffa94d'],
      spread: 74,
      startVelocity: 34,
      scalar: 1.15
    }
  },
  {
    title: 'Double Schnauzer Cake Guard',
    body: 'Hermann takes the left side, Fibs takes the right, and no cake crumb is left behind.',
    pops: ['🦴 Guard mode!', '🎂 Crumb patrol!', '💛 Birthday paws!'],
    surprises: ['Both guards approve a second slice.', 'The crumb alarm triggers a mini dance break.'],
    confetti: {
      colors: ['#12b886', '#fab005', '#ff8787'],
      spread: 58,
      startVelocity: 29,
      scalar: 0.95
    }
  },
  {
    title: 'Candle Wish Schnauzer Waltz',
    body: 'The cake candles glow while two fancy schnauzers do a tiny birthday dance around them.',
    pops: ['🕯️ Candle glow!', '🐾 Dance twirl!', '🎈 Party pop!'],
    surprises: ['A surprise chorus of birthday barks starts.', 'The dance ends with synchronized schnauzer bows.'],
    confetti: {
      colors: ['#228be6', '#ff922b', '#ffec99'],
      spread: 80,
      startVelocity: 32,
      scalar: 1.08
    }
  },
  {
    title: 'Mega Cake Paw Parade',
    body: 'Five layers of birthday cake and maximum schnauzer excitement unlock the party finale.',
    pops: ['🎂 Mega cake!', '🐕 Paw parade!', '💥 Final pop!'],
    surprises: ['Finale mode: sparkly paw fireworks unlocked.', 'Cake towers get a surprise confetti crown.'],
    confetti: {
      colors: ['#fa5252', '#fcc419', '#845ef7'],
      spread: 92,
      startVelocity: 36,
      scalar: 1.2
    }
  }
];

const gallery = [
  { src: 'images/schnauzer-party.svg', alt: 'Schnauzer in a party hat' },
  { src: 'images/birthday-cake.svg', alt: 'Birthday cake with candles' },
  { src: 'images/teacher-star.svg', alt: 'Teacher-themed gold star' },
  { src: 'images/cooking-fun.svg', alt: 'Cooking-themed illustration' },
  { src: 'images/balloon-burst.svg', alt: 'Colorful birthday balloons' },
  { src: 'images/schnauzer-cooking.svg', alt: 'Schnauzer with cooking hat' },
  { src: 'images/gift-box.svg', alt: 'Birthday gift box' },
  { src: 'images/schnauzer-hearts.svg', alt: 'Schnauzer with hearts' }
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

type Guest = {
  id: string;
  image: string;
  alt: string;
  quote: string;
};

const guests: Guest[] = [
  {
    id: 'hermann',
    image: 'images/hermann-birthday-cartoon.svg',
    alt: 'Cartoon Hermann schnauzer in a birthday hat',
    quote: 'Hermann says: Happy Birthday, Wendi!'
  },
  {
    id: 'fibs',
    image: 'images/fibs-birthday-cartoon.svg',
    alt: 'Cartoon Fibs schnauzer with a birthday bow tie',
    quote: 'Fibs says: Happy Birthday, Wendi!'
  }
];

const toCelebrationIndex = (completedPresses: number): number => {
  if (completedPresses <= 0) return 0;
  return (completedPresses - 1) % celebrationVariations.length;
};

function randomFrom(items: string[]): string {
  return items[Math.floor(Math.random() * items.length)];
}

function launchConfetti(variation: CelebrationVariation): void {
  const defaults = {
    spread: variation.confetti.spread,
    ticks: 150,
    gravity: 0.85,
    decay: 0.93,
    startVelocity: variation.confetti.startVelocity,
    colors: variation.confetti.colors
  };

  confetti({ ...defaults, particleCount: 90, scalar: variation.confetti.scalar * 0.9, origin: { x: 0.2, y: 0.65 } });
  confetti({ ...defaults, particleCount: 120, scalar: variation.confetti.scalar, origin: { x: 0.8, y: 0.65 } });
  confetti({
    ...defaults,
    particleCount: 140,
    scalar: variation.confetti.scalar * 1.15,
    origin: { x: 0.5, y: 0.42 }
  });
}

const assetUrl = (path: string): string => `${import.meta.env.BASE_URL}${path}`;

export default function App() {
  const [partyMode, setPartyMode] = useState(false);
  const [buttonPressCount, setButtonPressCount] = useState(0);
  const [showGuests, setShowGuests] = useState(false);
  const [surpriseMessage, setSurpriseMessage] = useState('Press for a surprise schnauzer cake moment!');
  const [surpriseFlashCount, setSurpriseFlashCount] = useState(0);

  const celebrationIndex = useMemo(() => toCelebrationIndex(buttonPressCount), [buttonPressCount]);
  const activeVariation = useMemo(() => celebrationVariations[celebrationIndex], [celebrationIndex]);

  const onGetWishes = () => {
    setButtonPressCount((current) => {
      const next = current + 1;
      const nextVariation = celebrationVariations[toCelebrationIndex(next)];
      launchConfetti(nextVariation);
      const surprise = randomFrom(nextVariation.surprises);
      setSurpriseMessage(surprise);
      setSurpriseFlashCount((flash) => flash + 1);

      if (next % celebrationVariations.length === 0) {
        confetti({
          particleCount: 180,
          spread: 110,
          ticks: 210,
          scalar: 1.25,
          startVelocity: 40,
          colors: ['#ff6b6b', '#fcc419', '#845ef7', '#12b886'],
          origin: { x: 0.5, y: 0.35 }
        });
      }
      return next;
    });
    setPartyMode(true);
    setShowGuests(true);
    window.setTimeout(() => setPartyMode(false), 2200);
    window.setTimeout(() => setShowGuests(false), 3600);
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
              Birthday Celebration Pop{' '}
              {buttonPressCount === 0
                ? '(ready for 1/5)'
                : `(${celebrationIndex + 1}/${celebrationVariations.length})`}
            </button>
          </div>
          <article className="wish-panel" aria-live="polite">
            <h2>{activeVariation.title}</h2>
            <p>{activeVariation.body}</p>
          </article>
          <article className="pop-strip" aria-live="polite" key={buttonPressCount}>
            <p className="pop-strip-title">Animated pops</p>
            <div className="pop-strip-items">
              {activeVariation.pops.map((pop, index) => (
                <span
                  className="pop-pill"
                  key={`${pop}-${index}`}
                  style={{ '--pop-delay': `${index * 120}ms` } as CSSProperties}
                >
                  {pop}
                </span>
              ))}
            </div>
          </article>
          <article className="surprise-banner" key={surpriseFlashCount} aria-live="polite">
            <p>🎁 Surprise: {surpriseMessage}</p>
          </article>
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
              <img src={assetUrl(item.src)} alt={item.alt} loading="lazy" />
            </figure>
          ))}
        </section>

        <section
          className={`guest-pop ${showGuests ? 'is-visible' : ''}`}
          aria-live="polite"
          aria-hidden={!showGuests}
        >
          {guests.map((guest) => (
            <article className={`guest-card ${guest.id}`} key={guest.id}>
              <img src={assetUrl(guest.image)} alt={guest.alt} loading="lazy" />
              <p>{guest.quote}</p>
            </article>
          ))}
        </section>
      </main>
    </div>
  );
}
