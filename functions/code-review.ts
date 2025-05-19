// eslint-disable-next-line import/prefer-default-export
export async function onRequestPost({ request }: { request: Request }) {
  const url = 'https://my-mastra-app.liujifeng8106.workers.dev/code-review';
  const body = await request.text();

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  });

  return res;
}
