import { supabase } from './supabase';
import { Resource } from '../types';

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
