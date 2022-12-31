// 示例方法，没有实际意义
export function trim(str: string) {
  return str.trim();
}

export function getUrlsWithDomain(
  domain?: string,
  m3u8String?: string,
): string[] {
  if (!m3u8String || !domain) return [];
  const urlList: string[] = [];
  m3u8String.split('\n').forEach((str) => {
    if (/^[^#]/.test(str)) {
      const urlArray = domain.split('/');
      urlArray.pop();
      const downUrl = urlArray.join('/') + `/${str}`;
      urlList.push(downUrl);
    }
  });
  return urlList;
}

export function getAESConfig(m3u8String?: string): {
  method: string;
  uri: string;
  iv: string;
} {
  let config = { method: '', uri: '', iv: '' };
  if (!m3u8String) return config;
  if (m3u8String.indexOf('#EXT-X-KEY') > -1) {
    const [method, uri, iv] = [
      (m3u8String.match(/(.*METHOD=([^,\s]+))/) || ['', '', ''])[2],
      (m3u8String.match(/(.*URI="([^"]+))"/) || ['', '', ''])[2],
      (m3u8String.match(/(.*IV=([^,\s]+))/) || ['', '', ''])[2],
    ];
    config = {
      method,
      uri: uri.replace('zhaowaedu.com', '39.106.9.148'),
      iv,
    };
  }
  return config;
}
