import { defineConfig } from 'vitepress'

export default defineConfig({
    title: "Fluxer-Selfbot.js",
    description: "Documentation moderne pour la librairie Fluxer",
    ignoreDeadLinks: true,
    cleanUrls: true,
    themeConfig: {
        nav: [
            { text: 'Accueil', link: '/' },
            { text: 'MCP', link: '/mcp' },
            { text: 'API Reference', link: '/api/' }
        ],
        sidebar: [
            {
                text: 'Introduction',
                items: [
                    { text: 'Installation', link: '/installation' },
                    { text: 'Exemple', link: '/example' },
                    { text: 'AI & MCP', link: '/mcp' }
                ]
            },
            {
                text: 'API Reference',
                items: [
                    { text: 'Guide API', link: '/api/' }
                ]
            }
        ],
        socialLinks: [
            { icon: 'github', link: 'https://github.com/BaguetteUhq1/fluxersb' }
        ],
        footer: {
            message: 'Initialement basé sur l\'API Fluxer',
            copyright: 'Copyright © 2026 Fluxer-Selfbot.js'
        }
    },
    base: '/fluxersb/',
    outDir: '../docs'
})
