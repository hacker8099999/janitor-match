export type Character = {
  id: string;
  slug: string;
  name: string;
  summary: string;
  description: string;
  greeting: string;
  personality: string;
  avatarUrl?: string;
  tags: string[];
  archetype: string;
  tone: string;
  relationshipStyle: string;
  rating: number;
  popularity: number;
  isNsfw: boolean;
};
