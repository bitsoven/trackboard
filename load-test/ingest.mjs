// Load test for the public report ingest endpoint under concurrent
// screenshot uploads.
//
// Prerequisites:
//   1. A running Trackboard server (pnpm start / docker run).
//   2. A project with an API key and a configured allowed origin.
//   3. Set the env vars below (or pass flags).
//
// Usage:
//   node load-test/ingest.mjs --users 50 --duration 30
//
// Env overrides:
//   TRACKBOARD_URL  (default http://localhost:3333)
//   API_KEY         (required — a valid project API key)
//   ORIGIN          (required — must be an allowed origin for the project)
//   USERS / DURATION (override the CLI flags)
//
// Each request sends a base64 screenshot, which exercises the
// screenshot-upload path (S3/MinIO put, with a data-URL fallback).

import { performance } from 'node:perf_hooks'

const BASE = process.env.TRACKBOARD_URL || 'http://localhost:3333'
const KEY = process.env.API_KEY || ''
const ORIGIN = process.env.ORIGIN || 'http://localhost:3000'

const args = new Map()
for (let i = 2; i < process.argv.length; i++) {
  const arg = process.argv[i]
  if (arg.startsWith('--')) {
    const [key, value] = arg.slice(2).split('=')
    args.set(key, value ?? 'true')
  }
}

const USERS = Number(args.get('users') || process.env.USERS || 50)
const DURATION = Number(args.get('duration') || process.env.DURATION || 30)

if (!KEY) {
  console.error('Missing API_KEY. Set it via env or pass --key=… (see header comment).')
  process.exit(1)
}

// 1x1 transparent PNG, base64 — keeps payloads small but still hits the
// screenshot-upload code path.
const SCREENSHOT =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII='

async function hit() {
  const started = performance.now()
  try {
    const res = await fetch(`${BASE}/api/public/reports?key=${KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Origin: ORIGIN },
      body: JSON.stringify({
        title: 'Load test report',
        reporterEmail: 'loadtest@example.com',
        screenshotUrl: SCREENSHOT,
        fieldValues: {},
      }),
    })
    return { ok: res.status < 400, ms: performance.now() - started, status: res.status }
  } catch (error) {
    return { ok: false, ms: performance.now() - started, status: 0, error: error.message }
  }
}

const endAt = Date.now() + DURATION * 1000
const latencies = []
let total = 0
let ok = 0
let errors = 0

console.log(`Load test: ${USERS} concurrent users for ${DURATION}s against ${BASE}`)

const workers = Array.from({ length: USERS }, async () => {
  while (Date.now() < endAt) {
    const result = await hit()
    total++
    if (result.ok) ok++
    else errors++
    latencies.push(result.ms)
  }
})

await Promise.all(workers)

latencies.sort((a, b) => a - b)
const p95 = latencies[Math.floor(latencies.length * 0.95)] ?? 0
const avg = latencies.reduce((sum, v) => sum + v, 0) / (latencies.length || 1)
const rps = total / DURATION

console.log('--- results ---')
console.log(`requests:     ${total}`)
console.log(`ok / errors:  ${ok} / ${errors}`)
console.log(`throughput:   ${rps.toFixed(1)} req/s`)
console.log(`avg latency:  ${avg.toFixed(1)} ms`)
console.log(`p95 latency:  ${p95.toFixed(1)} ms`)
