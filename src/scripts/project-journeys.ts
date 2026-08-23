const sampleBirds = [
  'EASTERN KINGBIRD',
  'PIPING PLOVER',
  'EASTERN WOOD PEEWEE',
  'DOUBLE CRESTED CORMORANT',
  'BLACK AND WHITE WARBLER',
];

const replaceBirdRows = (root: Element) => {
  const rows = root.querySelectorAll('span');

  rows.forEach((row, index) => {
    const bird = sampleBirds[index];
    if (!bird) return;

    const marker = row.querySelector('i');
    row.replaceChildren();
    if (marker) row.appendChild(marker);
    row.appendChild(document.createTextNode(`${String(index + 1).padStart(2, '0')} / ${bird}`));
  });
};

const addAcquiredCard = (homepage: HTMLElement, worksBase: URL) => {
  if (homepage.querySelector('.acq-home-card')) return;

  const firstLightCard = homepage.querySelector('.kh-mini-project-firstlight');
  if (!(firstLightCard instanceof HTMLElement)) return;

  const acquiredHref = new URL('acquired/', worksBase).href;
  const card = document.createElement('article');
  card.className = 'acq-home-card';
  card.innerHTML = `
    <div class="acq-home-copy">
      <div class="acq-home-topline">
        <span>06 / ACQUIRED</span>
        <span>PRODUCT / ARCHIVE / COLLECTION SYSTEMS</span>
      </div>

      <div class="acq-home-body">
        <span class="acq-home-role">Personal experiment / Concept + Build</span>
        <span class="acq-home-accession">KH.2026.0006 / PERMANENT COLLECTION</span>
        <h3 class="acq-home-title"><a href="${acquiredHref}">ACQUIRED</a></h3>
        <p class="acq-home-deck">Your life, in objects.</p>
        <p class="acq-home-description">
          A personal museum for accessioning meaningful objects with photographs, provenance,
          catalog records, and the story of why each thing matters.
        </p>
        <p class="acq-home-why">
          <strong>Why:</strong> I wanted the stories attached to ordinary objects to have somewhere to
          live before the context around them disappears.
        </p>
      </div>

      <div class="acq-home-footer">
        <div class="acq-home-tags" aria-label="Acquired features">
          <span>ACCESSIONING</span>
          <span>PROVENANCE</span>
          <span>PERSONAL ARCHIVE</span>
        </div>
        <div class="acq-home-actions">
          <a class="acq-home-primary" href="${acquiredHref}">See experiment →</a>
          <a
            class="acq-home-link"
            href="https://iphiginea.github.io/acquired/"
            target="_blank"
            rel="noopener noreferrer"
          >Open app ↗</a>
        </div>
      </div>
    </div>

    <div class="acq-home-visual" aria-hidden="true">
      <div class="acq-home-record-head">
        <span>Object record</span>
        <span>Permanent collection</span>
      </div>
      <div class="acq-home-record">
        <strong>KH.2026.0001</strong>
        <div class="acq-home-field">
          <span>Object</span>
          <span>The thing worth remembering</span>
        </div>
        <div class="acq-home-field">
          <span>Maker</span>
          <span>Recorded when known</span>
        </div>
        <div class="acq-home-field">
          <span>Materials</span>
          <span>Part of the permanent record</span>
        </div>
        <div class="acq-home-field">
          <span>Provenance</span>
          <span>Where it came from and who had it before</span>
        </div>
        <div class="acq-home-field acq-home-field-significance">
          <span>Significance</span>
          <span>Why this belongs in your collection.</span>
        </div>
      </div>
    </div>
  `;

  firstLightCard.insertAdjacentElement('afterend', card);
};

const enhanceProjectJourneys = () => {
  const workLink = document.querySelector('.footer-links a[href*="/works/"]');
  const worksBase = workLink instanceof HTMLAnchorElement ? new URL(workLink.href) : null;
  const homepage = document.querySelector('.kh-work');

  if (homepage instanceof HTMLElement && worksBase) {
    const projects = [
      {
        label: 'DUEL CUT',
        slug: 'duel-cut',
        app: 'https://iphiginea.github.io/duelcut/',
      },
      {
        label: 'ENCORE',
        slug: 'encore',
        app: 'https://iphiginea.github.io/encore/',
      },
      {
        label: 'DUEL DRAW',
        slug: 'duel-draw',
        app: 'https://iphiginea.github.io/dueldraw/duel-draw.html',
      },
      {
        label: 'POINTS',
        slug: 'points',
        app: 'https://iphiginea.github.io/points/',
      },
      {
        label: 'FIRST LIGHT',
        slug: 'first-light',
        app: 'https://iphiginea.github.io/FirstLIGHT/',
      },
      {
        label: 'LAKEGLASS',
        slug: 'lakeglass',
        app: 'https://iphiginea.github.io/lakeglass/',
      },
    ];

    const cards = Array.from(homepage.querySelectorAll('article'));

    for (const project of projects) {
      const card = cards.find((item) =>
        item
          .querySelector('.kh-project-topline, .kh-mini-project-topline')
          ?.textContent?.includes(project.label),
      );
      if (!(card instanceof HTMLElement)) continue;

      const projectHref = new URL(`${project.slug}/`, worksBase).href;
      const actions = card.querySelector('.kh-project-actions, .kh-mini-actions');

      if (actions instanceof HTMLElement) {
        const primary = actions.querySelector('.kh-pill');
        if (primary instanceof HTMLAnchorElement) {
          primary.href = projectHref;
          primary.textContent = 'See experiment →';
          primary.removeAttribute('target');
          primary.removeAttribute('rel');
        }

        const secondary = actions.querySelector('.kh-text-link');
        if (secondary instanceof HTMLAnchorElement) {
          secondary.href = project.app;
          secondary.textContent = 'Open app ↗';
          secondary.target = '_blank';
          secondary.rel = 'noopener noreferrer';
        }
      }

      const heading = card.querySelector('h3');
      if (heading instanceof HTMLHeadingElement && !heading.querySelector('a')) {
        const link = document.createElement('a');
        link.className = 'kh-project-title-link';
        link.href = projectHref;
        link.textContent = heading.textContent?.trim() ?? project.label;
        heading.replaceChildren(link);
      }
    }

    const firstLightHeading = homepage.querySelector('.kh-firstlight-wordmark');
    if (firstLightHeading instanceof HTMLHeadingElement && !firstLightHeading.querySelector('a')) {
      const link = document.createElement('a');
      link.className = 'kh-firstlight-title-link';
      link.href = new URL('first-light/', worksBase).href;
      while (firstLightHeading.firstChild) link.appendChild(firstLightHeading.firstChild);
      firstLightHeading.appendChild(link);
    }

    const firstLightVisual = homepage.querySelector('.kh-firstlight-visual');
    if (firstLightVisual instanceof HTMLElement) {
      const label = firstLightVisual.querySelector('.kh-firstlight-visual-label');
      if (label) label.textContent = 'Sample Chicago chorus';

      const birdList = firstLightVisual.querySelector('.kh-firstlight-bird-list');
      if (birdList) replaceBirdRows(birdList);
    }

    addAcquiredCard(homepage, worksBase);

    const lakeglassNumber = homepage.querySelector(
      '.kh-mini-project-lakeglass .kh-mini-project-topline span:first-child',
    );
    if (lakeglassNumber) lakeglassNumber.textContent = '07 / LAKEGLASS';
  }

  const firstLightCase = document.querySelector('.kh-case-firstlight');
  if (firstLightCase instanceof HTMLElement) {
    const previewLabel = firstLightCase.querySelector(
      '.kh-firstlight-preview-copy > p:first-child',
    );
    if (previewLabel) previewLabel.textContent = 'SAMPLE CHICAGO DAWN CHORUS';

    const birdList = firstLightCase.querySelector('.kh-firstlight-birds');
    if (birdList) replaceBirdRows(birdList);
  }
};

document.addEventListener('astro:page-load', enhanceProjectJourneys);
enhanceProjectJourneys();
