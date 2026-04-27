# Auckland Security Systems

AucklandSecuritySystems.co.nz is a Get Secure funnel asset: an Auckland-focused security buyer guide, decision-tool hub, and qualified lead-capture engine.

It is **not** an AI-agent site, a generic blog, or a duplicate of getsecure.co.nz. Its job is to meet Auckland buyers earlier in the research journey, help them make a sensible security decision, and route good-fit installation/service leads to Get Secure.

## Strategic role

The site should own this position:

> Practical Auckland security advice first; professional Get Secure installation when the job needs it.

It should help visitors who are:

- confused about DIY vs professional installation
- comparing cameras, alarms, intercoms, storage, subscriptions, and reliability
- searching for Auckland CCTV/security installers
- serious enough to value a reliable local installer, not just the cheapest camera
- looking for CCTV, alarms, intercoms, networking, repairs, upgrades, or broader security planning

## Grand plan

### Phase 1 — Foundation: trust, tracking, and reliability

Goal: make the funnel measurable and dependable before scaling traffic.

Current/required foundations:

- Live Vercel deployment on `aucklandsecuritysystems.co.nz`
- Site-health monitoring for homepage, key service page, sitemap, robots, phone and CTA visibility
- Strong quote form that captures lead-quality data
- Visible Get Secure proof near CTAs
- Phone/call path for urgent or high-intent leads
- GA events for quote starts, quote submits, phone clicks, outbound clicks, quiz and calculator behaviour
- Sitemap, robots, canonical URLs and structured data kept clean
- Formspree/lead data and lead outcomes connected into a weekly scorecard where possible

Success metric: we know which pages and actions produce quote starts, submissions, calls, and eventually booked jobs.

### Phase 2 — Core money pages

Goal: build a small set of high-intent, genuinely useful Auckland service pages.

Build one strong page at a time. Do **not** create thin suburb-page spam.

Priority pages:

1. `/security-camera-installation-auckland` — live
2. `/cctv-installer-auckland`
3. `/cctv-installation-cost-auckland`
4. `/home-cctv-installation-auckland`
5. `/business-cctv-auckland`
6. `/alarm-systems-auckland`
7. `/intercom-installation-auckland`
8. `/wired-cctv-systems-auckland`
9. `/no-monthly-fee-cctv-auckland`
10. `/security-system-installer-auckland`

Each page must:

- answer real buyer questions
- explain when DIY is enough and when professional install is smarter
- include a clear quote/call CTA
- include Get Secure trust proof where relevant
- include useful FAQs and appropriate schema
- avoid fake urgency, fake proof, copied suburb text, or overclaiming

Success metric: impressions, clicks, quote starts, form submissions, phone clicks, and qualified leads by page.

### Phase 3 — Buyer tools and decision assets

Goal: make the site more useful than normal installer websites.

Useful assets/tools:

- Camera chooser quiz
- Total cost calculator
- Camera count estimator
- Storage-days calculator
- Driveway camera placement guide
- DIY vs professional install decision tool
- Business CCTV checklist
- “Send photos for layout advice” quote path, if operationally manageable

Success metric: tool usage that leads to quote starts, submissions, calls, or high-intent Get Secure enquiries.

### Phase 4 — Lead scoring and follow-up integration

Goal: make sure good leads are not wasted.

Lead routing should classify:

- hot / urgent security concern
- quote-ready residential
- commercial/business
- repair/service callout
- DIY researcher
- low-fit price shopper
- needs site visit
- partner/referral lead

Follow-up rules:

- urgent/high-intent leads should alert Chris quickly
- normal leads should produce a clear draft/next action
- customer-facing emails/messages remain draft-only unless Chris explicitly approves sending
- dates and availability require calendar context

Success metric: response speed, site visits booked, quotes issued, quote follow-ups completed, jobs won, and lost reasons captured.

### Phase 5 — Partner/referral growth system

Goal: build a repeatable warm-lead channel, not only SEO traffic.

Partner targets:

- electricians
- builders
- locksmiths
- gate installers
- IT/network installers
- property managers
- commercial maintenance providers

Known operating rules:

- Referral fees are acceptable
- No existing partner list yet
- Desired services: CCTV, alarms, intercoms, networking and related security work
- Partner leads may call directly or use a form/page
- Outreach assets may be drafted, but outreach must never be sent autonomously

Future assets:

- partner/referral landing page
- simple partner pitch
- one-page PDF
- first partner target list
- draft-only outreach messages
- follow-up tracker
- monthly partner loop

Success metric: partner conversations, referrals, partner-sourced quotes, partner-sourced jobs won.

### Phase 6 — Authority, news, competitor and opportunity radar

Goal: spot useful opportunities without creating noise.

Radar sources may include:

- Auckland security/crime news
- local business and property trends
- construction/new subdivision activity
- competitor SEO and ad gaps
- new camera/alarm/intercom/networking products
- supplier/product changes
- recurring revenue opportunities such as CCTV health checks

Every opportunity must pass a CEO filter before implementation:

- Can Get Secure deliver it?
- Can it make money or improve lead quality?
- Can it be tested in 7–21 days?
- Does it protect trust and avoid fear/scam marketing?
- Does it fit current operational capacity?
- Is the risk/complexity worth it?

Success metric: one or two high-quality actions, not a pile of interesting but distracting ideas.

## Guardrails

### Do

- Preserve the helpful buyer-guide positioning
- Improve trust, clarity, conversion and qualified lead volume
- Use real Get Secure proof only
- Explain tradeoffs honestly
- Build service-intent pages before location-spam pages
- Add schema, internal links and CTAs carefully
- Verify build, lint, deployment and live URLs after changes
- Use branch/PR/deploy checks for meaningful changes
- Track changes against business outcomes where possible

### Do not

- Turn this into an AI/R&D branded site
- Make it a duplicate of getsecure.co.nz
- Publish fake reviews, fake proof, fake guarantees or fake urgency
- Use fear-based crime marketing
- Create thin copied suburb pages
- Chase cheap DIY traffic at the expense of qualified leads
- Promise install dates, discounts or outcomes without Chris/calendar context
- Send customer or outreach messages autonomously
- Let marketing outrun Get Secure’s ability to respond and deliver

## Operating loops

### Daily

- Site health monitor: homepage, key landing pages, sitemap, robots, CTAs and obvious error pages
- Sales/revenue protection: leads, urgent inquiries, quotes, follow-ups and stale opportunities when data is available

### Weekly

- Funnel review: traffic, CTA clicks, form starts, submissions, phone clicks, weak pages and next conversion improvement
- Marketing/SEO review: useful page opportunities, trust gaps, schema/internal-link improvements, competitor gaps

### Monthly

- Profit review: job type quality, average value, bad-lead patterns, service focus, pricing/offer issues
- Partner/referral review once the partner system exists
- Opportunity radar synthesis through CEO filter

## Measurement philosophy

Technical success is not enough. A page is not “better” only because it exists or looks good.

Measure:

- visitors by page
- quote CTA clicks
- quote form starts
- quote form submissions
- phone clicks
- quiz completions
- calculator completions
- lead quality
- site visits booked
- quotes issued
- jobs won
- revenue and margin where available
- lost/no-response reasons

If a change cannot plausibly improve trust, qualified leads, speed-to-lead, close rate, average job value, repeat/referral work or profitability, it should not be built.

## Development

Install dependencies and run locally:

```bash
npm ci
npm run dev
```

Verify before merging:

```bash
npm run build
npm run lint
```

Deployment is handled by Vercel from GitHub. Meaningful changes should be verified with build/lint, Vercel status checks and live URL checks after merge.
