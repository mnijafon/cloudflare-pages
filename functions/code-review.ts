// eslint-disable-next-line import/prefer-default-export
export async function onRequest({ request }: { request: Request }) {
  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const url = 'https://my-mastra-app.liujifeng8106.workers.dev/code-review';
  const body = await request.text();

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  });

  return res;
}
