# TASK: Integrate background audio system

## AUDIO URLS (Supabase Storage)

- OGG: https://bhmcnobbizqsdplxambv.supabase.co/storage/v1/object/public/n0kemm_bucket/openingogg.ogg
- MP3: https://bhmcnobbizqsdplxambv.supabase.co/storage/v1/object/public/n0kemm_bucket/openingmp3.mp3

## RULES

- Mobile first
- NO autoplay — audio starts ONLY on envelope click
- If audio fails, app works normally, no visible errors
- Audio must not cause lag on existing GSAP animations

## IMPLEMENTATION

### 1. AudioManager singleton (src/utils/)

- Lazy init (only on first click)
- OGG primary, MP3 fallback
- Silent preload after 3s on apertura screen
- Methods: play(), fadeTo(volume, duration), toggleMute()
- Emit global events for cross-component communication
- Release resources when song ends
- No loop — plays once (3 min)

### 2. Trigger in Apertura component

- Call AudioManager.play() as the VERY FIRST line in the envelope click handler
- Starts at 0% volume, fades to 70% over 1.5s

### 3. Volume curve via ScrollTrigger

Add a unique ID to each section. On section enter:

- Hero: 35% (2s fade)
- Dedicatoria: 20% (1.5s fade)
- InvitacionFormal: 20% (no change)
- RSVP: 15% (1s fade)
- Cierre: 0% (8s slow fade)

### 4. AudioButton component (src/components/shared/)

- Hidden until audio starts (listens to AudioManager event)
- Appears with fade-in when audio starts
- Position: fixed, bottom-right corner
- Min 44x44px tap target
- Toggles mute/unmute, icon changes accordingly
- Disappears with fade-out when song ends
- Style: dark wine translucent bg, backdrop blur, gold border, circular

### 5. App.jsx

- Add AudioButton globally alongside RosePetals
- Set up ScrollTrigger volume changes

## DELIVERABLES

1. src/utils/AudioManager.js
2. src/components/shared/AudioButton.jsx
3. Apertura.jsx — add audio trigger
4. App.jsx — ScrollTriggers + AudioButton
5. Section IDs added to DOM
6. AudioButton styles in index.css

## DO NOT

- ❌ No autoplay
- ❌ No loop
- ❌ No visible errors to user
- ❌ Don't touch existing animations or RosePetals
