import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["fr"],
  defaultLocale: "fr",
  localePrefix: "as-needed",
});

export const config = {
  // matcher: ["/", "/(fr|en)/:path*"],
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
