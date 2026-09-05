# Vice City Chronicles

Create a **PREMIUM cinematic GTA VI fan page as a SINGLE React + TypeScript page** that can be copied directly into an existing **Tauri + React** app.

### RULES

* React + TypeScript only.

* Do NOT create a new project, Next.js, backend, auth, database, config files, or modify `package.json`.

* Assume **GSAP** is already installed; GSAP is the only dependency allowed.

* Use explicit imports and production-quality code.

* Keep components reusable but easy to copy.

* Use only local assets.

* Do not use fake packages/components.

### DESIGN

Create an original **AAA game promotional experience** inspired by the cinematic quality of Rockstar/GTA promotional sites, but **do not clone the design pixel-for-pixel**.

Style:

* dark / black

* cinematic

* huge editorial typography

* dramatic spacing

* high contrast

* subtle warm tones

* film grain

* minimal UI

* full-screen imagery

* premium transitions

* no SaaS/dashboard styling

* avoid excessive cards, gradients, rounded corners

Use:

* GSAP

* ScrollTrigger

* smooth scrolling

* pinned sections

* parallax

* staggered reveals

* text/image reveals

* scale / opacity / blur transitions

* cinematic section transitions

### CRITICAL: SCROLL-CONTROLLED VIDEOS

I already have these exact local videos:

`/videos/scroole 1.mp4`

`/videos/scroole 2.mp4`

Do NOT replace them with remote videos.

They must **NOT autoplay normally**. Their `currentTime` must be controlled by scroll progress:

`0% scroll → 0% video`

`25% → 25%`

`50% → 50%`

`75% → 75%`

`100% → 100%`

Scrolling down moves the video forward; scrolling up moves it backward.

Implement with **GSAP ScrollTrigger + pinned section**.

Requirements:

* wait for `loadedmetadata` before reading `duration`

* use `video.currentTime = progress * duration`

* no video controls

* no continuous autoplay

* video stays visually locked to viewport while pinned

* make seeking smooth/performance-conscious

* handle loading state

* responsive/mobile-friendly implementation

### PAGE STRUCTURE

#### 1. VIDEO 1 / HERO

Full-screen cinematic section using:

`/videos/scroole 1.mp4`

* 100vh visual

* object-fit: cover

* pinned

* dark cinematic overlay

* minimal GTA VI typography

* subtle text movement/fade

* slight scale/parallax

* video is the main focus

#### 2. CINEMATIC TRANSITION

Transition from Video 1 into the story section using:

* fade

* scale

* blur

* image reveal

* typography reveal

Avoid generic web transitions.

#### 3. GTA VI STORY / INFORMATION

Present verified facts cinematically, not as a table.

Facts:

* Developed by Rockstar Games.

* Set in Leonida, including modern-day Vice City.

* Main protagonists: **Jason Duval** and **Lucia Caminos**.

* Jason has an Army background and later works with local drug runners in the Keys.

* Lucia was recently released from Leonida Penitentiary and wants to change her circumstances.

* Jason and Lucia become partners and are drawn into a criminal conspiracy across Leonida.

* Release date: **November 19, 2026**.

* Platforms: **PlayStation 5, Xbox Series X|S**.

Use editorial storytelling layouts and animated information blocks.

#### 4. CHARACTERS

Feature:

**JASON DUVAL**

**LUCIA CAMINOS**

Each gets:

* large cinematic image/placeholder

* name

* short verified description

* reveal animation

* parallax

* hover interaction

Do not invent additional character facts.

#### 5. LEONIDA / VICE CITY

Create a huge cinematic world section.

Headline:

**ONLY IN LEONIDA**

Include:

**Vice City, USA.**

Explain that GTA VI returns to modern-day Vice City and expands into the wider state of Leonida.

Use:

* large visual composition

* parallax

* floating typography

* image movement

* grain

* atmospheric overlays

#### 6. VIDEO 2

Create a second pinned scroll-controlled cinematic section using:

`/videos/scroole 2.mp4`

Use the **same scroll → currentTime principle** as Video 1.

Scrolling down = forward.

Scrolling up = backward.

Make the visual treatment and typography different from Video 1 so it feels like progression.

#### 7. ARTWORK GALLERY

Create a premium asymmetric gallery using **local image placeholders** that are easy to replace.

Use:

* large featured artwork

* smaller floating images

* staggered positioning

* horizontal movement

* parallax

* staggered reveals

* hover zoom

* subtle rotation

Avoid a generic uniform grid.

#### 8. FINAL

Powerful cinematic ending.

Large typography:

**GRAND**

**THEFT**

**AUTO VI**

Then:

**COMING**

**NOVEMBER 19**

**2026**

Add a subtle final scroll-triggered animation.

### RESPONSIVE

Desktop is the priority, but support:

* 1920px

* 1440px

* laptops

* tablets

* mobile

Adapt video scrubbing for mobile performance while preserving the cinematic feel.

### CODE QUALITY

Return complete production-ready React + TypeScript code.

Prefer a structure such as:

`GTAVIPage.tsx`

`ScrollVideoSection.tsx`

`GTAVIStory.tsx`

`CharactersSection.tsx`

`LeonidaSection.tsx`

`ArtworkGallery.tsx`

`GTAVIFinal.tsx`

All components must be fully implemented and imports must be explicit.

**The scroll-controlled videos are the centerpiece. Prioritize cinematic scroll physics, typography, visual hierarchy, transitions and animation quality over generic landing-page UI.**

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://gta-vi-cinematic-page.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/dee4a655-8dad-4181-bc01-1648ee828b9f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
