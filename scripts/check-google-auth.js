/*
Simple script to check NextAuth providers endpoint for Google provider and signin URL.
Usage: node scripts/check-google-auth.js [BASE_URL]
Defaults to https://mentor-guru.netlify.app
*/

const fetch = (...args) => import('node-fetch').then(({ default: f }) => f(...args));

const base = process.argv[2] || 'https://mentor-guru.netlify.app';
const url = new URL('/api/auth/providers', base).toString();

(async function () {
  try {
    console.log(`Checking providers at ${url}`);
    const res = await fetch(url, { redirect: 'follow' });
    if (!res.ok) {
      const body = await res.text();
      console.error(`Request failed: ${res.status} ${res.statusText}`);
      console.error('Response body:', body);
      process.exitCode = 2;
      return;
    }
    const providers = await res.json();
    if (!providers || typeof providers !== 'object') {
      console.error('Invalid providers response:', providers);
      process.exitCode = 2;
      return;
    }

    if (providers.google) {
      console.log('✅ Google provider found.');
      const info = providers.google;
      console.log('Provider info:', JSON.stringify(info, null, 2));
      if (info.signinUrl && info.signinUrl.includes('/api/auth/signin/google')) {
        console.log('✅ Signin URL looks correct:', info.signinUrl);
        process.exitCode = 0;
      } else {
        console.warn('⚠ Signin URL missing or unexpected:', info.signinUrl);
        process.exitCode = 3;
      }
    } else {
      console.error('❌ Google provider not found in providers list:', Object.keys(providers));
      process.exitCode = 4;
    }
  } catch (err) {
    console.error('❌ Error checking providers:', err);
    process.exitCode = 1;
  }
})();