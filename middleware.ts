import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  // Liste des langues supportées
  locales: ['en', 'fr'],
  // Langue par défaut
  defaultLocale: 'en',
  localeDetection: true,
});
 
export const config = {
  // Matcher ignorant les chemins qui ne doivent pas être internationalisés
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};