import { PathwayId, VideoResult } from '../types';

const QUERIES: Record<PathwayId, string> = {
  tech: 'women in tech career advice',
  business: 'young women entrepreneur inspiration',
  creative: 'creative career advice women',
  health: 'women in science career',
  social: 'social impact career advice young women',
};

export async function fetchVideos(pathway: PathwayId): Promise<VideoResult[]> {
  const key = import.meta.env.VITE_YOUTUBE_API_KEY as string | undefined;
  if (!key || key.includes('placeholder')) return [];

  const query = encodeURIComponent(QUERIES[pathway]);
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=6&key=${key}`;

  try {
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    if (!data.items?.length) return [];

    return data.items.map((item: any) => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      channelTitle: item.snippet.channelTitle,
      thumbnail:
        item.snippet.thumbnails?.high?.url ??
        item.snippet.thumbnails?.medium?.url ??
        item.snippet.thumbnails?.default?.url ??
        '',
    }));
  } catch {
    return [];
  }
}
