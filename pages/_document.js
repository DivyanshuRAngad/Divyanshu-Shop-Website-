import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Favicon */}
        <link rel="icon" type="image/png" sizes="32x32" href="/logo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/logo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/logo.png" />
        <link rel="shortcut icon" href="/logo.png" />
        <meta name="msapplication-TileColor" content="#ec4899" />
        <meta name="theme-color" content="#ec4899" />
      </Head>
      <body className="font-sans bg-gray-50 text-gray-800">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
