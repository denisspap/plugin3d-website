export type Project={id:string;title:string;label:string;category:'visual'|'process';date:string;image:string;alt:string;description:string;youtube?:boolean;short?:boolean};
export const socials={instagram:'https://www.instagram.com/plugin3d/',youtube:'https://www.youtube.com/@plugin3dstudio',patreon:'https://www.patreon.com/plugin3d',superhive:'https://superhivemarket.com/creators/plugin3d'};
const entries: [string,string,string,string,'visual'|'process',string,string][] = [
 ['DYZijdcP0Eu','Tree Man','3D animation','MAY 2026','visual','tree-man','A procedural tree character walks through a sunlit forest. Built with Geometry Nodes, with a walking setup and environment breakdown on Patreon.'],
 ['DXCUwpMjw0u','Head Splitting','Geometry Nodes','APR 2026','visual','79c0eaa4c98a0f34','A portrait pulled apart. A procedural head-splitting effect in Blender, with the setup and tutorial available on Patreon.'],
 ['DUtEjulj_pO','Coffee Beans','Simulation','FEB 2026','visual','2d20d4e0fce49c88','A close-up world of coffee beans in motion. Explore the Geometry Nodes simulation and related project files on Patreon.'],
 ['DcoIdSoNxIA','Bottle study','3D study','AUG 2026','visual','5a220bc3ed1f7088','An exploration featuring bottle imagery. Watch the original reel for the complete animation and project notes.'],
 ['DcoGteozSQ-','Pasta simulation','3D study','AUG 2026','visual','0910e4fbd11fa0ac','A material-focused exploration from the archive. View the original reel for the full piece.'],
 ['DcjXFksv5Is','Text in motion','Geometry Nodes','AUG 2026','process','b5fd6b535097233b','Inside a text-switching Geometry Nodes setup. Watch the process and explore related project files on Patreon.'],
 ['Dcd5n6jv89-','Depth of field','3D study','AUG 2026','visual','469090dfc6d5f0f2','A close-up visual study. Watch the original reel for the complete piece.'],
 ['DcbiXh8OpgN','Inside the node tree','Geometry Nodes','AUG 2026','process','92e62df9ae33cc7f','Behind the process of a text effect in Blender, shared through the original reel.'],
 ['DcY2RD5PrQn','Type in Geometry Nodes','Geometry Nodes','AUG 2026','process','b8e0918dbcd9b001','An experiment in procedural typography. Find the related text effect tutorial and project file on Patreon.'],
 ['DcRHYUGPQc0','Procedural type','3D study','AUG 2026','visual','51c4ef749523e2b9','A moving-image experiment from the archive. The original post contains the complete work and caption.'],
 ['DbDbHZ2vnm6','Automotive study','3D study','JUL 2026','visual','17522c2baeefc575','An exploration featuring automotive imagery. Watch the complete piece on Instagram.'],
 ['DbBLqatPKT5','Behind the composite','Process','JUL 2026','process','c6f0cf360d825452','A look at the nodes behind an image. View the original post for the full process.']
];

const instagramProjects:Project[]=entries.map(([id,title,label,date,category,file,description])=>({id,title,label,date,category,image:`/work/${file}.jpg`,alt:`${title} — original work by Plugin3d`,description}));
const filmEntries = [["ULbVW6nISNE", "Partycles", "Blender short", "0:11", "visual", "A short animation made almost entirely with Geometry Nodes."], ["MfLKLXkEmuc", "Terminator 2", "Blender recreation", "0:52", "visual", "A scene from Terminator 2, recreated in Blender."], ["1vDwMIGA5o0", "Coffee AD", "3D animation", "0:17", "visual", "A coffee animation made in Blender."], ["GzOWgjBgu9M", "EZdepth", "Tool walkthrough", "11:52", "process", "A walkthrough of turning images into 3D models with EZdepth."], ["BDTstTF7e9Y", "Chasm’s Call — The Lion King", "Community challenge", "0:58", "visual", "My final submission to the Chasm’s Call 3D community challenge."], ["tLdF5b-qFrw", "Adventure of a Lifetime", "3D music video remake", "1:41", "visual", "Made in Blender, with character animation from Mixamo and editing and compositing in DaVinci Resolve."], ["Wa4-xEk8340", "Fuel Issue", "Blender short film", "1:13", "visual", "A short film made in Blender."], ["orsyuwf7sEY", "Herbie Chitty Bang Bang", "1938-style film", "0:51", "visual", "A Herbie animation presented with an old-film look."], ["K_zIUSorHI0", "SpaceMan", "Short fan film", "1:05", "visual", "A short fan film made in Blender."], ["8FDXj70-kuE", "Eternal Ascent — WALL·E", "Breakdown", "1:31", "process", "A breakdown of my WALL·E entry for the Eternal Ascent community challenge."], ["huEpy-qti2I", "Me at the zoo", "3D animation", "0:19", "visual", "A 3D animation of Me at the zoo."], ["98J8cnGHujU", "I Won’t Back Down", "3D animation", "0:33", "visual", "A singing cow animation."], ["QBD0y7IDnHA", "Life of Pou", "Animated short", "1:43", "visual", "An animated short movie."], ["Qnb7S1ev6Ts", "I learnt 3D animation to make this", "Early animation", "0:20", "visual", "An early animation from the Studio archive."], ["izSif2Ue69o", "Endless Engines", "Community challenge", "0:06", "visual", "A train animation for the Endless Engines 3D community challenge."]];
const films:Project[]=filmEntries.map(([id,title,label,date,category,description])=>({id,title,label,date,category:category as "visual"|"process",description,youtube:true,image:`/work/${id}.jpg`,alt:`${title} — original film cover by Plugin3d`}));
const featuredOrder=["ULbVW6nISNE","DYZijdcP0Eu","DXCUwpMjw0u","1vDwMIGA5o0","DcoIdSoNxIA","izSif2Ue69o","orsyuwf7sEY","K_zIUSorHI0"];
export const projects:Project[]=[...films,...instagramProjects].sort((a,b)=>{const ai=featuredOrder.indexOf(a.id),bi=featuredOrder.indexOf(b.id);return(ai<0?999:ai)-(bi<0?999:bi)});
const shortEntries=[["D77GAvN6hWk", "You need to get this"], ["2n10SQ-r4JY", "Boost your Blender workflow"], ["9CqrVWfIONE", "How did I not discover this before"], ["BrpmBmv7GI0", "Why I never model without this"], ["g-YWYm6LCwE", "Turn your photos into realistic 3D models"], ["HHfsK224Tis", "Turn your photos into a 3D model"], ["0AX8Ouk9FxY", "Why I never model without this — depth maps"], ["lCtPfa_zTsU", "From image to 3D map — 01"], ["TmKGBwOHDfw", "From image to 3D map — 02"], ["FBWHiNcylsk", "Why I never model without this — 3D effects"], ["zvoGUzjHXdU", "From image to 3D map — 03"], ["loXGO5D_C18", "What is bro training for"], ["reYbjorcs_w", "Realistic Suzanne sculpt"], ["BE68ho3Jiqs", "Fuel Issue — short excerpt"], ["lEkawO5bzns", "Five add-ons for Blender 4.3"], ["SsCmAgfXj24", "They don’t love you like I love you"], ["vtn7DeZk5M8", "Cloth — one million subdivisions"], ["uFUiqMfa6yw", "Cloth subdivisions"], ["1mOO3OmbadU", "Shrek 5 is coming"], ["8MED9DJkYxY", "Geometry Nodes animation test"], ["-vNSbgzqGlM", "Star pieces"], ["zVlDyA1ZbZw", "Eternal Ascent — progress"], ["jjPFY0Vje-o", "Eternal Ascent — WALL·E"]];
export const shorts:Project[]=shortEntries.map(([id,title])=>({id,title,label:"Short",category:"process",date:"",image:"",alt:title,description:"From the Plugin3d Studio Shorts archive.",youtube:true,short:true}));
export const archive=[
  {
    "title": "PointFocus+",
    "url": "https://superhivemarket.com/products/pointfocus",
    "source": "Superhive"
  },
  {
    "title": "ProxyBody",
    "url": "https://superhivemarket.com/products/proxybody",
    "source": "Superhive"
  },
  {
    "title": "EZDecal",
    "url": "https://superhivemarket.com/products/ezdecal",
    "source": "Superhive"
  },
  {
    "title": "EZ Tools Bundle",
    "url": "https://superhivemarket.com/products/ez-tools-ultimate-blender-bundle",
    "source": "Superhive"
  },
  {
    "title": "HDRI Environment Builder",
    "url": "https://superhivemarket.com/products/hdri-environment-builder",
    "source": "Superhive"
  },
  {
    "title": "Real Camera — Cinematic Lens Simulator",
    "url": "https://superhivemarket.com/products/real-camera--cinematic-lens-simulator",
    "source": "Superhive"
  },
  {
    "title": "Car in Space",
    "url": "https://superhivemarket.com/products/car-in-space--blender-preset--auto-placement-add-on",
    "source": "Superhive"
  },
  {
    "title": "EZtexture",
    "url": "https://superhivemarket.com/products/eztexture--ai-depth--normal-map-generator",
    "source": "Superhive"
  },
  {
    "title": "Realistic Ape",
    "url": "https://superhivemarket.com/products/realistic-ape--rigged-3d-character-for-blender",
    "source": "Superhive"
  },
  {
    "title": "Classic VW Beetle",
    "url": "https://superhivemarket.com/products/classic-vw-beetle-3d-model--high-quality-game--render-ready",
    "source": "Superhive"
  },
  {
    "title": "Shortcut Finder",
    "url": "https://superhivemarket.com/products/shortcut-finder",
    "source": "Superhive"
  },
  {
    "title": "Quick Tutorials",
    "url": "https://superhivemarket.com/products/quick-tutorials",
    "source": "Superhive"
  },
  {
    "title": "Auto Save",
    "url": "https://superhivemarket.com/products/projectautosave",
    "source": "Superhive"
  },
  {
    "title": "EZnormal",
    "url": "https://superhivemarket.com/products/eznormal--ai-powered-normal-map-generator-for-blender",
    "source": "Superhive"
  },
  {
    "title": "EZdepth",
    "url": "https://superhivemarket.com/products/ezdepth--ai-depth-map-generator-for-blender",
    "source": "Superhive"
  },
  {
    "title": "Portuguese Vintage Trolley",
    "url": "https://superhivemarket.com/products/portuguese-vintage-trolley--portolisbon-style-3d-model",
    "source": "Superhive"
  },
  {
    "url": "https://www.patreon.com/PlugIn3D/posts/text-effect-file-167470605",
    "title": "Text Effect Project file 1",
    "source": "Patreon"
  },
  {
    "url": "https://www.patreon.com/PlugIn3D/posts/text-effect-in-1-167470462",
    "title": "Text Effect Tutorial in Geometry Nodes 1",
    "source": "Patreon"
  },
  {
    "url": "https://www.patreon.com/PlugIn3D/posts/fighter-jet-drop-161534535",
    "title": "Fighter Jet Drop Trails Geo Node Setup",
    "source": "Patreon"
  },
  {
    "url": "https://www.patreon.com/PlugIn3D/posts/fighter-jet-geo-161534273",
    "title": "Fighter Jet Animation Tutorial (Water Drops trails Geo Nodes)",
    "source": "Patreon"
  },
  {
    "url": "https://www.patreon.com/PlugIn3D/posts/look-on-how-i-in-159567319",
    "title": "Look on how I made the Environment in Geo Nodes for the treeman Animation",
    "source": "Patreon"
  },
  {
    "url": "https://www.patreon.com/PlugIn3D/posts/treeman-from-158604585",
    "title": "TreeMan from LOTR geometry nodes tutorial",
    "source": "Patreon"
  },
  {
    "url": "https://www.patreon.com/PlugIn3D/posts/procedural-lotr-158416158",
    "title": "Procedural LOTR Tree man Geo Nodes Setup with walking animation",
    "source": "Patreon"
  },
  {
    "url": "https://www.patreon.com/PlugIn3D/posts/head-splitting-155617877",
    "title": "Head Splitting Effect Geo Node Setup",
    "source": "Patreon"
  },
  {
    "url": "https://www.patreon.com/PlugIn3D/posts/head-splitting-155617782",
    "title": "Head Splitting Geo Nodes Effect Tutorial",
    "source": "Patreon"
  },
  {
    "url": "https://www.patreon.com/PlugIn3D/posts/head-through-geo-155503335",
    "title": "Head through bars Geo nodes tutorial - Update",
    "source": "Patreon"
  },
  {
    "url": "https://www.patreon.com/PlugIn3D/posts/head-through-geo-155502920",
    "title": "Head through Bars Geo Node effect - Update",
    "source": "Patreon"
  },
  {
    "url": "https://www.patreon.com/PlugIn3D/posts/ring-particle-155035269",
    "title": "Ring Particle effect Tutorial",
    "source": "Patreon"
  },
  {
    "url": "https://www.patreon.com/PlugIn3D/posts/coffee-bean-in-151559804",
    "title": "Coffee Bean Exploding Effect in Geo Nodes",
    "source": "Patreon"
  },
  {
    "url": "https://www.patreon.com/PlugIn3D/posts/coffee-bean-geo-151250071",
    "title": "Coffee Bean Geo Node Simulation",
    "source": "Patreon"
  },
  {
    "url": "https://www.patreon.com/PlugIn3D/posts/snow-stepping-on-150135196",
    "title": "Snow Stepping on Snow Geo Nodes effect",
    "source": "Patreon"
  },
  {
    "url": "https://www.patreon.com/PlugIn3D/posts/camera-autofocus-149929516",
    "title": "Camera Autofocus - Geo Node Setup",
    "source": "Patreon"
  },
  {
    "url": "https://www.patreon.com/PlugIn3D/posts/watch-assembling-148958534",
    "title": "Watch Assembling w/ Geometry Nodes",
    "source": "Patreon"
  },
  {
    "url": "https://www.patreon.com/PlugIn3D/posts/portrait-cloth-147739851",
    "title": "Portrait Cloth effect Blender File",
    "source": "Patreon"
  },
  {
    "url": "https://www.patreon.com/PlugIn3D/posts/ring-particle-147590159",
    "title": "Ring Particle effect",
    "source": "Patreon"
  },
  {
    "url": "https://www.patreon.com/PlugIn3D/posts/eztools-addon-144849017",
    "title": "EZtools - Addon Bundle",
    "source": "Patreon"
  },
  {
    "url": "https://www.patreon.com/PlugIn3D/posts/multi-add-node-144848857",
    "title": "Multi Add - Geometry Node",
    "source": "Patreon"
  },
  {
    "url": "https://www.patreon.com/PlugIn3D/posts/zipper-looping-144846539",
    "title": "Zipper Looping - Geo Nodes File",
    "source": "Patreon"
  },
  {
    "url": "https://www.patreon.com/PlugIn3D/posts/tree-growing-in-144846427",
    "title": "Tree Growing Effect in Geo Nodes",
    "source": "Patreon"
  },
  {
    "url": "https://www.patreon.com/PlugIn3D/posts/procedural-geo-144846197",
    "title": "Procedural Starfish - Geo Node File",
    "source": "Patreon"
  },
  {
    "url": "https://www.patreon.com/PlugIn3D/posts/spike-ice-geo-144845221",
    "title": "Spike Ice Geo Node File",
    "source": "Patreon"
  },
  {
    "url": "https://www.patreon.com/PlugIn3D/posts/procedural-ring-144841761",
    "title": "Procedural Ring - Geo Node File w/tutorial",
    "source": "Patreon"
  },
  {
    "url": "https://www.patreon.com/PlugIn3D/posts/paper-burn-in-w-144841062",
    "title": "Paper Burn in Geo Nodes - w/tutorial",
    "source": "Patreon"
  },
  {
    "url": "https://www.patreon.com/PlugIn3D/posts/bee-hive-in-geo-144840746",
    "title": "Bee Hive in Geo Nodes Project File w/tutorial",
    "source": "Patreon"
  },
  {
    "url": "https://www.patreon.com/PlugIn3D/posts/procedural-house-144840626",
    "title": "Procedural Halloween House - Geo nodes w/tutorial",
    "source": "Patreon"
  },
  {
    "url": "https://www.patreon.com/PlugIn3D/posts/gummy-simulation-144840525",
    "title": "Gummy Simulation - Geo Nodes project file w/tutorial",
    "source": "Patreon"
  },
  {
    "url": "https://www.patreon.com/PlugIn3D/posts/blender-donut-in-144840040",
    "title": "Blender Donut in Geo Nodes",
    "source": "Patreon"
  },
  {
    "url": "https://www.patreon.com/PlugIn3D/posts/bouquet-geo-file-144839937",
    "title": "Bouquet - Geo Nodes File",
    "source": "Patreon"
  },
  {
    "url": "https://www.patreon.com/PlugIn3D/posts/audience-count-w-144839753",
    "title": "Audience Count - Geo Nodes file w/tutorial",
    "source": "Patreon"
  }
];
