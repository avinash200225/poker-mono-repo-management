import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api';
import { runSimulation } from '../lib/simulatorEngine';

const TABLE_1_UIDS = ['1', '2', '3', '4', '5', '6', '7', '8'];
const TABLE_2_UIDS = ['9', '10', '11', '12', '13', '14', '15', '16'];

function HandView({ hand, gameResult, chipBalances, handIndex }) {
  if (!hand || !gameResult) return null;
  const winner = gameResult.seats?.find((s) => s.gameStatus?.startsWith('Win-'));
  const community = gameResult.gameCards || [];

  return (
    <div className="sim-hand-card">
      <div className="sim-hand-header">
        <span className="sim-hand-num">Hand #{handIndex + 1}</span>
        <span>Round {hand.roundId}</span>
        <span>Table {hand.tableId}</span>
        {winner && (
          <span className="sim-winner-badge">
            Winner: Player {winner.uid} ({winner.gameStatus?.replace('Win-', '')})
          </span>
        )}
      </div>
      <div className="sim-community">
        <strong>Community:</strong>{' '}
        {community.map((c) => (
          <span key={c} className="sim-card">{c}</span>
        ))}
      </div>
      <div className="sim-seats">
        {(gameResult.seats || []).map((s) => (
          <div key={s.uid} className={`sim-seat ${s.gameStatus?.startsWith('Win-') ? 'winner' : ''}`}>
            <div className="sim-seat-header">
              <strong>Player {s.uid}</strong>
              <span>{s.gameStatus}</span>
              <span> Chips: {(chipBalances[s.uid] ?? 0).toLocaleString()}</span>
            </div>
            <div className="sim-seat-cards">
              {s.cards?.map((c) => (
                <span key={c} className="sim-card">{c}</span>
              ))}
            </div>
            {s.hand?.length > 0 && (
              <div className="sim-best-hand">
                Best: {s.hand.map((c) => <span key={c} className="sim-card">{c}</span>)}
              </div>
            )}
            <div className="sim-seat-result">
              Bet: {s.betList?.[0]?.betValue ?? 0} · Won: {s.winAmount ?? 0}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Simulation() {
  const { id } = useParams();
  const [tournament, setTournament] = useState(null);
  const [status, setStatus] = useState('idle'); // idle, running, fastforwarding, done
  const [handHistory, setHandHistory] = useState([]);
  const [chipBalances, setChipBalances] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      api(`/api/tournaments/${id}`).then((r) => r.json()).then(setTournament).catch(() => setTournament(null));
    }
  }, [id]);

  const startSimulation = async (fastForward = false) => {
    if (!id || !tournament) return;
    setError(null);
    setStatus(fastForward ? 'fastforwarding' : 'running');
    setHandHistory([]);
    setCurrentIndex(0);

    const startingChips = tournament.starting_chips ?? 10000;
    const allUids = [...TABLE_1_UIDS, ...TABLE_2_UIDS];
    for (const uid of allUids) {
      try {
        await fetch('/api/session/register-player', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tournament_id: Number(id),
            external_uid: uid,
            display_name: `Player ${uid}`,
          }),
        });
      } catch {
        /* ignore if already registered */
      }
    }
    const { rounds: allRounds, chipBalances: finalBalances } = runSimulation({
      startingChips,
      startRoundId: 1000 + Math.floor(Math.random() * 1000),
      maxHands: 150,
    });

    const history = [];
    const balances = {};
    [...Array(16).keys()].forEach((i) => (balances[String(i + 1)] = startingChips));
    for (const round of allRounds) {
      let gr;
      try {
        gr = JSON.parse(round.gameResult);
      } catch {
        gr = {};
      }
      for (const s of gr.seats || []) {
        const bet = s.betList?.[0]?.betValue ?? 0;
        const win = s.winAmount ?? 0;
        balances[s.uid] = (balances[s.uid] ?? 0) - bet + win;
      }
      history.push({ round, gameResult: gr, balances: { ...balances } });
    }

    setHandHistory(history);
    setChipBalances(finalBalances ?? balances);
    setCurrentIndex(history.length);

    try {
      await api('/api/sync/rounds/ingest', {
        method: 'POST',
        body: JSON.stringify({ tournament_id: Number(id), records: allRounds }),
      });
    } catch (e) {
      setError(String(e.message));
    }
    setStatus('done');
  };

  if (!tournament && id) return <div className="card"><p>Loading...</p></div>;
  if (!id) return <div className="card"><p>Select a tournament first.</p></div>;

  const currentHand = handHistory[currentIndex - 1];

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1>Game Simulation</h1>
          <p>
            {tournament?.name} · 2 tables × 8 tablets · Random actions
          </p>
        </div>
        <Link to={`/tournaments/${id}/control`} className="btn btn-secondary">← Tournament Control</Link>
      </div>

      <div className="card">
        <h3>Simulation Controls</h3>
        <p className="muted" style={{ marginBottom: '1rem' }}>
          Run a random poker simulation and push hands to the tournament manager. View gameplay walkthrough or fast-forward to completion.
        </p>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            className="btn btn-primary"
            disabled={status === 'running' || status === 'fastforwarding'}
            onClick={() => startSimulation(false)}
          >
            {status === 'running' ? 'Running…' : '▶ Start Simulation'}
          </button>
          <button
            className="btn btn-secondary"
            disabled={status === 'running' || status === 'fastforwarding'}
            onClick={() => startSimulation(true)}
          >
            {status === 'fastforwarding' ? 'Fast forwarding…' : '⏩ Fast Forward to End'}
          </button>
        </div>
        {error && <p className="error" style={{ marginTop: '1rem' }}>{error}</p>}
      </div>

      {handHistory.length > 0 && (
        <>
          <div className="card">
            <h3>Gameplay Walkthrough</h3>
            <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <input
                type="range"
                min={0}
                max={handHistory.length}
                value={currentIndex}
                onChange={(e) => setCurrentIndex(Number(e.target.value))}
              />
              <span>Hand {currentIndex} of {handHistory.length}</span>
            </div>
            <HandView
              hand={currentHand?.round}
              gameResult={currentHand?.gameResult}
              chipBalances={currentHand?.balances ?? chipBalances}
              handIndex={currentIndex - 1}
            />
          </div>

          <div className="card">
            <h3>Chip Counts (End of Sim)</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {[...TABLE_1_UIDS, ...TABLE_2_UIDS].map((uid) => (
                <span key={uid} className="badge badge-neutral">
                  P{uid}: {(chipBalances[uid] ?? 0).toLocaleString()}
                </span>
              ))}
            </div>
          </div>

          <div className="card">
            <p>
              <Link to={`/tournaments/${id}/control`} className="btn btn-primary">
                View Statistics & Leaderboard in Tournament Control →
              </Link>
            </p>
          </div>
        </>
      )}
    </div>
  );
}
