// netlify/functions/search.js
//
// Serverless proxy between the browser and api.opencaselist.com.
// Why this exists:
//   1. CORS — the caselist API does not send permissive CORS headers, so a
//      static site cannot call it directly from the browser. This function
//      runs server-side, so CORS does not apply.
//   2. Token safety — the user's caselist_token is sent to THIS function,
//      not embedded in the public bundle. Forwarded as a cookie, never logged.
//
// Confirmed against the live Swagger spec (api.opencaselist.com/v1/docs):
//   GET /v1/search?q={query}&shard={shard}   (both REQUIRED)
//   200 -> array of { id, shard, content, path }
//   default -> { message }
//
// "shard" follows the openCaselist naming convention: event + 2-digit start
// year, e.g. hspolicy24, ndtceda24, hsld24, hspf24, nfald24.

const API_BASE = 'https://api.opencaselist.com/v1';

exports.handler = async (event) => {
  const cors = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, x-caselist-token',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
  };
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers: cors, body: '' };

  const p = event.queryStringParameters || {};
  const q = (p.q || '').trim();
  const shard = (p.shard || '').trim();
  if (!q)     return json(400, cors, { message: 'Missing query (q).' });
  if (!shard) return json(400, cors, { message: 'Missing shard. Pick a caselist (e.g. hspolicy24).' });

  const token = event.headers['x-caselist-token'] || event.headers['X-Caselist-Token'];
  if (!token) return json(401, cors, { message: 'Missing caselist token.' });

  // Forward q + shard, plus any extra params the API may accept (cursor, etc.)
  const fwd = new URLSearchParams({ q, shard });
  for (const [k, v] of Object.entries(p)) {
    if (k !== 'q' && k !== 'shard' && v != null && v !== '') fwd.set(k, v);
  }

  const url = `${API_BASE}/search?${fwd.toString()}`;
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: { 'Cookie': `caselist_token=${token}`, 'Accept': 'application/json' },
    });
    const text = await res.text();
    return { statusCode: res.status, headers: { ...cors, 'Content-Type': 'application/json' }, body: text || '{}' };
  } catch (err) {
    return json(502, cors, { message: 'Proxy failed to reach the caselist API', detail: String(err) });
  }
};

function json(code, cors, obj) {
  return { statusCode: code, headers: { ...cors, 'Content-Type': 'application/json' }, body: JSON.stringify(obj) };
}
