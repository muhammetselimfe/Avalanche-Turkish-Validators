// vue.config.js
module.exports = {
    pwa: {
        name: 'Avalanche Türkiye',
        themeColor: '#FF394A',
        msTileColor: '#FF394A',
        appleMobileWebAppCapable: 'yes',
        appleMobileWebAppStatusBarStyle: 'black-translucent',
        manifestOptions: {
            start_url: '.',
            display: 'standalone',
            icons: [
                {
                    src: '/img/icons/web-app-manifest-192x192.png',
                    sizes: '192x192',
                    type: 'image/png',
                },
                {
                    src: '/img/icons/web-app-manifest-512x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                },
                {
                    src: "/img/icons/favicon.svg", // Ensure this is included
                    sizes: "any",
                    type: 'image/svg+xml',
                },
            ],
        },
    },
};

