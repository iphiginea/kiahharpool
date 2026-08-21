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

    const firstLightVisual = homepage.querySelector('.kh-firstlight-visual');
    if (firstLightVisual instanceof HTMLElement) {
      const label = firstLightVisual.querySelector('.kh-firstlight-visual-label');
      if (label) label.textContent = 'Sample Chicago chorus';

      const birdList = firstLightVisual.querySelector('.kh-firstlight-bird-list');
      if (birdList) replaceBirdRows(birdList);
    }
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
