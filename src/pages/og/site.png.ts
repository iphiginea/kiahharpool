import type { APIRoute } from 'astro';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import satori from 'satori';
import sharp from 'sharp';
import { SITE } from '../../consts';

const require = createRequire(import.meta.url);
const font = (pkgPath: string) => readFile(require.resolve(pkgPath));

const [fraunces, publicSans] = await Promise.all([
  font('@fontsource/fraunces/files/fraunces-latin-600-normal.woff'),
  font('@fontsource/public-sans/files/public-sans-latin-400-normal.woff'),
]);

export const GET: APIRoute = async () => {
  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#F7E8EA',
          color: '#5A1F4F',
          padding: 52,
          fontFamily: 'Public Sans',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                top: -150,
                right: -80,
                width: 520,
                height: 520,
                borderRadius: 999,
                backgroundColor: '#D7CAF5',
              },
            },
          },
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                right: 80,
                bottom: -180,
                width: 430,
                height: 430,
                borderRadius: 999,
                backgroundColor: '#B39FEF',
                opacity: 0.72,
              },
            },
          },
          {
            type: 'div',
            props: {
              style: {
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                border: '2px solid #5A1F4F',
                borderRadius: 30,
                padding: '42px 48px',
                backgroundColor: 'rgba(247,232,234,0.74)',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      fontSize: 20,
                      textTransform: 'uppercase',
                      letterSpacing: 3,
                    },
                    children: [
                      { type: 'div', props: { children: SITE.title } },
                      { type: 'div', props: { children: 'Chicago / 2026' } },
                    ],
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: { display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 900 },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontFamily: 'Fraunces',
                            fontSize: 92,
                            lineHeight: 0.94,
                            letterSpacing: -5,
                          },
                          children: 'I make things work better.',
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: {
                            maxWidth: 800,
                            fontSize: 28,
                            lineHeight: 1.35,
                            color: '#A23D3D',
                          },
                          children:
                            'Media, strategy, technology, and the systems that make complicated things easier to navigate.',
                        },
                      },
                    ],
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      gap: 22,
                      fontSize: 18,
                      textTransform: 'uppercase',
                      letterSpacing: 2.4,
                    },
                    children: [
                      { type: 'div', props: { children: 'Media' } },
                      { type: 'div', props: { children: '/' } },
                      { type: 'div', props: { children: 'Systems' } },
                      { type: 'div', props: { children: '/' } },
                      { type: 'div', props: { children: 'Experiments' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Fraunces', data: fraunces, weight: 600, style: 'normal' },
        { name: 'Public Sans', data: publicSans, weight: 400, style: 'normal' },
      ],
    },
  );

  const png = await sharp(Buffer.from(svg)).png().toBuffer();
  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
