<script setup>
const props = defineProps({
  items:    { type: Array,  required: true },
  active:   { type: String, default: null },
  asFilter: { type: Boolean, default: false }
})
defineEmits(['update:active'])
</script>

<template>
  <section class="sticky top-16 z-20 bg-white/90 dark:bg-black/80 backdrop-blur-xl border-y border-black/10 dark:border-white/10">
    <nav aria-label="Sections" class="max-w-7xl mx-auto px-5 sm:px-8 py-3 flex items-center gap-2 overflow-x-auto scrollbar-none">
      <template v-for="c in items" :key="c.id">
        <a
          v-if="!asFilter"
          :href="`#${c.id}`"
          class="shrink-0 inline-flex items-center gap-2 h-10 px-4 rounded-full text-sm font-semibold transition-all bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-white/[0.06] dark:text-gray-300 dark:hover:bg-white/[0.1]"
        >
          <span v-if="c.dot" :class="['size-1.5 rounded-full', c.dot]" />
          <span>{{ c.label }}</span>
          <span
            v-if="c.count != null"
            class="inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 rounded-full bg-white text-gray-500 dark:bg-white/[0.08] dark:text-gray-400 text-[10px] font-bold tabular-nums"
          >{{ c.count }}</span>
        </a>
        <button
          v-else
          type="button"
          :aria-pressed="active === c.id"
          class="shrink-0 inline-flex items-center gap-2 h-10 px-4 rounded-full text-sm font-semibold transition-all"
          :class="active === c.id
            ? 'bg-primary text-white dark:bg-white dark:text-primary shadow-sm'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-white/[0.06] dark:text-gray-300 dark:hover:bg-white/[0.1]'"
          @click="$emit('update:active', c.id)"
        >
          <span v-if="c.dot" :class="['size-1.5 rounded-full', c.dot]" />
          <span>{{ c.label }}</span>
          <span
            v-if="c.count != null"
            class="inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 rounded-full text-[10px] font-bold tabular-nums"
            :class="active === c.id
              ? 'bg-white/20 text-white dark:bg-primary/20 dark:text-primary'
              : 'bg-white text-gray-500 dark:bg-white/[0.08] dark:text-gray-400'"
          >{{ c.count }}</span>
        </button>
      </template>
    </nav>
  </section>
</template>
