const fetch = (...args) => import('node-fetch').then(({ default: f }) => f(...args));

const base = process.argv[2] || 'https://mentor-guru.netlify.app';
const url = new URL('/api/auth/status', base).toString();

(async function () {
  try {
    console.log(`Checking auth status at ${url}`);
    const res = await fetch(url);
    const body = await res.text();
    console.log('Status:', res.status, res.statusText);
    console.log('Body:', body);
    if (!res.ok) process.exitCode = 2;
  } catch (err) {
    console.error('Error fetching status:', err);
    process.exitCode = 1;
  }
})();