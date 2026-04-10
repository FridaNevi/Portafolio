export function isLocalVideo(url: string): boolean {
  return /\.(mp4|webm|mov|ogg)$/i.test(url);
}

export function isLocalPdf(url: string): boolean {
  return /\.pdf$/i.test(url);
}

export function toDriveEmbedUrl(url: string): string {
  const match = url.match(/\/file\/d\/([^/?#]+)/);
  if (match) return `https://drive.google.com/file/d/${match[1]}/preview`;
  return url;
}

export function resolveVideoUrl(url: string): { src: string; isLocal: boolean } {
  if (isLocalVideo(url)) return { src: url, isLocal: true };
  return { src: toDriveEmbedUrl(url), isLocal: false };
}

export function resolvePdfUrl(url: string): string {
  if (isLocalPdf(url)) return url;
  return toDriveEmbedUrl(url);
}
