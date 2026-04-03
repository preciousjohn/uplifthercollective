import { PathwayId, CourseResult } from '../types';

const QUERIES: Record<PathwayId, string> = {
  tech: 'computer science beginner',
  business: 'entrepreneurship',
  creative: 'graphic design',
  health: 'public health',
  social: 'social entrepreneurship',
};

export async function fetchCourses(pathway: PathwayId): Promise<CourseResult[]> {
  const query = encodeURIComponent(QUERIES[pathway]);
  const url = `https://api.coursera.org/api/courses.v1?q=search&query=${query}&fields=name,slug,photoUrl,description&limit=6`;

  try {
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    if (!data.elements?.length) return [];

    return data.elements.map((c: any) => ({
      id: c.id,
      name: c.name ?? '',
      slug: c.slug ?? '',
      description: c.description ?? '',
      photoUrl: c.photoUrl ?? '',
    }));
  } catch {
    return [];
  }
}
