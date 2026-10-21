const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(pointer: fine) and (min-width: 761px)').matches;
document.documentElement.classList.add('js-motion');

// A short, one-time arrival sequence. Content is never held hostage by the animation.
(() => {
  const preloader = document.querySelector('[data-preloader]');
  if (!preloader) return;
  let visited = false;
  try { visited = sessionStorage.getItem('latent-arrived') === '1'; } catch { visited = false; }
  if (reduceMotion || visited) {
    preloader.classList.add('is-done');
    preloader.remove();
    return;
  }
  try { sessionStorage.setItem('latent-arrived', '1'); } catch { /* Session storage is an enhancement only. */ }
  window.setTimeout(() => {
    preloader.classList.add('is-done');
    window.setTimeout(() => preloader.remove(), 520);
  }, 760);
})();

// Scroll entrances use native IntersectionObserver, not a scroll-blocking animation framework.
(() => {
  const reveals = [...document.querySelectorAll('[data-reveal], [data-title-line]')];
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('is-in'));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -4% 0px' });
  reveals.forEach((el, i) => {
    if (el.matches('[data-title-line]')) el.style.transitionDelay = `${i * 95}ms`;
    observer.observe(el);
  });
})();

// Header compaction is intentionally subtle and based on passive scroll events.
(() => {
  const header = document.querySelector('[data-header]');
  if (!header) return;
  let queued = false;
  const update = () => {
    header.classList.toggle('is-compact', window.scrollY > 24);
    queued = false;
  };
  window.addEventListener('scroll', () => {
    if (!queued) { queued = true; requestAnimationFrame(update); }
  }, { passive: true });
  update();
})();

// Keyboard-friendly mobile menu. Close on navigation, Escape, or outside focus change.
(() => {
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-mobile-nav]');
  const close = document.querySelector('[data-menu-close]');
  if (!toggle || !menu) return;
  const openMenu = () => {
    menu.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    document.body.classList.add('menu-open');
    const firstLink = menu.querySelector('a');
    window.setTimeout(() => firstLink?.focus(), 40);
  };
  const closeMenu = (returnFocus = true) => {
    menu.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
    if (returnFocus) toggle.focus();
  };
  toggle.addEventListener('click', () => menu.hidden ? openMenu() : closeMenu(false));
  close?.addEventListener('click', () => closeMenu());
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    menu.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('menu-open');
  }));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && !menu.hidden) closeMenu();
    if (event.key === 'Tab' && !menu.hidden) {
      const items = [...menu.querySelectorAll('a, button')].filter(el => !el.hasAttribute('disabled'));
      if (!items.length) return;
      const first = items[0], last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });
})();

// Procedural WebGL: a folded field of contours, not a stock model or a decorative gradient blob.
(() => {
  const canvas = document.getElementById('latent-field');
  if (!canvas) return;
  const fallback = canvas.parentElement?.querySelector('.hero-visual__fallback');
  const vertexSource = `
    attribute vec2 a_position;
    varying vec2 v_uv;
    void main() {
      v_uv = a_position * 0.5 + 0.5;
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;
  const fragmentSource = `
    precision highp float;
    uniform vec2 u_resolution;
    uniform vec2 u_mouse;
    uniform float u_time;
    uniform float u_scroll;
    uniform float u_motion;
    varying vec2 v_uv;

    float surface(vec2 p, float t) {
      vec2 q = p;
      q.x += 0.28 * sin(p.y * 1.35 + t * 0.72) + (u_mouse.x - 0.5) * 0.22;
      q.y += 0.17 * cos(p.x * 1.6 - t * 0.56) + (u_mouse.y - 0.5) * 0.16;
      float a = sin(q.x * 2.7 + sin(q.y * 1.4 + t * 0.6) * 0.94);
      float b = cos(q.y * 3.05 - q.x * 0.78 - t * 0.53);
      float c = sin(length(q + vec2(0.12, -0.09)) * 4.2 - t * 0.7);
      float d = cos((q.x - q.y * 0.48) * 2.3 + t * 0.3);
      return a * 0.48 + b * 0.25 + c * 0.19 + d * 0.08;
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / u_resolution;
      float aspect = u_resolution.x / max(1.0, u_resolution.y);
      vec2 p = (uv - 0.5) * vec2(aspect, 1.0) * 3.6;
      float t = u_time * 0.18 * u_motion + u_scroll * 0.45;
      float h = surface(p, t);
      float e = 0.012;
      float hx = surface(p + vec2(e, 0.0), t) - surface(p - vec2(e, 0.0), t);
      float hy = surface(p + vec2(0.0, e), t) - surface(p - vec2(0.0, e), t);
      vec3 n = normalize(vec3(-hx * 7.5, -hy * 7.5, 0.9));
      vec3 lightDir = normalize(vec3(-0.48, 0.52, 0.72));
      float diffuse = max(dot(n, lightDir), 0.0);
      float rim = pow(1.0 - max(n.z, 0.0), 2.1);
      float contourBand = abs(fract((h + 1.2) * 7.0) - 0.5);
      float contour = 1.0 - smoothstep(0.012, 0.048, contourBand);
      float fineBand = abs(fract((h + 1.2) * 28.0) - 0.5);
      float fineContour = 1.0 - smoothstep(0.025, 0.085, fineBand);
      float latticeX = 1.0 - smoothstep(0.0, 0.022, abs(fract(p.x * 2.15) - 0.5));
      float latticeY = 1.0 - smoothstep(0.0, 0.022, abs(fract(p.y * 2.15) - 0.5));
      float lattice = max(latticeX, latticeY) * 0.16;
      float ridge = exp(-abs(h - 0.32) * 18.0);
      float focus = exp(-length(p - vec2(0.18, -0.02)) * 0.75);
      vec3 bg = vec3(0.075, 0.086, 0.073);
      vec3 bone = vec3(0.90, 0.90, 0.82);
      vec3 acid = vec3(0.82, 0.96, 0.34);
      vec3 vermilion = vec3(1.0, 0.27, 0.15);
      vec3 contourColor = mix(acid, vermilion, smoothstep(-0.62, 0.78, h + sin(p.x * 0.7) * 0.1));
      float shade = 0.25 + diffuse * 0.28 + rim * 0.24;
      vec3 color = bg + bone * fineContour * 0.075 + contourColor * contour * shade;
      color += acid * ridge * (0.04 + 0.17 * focus);
      color += bone * lattice * 0.11;
      float crosshair = 1.0 - smoothstep(0.001, 0.003, min(abs(uv.x - 0.5), abs(uv.y - 0.5)));
      crosshair *= step(abs(uv.x - 0.5), 0.018) * step(abs(uv.y - 0.5), 0.018);
      color += vermilion * crosshair * 0.8;
      float vignette = smoothstep(1.5, 0.2, length((uv - 0.5) * vec2(aspect, 1.0)));
      color *= 0.7 + vignette * 0.3;
      gl_FragColor = vec4(color, 1.0);
    }
  `;

  let gl, program, raf = 0, start = performance.now(), visible = true, disposed = false;
  let timeLocation, resolutionLocation, mouseLocation, scrollLocation, motionLocation;
  const mouse = { x: .5, y: .5, tx: .5, ty: .5 };
  let scroll = 0;
  const motionScale = reduceMotion ? 0.0 : 1.0;
  const compile = (type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const error = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new Error(error || 'Shader compile failed');
    }
    return shader;
  };
  const resize = () => {
    if (!gl || disposed) return;
    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 760 ? 1.1 : 1.45);
    const width = Math.max(1, Math.floor(rect.width * dpr));
    const height = Math.max(1, Math.floor(rect.height * dpr));
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width; canvas.height = height;
      gl.viewport(0, 0, width, height);
    }
    draw(performance.now());
  };
  const draw = (now) => {
    if (!gl || !program || disposed) return;
    gl.useProgram(program);
    gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    mouse.x += (mouse.tx - mouse.x) * (reduceMotion ? 1 : 0.035);
    mouse.y += (mouse.ty - mouse.y) * (reduceMotion ? 1 : 0.035);
    gl.uniform2f(mouseLocation, mouse.x, mouse.y);
    gl.uniform1f(timeLocation, reduceMotion ? 0 : (now - start) / 1000);
    gl.uniform1f(scrollLocation, scroll);
    gl.uniform1f(motionLocation, motionScale);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };
  const animate = (now) => {
    raf = 0;
    if (disposed || !visible || document.hidden) return;
    draw(now);
    if (!reduceMotion) raf = requestAnimationFrame(animate);
  };
  const stop = () => { if (raf) cancelAnimationFrame(raf); raf = 0; };
  const startAnimation = () => {
    if (disposed || !visible || document.hidden) return;
    stop();
    if (reduceMotion) draw(performance.now());
    else raf = requestAnimationFrame(animate);
  };
  try {
    gl = canvas.getContext('webgl', { alpha: false, antialias: false, depth: false, powerPreference: 'low-power' }) || canvas.getContext('experimental-webgl');
    if (!gl) throw new Error('WebGL unavailable');
    const vs = compile(gl.VERTEX_SHADER, vertexSource);
    const fs = compile(gl.FRAGMENT_SHADER, fragmentSource);
    program = gl.createProgram();
    gl.attachShader(program, vs); gl.attachShader(program, fs); gl.linkProgram(program);
    gl.deleteShader(vs); gl.deleteShader(fs);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) || 'Program link failed');
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
    timeLocation = gl.getUniformLocation(program, 'u_time');
    resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    mouseLocation = gl.getUniformLocation(program, 'u_mouse');
    scrollLocation = gl.getUniformLocation(program, 'u_scroll');
    motionLocation = gl.getUniformLocation(program, 'u_motion');
    gl.disable(gl.DEPTH_TEST);
    gl.clearColor(.075, .086, .073, 1);
    if (fallback) fallback.style.display = 'none';
    canvas.addEventListener('pointermove', event => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = Math.max(0, Math.min(1, (event.clientX - rect.left) / rect.width));
      mouse.ty = 1 - Math.max(0, Math.min(1, (event.clientY - rect.top) / rect.height));
    }, { passive: true });
    canvas.addEventListener('pointerleave', () => { mouse.tx = .5; mouse.ty = .5; }, { passive: true });
    const updateScroll = () => {
      const rect = canvas.getBoundingClientRect();
      scroll = Math.max(-1, Math.min(1, (window.innerHeight * .5 - (rect.top + rect.height * .5)) / (window.innerHeight + rect.height)));
      if (reduceMotion) draw(performance.now());
    };
    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('resize', resize, { passive: true });
    document.addEventListener('visibilitychange', startAnimation);
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        visible = Boolean(entries[0]?.isIntersecting);
        startAnimation();
      }, { threshold: 0.01 });
      observer.observe(canvas);
    }
    updateScroll(); resize(); startAnimation();
    window.addEventListener('pagehide', () => {
      disposed = true; stop(); window.removeEventListener('resize', resize); window.removeEventListener('scroll', updateScroll);
      document.removeEventListener('visibilitychange', startAnimation);
      try { gl.getExtension('WEBGL_lose_context')?.loseContext(); } catch { /* Browser cleanup is best effort. */ }
    }, { once: true });
  } catch (error) {
    console.warn('Latent Field fell back to its static artwork.', error);
    stop();
    if (canvas) canvas.style.display = 'none';
    if (fallback) fallback.style.display = 'block';
  }
})();

// Small editorial cursor. The browser's native cursor remains available on touch and keyboard.
(() => {
  if (!finePointer || reduceMotion) return;
  const cursor = document.querySelector('[data-cursor]');
  if (!cursor) return;
  document.body.classList.add('has-cursor');
  let x = -100, y = -100, tx = x, ty = y, visible = false, raf = 0;
  const setVisible = (on, label = 'EXPLORE') => {
    visible = on;
    cursor.classList.toggle('is-visible', on);
    const text = cursor.querySelector('span');
    if (text) text.textContent = label;
  };
  const tick = () => {
    raf = 0;
    x += (tx - x) * .22; y += (ty - y) * .22;
    cursor.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%) scale(${visible ? 1 : .7})`;
    if (Math.abs(tx - x) > .1 || Math.abs(ty - y) > .1) raf = requestAnimationFrame(tick);
  };
  window.addEventListener('pointermove', event => {
    tx = event.clientX; ty = event.clientY;
    if (!raf) raf = requestAnimationFrame(tick);
    const target = event.target.closest('a, button, input, select, textarea, [data-cursor-label]');
    if (target) {
      const label = target.dataset.cursorLabel || (target.matches('button, input, select, textarea') ? 'SELECT' : target.classList.contains('study__link') ? 'VIEW' : 'OPEN');
      setVisible(true, label);
    } else setVisible(false);
  }, { passive: true });
  window.addEventListener('pointerout', event => { if (!event.relatedTarget) setVisible(false); }, { passive: true });
})();

// The workflow diagram is an interactive explanation, not a fake live dashboard.
(() => {
  const tabs = [...document.querySelectorAll('[data-system-tab]')];
  const diagram = document.querySelector('[data-system-diagram]');
  if (!tabs.length || !diagram) return;
  const modes = {
    creative: {
      source: ['The raw idea', 'Brief, product and intent'],
      logic: ['Creative direction', 'Meaning before motion'],
      approval: ['Human approval', 'A deliberate quality gate'],
      output: ['A finished campaign', 'Edited, accurate, ready'],
      feedback: ['Useful signals', 'Inform the next version'],
    },
    convert: {
      source: ['A new enquiry', 'Form, campaign or inbox'],
      logic: ['Validate + route', 'Rules and structured AI'],
      approval: ['Team ownership', 'A person takes the next step'],
      output: ['A tracked follow-up', 'Assigned, visible, timely'],
      feedback: ['Pipeline clarity', 'Find what gets missed'],
    },
    flow: {
      source: ['A raw document', 'PDF, email or spreadsheet'],
      logic: ['Extract + validate', 'Schema and business rules'],
      approval: ['Review exceptions', 'Uncertain values stop here'],
      output: ['Trusted records', 'Approved, traceable data'],
      feedback: ['Failure signals', 'Fix the cause, not just a row'],
    },
  };
  const update = mode => {
    const content = modes[mode] || modes.creative;
    diagram.dataset.mode = mode;
    tabs.forEach(tab => {
      const active = tab.dataset.systemTab === mode;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-pressed', String(active));
    });
    Object.entries(content).forEach(([key, values]) => {
      const title = diagram.querySelector(`[data-node-title="${key}"]`);
      const copy = diagram.querySelector(`[data-node-copy="${key}"]`);
      if (title) title.textContent = values[0];
      if (copy) copy.textContent = values[1];
    });
  };
  tabs.forEach(tab => tab.addEventListener('click', () => update(tab.dataset.systemTab)));
  update('creative');
})();

// Gentle pointer parallax on gallery media. The content remains entirely readable without it.
(() => {
  if (!finePointer || reduceMotion) return;
  document.querySelectorAll('.study__media, .work-entry__visual').forEach(frame => {
    frame.addEventListener('pointermove', event => {
      const rect = frame.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - .5;
      const y = (event.clientY - rect.top) / rect.height - .5;
      frame.style.setProperty('--pointer-x', `${(x * 7).toFixed(2)}px`);
      frame.style.setProperty('--pointer-y', `${(y * 7).toFixed(2)}px`);
    }, { passive: true });
    frame.addEventListener('pointerleave', () => {
      frame.style.setProperty('--pointer-x', '0px');
      frame.style.setProperty('--pointer-y', '0px');
    }, { passive: true });
  });
})();

// Project brief intake: validate locally, then prepare a truthful email draft or copyable brief.
(() => {
  const form = document.querySelector('[data-brief-form]');
  if (!form) return;
  const feedback = form.querySelector('[data-form-feedback]');
  const config = window.LATENT_SITE_CONFIG || { contactEmail: '' };
  const setError = (name, message) => {
    const output = form.querySelector(`[data-error="${name}"]`);
    const field = form.elements.namedItem(name);
    if (output) output.textContent = message;
    if (field) field.setAttribute('aria-invalid', message ? 'true' : 'false');
  };
  const formatBrief = values => [
    'LATENT LABS / PROJECT ENQUIRY',
    '',
    `Name: ${values.name}`,
    `Work email: ${values.email}`,
    `Company: ${values.company || 'Not provided'}`,
    `Area: ${values.service}`,
    `Working budget: ${values.budget}`,
    '',
    'What they are trying to change:',
    values.brief,
  ].join('\n');
  form.addEventListener('input', event => {
    const name = event.target.name;
    if (name && ['name','email','brief'].includes(name)) setError(name, '');
    if (feedback) feedback.textContent = '';
  });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const values = Object.fromEntries(new FormData(form).entries());
    let valid = true;
    if (String(values.name || '').trim().length < 2) { setError('name', 'Please enter your name.'); valid = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(values.email || '').trim())) { setError('email', 'Enter a valid work email address.'); valid = false; }
    if (String(values.brief || '').trim().length < 12) { setError('brief', 'A sentence or two will help us understand the problem.'); valid = false; }
    if (!valid) {
      if (feedback) feedback.textContent = 'A few details need your attention. We have marked them above.';
      const firstInvalid = form.querySelector('[aria-invalid="true"]');
      firstInvalid?.focus();
      return;
    }
    const brief = formatBrief(values);
    if (config.contactEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.contactEmail)) {
      const subject = encodeURIComponent(`Latent Labs project enquiry / ${values.company || values.name}`);
      const body = encodeURIComponent(brief);
      if (feedback) feedback.textContent = 'Your email draft is opening. Review it and press Send in your mail app. Nothing is sent automatically.';
      window.location.href = `mailto:${encodeURIComponent(config.contactEmail)}?subject=${subject}&body=${body}`;
      return;
    }
    try {
      await navigator.clipboard.writeText(brief);
      if (feedback) feedback.textContent = 'Brief copied to your clipboard. No message has been sent. The studio contact route needs to be configured before launch.';
    } catch {
      const box = document.createElement('textarea');
      box.value = brief; box.setAttribute('readonly', '');
      box.style.position = 'fixed'; box.style.opacity = '0';
      document.body.appendChild(box); box.select();
      const copied = document.execCommand('copy'); box.remove();
      if (feedback) feedback.textContent = copied ? 'Brief copied. No message has been sent. Configure a real studio contact route before launch.' : 'Your brief is ready, but this browser could not copy it. Please copy your form details manually and send them to the studio.';
    }
  });
})();

// No hard-coded year. This is kept in the footer's colophon.
(() => {
  document.querySelectorAll('[data-year]').forEach(node => { node.textContent = String(new Date().getFullYear()); });
  document.querySelectorAll('[data-back-top]').forEach(link => {
    link.addEventListener('click', event => {
      const target = document.getElementById('top');
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
    });
  });
})();
