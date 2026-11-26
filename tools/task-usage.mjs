import fs from 'node:fs';
import { createInterface } from 'node:readline';
import { parseArgs } from 'node:util';

const metrics = ['input_tokens', 'cached_input_tokens', 'output_tokens', 'total_tokens'];
const subtract = (current, previous) => Object.fromEntries(metrics.map(key => [key, current[key] - (previous?.[key] ?? 0)]));

try {
  const { values } = parseArgs({ options: {
    session: { type: 'string' }, turn: { type: 'string' }, active: { type: 'boolean' }
  } });
  if (!values.session) throw new Error('Pass --session <Codex rollout.jsonl> and optionally --turn <id> or --active.');
  const lines = createInterface({ input: fs.createReadStream(values.session, { encoding: 'utf8' }), crlfDelay: Infinity });
  let total;
  let turn;
  let chosen;
  for await (const line of lines) {
    if (!line.trim()) continue;
    let event;
    try { event = JSON.parse(line); } catch { continue; }
    const entry = event.payload;
    if (event.type === 'response_item' && turn && ['function_call', 'custom_tool_call'].includes(entry.type)) turn.toolCalls++;
    if (event.type !== 'event_msg') continue;
    if (entry.type === 'task_started') {
      turn = { id: entry.turn_id, startedAt: event.timestamp, capacity: entry.model_context_window,
        before: total, samples: 0, toolCalls: 0, peakInput: 0 };
    }
    if (entry.type === 'token_count' && entry.info?.total_token_usage) {
      const usage = entry.info;
      const next = usage.total_token_usage;
      if (turn && next.total_tokens !== total?.total_tokens) {
        turn.samples++;
        turn.peakInput = Math.max(turn.peakInput, usage.last_token_usage?.input_tokens ?? 0);
        turn.latest = next;
        turn.sampleAt = event.timestamp;
      }
      total = next;
    }
    if (entry.type === 'task_complete' && turn && entry.turn_id === turn.id) {
      turn.endedAt = event.timestamp;
      turn.durationMs = entry.duration_ms ?? Date.parse(turn.endedAt) - Date.parse(turn.startedAt);
      if (!values.turn || values.turn === turn.id) chosen = turn;
      turn = null;
    }
  }
  if (values.active && turn && (!values.turn || values.turn === turn.id)) chosen = turn;
  if (!chosen?.latest) throw new Error('No matching turn with usage samples.');
  const { before, latest, ...summary } = chosen;
  const tokens = subtract(latest, before);
  console.log(JSON.stringify({ ...summary, elapsedToSampleMs: Date.parse(chosen.sampleAt) - Date.parse(chosen.startedAt),
    tokens, uncachedInput: tokens.input_tokens - tokens.cached_input_tokens }));
} catch (error) {
  console.error('Task usage: ' + error.message);
  process.exitCode = 1;
}
