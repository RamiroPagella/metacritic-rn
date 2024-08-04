export interface Game {
  id: string;
  title: string;
  slug: string;
  description: string;
  score: number;
  release_date: string;
  image: string;
  likes: string[];
}