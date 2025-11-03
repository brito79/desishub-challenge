import { Assessment } from '@/types';

/**
 * Calculate the tier (0-4) based on assessment responses
 * 
 * Tier Logic:
 * - Tier 0: Knows HTML/CSS/JS + React/Next.js basics, but cannot build CRUD
 * - Tier 1: Can build CRUD but cannot implement authentication
 * - Tier 2: Can implement auth in Next.js but doesn't know backend frameworks
 * - Tier 3: Knows backend frameworks (Express/Hono/Laravel) but not Golang
 * - Tier 4: Knows Golang and can build Go APIs
 */
export function calculateTier(assessment: Assessment): number {
  const {
    knowsHtmlCssJs,
    knowsReactNextjs,
    canBuildCrud,
    canImplementAuth,
    canImplementGoogleAuth,
    knowsBackendFramework,
    canBuildAuthApi,
    canDocumentApi,
    knowsGolang,
    canBuildGoApi,
    canIntegrateGoWithFrontend,
  } = assessment;

  // Tier 4: Advanced Full-Stack Developer
  // Knows Golang and can build APIs with it
  if (knowsGolang && canBuildGoApi && canIntegrateGoWithFrontend) {
    return 4;
  }

  // Tier 3: Multi-Framework Developer
  // Knows backend frameworks and can build authenticated CRUD APIs
  // but doesn't know Golang
  if (
    knowsBackendFramework &&
    canBuildAuthApi &&
    canDocumentApi &&
    !knowsGolang
  ) {
    return 3;
  }

  // Tier 2: Full-Stack Next.js Developer
  // Can implement authentication (password + Google) in Next.js
  // but doesn't know backend frameworks OR knows them but can't build auth APIs
  if (
    canImplementAuth &&
    canImplementGoogleAuth &&
    (!knowsBackendFramework || !canBuildAuthApi)
  ) {
    return 2;
  }

  // Tier 1: CRUD Developer
  // Can build CRUD apps but cannot implement authentication
  if (canBuildCrud && (!canImplementAuth || !canImplementGoogleAuth)) {
    return 1;
  }

  // Tier 0: Beginner
  // Knows HTML/CSS/JS and React/Next.js basics
  // but cannot build CRUD apps yet
  if (knowsHtmlCssJs && knowsReactNextjs && !canBuildCrud) {
    return 0;
  }

  // Default fallback: If they don't even know the basics, assign Tier 0
  return 0;
}

/**
 * Get a human-readable explanation of why a candidate was assigned a specific tier
 */
export function getTierReason(assessment: Assessment, tier: number): string {
  switch (tier) {
    case 4:
      return 'You demonstrate advanced proficiency in Next.js, backend frameworks, and Golang, with the ability to build and integrate Go APIs.';
    case 3:
      return 'You can build authenticated CRUD applications and APIs with backend frameworks like Express/Hono/Laravel, but have not yet learned Golang.';
    case 2:
      return 'You can build authenticated CRUD applications with Next.js (including password and Google authentication) and deploy them, but lack experience with backend frameworks.';
    case 1:
      return 'You can build CRUD applications with databases, but have not yet implemented advanced authentication features.';
    case 0:
    default:
      return 'You have knowledge of HTML, CSS, JavaScript, and React/Next.js basics. Continue building projects to advance to the next tier!';
  }
}
