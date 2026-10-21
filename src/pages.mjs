import { SITE, NAV, SERVICES, PROJECT_STUDIES } from './data/site.mjs';

const esc = (s = '') => String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;').replaceAll("'", '&#39;');
const mark = `<svg class="brand-mark" viewBox="0 0 40 40" aria-hidden="true"><path d="M5 5h8v8H5zM16 5h8v8h-8zM27 5h8v8h-8zM5 16h8v8H5zM16 16h8v8h-8zM27 16h8v8h-8zM5 27h8v8H5zM16 27h8v8h-8zM27 27h8v8h-8z" fill="currentColor"/><circle cx="20" cy="20" r="3.2" fill="#ff4a2e"/></svg>`;
const arrow = `<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3.5 10h12M10 4.5 15.5 10 10 15.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/></svg>`;
const extArrow = `<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M5 15 15 5M6 5h9v9" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="square"/></svg>`;

function header(active = '') {
  const links = NAV.map(item => `<a class="nav-link ${active === item.href ? 'is-active' : ''}" href="${item.href}">${item.label}</a>`).join('');
  return `<a class="skip-link" href="#main">Skip to content</a>
  <div class="site-topline" aria-hidden="true"><span>LATENT LABS / FIELD OFFICE 01</span><span>CREATIVE × SYSTEMS × SOFTWARE</span><span>EST. IN INTENT / 2026</span></div>
  <header class="site-header" data-header>
    <a class="brand" href="/" aria-label="Latent Labs home">${mark}<span class="brand-word">LATENT<span class="brand-word__light">LABS</span></span></a>
    <nav class="desktop-nav" aria-label="Main navigation">${links}</nav>
    <a class="header-cta" href="/#project"><span>Start a project</span>${extArrow}</a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav" data-menu-toggle><span class="menu-toggle__label">Menu</span><span class="menu-toggle__lines" aria-hidden="true"><i></i><i></i></span></button>
    <nav class="mobile-nav" id="mobile-nav" aria-label="Mobile navigation" hidden data-mobile-nav>
      <div class="mobile-nav__top"><span class="eyebrow">THE FIELD / INDEX</span><button type="button" class="mobile-nav__close" data-menu-close aria-label="Close navigation">Close ×</button></div>
      <a href="/work"><small>01</small> Field notes <span>↗</span></a>
      <a href="/#capabilities"><small>02</small> Capabilities <span>↗</span></a>
      <a href="/about"><small>03</small> Approach <span>↗</span></a>
      <a class="mobile-nav__project" href="/#project"><small>04</small> Start a project <span>↗</span></a>
      <p>Independent by design.<br>Precise by default.</p>
    </nav>
  </header>`;
}

function footer() {
  return `<footer class="site-footer" id="footer">
    <div class="footer-top"><span class="eyebrow">A SMALL STUDIO FOR AMBITIOUS WORK</span><a class="back-top" href="#top" data-back-top>Back to the beginning <span>↑</span></a></div>
    <a class="footer-wordmark" href="/" aria-label="Latent Labs home">LATENT<span>LABS</span><b>®</b></a>
    <div class="footer-bottom">
      <p class="footer-note">${esc(SITE.line)}<br><span>Independent by design. Precise by default.</span></p>
      <div class="footer-links"><div><span class="eyebrow">EXPLORE</span><a href="/work">Field notes</a><a href="/#capabilities">Capabilities</a><a href="/about">Approach</a></div><div><span class="eyebrow">SERVICES</span><a href="/services/creative">Latent Creative</a><a href="/services/convert">Latent Convert</a><a href="/services/flow">Latent Flow</a></div><div><span class="eyebrow">SMALL PRINT</span><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="/#project">Start a project ↗</a></div></div>
      <div class="footer-colophon"><span>© <span data-year></span> LATENT LABS</span><span>MADE WITH INTENT, NOT TEMPLATES.</span><span>HYD / EVERYWHERE</span></div>
    </div>
  </footer>
  <div class="cursor-echo" aria-hidden="true" data-cursor><span>EXPLORE</span></div>
  <script>window.LATENT_SITE_CONFIG = ${JSON.stringify({ contactEmail: SITE.contactEmail })};</script>
  <script type="module" src="/src/app.js"></script>`;
}

function sectionLabel(number, label, side = '') {
  return `<div class="section-label ${side ? `section-label--${side}` : ''}"><span>${number}</span><span>${label}</span><span class="section-label__rule"></span></div>`;
}

function studyCard(study, index) {
  return `<article class="study ${study.className}" data-reveal data-study="${study.id}">
    <a class="study__link" href="/work#${study.id}" aria-label="Read about ${esc(study.title)} concept study">
      <div class="study__media"><img src="${study.image}" alt="${esc(study.alt)}" loading="lazy" width="${index === 1 ? '1800' : '1600'}" height="${index === 1 ? '1440' : '2000'}"><span class="study__index">${study.number}</span><span class="study__open" aria-hidden="true">${extArrow}</span><span class="study__view">VIEW STUDY</span></div>
      <div class="study__caption"><div><span class="eyebrow">${esc(study.type)}</span><h3>${esc(study.title)}</h3></div><span class="study__status">${esc(study.status)}</span></div>
    </a>
  </article>`;
}

function projectForm() {
  return `<form class="brief-form" data-brief-form novalidate>
    <div class="brief-form__grid">
      <label class="form-field"><span>01 / YOUR NAME <b>*</b></span><input name="name" autocomplete="name" required placeholder="Name" minlength="2"><small class="field-error" data-error="name"></small></label>
      <label class="form-field"><span>02 / WORK EMAIL <b>*</b></span><input name="email" type="email" autocomplete="email" required placeholder="you@company.com"><small class="field-error" data-error="email"></small></label>
      <label class="form-field"><span>03 / COMPANY OR BRAND</span><input name="company" autocomplete="organization" placeholder="The name on the door"></label>
      <label class="form-field"><span>04 / WHAT ARE WE MAKING?</span><select name="service"><option value="Not sure yet">Not sure yet</option><option value="Latent Creative">Latent Creative / campaign and film</option><option value="Latent Convert">Latent Convert / lead system</option><option value="Latent Flow">Latent Flow / operations automation</option><option value="A wider engagement">A wider engagement</option></select></label>
      <label class="form-field"><span>05 / WORKING BUDGET</span><select name="budget"><option value="Not decided">Not decided</option><option value="₹15k–₹30k">₹15k–₹30k</option><option value="₹30k–₹60k">₹30k–₹60k</option><option value="₹60k–₹1.5L">₹60k–₹1.5L</option><option value="₹1.5L+">₹1.5L+</option></select></label>
      <label class="form-field form-field--wide"><span>06 / WHAT ARE YOU TRYING TO CHANGE? <b>*</b></span><textarea name="brief" rows="4" required minlength="12" placeholder="The opportunity, the obstacle, the ambition. Start anywhere."></textarea><small class="field-error" data-error="brief"></small></label>
    </div>
    <div class="brief-form__bottom"><p>Your brief stays in this browser until you choose to prepare it. No lead gets silently sent to a service.</p><button class="button button--ink" type="submit"><span>Prepare the brief</span>${arrow}</button></div>
    <p class="form-feedback" role="status" aria-live="polite" data-form-feedback></p>
  </form>`;
}

function homePage() {
  return `<main id="main">
    <section class="hero" id="top" aria-labelledby="hero-title">
      <div class="hero__topline"><span>INDEPENDENT CREATIVE + SYSTEMS STUDIO</span><span class="hero__index">FIELD / 001 <i aria-hidden="true"></i> OPEN TO THE UNUSUAL</span></div>
      <div class="hero__grid">
        <div class="hero__copy">
          <p class="hero__overline" data-reveal><span class="signal-dot"></span> WE BUILD INEVITABLES.</p>
          <h1 id="hero-title" class="hero-title"><span class="hero-title__line" data-title-line>Make the</span><span class="hero-title__line" data-title-line>next move</span><span class="hero-title__line hero-title__last" data-title-line><em>inevitable.</em><span class="title-asterisk" aria-hidden="true">✳</span></span></h1>
          <div class="hero__foot"><p class="hero__description">Latent Labs builds distinctive campaigns and intelligent digital systems for brands ready to move beyond the expected.</p><div class="hero__actions"><a class="text-link text-link--strong" href="#project"><span>Start a project</span>${arrow}</a><a class="text-link" href="#field-notes"><span>Explore the work</span><span class="text-link__down">↓</span></a></div></div>
        </div>
        <div class="hero-visual" data-hero-visual>
          <div class="hero-visual__frame"><canvas id="latent-field" aria-label="Abstract animated contour field representing Latent Labs' blend of creative direction and engineered systems"></canvas><div class="hero-visual__fallback" aria-hidden="true"><div class="fallback-orbit fallback-orbit--one"></div><div class="fallback-orbit fallback-orbit--two"></div><div class="fallback-knot">L<span>·</span></div><div class="fallback-grid"></div></div>
            <div class="hero-visual__axis hero-visual__axis--top"><span>FIELD STUDY / 0001</span><span>FIG. A</span></div><div class="hero-visual__axis hero-visual__axis--bottom"><span>FORM × INTENT</span><span class="hero-visual__coordinates">00° 00′ / OPEN FORM</span></div><div class="hero-visual__reticle" aria-hidden="true">+</div>
          </div>
          <div class="hero-visual__note"><span>AN INSTRUMENT FOR<br>THE NOT-YET.</span><span class="note-glyph">↘</span></div>
          <div class="hero-vertical">CREATIVE / SYSTEMS / SOFTWARE</div>
        </div>
      </div>
      <div class="hero__bottom"><span>HYDERABAD ↔ EVERYWHERE</span><a href="#signal" class="scroll-cue"><span>SCROLL TO OBSERVE</span><i aria-hidden="true"></i></a><span>EST. IN INTENT / 2026</span></div>
    </section>

    <section class="signal-strip" id="signal" aria-label="Studio principles"><div class="signal-strip__track" data-marquee><span>IMAGINATION</span><i>✳</i><span>ENGINEERING</span><i>✳</i><span>INTENT</span><i>✳</i><span>REPEAT</span><i>✳</i><span>IMAGINATION</span><i>✳</i><span>ENGINEERING</span><i>✳</i><span>INTENT</span><i>✳</i><span>REPEAT</span><i>✳</i></div></section>

    <section class="manifest section-pad" id="point-of-view">
      ${sectionLabel('01', 'A POINT OF VIEW')}
      <div class="manifest__grid"><p class="manifest__index" data-reveal>NO. 001<br>WHY WE EXIST</p><div class="manifest__body"><h2 data-reveal>We don't make<br>more <span>noise.</span><br>We make <em>meaning</em><br>move.</h2><div class="manifest__sub" data-reveal><p>Some problems need a new image. Some need a better system. The interesting work often lives in the space between the two.</p><p>Latent Labs brings creative direction, working software and intelligent automation into one considered practice. No AI theatre. No decorative complexity. Just work with a reason to exist.</p><a class="text-link" href="/about"><span>Our point of view</span>${arrow}</a></div></div></div>
      <div class="manifest__seal" aria-hidden="true"><span>THOUGHT<br>MADE<br>TANGIBLE</span><svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="48"/><circle cx="60" cy="60" r="34"/><path d="M60 6v108M6 60h108M22 22l76 76M98 22 22 98"/></svg></div>
    </section>

    <section class="field-notes section-pad" id="field-notes">
      ${sectionLabel('02', 'SELECTED FIELD NOTES')}
      <div class="field-notes__heading"><h2 data-reveal>Things taking<br><em>another shape.</em></h2><div class="field-notes__intro" data-reveal><p>A working archive of visual experiments and system studies. The work here is self-initiated concept work, not a claim of commissioned client results.</p><a class="text-link" href="/work"><span>Enter the index</span>${arrow}</a></div></div>
      <div class="study-grid">${studyCard(PROJECT_STUDIES[0], 0)}${studyCard(PROJECT_STUDIES[1], 1)}${studyCard(PROJECT_STUDIES[2], 2)}</div>
      <div class="field-notes__tail"><span>INDEPENDENT CONCEPT STUDIES / 001—003</span><span>MEDIA SELECTION IN PROGRESS <b>●</b></span></div>
    </section>

    <section class="capabilities section-pad" id="capabilities">
      ${sectionLabel('03', 'WHAT WE MAKE')}
      <div class="capabilities__heading"><h2 data-reveal>Three ways<br>to change the <em>equation.</em></h2><p data-reveal>Choose the problem, not the technology. We assemble the right mix of direction, code and automation around the outcome.</p></div>
      <div class="service-index">
        <a class="service-row service-row--creative" href="/services/creative" data-service="creative" data-reveal><span class="service-row__number">01 /</span><div class="service-row__name"><h3>Latent <em>Creative</em></h3><p>Original campaigns, product films and repeatable creative production.</p></div><div class="service-row__motif service-row__motif--creative" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div><span class="service-row__arrow">${extArrow}</span></a>
        <a class="service-row service-row--convert" href="/services/convert" data-service="convert" data-reveal><span class="service-row__number">02 /</span><div class="service-row__name"><h3>Latent <em>Convert</em></h3><p>Enquiry handling, follow-up and operational visibility that keep a good lead moving.</p></div><div class="service-row__motif service-row__motif--convert" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div><span class="service-row__arrow">${extArrow}</span></a>
        <a class="service-row service-row--flow" href="/services/flow" data-service="flow" data-reveal><span class="service-row__number">03 /</span><div class="service-row__name"><h3>Latent <em>Flow</em></h3><p>Document and back-office automations built to validate, route and report.</p></div><div class="service-row__motif service-row__motif--flow" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div><span class="service-row__arrow">${extArrow}</span></a>
      </div>
      <div class="capabilities__foot"><span>ONE STUDIO / MULTIPLE LEVERS</span><span>01—03 / CAPABILITIES</span></div>
    </section>

    <section class="system-lab section-pad" id="system-lab">
      ${sectionLabel('04', 'THE WORKING LOGIC', 'light')}
      <div class="system-lab__intro"><h2 data-reveal>From first thought<br>to <em>repeatable advantage.</em></h2><p data-reveal>AI is one material. Rules, data, design and human judgment make it useful. Choose a field to see how the parts connect.</p></div>
      <div class="system-lab__controls" role="group" aria-label="Choose a Latent Labs service"><button type="button" class="system-tab is-active" aria-pressed="true" data-system-tab="creative">01 / Creative</button><button type="button" class="system-tab" aria-pressed="false" data-system-tab="convert">02 / Convert</button><button type="button" class="system-tab" aria-pressed="false" data-system-tab="flow">03 / Flow</button></div>
      <div class="system-graphic" data-system-diagram data-mode="creative" aria-label="A diagram showing the selected service workflow">
        <svg class="system-graphic__lines" viewBox="0 0 1000 330" preserveAspectRatio="none" aria-hidden="true"><path d="M115 166H300M365 166H485M550 166H675M740 166H885"/><path d="M291 157l10 9-10 9M476 157l10 9-10 9M666 157l10 9-10 9M876 157l10 9-10 9"/></svg>
        <div class="system-node system-node--source"><span class="system-node__index">INPUT / 01</span><div class="system-node__symbol system-node__symbol--input" aria-hidden="true"><i></i><i></i><i></i></div><h3 data-node-title="source">The raw idea</h3><p data-node-copy="source">Brief, product and intent</p></div>
        <div class="system-node system-node--intelligence"><span class="system-node__index">INTERPRET / 02</span><div class="system-node__symbol system-node__symbol--logic" aria-hidden="true"><i></i><i></i><i></i><i></i></div><h3 data-node-title="logic">Creative direction</h3><p data-node-copy="logic">Meaning before motion</p></div>
        <div class="system-node system-node--approval"><span class="system-node__index">JUDGMENT / 03</span><div class="system-node__symbol system-node__symbol--human" aria-hidden="true"><b>H</b></div><h3 data-node-title="approval">Human approval</h3><p data-node-copy="approval">A deliberate quality gate</p></div>
        <div class="system-node system-node--output"><span class="system-node__index">OUTPUT / 04</span><div class="system-node__symbol system-node__symbol--output" aria-hidden="true"><i></i><i></i><i></i></div><h3 data-node-title="output">A finished campaign</h3><p data-node-copy="output">Edited, accurate, ready</p></div>
        <div class="system-node system-node--feedback"><span class="system-node__index">LEARN / 05</span><div class="system-node__symbol system-node__symbol--feedback" aria-hidden="true">↗</div><h3 data-node-title="feedback">Useful signals</h3><p data-node-copy="feedback">Inform the next version</p></div>
      </div>
      <div class="system-lab__bottom"><span>NOT A BLACK BOX.</span><span>EVERY STEP HAS A PURPOSE.</span><span>SELECT A SERVICE ABOVE ↗</span></div>
    </section>

    <section class="method section-pad" id="method">
      ${sectionLabel('05', 'HOW WE WORK')}
      <div class="method__heading"><h2 data-reveal>Carefully made.<br><em>Built to work.</em></h2><p data-reveal>The best technology is not the most complicated one. It is the smallest, clearest system that makes the right thing easier to do.</p></div>
      <div class="method-steps">
        <article class="method-step" data-reveal><span class="method-step__number">01</span><div class="method-step__art method-step__art--one" aria-hidden="true"><i></i><i></i><i></i><span>OBSERVE</span></div><div class="method-step__content"><span class="eyebrow">FIND THE LEVERAGE</span><h3>Understand the real problem.</h3><p>We get specific about the opportunity, the audience, the constraints and the thing that needs to change. No solution looking for a problem.</p></div></article>
        <article class="method-step" data-reveal><span class="method-step__number">02</span><div class="method-step__art method-step__art--two" aria-hidden="true"><div class="method-step__orbit"></div><div class="method-step__orbit method-step__orbit--inner"></div><span>BUILD</span></div><div class="method-step__content"><span class="eyebrow">BUILD THE INSTRUMENT</span><h3>Make the idea tangible.</h3><p>We prototype the visual, the workflow or the software. Important assumptions are tested while changes are still inexpensive.</p></div></article>
        <article class="method-step" data-reveal><span class="method-step__number">03</span><div class="method-step__art method-step__art--three" aria-hidden="true"><i></i><i></i><i></i><span>REPEAT</span></div><div class="method-step__content"><span class="eyebrow">MAKE IT REPEATABLE</span><h3>Deliver, document, improve.</h3><p>We test the edges, hand over a system the team can understand, and identify what should be standardized next.</p></div></article>
      </div>
    </section>

    <section class="about-callout section-pad"><div class="about-callout__stamp" aria-hidden="true"><span>LATENT<br>BY DESIGN</span>${mark}</div><div class="about-callout__copy"><span class="eyebrow">A NOTE ON THE STUDIO</span><h2>Serious about<br>the work. <em>Curious</em><br>about the edges.</h2><p>Small enough to care about every decision. Technical enough to make it real. We bring an editorial eye to software and an engineer's respect for what happens after launch.</p><a class="text-link" href="/about"><span>More about Latent</span>${arrow}</a></div><div class="about-callout__side">CRAFT / CLARITY / CONSEQUENCE</div></section>

    <section class="contact section-pad" id="project">
      ${sectionLabel('06', 'THE NEXT CONVERSATION')}
      <div class="contact__heading"><p class="contact__eyebrow"><span class="signal-dot"></span> HAVE A GOOD PROBLEM?</p><h2 data-reveal>Bring us the part<br>you <em>can’t quite</em><br>solve.</h2><div class="contact__aside" data-reveal><span class="contact__asterisk" aria-hidden="true">✳</span><p>A campaign that needs a point of view. A process that refuses to scale. Something not quite invented yet.</p><p>Tell us what you are trying to change. We will take it from there, together.</p></div></div>
      <div class="contact__form-wrap"><div class="contact__form-intro"><span class="eyebrow">PROJECT INTAKE / 001</span><p>Give us the first honest version. The useful details can come later.</p><span class="contact__rule-number">LL / 26</span></div>${projectForm()}</div>
    </section>
  </main>`;
}

function servicePage(serviceId) {
  const s = SERVICES.find(x => x.id === serviceId);
  if (!s) return notFoundPage();
  const art = serviceId === 'creative'
    ? `<div class="service-hero-art service-hero-art--creative"><div class="service-art__frame"><div class="service-art__sun"></div><div class="service-art__stripes"></div><div class="service-art__type">MAKE<br>IT<br>MEAN<br>SOMETHING.</div><span class="service-art__serial">LL / C—01</span></div></div>`
    : serviceId === 'convert'
      ? `<div class="service-hero-art service-hero-art--convert"><div class="routing-art"><span class="route-point route-point--a"></span><span class="route-point route-point--b"></span><span class="route-point route-point--c"></span><span class="route-point route-point--d"></span><svg viewBox="0 0 600 470" aria-hidden="true"><path d="M70 225H190V110H320M190 225V350H320M320 110H420V225H530M320 350H420V225"/><path d="M310 102l10 8-10 8M310 342l10 8-10 8M522 217l8 8-8 8"/></svg><span class="routing-art__label">INTAKE</span><span class="routing-art__label routing-art__label--two">ROUTE</span><span class="routing-art__label routing-art__label--three">FOLLOW UP</span><span class="routing-art__label routing-art__label--four">LEARN</span></div></div>`
      : `<div class="service-hero-art service-hero-art--flow"><div class="flow-art"><div class="flow-doc"><i></i><i></i><i></i><i></i><b>01</b></div><div class="flow-check">✓</div><div class="flow-record"><span>RECORD / VALIDATED</span><i></i><i></i><i></i><b>02</b></div><div class="flow-art__caption">RAW INPUT → TRUSTED OUTPUT</div></div></div>`;
  return `<main id="main" class="service-detail service-detail--${s.id}">
    <section class="service-detail__hero section-pad" id="top"><div class="service-detail__crumb"><a href="/">LATENT LABS</a><span>/</span><a href="/#capabilities">CAPABILITIES</a><span>/</span><span>${s.number} ${s.name.toUpperCase()}</span></div><div class="service-detail__grid"><div class="service-detail__copy"><span class="eyebrow">${s.number} / ${s.label}</span><h1>${s.id === 'creative' ? 'Make the<br><em>feeling</em> stick.' : s.id === 'convert' ? 'Give good leads<br>a <em>way forward.</em>' : 'Turn repetition<br>into <em>momentum.</em>'}</h1><p class="service-detail__intro">${esc(s.description)}</p><div class="service-detail__buttons"><a class="button button--ink" href="/#project"><span>Discuss a project</span>${arrow}</a><a class="text-link" href="/work"><span>View field notes</span>${arrow}</a></div></div>${art}</div><div class="service-detail__bottom"><span>${s.number} / 03</span><span>${esc(s.short)}</span><span>MADE TO BE USED.</span></div></section>
    <section class="service-detail__statement section-pad"><div class="service-detail__statement-label">THE OPPORTUNITY</div><div><h2>${s.id === 'creative' ? 'Production without a point of view is just output.' : s.id === 'convert' ? 'A lead is a beginning, not a spreadsheet row.' : 'Repetition is a signal that a system is missing.'}</h2><p>${s.id === 'creative' ? 'We pair strong visual direction with a flexible production process. AI helps where it earns its place. Human taste and careful finishing hold the work together.' : s.id === 'convert' ? 'We connect the places enquiries arrive with the people and processes that need to act on them. The system makes ownership visible and missed steps harder to overlook.' : 'We move information through a defined process, check it against business rules, and give uncertain cases a route to human review. Reliability is part of the design.'}</p></div></section>
    <section class="service-detail__deliverables section-pad">${sectionLabel('01', 'WHAT IS INCLUDED')}<div class="deliverables-grid"><div><span class="eyebrow">THE WORK, MADE TANGIBLE</span><h2>Clear scope.<br><em>Considered delivery.</em></h2></div><ul class="deliverable-list">${s.deliverables.map((d, i) => `<li><span>0${i + 1}</span><p>${esc(d)}</p>${arrow}</li>`).join('')}</ul></div><div class="service-detail__bestfor"><span class="eyebrow">BUILT FOR</span><p>${esc(s.bestFor)}</p></div></section>
    <section class="service-detail__process section-pad"><div class="service-detail__process-intro"><span class="eyebrow">THE DELIVERY LOOP</span><h2>Make the useful<br>thing <em>repeatable.</em></h2></div><div class="mini-process"><article><span>01 / DEFINE</span><h3>Find the leverage.</h3><p>Agree on the problem, constraints, deliverables and how we will know the work is complete.</p></article><article><span>02 / BUILD</span><h3>Build the instrument.</h3><p>Prototype, produce and test the defined solution. Keep important decisions visible.</p></article><article><span>03 / HAND OVER</span><h3>Make it work in the real world.</h3><p>Review, document and deliver. Ongoing support is scoped separately when needed.</p></article></div></section>
    <section class="service-detail__end section-pad"><span class="eyebrow">${s.number} / ${s.name.toUpperCase()}</span><h2>Let's make the next<br>version <em>real.</em></h2><a class="button button--paper" href="/#project"><span>Tell us what you need</span>${arrow}</a><a class="service-detail__next" href="${SERVICES[(SERVICES.findIndex(x => x.id === s.id) + 1) % SERVICES.length].href}"><span>UP NEXT</span><b>${SERVICES[(SERVICES.findIndex(x => x.id === s.id) + 1) % SERVICES.length].name}</b>${extArrow}</a></section>
  </main>`;
}

function workPage() {
  return `<main id="main" class="work-page"><section class="work-page__hero section-pad" id="top">${sectionLabel('INDEX / 001', 'THE OPEN ARCHIVE')}<span class="eyebrow">VISUAL EXPERIMENTS + SYSTEM STUDIES</span><h1>Selected<br><em>field notes.</em></h1><div class="work-page__hero-bottom"><p>A living archive of ideas in motion. These first entries are independent concept studies made to explore direction, interaction and the kinds of problems Latent Labs wants to solve.</p><span>3 STUDIES / 2 FIELDS<br>0 CLAIMS WITHOUT PROOF</span></div></section><section class="work-page__grid section-pad">${PROJECT_STUDIES.map((s, i) => `<article class="work-entry" id="${s.id}" data-reveal><div class="work-entry__visual"><img src="${s.image}" alt="${esc(s.alt)}" loading="lazy"><span class="work-entry__number">${s.number}</span><span class="work-entry__label">${s.status}</span></div><div class="work-entry__meta"><span class="eyebrow">${esc(s.type)}</span><h2>${esc(s.title)}</h2><p>${esc(s.note)}</p><div class="work-entry__disclaimer">INDEPENDENT CONCEPT STUDY / NOT COMMISSIONED CLIENT WORK</div></div></article>`).join('')}</section><section class="work-page__note section-pad"><span class="eyebrow">NEXT IN THE ARCHIVE</span><p>The visual placeholders on this page are ready for your curated image set. Replace them with assets you own or have permission to use, then update the media manifest and alt text.</p><a class="text-link" href="/#project"><span>Make something with us</span>${arrow}</a></section></main>`;
}

function aboutPage() {
  return `<main id="main" class="about-page"><section class="about-page__hero section-pad" id="top"><div class="about-page__topline"><span class="eyebrow">THE STUDIO / 001</span><span class="eyebrow">A PRACTICE, NOT A PRESET</span></div><h1>A clear eye.<br>A curious mind.<br><em>Useful work.</em></h1><div class="about-page__hero-bottom"><p>Latent Labs lives where creative direction meets systems thinking. We make the visual feel considered and the underlying mechanism feel dependable.</p><div class="about-page__emblem" aria-hidden="true">${mark}<span>INTENT<br>INTO FORM</span></div></div></section><section class="about-page__belief section-pad">${sectionLabel('01', 'WHAT WE BELIEVE')}<div class="about-page__belief-grid"><span class="eyebrow">THE SHORT VERSION</span><div><h2>Technology is not the idea.<br>It is how the idea <em>gets somewhere.</em></h2><p>We start with the job to be done. Sometimes the answer is a film with an unmistakable point of view. Sometimes it is a workflow that lets a small team move with more consistency. Sometimes the two are connected.</p><p>We prefer clear systems, strong choices, useful constraints and a finished detail that makes the whole thing feel inevitable.</p></div></div></section><section class="about-page__principles section-pad">${sectionLabel('02', 'THE WORKING PRINCIPLES')}<div class="principle-list"><article><span>01</span><h3>Direction before decoration.</h3><p>Every visual and technical choice should earn its place.</p></article><article><span>02</span><h3>Automation with a reason.</h3><p>Remove repetition, keep judgment where it matters, make failures visible.</p></article><article><span>03</span><h3>Proof over performance.</h3><p>No borrowed case studies or invented numbers. Show the work and measure what is real.</p></article><article><span>04</span><h3>Small systems, well made.</h3><p>Build only what the outcome requires. Leave a clear handover behind.</p></article></div></section><section class="about-page__end section-pad"><p class="eyebrow">GOOD WORK STARTS WITH A GOOD QUESTION.</p><h2>What are you<br>trying to <em>change?</em></h2><a class="button button--ink" href="/#project"><span>Start a conversation</span>${arrow}</a></section></main>`;
}

function legalPage(kind) {
  const isPrivacy = kind === 'privacy';
  return `<main id="main" class="legal-page section-pad" id="top"><div class="legal-page__head">${sectionLabel(isPrivacy ? 'LEGAL / 01' : 'LEGAL / 02', isPrivacy ? 'PRIVACY NOTICE' : 'TERMS OF USE')}<h1>${isPrivacy ? 'Privacy, in plain<br><em>language.</em>' : 'A few clear<br><em>terms.</em>'}</h1><p>Last updated: 21 October 2026. This is an editable starter document and needs owner review before publication.</p></div><div class="legal-page__body">${isPrivacy ? `<h2>1. Who operates this site</h2><p>This website is a draft for Latent Labs. Before launch, the site owner must add the correct legal operator name, contact address, and production contact route.</p><h2>2. Information you choose to provide</h2><p>The project brief on this draft site is processed in your browser. If the contact route is not configured, the form prepares and copies a brief locally rather than sending it to a server. If a real email or form provider is connected later, update this notice to explain what is collected, why it is used, who processes it, and how long it is retained.</p><h2>3. Analytics and advertising</h2><p>No analytics or advertising trackers are included by default. If any analytics, pixels, cookies, or third-party embeds are added, disclose them accurately and provide any legally required choices.</p><h2>4. Third-party services</h2><p>External hosting, font delivery or form integrations may process technical data. Document the actual providers and their applicable terms before launch.</p><h2>5. Your choices and contact</h2><p>Provide the final privacy contact and the process for requests relating to personal information before this page is published.</p><h2>6. Owner checklist</h2><p>Replace these starter sections with a jurisdiction-appropriate privacy notice. This page is not legal advice and does not guarantee compliance.</p>` : `<h2>1. Website information</h2><p>This site introduces Latent Labs' intended creative and automation services. Descriptions are illustrative until a written proposal defines a particular engagement.</p><h2>2. Project scope</h2><p>Any client engagement should be governed by a separate written agreement setting out deliverables, fees, timing, approvals, revisions, responsibilities, data handling and acceptance criteria.</p><h2>3. Intellectual property</h2><p>Rights in supplied material, generated assets, deliverables, source files and third-party components depend on their applicable licences and the relevant project agreement. No right to use third-party imagery, music, fonts, likenesses or marks is implied by their appearance in a reference or moodboard.</p><h2>4. AI-assisted work</h2><p>AI may be used as part of creative or technical workflows. Outputs require appropriate review, and no guarantee of unique, error-free or commercially cleared AI output is made by this starter site.</p><h2>5. External links</h2><p>External services are governed by their own terms. Links do not constitute endorsement or create an agency relationship.</p><h2>6. Owner checklist</h2><p>Have this page reviewed and adapted to the actual business, applicable jurisdiction, service contracts and operational practices before launch. This page is not legal advice.</p>`}</div><a class="text-link" href="/"><span>Return to Latent Labs</span>${arrow}</a></main>`;
}

function notFoundPage() {
  return `<main id="main" class="not-found section-pad" id="top"><span class="eyebrow">ERROR / 404 / LOST IN THE FIELD</span><h1>Nothing here.<br><em>Not nothing.</em></h1><p>The page you're looking for has moved, dissolved, or never made it into the index.</p><a class="button button--ink" href="/"><span>Return to the field</span>${arrow}</a><div class="not-found__mark" aria-hidden="true">${mark}</div></main>`;
}

const ROUTES = {
  '/': { title: 'Latent Labs — We build inevitables.', description: SITE.description, active: '', body: homePage(), page: 'home' },
  '/services/creative': { title: 'Latent Creative — Latent Labs', description: SERVICES[0].description, active: '/#capabilities', body: servicePage('creative'), page: 'service' },
  '/services/convert': { title: 'Latent Convert — Latent Labs', description: SERVICES[1].description, active: '/#capabilities', body: servicePage('convert'), page: 'service' },
  '/services/flow': { title: 'Latent Flow — Latent Labs', description: SERVICES[2].description, active: '/#capabilities', body: servicePage('flow'), page: 'service' },
  '/work': { title: 'Field Notes — Latent Labs', description: 'Independent visual experiments and system studies from Latent Labs.', active: '/work', body: workPage(), page: 'work' },
  '/about': { title: 'Approach — Latent Labs', description: 'The point of view behind Latent Labs: creative direction, useful systems and thoughtful engineering.', active: '/about', body: aboutPage(), page: 'about' },
  '/privacy': { title: 'Privacy — Latent Labs', description: 'Privacy information for the Latent Labs website.', active: '', body: legalPage('privacy'), page: 'legal' },
  '/terms': { title: 'Terms — Latent Labs', description: 'Terms of use for the Latent Labs website.', active: '', body: legalPage('terms'), page: 'legal' },
  '/404': { title: 'Page not found — Latent Labs', description: 'The requested Latent Labs page was not found.', active: '', body: notFoundPage(), page: '404' },
};

function shell(path, route) {
  const canonical = SITE.siteUrl ? `<link rel="canonical" href="${esc(SITE.siteUrl.replace(/\/$/, '') + path)}">` : '';
  const pageBody = route.body;
  const preloader = `<div class="preloader" data-preloader aria-hidden="true"><div class="preloader__head"><span>LL / FIELD OFFICE 01</span><span>PREPARING THE UNEXPECTED</span></div><div class="preloader__center"><div class="preloader__cells">${Array.from({length: 9}, (_, i) => `<i style="--cell:${i}"></i>`).join('')}</div><span class="preloader__word">LATENT <b>LABS</b></span></div><div class="preloader__foot"><span>CREATIVE</span><span>SYSTEMS</span><span>INTENT</span></div></div>`;
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <meta name="theme-color" content="#f0eee7"><meta name="color-scheme" content="light">
  <title>${esc(route.title)}</title><meta name="description" content="${esc(route.description)}">
  <meta property="og:type" content="website"><meta property="og:title" content="${esc(route.title)}"><meta property="og:description" content="${esc(route.description)}">${SITE.siteUrl ? `<meta property="og:image" content="${esc(SITE.siteUrl.replace(/\/$/, '') + '/images/og-latent.svg')}">` : ''}
  ${canonical}<link rel="icon" type="image/svg+xml" href="/favicon.svg"><link rel="manifest" href="/site.webmanifest">
  <link rel="preconnect" href="https://api.fontshare.com"><link href="https://api.fontshare.com/v2/css?f[]=switzer@400,500,600,700,800&f[]=boska@400,500,600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="/src/styles.css">
</head><body data-page="${route.page}">
  ${preloader}${header(route.active)}${pageBody}${footer()}
</body></html>`;
}

export function getPages() {
  return Object.entries(ROUTES).map(([path, route]) => ({ path, html: shell(path, route) }));
}
