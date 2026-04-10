/**
 * Detects whether a URL points to a local video file
 */
export function isLocalVideo(url: string): boolean {
  return /\.(mp4|webm|mov|ogg)$/i.test(url);
}

/**
 * Detects whether a URL points to a local PDF file
 */
export function isLocalPdf(url: string): boolean {
  return /\.pdf$/i.test(url);
}

/**
 * Converts a Google Drive share/view link → embeddable preview URL.
 * Works for both videos and PDFs hosted on Drive.
 * Non-Drive URLs pass through unchanged.
 *
 * Examples:
 *   https://drive.google.com/file/d/FILE_ID/view?usp=sharing  →  .../FILE_ID/preview
 *   https://drive.google.com/file/d/FILE_ID/preview            →  unchanged
 */
export function toDriveEmbedUrl(url: string): string {
  const match = url.match(/\/file\/d\/([^/?#]+)/);
  if (match) return `https://drive.google.com/file/d/${match[1]}/preview`;
  return url;
}

/**
 * Returns the final embed/src URL for a video field.
 * - Local .mp4/.webm/.mov  → returned as-is (use with <video>)
 * - Google Drive share URL → converted to /preview embed
 * - YouTube / Vimeo / etc. → returned as-is (use with <iframe>)
 */
export function resolveVideoUrl(url: string): { src: string; isLocal: boolean } {
  if (isLocalVideo(url)) return { src: url, isLocal: true };
  return { src: toDriveEmbedUrl(url), isLocal: false };
}

/**
 * Returns the final src URL for a PDF field.
 * - Local .pdf  → returned as-is (browser PDF renderer via <iframe>)
 * - Google Drive → converted to /preview embed
 */
export function resolvePdfUrl(url: string): string {
  if (isLocalPdf(url)) return url;
  return toDriveEmbedUrl(url);
}
