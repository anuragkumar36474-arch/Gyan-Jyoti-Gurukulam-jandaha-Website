import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Gyan Jyoti Gurukulam',
    short_name: 'Gyan Jyoti',
    description: 'An institution built on trust, modern academic rigor, and traditional values in Jandaha, Vaishali.',
    start_url: '/',
    display: 'standalone',
    background_color: '#050508',
    theme_color: '#050508',
    icons: [
      {
        src: '/logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/logo.png',
        sizes: 'any',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
