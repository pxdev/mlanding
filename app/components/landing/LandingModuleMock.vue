<script setup lang="ts">
defineProps<{ id: string; color?: string }>()
</script>

<template>
  <!-- ════ Calendar — Day view with member lanes, brand-aligned ════ -->
  <div v-if="id === 'calendar'" class="w-full text-[9px]">
    <!-- Top bar: date + view-mode segmented control -->
    <div class="flex items-center justify-between mb-3">
      <div>
        <p class="text-sm font-black text-gray-900 dark:text-white tracking-tight leading-none">Tue · 22 Apr</p>
        <p class="text-[9px] text-gray-400 mt-1">14 appointments · 3 staff</p>
      </div>
      <div class="flex gap-0.5 bg-black/5 dark:bg-white/10 rounded-full p-0.5 font-bold text-[8px]">
        <span class="px-2 py-1 rounded-full bg-primary text-white dark:bg-white dark:text-primary shadow-sm">Day</span>
        <span class="px-2 py-1 text-gray-500 dark:text-gray-400">3D</span>
        <span class="px-2 py-1 text-gray-500 dark:text-gray-400">Wk</span>
        <span class="px-2 py-1 text-gray-500 dark:text-gray-400">Mo</span>
      </div>
    </div>

    <!-- Calendar grid: time gutter + 3 member lanes -->
    <div class="flex gap-1.5">
      <!-- Time gutter -->
      <div class="w-5 pt-7 flex flex-col text-[7px] text-gray-400 tabular-nums">
        <span v-for="h in ['09', '10', '11', '12', '13', '14']" :key="h" class="h-[22px] leading-none">{{ h }}</span>
      </div>

      <!-- Member lanes -->
      <div class="flex-1 grid grid-cols-3 gap-1">
        <!-- Lane: Lina (rose category) -->
        <div class="relative">
          <!-- Member header -->
          <div class="flex items-center gap-1 mb-1 pb-1 border-b border-black/10 dark:border-white/10">
            <div class="size-4 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 text-white text-[7px] font-black flex items-center justify-center">LH</div>
            <span class="text-[8px] font-bold text-gray-700 dark:text-gray-300 truncate">Lina</span>
            <span aria-hidden="true" class="ms-auto size-1.5 rounded-full bg-rose-500 animate-pulse" />
          </div>
          <!-- Hour ticks behind appointments -->
          <div aria-hidden="true" class="absolute inset-x-0 top-7 h-[132px] pointer-events-none">
            <div v-for="n in 6" :key="n" class="h-[22px] border-t border-black/5 dark:border-white/10" />
          </div>
          <!-- Appointments (colored by service category) -->
          <div class="relative space-y-0.5">
            <div class="h-[43px] rounded bg-gradient-to-br from-pink-400 to-rose-500 text-white px-1.5 py-1 flex flex-col justify-between leading-tight shadow-sm shadow-rose-500/25">
              <p class="font-black text-[9px] truncate">Color & Cut</p>
              <p class="text-[7px] opacity-90 truncate">Lina H. · 9:00</p>
            </div>
            <div class="h-[21px] rounded bg-gray-200 dark:bg-white/5 text-gray-500 px-1.5 flex items-center text-[7px] font-semibold"><UIcon name="i-lucide-coffee" class="size-2.5 me-1" />Break</div>
            <div class="h-[43px] rounded bg-gradient-to-br from-violet-400 to-fuchsia-500 text-white px-1.5 py-1 flex flex-col justify-between leading-tight shadow-sm shadow-violet-500/25">
              <p class="font-black text-[9px] truncate">Facial Glow</p>
              <p class="text-[7px] opacity-90 truncate">Noura S. · 12:00</p>
            </div>
          </div>
        </div>

        <!-- Lane: Karim (sky category) -->
        <div class="relative">
          <div class="flex items-center gap-1 mb-1 pb-1 border-b border-black/10 dark:border-white/10">
            <div class="size-4 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 text-white text-[7px] font-black flex items-center justify-center">KM</div>
            <span class="text-[8px] font-bold text-gray-700 dark:text-gray-300 truncate">Karim</span>
          </div>
          <div aria-hidden="true" class="absolute inset-x-0 top-7 h-[132px] pointer-events-none">
            <div v-for="n in 6" :key="n" class="h-[22px] border-t border-black/5 dark:border-white/10" />
          </div>
          <div class="relative space-y-0.5">
            <div class="h-[21px] rounded bg-gradient-to-br from-sky-400 to-indigo-500 text-white px-1.5 flex items-center text-[8px] font-bold shadow-sm shadow-sky-500/25">
              <span class="truncate">Consult</span>
            </div>
            <div class="h-[32px] rounded bg-gradient-to-br from-emerald-400 to-teal-500 text-white px-1.5 py-0.5 flex flex-col justify-center leading-tight shadow-sm shadow-emerald-500/25">
              <p class="font-black text-[8px] truncate">Deep Tissue</p>
              <p class="text-[7px] opacity-90 truncate">60 min</p>
            </div>
            <!-- Status: checked-in dot -->
            <div class="h-[32px] rounded border border-secondary-500/50 bg-secondary-500/5 text-secondary-700 dark:text-secondary-300 px-1.5 py-0.5 flex flex-col justify-center leading-tight">
              <p class="font-black text-[8px] truncate">Trim · Confirmed</p>
              <p class="text-[7px] opacity-80 truncate">Omar R. · 13:00</p>
            </div>
          </div>
        </div>

        <!-- Lane: Noura (emerald category) -->
        <div class="relative">
          <div class="flex items-center gap-1 mb-1 pb-1 border-b border-black/10 dark:border-white/10">
            <div class="size-4 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 text-white text-[7px] font-black flex items-center justify-center">NS</div>
            <span class="text-[8px] font-bold text-gray-700 dark:text-gray-300 truncate">Noura</span>
          </div>
          <div aria-hidden="true" class="absolute inset-x-0 top-7 h-[132px] pointer-events-none">
            <div v-for="n in 6" :key="n" class="h-[22px] border-t border-black/5 dark:border-white/10" />
          </div>
          <div class="relative space-y-0.5">
            <div class="h-[32px] rounded bg-gradient-to-br from-amber-400 to-orange-500 text-white px-1.5 py-0.5 flex flex-col justify-center leading-tight shadow-sm shadow-amber-500/25">
              <p class="font-black text-[8px] truncate">Waxing</p>
              <p class="text-[7px] opacity-90 truncate">Rania K.</p>
            </div>
            <!-- "Now" indicator -->
            <div class="relative h-[21px]">
              <div aria-hidden="true" class="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <span class="size-1.5 rounded-full bg-rose-500 ring-2 ring-rose-500/20 animate-pulse" />
                <span class="flex-1 h-px bg-rose-500" />
                <span class="text-[7px] font-black text-rose-500 tabular-nums">14:32</span>
              </div>
            </div>
            <!-- Free slot with dashed border -->
            <div class="h-[32px] rounded border border-dashed border-gray-300 dark:border-white/20 text-gray-400 flex items-center justify-center text-[7px] font-semibold">
              + Add
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer: quick stats -->
    <div class="mt-3 pt-2 border-t border-black/5 dark:border-white/10 flex items-center gap-3 text-[8px] font-semibold">
      <span class="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400">
        <span aria-hidden="true" class="size-1.5 rounded-full bg-amber-500" />
        Waitlist 2
      </span>
      <span class="inline-flex items-center gap-1 text-sky-600 dark:text-sky-400">
        <span aria-hidden="true" class="size-1.5 rounded-full bg-sky-500" />
        Unconfirmed 1
      </span>
      <span class="ms-auto inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
        <UIcon name="i-lucide-check-circle-2" class="size-2.5" />
        On time 100%
      </span>
    </div>
  </div>

  <!-- ════ Sales / POS — top bar + KPI cards + invoice rows + payment split ════ -->
  <div v-else-if="id === 'sales'" class="w-full text-[9px]">
    <!-- Top bar: date + view tabs -->
    <div class="flex items-center justify-between mb-3">
      <div>
        <p class="text-sm font-black text-gray-900 dark:text-white tracking-tight leading-none">Tue · 22 Apr</p>
        <p class="text-[9px] text-gray-400 mt-1">12 invoices · SAR 4,820 today</p>
      </div>
      <div class="flex gap-0.5 bg-black/5 dark:bg-white/10 rounded-full p-0.5 font-bold text-[8px]">
        <span class="px-2 py-1 rounded-full bg-primary text-white dark:bg-white dark:text-primary shadow-sm">POS</span>
        <span class="px-2 py-1 text-gray-500 dark:text-gray-400">Inv</span>
        <span class="px-2 py-1 text-gray-500 dark:text-gray-400">Est</span>
        <span class="px-2 py-1 text-gray-500 dark:text-gray-400">CN</span>
      </div>
    </div>

    <!-- KPI cards -->
    <div class="grid grid-cols-3 gap-1.5 mb-3">
      <div class="p-1.5 rounded-lg bg-amber-500/10 border-s-2 border-amber-500">
        <p class="text-[7px] uppercase tracking-wider text-amber-700 dark:text-amber-400 font-bold">Revenue</p>
        <p class="text-[13px] font-black tabular-nums leading-tight">4,820</p>
      </div>
      <div class="p-1.5 rounded-lg bg-emerald-500/10 border-s-2 border-emerald-500">
        <p class="text-[7px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-bold">Paid</p>
        <p class="text-[13px] font-black tabular-nums leading-tight">3,650</p>
      </div>
      <div class="p-1.5 rounded-lg bg-rose-500/10 border-s-2 border-rose-500">
        <p class="text-[7px] uppercase tracking-wider text-rose-700 dark:text-rose-400 font-bold">Unpaid</p>
        <p class="text-[13px] font-black tabular-nums leading-tight">1,170</p>
      </div>
    </div>

    <!-- Invoice rows -->
    <div class="space-y-1">
      <div v-for="inv in [
        { n: '#INV-218', c: 'Lina H.', amt: '240.00', status: 'Paid', color: 'emerald' },
        { n: '#INV-217', c: 'Karim M.', amt: '180.00', status: 'Due', color: 'amber' },
        { n: '#INV-216', c: 'Noura S.', amt: '95.50', status: 'Paid', color: 'emerald' },
        { n: '#INV-215', c: 'Omar R.', amt: '420.00', status: 'Overdue', color: 'rose' }
      ]" :key="inv.n" class="flex items-center gap-2 px-2 py-1.5 rounded-md bg-white dark:bg-[#0c0c0c] border border-black/5 dark:border-white/10">
        <div class="flex-1 min-w-0">
          <p class="text-[8px] font-bold tracking-tight truncate">{{ inv.n }} · {{ inv.c }}</p>
          <p class="text-[7px] text-gray-400">Color & Cut</p>
        </div>
        <p class="text-[9px] font-black tabular-nums whitespace-nowrap">SAR {{ inv.amt }}</p>
        <span class="text-[7px] px-1.5 py-0.5 rounded font-bold" :class="{
          'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400': inv.color === 'emerald',
          'bg-amber-500/15 text-amber-700 dark:text-amber-400': inv.color === 'amber',
          'bg-rose-500/15 text-rose-700 dark:text-rose-400': inv.color === 'rose'
        }">{{ inv.status }}</span>
      </div>
    </div>

    <!-- Footer: payment split -->
    <div class="mt-3 pt-2 border-t border-black/5 dark:border-white/10 flex items-center gap-3 text-[8px] font-semibold">
      <span class="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
        <UIcon name="i-lucide-banknote" class="size-2.5" />
        Cash 45%
      </span>
      <span class="inline-flex items-center gap-1 text-sky-600 dark:text-sky-400">
        <UIcon name="i-lucide-credit-card" class="size-2.5" />
        Card 32%
      </span>
      <span class="inline-flex items-center gap-1 text-violet-600 dark:text-violet-400">
        <span aria-hidden="true" class="size-1.5 rounded-full bg-violet-500" />
        BNPL 15%
      </span>
      <span class="ms-auto inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
        <UIcon name="i-lucide-check-circle-2" class="size-2.5" />
        ZATCA cleared
      </span>
    </div>
  </div>

  <!-- ════ Clients / CRM — top bar + segment chips + client rows + footer stats ════ -->
  <div v-else-if="id === 'clients'" class="w-full text-[9px]">
    <!-- Top bar -->
    <div class="flex items-center justify-between mb-3">
      <div>
        <p class="text-sm font-black text-gray-900 dark:text-white tracking-tight leading-none">Clients</p>
        <p class="text-[9px] text-gray-400 mt-1">1,284 total · 312 active this month</p>
      </div>
      <div class="inline-flex items-center gap-1 px-2 h-5 rounded bg-sky-500/15 text-sky-700 dark:text-sky-400 text-[8px] font-bold">
        <UIcon name="i-lucide-search" class="size-2.5" />
        Search
      </div>
    </div>

    <!-- Segment chips -->
    <div class="flex flex-wrap gap-1 mb-3">
      <span class="text-[8px] px-1.5 py-0.5 rounded-full bg-sky-500/15 text-sky-700 dark:text-sky-400 font-bold">All · 1,284</span>
      <span class="text-[8px] px-1.5 py-0.5 rounded-full bg-pink-500/15 text-pink-700 dark:text-pink-400 font-bold">VIP · 48</span>
      <span class="text-[8px] px-1.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-bold">New · 22</span>
      <span class="text-[8px] px-1.5 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400 font-bold">Dormant · 74</span>
    </div>

    <!-- Client rows -->
    <div class="space-y-1">
      <div
        v-for="c in [
          { n: 'Lina Hassan', init: 'LH', tag: 'VIP', color: 'from-pink-400 to-rose-500', ring: 'ring-pink-400/30', visits: '24 visits · 12 Apr', spend: '12,840', tagColor: 'pink' },
          { n: 'Karim Malek', init: 'KM', tag: 'Returning', color: 'from-sky-400 to-indigo-500', ring: 'ring-sky-400/30', visits: '8 visits · 08 Apr', spend: '3,200', tagColor: 'sky' },
          { n: 'Noura Saeed', init: 'NS', tag: 'New', color: 'from-emerald-400 to-teal-500', ring: 'ring-emerald-400/30', visits: '1 visit · 21 Apr', spend: '450', tagColor: 'emerald' },
          { n: 'Omar Rashid', init: 'OR', tag: 'Dormant', color: 'from-amber-400 to-orange-500', ring: 'ring-amber-400/30', visits: 'Last seen 98d', spend: '980', tagColor: 'amber' }
        ]" :key="c.init"
        class="flex items-center gap-2 px-2 py-1.5 rounded-md bg-white dark:bg-[#0c0c0c] border border-black/5 dark:border-white/10"
      >
        <div class="size-6 rounded-full bg-gradient-to-br flex items-center justify-center text-white text-[8px] font-black ring-2" :class="[c.color, c.ring]">{{ c.init }}</div>
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-1">
            <p class="text-[9px] font-bold truncate">{{ c.n }}</p>
            <UIcon name="i-lucide-user-check" class="size-2 text-emerald-500 shrink-0" />
          </div>
          <p class="text-[7px] text-gray-400">{{ c.visits }}</p>
        </div>
        <div class="text-end">
          <p class="text-[9px] font-black tabular-nums">SAR {{ c.spend }}</p>
          <span class="text-[7px] px-1 py-0.5 rounded font-bold" :class="{
            'bg-pink-500/15 text-pink-700 dark:text-pink-400': c.tagColor === 'pink',
            'bg-sky-500/15 text-sky-700 dark:text-sky-400': c.tagColor === 'sky',
            'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400': c.tagColor === 'emerald',
            'bg-amber-500/15 text-amber-700 dark:text-amber-400': c.tagColor === 'amber'
          }">{{ c.tag }}</span>
        </div>
      </div>
    </div>

    <!-- Footer: quick stats -->
    <div class="mt-3 pt-2 border-t border-black/5 dark:border-white/10 flex items-center gap-3 text-[8px] font-semibold">
      <span class="inline-flex items-center gap-1 text-sky-600 dark:text-sky-400">
        <UIcon name="i-lucide-message-square" class="size-2.5" />
        Campaigns 3 active
      </span>
      <span class="inline-flex items-center gap-1 text-pink-600 dark:text-pink-400">
        <UIcon name="i-lucide-gift" class="size-2.5" />
        2 birthdays today
      </span>
      <span class="ms-auto inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
        <UIcon name="i-lucide-trending-up" class="size-2.5" />
        +12% MoM
      </span>
    </div>
  </div>

  <!-- ════ Catalogue — category tabs + service rows with icons + footer ════ -->
  <div v-else-if="id === 'catalogue'" class="w-full text-[9px]">
    <!-- Top bar -->
    <div class="flex items-center justify-between mb-3">
      <div>
        <p class="text-sm font-black text-gray-900 dark:text-white tracking-tight leading-none">Services</p>
        <p class="text-[9px] text-gray-400 mt-1">42 services · 8 categories · Avg SAR 168</p>
      </div>
      <div class="inline-flex items-center gap-1 px-2 h-5 rounded bg-pink-500/15 text-pink-700 dark:text-pink-400 text-[8px] font-bold">
        <UIcon name="i-lucide-plus" class="size-2.5" />
        Add
      </div>
    </div>

    <!-- Category tabs -->
    <div class="flex flex-wrap gap-1 mb-3">
      <span class="text-[8px] px-1.5 py-0.5 rounded-full bg-primary text-white dark:bg-white dark:text-primary font-bold">All · 42</span>
      <span class="text-[8px] px-1.5 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-300 font-bold">Hair · 14</span>
      <span class="text-[8px] px-1.5 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-300 font-bold">Spa · 9</span>
      <span class="text-[8px] px-1.5 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-300 font-bold">Nails · 7</span>
      <span class="text-[8px] px-1.5 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-300 font-bold">+5</span>
    </div>

    <!-- Service rows -->
    <div class="space-y-1">
      <div v-for="s in [
        { n: 'Color & Cut', cat: 'Hair', d: '90m', p: '180', icon: 'i-lucide-scissors', g: 'from-pink-400 to-rose-500', booked: 48, staff: ['LH', 'NS'] },
        { n: 'Deep Tissue Massage', cat: 'Spa', d: '60m', p: '240', icon: 'i-lucide-hand', g: 'from-emerald-400 to-teal-500', booked: 32, staff: ['KM'] },
        { n: 'Facial Glow', cat: 'Spa', d: '45m', p: '150', icon: 'i-lucide-sparkles', g: 'from-violet-400 to-fuchsia-500', booked: 28, staff: ['NS', 'RK'] },
        { n: 'Nail Art · Gel', cat: 'Nails', d: '30m', p: '95', icon: 'i-lucide-palette', g: 'from-sky-400 to-indigo-500', booked: 61, staff: ['RK'] }
      ]" :key="s.n"
        class="flex items-center gap-2 px-2 py-1.5 rounded-md bg-white dark:bg-[#0c0c0c] border border-black/5 dark:border-white/10"
      >
        <!-- Icon tile -->
        <div class="size-7 shrink-0 rounded-md bg-gradient-to-br text-white flex items-center justify-center" :class="s.g">
          <UIcon :name="s.icon" class="size-3.5" />
        </div>
        <!-- Name + category -->
        <div class="flex-1 min-w-0">
          <p class="text-[9px] font-bold tracking-tight truncate">{{ s.n }}</p>
          <div class="flex items-center gap-1 mt-0.5">
            <span class="text-[7px] px-1 py-0.5 rounded bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-400 font-bold">{{ s.cat }}</span>
            <span class="text-[7px] text-gray-400">{{ s.d }} · {{ s.booked }} booked</span>
          </div>
        </div>
        <!-- Assigned staff avatars -->
        <div class="flex -space-x-1">
          <div v-for="(a, ai) in s.staff" :key="a"
            class="size-4 rounded-full bg-gradient-to-br text-white text-[6px] font-black flex items-center justify-center ring-1 ring-white dark:ring-[#0c0c0c]"
            :class="ai === 0 ? 'from-pink-400 to-rose-500' : 'from-sky-400 to-indigo-500'"
          >{{ a }}</div>
        </div>
        <!-- Price -->
        <p class="text-[10px] font-black tabular-nums whitespace-nowrap ms-1">SAR {{ s.p }}</p>
      </div>
    </div>

    <!-- Footer: totals -->
    <div class="mt-3 pt-2 border-t border-black/5 dark:border-white/10 flex items-center gap-3 text-[8px] font-semibold">
      <span class="inline-flex items-center gap-1 text-pink-600 dark:text-pink-400">
        <UIcon name="i-lucide-layers" class="size-2.5" />
        14 packages
      </span>
      <span class="inline-flex items-center gap-1 text-violet-600 dark:text-violet-400">
        <UIcon name="i-lucide-ticket" class="size-2.5" />
        6 memberships
      </span>
      <span class="ms-auto inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
        <UIcon name="i-lucide-zap" class="size-2.5" />
        Smart pricing on
      </span>
    </div>
  </div>

  <!-- ════ Inventory — top KPI cards + stock rows with bars + footer ════ -->
  <div v-else-if="id === 'inventory'" class="w-full text-[9px]">
    <!-- Top bar -->
    <div class="flex items-center justify-between mb-3">
      <div>
        <p class="text-sm font-black text-gray-900 dark:text-white tracking-tight leading-none">Stock · Main Branch</p>
        <p class="text-[9px] text-gray-400 mt-1">128 products · SAR 24,680 value</p>
      </div>
      <div class="inline-flex items-center gap-1 px-2 h-5 rounded bg-red-500/15 text-red-700 dark:text-red-400 text-[8px] font-bold">
        <UIcon name="i-lucide-alert-triangle" class="size-2.5" />
        2 low
      </div>
    </div>

    <!-- KPI cards -->
    <div class="grid grid-cols-3 gap-1.5 mb-3">
      <div class="p-1.5 rounded-lg bg-teal-500/10 border-s-2 border-teal-500">
        <p class="text-[7px] uppercase tracking-wider text-teal-700 dark:text-teal-400 font-bold">In stock</p>
        <p class="text-[13px] font-black tabular-nums leading-tight">126</p>
      </div>
      <div class="p-1.5 rounded-lg bg-amber-500/10 border-s-2 border-amber-500">
        <p class="text-[7px] uppercase tracking-wider text-amber-700 dark:text-amber-400 font-bold">Reorder</p>
        <p class="text-[13px] font-black tabular-nums leading-tight">5</p>
      </div>
      <div class="p-1.5 rounded-lg bg-red-500/10 border-s-2 border-red-500">
        <p class="text-[7px] uppercase tracking-wider text-red-700 dark:text-red-400 font-bold">Out</p>
        <p class="text-[13px] font-black tabular-nums leading-tight">2</p>
      </div>
    </div>

    <!-- Product rows -->
    <div class="space-y-1">
      <div
        v-for="p in [
          { n: 'Shampoo Gold', sku: 'SHG-250', qty: 42, max: 60, c: 'emerald', sup: 'Acme' },
          { n: 'Hair Color #4', sku: 'HCL-04', qty: 8, max: 30, c: 'amber', sup: 'L\'Oréal' },
          { n: 'Nail Polish · 12', sku: 'NPL-12', qty: 2, max: 25, c: 'red', sup: 'OPI' },
          { n: 'Conditioner XL', sku: 'CND-XL', qty: 28, max: 40, c: 'emerald', sup: 'Acme' }
        ]" :key="p.sku"
        class="px-2 py-1.5 rounded-md bg-white dark:bg-[#0c0c0c] border border-black/5 dark:border-white/10"
      >
        <div class="flex items-center gap-2">
          <div class="size-5 shrink-0 rounded bg-teal-500/15 text-teal-600 flex items-center justify-center">
            <UIcon name="i-lucide-package" class="size-2.5" />
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-[9px] font-bold tracking-tight truncate">{{ p.n }}</p>
            <div class="flex items-center gap-1 mt-0.5">
              <span class="text-[7px] px-1 py-0.5 rounded bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-400 font-bold tabular-nums">{{ p.sku }}</span>
              <span class="text-[7px] text-gray-400">{{ p.sup }}</span>
            </div>
          </div>
          <p class="text-[10px] font-black tabular-nums whitespace-nowrap" :class="{
            'text-emerald-500': p.c === 'emerald',
            'text-amber-500': p.c === 'amber',
            'text-red-500': p.c === 'red'
          }">{{ p.qty }}<span class="text-[7px] text-gray-400 font-normal">/{{ p.max }}</span></p>
        </div>
        <!-- Progress bar -->
        <div class="mt-1.5 h-1 rounded-full bg-black/5 dark:bg-white/5 overflow-hidden">
          <div class="h-full rounded-full" :class="{
            'bg-gradient-to-r from-teal-400 to-emerald-500': p.c === 'emerald',
            'bg-gradient-to-r from-amber-400 to-orange-500': p.c === 'amber',
            'bg-gradient-to-r from-rose-400 to-red-500': p.c === 'red'
          }" :style="{ width: `${(p.qty / p.max) * 100}%` }" />
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="mt-3 pt-2 border-t border-black/5 dark:border-white/10 flex items-center gap-3 text-[8px] font-semibold">
      <span class="inline-flex items-center gap-1 text-teal-600 dark:text-teal-400">
        <UIcon name="i-lucide-truck" class="size-2.5" />
        3 transfers live
      </span>
      <span class="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400">
        <UIcon name="i-lucide-file-text" class="size-2.5" />
        2 orders pending
      </span>
      <span class="ms-auto inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
        <UIcon name="i-lucide-check-circle-2" class="size-2.5" />
        COGS auto-posted
      </span>
    </div>
  </div>

  <!-- ════ Team & HR — top bar + pending invite + member rows + attendance footer ════ -->
  <div v-else-if="id === 'team'" class="w-full text-[9px]">
    <!-- Top bar -->
    <div class="flex items-center justify-between mb-3">
      <div>
        <p class="text-sm font-black text-gray-900 dark:text-white tracking-tight leading-none">Team · Today</p>
        <p class="text-[9px] text-gray-400 mt-1">3 on-duty · 1 pending invite</p>
      </div>
      <div class="flex gap-0.5 bg-black/5 dark:bg-white/10 rounded-full p-0.5 font-bold text-[8px]">
        <span class="px-2 py-1 rounded-full bg-primary text-white dark:bg-white dark:text-primary shadow-sm">Members</span>
        <span class="px-2 py-1 text-gray-500 dark:text-gray-400">Schedule</span>
        <span class="px-2 py-1 text-gray-500 dark:text-gray-400">Pay</span>
      </div>
    </div>

    <!-- Pending invite -->
    <div class="mb-2 flex items-center gap-2 px-2 py-1.5 rounded-md bg-amber-500/10 border border-amber-500/20">
      <UIcon name="i-lucide-mail" class="size-3 text-amber-600 dark:text-amber-400 shrink-0" />
      <div class="flex-1 min-w-0">
        <p class="text-[8px] font-bold text-amber-700 dark:text-amber-400 truncate">Invite pending — rania@studio.sa</p>
      </div>
      <span class="text-[7px] px-1 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-400 font-bold">Stylist</span>
    </div>

    <!-- Member rows -->
    <div class="space-y-1">
      <div
        v-for="m in [
          { n: 'Lina Hassan', r: 'OWNER', title: 'Senior Stylist', init: 'LH', c: 'from-pink-400 to-rose-500', ring: 'ring-pink-400/30', hrs: '38h', shift: 85, ok: true, role: 'pink' },
          { n: 'Karim Malek', r: 'STAFF', title: 'Barber', init: 'KM', c: 'from-sky-400 to-indigo-500', ring: 'ring-sky-400/30', hrs: '40h', shift: 100, ok: true, role: 'sky' },
          { n: 'Noura Saeed', r: 'ADMIN', title: 'Receptionist', init: 'NS', c: 'from-emerald-400 to-teal-500', ring: 'ring-emerald-400/30', hrs: '32h', shift: 72, ok: false, role: 'emerald' }
        ]" :key="m.init"
        class="px-2 py-1.5 rounded-md bg-white dark:bg-[#0c0c0c] border border-black/5 dark:border-white/10"
      >
        <div class="flex items-center gap-2">
          <div class="size-7 shrink-0 rounded-lg bg-gradient-to-br flex items-center justify-center text-white text-[9px] font-black ring-2" :class="[m.c, m.ring]">{{ m.init }}</div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-1">
              <p class="text-[9px] font-bold truncate">{{ m.n }}</p>
              <span class="text-[6px] px-1 py-0.5 rounded font-black" :class="{
                'bg-pink-500/15 text-pink-700 dark:text-pink-400': m.role === 'pink',
                'bg-sky-500/15 text-sky-700 dark:text-sky-400': m.role === 'sky',
                'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400': m.role === 'emerald'
              }">{{ m.r }}</span>
            </div>
            <div class="flex items-center gap-1 mt-0.5">
              <UIcon name="i-lucide-map-pin" class="size-2 text-gray-400" />
              <span class="text-[7px] text-gray-400">Riyadh · {{ m.title }}</span>
            </div>
          </div>
          <div class="text-end">
            <div class="flex items-center gap-1">
              <span class="size-1.5 rounded-full" :class="m.ok ? 'bg-emerald-500' : 'bg-amber-500'" />
              <span class="text-[9px] font-bold tabular-nums">{{ m.hrs }}</span>
            </div>
          </div>
        </div>
        <!-- Shift bar -->
        <div class="mt-1.5 h-1 rounded-full bg-black/5 dark:bg-white/5 overflow-hidden">
          <div class="h-full rounded-full bg-gradient-to-r" :class="m.c" :style="{ width: `${m.shift}%` }" />
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div class="mt-3 pt-2 border-t border-black/5 dark:border-white/10 flex items-center gap-3 text-[8px] font-semibold">
      <span class="inline-flex items-center gap-1 text-indigo-600 dark:text-indigo-400">
        <UIcon name="i-lucide-clock" class="size-2.5" />
        110h · this week
      </span>
      <span class="inline-flex items-center gap-1 text-violet-600 dark:text-violet-400">
        <UIcon name="i-lucide-wallet" class="size-2.5" />
        Pay run 28 Apr
      </span>
      <span class="ms-auto inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
        <UIcon name="i-lucide-check-circle-2" class="size-2.5" />
        All clocked in
      </span>
    </div>
  </div>

  <!-- ════ Accounting — top bar + journal entries with source badges + balance footer ════ -->
  <div v-else-if="id === 'accounting'" class="w-full text-[9px]">
    <!-- Top bar -->
    <div class="flex items-center justify-between mb-3">
      <div>
        <p class="text-sm font-black text-gray-900 dark:text-white tracking-tight leading-none">Journal · 22 Apr</p>
        <p class="text-[9px] text-gray-400 mt-1">48 entries posted · 2 drafts</p>
      </div>
      <div class="flex gap-0.5 bg-black/5 dark:bg-white/10 rounded-full p-0.5 font-bold text-[8px]">
        <span class="px-2 py-1 rounded-full bg-primary text-white dark:bg-white dark:text-primary shadow-sm">Journal</span>
        <span class="px-2 py-1 text-gray-500 dark:text-gray-400">Bills</span>
        <span class="px-2 py-1 text-gray-500 dark:text-gray-400">Bank</span>
      </div>
    </div>

    <!-- Journal entry list -->
    <div class="space-y-1 mb-2">
      <div v-for="e in [
        { n: 'JE-0482', src: 'SALE', color: 'emerald', desc: 'Invoice INV-218 · Lina H.', amt: '240.00' },
        { n: 'JE-0481', src: 'EXP', color: 'rose', desc: 'Supplier payment · Acme', amt: '580.00' },
        { n: 'JE-0480', src: 'PAY', color: 'violet', desc: 'Payroll · April run', amt: '8,400.00' }
      ]" :key="e.n"
        class="flex items-center gap-2 px-2 py-1.5 rounded-md bg-white dark:bg-[#0c0c0c] border border-black/5 dark:border-white/10"
      >
        <span class="text-[7px] font-black tabular-nums text-gray-400 shrink-0">{{ e.n }}</span>
        <span class="text-[7px] px-1.5 py-0.5 rounded font-black shrink-0" :class="{
          'bg-emerald-500/15 text-emerald-700 dark:text-emerald-400': e.color === 'emerald',
          'bg-rose-500/15 text-rose-700 dark:text-rose-400': e.color === 'rose',
          'bg-violet-500/15 text-violet-700 dark:text-violet-400': e.color === 'violet'
        }">{{ e.src }}</span>
        <p class="flex-1 min-w-0 text-[9px] font-bold truncate">{{ e.desc }}</p>
        <p class="text-[9px] font-black tabular-nums whitespace-nowrap">{{ e.amt }}</p>
      </div>
    </div>

    <!-- Expanded T-account preview -->
    <div class="rounded-lg border border-black/10 dark:border-white/10 overflow-hidden">
      <div class="grid grid-cols-[1fr_auto_auto] gap-3 px-2 py-1 bg-black/5 dark:bg-white/5 text-[7px] uppercase tracking-wider font-black text-gray-500">
        <span>Account</span><span>DR</span><span>CR</span>
      </div>
      <div v-for="(r, i) in [
        { a: '1100 · Cash', dr: '240.00', cr: '' },
        { a: '4000 · Service revenue', dr: '', cr: '208.70' },
        { a: '2300 · VAT payable', dr: '', cr: '31.30' }
      ]" :key="i" class="grid grid-cols-[1fr_auto_auto] gap-3 px-2 py-1 border-t border-black/5 dark:border-white/10 text-[8px]">
        <span class="truncate tabular-nums">{{ r.a }}</span>
        <span class="tabular-nums font-bold text-emerald-600 dark:text-emerald-400">{{ r.dr }}</span>
        <span class="tabular-nums font-bold text-rose-600 dark:text-rose-400">{{ r.cr }}</span>
      </div>
      <div class="grid grid-cols-[1fr_auto_auto] gap-3 px-2 py-1 bg-stone-500/10 border-t-2 border-stone-500 text-[8px] font-black">
        <span>Balance</span>
        <span class="tabular-nums">240.00</span>
        <span class="tabular-nums">240.00</span>
      </div>
    </div>

    <!-- Footer -->
    <div class="mt-3 pt-2 border-t border-black/5 dark:border-white/10 flex items-center gap-3 text-[8px] font-semibold">
      <span class="inline-flex items-center gap-1 text-stone-600 dark:text-stone-400">
        <UIcon name="i-lucide-landmark" class="size-2.5" />
        Bank reconciled
      </span>
      <span class="inline-flex items-center gap-1 text-sky-600 dark:text-sky-400">
        <UIcon name="i-lucide-shield-check" class="size-2.5" />
        Audit trail live
      </span>
      <span class="ms-auto inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
        <UIcon name="i-lucide-check-circle-2" class="size-2.5" />
        Auto-posting on
      </span>
    </div>
  </div>

  <!-- ════ Reports — top bar + KPI grid + revenue bar chart + expense list ════ -->
  <div v-else-if="id === 'reports'" class="w-full text-[9px]">
    <!-- Top bar -->
    <div class="flex items-center justify-between mb-3">
      <div>
        <p class="text-sm font-black text-gray-900 dark:text-white tracking-tight leading-none">Finance · This month</p>
        <p class="text-[9px] text-gray-400 mt-1">Updated 2 min ago</p>
      </div>
      <div class="flex gap-0.5 bg-black/5 dark:bg-white/10 rounded-full p-0.5 font-bold text-[8px]">
        <span class="px-2 py-1 text-gray-500 dark:text-gray-400">Day</span>
        <span class="px-2 py-1 text-gray-500 dark:text-gray-400">Wk</span>
        <span class="px-2 py-1 rounded-full bg-primary text-white dark:bg-white dark:text-primary shadow-sm">Mo</span>
        <span class="px-2 py-1 text-gray-500 dark:text-gray-400">Yr</span>
      </div>
    </div>

    <!-- KPI grid 4 tiles -->
    <div class="grid grid-cols-4 gap-1.5 mb-3">
      <div class="p-1.5 rounded-lg bg-cyan-500/10 border-s-2 border-cyan-500">
        <div class="flex items-center gap-1">
          <UIcon name="i-lucide-circle-dollar-sign" class="size-2.5 text-cyan-600 dark:text-cyan-400" />
          <p class="text-[7px] uppercase tracking-wider text-cyan-700 dark:text-cyan-400 font-bold">Revenue</p>
        </div>
        <p class="text-[12px] font-black tabular-nums leading-tight mt-0.5">48.2k</p>
        <p class="text-[7px] text-emerald-600 dark:text-emerald-400 font-bold">+18%</p>
      </div>
      <div class="p-1.5 rounded-lg bg-rose-500/10 border-s-2 border-rose-500">
        <div class="flex items-center gap-1">
          <UIcon name="i-lucide-arrow-down" class="size-2.5 text-rose-600 dark:text-rose-400" />
          <p class="text-[7px] uppercase tracking-wider text-rose-700 dark:text-rose-400 font-bold">Expense</p>
        </div>
        <p class="text-[12px] font-black tabular-nums leading-tight mt-0.5">18.4k</p>
        <p class="text-[7px] text-rose-600 dark:text-rose-400 font-bold">+4%</p>
      </div>
      <div class="p-1.5 rounded-lg bg-emerald-500/10 border-s-2 border-emerald-500">
        <div class="flex items-center gap-1">
          <UIcon name="i-lucide-trending-up" class="size-2.5 text-emerald-600 dark:text-emerald-400" />
          <p class="text-[7px] uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-bold">Profit</p>
        </div>
        <p class="text-[12px] font-black tabular-nums leading-tight mt-0.5">29.8k</p>
        <p class="text-[7px] text-emerald-600 dark:text-emerald-400 font-bold">+24%</p>
      </div>
      <div class="p-1.5 rounded-lg bg-violet-500/10 border-s-2 border-violet-500">
        <div class="flex items-center gap-1">
          <UIcon name="i-lucide-landmark" class="size-2.5 text-violet-600 dark:text-violet-400" />
          <p class="text-[7px] uppercase tracking-wider text-violet-700 dark:text-violet-400 font-bold">Cash</p>
        </div>
        <p class="text-[12px] font-black tabular-nums leading-tight mt-0.5">82.1k</p>
        <p class="text-[7px] text-violet-600 dark:text-violet-400 font-bold">12 accts</p>
      </div>
    </div>

    <!-- Bar chart -->
    <div class="p-2 rounded-lg bg-white dark:bg-[#0c0c0c] border border-black/5 dark:border-white/10">
      <div class="flex items-center justify-between mb-1.5">
        <p class="text-[8px] uppercase tracking-wider text-gray-500 font-black">Daily revenue · 12 mo</p>
        <p class="text-[8px] font-black tabular-nums bg-gradient-to-br from-cyan-500 to-sky-600 bg-clip-text text-transparent">SAR 48,200</p>
      </div>
      <div class="flex items-end gap-1 h-14">
        <div v-for="(b, i) in [42, 58, 38, 72, 55, 84, 66, 92, 78, 96, 88, 100]" :key="i"
          class="flex-1 rounded-t bg-gradient-to-t from-cyan-500 to-sky-300 relative"
          :style="{ height: `${b}%` }"
        >
          <div v-if="i === 11" aria-hidden="true" class="absolute -top-1 inset-x-0 flex justify-center">
            <span class="size-1 rounded-full bg-cyan-500 ring-2 ring-cyan-500/25 animate-pulse" />
          </div>
        </div>
      </div>
      <div class="mt-1 flex justify-between text-[7px] text-gray-400">
        <span v-for="m in ['May', '', '', 'Aug', '', '', 'Nov', '', '', 'Feb', '', 'Apr']" :key="m">{{ m }}</span>
      </div>
    </div>

    <!-- Footer: report shortcuts -->
    <div class="mt-3 pt-2 border-t border-black/5 dark:border-white/10 flex items-center gap-3 text-[8px] font-semibold">
      <span class="inline-flex items-center gap-1 text-cyan-600 dark:text-cyan-400">
        <UIcon name="i-lucide-file-text" class="size-2.5" />
        P&L
      </span>
      <span class="inline-flex items-center gap-1 text-sky-600 dark:text-sky-400">
        <UIcon name="i-lucide-scale" class="size-2.5" />
        Balance sheet
      </span>
      <span class="inline-flex items-center gap-1 text-violet-600 dark:text-violet-400">
        <UIcon name="i-lucide-file-check" class="size-2.5" />
        VAT return
      </span>
      <span class="ms-auto inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
        <UIcon name="i-lucide-download" class="size-2.5" />
        CSV · PDF
      </span>
    </div>
  </div>

  <!-- ════ Client Portal — phone frame with welcome, loyalty, quick actions, next appt, recents ════ -->
  <div v-else-if="id === 'portal'" class="w-full flex justify-center">
    <div class="w-40 rounded-[1.5rem] p-1.5 bg-primary shadow-2xl">
      <div class="w-full rounded-[1.2rem] bg-white dark:bg-[#0c0c0c] overflow-hidden">
        <!-- Status bar -->
        <div class="flex items-center justify-between px-2.5 pt-1 pb-0.5 text-[6px] font-black text-gray-900 dark:text-white">
          <span class="tabular-nums">14:32</span>
          <div class="flex items-center gap-0.5">
            <span class="tracking-wider">5G</span>
            <UIcon name="i-lucide-battery-full" class="size-2" />
          </div>
        </div>

        <!-- Content -->
        <div class="px-2 pb-2 text-[7px]">
          <!-- Brand header -->
          <div class="flex items-center gap-1.5 mb-2">
            <div class="size-5 rounded-lg bg-gradient-to-br from-secondary-400 to-secondary-600 flex items-center justify-center">
              <span class="text-white text-[7px] font-black">LS</span>
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-[8px] font-black truncate leading-none">Lina's Spa</p>
              <p class="text-[6px] text-gray-400">Welcome, Noura</p>
            </div>
            <div class="relative">
              <UIcon name="i-lucide-bell" class="size-3 text-gray-400" />
              <span aria-hidden="true" class="absolute -top-0.5 -end-0.5 size-1.5 rounded-full bg-rose-500 ring-1 ring-white dark:ring-[#0c0c0c]" />
            </div>
          </div>

          <!-- Loyalty wallet card -->
          <div class="rounded-lg bg-gradient-to-br from-secondary-500 to-secondary-700 text-white p-2 mb-2 relative overflow-hidden">
            <div aria-hidden="true" class="absolute -top-4 -end-4 size-12 rounded-full bg-white/20 blur-lg" />
            <div class="relative">
              <div class="flex items-center justify-between">
                <p class="text-[6px] opacity-80 uppercase tracking-wider font-bold">Loyalty</p>
                <UIcon name="i-lucide-award" class="size-2.5 opacity-80" />
              </div>
              <p class="text-base font-black leading-none mt-1">1,240<span class="text-[6px] opacity-70 ms-0.5 font-normal">pts</span></p>
              <div class="mt-1.5 h-0.5 bg-white/20 rounded-full overflow-hidden">
                <div class="h-full w-[62%] bg-white/80 rounded-full" />
              </div>
              <p class="text-[6px] opacity-80 mt-1">260 pts to Gold</p>
            </div>
          </div>

          <!-- Quick actions grid -->
          <div class="grid grid-cols-4 gap-1 mb-2">
            <div class="aspect-square rounded-md bg-primary/10 text-primary dark:bg-white/10 dark:text-white flex flex-col items-center justify-center">
              <UIcon name="i-lucide-calendar-plus" class="size-2.5" />
              <span class="text-[5px] mt-0.5 font-bold">Book</span>
            </div>
            <div class="aspect-square rounded-md bg-sky-500/15 text-sky-600 flex flex-col items-center justify-center">
              <UIcon name="i-lucide-receipt" class="size-2.5" />
              <span class="text-[5px] mt-0.5 font-bold">Invoices</span>
            </div>
            <div class="aspect-square rounded-md bg-violet-500/15 text-violet-600 flex flex-col items-center justify-center">
              <UIcon name="i-lucide-pill" class="size-2.5" />
              <span class="text-[5px] mt-0.5 font-bold">Rx</span>
            </div>
            <div class="aspect-square rounded-md bg-emerald-500/15 text-emerald-600 flex flex-col items-center justify-center">
              <UIcon name="i-lucide-message-square" class="size-2.5" />
              <span class="text-[5px] mt-0.5 font-bold">Chat</span>
            </div>
          </div>

          <!-- Upcoming appointment -->
          <p class="text-[6px] uppercase tracking-wider text-gray-400 font-black mb-1">Upcoming</p>
          <div class="p-1.5 rounded-md border border-black/5 dark:border-white/10 mb-1">
            <div class="flex items-center gap-1">
              <div class="size-4 rounded-md bg-gradient-to-br from-pink-400 to-rose-500 flex items-center justify-center">
                <UIcon name="i-lucide-scissors" class="size-2 text-white" />
              </div>
              <div class="flex-1 min-w-0">
                <p class="text-[7px] font-bold truncate">Color & Cut</p>
                <p class="text-[6px] text-gray-400">Tue · 14:00 · Lina H.</p>
              </div>
              <span class="text-[5px] px-1 py-0.5 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-black">OK</span>
            </div>
          </div>

          <!-- Recent visit -->
          <div class="p-1.5 rounded-md bg-gray-50 dark:bg-white/5">
            <div class="flex items-center gap-1">
              <UIcon name="i-lucide-check-circle-2" class="size-2.5 text-emerald-500" />
              <div class="flex-1 min-w-0">
                <p class="text-[7px] font-bold truncate">Facial Glow · 15 Apr</p>
              </div>
              <div class="flex gap-0.5">
                <UIcon v-for="n in 5" :key="n" name="i-lucide-star" class="size-1.5 text-amber-400" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- ════ Multi-tenant ════ -->
  <div v-else-if="id === 'multi-tenant'" class="w-full space-y-1.5">
    <div
      v-for="t in [
        { n: 'Lina Spa Co.', s: 'lina-spa', plan: 'Business', c: 'from-pink-400 to-rose-500', stats: '3 loc · 12 staff' },
        { n: 'Smile Dental', s: 'smile-dental', plan: 'Business', c: 'from-sky-400 to-indigo-500', stats: '2 loc · 8 staff' },
        { n: 'Flex Fitness', s: 'flex-fitness', plan: 'Starter', c: 'from-lime-400 to-emerald-500', stats: '1 loc · 5 staff' },
        { n: 'Pawsitive Vet', s: 'pawsitive', plan: 'Business', c: 'from-amber-400 to-orange-500', stats: '1 loc · 4 staff' }
      ]" :key="t.s"
      class="flex items-center gap-2 p-2 rounded-lg bg-white dark:bg-[#0c0c0c] border border-black/5 dark:border-white/10"
    >
      <div class="size-7 rounded-lg bg-gradient-to-br flex items-center justify-center text-white text-[9px] font-black" :class="t.c">{{ t.n.charAt(0) }}</div>
      <div class="flex-1 min-w-0">
        <p class="text-[10px] font-bold truncate">{{ t.n }}</p>
        <p class="text-[8px] text-gray-400">{{ t.s }}.momentfy.com</p>
      </div>
      <div class="text-end">
        <span class="text-[8px] px-1.5 py-0.5 rounded bg-secondary-500/15 text-secondary-600 font-semibold">{{ t.plan }}</span>
        <p class="text-[8px] text-gray-400 mt-0.5">{{ t.stats }}</p>
      </div>
    </div>
  </div>

  <!-- ════ Bilingual / RTL ════ -->
  <div v-else-if="id === 'i18n'" class="w-full grid grid-cols-2 gap-3">
    <div class="rounded-lg border border-black/10 dark:border-white/10 p-3" dir="ltr">
      <div class="flex items-center justify-between mb-2">
        <span class="text-[10px] text-gray-400">EN · LTR</span>
        <span class="text-[9px] px-1.5 py-0.5 rounded bg-sky-500/15 text-sky-600 font-semibold">English</span>
      </div>
      <p class="text-[11px] font-bold">Welcome back, Lina</p>
      <p class="text-[9px] text-gray-500 mt-1">Today · Apr 18</p>
      <p class="text-lg font-black mt-2">SAR 1,284.50</p>
      <div class="mt-2 h-1 rounded-full bg-secondary-500/20"><div class="h-full w-3/4 rounded-full bg-secondary-500" /></div>
    </div>
    <div class="rounded-lg border border-black/10 dark:border-white/10 p-3" dir="rtl">
      <div class="flex items-center justify-between mb-2">
        <span class="text-[10px] text-gray-400">AR · RTL</span>
        <span class="text-[9px] px-1.5 py-0.5 rounded bg-rose-500/15 text-rose-600 font-semibold">العربية</span>
      </div>
      <p class="text-[11px] font-bold">أهلاً بعودتك، لينا</p>
      <p class="text-[9px] text-gray-500 mt-1">اليوم · ١٨ أبريل</p>
      <p class="text-lg font-black mt-2">١٢٨٤٫٥٠ ر.س</p>
      <div class="mt-2 h-1 rounded-full bg-secondary-500/20"><div class="h-full w-3/4 rounded-full bg-secondary-500" /></div>
    </div>
  </div>

  <!-- ════ Self-hosted ════ -->
  <div v-else-if="id === 'self-hosted'" class="w-full">
    <div class="rounded-lg overflow-hidden bg-[#0c0c0c] border border-white/10 text-[10px] text-gray-300">
      <div class="h-6 bg-white/5 border-b border-white/10 flex items-center gap-1.5 px-2">
        <div class="size-1.5 rounded-full bg-red-400" />
        <div class="size-1.5 rounded-full bg-yellow-400" />
        <div class="size-1.5 rounded-full bg-emerald-400" />
        <span class="ms-auto text-[9px] text-gray-500">~/momentfy</span>
      </div>
      <div class="p-3 space-y-1 leading-snug">
        <p><span class="text-emerald-400">➜</span> docker compose up -d</p>
        <p class="text-gray-500">[+] Running 2/2</p>
        <p><span class="text-emerald-400">✔</span> Container momentfy-db-1 &nbsp;Started</p>
        <p><span class="text-emerald-400">✔</span> Container momentfy-app-1 Started</p>
        <p class="mt-1 text-sky-400">http://localhost:3000</p>
      </div>
    </div>
  </div>

  <!-- ════ ZATCA ════ -->
  <div v-else-if="id === 'zatca'" class="w-full rounded-lg border border-black/10 dark:border-white/10 overflow-hidden">
    <div class="px-3 py-2 bg-emerald-500/10 border-b border-emerald-500/20 flex items-center gap-1.5">
      <UIcon name="i-lucide-shield-check" class="size-3.5 text-emerald-600" />
      <span class="text-[10px] font-bold text-emerald-700 dark:text-emerald-400">ZATCA — Cleared</span>
      <span class="ms-auto text-[9px] text-gray-500">UUID-a8f2…</span>
    </div>
    <div class="p-3 flex gap-3">
      <div class="flex-1 space-y-1 text-[10px]">
        <p class="font-bold">Invoice INV-00128</p>
        <p class="text-gray-500">Seller: 300012345600003</p>
        <p class="text-gray-500">VAT: <span class="">65.00</span></p>
        <p class="text-gray-500">Total: <span class="font-bold">500.00</span></p>
        <div class="mt-1.5 inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-600 text-[9px] font-bold">
          <UIcon name="i-lucide-check" class="size-2.5" /> Signed · Stamped
        </div>
      </div>
      <!-- QR mock -->
      <div class="size-16 rounded grid grid-cols-6 grid-rows-6 gap-px bg-gray-900 p-1 shrink-0">
        <div v-for="n in 36" :key="n" class="rounded-[1px]" :class="[0,2,4,5,7,10,12,15,17,18,20,22,25,27,29,31,33,35].includes(n) ? 'bg-white' : 'bg-gray-900'" />
      </div>
    </div>
  </div>

  <!-- ════ ETA ════ -->
  <div v-else-if="id === 'eta'" class="w-full rounded-lg border border-black/10 dark:border-white/10 overflow-hidden">
    <div class="px-3 py-2 bg-amber-500/10 border-b border-amber-500/20 flex items-center gap-1.5">
      <UIcon name="i-lucide-file-check" class="size-3.5 text-amber-600" />
      <span class="text-[10px] font-bold text-amber-700 dark:text-amber-400">ETA · Egypt Tax Authority</span>
    </div>
    <div class="p-3 space-y-1.5">
      <div
        v-for="s in [
          { l: 'Validated', ok: true },
          { l: 'Submitted', ok: true },
          { l: 'Accepted', ok: true },
          { l: 'Cleared', ok: false }
        ]" :key="s.l"
        class="flex items-center gap-2"
      >
        <div class="size-4 rounded-full flex items-center justify-center" :class="s.ok ? 'bg-emerald-500 text-white' : 'bg-gray-200 dark:bg-white/10 text-gray-400'">
          <UIcon :name="s.ok ? 'i-lucide-check' : 'i-lucide-clock'" class="size-2.5" />
        </div>
        <span class="text-[10px] font-semibold" :class="s.ok ? '' : 'text-gray-400'">{{ s.l }}</span>
        <span v-if="s.ok" class="ms-auto text-[9px] text-gray-400">14:32:10</span>
      </div>
    </div>
  </div>

  <!-- ════ AI Assistant ════ -->
  <div v-else-if="id === 'ai'" class="w-full space-y-2">
    <div class="flex items-start gap-2">
      <div class="size-6 rounded-full bg-black/10 dark:bg-white/10 flex items-center justify-center shrink-0">
        <UIcon name="i-lucide-user" class="size-3 text-gray-500" />
      </div>
      <div class="flex-1 rounded-lg rounded-ss-sm bg-gray-100 dark:bg-white/5 p-2 text-[11px]">
        Can I book a facial this Friday evening?
      </div>
    </div>
    <div class="flex items-start gap-2">
      <div class="size-6 rounded-full bg-gradient-to-br from-violet-400 to-indigo-600 flex items-center justify-center shrink-0">
        <UIcon name="i-lucide-sparkles" class="size-3 text-white" />
      </div>
      <div class="flex-1 rounded-lg rounded-ss-sm bg-violet-500/10 border border-violet-500/20 p-2 text-[11px]">
        <p>Yes — Lina has <b>18:30</b> open, Noura has <b>19:00</b>. Want me to book one?</p>
        <div class="mt-1.5 flex gap-1">
          <span class="text-[9px] px-1.5 py-0.5 rounded bg-violet-500 text-white font-semibold">Book 18:30</span>
          <span class="text-[9px] px-1.5 py-0.5 rounded bg-black/10 dark:bg-white/10 font-semibold">19:00</span>
        </div>
      </div>
    </div>
  </div>

  <!-- ════ Reviews & Loyalty ════ -->
  <div v-else-if="id === 'reviews-loyalty'" class="w-full space-y-2">
    <div class="p-3 rounded-lg border border-black/10 dark:border-white/10">
      <div class="flex items-center gap-1 mb-1.5">
        <UIcon v-for="n in 5" :key="n" name="i-lucide-star" class="size-3 text-amber-500" />
        <span class="ms-auto text-[10px] text-gray-400">2d ago</span>
      </div>
      <p class="text-[10px] font-medium">"Best service in town, always leave happy."</p>
      <p class="text-[9px] text-gray-500 mt-1">— Lina H. · verified visit</p>
    </div>
    <div class="p-3 rounded-lg bg-gradient-to-br from-secondary-500 to-secondary-700 text-white">
      <div class="flex items-center justify-between">
        <span class="text-[10px] font-bold uppercase opacity-80">Loyalty</span>
        <UIcon name="i-lucide-award" class="size-3.5" />
      </div>
      <p class="mt-1 text-xl font-black">1,240 <span class="text-[9px] opacity-70">pts</span></p>
      <div class="mt-1.5 h-1 bg-white/20 rounded-full overflow-hidden"><div class="h-full w-[62%] bg-white/80 rounded-full" /></div>
      <p class="mt-1 text-[9px] opacity-80">260 pts to Gold tier</p>
    </div>
  </div>

  <!-- ════ Dental Chart (odontogram mock) ════ -->
  <div v-else-if="id === 'dental'" class="w-full">
    <p class="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2">Odontogram · Upper R</p>
    <div class="flex gap-1 justify-center">
      <div v-for="(t, i) in [
        { n: 18, s: 'ok' }, { n: 17, s: 'filled' }, { n: 16, s: 'ok' }, { n: 15, s: 'caries' }, { n: 14, s: 'ok' }, { n: 13, s: 'ok' }, { n: 12, s: 'crown' }, { n: 11, s: 'ok' }
      ]" :key="i" class="flex-1 flex flex-col items-center gap-0.5">
        <span class="text-[8px] text-gray-400">{{ t.n }}</span>
        <div class="w-full aspect-square rounded-md border relative" :class="{
          'border-gray-300 bg-white dark:bg-white/5 dark:border-white/20': t.s === 'ok',
          'border-amber-400 bg-amber-100 dark:bg-amber-500/20': t.s === 'filled',
          'border-red-400 bg-red-100 dark:bg-red-500/20': t.s === 'caries',
          'border-sky-400 bg-sky-100 dark:bg-sky-500/20': t.s === 'crown'
        }" />
      </div>
    </div>
    <div class="mt-3 flex flex-wrap gap-2 text-[9px]">
      <span class="inline-flex items-center gap-1"><span class="size-2 rounded-sm bg-amber-400" />Filled</span>
      <span class="inline-flex items-center gap-1"><span class="size-2 rounded-sm bg-red-400" />Caries</span>
      <span class="inline-flex items-center gap-1"><span class="size-2 rounded-sm bg-sky-400" />Crown</span>
    </div>
  </div>

  <!-- ════ Medical Record / EMR ════ -->
  <div v-else-if="id === 'medical'" class="w-full">
    <div class="rounded-lg bg-white dark:bg-[#0c0c0c] border border-black/10 dark:border-white/10 p-3 text-[10px]">
      <div class="flex items-center justify-between mb-2">
        <div class="flex items-center gap-1.5">
          <UIcon name="i-lucide-heart-pulse" class="size-3.5 text-red-500" />
          <span class="font-bold">Visit · SOAP note</span>
        </div>
        <span class="text-gray-400">18 Apr · 14:30</span>
      </div>
      <div class="space-y-1.5">
        <p><span class="font-bold text-secondary-500">S</span> — patient reports headache · 3 days</p>
        <p><span class="font-bold text-secondary-500">O</span> — BP 120/80 · HR 76 · Temp 37.1°C</p>
        <p><span class="font-bold text-secondary-500">A</span> — tension-type headache</p>
        <p><span class="font-bold text-secondary-500">P</span> — ibuprofen 400mg · review 1wk</p>
      </div>
      <div class="mt-2 flex gap-1.5 pt-2 border-t border-black/5 dark:border-white/10">
        <span class="text-[9px] px-1.5 py-0.5 rounded bg-red-500/15 text-red-600 font-semibold">Allergies · 1</span>
        <span class="text-[9px] px-1.5 py-0.5 rounded bg-sky-500/15 text-sky-600 font-semibold">Rx · 1</span>
      </div>
    </div>
  </div>

  <!-- ════ Barber queue ════ -->
  <div v-else-if="id === 'barber'" class="w-full">
    <div class="flex items-center justify-between mb-2">
      <p class="text-[10px] font-bold uppercase tracking-wider text-gray-500">Walk-in queue</p>
      <span class="text-[9px] text-gray-400">Now: 14:32</span>
    </div>
    <div class="space-y-1.5">
      <div
        v-for="(q, i) in [
          { p: 1, n: 'Ahmad', w: '0m', c: 'bg-emerald-500' },
          { p: 2, n: 'Yusuf', w: '4m', c: 'bg-amber-500' },
          { p: 3, n: 'Omar', w: '12m', c: 'bg-gray-400' },
          { p: 4, n: 'Rayan', w: '18m', c: 'bg-gray-400' }
        ]" :key="i"
        class="flex items-center gap-2 p-2 rounded-lg bg-white dark:bg-[#0c0c0c] border border-black/5 dark:border-white/10"
      >
        <div class="size-6 rounded-full text-white text-[10px] font-black flex items-center justify-center" :class="q.c">{{ q.p }}</div>
        <span class="text-[11px] font-bold flex-1">{{ q.n }}</span>
        <span class="text-[10px] text-gray-500">wait {{ q.w }}</span>
      </div>
    </div>
  </div>

  <!-- ════ Fitness / Classes ════ -->
  <div v-else-if="id === 'fitness'" class="w-full space-y-1.5">
    <div
      v-for="c in [
        { n: 'Yoga Flow', t: '07:00', seats: 14, cap: 16, c: 'from-emerald-400 to-teal-500' },
        { n: 'HIIT Blast', t: '08:30', seats: 12, cap: 12, c: 'from-orange-400 to-red-500', full: true },
        { n: 'Pilates', t: '18:00', seats: 8, cap: 15, c: 'from-violet-400 to-fuchsia-500' }
      ]" :key="c.n"
      class="p-2 rounded-lg bg-white dark:bg-[#0c0c0c] border border-black/5 dark:border-white/10"
    >
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="w-1 h-8 rounded-full bg-gradient-to-b" :class="c.c" />
          <div>
            <p class="text-[11px] font-bold">{{ c.n }}</p>
            <p class="text-[9px] text-gray-400">{{ c.t }}</p>
          </div>
        </div>
        <div class="text-end">
          <p class="text-[10px] font-bold">{{ c.seats }}/{{ c.cap }}</p>
          <span v-if="c.full" class="text-[8px] px-1.5 py-0.5 rounded bg-red-500/15 text-red-600 font-bold">WAITLIST</span>
          <span v-else class="text-[8px] px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-600 font-bold">OPEN</span>
        </div>
      </div>
    </div>
  </div>

  <!-- ════ Pet / Vet ════ -->
  <div v-else-if="id === 'pet'" class="w-full">
    <div class="rounded-lg bg-white dark:bg-[#0c0c0c] border border-black/10 dark:border-white/10 p-3">
      <div class="flex items-center gap-2 mb-2">
        <div class="size-9 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white">
          <UIcon name="i-lucide-paw-print" class="size-4" />
        </div>
        <div class="flex-1">
          <p class="text-[11px] font-bold">Max · Golden Retriever</p>
          <p class="text-[9px] text-gray-500">Age 4 · 28 kg · Client: Lina H.</p>
        </div>
      </div>
      <div class="space-y-1 text-[10px]">
        <div class="flex items-center justify-between p-1.5 rounded bg-emerald-500/10">
          <span class="flex items-center gap-1"><UIcon name="i-lucide-shield-check" class="size-3 text-emerald-600" />Rabies</span>
          <span class="text-emerald-700 dark:text-emerald-400">valid · Jul 26</span>
        </div>
        <div class="flex items-center justify-between p-1.5 rounded bg-amber-500/10">
          <span class="flex items-center gap-1"><UIcon name="i-lucide-alert-triangle" class="size-3 text-amber-600" />DHPP</span>
          <span class="text-amber-700 dark:text-amber-400">due · May 12</span>
        </div>
        <div class="flex items-center justify-between p-1.5 rounded bg-sky-500/10">
          <span class="flex items-center gap-1"><UIcon name="i-lucide-scissors" class="size-3 text-sky-600" />Grooming</span>
          <span class="text-sky-700 dark:text-sky-400">Monthly · SAR 150</span>
        </div>
      </div>
    </div>
  </div>

  <!-- ════ fallback: abstract visual using color ════ -->
  <div v-else class="w-full space-y-2">
    <div class="h-2 rounded-full bg-black/10 dark:bg-white/10"><div class="h-full rounded-full bg-gradient-to-r w-3/4" :class="color" /></div>
    <div class="h-2 rounded-full bg-black/10 dark:bg-white/10"><div class="h-full rounded-full bg-gradient-to-r w-1/2" :class="color" /></div>
    <div class="h-2 rounded-full bg-black/10 dark:bg-white/10"><div class="h-full rounded-full bg-gradient-to-r w-[85%]" :class="color" /></div>
  </div>
</template>
