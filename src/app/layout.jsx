import "./globals.css";

export const metadata = {
  title: "مقاضينا | إدارة مقاضي المنازل ومقارنة الأسعار",
  description: "تطبيق لتسهيل تدوين واستقبال وفرز احتياجات المنازل الشهرية والأسبوعية مع مقارنة أقل الأسعار عبر D4D Online",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "مقاضينا",
  },
};

export const viewport = {
  themeColor: "#0d9488",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body className="antialiased selection:bg-teal-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
