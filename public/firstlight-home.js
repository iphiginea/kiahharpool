function firstLightBasePath() {
  const home = document.querySelector('a.brand')?.getAttribute('href') || '/';
  return home.endsWith('/') ? home : `${home}/`;
}

function mountFirstLight() {
  const pair = document.querySelector('.kh-project-pair');

  if (pair && !document.querySelector('.kh-mini-project-firstlight')) {
    const caseHref = `${firstLightBasePath()}works/first-light/`;
    const card = document.createElement('article');
    card.className = 'kh-mini-project kh-mini-project-firstlight';
    card.innerHTML = `
      <div class="kh-firstlight-copy">
        <div class="kh-mini-project-topline">
          <span>05 / FIRST LIGHT</span>
          <span>PRODUCT / NATURE / LOCATION-AWARE AUDIO</span>
        </div>

        <div class="kh-mini-project-body">
          <span class="kh-project-role">Concept / Product Design / Development</span>
          <h3 class="kh-firstlight-wordmark" aria-label="First Light">
            <span class="kh-flight-f">F</span><span class="kh-flight-irst">irst</span> <span class="kh-flight-light">LIGHT</span>
          </h3>
          <p class="kh-firstlight-equation" aria-hidden="true">F + LIGHT = FLIGHT</p>
          <p class="kh-mini-project-deck">Five birds, wherever you are, whatever the season.</p>
          <p class="kh-mini-project-description">
            A location-aware dawn chorus that uses recent nearby bird sightings to choose five species,
            then pairs them with real field recordings to build an ambient soundscape for that place.
          </p>
          <p class="kh-mini-project-why"><strong>Why:</strong> I wanted a dawn chorus that changes with where you are — not a fixed playlist pretending every morning sounds the same.</p>
        </div>

        <div class="kh-mini-project-footer">
          <div class="kh-mini-tags" aria-label="First Light features">
            <span>LOCATION</span>
            <span>BIRDSONG</span>
            <span>AMBIENT AUDIO</span>
          </div>
          <div class="kh-mini-actions">
            <a class="kh-pill" href="${caseHref}">Case study →</a>
            <a class="kh-text-link" href="https://github.com/iphiginea/FirstLIGHT" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          </div>
        </div>
      </div>

      <div class="kh-firstlight-visual" aria-hidden="true">
        <div class="kh-firstlight-stars">
          <i></i><i></i><i></i><i></i><i></i><i></i><i></i>
        </div>
        <p class="kh-firstlight-visual-label">Listening for what’s nearby…</p>
        <div class="kh-firstlight-bird-list">
          <span><i></i>01 / RECENT + LOCAL</span>
          <span><i></i>02 / RECENT + LOCAL</span>
          <span><i></i>03 / RECENT + LOCAL</span>
          <span><i></i>04 / RECENT + LOCAL</span>
          <span><i></i>05 / RECENT + LOCAL</span>
        </div>
      </div>
    `;

    pair.insertAdjacentElement('afterend', card);
  }

  const currentBuilding = Array.from(document.querySelectorAll('.kh-current-meta dd')).find((node) =>
    node.textContent?.includes('Duel Cut / Encore'),
  );
  if (currentBuilding && !currentBuilding.textContent?.includes('First Light')) {
    currentBuilding.textContent = 'Duel Cut / Encore / First Light';
  }

  document.querySelectorAll('.kh-about-facts h3').forEach((heading) => {
    if (heading.textContent?.includes('Duel Cut / Encore / Duel Draw / Points') && !heading.textContent.includes('First Light')) {
      heading.textContent = 'Duel Cut / Encore / Duel Draw / Points / First Light';
    }
  });
}

document.addEventListener('astro:page-load', mountFirstLight);

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountFirstLight, { once: true });
} else {
  mountFirstLight();
}
