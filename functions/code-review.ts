// code-review.ts
export default function onRequest(context: { request: Request }): Promise<Response> {
  const { request } = context;

  if (request.method !== 'POST') {
    return Promise.resolve(new Response('Method Not Allowed', { status: 405 }));
  }

  const url = 'https://my-mastra-app.liujifeng8106.workers.dev/code-review';

  return request.text().then((body) => fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  }));
}
