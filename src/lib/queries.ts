import { supabase } from './supabase';
import { Resource, PathwayId } from '../types';

export async function fetchAllResources(): Promise<Resource[]> {
  const { data, error } = await supabase
    .from('resources')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) throw error;
  return (data ?? []) as Resource[];
}

export async function fetchResourcesByIds(ids: string[]): Promise<Resource[]> {
  if (ids.length === 0) return [];
  const { data, error } = await supabase
    .from('resources')
    .select('*')
    .in('id', ids);

  if (error) throw error;
  return (data ?? []) as Resource[];
}

export async function saveSignup(data: {
  firstName: string;
  lastName: string;
  email: string;
  topPathway?: string;
}): Promise<void> {
  await supabase.from('signups').insert({
    first_name:  data.firstName,
    last_name:   data.lastName,
    email:       data.email,
    top_pathway: data.topPathway ?? null,
  });
  // Silently ignore errors — don't block the user if this fails
}

export async function fetchResourcesByPathways(pathways: PathwayId[]): Promise<Resource[]> {
  if (pathways.length === 0) return [];
  const { data, error } = await supabase
    .from('resources')
    .select('*')
    .in('pathway', pathways)
    .limit(9);

  if (error) throw error;
  return (data ?? []) as Resource[];
}
