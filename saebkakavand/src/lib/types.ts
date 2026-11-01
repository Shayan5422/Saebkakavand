export type Release = {
  id: string; title: string; subtitle: string; kind: 'album' | 'single';
  image: string; year: string; description: string; url: string;
  audio: string; published: boolean;
};
export type Photo = { id: string; title: string; image: string; published: boolean };
export type Post = { id: string; title: string; slug: string; category: string; excerpt: string; body: string; image: string; date: string; published: boolean };
export type Settings = {
  name: string; latinName: string; tagline: string; heroText: string; heroImage: string;
  bio: string; bioImage: string; email: string; instagram: string; beeptunes: string;
};
export type Content = { revision: number; settings: Settings; releases: Release[]; photos: Photo[]; posts: Post[] };
