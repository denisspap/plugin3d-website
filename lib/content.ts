export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
export const asset = (path: string) => `${basePath}${path}`;
export const socialLinks = [
  { name: 'Instagram', url: 'https://www.instagram.com/plugin3d/' },
  { name: 'YouTube', url: 'https://www.youtube.com/@plugin3dstudio' },
  { name: 'X', url: 'https://x.com/plugin3d' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/dinis-pereira-92856a331/' },
  { name: 'Patreon', url: 'https://www.patreon.com/PlugIn3D' },
  { name: 'Superhive', url: 'https://superhivemarket.com/creators/dinisaddons' },
];
export const patreon = 'https://www.patreon.com/PlugIn3D';
export type Film = { slug: string; title: string; category: string; summary: string; description: string; file: string; count: number; focus?: string; link?: string; linkLabel?: string };
export const projectVideos: Record<string, { provider: 'youtube' | 'instagram'; id: string }> = {
  'adventure-of-a-lifetime': { provider: 'youtube', id: 'tLdF5b-qFrw' },
  'terminator': { provider: 'youtube', id: 'MfLKLXkEmuc' },
  'coffee': { provider: 'youtube', id: '1vDwMIGA5o0' },
  'ring': { provider: 'youtube', id: 'ULbVW6nISNE' },
  'tree-man': { provider: 'instagram', id: 'DYZijdcP0Eu' },
};
export const films: Film[] = [
  { slug: 'tree-man', title: 'Tree Man', category: 'Character & environment', summary: 'A forest brought to life. Created in Blender.', description: 'A walking tree character inspired by The Lord of the Rings, created with Geometry Nodes in Blender. The character setup and environment tutorial are available on Patreon.', file: 'treeman', count: 3, focus: '50% 45%', link: 'https://www.patreon.com/PlugIn3D/posts/treeman-from-158604585', linkLabel: 'Explore the process' },
  { slug: 'adventure-of-a-lifetime', title: 'Adventure of a Lifetime', category: 'Music video recreation', summary: 'A world of rhythm, movement, and imagination.', description: 'A 3D recreation of Coldplay’s Adventure of a Lifetime, created in Blender with animation from Mixamo and editing and compositing in DaVinci Resolve.', file: 'adventureofalifetime', count: 3, link: 'https://www.youtube.com/watch?v=tLdF5b-qFrw', linkLabel: 'Watch the film' },
  { slug: 'terminator', title: 'Terminator', category: 'Cinematic recreation', summary: 'An iconic sci-fi world, reimagined in Blender.', description: 'A recreation of a scene from Terminator 2, made in Blender.', file: 'terminator', count: 5, link: 'https://www.youtube.com/watch?v=MfLKLXkEmuc', linkLabel: 'Watch the film' },
  { slug: 'fighter-jet', title: 'Fighter Jet', category: 'Animation & simulation', summary: 'Speed, atmosphere, and procedural trails.', description: 'A fighter jet animation with procedural water-drop trails created in Geometry Nodes. The setup and tutorial are available on Patreon.', file: 'figtherjet', count: 2, link: 'https://www.patreon.com/PlugIn3D/posts/fighter-jet-geo-161534273', linkLabel: 'Explore the process' },
  { slug: 'coffee', title: 'Coffee', category: 'Product animation', summary: 'A closer look at an everyday ritual.', description: 'A coffee product animation made in Blender.', file: 'coffee', count: 2, link: 'https://www.youtube.com/watch?v=1vDwMIGA5o0', linkLabel: 'Watch the film' },
  { slug: 'ring', title: 'Ring', category: 'Procedural exploration', summary: 'Small details. A different kind of presence.', description: 'Partycles, a Blender short made almost entirely with Geometry Nodes.', file: 'ring', count: 2, link: 'https://www.patreon.com/PlugIn3D/posts/ring-particle-155035269', linkLabel: 'Explore the process' },
  { slug: 'sunset', title: 'Sunset', category: 'Atmosphere study', summary: 'The quiet weight of the last light.', description: 'A study of a city skyline at sunset.', file: 'sunset', count: 2 },
];
export const projectImage = (film: Film, frame = 1, small = false) => asset(`/projects/${film.file}-${frame}${small ? '-small' : ''}.webp`);
export const frames = films.flatMap(film => Array.from({ length: film.count }, (_, i) => ({ film, frame: i + 1 })));
export const products = [
  { name: 'PointFocus+', id: 'pointfocus', type: 'FOCUS & COMPOSITING', summary: 'Put the focus exactly where you want it.', description: 'Create depth of field with multiple focus points in Blender’s compositor. Use distances or scene objects as targets, animate focus, and fine-tune your F-Stop without rebuilding your node setup.', features: ['Multiple focus targets', 'Object-driven animation', 'Compositor integration'], url: 'https://superhivemarket.com/products/pointfocus' },
  { name: 'ProxyBody', id: 'proxybody', type: 'PHYSICS & SIMULATION', summary: 'Less geometry. More room to experiment.', description: 'Generate lightweight proxy meshes for rigid body simulations. Arrange objects with the Array Placer or scatter them over a surface, then work with faster playback and simpler simulation controls.', features: ['Optimized proxy meshes', 'Array & surface placement', 'Rigid body workflow'], url: 'https://superhivemarket.com/products/proxybody' },
  { name: 'EZdepth', id: 'ezdepth', type: 'DEPTH & DISPLACEMENT', summary: 'Give a flat image a new dimension.', description: 'Generate AI depth maps from images and apply them as geometry displacement, a Cycles shader setup, or a standalone grayscale image. Includes subdivision controls and bump detail from the original image.', features: ['Image-to-depth generation', 'Modifier & shader workflows', 'Windows · Blender'], url: 'https://superhivemarket.com/products/ezdepth--ai-depth-map-generator-for-blender' },
];
