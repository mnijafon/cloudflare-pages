export default async function onRequest(context: { request: Request }): Promise<Response> {
  const { request } = context;

  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  const url = 'https://my-mastra-app.liujifeng8106.workers.dev/code-review';
  const body = await request.text();

  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  });
}
