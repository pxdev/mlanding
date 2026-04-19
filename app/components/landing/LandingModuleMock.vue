<script setup lang="ts">
defineProps<{ id: string; color?: string }>()
</script>

<template>
  <!-- ════ Calendar ════ -->
  <div v-if="id === 'calendar'" class="w-full">
    <div class="flex items-center justify-between mb-3">
      <p class="text-[10px] font-bold uppercase tracking-wider text-gray-500">Tue · Apr 18 · 3 staff</p>
      <div class="flex -space-x-1.5">
        <div class="size-5 rounded-full bg-gradient-to-br from-pink-400 to-rose-500 ring-2 ring-white dark:ring-[#0c0c0c]" />
        <div class="size-5 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 ring-2 ring-white dark:ring-[#0c0c0c]" />
        <div class="size-5 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 ring-2 ring-white dark:ring-[#0c0c0c]" />
      </div>
    </div>
    <div class="grid grid-cols-8 text-[8px] text-gray-400 mb-1 gap-px">
      <div v-for="h in ['9', '10', '11', '12', '13', '14', '15', '16']" :key="h">{{ h }}</div>
    </div>
    <div class="space-y-1.5">
      <div class="relative h-7 rounded bg-gray-100 dark:bg-white/5">
        <div class="absolute inset-y-0.5 start-[8%] w-[22%] rounded bg-gradient-to-r from-pink-400 to-rose-500 text-[9px] text-white px-1.5 flex items-center font-medium">Color & Cut</div>
        <div class="absolute inset-y-0.5 start-[45%] w-[30%] rounded bg-gradient-to-r from-violet-400 to-fuchsia-500 text-[9px] text-white px-1.5 flex items-center font-medium">Facial · Lina</div>
      </div>
      <div class="relative h-7 rounded bg-gray-100 dark:bg-white/5">
        <div class="absolute inset-y-0.5 start-[14%] w-[25%] rounded bg-gradient-to-r from-sky-400 to-indigo-500 text-[9px] text-white px-1.5 flex items-center font-medium">Consult</div>
        <div class="absolute inset-y-0.5 start-[58%] w-[32%] rounded bg-gradient-to-r from-emerald-400 to-teal-500 text-[9px] text-white px-1.5 flex items-center font-medium">Deep Tissue</div>
      </div>
      <div class="relative h-7 rounded bg-gray-100 dark:bg-white/5">
        <div class="absolute inset-y-0.5 start-[5%] w-[14%] rounded bg-gradient-to-r from-amber-400 to-orange-500 text-[9px] text-white px-1.5 flex items-center font-medium">Trim</div>
        <div class="absolute inset-y-0.5 start-[24%] w-[18%] rounded bg-gradient-to-r from-amber-400 to-orange-500 text-[9px] text-white px-1.5 flex items-center font-medium">Shave</div>
        <div class="absolute inset-y-0.5 start-[70%] w-[20%] rounded border border-dashed border-cyan-500 text-[9px] text-cyan-600 px-1.5 flex items-center">Free</div>
      </div>
    </div>
  </div>

  <!-- ════ Sales / POS ════ -->
  <div v-else-if="id === 'sales'" class="w-full">
    <div class="rounded-xl bg-white dark:bg-[#0c0c0c] border border-black/10 dark:border-white/10 p-3">
      <div class="flex items-center justify-between mb-2">
        <p class="text-[10px] font-bold">Ticket #0218</p>
        <span class="text-[9px] text-gray-400">14:32</span>
      </div>
      <div class="space-y-1.5 text-xs">
        <div class="flex justify-between"><span class="text-gray-600 dark:text-gray-400">Color & Cut</span><span class="font-semibold">180.00</span></div>
        <div class="flex justify-between"><span class="text-gray-600 dark:text-gray-400">Deep Conditioner</span><span class="font-semibold">45.00</span></div>
        <div class="flex justify-between text-gray-400"><span>Member 15%</span><span>−33.75</span></div>
        <div class="border-t border-black/5 dark:border-white/10 pt-1.5 flex justify-between items-baseline">
          <span class="text-xs font-bold">Total</span>
          <span class="text-lg font-black">SAR 191.25</span>
        </div>
      </div>
    </div>
    <div class="mt-2 grid grid-cols-4 gap-1.5">
      <div class="aspect-square rounded-md bg-emerald-500/15 text-emerald-600 flex flex-col items-center justify-center">
        <UIcon name="i-lucide-banknote" class="size-3.5" />
        <span class="text-[9px] mt-0.5 font-semibold">Cash</span>
      </div>
      <div class="aspect-square rounded-md bg-sky-500/15 text-sky-600 flex flex-col items-center justify-center">
        <UIcon name="i-lucide-credit-card" class="size-3.5" />
        <span class="text-[9px] mt-0.5 font-semibold">Card</span>
      </div>
      <div class="aspect-square rounded-md bg-violet-500/15 text-violet-600 flex flex-col items-center justify-center text-[9px] font-black">Tabby</div>
      <div class="aspect-square rounded-md bg-amber-500/15 text-amber-600 flex flex-col items-center justify-center text-[9px] font-black">Tamara</div>
    </div>
  </div>

  <!-- ════ Clients / CRM ════ -->
  <div v-else-if="id === 'clients'" class="w-full space-y-1.5">
    <div
      v-for="c in [
        { n: 'Lina Hassan', init: 'LH', tag: 'VIP', color: 'from-pink-400 to-rose-500', visits: '24 visits', spend: 'SAR 12,840' },
        { n: 'Karim Malek', init: 'KM', tag: 'Returning', color: 'from-sky-400 to-indigo-500', visits: '8 visits', spend: 'SAR 3,200' },
        { n: 'Noura Saeed', init: 'NS', tag: 'New', color: 'from-emerald-400 to-teal-500', visits: '1 visit', spend: 'SAR 450' }
      ]" :key="c.init"
      class="flex items-center gap-2.5 p-2 rounded-lg bg-white dark:bg-[#0c0c0c] border border-black/5 dark:border-white/10"
    >
      <div class="size-8 rounded-full bg-gradient-to-br flex items-center justify-center text-white text-[10px] font-black" :class="c.color">{{ c.init }}</div>
      <div class="flex-1 min-w-0">
        <p class="text-xs font-bold truncate">{{ c.n }}</p>
        <p class="text-[9px] text-gray-500">{{ c.visits }}</p>
      </div>
      <div class="text-end">
        <p class="text-xs font-bold">{{ c.spend }}</p>
        <span class="text-[8px] px-1.5 py-0.5 rounded-full bg-black/5 dark:bg-white/10 text-gray-600 dark:text-gray-300 font-semibold">{{ c.tag }}</span>
      </div>
    </div>
  </div>

  <!-- ════ Catalogue ════ -->
  <div v-else-if="id === 'catalogue'" class="w-full grid grid-cols-2 gap-2">
    <div v-for="s in [
      { n: 'Color & Cut', d: '90 min', p: '180', g: 'from-pink-400 to-rose-500' },
      { n: 'Deep Tissue', d: '60 min', p: '240', g: 'from-emerald-400 to-teal-500' },
      { n: 'Facial Glow', d: '45 min', p: '150', g: 'from-violet-400 to-fuchsia-500' },
      { n: 'Nail Art', d: '30 min', p: '95', g: 'from-sky-400 to-indigo-500' }
    ]" :key="s.n"
      class="relative p-3 rounded-lg border border-black/5 dark:border-white/10 overflow-hidden"
    >
      <div aria-hidden="true" class="absolute inset-0 bg-gradient-to-br opacity-15" :class="s.g" />
      <div class="relative">
        <p class="text-xs font-bold truncate">{{ s.n }}</p>
        <p class="text-[9px] text-gray-500">{{ s.d }}</p>
        <p class="mt-2 text-sm font-black">SAR {{ s.p }}</p>
      </div>
    </div>
  </div>

  <!-- ════ Inventory ════ -->
  <div v-else-if="id === 'inventory'" class="w-full space-y-1.5">
    <div
      v-for="p in [
        { n: 'Shampoo Gold', sku: 'SHG-250', qty: 42, max: 60, c: 'emerald' },
        { n: 'Hair Color #4', sku: 'HCL-04', qty: 8, max: 30, c: 'amber' },
        { n: 'Nail Polish 12', sku: 'NPL-12', qty: 2, max: 25, c: 'red' },
        { n: 'Conditioner XL', sku: 'CND-XL', qty: 28, max: 40, c: 'emerald' }
      ]" :key="p.sku"
      class="p-2 rounded-lg bg-white dark:bg-[#0c0c0c] border border-black/5 dark:border-white/10"
    >
      <div class="flex items-center justify-between text-xs">
        <div>
          <p class="font-bold">{{ p.n }}</p>
          <p class="text-[9px] text-gray-400">{{ p.sku }}</p>
        </div>
        <p class="text-xs font-black" :class="{
          'text-emerald-500': p.c === 'emerald',
          'text-amber-500': p.c === 'amber',
          'text-red-500': p.c === 'red'
        }">{{ p.qty }}<span class="text-[9px] text-gray-400 font-normal">/{{ p.max }}</span></p>
      </div>
      <div class="mt-1.5 h-1 rounded-full bg-black/5 dark:bg-white/5 overflow-hidden">
        <div class="h-full rounded-full" :class="{
          'bg-emerald-500': p.c === 'emerald',
          'bg-amber-500': p.c === 'amber',
          'bg-red-500': p.c === 'red'
        }" :style="{ width: `${(p.qty / p.max) * 100}%` }" />
      </div>
    </div>
  </div>

  <!-- ════ Team / HR ════ -->
  <div v-else-if="id === 'team'" class="w-full space-y-2">
    <div
      v-for="m in [
        { n: 'Lina Hassan', r: 'Senior Stylist', init: 'LH', c: 'from-pink-400 to-rose-500', hrs: '38h', ok: true },
        { n: 'Karim Malek', r: 'Barber', init: 'KM', c: 'from-sky-400 to-indigo-500', hrs: '40h', ok: true },
        { n: 'Noura Saeed', r: 'Receptionist', init: 'NS', c: 'from-emerald-400 to-teal-500', hrs: '32h', ok: false }
      ]" :key="m.init"
      class="flex items-center gap-2.5 p-2 rounded-lg bg-white dark:bg-[#0c0c0c] border border-black/5 dark:border-white/10"
    >
      <div class="size-9 rounded-xl bg-gradient-to-br flex items-center justify-center text-white text-[10px] font-black" :class="m.c">{{ m.init }}</div>
      <div class="flex-1 min-w-0">
        <p class="text-xs font-bold truncate">{{ m.n }}</p>
        <p class="text-[9px] text-gray-500">{{ m.r }}</p>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-[10px] font-semibold">{{ m.hrs }}</span>
        <span class="size-2 rounded-full" :class="m.ok ? 'bg-emerald-500' : 'bg-amber-500'" />
      </div>
    </div>
  </div>

  <!-- ════ Accounting ════ -->
  <div v-else-if="id === 'accounting'" class="w-full">
    <div class="rounded-lg border border-black/10 dark:border-white/10 overflow-hidden text-[10px]">
      <div class="grid grid-cols-[1fr_auto_auto] gap-3 px-3 py-1.5 bg-gray-50 dark:bg-white/5 font-bold">
        <span>Account</span><span>DR</span><span>CR</span>
      </div>
      <div v-for="(r, i) in [
        { a: '1100 · Cash', dr: '500.00', cr: '' },
        { a: '4000 · Service rev.', dr: '', cr: '435.00' },
        { a: '2300 · VAT payable', dr: '', cr: '65.00' },
        { a: '5100 · COGS', dr: '120.00', cr: '' },
        { a: '1300 · Inventory', dr: '', cr: '120.00' }
      ]" :key="i" class="grid grid-cols-[1fr_auto_auto] gap-3 px-3 py-1 border-t border-black/5 dark:border-white/10">
        <span class="truncate">{{ r.a }}</span>
        <span class="tabular-nums font-semibold text-emerald-600 dark:text-emerald-400">{{ r.dr }}</span>
        <span class="tabular-nums font-semibold text-rose-600 dark:text-rose-400">{{ r.cr }}</span>
      </div>
      <div class="grid grid-cols-[1fr_auto_auto] gap-3 px-3 py-1.5 bg-gray-50 dark:bg-white/5 border-t-2 border-black dark:border-white font-black">
        <span>Balance</span>
        <span class="tabular-nums">620.00</span>
        <span class="tabular-nums">620.00</span>
      </div>
    </div>
  </div>

  <!-- ════ Reports ════ -->
  <div v-else-if="id === 'reports'" class="w-full">
    <p class="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2">Monthly revenue</p>
    <div class="flex items-end gap-1.5 h-28">
      <div v-for="(b, i) in [42, 58, 38, 72, 55, 84, 66, 92, 78, 96, 88, 100]" :key="i"
        class="flex-1 rounded-t bg-gradient-to-t from-secondary-500 to-secondary-300 relative group"
        :style="{ height: `${b}%` }"
      >
        <div v-if="i === 11" class="absolute -top-5 inset-x-0 text-center text-[9px] font-black text-secondary-600">SAR 48k</div>
      </div>
    </div>
    <div class="mt-1.5 flex justify-between text-[8px] text-gray-400">
      <span v-for="m in ['May', '', '', 'Aug', '', '', 'Nov', '', '', 'Feb', '', 'Apr']" :key="m">{{ m }}</span>
    </div>
  </div>

  <!-- ════ Client Portal ════ -->
  <div v-else-if="id === 'portal'" class="w-full flex justify-center">
    <div class="w-36 aspect-[9/19] rounded-[1.5rem] p-1.5 bg-primary">
      <div class="w-full h-full rounded-[1.2rem] bg-white dark:bg-[#0c0c0c] overflow-hidden p-2">
        <div class="flex items-center gap-1.5 mb-2">
          <div class="size-4 rounded bg-gradient-to-br from-secondary-400 to-secondary-600" />
          <span class="text-[8px] font-bold">Lina's Spa</span>
        </div>
        <div class="rounded-lg bg-gradient-to-br from-secondary-500 to-secondary-700 text-white p-1.5 mb-1.5">
          <p class="text-[7px] opacity-80">Loyalty</p>
          <p class="text-sm font-black">1,240</p>
        </div>
        <div class="p-1.5 rounded-md border border-black/5 dark:border-white/10 mb-1">
          <p class="text-[7px] font-bold">Color & Cut</p>
          <p class="text-[7px] text-gray-500">Tue · 14:00</p>
        </div>
        <div class="grid grid-cols-3 gap-1">
          <div v-for="n in 3" :key="n" class="aspect-square rounded-sm bg-gray-100 dark:bg-white/5" />
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
        <p class="text-[8px] text-gray-400">{{ t.s }}.momentfy.io</p>
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
      <p class="text-lg font-black mt-2">$1,284.50</p>
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
        <p class="text-gray-500">[+] Running 3/3</p>
        <p><span class="text-emerald-400">✔</span> momentfy-db Started</p>
        <p><span class="text-emerald-400">✔</span> momentfy-app Started</p>
        <p><span class="text-emerald-400">✔</span> momentfy-nginx Started</p>
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
          <span class="flex items-center gap-1"><UIcon name="i-lucide-home" class="size-3 text-sky-600" />Boarding</span>
          <span class="text-sky-700 dark:text-sky-400">3 nights · SAR 450</span>
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
