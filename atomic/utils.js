export function randomId(size = 6) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < size; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export async function customFetch(url) {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  return res.json();
}

export function injectScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.defer = true;
    script.async = true;
    script.src = src;
    script.addEventListener('load', resolve);
    script.addEventListener('error', (e) => reject(e.error));
    document.head.appendChild(script);
  });
}
