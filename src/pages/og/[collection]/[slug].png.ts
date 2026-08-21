import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection } from 'astro:content';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import satori from 'satori';
import sharp from 'sharp';
import { SITE } from '../../../consts';

interface OgProps {
  title: string;
  description: string;
}

export const getStaticPaths = (async () => {
  const works = await getCollection('works');
  return works.map((entry) => ({
    params: { collection: 'works', slug: entry.id },
    props: {
      title: entry.data.title,
      description: entry.data.description,
    } satisfies OgProps,
  }));
}) satisfies GetStaticPaths;

const require = createRequire(import.meta.url);
const font = (pkgPath: string) => readFile(require.resolve(pkgPath));

const [fraunces, publicSans] = await Promise.all([
  font('@fontsource/fraunces/files/fraunces-latin-600-normal.woff'),
  font('@fontsource/public-sans/files/public-sans-latin-400-normal.woff'),
]);

const truncate = (text: string, max: number) =>
  text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;

export const GET: APIRoute<OgProps> = async ({ props }) => {
  const { title, description } = props;

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
          backgroundColor: '#D7CAF5',
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
                top: -160,
                right: -80,
                width: 500,
                height: 500,
                borderRadius: 999,
                backgroundColor: '#F7E8EA',
              },
            },
          },
          {
            type: 'div',
            props: {
              style: {
                position: 'absolute',
                left: -120,
                bottom: -220,
                width: 500,
                height: 500,
                borderRadius: 999,
                backgroundColor: '#B39FEF',
                opacity: 0.75,
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
                backgroundColor: 'rgba(247,232,234,0.64)',
              },
              children: [
                {
                  type: 'div',
                  props: {
                    style: {
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: 19,
                      textTransform: 'uppercase',
                      letterSpacing: 3,
                    },
                    children: [
                      { type: 'div', props: { children: SITE.title } },
                      { type: 'div', props: { children: 'Personal experiment' } },
                    ],
                  },
                },
                {
                  type: 'div',
                  props: {
                    style: { display: 'flex', flexDirection: 'column', gap: 26, maxWidth: 980 },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: {
                            fontFamily: 'Fraunces',
                            fontSize: title.length > 26 ? 74 : 96,
                            lineHeight: 0.92,
                            letterSpacing: -4.5,
                          },
                          children: truncate(title, 60),
                        },
                      },
                      {
                        type: 'div',
                        props: {
                          style: {
                            maxWidth: 850,
                            fontSize: 27,
                            lineHeight: 1.4,
                            color: '#A23D3D',
                          },
                          children: truncate(description, 145),
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
                      alignItems: 'center',
                      gap: 16,
                      fontSize: 18,
                      textTransform: 'uppercase',
                      letterSpacing: 2.4,
                    },
                    children: [
                      {
                        type: 'div',
                        props: {
                          style: { width: 52, height: 3, backgroundColor: '#A23D3D' },
                        },
                      },
                      { type: 'div', props: { children: 'Work / Kiah Harpool' } },
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
    headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=31536000, immutable' },
  });
};
