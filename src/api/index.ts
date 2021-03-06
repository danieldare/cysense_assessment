const BASE_URL = 'https://api-football-standings.azharimm.site';

interface HttpResponse<T> extends Response {
  data?: T;
}

export async function Http<T>(url: RequestInfo, config: RequestInit): Promise<HttpResponse<T>> {
  const customConfig = {
    ...config,

    headers: new Headers({ 'Content-type': 'application/json' }),
    body: JSON.stringify(config.body) as unknown as ReadableStream<Uint8Array>,
  };

  return window.fetch(`${BASE_URL}${url}`, customConfig).then(async (response) => {
    const data: HttpResponse<T> = await response.json();
    if (response.ok) return Promise.resolve(data);
    else return Promise.reject({ message: 'an error occured' });
  });
}

export default Http;
