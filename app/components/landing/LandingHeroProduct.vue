<script setup lang="ts">
// Hero stage — video preview wrapped in browser chrome.
// Pass `src` + optional `poster` to show a real video; otherwise the
// component renders a stylish placeholder with a big play button.
const copy = useLandingCopy()

const props = withDefaults(defineProps<{
  src?: string
  poster?: string
  duration?: string
}>(), {
  src: '',
  poster: '',
  duration: '2:34'
})

const isPlaying = ref(false)
const isMuted = ref(true)
const videoRef = ref<HTMLVideoElement | null>(null)

async function play() {
  if (!props.src) return
  isPlaying.value = true
  await nextTick()
  try { await videoRef.value?.play() } catch { /* autoplay may fail — user can click native control */ }
}

function toggleMute() {
  if (!videoRef.value) return
  isMuted.value = !isMuted.value
  videoRef.value.muted = isMuted.value
}

// Small list of "chapters" shown in the bottom toolbar as a scrubbing tease
const chapters = ['Calendar', 'Point of sale', 'Clients', 'Inventory', 'ZATCA']
</script>

<template>
  <div class="relative rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-white dark:bg-[#0a0a0a] shadow-2xl shadow-secondary-500/10 dark:shadow-black/50 ring-1 ring-black/5 dark:ring-white/10">

    <!-- Browser chrome -->
    <div class="h-10 bg-gradient-to-b from-gray-50 to-white dark:from-white/[0.06] dark:to-white/[0.03] border-b border-black/5 dark:border-white/10 flex items-center px-4 gap-3">
      <div class="flex gap-1.5 shrink-0">
        <div class="size-2.5 rounded-full bg-red-400/80" />
        <div class="size-2.5 rounded-full bg-amber-400/80" />
        <div class="size-2.5 rounded-full bg-emerald-400/80" />
      </div>
      <div class="mx-auto flex items-center gap-1.5 px-3 h-6 rounded-full bg-black/5 dark:bg-white/5 text-[11px] text-gray-500 dark:text-gray-400">
        <UIcon name="i-lucide-lock" class="size-3 text-emerald-500" />
        {{ copy.hero.chromeUrl }}
      </div>
      <div class="hidden sm:inline-flex items-center gap-1.5 shrink-0 text-[10px] uppercase tracking-[0.2em] text-rose-500 font-bold">
        <span class="size-1.5 rounded-full bg-rose-500 animate-pulse" />
        {{ copy.ui.liveDemo }}
      </div>
    </div>

    <!-- ═══ Video stage ═══ -->
    <div class="relative aspect-video bg-primary overflow-hidden">
      <!-- Dark poster: layered ambient light (no dashboard mock) -->
      <div aria-hidden="true" class="absolute inset-0 bg-gradient-to-br from-primary via-primary-500 to-primary" />
      <div aria-hidden="true" class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.6)_80%)]" />
      <div aria-hidden="true" class="absolute -top-20 start-1/4 w-[28rem] h-[28rem] rounded-full bg-secondary-500 blur-[140px] opacity-50" />
      <div aria-hidden="true" class="absolute -bottom-24 end-1/4 w-[28rem] h-[28rem] rounded-full bg-sky-500 blur-[140px] opacity-30" />
      <div aria-hidden="true" class="absolute inset-0 opacity-[0.06] mix-blend-overlay" style="background-image:url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22120%22 height=%22120%22><filter id=%22n%22><feTurbulence baseFrequency=%220.8%22 /></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>')" />
      <div aria-hidden="true" class="absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,transparent_40%,black_75%)]"
        style="background-image: linear-gradient(to right, rgb(255 255 255 / 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 0.05) 1px, transparent 1px); background-size: 60px 60px;"
      />

      <!-- Optional poster image -->
      <img v-if="poster && !isPlaying" :src="poster" alt="" class="absolute inset-0 w-full h-full object-cover opacity-80" />

      <!-- Video element (appears once playing) -->
      <video
        v-if="src && isPlaying"
        ref="videoRef"
        :src="src"
        :muted="isMuted"
        autoplay
        playsinline
        loop
        class="absolute inset-0 w-full h-full object-cover"
      />

      <!-- Play affordance (hidden while playing) -->
      <div v-if="!isPlaying" class="relative h-full flex flex-col items-center justify-center gap-6 px-6 text-center">
        <button
          type="button"
          class="group relative size-20 sm:size-24 rounded-full flex items-center justify-center cursor-pointer"
          :aria-label="src ? 'Play demo video' : 'Demo coming soon'"
          @click="play"
        >
          <!-- Pulsing halo rings -->
          <span aria-hidden="true" class="absolute inset-0 rounded-full bg-white/10 animate-ping [animation-duration:2s]" />
          <span aria-hidden="true" class="absolute inset-[-8px] rounded-full border border-white/15" />
          <span aria-hidden="true" class="absolute inset-[-16px] rounded-full border border-white/10" />

          <!-- Main play pill -->
          <span class="relative size-16 sm:size-20 rounded-full bg-white text-primary flex items-center justify-center shadow-2xl shadow-black/40 transition-transform group-hover:scale-110">
            <UIcon name="i-lucide-play" class="size-6 sm:size-8 translate-x-0.5" />
          </span>
        </button>

        <div>
          <p class="text-white font-black text-lg sm:text-xl tracking-tight">{{ copy.ui.watchTourLead }}{{ duration }}{{ copy.ui.watchTourSuffix }}</p>
          <p class="mt-1.5 text-sm text-white/60 max-w-xs mx-auto">{{ copy.ui.tourChapters }}</p>
        </div>
      </div>

      <!-- Playing-state overlay: mute toggle -->
      <button
        v-if="isPlaying"
        type="button"
        class="absolute bottom-4 end-4 size-10 rounded-full bg-white/10 backdrop-blur border border-white/20 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        :aria-label="isMuted ? 'Unmute' : 'Mute'"
        @click="toggleMute"
      >
        <UIcon :name="isMuted ? 'i-lucide-volume-x' : 'i-lucide-volume-2'" class="size-4" />
      </button>
    </div>

    <!-- Bottom bar: duration + chapter scrubber + DEMO chip -->
    <div class="flex items-center gap-4 px-4 sm:px-5 h-11 border-t border-black/5 dark:border-white/10 bg-gray-50 dark:bg-white/[0.02]">
      <span class="inline-flex items-center gap-1.5 text-xs font-bold tabular-nums text-gray-700 dark:text-gray-300 shrink-0">
        <UIcon name="i-lucide-clock" class="size-3.5 text-gray-400" />
        {{ duration }}
      </span>

      <!-- Chapters (desktop only) -->
      <div class="hidden md:flex items-center gap-3 flex-1 min-w-0 overflow-hidden">
        <template v-for="(ch, i) in chapters" :key="ch">
          <span class="text-xs text-gray-500 dark:text-gray-400 truncate">{{ ch }}</span>
          <span v-if="i < chapters.length - 1" aria-hidden="true" class="h-px w-4 bg-black/10 dark:bg-white/20 shrink-0" />
        </template>
      </div>

      <span class="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.25em] text-secondary-600 dark:text-secondary-400 font-bold shrink-0 ms-auto md:ms-0">
        <UIcon name="i-lucide-play-circle" class="size-3.5" />
        {{ copy.ui.demoChip }}
      </span>
    </div>
  </div>
</template>
