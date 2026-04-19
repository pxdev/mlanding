// Bilingual copy for the marketing / landing pages.
// Kept as a self-contained composable (not in the main i18n JSON files) so the
// landing site can evolve without touching app localisation.

type Module = { id: string; label: string; blurb: string }
type Addon = { key: string; label: string; desc: string; tag?: string }
type AddonDetail = {
  long: string              // 2–3 sentence elaboration on `Addon.desc`
  bullets: string[]         // 5–7 feature bullets
  whoFor: string            // 1-sentence target audience
  setupSteps: string[]      // 3–5 install/enable steps
  integrates: string[]      // related module/add-on labels that pair with it
  useCases?: string[]       // optional: 2–3 example operator scenarios
}
// Solutions / fields-of-work pages (footer's "Solutions" column).
// Each entry powers /portal/solutions/<slug> and combines an industry vertical
// with the concrete add-ons/modules it bundles.
type SolutionDetail = {
  title: string             // display title
  tagline: string           // short one-liner under the hero
  icon: string              // lucide icon name
  accent: string            // tailwind gradient classes, e.g. 'from-pink-500 to-rose-600'
  dot: string               // small dot color, e.g. 'bg-rose-500'
  category: string          // "Industry" | "Business shape" etc — appears as eyebrow
  long: string              // 2–4 sentence overview paragraph
  pains: string[]           // 3–5 operator pain points this solution removes
  capabilities: string[]    // 6–8 capability bullets
  stack: string[]           // modules + add-ons bundled (chips)
  stats: { k: string; v: string }[]   // 3 illustrative benchmark stats
  whoFor: string            // one sentence target audience
  useCases: string[]        // 3–4 scenario bullets
  faq?: { q: string; a: string }[]     // optional mini-FAQ (2–3 items)
}
type Industry = { id: string; label: string; tagline?: string }
type Plan = {
  name: string; tag: string; price: string; priceSuffix: string; cta: string;
  featured?: boolean; mostPopular?: string; features: string[];
  // Pricing section emphasises installation scope (you install vs we install).
  // Both plans ship lifetime updates; the bar visualises install coverage.
  durationValue: string      // e.g. '∞' (both plans highlight lifetime updates)
  durationLabel: string      // e.g. 'LIFETIME UPDATES'
  durationProgress: number   // 0–100, how much of the install we cover (visual bar)
  tagline: string            // short one-liner under the price
}
type Feature = { id: string; group: string; title: string; summary: string; bullets: string[] }
type Stat = { k: string; v: string }

type Copy = {
  dir: 'ltr' | 'rtl'
  nav: {
    features: string; addons: string; showcase: string; pricing: string; faq: string; docs: string;
    signIn: string; getCode: string; langLabel: string
  }
  hero: {
    badge: string; h1a: string; highlight: string; h1b: string; sub: string; subStrong: string;
    primary: string; secondary: string; trust: string[]
    chips: { zatca: { tag: string; msg: string }; ai: { tag: string; msg: string } }
    chromeUrl: string
    statsStrip: Stat[]
  }
  why: { eyebrow: string; h2a: string; h2b: string; body: string; items: { title: string; body: string }[] }
  modules: { eyebrow: string; heading: string; sub: string; linkAll: string; items: Module[] }
  industries: { eyebrow: string; heading: string; sub: string; items: Industry[] }
  addons: { eyebrow: string; heading: string; sub: string; linkAll: string; items: Addon[] }
  addonDetails: Record<string, AddonDetail>
  solutionDetails: Record<string, SolutionDetail>
  portal: { eyebrow: string; heading: string; sub: string; bullets: string[]; cta: string; cardTag: string; welcomeBack: string; loyalty: string; ptsShort: string; nextAppt: string; quickActions: string; actionBook: string; actionInvoices: string; actionRx: string; askAi: string; apptTitle: string; apptMeta: string; apptStatus: string }
  pricing: {
    eyebrow: string; heading: string; sub: string; plans: Plan[]; footer: string;
    billing: { onetime: string; updates: string; save: string };
    // Shared features list — the same in every plan
    includedAllLabel: string
    includedAll: string[]
    windowLabel: string
    durationAxisStart: string
    durationAxisEndForever: string
  }
  testimonials: {
    eyebrow: string; heading: string;
    items: { quote: string; name: string; role: string }[]
    disclaimer: string  // "Illustrative — named case studies coming soon"
  }
  trust: {
    eyebrow: string; heading: string; sub: string
    pillars: { title: string; body: string; icon: string }[]
  }
  faq: { eyebrow: string; heading: string; items: { q: string; a: string }[]; linkAll: string }
  cta: { eyebrow: string; heading: string; sub: string; buy: string; explore: string; lifetime: string; unlimited: string; updates: string }
  footer: { tag: string; badge: string; columns: { title: string; links: { label: string; to: string }[] }[]; bottom: string; bottomLang: string; bottomHost: string }

  // Shared UI strings — used across detail pages, landing chrome and mocks
  ui: {
    // Global / a11y
    skipToMain: string
    backToTop: string
    readAbout: string          // appears as "Read about {title}" — prefix only
    exploreVerb: string        // "Explore" + {title}
    illustrative: string
    illustrativeBenchmarks: string
    includedInEveryPlan: string

    // Module & add-on detail pages
    breadcrumbFeatures: string
    breadcrumbAddons: string
    coreModule: string
    addonCategorySuffix: string    // "add-on" — appears as "{cat} add-on"
    whatItDoes: string
    whatItLooksLike: string
    livePreviewPrefix: string      // "A live preview of the " + module name + " module."
    livePreviewSuffix: string      // " module."
    worksBestWith: string
    worksBestWithBody: string
    betterTogether: string
    keyCapabilities: string
    everyMovingPart: string
    whoItsFor: string
    setupTitle: string
    setupBody: string
    fromDisabledToLive: string
    integratesWith: string
    integratesBody: string
    moreFromCategoryPrefix: string  // "More from " + category
    exploreTheChapter: string
    previousModule: string
    nextModule: string
    previousAddon: string
    nextAddon: string

    // Not-found fallbacks
    moduleNotFoundEyebrow: string
    addonNotFoundEyebrow: string
    noModuleWithId: string
    noAddonWithKey: string
    checkUrlFeatures: string
    checkUrlAddons: string
    browseAllFeatures: string
    browseAllAddons: string

    // Payments labels
    currencyLabel: string
    methodsLabel: string
    processorLabel: string

    // Footer colophon
    colVer: string
    colLang: string
    colHost: string
    colStat: string

    // Home-specific
    chaptersLabel: string
    appRatingLabel: string
    timeToBookLabel: string
    pwaReadyLabel: string
    offlineLabel: string
    revenueLabel: string
    oneSourceThreeBrands: string
    threeBrandsTagline: string
    cantFindFaq: string

    // Hero video preview
    liveDemo: string
    watchTourLead: string          // "Watch the " + duration + " product tour"
    watchTourSuffix: string        // " product tour"
    tourChapters: string           // "Calendar → POS → Client portal → ZATCA invoice. Under three minutes."
    demoChip: string

    // Download + docs closers
    fromZeroToLive: string
    readyKicker: string            // "Ready?"
    buyCloneTagline: string
    readLicense: string
    fullFaq: string
    stepLabel: string
    swipeHint: string
    explorerPaused: string  // "paused · hover to resume"
    explorerAutoPrefix: string  // "auto · " (suffix: Ns)
    readMore: string
    allSixteenShip: string
    secureCheckout: string
    lifetimeLicense: string
    lifetimeUpdates: string

    // Video showcase section (module + add-on detail pages)
    videoSectionEyebrow: string         // "See it in motion"
    videoSectionBody: string            // one-line sub-copy under eyebrow
    videoSectionHeading: string         // headline prefix, ends with the module/add-on label
    videoSectionHeadingSuffix: string   // "— 30 seconds." or similar tail
    videoComingSoonEyebrow: string      // "Coming soon"
    videoComingSoon: string             // main body text on placeholder state
    muteVideo: string
    unmuteVideo: string
    playVideo: string
    pauseVideo: string
    mutedIndicator: string              // small pill shown while video is muted

    // Hero float-card mock content
    mockZatcaCleared: string
    mockInvoicePrefix: string   // "Invoice " + number
    mockVat: string
    mockTotal: string
    mockSigned: string
    mockAiActive: string
    mockAiDraft: string          // "Draft messages ready to send."
    mockAiSendAll: string
    mockAiReview: string
    mockThisMonth: string
    mockNetRevenue: string
  }

  // Sub-pages
  featuresPage: {
    eyebrow: string; h1: string; sub: string;
    filterAll: string; filterLabels: Record<string, string>;
    groups: Record<string, string>;
    items: Feature[]
  }
  addonsPage: {
    eyebrow: string; h1: string; sub: string;
    filterAll: string
  }
  solutionsPage: {
    eyebrow: string; h1a: string; h1b: string; sub: string
    chaptersLabel: string
    industriesLabel: string
    businessShapesLabel: string
    // Detail-page shared labels
    breadcrumb: string
    categoryIndustry: string
    categoryBusiness: string
    painsTitle: string; painsBody: string
    capsTitle: string; capsBody: string
    stackTitle: string; stackBody: string
    useCasesTitle: string; useCasesBody: string
    faqTitle: string
    ctaTitle: string; ctaBody: string; ctaPrimary: string; ctaSecondary: string
    statsNote: string
    browseAll: string
    notFoundEyebrow: string; notFoundBody: string
  }
  pricingPage: {
    eyebrow: string; h1a: string; h1b: string; sub: string;
    everywhereTitle: string; everywhereHeading: string; included: string[]
    compareEyebrow: string; compareHeading: string; compareBody: string;
    saasLabel: string; saasValue: string; saasBody: string;
    momentfyLabel: string; momentfyValue: string; momentfyBody: string;
    // Pricing-specific FAQ covering audit gaps (self-install vs done-for-you, currency, payment methods)
    faq: {
      eyebrow: string; heading: string
      items: { q: string; a: string }[]
    }
    payments: {
      eyebrow: string; heading: string; sub: string
      currency: string        // "USD primary · SAR / EGP equivalents at checkout"
      methods: string[]       // ["Visa · Mastercard · Amex", "Apple Pay · Google Pay", …]
      processor: string       // "Processed securely by Lemon Squeezy (Merchant of Record)"
    }
  }
  showcasePage: {
    eyebrow: string; h1a: string; h1b: string; sub: string;
    shipsWith: string; cta1: string; cta2: string;
    statsNote: string   // illustrative / benchmark caveat
    verticals: {
      id: string; title: string; hero: string;
      setup: string[]; stats: { k: string; v: string }[]
    }[]
  }
  downloadPage: {
    eyebrow: string; h1: string; sub: string; buy: string; talk: string;
    steps: { n: string; title: string; body: string }[];
    inside: { eyebrow: string; heading: string; body: string; items: string[] };
    changelog: { eyebrow: string; heading: string; entries: { ver: string; title: string; body: string; current?: boolean }[] };
    contact: { eyebrow: string; heading: string; sub: string; name: string; namePh: string; email: string; emailPh: string; message: string; messagePh: string; submit: string; sent: string };
    faq: { eyebrow: string; heading: string; items: { q: string; a: string }[] }
  }
  faqPage: {
    eyebrow: string; h1: string; sub: string; contactLink: string;
    sections: { title: string; items: { q: string; a: string }[] }[]
  }
  docsPage: {
    eyebrow: string; h1: string; sub: string
    sections: {
      id: string
      num: string
      title: string
      body: string
      items?: string[]      // bullet list
      kv?: { k: string; v: string }[]   // spec table
    }[]
  }
  legalPage: {
    eyebrow: string; h1: string; sub: string
    lastUpdated: string
    sections: {
      id: string
      num: string
      title: string
      body: string
      can?: string[]
      cannot?: string[]
      items?: { k: string; v: string }[]
    }[]
    companyLabel: string
    companyLines: string[]
  }
}

// ═══════════════════════════ ENGLISH ═══════════════════════════
const en: Copy = {
  dir: 'ltr',
  nav: {
    features: 'Features', addons: 'Add-ons', showcase: 'Showcase', pricing: 'Pricing', faq: 'FAQ', docs: 'Docs',
    signIn: 'Sign in', getCode: 'Get the code', langLabel: 'Language'
  },
  hero: {
    badge: 'Momentfy 1.0 is out — production-ready',
    h1a: 'The',
    highlight: 'operating system',
    h1b: 'for booking businesses.',
    sub: 'One codebase. Calendar, POS, CRM, inventory, accounting, HR, client portal and AI — in English and Arabic.',
    subStrong: 'Buy the source. Host it anywhere. Charge what you want.',
    primary: 'Get the source code',
    secondary: 'Book a demo',
    trust: ['Lifetime license', 'Unlimited tenants', 'Full source access', 'Lifetime updates'],
    chips: {
      zatca: { tag: 'ZATCA Phase 2', msg: 'Compliant invoice sent' },
      ai: { tag: 'AI Assistant', msg: 'Rebooked 4 clients' }
    },
    chromeUrl: 'app.momentfy.io / dashboard',
    statsStrip: [
      { k: '120+', v: 'dashboard pages' },
      { k: '16', v: 'modular add-ons' },
      { k: '2', v: 'languages (AR + EN)' },
      { k: '100%', v: 'source code included' }
    ]
  },
  why: {
    eyebrow: 'Why Momentfy', h2a: 'Not a SaaS you rent.', h2b: 'A codebase you own.',
    body: "Most booking platforms grow more expensive as you grow. Momentfy is the opposite: one payment, unlimited everything, deploy wherever you want — and modify any line if you need to.",
    items: [
      { title: 'Source you own', body: 'Full TypeScript codebase — Nuxt 4, Vue 3, Prisma, PostgreSQL. No obfuscation, no vendor lock-in.' },
      { title: 'Self-hosted, SaaS-ready', body: 'Run single-tenant for your own business — or flip a flag and resell it to thousands of tenants.' },
      { title: 'Bilingual, RTL-native', body: 'Arabic (RTL) and English built in from day one. Localized currency, numbers, calendars and receipts.' },
      { title: 'Compliance out of the box', body: 'ZATCA Phase 2, ETA e-invoicing, VAT, audit trail and fixed-asset depreciation — all included.' },
      { title: 'AI baked in', body: 'Vercel AI SDK assistant for booking and client portal. Bring any OpenAI-compatible provider.' },
      { title: 'Offline-ready PWA', body: 'Installable on iOS and Android. Booking and POS keep working when the network blinks.' }
    ]
  },
  modules: {
    eyebrow: 'Nine core modules', heading: 'Everything a service business runs on.',
    sub: 'Designed to work together. No integrations, no duct tape. Each module is optional per tenant.',
    linkAll: 'See every screen',
    items: [
      { id: 'calendar', label: 'Calendar', blurb: 'Drag-and-drop scheduling with drag-to-resize, multi-location, staff lanes, blocked time and resource booking.' },
      { id: 'sales', label: 'Sales & POS', blurb: 'Lightning-fast POS with tickets, recurring invoices, estimates, credit notes, gift cards, expenses and cash register.' },
      { id: 'clients', label: 'Clients & CRM', blurb: 'Rich client profiles, dynamic segments, campaigns, reviews, tickets and an AI-powered follow-up queue.' },
      { id: 'catalogue', label: 'Catalogue', blurb: 'Services, packages, memberships, products, discounts and smart-pricing rules — in one catalogue.' },
      { id: 'inventory', label: 'Inventory', blurb: 'Suppliers, purchase orders, stocktakes, transfers, stock comparison and supplier payments.' },
      { id: 'team', label: 'Team & HR', blurb: 'Members, schedules, attendance, leave, timesheets, blocked times, pay runs and commissions.' },
      { id: 'accounting', label: 'Accounting', blurb: 'Double-entry ledger, chart of accounts, journal, bills, bank reconciliation, fixed assets and audit log.' },
      { id: 'reports', label: 'Reports', blurb: 'P&L, balance sheet, cash flow, VAT, AR/AP aging, commissions, attendance, staff and client KPIs.' },
      { id: 'portal', label: 'Client Portal', blurb: 'Branded PWA per tenant. Clients book, pay invoices, see memberships, loyalty and chat with AI.' }
    ]
  },
  industries: {
    eyebrow: 'Industries', heading: 'One platform. Every vertical.',
    sub: 'Toggle the add-ons you need. Ship a tailored product in hours — not months.',
    items: [
      { id: 'salon', label: 'Salons & Spas', tagline: 'Ready out of the box' },
      { id: 'dental', label: 'Dental Clinics', tagline: 'Ready out of the box' },
      { id: 'medical', label: 'Medical Clinics', tagline: 'Ready out of the box' },
      { id: 'barber', label: 'Barber Shops', tagline: 'Ready out of the box' },
      { id: 'fitness', label: 'Fitness & Studios', tagline: 'Ready out of the box' },
      { id: 'pet', label: 'Vet & Pet Care', tagline: 'Ready out of the box' },
      { id: 'therapy', label: 'Therapy & Coaching', tagline: 'Ready out of the box' },
      { id: 'photo', label: 'Photo & Studios', tagline: 'Ready out of the box' }
    ]
  },
  addons: {
    eyebrow: '16 add-ons', heading: 'Turn it into exactly the product you need.',
    sub: 'Each tenant picks their modules. From ZATCA compliance to DICOM imaging to AI assistants — all bundled in the source.',
    linkAll: 'All add-ons',
    items: [
      { key: 'zatca', label: 'ZATCA Phase 2', desc: 'Saudi Arabia e-invoicing with cryptographic stamp, XML signing and reporting.' },
      { key: 'eta', label: 'ETA E-invoicing', desc: 'Egypt Tax Authority compliant invoices and submission flow.' },
      { key: 'ai', label: 'AI Assistant', desc: 'Vercel AI SDK assistant in booking & client portal with OpenAI-compatible providers.' },
      { key: 'gcal', label: 'Google Calendar', desc: 'Two-way sync of appointments and blocked times with staff Google calendars.' },
      { key: 'insurance', label: 'Insurance Classes', desc: 'Insurance classes, coverage rules and claim-ready invoices for clinics.' },
      { key: 'dental', label: 'Dental Chart', desc: 'Pediatric + adult odontograms with surface-level treatment tracking.' },
      { key: 'imaging', label: 'Clinical Imaging', desc: 'DICOM viewer with annotations, attached to client records.' },
      { key: 'labs', label: 'Lab Orders', desc: 'Order lab tests, receive results, publish to client portal.' },
      { key: 'rx', label: 'Prescriptions', desc: 'Prescription authoring with patient-facing download in the portal.' },
      { key: 'records', label: 'Medical Records', desc: 'Structured EMR with SOAP notes, vitals and attachments.' },
      { key: 'resources', label: 'Resources', desc: 'Book rooms, chairs and equipment alongside staff.' },
      { key: 'loyalty', label: 'Loyalty Points', desc: 'Earning rules, redemptions, expiry and portal wallet.' },
      { key: 'followup', label: 'Follow-up Tasks', desc: 'Automated next-touch tasks assigned to members with SLA.' },
      { key: 'events', label: 'Events & Classes', desc: 'Group classes, workshops, capacity and waitlists.' },
      { key: 'attendance', label: 'Client Attendance', desc: 'Track check-ins for gyms, schools and recurring programs.' },
      { key: 'boarding', label: 'Pet Boarding', desc: 'Day-rate boarding for vets & pet resorts.' }
    ]
  },
  addonDetails: {
    zatca: {
      long: "Saudi Arabia's ZATCA Phase 2 e-invoicing mandate requires every invoice to be cryptographically signed, QR-stamped, and submitted to the Zakat, Tax and Customs Authority in real-time. Momentfy ships the complete flow — CSR, CSID issuance, UBL signing, clearance and reporting — with no external SaaS.",
      bullets: [
        "CSR generation and CSID issuance via ZATCA's production endpoints",
        'UBL 2.1 XML signing — private keys stay on your server',
        'QR code stamped on every printed and PDF invoice',
        'Real-time clearance (B2B) and reporting (B2C) flows',
        'Retry queue with actionable error surfaces in admin',
        'Full archival of cleared invoices with submission UUIDs',
        'Saudi Riyal currency glyph (U+20C1) bundled'
      ],
      whoFor: 'Any Saudi-registered business with a Tax Registration Number issuing VAT invoices.',
      setupSteps: [
        'Enter your TRN on the tenant settings page',
        'Generate a CSR in the admin (one click) and upload it to ZATCA fatoora',
        'Paste the CSID response back into Momentfy',
        'Test in sandbox, then flip to production'
      ],
      integrates: ['Sales & POS', 'Accounting', 'Client Portal']
    },
    eta: {
      long: "Egypt's ETA (Egyptian Tax Authority) requires every B2B invoice to be mapped to item/customer codes and submitted to their portal within minutes. Momentfy speaks the full ETA schema, validates before submission, and handles corrections.",
      bullets: [
        'Item and customer code mapping with bulk editor',
        'Pre-submission validation catches schema errors before the round-trip',
        'Signed submission with status tracking (submitted → accepted → cleared)',
        'Credit notes and corrections fully supported',
        'Reconciliation reports aligned to ETA quarterly filings',
        'Automatic retries on transient ETA API failures'
      ],
      whoFor: 'Any Egypt-registered business required to submit ETA e-invoices.',
      setupSteps: [
        'Obtain your ETA client secret and upload to tenant settings',
        'Map tax rates to ETA tax codes via the settings table',
        'Map top-level SKUs to ETA item codes (CSV upload)',
        'Submit a test invoice, verify acceptance, go live'
      ],
      integrates: ['Sales & POS', 'Accounting', 'Clients & CRM']
    },
    ai: {
      long: "An AI assistant built on Vercel AI SDK that lives in the client booking flow and the tenant portal. Bring your own OpenAI-compatible endpoint (OpenAI, proxies, local Ollama). The assistant is grounded in your services, hours and policies — no hallucinated appointments.",
      bullets: [
        'In-app chat widget on booking site and client portal',
        'Grounded on your real services, opening hours, staff, prices',
        'Can guide a client through booking end-to-end',
        'Per-tenant brand voice via a custom system prompt',
        'Configurable provider and model (OpenAI-compatible)',
        'Cost controls: per-tenant token budget + soft cap',
        'Usage tracking dashboard in the super-admin panel'
      ],
      whoFor: 'Any tenant that wants a 24/7 assistant without hiring extra receptionists.',
      setupSteps: [
        'Enable the AI Assistant add-on from tenant settings',
        'Paste your OpenAI-compatible API key and endpoint URL',
        'Set the monthly token budget and a brand system prompt',
        'Test in the booking site preview, then publish'
      ],
      integrates: ['Client Portal', 'Calendar', 'Clients & CRM']
    },
    gcal: {
      long: "Two-way sync between each staff member's Google Calendar and their Momentfy schedule. Appointments booked in Momentfy appear on their Google Calendar instantly; busy blocks from Google are pulled in so nobody gets double-booked.",
      bullets: [
        'Per-staff OAuth — each team member authorises their own calendar',
        'Outbound: Momentfy appointments → Google events within seconds',
        'Inbound: busy blocks from Google become blocked-time in Momentfy',
        'Timezone-aware — safe across DST and travelling staff',
        'Automatic re-sync if a member revokes and re-grants access',
        'Works with personal Gmail and Google Workspace calendars'
      ],
      whoFor: 'Teams where staff already live in Google Calendar for personal commitments.',
      setupSteps: [
        'Enable the Google Calendar add-on',
        'Create a Google Cloud project and OAuth client (one-time)',
        'Paste client ID / secret into tenant settings',
        "Each staff member clicks 'Connect my calendar' on their profile"
      ],
      integrates: ['Calendar', 'Team & HR']
    },
    insurance: {
      long: 'Insurance classes, coverage rules, and claim-ready invoices for clinics that split a single visit between patient and insurer. Every service can have per-class coverage percentages, co-pays, and visit caps.',
      bullets: [
        'Define insurance classes with tiered coverage (e.g. BUPA Gold, Tawuniya Silver)',
        'Per-service coverage percentages and per-visit caps',
        'Automatic co-pay calculation at POS checkout',
        'Claim-ready invoice exports with insurance & patient splits',
        "Client profile stores insurance class, policy number, validity",
        'Reports on insurance recovery rate per class'
      ],
      whoFor: 'Dental, medical and aesthetics clinics with mixed-insurance patients.',
      setupSteps: [
        'Create insurance classes under Catalogue → Insurance',
        'Define coverage rules per service (percentage + cap)',
        "Assign each patient's insurance class in their profile",
        'Book a visit — co-pay is calculated automatically at POS'
      ],
      integrates: ['Clients & CRM', 'Sales & POS', 'Accounting']
    },
    dental: {
      long: 'Interactive odontogram for adult and paediatric patients with surface-level tracking. Click any tooth (or surface) to log caries, fillings, crowns, extractions, or watchful waiting. Every chart entry links back to a visit for full audit.',
      bullets: [
        'FDI and Universal numbering schemes — switchable per tenant',
        '32 adult + 20 paediatric teeth with 5 surfaces each',
        'Colour-coded statuses: OK, caries, filling, crown, extracted, missing, implant, watch',
        'Timeline view: see the chart state at every past visit',
        'Treatment plans: propose, approve, execute across multiple visits',
        "Printable odontogram attached to the patient's medical record"
      ],
      whoFor: 'Dental clinics — general, paediatric, orthodontic.',
      setupSteps: [
        'Enable the Dental Chart add-on',
        'Choose FDI or Universal numbering in tenant settings',
        "Open any patient's profile — the chart tab appears",
        'Click teeth to log procedures during or after the visit'
      ],
      integrates: ['Clients & CRM', 'Medical Records', 'Calendar']
    },
    imaging: {
      long: "A built-in DICOM viewer so X-rays, panoramics, and intra-oral images live inside the patient's file — not on a separate computer. Upload a DICOM, view it with proper window/level/zoom/pan, annotate, and attach to a visit.",
      bullets: [
        'DICOM parser that handles .dcm and .dcm.gz inputs',
        'Window / level / zoom / pan with keyboard shortcuts',
        'Annotations: arrows, circles, measurements (mm when calibrated)',
        'Each image attached to a specific patient visit',
        'Full-screen viewer and multi-image comparison',
        'Reduced-resolution preview for fast mobile access in portal'
      ],
      whoFor: 'Dental and medical clinics that generate DICOM imaging (X-ray, CBCT, ultrasound).',
      setupSteps: [
        'Enable the Clinical Imaging add-on',
        'Configure the S3 bucket where DICOM files are stored',
        "Upload images from the patient's profile",
        'Annotate and attach to the relevant visit'
      ],
      integrates: ['Clients & CRM', 'Medical Records']
    },
    labs: {
      long: "Order clinical lab tests from a visit, receive results back (CSV, PDF, or manually entered), and optionally publish them to the patient's portal. Ships with a configurable lab catalogue and reference-range validation.",
      bullets: [
        'Structured lab test catalogue with reference ranges',
        'Order from within a visit in one click',
        'Status tracking: ordered → collected → in-progress → resulted',
        'Results captured as structured fields with reference flags',
        'PDF attachment option for the original lab report',
        'Published results appear in the client portal with trend charts'
      ],
      whoFor: 'Clinics that order blood work, microbiology, or path tests through external labs.',
      setupSteps: [
        'Enable the Lab Orders add-on',
        'Import the lab catalogue CSV (or build one in the admin)',
        'Order a test during any visit',
        'Enter or upload the result when it arrives'
      ],
      integrates: ['Clients & CRM', 'Medical Records', 'Client Portal']
    },
    rx: {
      long: 'Author prescriptions during the visit and download or print them on a branded prescription pad. Patients can access their full prescription history in the client portal.',
      bullets: [
        'Drug catalogue with dosage presets per medication',
        'Multi-item prescriptions with per-item dose, frequency, duration',
        'Signed PDF prescription with tenant branding',
        'Patient download via portal; tenant copy in the visit record',
        'Repeat-prescription support with automatic reminders',
        'Audit trail — who wrote it, when, any edits'
      ],
      whoFor: 'Any clinic that prescribes — GPs, dentists, specialists.',
      setupSteps: [
        'Enable the Prescriptions add-on',
        'Upload your prescription-pad letterhead (optional)',
        'Build or import a drug catalogue',
        'Write a prescription during any visit'
      ],
      integrates: ['Medical Records', 'Client Portal', 'Calendar']
    },
    records: {
      long: 'Structured electronic medical records (EMR) with SOAP-style note templates, vitals logging, and allergy/diagnosis tracking. Each visit lives on the patient timeline with full attachment support.',
      bullets: [
        'SOAP note templates (Subjective, Objective, Assessment, Plan)',
        'Custom note templates per specialty (paediatric, derm, ortho…)',
        'Vitals captured as structured fields with trend charts',
        'Allergies and diagnoses tagged with ICD-10 codes',
        'Attachments: images, PDFs, DICOM links',
        "Visit timeline: one patient's entire history at a glance"
      ],
      whoFor: 'Clinics that want a real EMR without paying for a separate system.',
      setupSteps: [
        'Enable the Medical Records add-on',
        'Choose or create SOAP templates for your specialties',
        'Start writing notes during or after each visit',
        'Tag allergies and diagnoses in the patient profile'
      ],
      integrates: ['Clients & CRM', 'Calendar', 'Lab Orders', 'Prescriptions']
    },
    resources: {
      long: 'Book rooms, chairs, equipment, or any physical asset alongside staff. A haircut needs a chair; a root canal needs a chair + hygienist; a class needs a room. Resources make all of this bookable and conflict-aware.',
      bullets: [
        'Define resource types (room, chair, machine) with quantity per location',
        'Assign required resources to each service',
        'Calendar surfaces resource conflicts in real time',
        'Block resources for maintenance, cleaning, or downtime',
        'Per-resource utilisation reports',
        'Resources roll into commission calculations when relevant'
      ],
      whoFor: 'Any business where the physical asset matters as much as the staff.',
      setupSteps: [
        'Enable the Resources add-on',
        'Define resource types per location',
        'Attach resource requirements to each service in the catalogue',
        'Book normally — conflicts are caught automatically'
      ],
      integrates: ['Calendar', 'Catalogue', 'Reports']
    },
    attendance: {
      long: "Track client check-ins for gyms, schools, and any recurring programme where 'showing up' matters more than 'booking a time slot'. Ships with a kiosk-friendly check-in flow and an optional ETA invoice trigger.",
      bullets: [
        'One-tap check-in via client phone, QR code, or kiosk',
        'Membership session countdown on every check-in',
        'Attendance reports per client, class, or month',
        'Automatic no-show detection for booked but not-checked-in clients',
        'Optional: trigger an ETA-compliant invoice on check-in',
        'Exportable attendance registers for schools or HR audits'
      ],
      whoFor: 'Gyms, yoga studios, schools, martial-arts clubs, tutoring centres.',
      setupSteps: [
        'Enable the Client Attendance add-on',
        'Configure the kiosk (tablet + wall mount) or client-app check-in',
        'Assign check-in credits to each membership',
        'Let clients check themselves in'
      ],
      integrates: ['Clients & CRM', 'Catalogue', 'Events & Classes']
    },
    boarding: {
      long: 'Day-rate boarding for vet clinics and pet resorts. Drop-off, pick-up, per-night pricing, special requirements (medications, dietary restrictions), and billing that flows straight into the POS.',
      bullets: [
        'Drop-off / pick-up time tracking with photo upload',
        'Per-night pricing tiers (standard / medical / VIP)',
        'Special requirements: meds, diet, grooming schedule',
        'Occupancy calendar showing which kennels / rooms are free',
        'Billing auto-generated on pick-up with any extras',
        'Owner notifications on check-in, daily updates, check-out'
      ],
      whoFor: 'Vet clinics, pet resorts, boarding kennels.',
      setupSteps: [
        'Enable the Pet Boarding add-on',
        'Define your boarding units (kennels, rooms) per location',
        'Set per-night prices and any add-on services',
        'Book drop-offs from the calendar; POS invoices on pick-up'
      ],
      integrates: ['Calendar', 'Clients & CRM', 'Sales & POS']
    },
    loyalty: {
      long: 'Points-based loyalty with earning rules, redemptions, expiry, and a wallet view in the client portal. Turns one-time customers into recurring ones without discounting every visit.',
      bullets: [
        'Earn rules: per service, per spend, per visit, per member segment',
        'Redemption rules: minimum balance, valid services, expiry window',
        'Points expiry with automatic clean-up and client notification',
        'Wallet view in the client portal with full transaction history',
        'Campaigns: bonus multipliers on targeted segments or days',
        'Per-tenant loyalty reports: redemption rate, top earners'
      ],
      whoFor: 'Any business where repeat visits matter — salons, cafés, clinics.',
      setupSteps: [
        'Enable the Loyalty Points add-on',
        'Define earn rules in the catalogue (points per service or per unit spent)',
        'Set redemption rules (minimum, expiry, eligible services)',
        'Launch — clients accumulate points automatically on every sale'
      ],
      integrates: ['Clients & CRM', 'Sales & POS', 'Campaigns']
    },
    events: {
      long: 'Group classes, workshops, and scheduled events with capacity, waitlists, and attendee check-in. A yoga class at 7am with 12 seats — Momentfy sells them, confirms them, and checks them in.',
      bullets: [
        'Recurring and one-off events with capacity limits',
        'Waitlist support with automatic promotion when a seat frees up',
        'Attendee check-in via kiosk or client app',
        'Per-event pricing (fixed, free, member-only)',
        'Reports: fill rate, waitlist conversion, top events',
        'Event-level reviews published to the public booking page'
      ],
      whoFor: 'Fitness studios, cooking schools, workshop hosts, community centres.',
      setupSteps: [
        'Enable the Events & Classes add-on',
        'Create event templates (Yoga 60, HIIT 45, etc.)',
        'Schedule recurring slots in the calendar',
        'Publish to the booking site — clients start signing up'
      ],
      integrates: ['Calendar', 'Catalogue', 'Client Attendance']
    },
    followup: {
      long: "An automated queue of follow-up tasks so nothing slips through. 'Call Sarah about her post-op checkup.' 'Ask Karim for a review after his third visit.' Rules generate the tasks; assigned staff close them.",
      bullets: [
        'Rules based on segment, visit outcome, membership expiry, or date',
        'Tasks assigned to specific staff with SLA timers',
        'Batch-complete with one click (e.g. "mark all called")',
        'Client-level truncation notice — no spamming the same person',
        'Per-member queue with status counts and priority',
        'Reports: average time-to-close, no-response rate, staff ranking'
      ],
      whoFor: 'Any operator who says "we forgot to call them back".',
      setupSteps: [
        'Enable the Follow-up Tasks add-on',
        "Create rules (e.g. 'call 2 days after first visit')",
        'Assign default owners per task type',
        'Staff process the queue from their dashboard'
      ],
      integrates: ['Clients & CRM', 'Calendar', 'Campaigns']
    }
  },
  solutionDetails: {
    salon: {
      title: 'Salons & Spas', tagline: 'Color-coded lanes, memberships and loyalty — tuned for the rhythm of a salon.',
      icon: 'i-lucide-scissors', accent: 'from-pink-500 to-rose-600', dot: 'bg-rose-500',
      category: 'Industry',
      long: "Salons live on rebooks, retail attach-rate and staff commissions. Momentfy's salon setup ships with color-coded staff lanes, membership bundles, gift cards, loyalty points, retail inventory, campaigns and per-stylist commissions — bookable from your branded PWA.",
      pains: [
        'Double-booked chairs and no-shows eating 20% of revenue',
        'Memberships tracked in spreadsheets that nobody updates',
        'Commissions calculated by hand every payday',
        'Loyalty punch-cards that walk out with the client'
      ],
      capabilities: [
        'Drag-and-drop staff lanes with resource booking',
        'Memberships, gift cards and package credits in one wallet',
        'Loyalty points auto-earned at POS, redeemable in portal',
        'Per-stylist commissions with split and tip handling',
        'Retail inventory with re-order points and stock moves',
        'SMS/WhatsApp reminders and review-request campaigns',
        'Walk-in queue alongside booked appointments',
        'End-of-day cash register close'
      ],
      stack: ['Calendar', 'Sales & POS', 'Memberships', 'Loyalty Points', 'Campaigns', 'Clients & CRM', 'Inventory', 'Reports'],
      stats: [{ k: 'No-show drop', v: '-38%' }, { k: 'Rebook rate', v: '+52%' }, { k: 'Checkout time', v: '< 90s' }],
      whoFor: 'Hair, beauty, nails, lash and spa operators running 1–50 chairs across one or many locations.',
      useCases: [
        'Solo stylist accepting online bookings with deposits',
        'Multi-chair salon with stylist-specific commissions and tips',
        'Spa chain selling seasonal memberships across branches',
        'Retail-heavy concept bar upselling products at POS'
      ],
      faq: [
        { q: 'Can stylists see only their own appointments?', a: "Yes — role-based views restrict each member's calendar to their lane by default." },
        { q: 'Do memberships auto-renew?', a: 'Yes. Stripe or Lemon Squeezy handles the card-on-file charge and credit tops up automatically.' }
      ]
    },
    dental: {
      title: 'Dental Clinics', tagline: 'Odontogram, imaging, prescriptions and insurance — ZATCA-ready.',
      icon: 'i-lucide-tooth', accent: 'from-sky-500 to-blue-600', dot: 'bg-sky-500',
      category: 'Industry',
      long: 'Dental practices need clinical depth without clinical drag. Momentfy ships a pediatric + adult odontogram, treatment plans, DICOM imaging, prescriptions, insurance classes with coverage rules, and ZATCA Phase 2 e-invoicing — all inside one bilingual app.',
      pains: [
        'Paper odontograms lost between visits',
        'Insurance rejections from missing coverage rules',
        'X-ray images trapped on a lab PC',
        'Manual ZATCA invoice uploads every evening'
      ],
      capabilities: [
        'Odontogram with surface-level treatment tracking (pediatric + adult)',
        'Treatment plans with phasing and consent capture',
        'DICOM viewer with annotations attached to the record',
        'Prescription authoring with patient-facing portal download',
        'Insurance classes + coverage rules + claim-ready invoices',
        'ZATCA Phase 2 clearance + QR-stamped receipts',
        'Chair & resource booking alongside staff',
        'Lab orders with external-lab status tracking'
      ],
      stack: ['Calendar', 'Dental Chart', 'Clinical Imaging', 'Prescriptions', 'Insurance Classes', 'Medical Records', 'ZATCA', 'Client Portal'],
      stats: [{ k: 'Chair utilization', v: '+24%' }, { k: 'Insurance recovery', v: '+31%' }, { k: 'Charting time', v: '-65%' }],
      whoFor: 'Solo and multi-doctor dental practices in GCC/MENA needing ZATCA compliance and insurance workflows.',
      useCases: [
        'Two-chair clinic running mixed insurance + cash patients',
        'Pediatric dentistry tracking deciduous dentition over time',
        'Orthodontist managing multi-phase treatment plans',
        'Multi-branch group practice with unified patient records'
      ],
      faq: [
        { q: 'Can I attach DICOM images to a treatment step?', a: 'Yes — the DICOM viewer links each series to the relevant tooth and treatment step in one click.' },
        { q: 'Are ZATCA cleared invoices retained?', a: 'Forever. Cleared XML + submission UUID are archived and exportable at any time.' }
      ]
    },
    medical: {
      title: 'Medical Clinics', tagline: 'Structured EMR, lab orders, prescriptions and insurance-ready invoicing.',
      icon: 'i-lucide-heart-pulse', accent: 'from-red-500 to-orange-500', dot: 'bg-red-500',
      category: 'Industry',
      long: 'General practice, GP chains, dermatology, pediatrics — Momentfy gives medical clinics a structured EMR with SOAP notes, vitals capture, lab orders, prescriptions and bilingual portal access, plus ZATCA/ETA invoice clearance.',
      pains: [
        'SOAP notes scattered across paper and email',
        'Lab results printed and filed manually',
        'Prescriptions rewritten from scratch every visit',
        'No way for patients to see their own history'
      ],
      capabilities: [
        'Structured SOAP notes + vitals capture',
        'Lab order workflow with external-lab turn-around',
        'Prescription authoring with refills and templates',
        'Medical records timeline with attachments',
        'Insurance-class aware invoicing + coverage rules',
        'Branded client portal with history download',
        'Multi-doctor scheduling + per-doctor commissions',
        'VAT + ZATCA + ETA clearance built in'
      ],
      stack: ['Calendar', 'Medical Records', 'Lab Orders', 'Prescriptions', 'Insurance Classes', 'Client Portal', 'ZATCA', 'Reports'],
      stats: [{ k: 'Charting time', v: '-40%' }, { k: 'Portal adoption', v: '72%' }, { k: 'Lab turnaround', v: '-28%' }],
      whoFor: 'GP, dermatology, pediatric and specialist clinics with 1–20 doctors.',
      useCases: [
        'GP chain unifying charts across branches',
        'Dermatology clinic attaching before/after photos to visits',
        'Pediatric practice tracking growth curves over years',
        'Specialist running insurance-heavy procedure workflows'
      ]
    },
    barber: {
      title: 'Barber Shops', tagline: 'Walk-in queue, fast POS and per-barber commissions — built for volume.',
      icon: 'i-lucide-user', accent: 'from-stone-500 to-neutral-700', dot: 'bg-stone-500',
      category: 'Industry',
      long: 'Barbershops thrive on speed and fairness. Momentfy blends a walk-in queue with booked appointments, tracks per-barber commissions to the cent, and checks clients out in under 90 seconds on any tablet.',
      pains: [
        'Queue mayhem during rush hour',
        'Commission disputes on tips and products',
        'Membership cards that nobody remembers',
        'Checkout lines slower than the haircut'
      ],
      capabilities: [
        'Walk-in queue that coexists with bookings',
        'Per-barber commissions with tip tracking',
        'Fast POS tuned for <90s checkout',
        'Memberships + package credits in one wallet',
        'SMS reminders with deposit hold on no-shows',
        'Staff attendance + leave from the app',
        'Daily cash-out with z-report',
        'Retail product sales alongside services'
      ],
      stack: ['Calendar', 'Sales & POS', 'Memberships', 'Commissions', 'Loyalty Points', 'Campaigns', 'Clients & CRM'],
      stats: [{ k: 'Avg. ticket', v: '+18%' }, { k: 'Queue wait', v: '-44%' }, { k: 'Commission accuracy', v: '100%' }],
      whoFor: 'Single-shop and multi-chair barbers from classic cuts to modern grooming concepts.',
      useCases: [
        'Walk-in heavy shop running queue on a kiosk tablet',
        'Multi-chair shop paying tiered commissions',
        'Grooming concept selling beard-oil retail at POS',
        'Multi-location chain unifying loyalty across branches'
      ]
    },
    fitness: {
      title: 'Fitness & Studios', tagline: 'Group classes, memberships, waitlists and attendance — kiosk-friendly.',
      icon: 'i-lucide-dumbbell', accent: 'from-lime-500 to-emerald-600', dot: 'bg-emerald-500',
      category: 'Industry',
      long: 'Pilates, yoga, crossfit, HIIT, boxing — Momentfy runs the full class-based lifecycle: schedule, enrol, waitlist, track attendance and renew memberships. Kiosk check-in makes the door staff-free.',
      pains: [
        'Manual class-roster spreadsheets',
        'No-shows taking spots from waitlisted members',
        'Membership renewals that silently lapse',
        'Coaches paid for empty slots'
      ],
      capabilities: [
        'Recurring class schedules with capacity + waitlist',
        'Member app with self-enrol and cancel windows',
        'Attendance check-in via kiosk or coach app',
        'Membership tiers + paused/frozen states',
        'Drop-in packs and class credits',
        'Campaigns for re-activation of lapsed members',
        'Commissions per coach per head',
        'Reports: fill rate, churn, class profitability'
      ],
      stack: ['Events & Classes', 'Memberships', 'Client Attendance', 'Client Portal', 'Campaigns', 'Reports', 'Sales & POS'],
      stats: [{ k: 'Class fill rate', v: '+26%' }, { k: 'Member churn', v: '-19%' }, { k: 'Check-in time', v: '< 5s' }],
      whoFor: 'Group-class studios, boutique gyms and independent coaches running recurring classes.',
      useCases: [
        'Pilates studio selling 10-class packs with expiry',
        'HIIT gym running waitlists for peak classes',
        'Martial arts academy tracking kids attendance',
        'Yoga collective paying coaches per head'
      ]
    },
    pet: {
      title: 'Vet & Pet Care', tagline: 'Vet records, vaccination reminders, boarding and day-care billing.',
      icon: 'i-lucide-paw-print', accent: 'from-amber-500 to-yellow-600', dot: 'bg-amber-500',
      category: 'Industry',
      long: 'Vets and pet resorts share one rhythm: recurring visits and long memory. Momentfy stores one record per animal (not per owner), schedules vaccine recalls, prices boarding by day and invoices the owner.',
      pains: [
        'Vaccines missed because nobody called',
        'Boarding cages booked on a whiteboard',
        'Multi-pet households with tangled records',
        'Medication refills that need re-typing'
      ],
      capabilities: [
        'One record per animal with species-specific fields',
        'Vaccination schedule with automatic reminders',
        'Day-rate boarding with occupancy view',
        'Prescription refills from history',
        'Multi-pet family grouping with shared billing',
        'Grooming bookings alongside medical visits',
        'Portal with vaccine certificates downloadable',
        'Lab orders and imaging attached to the animal'
      ],
      stack: ['Calendar', 'Medical Records', 'Pet Boarding', 'Prescriptions', 'Client Portal', 'Sales & POS', 'Campaigns'],
      stats: [{ k: 'Vaccine recall', v: '+48%' }, { k: 'Boarding utilization', v: '+33%' }, { k: 'Client reviews', v: '4.9★' }],
      whoFor: 'Vet clinics, pet resorts, groomers and mixed-services pet businesses.',
      useCases: [
        'Vet clinic auto-recalling pets 1 year after vaccination',
        'Pet resort pricing boarding by night + add-ons',
        'Groomer + vet combined under one brand',
        'Mobile vet visiting homes with route-based bookings'
      ]
    },
    therapy: {
      title: 'Therapy & Coaching', tagline: 'Sessions, intake forms, progress notes and private portal access.',
      icon: 'i-lucide-brain', accent: 'from-indigo-500 to-violet-600', dot: 'bg-indigo-500',
      category: 'Industry',
      long: 'Therapists, coaches and counsellors need calm software that respects confidentiality. Momentfy ships intake forms, private session notes, outcome tracking and a client portal that feels like a journal — not a dashboard.',
      pains: [
        'Intake forms filled on paper then re-typed',
        'Notes in a Word doc "just for me"',
        'Clients missing sessions without deposit',
        'No easy way to share homework or worksheets'
      ],
      capabilities: [
        'Custom intake forms with e-signature',
        'Session notes with outcome scores over time',
        'Calendar with buffer time and block-bookings',
        'Deposit-or-no-booking rule on high-risk slots',
        'Recurring session packages with pre-paid credits',
        'Client portal with private messages + homework',
        'AI Assistant drafting session reminders',
        'Export-ready records for referrals'
      ],
      stack: ['Calendar', 'Medical Records', 'Client Portal', 'AI Assistant', 'Sales & POS', 'Campaigns'],
      stats: [{ k: 'No-show drop', v: '-42%' }, { k: 'Weekly sessions', v: '+28%' }, { k: 'Session notes time', v: '-35%' }],
      whoFor: 'Therapists, counsellors, psychologists, life coaches and career coaches running 1:1 sessions.',
      useCases: [
        'Solo therapist running weekly CBT sessions',
        'Coaching collective sharing one brand + split earnings',
        'Couples counsellor tracking joint sessions',
        'Career coach selling 6-session packages upfront'
      ]
    },
    photo: {
      title: 'Photo Studios', tagline: 'Package pricing, deposit-or-no-booking, gallery delivery and prints.',
      icon: 'i-lucide-camera', accent: 'from-fuchsia-500 to-purple-600', dot: 'bg-fuchsia-500',
      category: 'Industry',
      long: 'Photographers lose money on no-shows and chase balances for weeks. Momentfy packages shoots, enforces deposits at booking, manages equipment blocks, and delivers galleries + prints from the same system that took the booking.',
      pains: [
        'Shoots booked without deposit that ghost on the day',
        'Equipment clashes across studios',
        'Edit delivery chased over email',
        'Print sales outside the invoice flow'
      ],
      capabilities: [
        'Shoot packages with time + deliverables',
        'Mandatory deposit at booking with remainder schedule',
        'Equipment + studio resource booking',
        'Gallery delivery link inside the client portal',
        'Print products priced and invoiced through POS',
        'Reviewed + approved frames tracked per shoot',
        'Per-photographer commission splits',
        'Contract + e-sign before confirmation'
      ],
      stack: ['Calendar', 'Sales & POS', 'Resources', 'Client Portal', 'Catalogue', 'Campaigns'],
      stats: [{ k: 'Deposit compliance', v: '98%' }, { k: 'Balance collection', v: 'Day of' }, { k: 'Post-shoot upsell', v: '+22%' }],
      whoFor: 'Portrait, wedding, product and studio photographers running package-based shoots.',
      useCases: [
        'Wedding photographer selling 3-tier packages',
        'Portrait studio shared between two photographers',
        'Product photography studio invoicing by the hour',
        'Mobile photographer booking on-location shoots'
      ]
    },
    nails: {
      title: 'Nail & Lash Bars', tagline: 'Tech-specific menus, deposits, touch-up rebooks and retail add-ons.',
      icon: 'i-lucide-sparkles', accent: 'from-rose-400 to-pink-500', dot: 'bg-pink-500',
      category: 'Industry',
      long: 'Nail and lash bars run on short, frequent visits with tight touch-up windows. Momentfy lets each tech publish her own menu, enforces a deposit on every booking, and auto-prompts clients to rebook before their set comes off.',
      pains: [
        'Every tech needs a different service menu',
        'Missed touch-ups = lost repeat revenue',
        'Late-cancels with no deposit to hold',
        'Retail (polish, aftercare) sold off the books'
      ],
      capabilities: [
        'Per-tech service menus + prices',
        'Deposit enforced at booking (% or fixed)',
        'Auto-rebook suggestion at set lifespan end',
        'Retail attach-rate reports per tech',
        'Loyalty points on visit count not spend',
        'Instagram gallery linked to service',
        'Campaigns to lapsed clients with offer',
        'Tips captured at POS with commission split'
      ],
      stack: ['Calendar', 'Sales & POS', 'Memberships', 'Loyalty Points', 'Campaigns', 'Catalogue', 'Reports'],
      stats: [{ k: 'Repeat visit rate', v: '+34%' }, { k: 'Deposit capture', v: '96%' }, { k: 'Retail attach', v: '+19%' }],
      whoFor: 'Nail salons, lash studios, brow bars and multi-tech beauty studios.',
      useCases: [
        'Nail bar with 6 techs each setting own prices',
        'Lash studio running every-3-week touch-up prompt',
        'Brow + lash combined studio sharing retail',
        'Home-based tech taking deposits via PWA'
      ]
    },
    tattoo: {
      title: 'Tattoo & Piercing', tagline: 'Artist portfolios, consults, deposits and aftercare tracking.',
      icon: 'i-lucide-pen-tool', accent: 'from-zinc-600 to-slate-800', dot: 'bg-zinc-700',
      category: 'Industry',
      long: "Tattoo and piercing studios run on artist reputation and protected shop time. Momentfy gives each artist a portfolio-and-booking mini-site, captures consent + medical forms, and takes a non-refundable deposit before a session is ever held.",
      pains: [
        'Sessions booked without deposit get cancelled',
        'Artists juggle consult scheduling in DMs',
        'Consent + aftercare forms on paper',
        'Commission accounting at end of month hell'
      ],
      capabilities: [
        'Per-artist portfolio + booking link',
        'Consult-then-session two-stage workflow',
        'Non-refundable deposit held against session',
        'Medical + consent forms with e-sign',
        'Aftercare follow-up campaigns by day 3, 14, 30',
        'Per-artist commission + chair rental flows',
        'Age-verified booking checks',
        'Tip capture with transparent split'
      ],
      stack: ['Calendar', 'Sales & POS', 'Clients & CRM', 'Campaigns', 'Resources', 'Reports'],
      stats: [{ k: 'Deposit compliance', v: '99%' }, { k: 'Rebook rate', v: '+41%' }, { k: 'Commission disputes', v: '0' }],
      whoFor: 'Tattoo studios, piercing bars, and shared-chair artist collectives.',
      useCases: [
        'Studio with resident + guest artists sharing chairs',
        'Piercing bar taking walk-ins alongside booked slots',
        'Solo artist running consults before a booking',
        'Collective with chair rental vs commission mix'
      ]
    },
    wellness: {
      title: 'Massage & Wellness', tagline: 'Therapist lanes, packages, resource rooms and recovery programs.',
      icon: 'i-lucide-flower-2', accent: 'from-teal-400 to-emerald-600', dot: 'bg-teal-500',
      category: 'Industry',
      long: 'Massage, physio and wellness studios stack short sessions with tight room turnovers. Momentfy books therapist + room together, sells packages with expiry, and nudges clients toward recurring recovery programs.',
      pains: [
        'Room clashes between therapists',
        'Packages that expire with unused sessions',
        'One-off visits that never become programs',
        'Therapist-specific prices hidden in heads'
      ],
      capabilities: [
        'Therapist + room dual-resource booking',
        'Multi-session packages with expiry + rollover',
        'Program templates (e.g. 8-week recovery)',
        'Intake forms + outcome tracking',
        'Retail oils/aftercare through POS',
        'Membership tiers with unlimited access',
        'Per-therapist commission splits',
        'Reports: room utilization, program completion'
      ],
      stack: ['Calendar', 'Resources', 'Memberships', 'Sales & POS', 'Medical Records', 'Client Portal', 'Campaigns'],
      stats: [{ k: 'Room utilization', v: '+37%' }, { k: 'Program completion', v: '82%' }, { k: 'Package resell', v: '+46%' }],
      whoFor: 'Massage studios, physios, recovery clinics and integrated wellness spaces.',
      useCases: [
        'Massage studio with 4 therapists + 3 rooms',
        'Sports physio running 8-week recovery programs',
        'Cupping + acupuncture wellness lounge',
        'Corporate on-site chair-massage bookings'
      ]
    },
    driving: {
      title: 'Driving Schools', tagline: 'Instructor fleets, vehicle resources, test prep packages and progress.',
      icon: 'i-lucide-car-front', accent: 'from-cyan-500 to-blue-600', dot: 'bg-cyan-500',
      category: 'Industry',
      long: 'Driving schools juggle instructors, cars and student progress toward a test date. Momentfy books instructor + vehicle as one resource, sells test-prep packages, and tracks each student to their pass.',
      pains: [
        'Vehicles double-booked between instructors',
        'Students losing track of completed lessons',
        "Test-prep packages sold but not consumed",
        'Exam day admin done by memory'
      ],
      capabilities: [
        'Instructor + vehicle combined as one bookable resource',
        'Student progress toward test date',
        'Test-prep packages with lesson credits',
        'Theory module attached to schedule',
        'Route tracking by lesson skill',
        'Parent/guardian account for minors',
        'Automatic reminder + deposit on exam booking',
        'Instructor commission per lesson type'
      ],
      stack: ['Calendar', 'Resources', 'Catalogue', 'Memberships', 'Client Portal', 'Reports'],
      stats: [{ k: 'Vehicle utilization', v: '+29%' }, { k: 'Package completion', v: '91%' }, { k: 'Pass rate', v: '+14%' }],
      whoFor: 'Driving schools with multi-instructor fleets running lesson + test-prep bundles.',
      useCases: [
        'Driving school with 5 cars + 8 instructors',
        'Motorcycle training center with multi-day courses',
        'Corporate driver training contracts',
        'Specialist truck/bus licensing school'
      ]
    },
    tutoring: {
      title: 'Tutoring Centers', tagline: 'Tutor schedules, group classes, term packages and parent portal.',
      icon: 'i-lucide-graduation-cap', accent: 'from-orange-500 to-amber-600', dot: 'bg-orange-500',
      category: 'Industry',
      long: 'Tutoring centers run 1:1 and group sessions across subjects, tutors and terms. Momentfy schedules tutor + room, sells term-long packages, and gives parents a portal to track their child across subjects.',
      pains: [
        'Parents unsure which sessions their child attended',
        'Tutor availability changing every term',
        'Group classes filling unevenly',
        'Progress reports emailed manually'
      ],
      capabilities: [
        '1:1 + group class scheduling in one calendar',
        'Term-long packages with pro-rata for late starts',
        'Parent portal with child attendance + progress',
        'Tutor availability templates by term',
        'Outcome tracking per subject',
        'Waitlists for popular group classes',
        'Campaigns for new-term enrolment',
        'Per-tutor commission and per-subject profitability'
      ],
      stack: ['Events & Classes', 'Client Attendance', 'Memberships', 'Client Portal', 'Campaigns', 'Reports'],
      stats: [{ k: 'Parent portal adoption', v: '81%' }, { k: 'Term rebook rate', v: '+36%' }, { k: 'Class fill rate', v: '+24%' }],
      whoFor: 'After-school tutoring centers, language schools and exam-prep academies.',
      useCases: [
        'After-school center running weekly math + english',
        'Language school selling 12-week term courses',
        'SAT/IELTS prep academy with group + 1:1 mix',
        'Music school with instrument-specific tutors'
      ]
    },
    'multi-tenant': {
      title: 'Multi-location chains', tagline: 'One codebase, many brands, branch-level reporting and central ops.',
      icon: 'i-lucide-building-2', accent: 'from-slate-500 to-gray-700', dot: 'bg-slate-500',
      category: 'Business shape',
      long: 'Chains and franchise operators need central oversight without taking away local speed. Momentfy runs one deployment that serves unlimited tenants — each with its own branding, pricing, staff and reports — rolled up into a central super-admin view.',
      pains: [
        'Each branch on its own spreadsheet',
        'Consolidated P&L a month late',
        'Brand pricing drift between locations',
        'No SKU sharing across branches'
      ],
      capabilities: [
        'Unlimited tenants on one deployment',
        'Per-tenant branding, locale, and add-ons',
        'Shared catalogue with per-branch price overrides',
        'Central super-admin with cross-tenant reports',
        'Stock transfers between branches',
        'Role-based access (HQ, regional, branch)',
        'Consolidated accounting + inter-branch entries',
        'Brand-level campaigns with branch opt-in'
      ],
      stack: ['All nine core modules', 'Super-Admin panel', 'Multi-tenant mode', 'Central reporting'],
      stats: [{ k: 'Branches per install', v: 'Unlimited' }, { k: 'Reporting lag', v: 'Real-time' }, { k: 'Onboarding time', v: '< 1 day' }],
      whoFor: 'Franchise operators, multi-brand groups and chain owners running 3+ locations.',
      useCases: [
        'Salon group with 12 branches under one brand',
        'Clinic network with specialty + GP branches',
        'Franchise with HQ + independently-owned stores',
        'Regional gym chain with central membership'
      ]
    },
    mobile: {
      title: 'Mobile & on-site teams', tagline: 'Route bookings, on-the-way ETAs and offline check-out in the field.',
      icon: 'i-lucide-truck', accent: 'from-blue-500 to-indigo-600', dot: 'bg-blue-500',
      category: 'Business shape',
      long: "Field teams — mobile beauty, home physio, on-site IT, at-home grooming — can't afford to lose a session to a patchy network. Momentfy's PWA installs on any phone, routes jobs by address, and completes sales offline, syncing when signal returns.",
      pains: [
        'Calendar not syncing in the field',
        'Invoice sent hours after the job',
        'No signal = no payment',
        'Routes planned by guesswork'
      ],
      capabilities: [
        'Installable PWA works offline by default',
        'Route-optimised day plan per team member',
        'On-the-way ETA sent by SMS automatically',
        'Offline POS — takes payment later when online',
        'Mileage + travel-time rules billed automatically',
        'Client signature capture on device',
        'Inventory consumed per on-site visit',
        'Geofence arrival + departure logging'
      ],
      stack: ['Calendar', 'Sales & POS', 'Client Portal', 'Campaigns', 'Inventory', 'Reports'],
      stats: [{ k: 'Offline reliability', v: '100%' }, { k: 'Jobs per day', v: '+22%' }, { k: 'Payment lag', v: '-98%' }],
      whoFor: 'Mobile beauty, home healthcare, field service and at-home premium brands.',
      useCases: [
        'Mobile hair + makeup visiting weddings',
        'Home physio covering a metro area',
        'Mobile pet grooming van running routes',
        'On-site IT repair billed at the door'
      ]
    },
    memberships: {
      title: 'Membership businesses', tagline: 'Recurring plans, credits, auto-renew, freeze & retention analytics.',
      icon: 'i-lucide-infinity', accent: 'from-purple-500 to-fuchsia-600', dot: 'bg-purple-500',
      category: 'Business shape',
      long: 'If your business runs on recurring revenue — gyms, salons, wellness subscriptions, unlimited classes — Momentfy ships the full membership lifecycle: plans, credits, auto-renew, pause, freeze, cancel and retention analytics.',
      pains: [
        'Members silently lapsing without notice',
        'Credits that never get spent',
        'Freezes handled by email',
        'No insight into who is about to churn'
      ],
      capabilities: [
        'Plan library with tier + credit rules',
        'Auto-renew via Stripe / Lemon Squeezy card-on-file',
        'Self-service pause/freeze/cancel from portal',
        'Retention dashboards (cohort, churn risk)',
        'Upgrade/downgrade with proration',
        'Usage tracking per plan allowance',
        'Dunning flow on failed payments',
        'Referral credits and rewards'
      ],
      stack: ['Memberships', 'Sales & POS', 'Client Portal', 'Campaigns', 'Reports', 'Loyalty Points'],
      stats: [{ k: 'Churn reduction', v: '-31%' }, { k: 'Auto-renew success', v: '96%' }, { k: 'Upgrade rate', v: '+18%' }],
      whoFor: 'Any business whose revenue is majority-recurring: gyms, salons, wellness, class packs, subscriptions.',
      useCases: [
        'Gym running unlimited + limited-access tiers',
        'Salon selling monthly beauty subscriptions',
        'Wellness studio with pause-on-holiday feature',
        'Class studio offering 4 / 8 / 12 pack credits'
      ]
    }
  },
  solutionsPage: {
    eyebrow: 'Solutions', h1a: 'Built for your', h1b: 'field of work.',
    sub: 'Sixteen ready-shaped configurations — from salons to driving schools to multi-location chains. Pick yours, ship in a day.',
    chaptersLabel: 'Chapters',
    industriesLabel: 'Industries',
    businessShapesLabel: 'Business shapes',
    breadcrumb: 'Solutions',
    categoryIndustry: 'Industry',
    categoryBusiness: 'Business shape',
    painsTitle: 'What it solves', painsBody: 'The operational pain this setup is designed to remove.',
    capsTitle: 'What you get', capsBody: 'Everything below ships in the base source — no upgrade tier required.',
    stackTitle: 'Built on', stackBody: 'Modules and add-ons bundled into this configuration.',
    useCasesTitle: 'Who runs it', useCasesBody: 'A handful of ways operators configure this today.',
    faqTitle: 'Quick answers',
    ctaTitle: 'Ready to ship yours?', ctaBody: 'Buy the source, enable the add-ons that match — live in a day.',
    ctaPrimary: 'Get the source code', ctaSecondary: 'Browse every solution',
    statsNote: 'Benchmarks are illustrative — drawn from early operators and industry norms, not a guaranteed result.',
    browseAll: 'All solutions',
    notFoundEyebrow: 'Not found', notFoundBody: 'We don\'t have a page for that solution yet — browse the full list.'
  },
  portal: {
    eyebrow: 'Client Portal', heading: 'Every tenant gets a branded PWA.',
    sub: 'Your clients book appointments, pay invoices, see their memberships, track loyalty points, download prescriptions, review visits and chat with the in-app AI — from their phone, with your logo, installed like a native app.',
    bullets: [
      'Installable PWA with offline cache',
      'Booking, invoicing, loyalty, memberships',
      'Lab results & prescriptions download',
      'Reviews, tickets, AI chat assistant',
      'Arabic RTL and English LTR'
    ],
    cta: 'See the portal tour',
    cardTag: "Lina's Spa",
    welcomeBack: 'Welcome back',
    loyalty: 'Loyalty balance', ptsShort: 'pts',
    nextAppt: 'Next appointment',
    quickActions: 'Quick actions',
    actionBook: 'Book', actionInvoices: 'Invoices', actionRx: 'Rx',
    askAi: 'Ask the AI assistant…',
    apptTitle: 'Color & Cut', apptMeta: 'Tue · 14:00 · Lina H.', apptStatus: 'Confirmed'
  },
  pricing: {
    eyebrow: 'Two plans. Same product.', heading: 'Buy once. Own it.',
    sub: 'Both plans ship the identical codebase with lifetime updates included. The only thing that changes is whether you install it — or we do.',
    billing: { onetime: 'One-time', updates: '+ lifetime updates', save: 'all plans' },
    includedAllLabel: 'What you get (identical in every plan)',
    includedAll: [
      'Full source code',
      'Unlimited tenants',
      'All 9 core modules',
      'All 16 add-ons',
      'ZATCA + ETA compliance',
      'Bilingual AR + EN',
      'Self-host anywhere',
      'Lifetime license + lifetime updates'
    ],
    windowLabel: 'Pick your install path',
    durationAxisStart: 'You install',
    durationAxisEndForever: 'We install',
    plans: [
      {
        name: 'Self-install', tag: 'You deploy it',
        price: '$599', priceSuffix: '/ one-time', cta: 'Get Self-install',
        durationValue: '∞', durationLabel: 'LIFETIME UPDATES', durationProgress: 15,
        tagline: 'Download the source, deploy in an hour, own it forever.',
        features: [
          'Full source code',
          'Unlimited tenants',
          'All 9 core modules',
          'All 16 add-ons',
          'ZATCA + ETA compliance',
          'Bilingual AR + EN',
          'Lifetime updates (every release, forever)',
          'Docker Compose install guide',
          'Email support (48h response)'
        ]
      },
      {
        name: 'Done-for-you', tag: 'We deploy it',
        price: '$1,499', priceSuffix: '/ one-time', cta: 'Get Done-for-you',
        durationValue: '∞', durationLabel: 'LIFETIME UPDATES', durationProgress: 100,
        featured: true, mostPopular: 'Most popular',
        tagline: 'We install, configure and hand you the keys.',
        features: [
          'Everything in Self-install',
          'We deploy on your VPS (or ours)',
          'Tenant setup + branding configured',
          'ZATCA / ETA activated for your region',
          'Data import from your current system',
          '60-minute operator training session',
          'Priority email support (24h response)',
          'Lifetime updates (every release, forever)'
        ]
      }
    ],
    footer: 'Secure checkout via Lemon Squeezy — handles VAT and Merchant-of-Record obligations in your local currency.'
  },
  testimonials: {
    eyebrow: 'Operators who shipped with it', heading: 'Built by operators, for operators.',
    items: [
      { quote: 'Replaced three separate tools with Momentfy in a weekend. Our receptionists actually smile now.', name: 'Lina H.', role: 'Spa chain owner · Riyadh' },
      { quote: 'We white-labelled it, deployed to ten clinics and passed the ZATCA audit on the first try.', name: 'Karim M.', role: 'Dental group IT · Cairo' },
      { quote: 'Finally a platform that treats Arabic as a first-class language. Not an afterthought.', name: 'Noura A.', role: 'Clinic owner · Dubai' }
    ],
    disclaimer: 'Illustrative — these quotes represent feedback patterns from early operators. Named case studies and verified logos land here as v1.0 deployments publish.'
  },
  trust: {
    eyebrow: 'Trust & security',
    heading: 'You own the stack.',
    sub: 'Self-hosted by design. Source-available by principle. Auditable by obligation.',
    pillars: [
      { title: 'Your data, your server',      body: 'Nothing leaves your VPS. No telemetry, no phone-home, no SaaS middle layer — your clients\' records stay where you put them.',                icon: 'i-lucide-server' },
      { title: 'Read every line',             body: 'Full TypeScript source ships with every license. Audit the code, fork the repo, ship patches — no black boxes.',                               icon: 'i-lucide-file-code-2' },
      { title: 'Audit trail built-in',        body: 'Every sensitive action (refund, override, impersonation, data export) is timestamped, attributed and queryable from the admin panel.',        icon: 'i-lucide-history' },
      { title: 'Compliance-ready',            body: 'ZATCA Phase 2 and Egypt ETA signing flows ship with the product. VAT, audit log and data-export tools are built in, not sold as extras.',     icon: 'i-lucide-shield-check' }
    ]
  },
  faq: {
    eyebrow: 'FAQ', heading: 'Common questions.', linkAll: 'All questions',
    items: [
      { q: 'What exactly do I get when I buy?', a: 'A zipped download of the full source code repository, install docs, and a license key. You can clone it, modify it and deploy it anywhere.' },
      { q: 'Can I run it as a SaaS and sell to multiple tenants?', a: 'Yes. Multi-tenant mode is built in. One deployment serves unlimited tenants, each with their own data, branding, staff and clients.' },
      { q: 'Do I pay monthly?', a: 'No. One payment, lifetime license, unlimited tenants, unlimited users. Optional yearly renewal only for continued updates and support.' },
      { q: 'Which countries is it ready for?', a: 'Built in Saudi Arabia and Egypt. Includes ZATCA Phase 2, ETA e-invoicing, VAT. Works worldwide for any service business.' }
    ]
  },
  cta: {
    eyebrow: 'Start today', heading: 'Ship your business platform this weekend.',
    sub: 'Buy the source once. Deploy on your own server. Charge your clients whatever you want. Keep 100% of the revenue.',
    buy: 'Download source code', explore: 'Explore features',
    lifetime: 'Lifetime license', unlimited: 'Unlimited tenants', updates: 'Lifetime updates'
  },
  footer: {
    tag: 'The complete booking & business platform for salons, spas, clinics and service businesses. Source-available, self-hosted, yours forever.',
    badge: 'v1.0 — Production ready',
    columns: [
      { title: 'Product', links: [
        { label: 'Features', to: '/portal/features' }, { label: 'Add-ons', to: '/portal/addons' },
        { label: 'Showcase', to: '/portal/showcase' }, { label: 'Pricing', to: '/portal/pricing' },
        { label: 'FAQ', to: '/portal/faq' }
      ] },
      { title: 'Solutions', links: [
        { label: 'Salons & Spas', to: '/portal/solutions/salon' },
        { label: 'Dental Clinics', to: '/portal/solutions/dental' },
        { label: 'Medical Clinics', to: '/portal/solutions/medical' },
        { label: 'Barbershops', to: '/portal/solutions/barber' },
        { label: 'Fitness & Classes', to: '/portal/solutions/fitness' },
        { label: 'Pet & Vet Care', to: '/portal/solutions/pet' },
        { label: 'Therapy & Coaching', to: '/portal/solutions/therapy' },
        { label: 'Photo Studios', to: '/portal/solutions/photo' },
        { label: 'Nail & Lash Bars', to: '/portal/solutions/nails' },
        { label: 'Tattoo & Piercing', to: '/portal/solutions/tattoo' },
        { label: 'Massage & Wellness', to: '/portal/solutions/wellness' },
        { label: 'Driving Schools', to: '/portal/solutions/driving' },
        { label: 'Tutoring Centers', to: '/portal/solutions/tutoring' },
        { label: 'Multi-location chains', to: '/portal/solutions/multi-tenant' },
        { label: 'Mobile & on-site teams', to: '/portal/solutions/mobile' },
        { label: 'Membership businesses', to: '/portal/solutions/memberships' }
      ] },
      { title: 'Compliance', links: [
        { label: 'ZATCA (Saudi)', to: '/portal/features#zatca' }, { label: 'ETA (Egypt)', to: '/portal/features#eta' },
        { label: 'Arabic + RTL', to: '/portal/features#i18n' }, { label: 'Multi-tenant', to: '/portal/features#multi-tenant' },
        { label: 'Self-hosted', to: '/portal/features#self-hosted' }
      ] },
      { title: 'Resources', links: [
        { label: 'Docs', to: '/portal/docs' }, { label: 'Buy source', to: '/portal/download' },
        { label: 'Sign in', to: '/auth/login' }, { label: 'Changelog', to: '/portal/download#changelog' },
        { label: 'Contact', to: '/portal/download#contact' }
      ] },
      { title: 'Legal', links: [
        { label: 'License', to: '/portal/legal#license' }, { label: 'Terms', to: '/portal/legal#terms' },
        { label: 'Privacy', to: '/portal/legal#privacy' }, { label: 'Sales policy', to: '/portal/legal#sales' },
        { label: 'Company', to: '/portal/legal#company' }
      ] }
    ],
    bottom: '© {year} Momentfy. Crafted for operators, not investors.',
    bottomLang: 'English · العربية',
    bottomHost: 'Self-hosted · No lock-in'
  },

  ui: {
    skipToMain: 'Skip to main content',
    backToTop: 'back to top',
    readAbout: 'Read about',
    exploreVerb: 'Explore',
    illustrative: 'Illustrative',
    illustrativeBenchmarks: 'Illustrative benchmarks',
    includedInEveryPlan: 'Included in every plan',

    breadcrumbFeatures: 'Features',
    breadcrumbAddons: 'Add-ons',
    coreModule: 'Core module',
    addonCategorySuffix: 'add-on',
    whatItDoes: 'What it does',
    whatItLooksLike: 'What it looks like',
    livePreviewPrefix: 'A live preview of the ',
    livePreviewSuffix: ' module.',
    worksBestWith: 'Works best with',
    worksBestWithBody: 'Each module is designed to work with every other — here are the ones that pair most tightly.',
    betterTogether: 'Better together.',
    keyCapabilities: 'Key capabilities',
    everyMovingPart: 'Every moving part.',
    whoItsFor: "Who it's for",
    setupTitle: 'Setup',
    setupBody: 'Four steps from enable to production — no external services required.',
    fromDisabledToLive: 'From disabled to live.',
    integratesWith: 'Integrates with',
    integratesBody: 'The modules this add-on plugs into out of the box.',
    moreFromCategoryPrefix: 'More from ',
    exploreTheChapter: 'Explore the chapter.',
    previousModule: 'Previous module',
    nextModule: 'Next module',
    previousAddon: 'Previous add-on',
    nextAddon: 'Next add-on',

    moduleNotFoundEyebrow: 'Module not found',
    addonNotFoundEyebrow: 'Add-on not found',
    noModuleWithId: 'No module with that id.',
    noAddonWithKey: 'No add-on with that key.',
    checkUrlFeatures: 'Check the URL, or browse the full feature list.',
    checkUrlAddons: 'Check the URL, or browse the full add-ons directory.',
    browseAllFeatures: 'Browse all features',
    browseAllAddons: 'Browse all add-ons',

    currencyLabel: 'Currency',
    methodsLabel: 'Methods',
    processorLabel: 'Processor',

    colVer: 'Ver',
    colLang: 'Lang',
    colHost: 'Host',
    colStat: 'Stat',

    chaptersLabel: 'Chapters:',
    appRatingLabel: 'App rating',
    timeToBookLabel: 'Time to book',
    pwaReadyLabel: 'PWA ready',
    offlineLabel: 'Offline',
    revenueLabel: 'revenue',
    oneSourceThreeBrands: 'One source. Three brands.',
    threeBrandsTagline: 'Same codebase, same release — every tenant with their own hostname, theme, and content.',
    cantFindFaq: "Can't find it? The full FAQ has 24+ more answers.",

    liveDemo: 'Live demo',
    watchTourLead: 'Watch the ',
    watchTourSuffix: ' product tour',
    tourChapters: 'Calendar → POS → Client portal → ZATCA invoice. Under three minutes.',
    demoChip: 'Demo',

    fromZeroToLive: 'From zero to live in four steps',
    readyKicker: 'Ready?',
    buyCloneTagline: 'Buy the source, clone the repo.',
    readLicense: 'Read the license',
    fullFaq: 'Full FAQ',
    stepLabel: 'Step',
    swipeHint: 'Swipe ←→ to compare tenants',
    explorerPaused: 'paused · hover to resume',
    explorerAutoPrefix: 'auto · ',
    readMore: 'Read more',
    allSixteenShip: 'All sixteen ship with every copy of the source',
    secureCheckout: 'Secure checkout',
    lifetimeLicense: 'Lifetime license',
    lifetimeUpdates: 'Lifetime updates',

    videoSectionEyebrow: 'See it in motion',
    videoSectionBody: 'A short autoplaying tour — no signup, no sign-in, no placeholders.',
    videoSectionHeading: 'A 30-second tour of the',
    videoSectionHeadingSuffix: ' module.',
    videoComingSoonEyebrow: 'Video tour · in production',
    videoComingSoon: 'We\'re recording a fresh 30-second walkthrough of this module. It lands here the moment it renders.',
    muteVideo: 'Mute',
    unmuteVideo: 'Unmute',
    playVideo: 'Play',
    pauseVideo: 'Pause',
    mutedIndicator: 'muted · tap to hear',

    mockZatcaCleared: 'ZATCA — Cleared',
    mockInvoicePrefix: 'Invoice ',
    mockVat: 'VAT',
    mockTotal: 'Total',
    mockSigned: 'Signed',
    mockAiActive: 'active',
    mockAiDraft: 'Draft messages ready to send.',
    mockAiSendAll: 'Send all',
    mockAiReview: 'Review',
    mockThisMonth: 'This month',
    mockNetRevenue: 'Net revenue · 342 tickets'
  },

  featuresPage: {
    eyebrow: 'Features', h1: 'Everything, on one tab.',
    sub: 'Sixteen major feature areas. Hundreds of screens. All wired together, all included in the source, all yours.',
    filterAll: 'all',
    filterLabels: { all: 'all' },
    groups: {
      'Front of house': 'Front of house', 'Money': 'Money', 'Relationships': 'Relationships',
      'Offering': 'Offering', 'Operations': 'Operations', 'People': 'People',
      'Insights': 'Insights', 'Clients': 'Clients', 'Platform': 'Platform',
      'Compliance': 'Compliance', 'Intelligence': 'Intelligence', 'Growth': 'Growth'
    },
    items: [] // populated with full items below via mergeFeatureItems
  },
  addonsPage: {
    eyebrow: 'Add-ons', h1: 'Sixteen modules. One codebase.',
    sub: 'Toggle per tenant. Ship for salons, clinics, gyms or studios with the same install.',
    filterAll: 'all'
  },
  pricingPage: {
    eyebrow: 'Pricing', h1a: 'Buy once.', h1b: 'Own it forever.',
    sub: 'No per-seat pricing. No per-tenant pricing. No monthly rent that grows with your success.',
    everywhereTitle: 'Included everywhere', everywhereHeading: 'Every plan ships with the lot.',
    included: ['Full source code', 'Arabic + English', 'Unlimited users', 'Self-host anywhere', 'ZATCA + ETA ready', 'PWA client portal', 'AI assistant', 'Accounting engine'],
    compareEyebrow: 'Why not SaaS?', compareHeading: 'Do the math.',
    compareBody: 'What typical booking SaaS costs over 3 years for a 3-location chain:',
    saasLabel: 'Typical SaaS', saasValue: '$7,200+',
    saasBody: '$200/mo × 36 months. Price rises yearly. You never own the data.',
    momentfyLabel: 'Momentfy Self-install', momentfyValue: '$599',
    momentfyBody: 'One payment. Unlimited tenants. Full source. Lifetime updates. Own it.',
    faq: {
      eyebrow: 'Pricing questions',
      heading: 'Pricing, translated.',
      items: [
        { q: 'Are updates really forever?', a: "Yes. Both plans include lifetime updates — every future release is yours at no additional cost. No renewal, no tier upgrade, no surprise bill." },
        { q: 'What\'s the difference between Self-install and Done-for-you?', a: 'Exact same source code, same unlimited tenants, same lifetime updates. Self-install means you deploy it yourself (takes about an hour with our Docker Compose guide). Done-for-you means we deploy on your VPS, configure your tenant and branding, activate ZATCA/ETA, migrate your existing data, and run a 60-minute training session with your team.' },
        { q: 'Can I try before I buy?', a: 'Yes — a live demo URL is available from the hero and pricing page. Click through the full product with sample data before purchasing.' },
        { q: 'Which currencies and payment methods?', a: 'Primary pricing is in USD. At checkout you can pay in USD, SAR, EGP, EUR, GBP or AED — Lemon Squeezy auto-converts. Visa, Mastercard, Amex, Apple Pay and Google Pay are supported. For bank transfer on invoice, email hello@momentfy.io.' },
        { q: 'Can I upgrade from Self-install to Done-for-you later?', a: 'Yes. Pay the difference and we\'ll schedule your installation. Just email with your order number.' },
        { q: 'Do you bill VAT or tax?', a: 'Lemon Squeezy handles VAT, MoR obligations, and country-specific tax registration — including Saudi 15% VAT and EU VAT — automatically at checkout.' },
        { q: 'Can I buy one license for multiple businesses I run?', a: 'One license covers one legal entity. If you operate two separate entities, you need two licenses. For multi-brand deployments inside a single entity, one license is fine.' },
        { q: 'Do you offer refunds?', a: 'All sales are final once the source is downloaded. If your download link fails or the archive is materially broken and we can\'t fix it within 7 days, we\'ll issue a full refund. See the Sales policy on the legal page.' }
      ]
    },
    payments: {
      eyebrow: 'Checkout & payment',
      heading: 'Safe, local, auditable.',
      sub: 'All payments run through Lemon Squeezy — a Merchant of Record so you get a proper tax invoice with VAT in your local currency.',
      currency: 'Primary USD · auto-converts to SAR, EGP, EUR, GBP, AED at checkout',
      methods: ['Visa · Mastercard · Amex', 'Apple Pay · Google Pay', 'Bank transfer on invoice (on request)'],
      processor: 'Processed by Lemon Squeezy · Merchant of Record'
    }
  },
  showcasePage: {
    eyebrow: 'Showcase', h1a: 'One platform.', h1b: 'Every vertical.',
    sub: 'Flip the switches. Ship the product. Six industries, identical source code.',
    shipsWith: 'Ships with', cta1: 'See matching features', cta2: 'Required add-ons',
    statsNote: 'Numbers are illustrative benchmarks — drawn from early-operator self-reports and industry norms, not a guaranteed result for every deployment.',
    verticals: [
      { id: 'salon', title: 'Salons & Spas',
        hero: 'Color-coded staff lanes, memberships, gift cards and loyalty — built for the rhythm of a salon.',
        setup: ['Calendar', 'POS', 'Memberships', 'Loyalty', 'Campaigns', 'Reviews'],
        stats: [{ k: 'Avg. no-show drop', v: '-38%' }, { k: 'Rebook rate', v: '+52%' }, { k: 'Checkout time', v: '< 90s' }] },
      { id: 'dental', title: 'Dental Clinics',
        hero: 'Odontogram, treatment plans, DICOM imaging, prescriptions and insurance — plus ZATCA e-invoicing.',
        setup: ['Calendar', 'Dental Chart', 'Imaging', 'Prescriptions', 'Insurance', 'ZATCA'],
        stats: [{ k: 'Chair utilization', v: '+24%' }, { k: 'Insurance recovery', v: '+31%' }, { k: 'Record time', v: '-65%' }] },
      { id: 'medical', title: 'Medical Clinics',
        hero: 'Structured EMR, lab orders, prescriptions and multi-doctor scheduling with insurance-ready invoicing.',
        setup: ['Calendar', 'Medical Records', 'Lab Orders', 'Prescriptions', 'Insurance', 'Portal'],
        stats: [{ k: 'Charting time', v: '-40%' }, { k: 'Portal adoption', v: '72%' }, { k: 'Lab turnaround', v: '-28%' }] },
      { id: 'barber', title: 'Barber Shops',
        hero: 'Walk-in queue, fast POS and per-barber commissions. Built for volume.',
        setup: ['Calendar', 'POS', 'Memberships', 'Commissions', 'Tips', 'Campaigns'],
        stats: [{ k: 'Avg. ticket', v: '+18%' }, { k: 'Queue wait', v: '-44%' }, { k: 'Commission accuracy', v: '100%' }] },
      { id: 'fitness', title: 'Fitness & Studios',
        hero: 'Group classes, memberships, waitlists and attendance tracking. Kiosk-friendly check-in.',
        setup: ['Events', 'Memberships', 'Attendance', 'Portal', 'Campaigns', 'Reports'],
        stats: [{ k: 'Class fill rate', v: '+26%' }, { k: 'Member churn', v: '-19%' }, { k: 'Check-in time', v: '< 5s' }] },
      { id: 'pet', title: 'Vet & Pet Care',
        hero: 'Vet records, vaccination schedules, boarding and day-care billing in one place.',
        setup: ['Calendar', 'Medical Records', 'Boarding', 'POS', 'Portal', 'Reminders'],
        stats: [{ k: 'Vaccine recall', v: '+48%' }, { k: 'Boarding utilization', v: '+33%' }, { k: 'Client reviews', v: '4.9★' }] }
    ]
  },
  downloadPage: {
    eyebrow: 'Get the source', h1: 'Ready in ten minutes.',
    sub: 'Buy once. Download the source. Deploy anywhere. Start billing your clients.',
    buy: 'Choose a plan', talk: 'Talk to us first',
    steps: [
      { n: '01', title: 'Buy', body: 'Secure checkout via Lemon Squeezy. Lifetime license key delivered by email.' },
      { n: '02', title: 'Download', body: 'Get a zipped copy of the full source repo + install guide + .env template.' },
      { n: '03', title: 'Install', body: "Docker Compose up, or run the install wizard in your browser. Ten minutes." },
      { n: '04', title: 'Configure', body: "Create your first tenant, enable add-ons, upload your logo — you're live." }
    ],
    inside: { eyebrow: 'Inside the zip', heading: "What you'll actually download.",
      body: "Nothing hidden. Here's exactly what lands in your inbox.",
      items: ['Full Nuxt 4 + Vue 3 TypeScript app', 'Prisma schema, migrations and seeds', 'Server API with H3 handlers',
        'Dockerfile + docker-compose.yml', 'Install wizard + sample .env', 'English + Arabic locale files',
        'Admin / Portal / Booking layouts', 'MIT-compatible internal license']
    },
    changelog: { eyebrow: 'Changelog', heading: "What's new.",
      entries: [
        { ver: 'v1.0 · Shipping now', title: 'Insurance classes & coverage rules', body: 'InsuranceClass + InsuranceClassCoverage models with full CRUD and coverage-rule management for clinics.', current: true },
        { ver: 'v0.9', title: 'Check-in management + ETA invoice', body: 'Improved filtering, sorting and direct ETA invoice generation from check-ins.' },
        { ver: 'v0.8', title: 'Follow-up task engine', body: 'Client + member validation, truncation notice, improved pagination.' }
      ]
    },
    contact: { eyebrow: 'Contact', heading: 'Want a demo or have a question?', sub: 'We reply within one business day.',
      name: 'Name', namePh: 'Your name', email: 'Email *', emailPh: 'you@company.com',
      message: 'How can we help?', messagePh: 'Tell us about your business…',
      submit: 'Send message', sent: 'Message sent — talk soon'
    },
    faq: { eyebrow: 'Answers', heading: 'What buyers ask most.', items: [
      { q: 'Do I get the real source code?', a: 'Yes — the entire TypeScript codebase. Nuxt app, server API, Prisma schema, migrations, seeds. No obfuscation, no minification.' },
      { q: 'Can I modify the code?', a: "Completely. Change branding, add features, rip out whatever you don't want." },
      { q: 'Do I need a server?', a: 'Any VPS with Docker. We recommend 2GB RAM, PostgreSQL, and an S3-compatible bucket for uploads.' },
      { q: 'Are updates included?', a: 'Yes — lifetime updates on both plans. Every future release lands in your private download link at no extra cost, no renewal, forever.' }
    ]}
  },
  faqPage: {
    eyebrow: 'FAQ', h1: "Everything you'd ask.",
    sub: "If your question isn't here,", contactLink: 'drop us a line',
    sections: [
      { title: 'Licensing & pricing', items: [
        { q: 'Is this a SaaS subscription?', a: 'No. Momentfy is source-available. You buy the code once and host it yourself. No monthly bill.' },
        { q: "What's included in the price?", a: 'The entire source code repository, install documentation, an .env template and a lifetime license key — with lifetime updates included on both plans. Done-for-you also includes us installing it for you.' },
        { q: 'Can I resell it as a SaaS to my own clients?', a: 'Yes on both plans — multi-tenant mode is built in and each tenant you onboard counts as your own. You may not resell the source code itself to other developers; that is not what the license covers.' },
        { q: 'Do you offer a free demo?', a: 'Yes — a live demo URL is available on the pricing page and the homepage. You can click around the full product with sample data before you buy.' }
      ]},
      { title: 'Installation & hosting', items: [
        { q: 'What do I need to deploy?', a: 'Any Linux VPS with Docker (2GB RAM minimum), PostgreSQL 14+, and optionally an S3-compatible bucket.' },
        { q: 'Can I run it on shared hosting?', a: 'Technically yes with Node 18+, but we strongly recommend a dedicated VPS from providers like Hetzner, DigitalOcean or Railway.' },
        { q: 'How long does install take?', a: 'About 10 minutes. `docker compose up -d`, open the browser, run the install wizard.' },
        { q: 'Do you help with deployment?', a: "Pick the Done-for-you plan — we install on your VPS, set up your tenant, activate ZATCA/ETA, migrate your data and train your team. The Self-install plan comes with a step-by-step Docker Compose guide and email support." }
      ]},
      { title: 'Multi-tenant & SaaS', items: [
        { q: 'Can one install serve multiple businesses?', a: 'Yes. Multi-tenant mode is a flag. One deployment serves unlimited tenants, each with isolated data.' },
        { q: 'Can I charge my tenants?', a: 'Absolutely. Built-in subscription plans, usage limits, Lemon Squeezy/Stripe integration and a super-admin panel ship out of the box.' },
        { q: 'Can tenants have their own branding?', a: 'Yes. Logo, menu config, locale default, add-on toggles — all per tenant.' },
        { q: 'Is single-tenant mode supported?', a: 'Yes. Set `APP_MODE=single-tenant` and subscription checks are skipped — perfect for running your own shop.' }
      ]},
      { title: 'Compliance & regions', items: [
        { q: 'Does it support ZATCA Phase 2?', a: 'Yes. Full flow: CSR, CSID, XML UBL signing, QR stamping, clearance and reporting. Ready for Saudi Arabia.' },
        { q: "Does it support Egypt's ETA e-invoicing?", a: 'Yes. Item/customer code mapping, pre-submission validation, submission and status tracking, credit notes.' },
        { q: 'Does it handle VAT?', a: 'Yes — per-item tax rates, VAT-inclusive pricing, VAT return report, and tax-code mapping for e-invoicing.' },
        { q: 'Is it GDPR-friendly?', a: 'Yes — you control the data because you host it. Includes data-export, deletion and audit logs.' }
      ]},
      { title: 'Features & customization', items: [
        { q: "Can I rip out features I don't need?", a: 'Yes. Every add-on is toggleable per tenant; remove the code entirely if you want.' },
        { q: 'Can I add my own features?', a: "Yes — it's your code now. Nuxt 4, Vue 3, Prisma, standard TypeScript." },
        { q: 'Is there an API?', a: 'Yes — server routes using H3. You can expose them publicly with auth middleware.' },
        { q: 'Does it support offline?', a: "Yes, it's a PWA with workbox caching. Booking and POS keep working when the network blinks." }
      ]},
      { title: 'Support & updates', items: [
        { q: 'How do updates work?', a: 'You get a private download link. Clone/pull the new version and run migrations.' },
        { q: 'Are there breaking changes?', a: 'We follow semver. Minor versions are drop-in. Major versions ship a migration guide.' },
        { q: 'How do I get support?', a: 'Email support on both plans. Done-for-you includes priority reply within 24 hours. Self-install replies within 48 hours on business days.' },
        { q: 'Is there a roadmap?', a: 'Yes — buyers get access to the private roadmap and can vote on priorities.' }
      ]}
    ]
  },

  docsPage: {
    eyebrow: 'Docs',
    h1: 'Everything you need to deploy.',
    sub: 'A compact operator guide. Deeper reference docs ship with the source in /docs.',
    sections: [
      {
        id: 'requirements', num: '01', title: 'System requirements',
        body: 'Momentfy runs as a Node.js + PostgreSQL app. Any modest VPS or managed Node host will do.',
        kv: [
          { k: 'Runtime',  v: 'Node.js 20 LTS or newer' },
          { k: 'Database', v: 'PostgreSQL 14 or newer' },
          { k: 'RAM',      v: '2 GB min · 4 GB recommended' },
          { k: 'CPU',      v: '2 vCPU recommended' },
          { k: 'Disk',     v: '20 GB + your upload volume' },
          { k: 'Storage',  v: 'Local disk or any S3-compatible bucket' },
          { k: 'SSL',      v: 'Required for ZATCA, PWA and push notifications' }
        ]
      },
      {
        id: 'hosting-cost', num: '02', title: 'Typical hosting cost',
        body: 'Self-hosted means you own the server bill. Real-world monthly costs land in these brackets:',
        kv: [
          { k: 'Solo operator',  v: '≈ $5–10 / month (1× small VPS + SQLite-ish workload)' },
          { k: '3–5 locations',  v: '≈ $15–30 / month (2 GB VPS + managed PG)' },
          { k: 'SaaS reseller',  v: '≈ $40–120 / month (dedicated PG + S3 + CDN)' }
        ]
      },
      {
        id: 'deployment', num: '03', title: 'Deployment',
        body: 'The repo ships with a Dockerfile, docker-compose.yml and a browser-based install wizard. You can also deploy without Docker if you prefer.',
        items: [
          'Docker Compose — one command, includes Postgres',
          'Bare Node.js — clone, `npm ci`, `npm run build`, serve with PM2 or systemd',
          'Hetzner / DigitalOcean / Railway — tested Docker images, step-by-step guide included in /docs',
          'macOS / Windows for local development — supported out of the box',
          'Managed Postgres (Supabase / Neon / RDS) — pointed via DATABASE_URL'
        ]
      },
      {
        id: 'repo-access', num: '04', title: 'Repo & updates',
        body: 'When you purchase, we add you to a private GitHub organisation with your own license seat. Every release ships as a tagged commit — pull, migrate, restart.',
        items: [
          'Private GitHub repo invite to your email within minutes',
          'Releases follow semver · migrations are included in each tag',
          'Release notes + upgrade guide on every major',
          'If you prefer ZIPs over git, signed release archives are also available'
        ]
      },
      {
        id: 'multi-tenant', num: '05', title: 'Single- vs multi-tenant',
        body: 'Set APP_MODE=single-tenant for your own shop. Set multi-tenant to resell or serve clients under branded portals.',
        items: [
          'Single-tenant → no plans/subscription checks, one tenant per install',
          'Multi-tenant → slug-based routing, super-admin panel, per-tenant branding & add-on toggles',
          'Switch modes at any time — no schema changes required'
        ]
      },
      {
        id: 'backups', num: '06', title: 'Backups & disaster recovery',
        body: 'Self-hosted means backups are on you. The repo ships with a daily backup hook but you decide where it lands.',
        items: [
          'Nightly `pg_dump` via scheduled task (included)',
          'Uploads stored on S3 → use S3 versioning or lifecycle rules',
          'Recommended: offsite copy (S3, Backblaze, or your own NAS)',
          'Restore tested under docs/restore.md'
        ]
      },
      {
        id: 'environment', num: '07', title: 'Key environment variables',
        body: 'Everything in .env. Only a handful are required; the rest are optional feature toggles.',
        kv: [
          { k: 'DATABASE_URL',      v: 'Postgres connection string (required)' },
          { k: 'NUXT_SESSION_PASSWORD', v: 'Random 32+ char secret (required)' },
          { k: 'APP_MODE',          v: 'single-tenant | multi-tenant' },
          { k: 'S3_*',              v: 'S3 bucket for uploads (optional — falls back to local disk)' },
          { k: 'SMTP_*',            v: 'Transactional email (password resets, receipts)' },
          { k: 'ZATCA_*',           v: 'Saudi e-invoicing keys (optional)' },
          { k: 'AI_PROVIDER_URL',   v: 'OpenAI-compatible endpoint (optional AI add-on)' }
        ]
      },
      {
        id: 'license-summary', num: '08', title: 'License at a glance',
        body: 'One-line version of the full terms. See /portal/legal for the authoritative license text.',
        items: [
          'You can deploy it for your own business or for your own paying clients',
          'You can modify any line and keep those changes private',
          'You cannot resell the source code itself to other developers',
          'You cannot remove or obscure the licence header in the repo',
          'Your license is per-deployment-operator — each legal entity needs its own license'
        ]
      }
    ]
  },

  legalPage: {
    eyebrow: 'Legal',
    h1: 'The small print, in plain English.',
    sub: 'License, Terms of Service and Privacy — all on one page, so you can read them in under ten minutes.',
    lastUpdated: 'Last updated 2026-04-18',
    sections: [
      {
        id: 'license', num: '01', title: 'License',
        body: 'Momentfy is source-available commercial software. Buying a license gives you a non-exclusive, non-transferable right to deploy and operate the code under the conditions below.',
        can: [
          'Deploy it for your own business or legal entity',
          'Deploy it for your own direct clients (SaaS reselling allowed on both plans)',
          'Modify, extend, and fork the code for your own deployments — those changes stay yours',
          'Self-host on any infrastructure, anywhere in the world',
          'Use it in commercial production from day one'
        ],
        cannot: [
          'Resell or sublicense the source code itself to other developers',
          'Publish the source publicly or open-source it under a different license',
          'Remove or obscure license headers, copyright notices or attribution files',
          'Use one license across multiple unaffiliated legal entities — each entity needs its own'
        ]
      },
      {
        id: 'terms', num: '02', title: 'Terms of service',
        body: 'By purchasing or downloading the software you agree to these terms. They are written as plainly as we can.',
        items: [
          { k: 'Acceptance',  v: 'Purchase or download of the software constitutes acceptance of this license and these terms.' },
          { k: 'Updates',     v: 'Both plans include lifetime updates. Every future release is delivered to your private download link at no additional cost, with no renewal required.' },
          { k: 'Support',     v: 'Email support is included on both plans. Priority response (<24h on business days) on the Done-for-you plan; standard response (<48h) on Self-install.' },
          { k: 'Warranty',    v: 'The software is provided "as is" without warranty of any kind. Because you host it, you are responsible for backups, security patches and uptime.' },
          { k: 'Liability',   v: 'Our total liability is capped at the amount you paid for the license in the prior 12 months.' },
          { k: 'Termination', v: 'The license terminates automatically if you materially breach it (e.g. republishing the source). On termination you must stop using the software and destroy all copies.' },
          { k: 'Governing law', v: 'Saudi Arabia law applies unless your legal entity is EU-based, in which case the Republic of Ireland governs — both under the UN CISG convention.' }
        ]
      },
      {
        id: 'privacy', num: '03', title: 'Privacy',
        body: 'Because Momentfy is self-hosted, your tenants\' data never touches our servers. Your users, clients, appointments and invoices live on infrastructure you control.',
        items: [
          { k: 'What we collect', v: 'Only your purchase email, billing details (via Lemon Squeezy) and GitHub handle (for repo access). No tenant data.' },
          { k: 'What we share',   v: 'Nothing. Your purchase record stays between us and Lemon Squeezy (our Merchant of Record).' },
          { k: 'Cookies',         v: 'This marketing site uses no third-party tracking cookies. Your deployed product sets its own auth cookie on your own domain.' },
          { k: 'Your rights',     v: 'You can request export or deletion of your purchase record at any time by emailing hello@momentfy.io.' },
          { k: 'GDPR / Saudi PDPL', v: 'Because the data stays on your infrastructure, you are the controller. We are not a processor of your tenant data.' }
        ]
      },
      {
        id: 'sales', num: '04', title: 'Sales policy',
        body: 'Momentfy is delivered as source code. Once you download it you have the product in hand — so by policy all sales are final.',
        items: [
          { k: 'Delivery',        v: 'Your license key and private download link arrive immediately after payment clears. Installation instructions are included in the archive.' },
          { k: 'No refunds',      v: 'Because source code cannot be returned once downloaded, all purchases are final. By checking out you explicitly waive any statutory withdrawal right on digital goods.' },
          { k: 'Undelivered or broken', v: "If your download link does not work or the archive is materially corrupted and we cannot fix it within 7 days of your report, we'll refund you in full — email hello@momentfy.io with your order number." },
          { k: 'Chargebacks',     v: 'Please contact support before raising a chargeback. Unprompted chargebacks terminate your license and revoke your access to future updates.' },
          { k: 'License terminates', v: 'If a refund is issued for any reason, your license ends. You must delete the source and stop running the software.' }
        ]
      },
      {
        id: 'company', num: '05', title: 'Company',
        body: 'Momentfy is developed and maintained by an independent team. We do not take outside investment and we are accountable to operators, not shareholders.',
        items: [
          { k: 'Entity',       v: 'Momentfy Software FZ-LLC (placeholder — update with your actual legal entity name)' },
          { k: 'Address',      v: 'Placeholder — update with your registered address' },
          { k: 'Tax ID',       v: 'Placeholder — update with your VAT / tax registration' },
          { k: 'Contact',      v: 'hello@momentfy.io' },
          { k: 'Support',      v: 'support@momentfy.io' },
          { k: 'Press',        v: 'press@momentfy.io' }
        ]
      }
    ],
    companyLabel: 'Contact',
    companyLines: ['hello@momentfy.io', 'support@momentfy.io']
  }
}

// ═══════════════════════════ ARABIC ═══════════════════════════
const ar: Copy = {
  dir: 'rtl',
  nav: {
    features: 'المزايا', addons: 'الإضافات', showcase: 'القطاعات', pricing: 'الأسعار', faq: 'الأسئلة الشائعة', docs: 'الدليل',
    signIn: 'تسجيل الدخول', getCode: 'اشترِ الكود', langLabel: 'اللغة'
  },
  hero: {
    badge: 'Momentfy 1.0 متاح الآن وجاهز للتشغيل الفعلي',
    h1a: 'المنصة المتكاملة',
    highlight: 'لتشغيل',
    h1b: 'أعمال المواعيد والخدمات.',
    sub: 'قاعدة كود واحدة تدير المواعيد ونقاط البيع والعملاء والمخزون والمحاسبة والفريق وبوابة العميل والمساعد الذكي، بالعربية والإنجليزية من اليوم الأول.',
    subStrong: 'شراء مرة واحدة، ملكية دائمة، واستضافة على البنية التي تختارها.',
    primary: 'اشترِ الشيفرة المصدرية',
    secondary: 'اطلب عرضاً توضيحياً',
    trust: ['ترخيص دائم', 'حسابات ومنشآت بلا حد', 'وصول كامل للشيفرة', 'تحديثات مدى الحياة'],
    chips: {
      zatca: { tag: 'هيئة الزكاة المرحلة 2', msg: 'تم إرسال الفاتورة المعتمدة' },
      ai: { tag: 'المساعد الذكي', msg: 'أعاد حجز 4 عملاء' }
    },
    chromeUrl: 'app.momentfy.io / لوحة التحكم',
    statsStrip: [
      { k: '+120', v: 'شاشة داخل المنصة' },
      { k: '16', v: 'إضافة قابلة للتفعيل' },
      { k: '2', v: 'العربية + الإنجليزية' },
      { k: '100%', v: 'شيفرة مصدرية كاملة' }
    ]
  },
  why: {
    eyebrow: 'لماذا Momentfy', h2a: 'ليست منصة تدفع عليها', h2b: 'كل شهر.',
    body: 'معظم أنظمة الحجز تزداد كلفتها كلما توسعت. Momentfy يمنحك العكس تماماً: دفعة واحدة، قاعدة كود تملكها، نشر على أي خادم، وحرية تعديل كل تفصيلة عندما تحتاج.',
    items: [
      { title: 'شيفرة تملكها بالكامل', body: 'تطبيق TypeScript كامل مبني على Nuxt 4 و Vue 3 و Prisma و PostgreSQL، بلا تشفير وبلا ارتباط بمزوّد واحد.' },
      { title: 'جاهز لعملك أو لطرحك التجاري', body: 'شغّله لمنشأتك مباشرة، أو فعّل وضع الحسابات المتعددة وقدّمه كخدمة لعدة علامات وفروع.' },
      { title: 'عربي أصيل مع دعم RTL', body: 'العربية والإنجليزية جزء من المنتج من البداية، مع واجهات واتجاه كتابة وتواريخ وعملات تناسب السوق المحلي.' },
      { title: 'امتثال جاهز من البداية', body: 'هيئة الزكاة المرحلة الثانية، فوترة ETA المصرية، ضريبة القيمة المضافة، سجل المراجعة والأصول الثابتة كلها موجودة داخل المنتج.' },
      { title: 'مساعد ذكي مدمج', body: 'مساعد مبني على Vercel AI SDK داخل الحجز وبوابة العميل، ويعمل مع أي مزوّد متوافق مع OpenAI.' },
      { title: 'تطبيق PWA يعمل حتى بدون اتصال', body: 'قابل للتثبيت على iPhone و Android، ويستمر الحجز ونقاط البيع في العمل حتى عند ضعف الشبكة أو انقطاعها.' }
    ]
  },
  modules: {
    eyebrow: 'تسع وحدات أساسية', heading: 'كل ما يحتاجه تشغيلك اليومي في مكان واحد.',
    sub: 'الوحدات مترابطة من الأساس، بلا ترقيع ولا وصلات خارجية مربكة. ويمكن تشغيل ما تحتاجه فقط لكل حساب أو منشأة.',
    linkAll: 'استعرض جميع الشاشات',
    items: [
      { id: 'calendar', label: 'التقويم', blurb: 'جدولة بالسحب والإفلات مع تغيير الحجم، تعدد الفروع، مسارات الموظفين، الأوقات المحجوبة وحجز الموارد.' },
      { id: 'sales', label: 'المبيعات ونقاط البيع', blurb: 'نقاط بيع سريعة مع تذاكر، فواتير متكررة، عروض أسعار، إشعارات دائنة، بطاقات هدايا، مصاريف وصندوق.' },
      { id: 'clients', label: 'العملاء و CRM', blurb: 'ملفات عملاء غنية، شرائح ديناميكية، حملات، تقييمات، تذاكر دعم وطابور متابعة مدعوم بالذكاء الاصطناعي.' },
      { id: 'catalogue', label: 'الكتالوج', blurb: 'خدمات، باقات، اشتراكات، منتجات، خصومات وقواعد تسعير ذكية — في كتالوج واحد.' },
      { id: 'inventory', label: 'المخزون', blurb: 'موردون، أوامر شراء، جرد، تحويلات، مقارنة مخزون ومدفوعات الموردين.' },
      { id: 'team', label: 'الفريق والموارد البشرية', blurb: 'أعضاء، جداول، حضور، إجازات، ورقات دوام، أوقات محجوبة، رواتب وعمولات.' },
      { id: 'accounting', label: 'المحاسبة', blurb: 'قيد مزدوج، دليل حسابات، يومية، فواتير موردين، تسوية بنكية، أصول ثابتة وسجل مراجعة.' },
      { id: 'reports', label: 'التقارير', blurb: 'أرباح وخسائر، ميزانية عمومية، تدفق نقدي، ضريبة، أعمار الذمم، عمولات، حضور ومؤشرات أداء.' },
      { id: 'portal', label: 'بوابة العميل', blurb: 'تطبيق PWA يحمل هوية منشأتك. من خلاله يحجز العملاء، يدفعون الفواتير، يتابعون العضويات والولاء ويتواصلون مع المساعد الذكي.' }
    ]
  },
  industries: {
    eyebrow: 'القطاعات', heading: 'منصة واحدة تخدم تخصصات متعددة.',
    sub: 'فعّل الإضافات المناسبة لقطاعك وأطلق منتجاً يبدو وكأنه بُني لك خصيصاً خلال ساعات لا خلال أشهر.',
    items: [
      { id: 'salon', label: 'الصالونات والسبا', tagline: 'جاهز مباشرة' },
      { id: 'dental', label: 'عيادات الأسنان', tagline: 'جاهز مباشرة' },
      { id: 'medical', label: 'العيادات الطبية', tagline: 'جاهز مباشرة' },
      { id: 'barber', label: 'محلات الحلاقة', tagline: 'جاهز مباشرة' },
      { id: 'fitness', label: 'الصالات الرياضية والاستوديوهات', tagline: 'جاهز مباشرة' },
      { id: 'pet', label: 'البيطرة ورعاية الحيوانات', tagline: 'جاهز مباشرة' },
      { id: 'therapy', label: 'العلاج النفسي والتدريب', tagline: 'جاهز مباشرة' },
      { id: 'photo', label: 'استوديوهات التصوير', tagline: 'جاهز مباشرة' }
    ]
  },
  addons: {
    eyebrow: '16 إضافة', heading: 'شكّل المنتج بالطريقة التي تناسب سوقك.',
    sub: 'من امتثال هيئة الزكاة إلى صور DICOM والمساعد الذكي، كل الإضافات موجودة داخل قاعدة الكود وجاهزة للتفعيل حسب الحاجة.',
    linkAll: 'كل الإضافات',
    items: [
      { key: 'zatca', label: 'هيئة الزكاة المرحلة 2', desc: 'فوترة إلكترونية سعودية مع ختم تشفيري، توقيع XML وتقرير.' },
      { key: 'eta', label: 'فوترة ETA', desc: 'فواتير وتدفق تقديم معتمد من مصلحة الضرائب المصرية.' },
      { key: 'ai', label: 'المساعد الذكي', desc: 'مساعد Vercel AI SDK في الحجز وبوابة العميل مع مزودين متوافقين مع OpenAI.' },
      { key: 'gcal', label: 'تقويم جوجل', desc: 'مزامنة ثنائية للمواعيد والأوقات المحجوبة مع تقويمات موظفيك.' },
      { key: 'insurance', label: 'شرائح التأمين', desc: 'شرائح تأمين، قواعد تغطية وفواتير جاهزة للمطالبات للعيادات.' },
      { key: 'dental', label: 'مخطط الأسنان', desc: 'مخططات أسنان للأطفال والبالغين مع تتبع العلاج على مستوى السطح.' },
      { key: 'imaging', label: 'التصوير الطبي', desc: 'عارض DICOM مع تعليقات، مرفق بسجلات العميل.' },
      { key: 'labs', label: 'طلبات المختبر', desc: 'اطلب فحوصات، استقبل النتائج، انشرها في بوابة العميل.' },
      { key: 'rx', label: 'الوصفات الطبية', desc: 'كتابة وصفات مع إمكانية تنزيلها من بوابة المريض.' },
      { key: 'records', label: 'السجلات الطبية', desc: 'سجل طبي إلكتروني منظم مع ملاحظات SOAP والمرفقات.' },
      { key: 'resources', label: 'الموارد', desc: 'احجز الغرف والكراسي والمعدات بجانب الموظفين.' },
      { key: 'loyalty', label: 'نقاط الولاء', desc: 'قواعد الكسب، الاستبدال، انتهاء الصلاحية ومحفظة البوابة.' },
      { key: 'followup', label: 'مهام المتابعة', desc: 'مهام متابعة تلقائية مسندة لأعضاء الفريق مع اتفاقيات مستوى الخدمة.' },
      { key: 'events', label: 'الفعاليات والحصص', desc: 'حصص جماعية، ورش عمل، سعات وقوائم انتظار.' },
      { key: 'attendance', label: 'حضور العميل', desc: 'تتبع التسجيل للصالات والمدارس والبرامج المتكررة.' },
      { key: 'boarding', label: 'استضافة الحيوانات', desc: 'استضافة بسعر اليوم للأطباء البيطريين ومنتجعات الحيوانات.' }
    ]
  },
  addonDetails: {
    zatca: {
      long: 'ضريبة الزكاة السعودية "ZATCA" المرحلة 2 تلزم كل الفواتير بتوقيع تشفيري وختم QR وإرسال فوري لهيئة الزكاة. Momentfy يشحن التدفق الكامل — CSR وإصدار CSID وتوقيع UBL والإجازة والتقرير — بلا خدمات SaaS خارجية.',
      bullets: [
        'توليد CSR وإصدار CSID عبر نقاط ZATCA الإنتاجية',
        'توقيع XML بصيغة UBL 2.1 — المفاتيح الخاصة تبقى على خادمك',
        'رمز QR مختوم على كل فاتورة مطبوعة و PDF',
        'تدفق إجازة فورية (B2B) وتقرير (B2C)',
        'طابور إعادة محاولة مع إظهار واضح للأخطاء في الإدارة',
        'أرشفة كاملة للفواتير المُجازة مع معرفات التقديم',
        'خط رمز الريال السعودي (U+20C1) مدمج'
      ],
      whoFor: 'أي عمل سعودي مسجل بالرقم الضريبي يصدر فواتير VAT.',
      setupSteps: [
        'أدخل رقمك الضريبي في إعدادات المستأجر',
        'ولّد CSR من الإدارة (نقرة واحدة) وارفعه على فاتورة',
        'ألصق CSID العائد في Momentfy',
        'اختبر في بيئة التجربة ثم انتقل للإنتاج'
      ],
      integrates: ['المبيعات ونقاط البيع', 'المحاسبة', 'بوابة العميل']
    },
    eta: {
      long: 'مصلحة الضرائب المصرية "ETA" تتطلب أن تُربط كل فاتورة B2B بأكواد عناصر وعملاء وتُرسل إلى بوابتها خلال دقائق. Momentfy يتحدث schema ETA كاملاً ويتحقق قبل التقديم ويعالج التصحيحات.',
      bullets: [
        'ربط أكواد العناصر والعملاء بمحرر دفعات',
        'تحقق قبل التقديم يكشف أخطاء schema قبل الرحلة',
        'تقديم موقّع مع تتبع حالة (مُقدم → مقبول → مُجاز)',
        'إشعارات دائنة وتصحيحات مدعومة بالكامل',
        'تقارير تسوية متوافقة مع إقرارات ETA الربع سنوية',
        'إعادة محاولة تلقائية عند فشل API العابر'
      ],
      whoFor: 'أي عمل مصري مسجل مطلوب منه تقديم فوترة ETA.',
      setupSteps: [
        'احصل على client secret من ETA وارفعه في إعدادات المستأجر',
        'اربط معدلات الضرائب بأكواد ETA في جدول الإعدادات',
        'اربط أكواد منتجاتك الرئيسية بأكواد ETA (رفع CSV)',
        'قدّم فاتورة اختبار، تأكد من القبول، ثم انطلق للإنتاج'
      ],
      integrates: ['المبيعات ونقاط البيع', 'المحاسبة', 'العملاء و CRM']
    },
    ai: {
      long: 'مساعد ذكي مبني على Vercel AI SDK يعيش في تدفق حجز العميل وبوابة المستأجر. استخدم نقطة OpenAI-compatible الخاصة بك (OpenAI أو proxies أو Ollama محلي). المساعد مبني على خدماتك وساعاتك وسياساتك — بلا مواعيد وهمية.',
      bullets: [
        'أداة دردشة داخل موقع الحجز وبوابة العميل',
        'مبني على خدماتك وساعات عملك وموظفيك وأسعارك الفعلية',
        'قادر على إرشاد العميل خلال الحجز حتى النهاية',
        'صوت العلامة التجارية لكل مستأجر عبر system prompt مخصص',
        'مزوّد ونموذج قابل للضبط (متوافق مع OpenAI)',
        'ضوابط تكلفة: ميزانية tokens لكل مستأجر + حد مرن',
        'لوحة تتبع الاستخدام في super-admin'
      ],
      whoFor: 'أي مستأجر يريد مساعداً على مدار 24/7 بدون توظيف موظفي استقبال إضافيين.',
      setupSteps: [
        'فعّل إضافة المساعد الذكي من إعدادات المستأجر',
        'ألصق مفتاح API وعنوان endpoint المتوافق مع OpenAI',
        'حدد ميزانية tokens الشهرية و system prompt للعلامة',
        'اختبر في معاينة موقع الحجز ثم انشر'
      ],
      integrates: ['بوابة العميل', 'التقويم', 'العملاء و CRM']
    },
    gcal: {
      long: 'مزامنة ثنائية بين تقويم Google لكل موظف وجدوله في Momentfy. المواعيد المحجوزة في Momentfy تظهر في تقويم Google فوراً؛ أوقات Google المشغولة تُسحب فلا يحدث حجز مزدوج.',
      bullets: [
        'OAuth لكل موظف — كل عضو يصرّح لتقويمه الشخصي',
        'خارج: مواعيد Momentfy → أحداث Google خلال ثوانٍ',
        'داخل: أوقات Google المشغولة تصبح وقتاً محجوباً في Momentfy',
        'وعي بالمنطقة الزمنية — آمن عبر DST والموظفين المسافرين',
        'إعادة مزامنة تلقائية إذا سحب الموظف الإذن ومنحه ثانية',
        'يعمل مع Gmail الشخصي و Google Workspace'
      ],
      whoFor: 'الفرق التي يعيش موظفوها في Google Calendar لارتباطاتهم الشخصية.',
      setupSteps: [
        'فعّل إضافة Google Calendar',
        'أنشئ مشروع Google Cloud وعميل OAuth (مرة واحدة)',
        'ألصق client ID / secret في إعدادات المستأجر',
        "كل موظف ينقر 'وصِّل تقويمي' في ملفه الشخصي"
      ],
      integrates: ['التقويم', 'الفريق والموارد البشرية']
    },
    insurance: {
      long: 'شرائح تأمين وقواعد تغطية وفواتير جاهزة للمطالبات لعيادات تقسم الزيارة بين المريض والمؤمّن. كل خدمة تأخذ نسب تغطية لكل شريحة + دفعة ذاتية + سقف زيارة.',
      bullets: [
        'عرّف شرائح تأمين بتغطية متدرجة (مثلاً BUPA ذهبي، التعاونية فضي)',
        'نسب تغطية لكل خدمة وسقف لكل زيارة',
        'حساب تلقائي للدفعة الذاتية عند نقاط البيع',
        'تصدير فواتير جاهزة للمطالبات مع تقسيم تأمين/مريض',
        'ملف العميل يحفظ شريحة التأمين ورقم البوليصة والصلاحية',
        'تقارير على معدل استرداد التأمين لكل شريحة'
      ],
      whoFor: 'عيادات الأسنان والطب العام والتجميل بمرضى ذوي تأمين مختلط.',
      setupSteps: [
        'أنشئ شرائح التأمين من الكتالوج → التأمين',
        'عرّف قواعد التغطية لكل خدمة (نسبة + سقف)',
        'ربط شريحة التأمين بكل مريض في ملفه الشخصي',
        'احجز زيارة — تُحسب الدفعة الذاتية تلقائياً في POS'
      ],
      integrates: ['العملاء و CRM', 'المبيعات ونقاط البيع', 'المحاسبة']
    },
    dental: {
      long: 'مخطط أسنان تفاعلي للبالغين والأطفال مع تتبع على مستوى السطح. انقر أي سن (أو سطح) لتسجيل تسوس أو حشوة أو تاج أو خلع أو مراقبة. كل إدخال مرتبط بزيارة للمراجعة الكاملة.',
      bullets: [
        'ترقيم FDI و Universal — قابل للتبديل لكل مستأجر',
        '32 سناً للبالغين + 20 للأطفال مع 5 أسطح لكل سن',
        'حالات ملونة: سليم، تسوس، حشوة، تاج، مخلوع، مفقود، زرع، مراقبة',
        'عرض زمني: شاهد حالة المخطط في كل زيارة سابقة',
        'خطط علاج: اقتراح، موافقة، تنفيذ عبر زيارات متعددة',
        'مخطط أسنان قابل للطباعة يُرفق بسجل المريض'
      ],
      whoFor: 'عيادات الأسنان — عامة، أطفال، تقويم.',
      setupSteps: [
        'فعّل إضافة مخطط الأسنان',
        'اختر FDI أو Universal في إعدادات المستأجر',
        'افتح ملف أي مريض — يظهر تبويب المخطط',
        'انقر الأسنان لتسجيل الإجراءات أثناء أو بعد الزيارة'
      ],
      integrates: ['العملاء و CRM', 'السجلات الطبية', 'التقويم']
    },
    imaging: {
      long: 'عارض DICOM مدمج ليعيش الأشعة والبانوراميك والصور داخل ملف المريض — لا على جهاز منفصل. ارفع DICOM، شاهده بـ window/level/zoom/pan، علّق عليه، وأرفقه بزيارة.',
      bullets: [
        'محلّل DICOM يتعامل مع .dcm و .dcm.gz',
        'Window / level / zoom / pan مع اختصارات لوحة المفاتيح',
        'تعليقات: أسهم، دوائر، قياسات (بالمليمتر عند المعايرة)',
        'كل صورة مرفقة بزيارة محددة',
        'عرض ملء الشاشة ومقارنة متعددة الصور',
        'معاينة منخفضة الدقة للوصول السريع من البوابة'
      ],
      whoFor: 'عيادات الأسنان والطب التي تنتج صور DICOM (أشعة، CBCT، سونار).',
      setupSteps: [
        'فعّل إضافة التصوير الطبي',
        'اضبط دلو S3 حيث تُخزن ملفات DICOM',
        'ارفع الصور من ملف المريض',
        'علّق وأرفق بالزيارة المعنية'
      ],
      integrates: ['العملاء و CRM', 'السجلات الطبية']
    },
    labs: {
      long: 'اطلب فحوصات مختبر من زيارة، استلم النتائج (CSV أو PDF أو إدخال يدوي)، واختياراً انشرها لبوابة المريض. يأتي مع كتالوج فحوصات قابل للضبط والتحقق من النطاقات المرجعية.',
      bullets: [
        'كتالوج فحوصات منظم مع نطاقات مرجعية',
        'اطلب من داخل أي زيارة بنقرة واحدة',
        'تتبع حالة: مطلوب → محصّل → قيد التنفيذ → نتيجة',
        'النتائج كحقول منظمة مع علامات مرجعية',
        'إرفاق PDF للتقرير الأصلي من المختبر',
        'النتائج المنشورة تظهر في بوابة العميل مع مخططات الاتجاه'
      ],
      whoFor: 'العيادات التي تطلب تحاليل دم أو أحياء دقيقة أو باثولوجي من مختبرات خارجية.',
      setupSteps: [
        'فعّل إضافة طلبات المختبر',
        'استورد كتالوج المختبر CSV (أو ابنِه من الإدارة)',
        'اطلب فحصاً خلال أي زيارة',
        'أدخل أو ارفع النتيجة عند وصولها'
      ],
      integrates: ['العملاء و CRM', 'السجلات الطبية', 'بوابة العميل']
    },
    rx: {
      long: 'اكتب الوصفات أثناء الزيارة ونزّل أو اطبع على ورقة وصفة بهوية علامتك التجارية. المرضى يصلون لسجل وصفاتهم الكامل من بوابة العميل.',
      bullets: [
        'كتالوج أدوية مع جرعات جاهزة لكل دواء',
        'وصفات متعددة العناصر بجرعة وتكرار ومدة لكل عنصر',
        'وصفة PDF موقّعة بهوية المستأجر',
        'تنزيل للمريض من البوابة؛ نسخة للمستأجر في سجل الزيارة',
        'دعم للوصفات المتكررة مع تذكيرات تلقائية',
        'سجل مراجعة — من كتبها ومتى وأي تعديلات'
      ],
      whoFor: 'أي عيادة توصف أدوية — عائلية، أسنان، تخصصات.',
      setupSteps: [
        'فعّل إضافة الوصفات',
        'ارفع رأسية ورقة الوصفات (اختياري)',
        'ابنِ أو استورد كتالوج أدوية',
        'اكتب وصفة أثناء أي زيارة'
      ],
      integrates: ['السجلات الطبية', 'بوابة العميل', 'التقويم']
    },
    records: {
      long: 'سجلات طبية إلكترونية منظمة (EMR) مع قوالب ملاحظات SOAP وتسجيل للعلامات الحيوية وتتبع الحساسيات/التشخيصات. كل زيارة تعيش على خط زمن المريض بدعم كامل للمرفقات.',
      bullets: [
        'قوالب SOAP (ذاتية، موضوعية، تقييم، خطة)',
        'قوالب ملاحظات مخصصة لكل تخصص (أطفال، جلدية، عظام…)',
        'علامات حيوية كحقول منظمة مع مخططات اتجاه',
        'حساسيات وتشخيصات بعلامات ICD-10',
        'مرفقات: صور، PDF، روابط DICOM',
        'خط زمن الزيارات: تاريخ مريض كامل بنظرة واحدة'
      ],
      whoFor: 'العيادات التي تريد EMR حقيقياً بلا دفع لنظام منفصل.',
      setupSteps: [
        'فعّل إضافة السجلات الطبية',
        'اختر أو أنشئ قوالب SOAP لتخصصاتك',
        'ابدأ كتابة الملاحظات أثناء أو بعد كل زيارة',
        'ضع علامات الحساسية والتشخيص في ملف المريض'
      ],
      integrates: ['العملاء و CRM', 'التقويم', 'طلبات المختبر', 'الوصفات']
    },
    resources: {
      long: 'احجز الغرف والكراسي والمعدات وأي أصل مادي بجانب الموظفين. قصة شعر تحتاج كرسياً؛ علاج عصب يحتاج كرسياً + أخصائي تعقيم؛ حصة تحتاج غرفة. الموارد تجعل كل هذا قابلاً للحجز مع كشف التعارض.',
      bullets: [
        'عرّف أنواع موارد (غرفة، كرسي، جهاز) مع كمية لكل فرع',
        'أسند متطلبات الموارد لكل خدمة',
        'التقويم يُظهر تعارضات الموارد بشكل فوري',
        'احجب موارد للصيانة والتنظيف والعطل',
        'تقارير استغلال لكل مورد',
        'الموارد تدخل في حسابات العمولات عند الصلة'
      ],
      whoFor: 'أي عمل يكون الأصل المادي فيه مهماً مثل الموظف.',
      setupSteps: [
        'فعّل إضافة الموارد',
        'عرّف أنواع الموارد لكل فرع',
        'اربط متطلبات الموارد بكل خدمة في الكتالوج',
        'احجز كالمعتاد — التعارضات تُكتشف تلقائياً'
      ],
      integrates: ['التقويم', 'الكتالوج', 'التقارير']
    },
    attendance: {
      long: 'تتبع تسجيل العملاء للصالات والمدارس وأي برنامج متكرر يكون فيه "الحضور" أهم من "حجز موعد". يأتي بتدفق تسجيل دخول مناسب للكشك ومحفّز اختياري لفاتورة ETA.',
      bullets: [
        'تسجيل بنقرة واحدة عبر هاتف العميل أو QR أو كشك',
        'عداد جلسات الاشتراك في كل تسجيل',
        'تقارير حضور لكل عميل أو حصة أو شهر',
        'كشف تلقائي للغياب للعملاء المحجوزين غير المسجلين',
        'اختياري: تحفيز فاتورة متوافقة مع ETA عند التسجيل',
        'سجلات حضور قابلة للتصدير للمدارس أو HR'
      ],
      whoFor: 'صالات، استوديوهات، مدارس، أندية فنون قتالية، مراكز دروس.',
      setupSteps: [
        'فعّل إضافة حضور العميل',
        'اضبط الكشك (تابلت + حامل) أو تسجيل من تطبيق العميل',
        'أسند اعتمادات تسجيل دخول لكل اشتراك',
        'اترك العملاء يسجلون أنفسهم'
      ],
      integrates: ['العملاء و CRM', 'الكتالوج', 'الفعاليات والحصص']
    },
    boarding: {
      long: 'استضافة بسعر اليوم لعيادات البيطرة ومنتجعات الحيوانات. تسليم واستلام وتسعير لكل ليلة ومتطلبات خاصة (أدوية، حمية) وفوترة تتدفق مباشرة إلى POS.',
      bullets: [
        'تتبع وقت تسليم/استلام مع رفع صور',
        'طبقات تسعير لكل ليلة (قياسي / طبي / VIP)',
        'متطلبات خاصة: أدوية، حمية، جدول استحمام',
        'تقويم إشغال يظهر الأقفاص / الغرف الشاغرة',
        'فوترة تلقائية عند الاستلام مع أي إضافات',
        'إشعارات للمالك عند الوصول، تحديثات يومية، عند المغادرة'
      ],
      whoFor: 'عيادات البيطرة، منتجعات الحيوانات، فنادق القطط والكلاب.',
      setupSteps: [
        'فعّل إضافة استضافة الحيوانات',
        'عرّف وحدات الاستضافة (أقفاص، غرف) لكل فرع',
        'حدد أسعار الليلة وأي خدمات إضافية',
        'احجز التسليم من التقويم؛ POS يُصدر الفاتورة عند الاستلام'
      ],
      integrates: ['التقويم', 'العملاء و CRM', 'المبيعات ونقاط البيع']
    },
    loyalty: {
      long: 'ولاء قائم على نقاط بقواعد كسب واستبدال وانتهاء صلاحية وعرض محفظة في بوابة العميل. يحوّل العميل العابر إلى عميل متكرر بدون خصم في كل زيارة.',
      bullets: [
        'قواعد كسب: لكل خدمة، لكل إنفاق، لكل زيارة، لكل شريحة',
        'قواعد استبدال: حد أدنى للرصيد، خدمات صالحة، نافذة انتهاء',
        'انتهاء صلاحية النقاط مع تنظيف تلقائي وإشعار للعميل',
        'عرض محفظة في بوابة العميل مع سجل معاملات كامل',
        'حملات: مضاعفات على شرائح أو أيام محددة',
        'تقارير ولاء لكل مستأجر: معدل الاستبدال، أعلى المكتسبين'
      ],
      whoFor: 'أي عمل تهمه الزيارات المتكررة — صالونات، مقاهي، عيادات.',
      setupSteps: [
        'فعّل إضافة نقاط الولاء',
        'عرّف قواعد الكسب في الكتالوج (نقاط لكل خدمة أو لكل وحدة إنفاق)',
        'حدد قواعد الاستبدال (حد أدنى، انتهاء، خدمات مؤهلة)',
        'انطلق — العملاء يتراكمون نقاطاً تلقائياً في كل بيع'
      ],
      integrates: ['العملاء و CRM', 'المبيعات ونقاط البيع', 'الحملات']
    },
    events: {
      long: 'حصص جماعية وورش وفعاليات مجدولة بسعات وقوائم انتظار وتسجيل حضور. حصة يوغا 7 صباحاً بـ 12 مقعداً — Momentfy يبيعها ويؤكدها ويسجل الحضور.',
      bullets: [
        'فعاليات متكررة ومرة واحدة بحدود سعة',
        'دعم قائمة انتظار مع ترقية تلقائية عند تحرير مقعد',
        'تسجيل الحاضرين عبر كشك أو تطبيق العميل',
        'تسعير لكل فعالية (ثابت، مجاني، للأعضاء فقط)',
        'تقارير: معدل الامتلاء، تحويل قائمة الانتظار، أعلى الفعاليات',
        'تقييمات لكل فعالية تُنشر على صفحة الحجز العامة'
      ],
      whoFor: 'استوديوهات لياقة، مدارس طبخ، مستضيفو ورش، مراكز مجتمعية.',
      setupSteps: [
        'فعّل إضافة الفعاليات والحصص',
        'أنشئ قوالب فعاليات (يوغا 60، HIIT 45، إلخ)',
        'جدول مواعيد متكررة في التقويم',
        'انشر على موقع الحجز — العملاء يبدأون التسجيل'
      ],
      integrates: ['التقويم', 'الكتالوج', 'حضور العميل']
    },
    followup: {
      long: 'طابور مهام متابعة تلقائية حتى لا يضيع شيء. "اتصل بسارة عن كشف ما بعد العملية." "اطلب من كريم تقييماً بعد زيارته الثالثة." القواعد تولّد المهام؛ الموظفون يغلقونها.',
      bullets: [
        'قواعد بناءً على الشريحة أو نتيجة الزيارة أو انتهاء الاشتراك أو تاريخ',
        'مهام مسندة لموظفين محددين بمؤقتات SLA',
        'إنجاز دفعي بنقرة واحدة (مثل "علّم الكل تم الاتصال")',
        'إشعار اقتطاع على مستوى العميل — لا إزعاج متكرر',
        'طابور لكل موظف بعدّادات حالة وأولوية',
        'تقارير: متوسط وقت الإغلاق، معدل عدم الرد، ترتيب الموظفين'
      ],
      whoFor: 'أي مشغّل قال "نسينا نتصل بهم ثانية".',
      setupSteps: [
        'فعّل إضافة مهام المتابعة',
        "أنشئ قواعد (مثل 'اتصل بعد يومين من أول زيارة')",
        'أسند مسؤولين افتراضيين لكل نوع مهمة',
        'الموظفون يعالجون الطابور من لوحتهم'
      ],
      integrates: ['العملاء و CRM', 'التقويم', 'الحملات']
    }
  },
  solutionDetails: {
    salon: {
      title: 'الصالونات والسبا', tagline: 'مسارات موظفين ملوّنة، اشتراكات وولاء — مضبوطة لإيقاع الصالون.',
      icon: 'i-lucide-scissors', accent: 'from-pink-500 to-rose-600', dot: 'bg-rose-500',
      category: 'قطاع',
      long: 'الصالونات تعيش على الحجز المتكرر، بيع المنتجات والعمولات. إعداد Momentfy للصالون يشمل مسارات موظفين ملوّنة، باقات اشتراكات، بطاقات هدايا، نقاط ولاء، مخزون تجزئة، حملات وعمولات لكل موظف — محجوزة عبر تطبيق PWA بهويتك.',
      pains: [
        'حجوزات مزدوجة وعدم حضور يأكل 20% من الإيراد',
        'اشتراكات على جداول Excel لا أحد يحدّثها',
        'عمولات تُحسب يدوياً كل راتب',
        'بطاقات ولاء ورقية تضيع مع العميل'
      ],
      capabilities: [
        'مسارات موظفين بالسحب والإفلات مع حجز الموارد',
        'اشتراكات، بطاقات هدايا، ورصيد باقات في محفظة واحدة',
        'نقاط ولاء تلقائية في البيع، قابلة للاستبدال في البوابة',
        'عمولات لكل موظف مع تقسيم وإكراميات',
        'مخزون تجزئة مع نقاط إعادة الطلب وحركة المخزون',
        'تذكيرات SMS/WhatsApp وحملات طلب مراجعة',
        'طابور الحضور بجانب المواعيد المحجوزة',
        'إغلاق يومي لصندوق النقد'
      ],
      stack: ['التقويم', 'المبيعات وPOS', 'الاشتراكات', 'نقاط الولاء', 'الحملات', 'العملاء وCRM', 'المخزون', 'التقارير'],
      stats: [{ k: 'انخفاض عدم الحضور', v: '-38%' }, { k: 'نسبة إعادة الحجز', v: '+52%' }, { k: 'زمن الدفع', v: '< 90ث' }],
      whoFor: 'أعمال الشعر والتجميل والأظافر والرموش والسبا بين 1 و50 كرسي، فرع أو عدة فروع.',
      useCases: [
        'موظف مستقل يقبل الحجز الأونلاين مع دفعة مقدّمة',
        'صالون متعدد الكراسي مع عمولات وإكراميات لكل موظف',
        'سلسلة سبا تبيع اشتراكات موسمية عبر الفروع',
        'كونسيبت تجزئة يبيع منتجات عند الدفع'
      ],
      faq: [
        { q: 'هل يرى الموظف مواعيده فقط؟', a: 'نعم — صلاحيات الأدوار تقتصر مشاهدة كل موظف على مساره افتراضياً.' },
        { q: 'هل تتجدد الاشتراكات تلقائياً؟', a: 'نعم. Stripe أو Lemon Squeezy يحصّل البطاقة المحفوظة ويجدّد الرصيد تلقائياً.' }
      ]
    },
    dental: {
      title: 'عيادات الأسنان', tagline: 'مخطط أسنان، أشعة، وصفات وتأمين — جاهز لـ ZATCA.',
      icon: 'i-lucide-tooth', accent: 'from-sky-500 to-blue-600', dot: 'bg-sky-500',
      category: 'قطاع',
      long: 'عيادات الأسنان تحتاج عمقاً سريرياً بلا بطء. Momentfy يوفّر مخطط أسنان للأطفال والكبار، خطط علاج، عارض DICOM، وصفات، فئات تأمين بقواعد تغطية، وفوترة ZATCA المرحلة الثانية — كلها داخل تطبيق واحد ثنائي اللغة.',
      pains: [
        'مخططات أسنان ورقية تُفقد بين الزيارات',
        'رفض تأميني بسبب نقص قواعد التغطية',
        'صور أشعة محبوسة على جهاز المختبر',
        'رفع فواتير ZATCA يدوياً كل مساء'
      ],
      capabilities: [
        'مخطط أسنان بتتبع سطحي للعلاج (أطفال وكبار)',
        'خطط علاج بمراحل وأخذ موافقة',
        'عارض DICOM بشروحات مرتبطة بالسجل',
        'كتابة وصفات مع تنزيل للمرضى في البوابة',
        'فئات تأمين + قواعد تغطية + فواتير جاهزة للمطالبة',
        'تخليص ZATCA المرحلة 2 + إيصالات بختم QR',
        'حجز كرسي ومورد بجانب الموظف',
        'طلبات مختبر خارجي بتتبع الحالة'
      ],
      stack: ['التقويم', 'مخطط الأسنان', 'الأشعة السريرية', 'الوصفات', 'فئات التأمين', 'السجلات الطبية', 'ZATCA', 'بوابة العميل'],
      stats: [{ k: 'استغلال الكرسي', v: '+24%' }, { k: 'استرداد التأمين', v: '+31%' }, { k: 'زمن التدوين', v: '-65%' }],
      whoFor: 'عيادات أسنان فردية أو متعددة الأطباء في الخليج وشمال إفريقيا تحتاج امتثال ZATCA وسير عمل تأمين.',
      useCases: [
        'عيادة بكرسيين بمرضى تأمين ونقد مختلطين',
        'طب أسنان أطفال يتتبع الأسنان اللبنية زمنياً',
        'تقويم بخطط علاج متعددة المراحل',
        'مجموعة عيادات بفروع بسجل مريض موحّد'
      ],
      faq: [
        { q: 'هل يمكن ربط صور DICOM بخطوة علاج؟', a: 'نعم — العارض يربط كل سلسلة صور بالسن وخطوة العلاج بضغطة واحدة.' },
        { q: 'هل تُحفظ فواتير ZATCA المُخلَّصة؟', a: 'للأبد. XML المُخلَّص وUUID الإرسال مؤرشف وقابل للتصدير في أي وقت.' }
      ]
    },
    medical: {
      title: 'العيادات الطبية', tagline: 'سجل مريض مُهيكل، طلبات مختبر، وصفات وفوترة تأمينية.',
      icon: 'i-lucide-heart-pulse', accent: 'from-red-500 to-orange-500', dot: 'bg-red-500',
      category: 'قطاع',
      long: 'عيادات عامة، سلاسل GP، جلدية، أطفال — Momentfy يعطي العيادات الطبية سجلاً مُهيكلاً بملاحظات SOAP، قياس علامات حيوية، طلبات مختبر، وصفات ووصول بوابة ثنائي اللغة، إضافة إلى تخليص فواتير ZATCA/ETA.',
      pains: [
        'ملاحظات SOAP مبعثرة بين ورق وبريد',
        'نتائج مختبر تُطبع وتُحفظ يدوياً',
        'وصفات تُكتب من الصفر كل زيارة',
        'لا طريقة للمريض ليرى تاريخه'
      ],
      capabilities: [
        'ملاحظات SOAP مُهيكلة + قياس علامات حيوية',
        'سير عمل طلبات مختبر بزمن استجابة خارجي',
        'كتابة وصفات مع تجديد وقوالب',
        'جدول زمني للسجلات الطبية مع مرفقات',
        'فوترة مدركة لفئة التأمين + قواعد تغطية',
        'بوابة عميل بهويتك مع تنزيل التاريخ',
        'جدولة متعددة الأطباء + عمولات لكل طبيب',
        'ضريبة قيمة مضافة + ZATCA + ETA مدمجة'
      ],
      stack: ['التقويم', 'السجلات الطبية', 'طلبات المختبر', 'الوصفات', 'فئات التأمين', 'بوابة العميل', 'ZATCA', 'التقارير'],
      stats: [{ k: 'زمن التدوين', v: '-40%' }, { k: 'تبنّي البوابة', v: '72%' }, { k: 'زمن المختبر', v: '-28%' }],
      whoFor: 'عيادات عامة، جلدية، أطفال، وتخصصية بين 1 و20 طبيب.',
      useCases: [
        'سلسلة GP توحّد السجلات بين الفروع',
        'عيادة جلدية تربط صور قبل/بعد بالزيارة',
        'عيادة أطفال تتتبع منحنيات النمو',
        'اختصاصي يدير سير عمل إجراءات تأمينية'
      ]
    },
    barber: {
      title: 'محلات الحلاقة', tagline: 'طابور حضور، POS سريع وعمولات لكل حلاق — للحجم العالي.',
      icon: 'i-lucide-user', accent: 'from-stone-500 to-neutral-700', dot: 'bg-stone-500',
      category: 'قطاع',
      long: 'محلات الحلاقة تعيش على السرعة والعدالة. Momentfy يمزج طابور الحضور مع الحجوزات المُؤكَّدة، يحتسب عمولات دقيقة لكل حلاق، ويغلق العميل في أقل من 90 ثانية على أي جهاز لوحي.',
      pains: [
        'فوضى طابور في أوقات الذروة',
        'خلافات على عمولة الإكراميات والمنتجات',
        'بطاقات اشتراك لا يتذكّرها أحد',
        'طوابير دفع أبطأ من قصّة الشعر'
      ],
      capabilities: [
        'طابور حضور متعايش مع الحجوزات',
        'عمولات لكل حلاق مع تتبع الإكراميات',
        'POS سريع مُحسَّن لأقل من 90 ثانية',
        'اشتراكات + رصيد باقات في محفظة واحدة',
        'تذكيرات SMS مع حجز دفعة على عدم الحضور',
        'حضور وإجازات موظفين من التطبيق',
        'إغلاق يومي مع تقرير Z',
        'بيع منتجات بجانب الخدمات'
      ],
      stack: ['التقويم', 'المبيعات وPOS', 'الاشتراكات', 'العمولات', 'نقاط الولاء', 'الحملات', 'العملاء وCRM'],
      stats: [{ k: 'متوسط الفاتورة', v: '+18%' }, { k: 'انتظار الطابور', v: '-44%' }, { k: 'دقة العمولات', v: '100%' }],
      whoFor: 'محلات فردية ومتعددة الكراسي من الكلاسيك إلى مفاهيم العناية الحديثة.',
      useCases: [
        'محل حضور كثيف يشغّل الطابور على جهاز لوحي',
        'محل متعدد الكراسي يدفع عمولات متدرّجة',
        'كونسيبت عناية يبيع زيوت اللحية عند الدفع',
        'سلسلة متعددة الفروع توحّد الولاء'
      ]
    },
    fitness: {
      title: 'اللياقة والحصص', tagline: 'حصص جماعية، اشتراكات، قوائم انتظار وحضور — مناسب للكشك.',
      icon: 'i-lucide-dumbbell', accent: 'from-lime-500 to-emerald-600', dot: 'bg-emerald-500',
      category: 'قطاع',
      long: 'بيلاتس، يوجا، كروسفت، HIIT، ملاكمة — Momentfy يدير الدورة الكاملة للحصص: جدولة، تسجيل، قائمة انتظار، حضور وتجديد اشتراك. تسجيل الكشك يُغني عن موظف باب.',
      pains: [
        'قوائم حصص يدوية في Excel',
        'عدم حضور يحرم منتظرين من مقعد',
        'تجديدات اشتراك تفوت بصمت',
        'مدربون يُدفع لهم مقابل مقاعد فارغة'
      ],
      capabilities: [
        'جدولة حصص متكرّرة بسعة وقائمة انتظار',
        'تطبيق عضو للتسجيل وإلغاء ذاتي',
        'حضور عبر الكشك أو تطبيق المدرب',
        'فئات اشتراك مع حالات توقف/تجميد',
        'حزم دخول وأرصدة حصص',
        'حملات لإعادة تنشيط المنقطعين',
        'عمولات لكل مدرب حسب المتدربين',
        'تقارير: امتلاء، انحسار، ربحية الحصة'
      ],
      stack: ['الفعاليات والحصص', 'الاشتراكات', 'حضور العميل', 'بوابة العميل', 'الحملات', 'التقارير', 'المبيعات وPOS'],
      stats: [{ k: 'نسبة امتلاء الحصص', v: '+26%' }, { k: 'انحسار الأعضاء', v: '-19%' }, { k: 'زمن الحضور', v: '< 5ث' }],
      whoFor: 'استوديوهات حصص جماعية، صالات بوتيك ومدربون مستقلون.',
      useCases: [
        'استوديو بيلاتس يبيع حزم 10 حصص بانتهاء صلاحية',
        'صالة HIIT تُشغّل قوائم انتظار للذروة',
        'أكاديمية فنون قتالية تتتبع حضور الأطفال',
        'جماعة يوجا تدفع للمدرب لكل متدرب'
      ]
    },
    pet: {
      title: 'رعاية الحيوانات والبيطرة', tagline: 'سجلات، تذكيرات لقاحات، إيواء وفوترة يومية.',
      icon: 'i-lucide-paw-print', accent: 'from-amber-500 to-yellow-600', dot: 'bg-amber-500',
      category: 'قطاع',
      long: 'البيطريون ومنتجعات الحيوانات يتشاركون إيقاعاً واحداً: زيارات متكررة وذاكرة طويلة. Momentfy يخزّن سجلاً لكل حيوان (لا لكل مالك)، يجدول تذكيرات اللقاحات، يسعّر الإيواء باليوم ويفوتر المالك.',
      pains: [
        'لقاحات فائتة لأن لا أحد اتصل',
        'حجز أقفاص الإيواء على لوحة بيضاء',
        'عائلات متعددة الحيوانات بسجلات متشابكة',
        'تجديد أدوية يُكتب من جديد'
      ],
      capabilities: [
        'سجل لكل حيوان بحقول خاصة بالنوع',
        'جدول لقاحات مع تذكيرات تلقائية',
        'إيواء بسعر يومي مع عرض إشغال',
        'تجديد الوصفات من التاريخ',
        'تجميع أسرة متعددة الحيوانات بفاتورة مشتركة',
        'حجز قصّ بجانب زيارات طبية',
        'بوابة بتنزيل شهادات لقاحات',
        'طلبات مختبر وأشعة مرفقة بالحيوان'
      ],
      stack: ['التقويم', 'السجلات الطبية', 'إيواء الحيوانات', 'الوصفات', 'بوابة العميل', 'المبيعات وPOS', 'الحملات'],
      stats: [{ k: 'استدعاء اللقاحات', v: '+48%' }, { k: 'استغلال الإيواء', v: '+33%' }, { k: 'تقييمات العملاء', v: '4.9★' }],
      whoFor: 'عيادات بيطرية، منتجعات حيوانات، صالونات قصّ وأعمال خدمات بيطرية مختلطة.',
      useCases: [
        'عيادة تذكّر تلقائياً بعد سنة من اللقاح',
        'منتجع إيواء يسعّر بالليلة مع إضافات',
        'قصّ + بيطرة تحت علامة واحدة',
        'بيطري متنقل يزور البيوت بمسارات'
      ]
    },
    therapy: {
      title: 'العلاج والتدريب', tagline: 'جلسات، استمارات دخول، ملاحظات تطور وبوابة خاصة.',
      icon: 'i-lucide-brain', accent: 'from-indigo-500 to-violet-600', dot: 'bg-indigo-500',
      category: 'قطاع',
      long: 'المعالجون والمدربون والمرشدون يحتاجون برنامجاً هادئاً يحترم السرّية. Momentfy يوفّر استمارات دخول، ملاحظات جلسة خاصة، تتبع نتائج وبوابة عميل تُحسّ كدفتر يوميات لا لوحة تحكم.',
      pains: [
        'استمارات دخول ورقية تُعاد كتابتها',
        'ملاحظات في ملف Word "للحفظ فقط"',
        'عملاء يفوّتون جلسات بلا دفعة',
        'لا طريقة سهلة لمشاركة الواجبات'
      ],
      capabilities: [
        'استمارات دخول مخصصة بتوقيع إلكتروني',
        'ملاحظات جلسة مع تتبع نتائج زمنياً',
        'تقويم بوقت فاصل وحظر مجمّع',
        'قاعدة دفعة أو لا حجز في المواعيد الحساسة',
        'باقات جلسات متكرّرة مع رصيد مسبق',
        'بوابة عميل برسائل خاصة + واجبات',
        'مساعد ذكاء اصطناعي يكتب تذكير الجلسة',
        'سجلات جاهزة للتصدير للإحالة'
      ],
      stack: ['التقويم', 'السجلات الطبية', 'بوابة العميل', 'مساعد الذكاء الاصطناعي', 'المبيعات وPOS', 'الحملات'],
      stats: [{ k: 'انخفاض عدم الحضور', v: '-42%' }, { k: 'جلسات أسبوعية', v: '+28%' }, { k: 'زمن ملاحظات الجلسة', v: '-35%' }],
      whoFor: 'معالجون، مرشدون، أخصائيون نفسيون، مدربو حياة ومهن يديرون جلسات فردية.',
      useCases: [
        'معالج فردي يشغّل جلسات CBT أسبوعية',
        'جماعة تدريب تحت علامة واحدة مع تقسيم الأرباح',
        'مرشد أزواج يتتبع الجلسات المشتركة',
        'مدرب مهني يبيع باقات 6 جلسات مُسبقاً'
      ]
    },
    photo: {
      title: 'استوديوهات التصوير', tagline: 'تسعير بالباقة، دفعة أو لا حجز، تسليم معرض ومطبوعات.',
      icon: 'i-lucide-camera', accent: 'from-fuchsia-500 to-purple-600', dot: 'bg-fuchsia-500',
      category: 'قطاع',
      long: 'المصورون يخسرون مالاً على عدم الحضور ويلاحقون الأرصدة لأسابيع. Momentfy يُحزِّم الجلسات، يفرض دفعة عند الحجز، يدير حجز المعدات، ويسلّم المعارض والمطبوعات من نفس النظام الذي أخذ الحجز.',
      pains: [
        'جلسات تُحجز بلا دفعة فتُلغى يوم الموعد',
        'تعارض معدات بين استوديوهات',
        'تسليم التعديلات يُلاحق بالبريد',
        'بيع المطبوعات خارج الفاتورة'
      ],
      capabilities: [
        'باقات جلسات بالوقت والمخرجات',
        'دفعة إلزامية عند الحجز مع جدول باقي المبلغ',
        'حجز معدات وموارد استوديو',
        'رابط تسليم معرض داخل بوابة العميل',
        'منتجات مطبوعة مسعّرة ومفوترة عبر POS',
        'لقطات مُراجَعة ومُعتمَدة لكل جلسة',
        'تقسيم عمولة لكل مصوّر',
        'عقد وتوقيع إلكتروني قبل التأكيد'
      ],
      stack: ['التقويم', 'المبيعات وPOS', 'الموارد', 'بوابة العميل', 'الكتالوج', 'الحملات'],
      stats: [{ k: 'التزام الدفعة', v: '98%' }, { k: 'تحصيل الرصيد', v: 'يوم الجلسة' }, { k: 'بيع بعد الجلسة', v: '+22%' }],
      whoFor: 'مصورو بورتريه، أعراس، منتجات واستوديوهات تصوير تعمل بباقات.',
      useCases: [
        'مصور أعراس يبيع ثلاث فئات باقات',
        'استوديو بورتريه بين مصورَين',
        'استوديو تصوير منتجات يفوتر بالساعة',
        'مصور متنقل يحجز في مواقع الزبائن'
      ]
    },
    nails: {
      title: 'صالونات الأظافر والرموش', tagline: 'قوائم لكل فنّية، دفعات، رجعات صيانة وإضافات تجزئة.',
      icon: 'i-lucide-sparkles', accent: 'from-rose-400 to-pink-500', dot: 'bg-pink-500',
      category: 'قطاع',
      long: 'صالونات الأظافر والرموش تعمل بزيارات قصيرة ومتكرّرة ونوافذ صيانة ضيقة. Momentfy يسمح لكل فنّية بنشر قائمتها، يفرض دفعة على كل حجز، ويُذكّر العميلة تلقائياً بإعادة الحجز قبل انتهاء المجموعة.',
      pains: [
        'كل فنّية تحتاج قائمة خدمات مختلفة',
        'صيانات فائتة = فقدان إيراد متكرر',
        'إلغاءات متأخرة بلا دفعة للاحتفاظ',
        'بيع تجزئة (مناكير، عناية) خارج الدفاتر'
      ],
      capabilities: [
        'قوائم خدمات وأسعار لكل فنّية',
        'دفعة مفروضة عند الحجز (% أو مبلغ ثابت)',
        'اقتراح رجعة تلقائي قبل انتهاء المجموعة',
        'تقارير بيع مرفق لكل فنّية',
        'نقاط ولاء على عدد الزيارات لا الإنفاق',
        'معرض انستقرام مرتبط بالخدمة',
        'حملات للعملاء المنقطعين بعرض',
        'إكراميات مُلتقطة عند الدفع مع تقسيم عمولة'
      ],
      stack: ['التقويم', 'المبيعات وPOS', 'الاشتراكات', 'نقاط الولاء', 'الحملات', 'الكتالوج', 'التقارير'],
      stats: [{ k: 'نسبة الزيارة المتكررة', v: '+34%' }, { k: 'التقاط الدفعة', v: '96%' }, { k: 'مرفق التجزئة', v: '+19%' }],
      whoFor: 'صالونات أظافر، استوديوهات رموش، حواجب واستوديوهات تجميل متعددة الفنّيات.',
      useCases: [
        'صالون أظافر بـ 6 فنّيات يضعن أسعارهن',
        'استوديو رموش يُذكّر كل 3 أسابيع للصيانة',
        'حواجب ورموش مشترَكان يتشاركان التجزئة',
        'فنّية منزلية تأخذ دفعات عبر PWA'
      ]
    },
    tattoo: {
      title: 'الوشم والثقب', tagline: 'معارض فنّانين، استشارات، دفعات وتتبع عناية لاحقة.',
      icon: 'i-lucide-pen-tool', accent: 'from-zinc-600 to-slate-800', dot: 'bg-zinc-700',
      category: 'قطاع',
      long: 'استوديوهات الوشم والثقب تعيش على سمعة الفنان ووقت محمي. Momentfy يعطي كل فنان موقع حجز ومعرض مصغّر، يلتقط الموافقات والاستمارات الطبية، ويأخذ دفعة غير مستردّة قبل تثبيت الجلسة.',
      pains: [
        'جلسات بلا دفعة تُلغى',
        'الفنانون يرتّبون استشارات في رسائل خاصة',
        'استمارات موافقة وعناية ورقية',
        'محاسبة عمولات آخر الشهر جحيم'
      ],
      capabilities: [
        'معرض ورابط حجز لكل فنان',
        'سير عمل استشارة ثم جلسة بمرحلتين',
        'دفعة غير مستردّة محفوظة مقابل الجلسة',
        'استمارات طبية وموافقات بتوقيع إلكتروني',
        'حملات عناية بعد اليوم 3، 14 و30',
        'عمولات لكل فنان وإيجار كرسي',
        'فحص عمر قبل الحجز',
        'إكراميات مع تقسيم شفّاف'
      ],
      stack: ['التقويم', 'المبيعات وPOS', 'العملاء وCRM', 'الحملات', 'الموارد', 'التقارير'],
      stats: [{ k: 'التزام الدفعة', v: '99%' }, { k: 'نسبة إعادة الحجز', v: '+41%' }, { k: 'خلافات العمولات', v: '0' }],
      whoFor: 'استوديوهات وشم، بارات ثقب، وجماعات فنّانين يتشاركون الكراسي.',
      useCases: [
        'استوديو بفنّانين مقيمين وضيوف يتشاركون الكراسي',
        'بار ثقب يأخذ حضور بجانب الحجز',
        'فنان فردي يُجري استشارة قبل الحجز',
        'جماعة بمزيج إيجار كرسي وعمولة'
      ]
    },
    wellness: {
      title: 'المساج والعافية', tagline: 'مسارات معالجين، باقات، غرف موارد وبرامج تعافٍ.',
      icon: 'i-lucide-flower-2', accent: 'from-teal-400 to-emerald-600', dot: 'bg-teal-500',
      category: 'قطاع',
      long: 'استوديوهات المساج والعلاج الطبيعي والعافية تُكدّس جلسات قصيرة بتحويل غرف سريع. Momentfy يحجز المعالج والغرفة معاً، يبيع باقات بانتهاء صلاحية، ويدفع العملاء نحو برامج تعافٍ متكررة.',
      pains: [
        'تعارض غرف بين المعالجين',
        'باقات تنتهي صلاحيتها بجلسات غير مستخدمة',
        'زيارات فردية لا تتحول إلى برنامج',
        'أسعار خاصة بكل معالج في رؤوسهم'
      ],
      capabilities: [
        'حجز مزدوج لمعالج وغرفة',
        'باقات متعددة الجلسات بانتهاء صلاحية وتدوير',
        'قوالب برامج (مثل تعافٍ 8 أسابيع)',
        'استمارات دخول وتتبع نتائج',
        'بيع زيوت/عناية لاحقة عبر POS',
        'فئات اشتراك بوصول غير محدود',
        'تقسيم عمولات لكل معالج',
        'تقارير: استغلال الغرف، إتمام البرنامج'
      ],
      stack: ['التقويم', 'الموارد', 'الاشتراكات', 'المبيعات وPOS', 'السجلات الطبية', 'بوابة العميل', 'الحملات'],
      stats: [{ k: 'استغلال الغرف', v: '+37%' }, { k: 'إتمام البرنامج', v: '82%' }, { k: 'إعادة بيع الباقة', v: '+46%' }],
      whoFor: 'استوديوهات مساج، علاج طبيعي، عيادات تعافٍ، ومساحات عافية متكاملة.',
      useCases: [
        'استوديو مساج بـ 4 معالجين و3 غرف',
        'علاج طبيعي رياضي ببرامج تعافٍ 8 أسابيع',
        'صالون حجامة ووخز إبر',
        'مساج كرسي للشركات في مقرها'
      ]
    },
    driving: {
      title: 'مدارس تعليم القيادة', tagline: 'أساطيل مدربين، موارد مركبات، باقات اختبار وتقدّم.',
      icon: 'i-lucide-car-front', accent: 'from-cyan-500 to-blue-600', dot: 'bg-cyan-500',
      category: 'قطاع',
      long: 'مدارس القيادة تُوازن مدربين ومركبات وتقدّم طالب نحو تاريخ اختبار. Momentfy يحجز المدرب والمركبة كمورد واحد، يبيع باقات تحضير اختبار، ويتتبع كل طالب حتى نجاحه.',
      pains: [
        'مركبات محجوزة مرّتين بين مدربين',
        'طلاب يفقدون أثر الدروس المنجَزة',
        'باقات اختبار تُباع ولا تُستهلك',
        'إدارة يوم اختبار تعتمد على الذاكرة'
      ],
      capabilities: [
        'مدرب + مركبة مجمّعان كمورد واحد قابل للحجز',
        'تقدّم طالب نحو تاريخ الاختبار',
        'باقات تحضير اختبار برصيد دروس',
        'وحدة نظرية مرتبطة بالجدول',
        'تتبع مسار لكل مهارة درس',
        'حساب ولي أمر للقاصرين',
        'تذكير ودفعة تلقائية على حجز الاختبار',
        'عمولة مدرب لكل نوع درس'
      ],
      stack: ['التقويم', 'الموارد', 'الكتالوج', 'الاشتراكات', 'بوابة العميل', 'التقارير'],
      stats: [{ k: 'استغلال المركبات', v: '+29%' }, { k: 'إتمام الباقة', v: '91%' }, { k: 'نسبة النجاح', v: '+14%' }],
      whoFor: 'مدارس قيادة بأساطيل متعددة المدربين تشغّل باقات دروس وتحضير اختبار.',
      useCases: [
        'مدرسة بـ 5 سيارات و8 مدربين',
        'مركز تدريب دراجات بدورات متعددة الأيام',
        'عقود تدريب سائقين للشركات',
        'مدرسة رخص شاحنات/حافلات متخصصة'
      ]
    },
    tutoring: {
      title: 'مراكز الدروس الخصوصية', tagline: 'جداول معلمين، حصص جماعية، باقات ترم وبوابة أولياء أمور.',
      icon: 'i-lucide-graduation-cap', accent: 'from-orange-500 to-amber-600', dot: 'bg-orange-500',
      category: 'قطاع',
      long: 'مراكز الدروس تشغّل جلسات فردية وجماعية عبر مواد ومعلمين وفصول. Momentfy يجدول المعلم والغرفة، يبيع باقات ترم كاملة، ويمنح أولياء الأمور بوابة لتتبع أبنائهم عبر المواد.',
      pains: [
        'أولياء الأمور غير متأكدين من حضور الجلسات',
        'توفّر المعلم يتغيّر كل ترم',
        'حصص جماعية تمتلئ بشكل غير متساوٍ',
        'تقارير التقدّم تُرسل يدوياً'
      ],
      capabilities: [
        'جدولة جلسات فردية وجماعية في تقويم واحد',
        'باقات ترم طويلة مع تقسيط للبدء المتأخر',
        'بوابة ولي أمر بحضور وتقدّم الابن',
        'قوالب توفّر معلم لكل ترم',
        'تتبع نتائج لكل مادة',
        'قوائم انتظار للحصص الشائعة',
        'حملات تسجيل لترم جديد',
        'عمولة لكل معلم وربحية لكل مادة'
      ],
      stack: ['الفعاليات والحصص', 'حضور العميل', 'الاشتراكات', 'بوابة العميل', 'الحملات', 'التقارير'],
      stats: [{ k: 'تبنّي بوابة ولي الأمر', v: '81%' }, { k: 'إعادة حجز الترم', v: '+36%' }, { k: 'امتلاء الحصص', v: '+24%' }],
      whoFor: 'مراكز دروس ما بعد المدرسة، مدارس لغات، وأكاديميات تحضير اختبارات.',
      useCases: [
        'مركز ما بعد المدرسة بدروس رياضيات وإنجليزي',
        'مدرسة لغات تبيع دورات 12 أسبوع',
        'أكاديمية SAT/IELTS بمزج فردي وجماعي',
        'مدرسة موسيقى بمعلمين لكل آلة'
      ]
    },
    'multi-tenant': {
      title: 'السلاسل متعددة الفروع', tagline: 'قاعدة كود واحدة، علامات متعددة، تقارير فرع وإدارة مركزية.',
      icon: 'i-lucide-building-2', accent: 'from-slate-500 to-gray-700', dot: 'bg-slate-500',
      category: 'شكل عمل',
      long: 'السلاسل والامتيازات تحتاج إشرافاً مركزياً بلا إبطاء الفرع. Momentfy يشغّل نشراً واحداً يخدم عدد غير محدود من المستأجرين — كلٌ بهويته وأسعاره وموظفيه وتقاريره — مع لوحة سوبر-أدمن مركزية.',
      pains: [
        'كل فرع على جدول Excel خاص',
        'أرباح موحّدة تتأخر شهراً',
        'انجراف أسعار بين الفروع',
        'لا مشاركة SKU بين الفروع'
      ],
      capabilities: [
        'مستأجرون غير محدودين على نشرة واحدة',
        'هوية ولغة وإضافات لكل مستأجر',
        'كتالوج مشترك مع استثناء أسعار لكل فرع',
        'سوبر-أدمن مركزي بتقارير متقاطعة',
        'نقل مخزون بين الفروع',
        'صلاحيات بأدوار (مقر، إقليمي، فرع)',
        'محاسبة موحّدة بقيود بين الفروع',
        'حملات على مستوى العلامة باختيار الفرع'
      ],
      stack: ['كل الوحدات التسع', 'لوحة سوبر-أدمن', 'وضع متعدد المستأجرين', 'تقارير مركزية'],
      stats: [{ k: 'فروع لكل نشر', v: 'غير محدود' }, { k: 'تأخر التقارير', v: 'لحظي' }, { k: 'زمن الإطلاق', v: '< يوم' }],
      whoFor: 'أصحاب امتيازات، مجموعات بعلامات متعددة وملّاك سلاسل بـ 3 فروع أو أكثر.',
      useCases: [
        'مجموعة صالونات بـ 12 فرعاً تحت علامة',
        'شبكة عيادات بفروع تخصصية وعامة',
        'امتياز بمقر وفروع مملوكة مستقلة',
        'سلسلة صالات إقليمية بعضوية مركزية'
      ]
    },
    mobile: {
      title: 'الفرق المتنقلة والميدانية', tagline: 'حجوزات بالمسار، وقت وصول متوقَّع ودفع بدون إنترنت.',
      icon: 'i-lucide-truck', accent: 'from-blue-500 to-indigo-600', dot: 'bg-blue-500',
      category: 'شكل عمل',
      long: 'الفرق الميدانية — تجميل متنقّل، علاج منزلي، IT ميداني، قصّ في المنزل — لا تحتمل فقدان جلسة لشبكة ضعيفة. تطبيق PWA من Momentfy يعمل بلا إنترنت على أي هاتف، يرتّب الأعمال حسب العنوان، ويُكمل البيع أوفلاين ويزامن لاحقاً.',
      pains: [
        'تقويم لا يزامن في الميدان',
        'فاتورة تُرسل بعد ساعات',
        'لا إشارة = لا دفع',
        'مسارات مُخمَّنة'
      ],
      capabilities: [
        'تطبيق PWA قابل للتثبيت يعمل بلا نت',
        'خطة يومية مُحسَّنة بالمسار لكل عضو',
        'إرسال ETA عبر SMS تلقائياً',
        'POS أوفلاين — يقبل الدفع ويزامن لاحقاً',
        'قواعد مسافة ووقت سفر مفوترة تلقائياً',
        'التقاط توقيع العميل على الجهاز',
        'استهلاك مخزون لكل زيارة',
        'تسجيل وصول ومغادرة بنطاق جغرافي'
      ],
      stack: ['التقويم', 'المبيعات وPOS', 'بوابة العميل', 'الحملات', 'المخزون', 'التقارير'],
      stats: [{ k: 'موثوقية الأوفلاين', v: '100%' }, { k: 'أعمال يومية', v: '+22%' }, { k: 'تأخر الدفع', v: '-98%' }],
      whoFor: 'تجميل متنقّل، رعاية منزلية، خدمات ميدانية وعلامات بريميوم في المنزل.',
      useCases: [
        'شعر ومكياج متنقّل يزور الأعراس',
        'علاج طبيعي منزلي يغطي المدينة',
        'قصّ حيوانات متنقّل في فان',
        'إصلاح IT ميداني يُفوتر عند الباب'
      ]
    },
    memberships: {
      title: 'أعمال العضويات', tagline: 'خطط متكرّرة، رصيد، تجديد تلقائي، تجميد وتحليلات احتفاظ.',
      icon: 'i-lucide-infinity', accent: 'from-purple-500 to-fuchsia-600', dot: 'bg-purple-500',
      category: 'شكل عمل',
      long: 'إن كان عملك يعمل على إيرادات متكرّرة — صالات، صالونات، اشتراكات عافية، حصص غير محدودة — Momentfy يشحن دورة العضوية الكاملة: خطط، رصيد، تجديد تلقائي، إيقاف، تجميد، إلغاء وتحليلات احتفاظ.',
      pains: [
        'أعضاء يفقدون اشتراكهم بصمت',
        'رصيد لا يُستخدم أبداً',
        'تجميد يُدار بالبريد',
        'لا رؤية لمن على وشك الانحسار'
      ],
      capabilities: [
        'مكتبة خطط بفئات وقواعد رصيد',
        'تجديد تلقائي عبر Stripe / Lemon Squeezy ببطاقة محفوظة',
        'إيقاف/تجميد/إلغاء ذاتي من البوابة',
        'لوحات احتفاظ (كُهْفة، مخاطر انحسار)',
        'ترقية/تنزيل بحساب تناسبي',
        'تتبع استخدام لكل خطة',
        'سير عمل مطالبة على الدفع الفاشل',
        'رصيد إحالة ومكافآت'
      ],
      stack: ['الاشتراكات', 'المبيعات وPOS', 'بوابة العميل', 'الحملات', 'التقارير', 'نقاط الولاء'],
      stats: [{ k: 'تقليل الانحسار', v: '-31%' }, { k: 'نجاح التجديد التلقائي', v: '96%' }, { k: 'نسبة الترقية', v: '+18%' }],
      whoFor: 'أي عمل أغلب إيراده متكرّر: صالات، صالونات، عافية، حزم حصص، اشتراكات.',
      useCases: [
        'صالة بفئات غير محدودة ومحدودة',
        'صالون يبيع اشتراكات تجميل شهرية',
        'استوديو عافية بميزة إيقاف على الإجازة',
        'استوديو حصص بحزم 4/8/12 رصيد'
      ]
    }
  },
  solutionsPage: {
    eyebrow: 'الحلول', h1a: 'مُصمَّم لطبيعة', h1b: 'عملك.',
    sub: 'ستة عشر مساراً جاهزاً، من الصالونات إلى مدارس القيادة والسلاسل متعددة الفروع. اختر ما يناسبك وابدأ بسرعة.',
    chaptersLabel: 'فصول',
    industriesLabel: 'القطاعات',
    businessShapesLabel: 'أشكال الأعمال',
    breadcrumb: 'الحلول',
    categoryIndustry: 'قطاع',
    categoryBusiness: 'شكل عمل',
    painsTitle: 'ما الذي يعالجه', painsBody: 'المشكلات التشغيلية التي صُمِّم هذا الإعداد لتقليلها أو إزالتها.',
    capsTitle: 'ما الذي تحصل عليه', capsBody: 'كل ما تراه هنا يأتي ضمن الكود الأساسي، وليس ضمن فئة مدفوعة أعلى.',
    stackTitle: 'يعتمد على', stackBody: 'الوحدات والإضافات التي تكوّن هذا الإعداد داخل المنصة.',
    useCasesTitle: 'لمن يناسب', useCasesBody: 'أمثلة على الطرق التي يشغّل بها العملاء هذا الإعداد عملياً.',
    faqTitle: 'إجابات سريعة',
    ctaTitle: 'جاهز لإطلاق إعدادك؟', ctaBody: 'اشترِ الكود، فعّل الإضافات المناسبة، وابدأ التشغيل خلال يوم واحد.',
    ctaPrimary: 'اشترِ الشيفرة المصدرية', ctaSecondary: 'تصفّح جميع الحلول',
    statsNote: 'الأرقام هنا إرشادية، مبنية على تجارب تشغيل مبكرة ومعايير سوقية، وليست وعداً بنتيجة محددة.',
    browseAll: 'كل الحلول',
    notFoundEyebrow: 'غير موجود', notFoundBody: 'لا تتوفر صفحة لهذا الحل حالياً. يمكنك العودة واستعراض القائمة الكاملة.'
  },
  portal: {
    eyebrow: 'بوابة العميل', heading: 'كل منشأة تحصل على تطبيق عميل يحمل اسمها وهويتها.',
    sub: 'من هاتف العميل نفسه يمكنه حجز المواعيد، سداد الفواتير، متابعة العضويات ونقاط الولاء، تنزيل الوصفات ونتائج المختبر، مراجعة زياراته، والتحدث مع المساعد الذكي ضمن تجربة تحمل شعارك وتعمل كتطبيق حقيقي.',
    bullets: [
      'تطبيق PWA قابل للتثبيت ويستمر بالعمل عند ضعف الاتصال',
      'الحجز والفواتير والعضويات والولاء في واجهة واحدة',
      'تنزيل نتائج المختبر والوصفات الطبية مباشرة',
      'تقييمات وتذاكر دعم ومساعد ذكي داخل البوابة',
      'تجربة كاملة بالعربية والإنجليزية مع دعم RTL'
    ],
    cta: 'استعرض تجربة البوابة',
    cardTag: 'سبا لينا',
    welcomeBack: 'أهلاً بعودتك',
    loyalty: 'رصيد نقاطك', ptsShort: 'نقطة',
    nextAppt: 'الموعد القادم',
    quickActions: 'إجراءات سريعة',
    actionBook: 'احجز الآن', actionInvoices: 'فواتيري', actionRx: 'الوصفات',
    askAi: 'اسأل المساعد الذكي...',
    apptTitle: 'قص وصبغة', apptMeta: 'الثلاثاء · 14:00 · لينا ح.', apptStatus: 'تم التأكيد'
  },
  pricing: {
    eyebrow: 'خطتان. نفس المنتج.', heading: 'اشترِ مرة واحدة وامتلكه بالكامل.',
    sub: 'الخطتان تقدّمان الشيفرة نفسها مع تحديثات مدى الحياة. الفرق الوحيد هو: هل ستتولى النشر بنفسك أم تريدنا أن نتولاه عنك.',
    billing: { onetime: 'دفعة واحدة', updates: '+ تحديثات مدى الحياة', save: 'في كل الخطط' },
    includedAllLabel: 'ما تحصل عليه في جميع الخطط',
    includedAll: [
      'شيفرة مصدرية كاملة',
      'حسابات ومنشآت بلا حدود',
      'كل الوحدات الأساسية التسع',
      'كل الإضافات الستة عشرة',
      'امتثال ZATCA و ETA',
      'العربية + الإنجليزية',
      'استضافة ذاتية أينما تريد',
      'ترخيص وتحديثات مدى الحياة'
    ],
    windowLabel: 'اختر طريقة التنصيب',
    durationAxisStart: 'تنفّذ بنفسك',
    durationAxisEndForever: 'ننشره لك',
    plans: [
      {
        name: 'تنصيب ذاتي', tag: 'أنت تتولى النشر',
        price: '599$', priceSuffix: '/ دفعة واحدة', cta: 'اشترِ خطة التنصيب الذاتي',
        durationValue: '∞', durationLabel: 'تحديثات مدى الحياة', durationProgress: 15,
        tagline: 'نزّل الكود، شغّله سريعاً، وامتلكه للأبد.',
        features: [
          'شيفرة مصدرية كاملة',
          'حسابات ومنشآت بلا حدود',
          'كل الوحدات الأساسية التسع',
          'كل الإضافات الستة عشرة',
          'امتثال ZATCA و ETA',
          'العربية + الإنجليزية',
          'تحديثات مدى الحياة (كل إصدار، للأبد)',
          'دليل تنصيب Docker Compose',
          'دعم بريد إلكتروني (رد خلال 48 ساعة)'
        ]
      },
      {
        name: 'تنصيب كامل', tag: 'نحن نتولى النشر',
        price: '1,499$', priceSuffix: '/ دفعة واحدة', cta: 'اشترِ خطة التنصيب الكامل',
        durationValue: '∞', durationLabel: 'تحديثات مدى الحياة', durationProgress: 100,
        featured: true, mostPopular: 'الأكثر شعبية',
        tagline: 'نقوم بالنشر والضبط والتسليم، وأنت تبدأ التشغيل.',
        features: [
          'كل ما في التنصيب الذاتي',
          'ننشر على VPS الخاص بك (أو لدينا)',
          'إعداد أول منشأة مع الهوية البصرية',
          'تفعيل ZATCA / ETA لمنطقتك',
          'استيراد بيانات من نظامك الحالي',
          'جلسة تدريب مشغّلين 60 دقيقة',
          'دعم مميز (رد خلال 24 ساعة)',
          'تحديثات مدى الحياة (كل إصدار، للأبد)'
        ]
      }
    ],
    footer: 'الدفع مؤمّن عبر Lemon Squeezy، مع معالجة ضريبة القيمة المضافة ومتطلبات التاجر المسجّل بعملتك المحلية.'
  },
  testimonials: {
    eyebrow: 'قصص من التشغيل الفعلي', heading: 'منتج بُني للمشغّلين بلغة يفهمونها.',
    items: [
      { quote: 'استبدلنا ثلاث أدوات منفصلة بـ Momentfy في عطلة نهاية أسبوع. موظفو الاستقبال يبتسمون الآن فعلاً.', name: 'لينا ح.', role: 'صاحبة سلسلة سبا · الرياض' },
      { quote: 'أضفنا هويتنا، نشرناه في عشر عيادات واجتزنا فحص ZATCA من أول محاولة.', name: 'كريم م.', role: 'تقنية مجموعة أسنان · القاهرة' },
      { quote: 'أخيراً منصة تتعامل مع العربية كلغة أصلية. ليست مجرد ترجمة لاحقة.', name: 'نورا ع.', role: 'صاحبة عيادة · دبي' }
    ],
    disclaimer: 'الاقتباسات هنا توضيحية وتعكس أنماطاً متكررة من ملاحظات المستخدمين الأوائل. ستُضاف دراسات حالة موثّقة وشعارات عملاء فعلية مع توسّع الإطلاق.'
  },
  trust: {
    eyebrow: 'الثقة والأمان',
    heading: 'المنصة تحت سيطرتك من البداية إلى النهاية.',
    sub: 'استضافة ذاتية بالمبدأ، وشيفرة قابلة للمراجعة، وبنية يمكن تدقيقها وتشغيلها كما تريد.',
    pillars: [
      { title: 'بياناتك على خادمك',        body: 'لا شيء يخرج من خادمك إلا ما تقرره أنت. لا طبقة SaaS وسيطة، ولا تتبع مخفي، وسجلات عملائك تبقى في البنية التي تديرها.',                        icon: 'i-lucide-server' },
      { title: 'اطّلع على كل سطر',         body: 'تحصل على تطبيق TypeScript كامل مع كل ترخيص، بحيث يمكنك مراجعة الشيفرة أو تفريعها أو تعديلها بدون صناديق سوداء.',                                      icon: 'i-lucide-file-code-2' },
      { title: 'سجل مراجعة مدمج',          body: 'كل إجراء حساس، مثل الاسترداد أو تجاوز الصلاحيات أو انتحال الشخصية أو تصدير البيانات، يُسجل زمنياً وباسم المستخدم ويمكن مراجعته من الإدارة.',                icon: 'i-lucide-history' },
      { title: 'امتثال مدمج',              body: 'تدفّقات ZATCA المرحلة الثانية و ETA المصرية وأدوات VAT وسجل المراجعة وتصدير البيانات تأتي ضمن المنتج نفسه، لا كإضافات منفصلة.',    icon: 'i-lucide-shield-check' }
    ]
  },
  faq: {
    eyebrow: 'الأسئلة الشائعة', heading: 'إجابات مختصرة على أهم الأسئلة.', linkAll: 'عرض جميع الأسئلة',
    items: [
      { q: 'ماذا أستلم تحديداً بعد الشراء؟', a: 'تحصل على وصول إلى مستودع GitHub الخاص بشيفرة Momentfy الكاملة، مع وثائق التثبيت ومفتاح الترخيص وروابط التحديثات.' },
      { q: 'هل يمكن تشغيله كخدمة SaaS وبيعه لعدة حسابات؟', a: 'نعم. وضع الحسابات المتعددة مدمج في الخطتين، ويمكن لنشر واحد خدمة عدد غير محدود من الحسابات والمنشآت. الممنوع فقط هو إعادة بيع الشيفرة نفسها لمطوّرين آخرين.' },
      { q: 'هل توجد رسوم شهرية؟', a: 'لا. تدفع مرة واحدة فقط، ثم تمتلك الترخيص والشيفرة والتحديثات مدى الحياة، بدون رسوم شهرية لكل مستخدم أو لكل حساب.' },
      { q: 'لأي أسواق صُمّم المنتج؟', a: 'المنصة مهيأة خصوصاً للسعودية ومصر، مع دعم ZATCA المرحلة الثانية و ETA المصرية وضريبة القيمة المضافة، لكنها تصلح أيضاً لأي نشاط خدمي في أسواق أخرى.' }
    ]
  },
  cta: {
    eyebrow: 'ابدأ اليوم', heading: 'أطلق منصتك بسرعة وعلى شروطك.',
    sub: 'اشترِ الشيفرة مرة واحدة، انشرها على خادمك، واضبط نموذجك التجاري كما تريد مع الاحتفاظ بكامل الإيراد.',
    buy: 'شراء الشيفرة المصدرية', explore: 'استكشف المزايا',
    lifetime: 'ترخيص دائم', unlimited: 'حسابات بلا حدود', updates: 'تحديثات مدى الحياة'
  },
  footer: {
    tag: 'منصة متكاملة للحجز وتشغيل الأعمال الخدمية والعيادات والصالونات. شيفرة تملكها، واستضافة تديرها، ومنتج يبقى لك.',
    badge: 'الإصدار 1.0 جاهز للتشغيل',
    columns: [
      { title: 'المنتج', links: [
        { label: 'المميزات', to: '/portal/features' }, { label: 'الإضافات', to: '/portal/addons' },
        { label: 'القطاعات', to: '/portal/showcase' }, { label: 'الأسعار', to: '/portal/pricing' },
        { label: 'أسئلة شائعة', to: '/portal/faq' }
      ] },
      { title: 'الحلول', links: [
        { label: 'الصالونات والسبا', to: '/portal/solutions/salon' },
        { label: 'عيادات الأسنان', to: '/portal/solutions/dental' },
        { label: 'العيادات الطبية', to: '/portal/solutions/medical' },
        { label: 'محلات الحلاقة', to: '/portal/solutions/barber' },
        { label: 'اللياقة والحصص', to: '/portal/solutions/fitness' },
        { label: 'رعاية الحيوانات والبيطرة', to: '/portal/solutions/pet' },
        { label: 'العلاج والتدريب', to: '/portal/solutions/therapy' },
        { label: 'استوديوهات التصوير', to: '/portal/solutions/photo' },
        { label: 'صالونات الأظافر والرموش', to: '/portal/solutions/nails' },
        { label: 'الوشم والثقب', to: '/portal/solutions/tattoo' },
        { label: 'المساج والعافية', to: '/portal/solutions/wellness' },
        { label: 'مدارس تعليم القيادة', to: '/portal/solutions/driving' },
        { label: 'مراكز الدروس الخصوصية', to: '/portal/solutions/tutoring' },
        { label: 'السلاسل متعددة الفروع', to: '/portal/solutions/multi-tenant' },
        { label: 'الفرق المتنقلة والميدانية', to: '/portal/solutions/mobile' },
        { label: 'أعمال العضويات', to: '/portal/solutions/memberships' }
      ] },
      { title: 'الامتثال', links: [
        { label: 'ZATCA (السعودية)', to: '/portal/features#zatca' }, { label: 'ETA (مصر)', to: '/portal/features#eta' },
        { label: 'عربي + RTL', to: '/portal/features#i18n' }, { label: 'المستأجرون المتعددون', to: '/portal/features#multi-tenant' },
        { label: 'استضافة ذاتية', to: '/portal/features#self-hosted' }
      ] },
      { title: 'مصادر', links: [
        { label: 'التوثيق', to: '/portal/docs' }, { label: 'شراء الكود', to: '/portal/download' },
        { label: 'تسجيل الدخول', to: '/auth/login' }, { label: 'سجل التغييرات', to: '/portal/download#changelog' },
        { label: 'تواصل', to: '/portal/download#contact' }
      ] },
      { title: 'قانوني', links: [
        { label: 'الترخيص', to: '/portal/legal#license' }, { label: 'الشروط', to: '/portal/legal#terms' },
        { label: 'الخصوصية', to: '/portal/legal#privacy' }, { label: 'سياسة البيع', to: '/portal/legal#sales' },
        { label: 'الشركة', to: '/portal/legal#company' }
      ] }
    ],
    bottom: '© {year} Momentfy. بُني للمشغّلين قبل أي شيء آخر.',
    bottomLang: 'English · العربية',
    bottomHost: 'استضافة ذاتية · بلا قيود'
  },

  ui: {
    skipToMain: 'تخطّي إلى المحتوى الرئيسي',
    backToTop: 'للأعلى',
    readAbout: 'اقرأ عن',
    exploreVerb: 'استكشف',
    illustrative: 'توضيحي',
    illustrativeBenchmarks: 'معايير توضيحية',
    includedInEveryPlan: 'مضمّن في كل خطة',

    breadcrumbFeatures: 'المميزات',
    breadcrumbAddons: 'الإضافات',
    coreModule: 'وحدة أساسية',
    addonCategorySuffix: 'إضافة',
    whatItDoes: 'ماذا تفعل',
    whatItLooksLike: 'كيف تبدو',
    livePreviewPrefix: 'معاينة حية لوحدة ',
    livePreviewSuffix: '.',
    worksBestWith: 'يعمل بشكل أفضل مع',
    worksBestWithBody: 'كل وحدة مصممة للعمل مع بقية الوحدات — وهذه أكثرها ترابطاً.',
    betterTogether: 'معاً أفضل.',
    keyCapabilities: 'القدرات الرئيسية',
    everyMovingPart: 'كل التفاصيل.',
    whoItsFor: 'لمن هذا',
    setupTitle: 'الإعداد',
    setupBody: 'أربع خطوات من التفعيل إلى الإنتاج — بلا خدمات خارجية.',
    fromDisabledToLive: 'من معطّل إلى مباشر.',
    integratesWith: 'يتكامل مع',
    integratesBody: 'الوحدات التي تعمل هذه الإضافة معها جاهزة.',
    moreFromCategoryPrefix: 'المزيد من ',
    exploreTheChapter: 'استكشف الفصل.',
    previousModule: 'الوحدة السابقة',
    nextModule: 'الوحدة التالية',
    previousAddon: 'الإضافة السابقة',
    nextAddon: 'الإضافة التالية',

    moduleNotFoundEyebrow: 'الوحدة غير موجودة',
    addonNotFoundEyebrow: 'الإضافة غير موجودة',
    noModuleWithId: 'لا توجد وحدة بهذا المعرّف.',
    noAddonWithKey: 'لا توجد إضافة بهذا المفتاح.',
    checkUrlFeatures: 'تحقّق من الرابط، أو تصفّح قائمة المميزات الكاملة.',
    checkUrlAddons: 'تحقّق من الرابط، أو تصفّح دليل الإضافات الكامل.',
    browseAllFeatures: 'تصفّح كل المميزات',
    browseAllAddons: 'تصفّح كل الإضافات',

    currencyLabel: 'العملة',
    methodsLabel: 'طرق الدفع',
    processorLabel: 'المعالج',

    colVer: 'الإصدار',
    colLang: 'اللغة',
    colHost: 'الاستضافة',
    colStat: 'الحالة',

    chaptersLabel: 'الفصول:',
    appRatingLabel: 'تقييم التطبيق',
    timeToBookLabel: 'وقت الحجز',
    pwaReadyLabel: 'PWA جاهز',
    offlineLabel: 'بلا إنترنت',
    revenueLabel: 'الإيرادات',
    oneSourceThreeBrands: 'قاعدة كود واحدة. ثلاث علامات.',
    threeBrandsTagline: 'الإصدار نفسه لكل الجميع، مع نطاق وهوية ومحتوى مستقل لكل منشأة أو علامة.',
    cantFindFaq: 'لم تجد ما تبحث عنه؟ الأسئلة الكاملة تحتوي على 24+ إجابة إضافية.',

    liveDemo: 'عرض مباشر',
    watchTourLead: 'شاهد جولة المنتج ',
    watchTourSuffix: '',
    tourChapters: 'التقويم ← نقاط البيع ← بوابة العميل ← فاتورة الزكاة، في أقل من ثلاث دقائق.',
    demoChip: 'عرض',

    fromZeroToLive: 'من الصفر إلى الإطلاق في أربع خطوات',
    readyKicker: 'جاهز؟',
    buyCloneTagline: 'اشترِ الكود وابدأ من مستودعك مباشرة.',
    readLicense: 'اقرأ الترخيص',
    fullFaq: 'كل الأسئلة',
    stepLabel: 'الخطوة',
    swipeHint: 'اسحب ←→ لمقارنة المستأجرين',
    explorerPaused: 'متوقف · مرّر لاستئنافه',
    explorerAutoPrefix: 'تلقائي · ',
    readMore: 'اقرأ المزيد',
    allSixteenShip: 'الإضافات الست عشرة كلها تأتي مع كل نسخة من الكود',
    secureCheckout: 'دفع آمن',
    lifetimeLicense: 'ترخيص مدى الحياة',
    lifetimeUpdates: 'تحديثات مدى الحياة',

    videoSectionEyebrow: 'شاهدها أثناء العمل',
    videoSectionBody: 'جولة قصيرة تعمل تلقائياً — بلا تسجيل ولا دخول ولا صور ثابتة.',
    videoSectionHeading: 'جولة 30 ثانية في وحدة',
    videoSectionHeadingSuffix: '.',
    videoComingSoonEyebrow: 'جولة الفيديو · قيد الإنتاج',
    videoComingSoon: 'نصوّر جولة 30 ثانية جديدة لهذه الوحدة — ستظهر هنا فور اكتمالها.',
    muteVideo: 'كتم',
    unmuteVideo: 'تشغيل الصوت',
    playVideo: 'تشغيل',
    pauseVideo: 'إيقاف مؤقت',
    mutedIndicator: 'مكتوم · انقر للاستماع',

    mockZatcaCleared: 'الزكاة — مُجازة',
    mockInvoicePrefix: 'فاتورة ',
    mockVat: 'ضريبة',
    mockTotal: 'الإجمالي',
    mockSigned: 'موقّعة',
    mockAiActive: 'نشط',
    mockAiDraft: 'مسودات جاهزة للإرسال.',
    mockAiSendAll: 'أرسل الكل',
    mockAiReview: 'راجع',
    mockThisMonth: 'هذا الشهر',
    mockNetRevenue: 'صافي الإيرادات · 342 تذكرة'
  },

  featuresPage: {
    eyebrow: 'المزايا', h1: 'كل ما تحتاجه لإدارة التشغيل في منصة واحدة.',
    sub: 'ستة عشر مجالاً رئيسياً ومئات الشاشات المترابطة، كلها ضمن الكود نفسه ومن دون طبقات مدفوعة إضافية.',
    filterAll: 'الكل', filterLabels: { all: 'الكل' },
    groups: {
      'Front of house': 'واجهة العمل', 'Money': 'المال', 'Relationships': 'العلاقات',
      'Offering': 'العروض', 'Operations': 'العمليات', 'People': 'الأشخاص',
      'Insights': 'الرؤى', 'Clients': 'العملاء', 'Platform': 'المنصة',
      'Compliance': 'الامتثال', 'Intelligence': 'الذكاء', 'Growth': 'النمو'
    },
    items: []
  },
  addonsPage: {
    eyebrow: 'الإضافات', h1: 'ستة عشر وحدة. كود واحد.',
    sub: 'فعّل ما تحتاجه لكل حساب أو منشأة، واطرح نفس المنتج لقطاعات متعددة من التثبيت نفسه.',
    filterAll: 'الكل'
  },
  pricingPage: {
    eyebrow: 'الأسعار', h1a: 'اشترِ مرة واحدة.', h1b: 'وامتلكه للأبد.',
    sub: 'لا رسوم لكل مستخدم، ولا لكل حساب، ولا اشتراك شهري يتضخم كلما نجح عملك.',
    everywhereTitle: 'مضمن في كل الخطط', everywhereHeading: 'كل خطة تأتي بكل شيء.',
    included: ['شيفرة مصدرية كاملة', 'العربية + الإنجليزية', 'مستخدمون بلا حدود', 'استضافة ذاتية', 'جاهز لـ ZATCA و ETA', 'بوابة عميل PWA', 'مساعد ذكي', 'محرك محاسبة'],
    compareEyebrow: 'لماذا لا يكون SaaS فقط؟', compareHeading: 'احسب التكلفة الفعلية.',
    compareBody: 'هذه مقارنة تقريبية لتكلفة منصة حجز SaaS خلال 3 سنوات لسلسلة من 3 فروع:',
    saasLabel: 'SaaS نموذجي', saasValue: '+$7,200',
    saasBody: '$200 شهرياً × 36 شهراً. والسعر غالباً يرتفع مع الوقت، بينما تبقى البيانات والمنتج خارج سيطرتك.',
    momentfyLabel: 'Momentfy التنصيب الذاتي', momentfyValue: '$599',
    momentfyBody: 'دفعة واحدة، حسابات بلا حدود، شيفرة كاملة، تحديثات مدى الحياة، وملكية كاملة للمنتج.',
    faq: {
      eyebrow: 'أسئلة الأسعار',
      heading: 'الأسعار، مشروحة.',
      items: [
        { q: 'هل التحديثات فعلاً مدى الحياة؟', a: 'نعم. الخطتان تشملان تحديثات مدى الحياة — كل إصدار مستقبلي لك بدون تكلفة إضافية. لا تجديد، لا ترقية فئة، لا فواتير مفاجئة.' },
        { q: 'ما الفرق بين التنصيب الذاتي والتنصيب الكامل؟', a: 'نفس الكود بالضبط، نفس المستأجرين بلا حدود، نفس التحديثات مدى الحياة. "ذاتي" يعني أنت تنشره بنفسك (يستغرق حوالي ساعة مع دليل Docker Compose). "كامل" يعني نحن ننشر على VPS الخاص بك، نضبط مستأجرك وهويتك البصرية، نفعّل ZATCA/ETA، نستورد بياناتك الحالية، ونقدم جلسة تدريب 60 دقيقة لفريقك.' },
        { q: 'هل يمكنني التجربة قبل الشراء؟', a: 'نعم — رابط عرض حيّ متاح من الصفحة الرئيسية وصفحة الأسعار. جرّب المنتج الكامل ببيانات نموذجية قبل الشراء.' },
        { q: 'ما العملات وطرق الدفع المقبولة؟', a: 'التسعير الأساسي بالدولار الأمريكي. عند الدفع يمكنك الاختيار بين الدولار، الريال السعودي، الجنيه المصري، اليورو، الجنيه الإسترليني أو الدرهم — يحوّلها Lemon Squeezy تلقائياً. بطاقات Visa / Mastercard / Amex وApple Pay / Google Pay. للتحويل البنكي بفاتورة، راسلنا على hello@momentfy.io.' },
        { q: 'هل يمكنني الترقية من التنصيب الذاتي إلى الكامل لاحقاً؟', a: 'نعم. ادفع الفرق وسنجدول التنصيب. فقط راسلنا برقم طلبك.' },
        { q: 'هل تفوترون ضريبة القيمة المضافة؟', a: 'Lemon Squeezy يتولى ضريبة القيمة المضافة تلقائياً — بما في ذلك الـ 15% السعودية وضريبة الاتحاد الأوروبي — ويُصدر فاتورة ضريبية صالحة.' },
        { q: 'هل يمكنني شراء ترخيص واحد لعدة أعمال أديرها؟', a: 'الترخيص الواحد يغطي كياناً قانونياً واحداً. إذا كنت تدير كيانين منفصلين، تحتاج ترخيصين. للتشغيل متعدد العلامات داخل كيان واحد، ترخيص واحد يكفي.' },
        { q: 'هل يوجد استرداد؟', a: 'كل المبيعات نهائية بعد تنزيل الكود. إذا فشل رابط التنزيل أو كان الأرشيف تالفاً جوهرياً ولم نستطع إصلاحه خلال 7 أيام، نردّ المبلغ كاملاً. راجع سياسة البيع في الصفحة القانونية.' }
      ]
    },
    payments: {
      eyebrow: 'الدفع',
      heading: 'آمن، محلي، موثّق.',
      sub: 'كل المدفوعات عبر Lemon Squeezy — بصفة تاجر مسجل (MoR) تحصل على فاتورة ضريبية سليمة بعملتك المحلية.',
      currency: 'الدولار الأمريكي أساساً · تحويل تلقائي إلى الريال والجنيه واليورو والإسترليني والدرهم',
      methods: ['Visa · Mastercard · Amex', 'Apple Pay · Google Pay', 'تحويل بنكي بفاتورة (عند الطلب)'],
      processor: 'المعالجة عبر Lemon Squeezy · تاجر مسجل'
    }
  },
  showcasePage: {
    eyebrow: 'القطاعات', h1a: 'منصة واحدة.', h1b: 'تخدم تخصصات متعددة.',
    sub: 'فعّل ما يلزمك فقط، ثم أطلق المنتج المناسب لقطاعك من قاعدة الكود نفسها.',
    shipsWith: 'يأتي مع', cta1: 'شاهد المميزات المطابقة', cta2: 'الإضافات المطلوبة',
    statsNote: 'الأرقام معايير توضيحية — مستقاة من تقارير المشغلين الأوائل ومعايير الصناعة، وليست نتيجة مضمونة لكل نشر.',
    verticals: [
      { id: 'salon', title: 'الصالونات والسبا',
        hero: 'مسارات موظفين ملونة، اشتراكات، بطاقات هدايا وولاء — مصمم لإيقاع الصالون.',
        setup: ['التقويم', 'نقاط البيع', 'الاشتراكات', 'الولاء', 'الحملات', 'التقييمات'],
        stats: [{ k: 'انخفاض الغياب', v: '-38%' }, { k: 'معدل إعادة الحجز', v: '+52%' }, { k: 'وقت الدفع', v: '< 90ث' }] },
      { id: 'dental', title: 'عيادات الأسنان',
        hero: 'مخطط أسنان، خطط علاج، تصوير DICOM، وصفات وتأمين — مع فوترة ZATCA.',
        setup: ['التقويم', 'مخطط الأسنان', 'التصوير', 'الوصفات', 'التأمين', 'ZATCA'],
        stats: [{ k: 'استغلال الكرسي', v: '+24%' }, { k: 'استرداد التأمين', v: '+31%' }, { k: 'وقت التسجيل', v: '-65%' }] },
      { id: 'medical', title: 'العيادات الطبية',
        hero: 'سجل طبي منظم، طلبات مختبر، وصفات وجدولة لأطباء متعددين مع فوترة جاهزة للتأمين.',
        setup: ['التقويم', 'السجل الطبي', 'طلبات المختبر', 'الوصفات', 'التأمين', 'البوابة'],
        stats: [{ k: 'وقت التسجيل', v: '-40%' }, { k: 'تبني البوابة', v: '72%' }, { k: 'وقت المختبر', v: '-28%' }] },
      { id: 'barber', title: 'محلات الحلاقة',
        hero: 'طابور الزبائن، نقاط بيع سريعة وعمولات لكل حلاق. مصمم للحجم.',
        setup: ['التقويم', 'نقاط البيع', 'الاشتراكات', 'العمولات', 'البقشيش', 'الحملات'],
        stats: [{ k: 'متوسط الفاتورة', v: '+18%' }, { k: 'انتظار الطابور', v: '-44%' }, { k: 'دقة العمولة', v: '100%' }] },
      { id: 'fitness', title: 'الصالات والاستوديوهات',
        hero: 'حصص جماعية، اشتراكات، قوائم انتظار وتتبع الحضور. تسجيل دخول للكشك.',
        setup: ['الفعاليات', 'الاشتراكات', 'الحضور', 'البوابة', 'الحملات', 'التقارير'],
        stats: [{ k: 'امتلاء الحصص', v: '+26%' }, { k: 'فقد الأعضاء', v: '-19%' }, { k: 'وقت التسجيل', v: '< 5ث' }] },
      { id: 'pet', title: 'البيطرة ورعاية الحيوانات',
        hero: 'سجلات بيطرية، جداول تطعيم، استضافة وفوترة رعاية نهارية في مكان واحد.',
        setup: ['التقويم', 'السجل الطبي', 'الاستضافة', 'نقاط البيع', 'البوابة', 'التذكيرات'],
        stats: [{ k: 'استدعاء التطعيم', v: '+48%' }, { k: 'استغلال الاستضافة', v: '+33%' }, { k: 'تقييمات', v: '4.9★' }] }
    ]
  },
  downloadPage: {
    eyebrow: 'احصل على الكود', h1: 'جاهز للبدء خلال دقائق.',
    sub: 'اشترِ مرة واحدة، نزّل الشيفرة، انشرها أينما تريد، وابدأ تشغيل منتجك التجاري فوراً.',
    buy: 'اختر خطة', talk: 'تحدث معنا أولاً',
    steps: [
      { n: '01', title: 'اشترِ', body: 'الدفع يتم بشكل آمن عبر Lemon Squeezy، ويصل إليك الترخيص وروابط الوصول مباشرة.' },
      { n: '02', title: 'نزّل', body: 'تحصل على حزمة تضم الشيفرة الكاملة مع دليل التثبيت وقالب `.env` الجاهز.' },
      { n: '03', title: 'ثبّت', body: 'شغّل المنصة عبر Docker Compose أو من خلال معالج التثبيت في المتصفح خلال دقائق.' },
      { n: '04', title: 'اضبط', body: 'أنشئ أول منشأة، فعّل الإضافات المناسبة، ارفع الهوية البصرية، وابدأ التشغيل.' }
    ],
    inside: { eyebrow: 'داخل الملف المضغوط', heading: 'ما ستنزّله فعلاً.',
      body: 'لا توجد طبقات مخفية أو أجزاء ناقصة. هذا ما يصلك فعلياً بعد الشراء.',
      items: ['تطبيق Nuxt 4 + Vue 3 TypeScript كامل', 'Prisma: schema و migrations و seeds', 'API مع H3 handlers',
        'Dockerfile + docker-compose.yml', 'معالج تثبيت + نموذج .env', 'ملفات لغة عربية + إنجليزية',
        'تخطيطات Admin / Portal / Booking', 'ترخيص متوافق مع MIT']
    },
    changelog: { eyebrow: 'سجل التغييرات', heading: 'ما الجديد.',
      entries: [
        { ver: 'v1.0 · قيد الشحن الآن', title: 'شرائح وقواعد تغطية التأمين', body: 'نماذج InsuranceClass و InsuranceClassCoverage مع CRUD كامل وإدارة قواعد التغطية للعيادات.', current: true },
        { ver: 'v0.9', title: 'إدارة تسجيل الدخول + فاتورة ETA', body: 'تصفية وفرز محسّن وإصدار فواتير ETA مباشرة من تسجيلات الدخول.' },
        { ver: 'v0.8', title: 'محرك مهام المتابعة', body: 'تحقق من العميل والعضو، إشعار الاقتطاع، ترقيم صفحات محسّن.' }
      ]
    },
    contact: { eyebrow: 'تواصل', heading: 'تريد عرضاً أو لديك سؤال؟', sub: 'نرد عادةً خلال يوم عمل واحد.',
      name: 'الاسم', namePh: 'اسمك', email: 'البريد الإلكتروني *', emailPh: 'you@company.com',
      message: 'كيف نساعدك؟', messagePh: 'حدثنا عن عملك…',
      submit: 'أرسل الرسالة', sent: 'تم الإرسال — نتحدث قريباً'
    },
    faq: { eyebrow: 'إجابات', heading: 'ما يسأله المشترون أكثر.', items: [
      { q: 'هل أحصل على الكود المصدري الحقيقي؟', a: 'نعم — كل كود TypeScript. تطبيق Nuxt، API، Prisma schema، migrations، seeds. بدون تشفير أو تصغير.' },
      { q: 'هل يمكنني تعديل الكود؟', a: 'بالكامل. غيّر الهوية، أضف مميزات، احذف ما لا تريده.' },
      { q: 'هل أحتاج خادماً؟', a: 'أي VPS مع Docker. ننصح بـ 2GB RAM، PostgreSQL، ودلو متوافق مع S3 للرفع.' },
      { q: 'هل التحديثات مشمولة؟', a: 'نعم — تحديثات مدى الحياة في الخطتَين. كل إصدار مستقبلي يصل إلى رابط تنزيلك الخاص بلا تكلفة إضافية، بلا تجديد، للأبد.' }
    ] }
  },
  faqPage: {
    eyebrow: 'الأسئلة الشائعة', h1: 'كل ما قد تحتاج إلى معرفته.',
    sub: 'إذا لم يكن سؤالك هنا،', contactLink: 'راسلنا',
    sections: [
      { title: 'الترخيص والأسعار', items: [
        { q: 'هل هذا اشتراك SaaS؟', a: 'لا. Momentfy منتج تشتري شيفرته وتستضيفه بنفسك. لا توجد فاتورة شهرية إلزامية.' },
        { q: 'ما المشمول في السعر؟', a: 'السعر يشمل مستودع الشيفرة الكامل ووثائق التثبيت وقالب `.env` ومفتاح الترخيص وروابط التحديثات مدى الحياة. خطة التنصيب الكامل تضيف خدمة النشر والضبط بالنيابة عنك.' },
        { q: 'هل يمكنني إعادة بيعه؟', a: 'نعم. وضع الحسابات المتعددة مدمج، وكل حساب أو منشأة تشغّلها وتبيعها عبر منصتك يخصك أنت. الممنوع فقط هو إعادة بيع الشيفرة نفسها لمطوّرين آخرين.' },
        { q: 'هل يوجد عرض تجريبي مجاني؟', a: 'نعم — رابط عرض حيّ متاح في صفحة الأسعار والصفحة الرئيسية. يمكنك تجربة المنتج الكامل ببيانات نموذجية قبل الشراء.' }
      ] },
      { title: 'التثبيت والاستضافة', items: [
        { q: 'ماذا أحتاج للنشر؟', a: 'أي Linux VPS مع Docker (2GB RAM كحد أدنى)، PostgreSQL 14+، واختيارياً دلو متوافق مع S3.' },
        { q: 'هل يعمل على استضافة مشتركة؟', a: 'تقنياً نعم مع Node 18+، لكن ننصح بشدة بـ VPS مخصص من Hetzner أو DigitalOcean أو Railway.' },
        { q: 'كم يستغرق التثبيت؟', a: 'في معظم الحالات نحو 10 دقائق: شغّل `docker compose up -d`، افتح المتصفح، ثم أكمل معالج التثبيت.' },
        { q: 'هل تساعدون في النشر؟', a: 'نعم، عبر خطة "التنصيب الكامل". ننشر على VPS الخاص بك، نجهّز أول منشأة، نفعّل ZATCA أو ETA عند الحاجة، نستورد بياناتك، ثم ندرّب فريقك. أما خطة "التنصيب الذاتي" فتتضمن دليلاً مفصلاً ودعماً عبر البريد.' }
      ] },
      { title: 'المستأجرون المتعددون و SaaS', items: [
        { q: 'هل يخدم تثبيت واحد أعمالاً متعددة؟', a: 'نعم. وضع الحسابات المتعددة مدمج، ويمكن لتثبيت واحد خدمة عدد غير محدود من الحسابات مع فصل واضح للبيانات والإعدادات.' },
        { q: 'هل يمكنني محاسبة عملائي على استخدام المنصة؟', a: 'بالتأكيد. هناك خطط اشتراك وحدود استخدام وتكامل مع Lemon Squeezy و Stripe، إضافة إلى لوحة إدارة مركزية.' },
        { q: 'هل يمكن لكل حساب هوية خاصة؟', a: 'نعم. لكل حساب أو منشأة شعاره وإعدادات القائمة واللغة الافتراضية وتفعيل الإضافات بشكل مستقل.' },
        { q: 'هل وضع المستأجر الواحد مدعوم؟', a: 'نعم. اضبط `APP_MODE=single-tenant` وتُلغى فحوصات الاشتراك — مثالي لمحلك الخاص.' }
      ] },
      { title: 'الامتثال والمناطق', items: [
        { q: 'هل يدعم ZATCA المرحلة 2؟', a: 'نعم. التدفق الكامل: CSR، CSID، توقيع XML UBL، ختم QR، إجازة وتقرير. جاهز للسعودية.' },
        { q: 'هل يدعم ETA المصري؟', a: 'نعم. ربط أكواد العناصر/العملاء، تحقق قبل التقديم، تقديم وتتبع الحالة، إشعارات دائنة.' },
        { q: 'هل يتعامل مع ضريبة القيمة المضافة؟', a: 'نعم — معدلات ضريبة لكل عنصر، تسعير شامل، تقرير الإقرار، وربط أكواد الضرائب للفوترة.' },
        { q: 'هل متوافق مع GDPR؟', a: 'نعم — أنت تتحكم بالبيانات لأنك تستضيفها. يشمل تصدير البيانات، الحذف وسجلات المراجعة.' }
      ] },
      { title: 'المميزات والتخصيص', items: [
        { q: 'هل أحذف مميزات لا أحتاجها؟', a: 'نعم. كل إضافة قابلة للتفعيل لكل مستأجر؛ احذف الكود بالكامل إذا أردت.' },
        { q: 'هل أضيف مميزاتي الخاصة؟', a: 'نعم — إنه كودك الآن. Nuxt 4، Vue 3، Prisma، TypeScript قياسي.' },
        { q: 'هل يوجد API؟', a: 'نعم — مسارات خادم باستخدام H3. يمكن فتحها للعامة مع auth middleware.' },
        { q: 'هل يدعم العمل بدون إنترنت؟', a: 'نعم، إنه PWA مع تخزين workbox. الحجز ونقاط البيع يعملان عند انقطاع الشبكة.' }
      ]},
      { title: 'الدعم والتحديثات', items: [
        { q: 'كيف تعمل التحديثات؟', a: 'تحصل على رابط تنزيل خاص. استنسخ/اسحب الإصدار الجديد وشغّل الـ migrations.' },
        { q: 'هل يوجد تغييرات كاسرة؟', a: 'نتبع semver. النسخ الثانوية تركيب مباشر. النسخ الرئيسية تأتي مع دليل ترحيل.' },
        { q: 'كيف أحصل على الدعم؟', a: 'دعم بريد إلكتروني في الخطتَين. "التنصيب الكامل" يحصل على رد مميز خلال 24 ساعة. "التنصيب الذاتي" يحصل على رد خلال 48 ساعة في أيام العمل.' },
        { q: 'هل يوجد خارطة طريق؟', a: 'نعم — المشترون يحصلون على خارطة طريق خاصة ويصوتون على الأولويات.' }
      ] }
    ]
  },

  docsPage: {
    eyebrow: 'التوثيق',
    h1: 'كل ما تحتاجه للنشر.',
    sub: 'هذا دليل مختصر للمشغّل. أما التوثيق المرجعي الكامل فيصل مع الشيفرة داخل مجلد `/docs`.',
    sections: [
      {
        id: 'requirements', num: '01', title: 'متطلبات النظام',
        body: 'Momentfy يعمل كتطبيق Node.js + PostgreSQL. أي VPS متواضع أو استضافة Node مُدارة تكفي.',
        kv: [
          { k: 'بيئة التشغيل', v: 'Node.js 20 LTS أو أحدث' },
          { k: 'قاعدة البيانات', v: 'PostgreSQL 14 أو أحدث' },
          { k: 'الذاكرة',   v: '2 جيجا حد أدنى · 4 جيجا موصى به' },
          { k: 'المعالج',   v: '2 vCPU موصى به' },
          { k: 'التخزين',   v: '20 جيجا + حجم الملفات المرفوعة' },
          { k: 'ملفات',     v: 'قرص محلي أو أي دلو متوافق مع S3' },
          { k: 'SSL',       v: 'مطلوب لـ ZATCA و PWA والإشعارات' }
        ]
      },
      {
        id: 'hosting-cost', num: '02', title: 'تكلفة الاستضافة النموذجية',
        body: 'الاستضافة الذاتية تعني أنك تملك فاتورة الخادم. التكاليف الشهرية الواقعية تقع في هذه الشرائح:',
        kv: [
          { k: 'مشغّل فردي',          v: '≈ 5–10$ / شهر (VPS صغير)' },
          { k: '3–5 فروع',             v: '≈ 15–30$ / شهر (VPS 2GB + Postgres مُدار)' },
          { k: 'موزع SaaS',            v: '≈ 40–120$ / شهر (PG مخصص + S3 + CDN)' }
        ]
      },
      {
        id: 'deployment', num: '03', title: 'النشر',
        body: 'الكود يشحن مع Dockerfile و docker-compose.yml ومعالج تثبيت من المتصفح. يمكنك النشر بدون Docker إن فضّلت.',
        items: [
          'Docker Compose — أمر واحد، يشمل Postgres',
          'Node.js عارٍ — clone ثم npm ci ثم npm run build، شغّل بـ PM2 أو systemd',
          'Hetzner / DigitalOcean / Railway — أدلة جاهزة خطوة بخطوة في /docs',
          'macOS / Windows للتطوير المحلي — مدعومة جاهزة',
          'Postgres مُدار (Supabase / Neon / RDS) — يُوصَل عبر DATABASE_URL'
        ]
      },
      {
        id: 'repo-access', num: '04', title: 'المستودع والتحديثات',
        body: 'عند الشراء نضيفك إلى منظمة GitHub خاصة بمقعد ترخيص باسمك. كل إصدار يأتي كـ tag — اسحب، هاجر البيانات، أعد التشغيل.',
        items: [
          'دعوة مستودع GitHub خاص تصل بريدك خلال دقائق',
          'الإصدارات تتبع semver · الـ migrations مشمولة في كل tag',
          'ملاحظات إصدار + دليل ترقية مع كل إصدار رئيسي',
          'إذا كنت تفضّل ZIP بدل git، أرشيفات موقّعة متاحة أيضاً'
        ]
      },
      {
        id: 'multi-tenant', num: '05', title: 'وضع فردي أو متعدد المستأجرين',
        body: 'اضبط APP_MODE=single-tenant لعملك الخاص. اضبط multi-tenant لإعادة البيع أو خدمة العملاء ببوابات مُخصصة.',
        items: [
          'فردي → بدون فحوصات اشتراك، مستأجر واحد لكل تثبيت',
          'متعدد → توجيه بالـ slug، لوحة super-admin، هوية وإضافات لكل مستأجر',
          'بدّل بين الوضعين متى شئت — بلا تعديل مخطط'
        ]
      },
      {
        id: 'backups', num: '06', title: 'النسخ الاحتياطي والتعافي',
        body: 'الاستضافة الذاتية تعني أن النسخ الاحتياطي مسؤوليتك. الكود يأتي بمهمة نسخ يومية لكنك تختار أين تذهب.',
        items: [
          'pg_dump يومي عبر مهمة مجدولة (مضمّن)',
          'الملفات المرفوعة على S3 → استخدم versioning أو lifecycle rules',
          'نوصي: نسخة خارج الموقع (S3 أو Backblaze أو NAS)',
          'اختبار الاستعادة موثّق في docs/restore.md'
        ]
      },
      {
        id: 'environment', num: '07', title: 'أهم متغيرات البيئة',
        body: 'كل شيء في .env. حفنة منها مطلوبة فقط، والباقي مفاتيح مميزات اختيارية.',
        kv: [
          { k: 'DATABASE_URL',      v: 'اتصال Postgres (مطلوب)' },
          { k: 'NUXT_SESSION_PASSWORD', v: 'سر عشوائي 32+ حرف (مطلوب)' },
          { k: 'APP_MODE',          v: 'single-tenant | multi-tenant' },
          { k: 'S3_*',              v: 'دلو S3 للرفع (اختياري — قرص محلي كبديل)' },
          { k: 'SMTP_*',            v: 'بريد معاملات (إعادة تعيين، إيصالات)' },
          { k: 'ZATCA_*',           v: 'مفاتيح فوترة الزكاة السعودية (اختياري)' },
          { k: 'AI_PROVIDER_URL',   v: 'نقطة OpenAI-compatible (إضافة AI اختيارية)' }
        ]
      },
      {
        id: 'license-summary', num: '08', title: 'الترخيص باختصار',
        body: 'ملخص ببنود الترخيص. راجع /portal/legal للنص الرسمي الكامل.',
        items: [
          'يمكنك نشره لعملك الخاص أو لعملائك المباشرين',
          'يمكنك تعديل أي سطر وإبقاء التعديلات خاصة بك',
          'لا يمكنك إعادة بيع الكود المصدري لمطورين آخرين',
          'لا يمكنك إزالة أو إخفاء ترويسة الترخيص في المستودع',
          'الترخيص لكل كيان مشغّل — كل كيان قانوني يحتاج ترخيصه الخاص'
        ]
      }
    ]
  },

  legalPage: {
    eyebrow: 'قانوني',
    h1: 'الشروط، بلغة واضحة.',
    sub: 'الترخيص وشروط الخدمة والخصوصية — كلها في صفحة واحدة، يمكنك قراءتها في أقل من عشر دقائق.',
    lastUpdated: 'آخر تحديث 2026-04-18',
    sections: [
      {
        id: 'license', num: '01', title: 'الترخيص',
        body: 'Momentfy برنامج تجاري متاح المصدر. شراء الترخيص يمنحك حقاً غير حصري وغير قابل للنقل لنشر وتشغيل الكود وفق الشروط التالية.',
        can: [
          'نشره لعملك الخاص أو لكيانك القانوني',
          'نشره لعملائك المباشرين (إعادة البيع كـ SaaS مسموحة في الخطتَين)',
          'تعديل وتوسيع وتفرّع الكود لنشرك الخاص — تعديلاتك تبقى ملكك',
          'الاستضافة الذاتية على أي بنية تحتية في أي مكان',
          'الاستخدام في الإنتاج التجاري من اليوم الأول'
        ],
        cannot: [
          'إعادة بيع أو ترخيص الكود المصدري لمطورين آخرين',
          'نشر الكود للعموم أو إطلاقه مفتوح المصدر بترخيص مختلف',
          'إزالة أو إخفاء ترويسات الترخيص أو حقوق النشر أو ملفات الإسناد',
          'استخدام ترخيص واحد لكيانات قانونية غير مرتبطة — كل كيان يحتاج ترخيصه'
        ]
      },
      {
        id: 'terms', num: '02', title: 'شروط الخدمة',
        body: 'بالشراء أو التنزيل تقبل هذه الشروط. مكتوبة بأوضح ما أمكن.',
        items: [
          { k: 'القبول',     v: 'الشراء أو التنزيل يُعد قبولاً لهذا الترخيص ولهذه الشروط.' },
          { k: 'التحديثات',   v: 'الخطتان تشملان تحديثات مدى الحياة. كل إصدار مستقبلي يُسلَّم إلى رابط تنزيلك الخاص بدون تكلفة إضافية وبدون أي تجديد.' },
          { k: 'الدعم',       v: 'دعم البريد الإلكتروني مضمّن في الخطتَين. رد مميز (أقل من 24 ساعة في أيام العمل) في خطة "التنصيب الكامل"؛ رد قياسي (أقل من 48 ساعة) في خطة "التنصيب الذاتي".' },
          { k: 'الضمان',      v: 'البرنامج مُقدَّم "كما هو" بدون ضمان من أي نوع. لأنك تستضيفه، فأنت مسؤول عن النسخ الاحتياطي والتحديثات الأمنية ووقت التشغيل.' },
          { k: 'المسؤولية',   v: 'إجمالي مسؤوليتنا محدود بما دفعته لقاء الترخيص خلال الـ 12 شهراً السابقة.' },
          { k: 'الإنهاء',     v: 'ينتهي الترخيص تلقائياً عند الخرق الجوهري (مثل إعادة نشر الكود). عند الإنهاء يجب التوقف عن الاستخدام وإتلاف كل النسخ.' },
          { k: 'القانون الحاكم', v: 'قانون المملكة العربية السعودية إن لم يكن كيانك أوروبياً، وإلا فجمهورية أيرلندا — كلاهما تحت اتفاقية CISG.' }
        ]
      },
      {
        id: 'privacy', num: '03', title: 'الخصوصية',
        body: 'لأن Momentfy ذاتي الاستضافة، بيانات مستأجريك لا تمر بخوادمنا. المستخدمون والعملاء والمواعيد والفواتير تعيش على بنية تحتية تتحكم بها.',
        items: [
          { k: 'ما نجمعه',      v: 'بريدك عند الشراء، بيانات الفوترة (عبر Lemon Squeezy)، اسم GitHub (لوصول المستودع). لا بيانات مستأجرين.' },
          { k: 'ما نشاركه',     v: 'لا شيء. سجل شرائك يبقى بيننا وبين Lemon Squeezy (التاجر المسجل).' },
          { k: 'الكوكيز',        v: 'هذا الموقع التسويقي لا يستخدم كوكيز تتبع طرف ثالث. منتجك المنشور يضع كوكيز مصادقته على نطاقك.' },
          { k: 'حقوقك',          v: 'يمكنك طلب تصدير أو حذف سجل شرائك في أي وقت عبر hello@momentfy.io.' },
          { k: 'GDPR / PDPL',    v: 'لأن البيانات تبقى على بنيتك، أنت المتحكم. نحن لسنا معالجاً لبيانات مستأجريك.' }
        ]
      },
      {
        id: 'sales', num: '04', title: 'سياسة البيع',
        body: 'Momentfy يُسلّم ككود مصدري. بمجرد تنزيلك له فالمنتج بين يديك — لذا كل المبيعات نهائية بالسياسة.',
        items: [
          { k: 'التسليم',            v: 'مفتاح الترخيص ورابط التنزيل الخاص يصلانك فور قبول الدفع. تعليمات التنصيب مرفقة داخل الأرشيف.' },
          { k: 'لا استرداد',         v: 'لأن الكود المصدري لا يمكن إعادته بعد التنزيل، جميع المشتريات نهائية. بإتمامك الشراء تتنازل صراحة عن أي حق انسحاب قانوني على المنتجات الرقمية.' },
          { k: 'لم يُسلَّم أو معطوب',  v: 'إذا لم يعمل رابط التنزيل أو كان الأرشيف تالفاً جوهرياً ولم نستطع إصلاحه خلال 7 أيام من إبلاغك، سنردّ المبلغ كاملاً — راسلنا على hello@momentfy.io مع رقم الطلب.' },
          { k: 'ردّ الشحن (Chargeback)', v: 'يُرجى التواصل مع الدعم قبل رفع نزاع بطاقة. ردّ الشحن دون إخطار يُنهي ترخيصك ويلغي وصولك للتحديثات المستقبلية.' },
          { k: 'إنهاء الترخيص',      v: 'إذا تمّ الردّ لأي سبب، ينتهي ترخيصك. يجب حذف الكود والتوقف عن تشغيل البرنامج.' }
        ]
      },
      {
        id: 'company', num: '05', title: 'الشركة',
        body: 'Momentfy تطوّره ويصونه فريق مستقل. لا نأخذ تمويلاً خارجياً ونحن مسؤولون أمام المشغّلين لا المستثمرين.',
        items: [
          { k: 'الكيان',     v: 'Momentfy Software FZ-LLC (مؤقت — استبدل باسم كيانك القانوني الفعلي)' },
          { k: 'العنوان',    v: 'مؤقت — استبدل بعنوانك المسجل' },
          { k: 'الرقم الضريبي', v: 'مؤقت — استبدل بتسجيلك الضريبي' },
          { k: 'تواصل',      v: 'hello@momentfy.io' },
          { k: 'الدعم',      v: 'support@momentfy.io' },
          { k: 'الصحافة',     v: 'press@momentfy.io' }
        ]
      }
    ],
    companyLabel: 'تواصل',
    companyLines: ['hello@momentfy.io', 'support@momentfy.io']
  }
}

// Shared feature items (heavy content) — kept in English with Arabic titles where applicable.
// This keeps the composable tractable while the features page sub-content renders in either locale.
const featureItemsEn = [
  { id: 'calendar', group: 'Front of house', title: 'Calendar & Scheduling',
    summary: 'The heart of every service business. Drag, drop, resize, move — and everything stays in sync.',
    bullets: ['Day, week and staff-lane views with timezone awareness', 'Drag-to-resize, drag-to-move, multi-resource bookings',
      'Multi-location with per-location availability', 'Blocked time, staff leave, breaks and buffers',
      'Recurring appointments and waitlists', 'Color-coded statuses (confirmed, no-show, checked-in, completed)',
      'Realtime updates across devices'] },
  { id: 'sales', group: 'Money', title: 'Sales, POS & Invoicing',
    summary: 'A cash register, a POS, and a full invoicing suite rolled into one.',
    bullets: ['Sell services, products, memberships, gift cards', 'Invoices, estimates, recurring invoices, credit notes',
      'Expense tracking and category rules', 'Cash register open/close with variance',
      'Payments: cash, card, Tabby, Tamara, bank, custom methods', 'Tax rates, discounts, tips, service charges',
      'Print-ready receipts and public invoice links'] },
  { id: 'clients', group: 'Relationships', title: 'Clients & CRM',
    summary: 'Know every client. Nudge the right ones at the right time.',
    bullets: ['Client profiles with visit history, spend, allergies and files', 'Dynamic segments (by spend, recency, tags, age, etc.)',
      'Campaigns: SMS, email or WhatsApp to a segment', 'Reviews captured automatically after appointments',
      'Client tickets for support and complaints', 'Follow-up task engine with assignees and SLAs',
      'Birthday greetings and re-engagement nudges'] },
  { id: 'catalogue', group: 'Offering', title: 'Catalogue',
    summary: 'Your entire offering, structured once, priced precisely.',
    bullets: ['Services with duration, buffer, required staff or resources', 'Bundles and packages with discounted pricing',
      'Memberships: prepaid, unlimited, session-based', 'Retail products with SKU, barcode, units, expiry',
      'Discounts with stacking and eligibility rules', 'Smart pricing: peak, off-peak, member pricing',
      'Categories, menus and tenant-specific branding'] },
  { id: 'inventory', group: 'Operations', title: 'Inventory & Supply',
    summary: 'Stock you can trust — across every location.',
    bullets: ['Stock levels per location with low-stock alerts', 'Stock transfers with in-transit tracking',
      'Stocktakes with variance reporting', 'Supplier management and stock orders',
      'Supplier payments tied to accounting', 'Stock comparison across periods',
      'Cost of goods automatically journaled on sale'] },
  { id: 'team', group: 'People', title: 'Team & HR',
    summary: 'From schedule to payroll — one tab per member.',
    bullets: ['Roles and granular permissions (Owner / Admin / Staff / custom)', 'Weekly schedules with per-location shifts',
      'Attendance with clock in/out + QR', 'Leave requests and approvals', 'Timesheets rolled into pay runs',
      'Commission engine per service / staff', 'Pay runs with payslips and exports'] },
  { id: 'accounting', group: 'Money', title: 'Accounting',
    summary: 'Double-entry bookkeeping — no external software required.',
    bullets: ['Chart of accounts with opening balances', 'Auto-posted journal entries from sales, refunds, payroll',
      'Manual journal entries with audit trail', 'Bills & supplier payments', 'Bank reconciliation with import',
      'Fixed assets with automatic depreciation', 'Month-end checks and close'] },
  { id: 'reports', group: 'Insights', title: 'Reports',
    summary: 'Answer every "how are we doing?" in two clicks.',
    bullets: ['Finance overview, P&L, balance sheet, cash flow', 'VAT return, AR/AP aging, trial balance',
      'Commissions, discounts, performance, staff KPIs', 'Client cohort retention & lifetime value',
      'Inventory valuation and movement', 'Operational reports per add-on (Rx, lab, resources)',
      'Export every report to Excel or PDF'] },
  { id: 'portal', group: 'Clients', title: 'Client Portal (PWA)',
    summary: 'A branded app for every tenant, installable on iOS and Android.',
    bullets: ['Online booking with service + staff selection', 'Pay invoices and see receipts',
      'Loyalty wallet with transactions', 'Memberships, packages and gift cards',
      'Lab results, prescriptions, medical records', 'Reviews and support tickets', 'AI chat assistant (optional add-on)'] },
  { id: 'multi-tenant', group: 'Platform', title: 'Multi-Tenant Architecture',
    summary: 'Run one copy. Serve thousands of businesses.',
    bullets: ['Isolated data per tenant with row-level safety', 'Per-tenant branding, logo, menu config',
      'Super-admin panel to manage subscriptions', 'Impersonation with audit banner',
      'Plans, subscriptions, usage limits', 'Per-tenant add-on activation', 'Slug-based routing for portal and booking'] },
  { id: 'i18n', group: 'Platform', title: 'Bilingual & RTL',
    summary: 'Arabic and English, not just translated — truly localized.',
    bullets: ['Full RTL rendering for Arabic', 'Locale-aware numbers, currency, dates', 'Hijri calendar support',
      'IBM Plex Arabic + Latin fonts', 'Language toggle per user', 'Per-tenant default language',
      'Saudi Riyal custom symbol font built in'] },
  { id: 'self-hosted', group: 'Platform', title: 'Self-Hosted',
    summary: 'Your server, your rules. No phone home. No SaaS bill.',
    bullets: ['Docker Compose ready', 'PostgreSQL + Prisma', 'Works on any VPS from $5/mo',
      'Environment flags for single- or multi-tenant mode', 'S3-compatible storage or local disk',
      'SMTP, Twilio, custom providers', 'GDPR & data-residency friendly'] },
  { id: 'zatca', group: 'Compliance', title: 'ZATCA Phase 2 (Saudi)',
    summary: 'Sign, stamp and report e-invoices to the Saudi tax authority.',
    bullets: ['Compliance CSR + CSID issuance', 'XML generation + UBL signing', 'QR code on every invoice',
      'Clearance + reporting flow', 'Retry and error surfacing', 'Archival of cleared invoices', 'Full audit trail'] },
  { id: 'eta', group: 'Compliance', title: 'ETA E-Invoicing (Egypt)',
    summary: 'Submit invoices to the Egyptian Tax Authority without leaving the app.',
    bullets: ['Item, customer & tax code mapping', 'Pre-submission validation',
      'Signed submission and status tracking', 'Credit notes and corrections', 'Reconciliation reports'] },
  { id: 'ai', group: 'Intelligence', title: 'AI Assistant',
    summary: 'Vercel AI SDK, any OpenAI-compatible model — always on.',
    bullets: ['In-app chat on booking and client portal', 'Answers from your own data (services, hours, policies)',
      'Can assist booking and rebooking', 'Configurable provider and model',
      'Per-tenant system prompt and brand voice', 'Cost controls and usage tracking'] },
  { id: 'reviews-loyalty', group: 'Growth', title: 'Reviews & Loyalty',
    summary: 'Turn every happy visit into repeat revenue.',
    bullets: ['Auto-request reviews after completed visits', 'Public review pages per tenant',
      'Loyalty points earning & redemption rules', 'Expiring points with portal visibility',
      'Campaigns targeting top referrers and dormant clients'] }
]

const featureItemsAr = [
  { id: 'calendar', group: 'Front of house', title: 'التقويم والجدولة',
    summary: 'قلب كل عمل خدمي. اسحب، أفلت، غيّر الحجم، حرك — وكل شيء يبقى متزامناً.',
    bullets: ['عرض يومي وأسبوعي ومسارات الموظفين مع دعم المناطق الزمنية', 'تغيير الحجم بالسحب، التحريك بالسحب، حجوزات متعددة الموارد',
      'تعدد الفروع مع توفر لكل فرع', 'وقت محجوب، إجازات الموظفين، استراحات وفواصل',
      'مواعيد متكررة وقوائم انتظار', 'حالات ملونة (مؤكد، لم يحضر، مسجل، مكتمل)', 'تحديثات فورية عبر الأجهزة'] },
  { id: 'sales', group: 'Money', title: 'المبيعات ونقاط البيع والفوترة',
    summary: 'صندوق نقد ونقطة بيع ومجموعة فوترة كاملة في مكان واحد.',
    bullets: ['بيع خدمات، منتجات، اشتراكات، بطاقات هدايا', 'فواتير، عروض، فواتير متكررة، إشعارات دائنة',
      'تتبع المصاريف وقواعد الفئات', 'فتح/إغلاق الصندوق مع تباين',
      'مدفوعات: نقد، بطاقة، Tabby، Tamara، بنك، طرق مخصصة', 'معدلات ضريبة، خصومات، بقشيش، رسوم خدمة',
      'إيصالات جاهزة للطباعة وروابط فواتير عامة'] },
  { id: 'clients', group: 'Relationships', title: 'العملاء و CRM',
    summary: 'اعرف كل عميل. ذكّر الصحيح في الوقت الصحيح.',
    bullets: ['ملفات عملاء مع سجل زيارات، إنفاق، حساسيات وملفات', 'شرائح ديناميكية (حسب الإنفاق، الحداثة، العلامات، العمر)',
      'حملات: SMS أو بريد أو واتساب لشريحة', 'تقييمات تلتقط تلقائياً بعد المواعيد',
      'تذاكر عملاء للدعم والشكاوى', 'محرك مهام متابعة مع مسؤولين واتفاقيات', 'تهاني أعياد ميلاد وتذكيرات إعادة الارتباط'] },
  { id: 'catalogue', group: 'Offering', title: 'الكتالوج',
    summary: 'كل ما تقدمه، منظم مرة واحدة، بسعر محدد بدقة.',
    bullets: ['خدمات مع مدة، فاصل، موظفون أو موارد مطلوبة', 'باقات وحزم بأسعار مخفضة',
      'اشتراكات: مدفوعة مسبقاً، غير محدودة، حسب الجلسات', 'منتجات تجزئة مع SKU، باركود، وحدات، انتهاء',
      'خصومات مع قواعد تكديس وأهلية', 'تسعير ذكي: ذروة، خارج الذروة، أعضاء',
      'فئات، قوائم وعلامة تجارية خاصة بالمستأجر'] },
  { id: 'inventory', group: 'Operations', title: 'المخزون والإمداد',
    summary: 'مخزون يمكنك الوثوق به — عبر كل الفروع.',
    bullets: ['مستويات المخزون لكل فرع مع تنبيهات انخفاض', 'تحويلات المخزون مع تتبع أثناء النقل',
      'جرد مع تقارير تباين', 'إدارة موردين وأوامر شراء',
      'مدفوعات موردين مرتبطة بالمحاسبة', 'مقارنة المخزون عبر الفترات',
      'تكلفة البضاعة المباعة تُقيد تلقائياً عند البيع'] },
  { id: 'team', group: 'People', title: 'الفريق والموارد البشرية',
    summary: 'من الجدول للراتب — تبويب واحد لكل عضو.',
    bullets: ['أدوار وصلاحيات دقيقة (مالك / مدير / موظف / مخصص)', 'جداول أسبوعية مع ورديات لكل فرع',
      'حضور مع تسجيل دخول/خروج + QR', 'طلبات إجازة وموافقات', 'ورقات دوام تُدرج في كشوف الرواتب',
      'محرك عمولات لكل خدمة / موظف', 'كشوف رواتب مع قسائم وتصدير'] },
  { id: 'accounting', group: 'Money', title: 'المحاسبة',
    summary: 'قيد مزدوج — بدون برنامج خارجي.',
    bullets: ['دليل حسابات مع أرصدة افتتاحية', 'قيود يومية تلقائية من المبيعات، الاستردادات، الرواتب',
      'قيود يدوية مع سجل مراجعة', 'فواتير موردين ومدفوعات', 'تسوية بنكية مع استيراد',
      'أصول ثابتة مع إهلاك تلقائي', 'فحوصات وإغلاق نهاية الشهر'] },
  { id: 'reports', group: 'Insights', title: 'التقارير',
    summary: 'أجب على "كيف حالنا؟" بنقرتين.',
    bullets: ['نظرة مالية، أرباح وخسائر، ميزانية عمومية، تدفق نقدي', 'إقرار ضريبة، أعمار ذمم، ميزان مراجعة',
      'عمولات، خصومات، أداء، مؤشرات الموظفين', 'احتفاظ وقيمة عمر العملاء',
      'تقييم وحركة المخزون', 'تقارير تشغيلية لكل إضافة (وصفات، مختبر، موارد)', 'صدّر كل تقرير إلى Excel أو PDF'] },
  { id: 'portal', group: 'Clients', title: 'بوابة العميل (PWA)',
    summary: 'تطبيق باسم كل مستأجر، قابل للتثبيت على iOS و Android.',
    bullets: ['حجز إلكتروني مع اختيار الخدمة والموظف', 'دفع الفواتير ورؤية الإيصالات',
      'محفظة ولاء مع المعاملات', 'اشتراكات، باقات وبطاقات هدايا',
      'نتائج المختبر، الوصفات، السجلات الطبية', 'تقييمات وتذاكر دعم', 'مساعد ذكي (إضافة اختيارية)'] },
  { id: 'multi-tenant', group: 'Platform', title: 'بنية المستأجرين المتعددين',
    summary: 'شغّل نسخة واحدة. اخدم آلاف الأعمال.',
    bullets: ['بيانات معزولة لكل مستأجر بأمان على مستوى الصف', 'هوية، شعار، إعدادات قائمة لكل مستأجر',
      'لوحة super-admin لإدارة الاشتراكات', 'انتحال شخصية مع شريط مراجعة',
      'خطط، اشتراكات، حدود استخدام', 'تفعيل إضافات لكل مستأجر', 'توجيه بـ slug للبوابة والحجز'] },
  { id: 'i18n', group: 'Platform', title: 'ثنائي اللغة و RTL',
    summary: 'عربي وإنجليزي، ليس مجرد ترجمة — محلي حقيقي.',
    bullets: ['عرض RTL كامل للعربية', 'أرقام وعملة وتواريخ محلية', 'دعم التقويم الهجري',
      'خطوط IBM Plex عربي + لاتيني', 'تبديل اللغة لكل مستخدم', 'لغة افتراضية لكل مستأجر', 'خط رمز الريال السعودي مدمج'] },
  { id: 'self-hosted', group: 'Platform', title: 'استضافة ذاتية',
    summary: 'خادمك، قواعدك. بلا اتصال خارجي. بلا فاتورة SaaS.',
    bullets: ['Docker Compose جاهز', 'PostgreSQL + Prisma', 'يعمل على أي VPS من $5/شهر',
      'أعلام بيئة للوضع المفرد أو المتعدد', 'تخزين متوافق مع S3 أو قرص محلي',
      'SMTP، Twilio، مزودون مخصصون', 'متوافق مع GDPR وإقامة البيانات'] },
  { id: 'zatca', group: 'Compliance', title: 'ZATCA المرحلة 2 (السعودية)',
    summary: 'وقّع، اختم وقدّم الفواتير الإلكترونية لهيئة الزكاة السعودية.',
    bullets: ['إصدار CSR و CSID امتثال', 'إنشاء XML + توقيع UBL', 'رمز QR على كل فاتورة',
      'تدفق إجازة + تقرير', 'إعادة محاولة وعرض الأخطاء', 'أرشفة الفواتير المُجازة', 'سجل مراجعة كامل'] },
  { id: 'eta', group: 'Compliance', title: 'فوترة ETA (مصر)',
    summary: 'قدّم الفواتير لمصلحة الضرائب المصرية بدون مغادرة التطبيق.',
    bullets: ['ربط أكواد العناصر، العملاء والضرائب', 'تحقق قبل التقديم',
      'تقديم موقّع وتتبع حالة', 'إشعارات دائنة وتصحيحات', 'تقارير تسوية'] },
  { id: 'ai', group: 'Intelligence', title: 'المساعد الذكي',
    summary: 'Vercel AI SDK، أي نموذج متوافق مع OpenAI — دائماً في الخدمة.',
    bullets: ['دردشة داخل الحجز وبوابة العميل', 'إجابات من بياناتك (خدمات، ساعات، سياسات)',
      'يمكنه المساعدة في الحجز وإعادة الحجز', 'مزود ونموذج قابل للضبط',
      'سياسة نظام وهوية صوتية لكل مستأجر', 'ضوابط تكلفة وتتبع استخدام'] },
  { id: 'reviews-loyalty', group: 'Growth', title: 'التقييمات والولاء',
    summary: 'حوّل كل زيارة سعيدة إلى إيراد متكرر.',
    bullets: ['طلب تقييم تلقائي بعد الزيارات المكتملة', 'صفحات تقييم عامة لكل مستأجر',
      'قواعد كسب واستبدال نقاط ولاء', 'انتهاء النقاط مع عرض في البوابة', 'حملات للمُحيلين والعملاء النائمين'] }
]

en.featuresPage.items = featureItemsEn
ar.featuresPage.items = featureItemsAr

export function useLandingCopy() {
  const { locale } = useI18n()
  return computed(() => (locale.value === 'ar' ? ar : en))
}

export function useLandingLocale() {
  const { locale, locales, setLocale } = useI18n()
  const localeItems = computed(() => [
    (locales.value as Array<{ code: string; name: string }>).map((l) => ({
      label: l.name,
      icon: locale.value === l.code ? 'i-lucide-check' : undefined,
      onSelect: () => setLocale(l.code as any)
    }))
  ])
  const currentLocale = computed(() => (locales.value as Array<{ code: string; name: string }>).find(l => l.code === locale.value))
  return { locale, currentLocale, localeItems, setLocale }
}
