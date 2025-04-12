import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import compressor from "astro-compressor";
import starlight from "@astrojs/starlight";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  // Site URL'si güncellendi
  site: "https://krafferoasters.com",
  image: {
    // Alan adlarını gerektiği gibi güncelleyebilirsiniz
    domains: ["images.unsplash.com"],
  },
  // i18n yapılandırması genellikle sitemap ve starlight gibi entegrasyonlar içinde yönetilir
  // Bu yüzden buradaki yorumlu bloğu kaldırabilir veya bırakabilirsiniz.
  // i18n: {
  //   defaultLocale: "en",
  //   locales: ["en", "fr"],
  //   fallback: {
  //     fr: "en",
  //   },
  //   routing: {
  //     prefixDefaultLocale: false,
  //   },
  // },
  prefetch: true,
  integrations: [
    sitemap({ // Sitemap i18n Ayarları Güncellendi
      i18n: {
        defaultLocale: "en", // Varsayılan dil İngilizce
        locales: {
          en: "en-US",       // İngilizce (Amerika Birleşik Devletleri) - veya sadece "en"
          fr: "fr-FR",       // Fransızca (Fransa) - veya sadece "fr"
          es: "es-ES",       // İspanyolca (İspanya) - veya sadece "es"
          ru: "ru-RU",       // Rusça (Rusya) - veya sadece "ru"
        },
      },
    }),
    starlight({ // Starlight i18n Ayarları Güncellendi
      title: "Kraffe Roasters Docs", // Dokümantasyon Başlığı (İngilizce)
      defaultLocale: "root", // İngilizce'yi temsil eder
      locales: {
        root: { label: "English", lang: "en" },   // İngilizce
        fr: { label: "Français", lang: "fr" },   // Fransızca
        es: { label: "Español", lang: "es" },    // İspanyolca (Yeni)
        ru: { label: "Русский", lang: "ru" },     // Rusça (Yeni)
        // Şablondan gelen diğer dilleri isterseniz kaldırabilirsiniz
        // de: { label: "Deutsch", lang: "de" },
        // ja: { label: "日本語", lang: "ja" },
        // "zh-cn": { label: "简体中文", lang: "zh-CN" },
        // fa: { label: "Persian", lang: "fa", dir: "rtl" },
      },
      // Starlight Sidebar (Kenar Çubuğu) - Çevirileri eklemelisiniz
      sidebar: [
        {
          label: "Quick Start Guides", // İngilizce etiket
          translations: { // Diğer diller için çeviriler
            fr: "Guides de Démarrage Rapide",
            es: "Guías de Inicio Rápido", // İspanyolca çeviri ekleyin
            ru: "Краткие руководства",   // Rusça çeviri ekleyin
            // de: "Schnellstartanleitungen", // Almanca (isterseniz)
            // ja: "クイックスタートガイド", // Japonca (isterseniz)
            // "zh-cn": "快速入门指南", // Çince (isterseniz)
            // fa: "راهنمای شروع سریع", // Farsça (isterseniz)
          },
          autogenerate: { directory: "guides" }, // İçeriğin bulunduğu klasör
        },
        {
          label: "Roasting Machines", // Kenar çubuğu bölüm adı (İngilizce)
          // Buraya da translations ekleyebilirsiniz
          // translations: { fr: 'Machines à Torréfier', es: 'Máquinas Tostadoras', ru: 'Обжарочные машины'},
          items: [
            // Öğeleri buraya ekleyin, örn:
            // { label: "KRF-S Series", link: "/machines/krf-s/"},
            // { label: "KRF-I Series", link: "/machines/krf-i/"},
          ],
        },
        {
          label: "Maintenance & Support", // Kenar çubuğu bölüm adı (İngilizce)
          // Buraya da translations ekleyebilirsiniz
          // translations: { fr: 'Maintenance & Support', es: 'Mantenimiento y Soporte', ru: 'Обслуживание и поддержка'},
          autogenerate: { directory: "support" }, // Örnek klasör adı
        },
        // Diğer kenar çubuğu öğeleri...
      ],
      social: {
        // GitHub linkinizi buraya ekleyin
        github: "https://github.com/kullaniciadiniz/krafferoasters-repo", // GÜNCELLEYİN
      },
      disable404Route: true, // Genellikle önerilir
      customCss: [
        // Özel CSS dosyalarınız
        "./src/assets/styles/starlight.css"
      ],
      favicon: "/favicon.ico", // Favicon yolu
      components: { // Özel Starlight bileşenleriniz
        SiteTitle: "./src/components/ui/starlight/SiteTitle.astro",
        Head: "./src/components/ui/starlight/Head.astro",
        MobileMenuFooter: "./src/components/ui/starlight/MobileMenuFooter.astro",
        ThemeSelect: "./src/components/ui/starlight/ThemeSelect.astro",
      },
      head: [ // head etiketine eklenecek ek meta etiketleri vb.
        {
          tag: "meta",
          attrs: {
            property: "og:image",
            // Sosyal medya görseli URL'sini güncelleyin
            content: "https://krafferoasters.com/social.png", // GÜNCELLEYİN
          },
        },
        {
          tag: "meta",
          attrs: {
            property: "twitter:image",
            // Sosyal medya görseli URL'sini güncelleyin
            content: "https://krafferoasters.com/social.png", // GÜNCELLEYİN
          },
        },
      ],
    }),
    compressor({ // Sıkıştırma ayarları
      gzip: false,
      brotli: true,
    }),
    mdx() // MDX desteği
  ],
  experimental: {
    clientPrerender: true, // İstemci tarafı ön-oluşturma (isteğe bağlı)
  },
  vite: {
    plugins: [tailwindcss()], // Tailwind CSS entegrasyonu
  },
});
