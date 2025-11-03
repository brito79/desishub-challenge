/**
 * Application-wide constants
 */

// Framework options for CRUD question
export const CRUD_FRAMEWORKS = [
  'Next.js',
  'React',
  'Laravel',
  'Vue.js',
  'Angular',
  'Django',
  'Other',
] as const;

// Backend framework options
export const BACKEND_FRAMEWORKS = [
  'Express.js',
  'Hono',
  'Laravel',
  'NestJS',
  'Fastify',
  'Koa',
  'Other',
] as const;

// Tier colors for badges (Tailwind classes)
export const TIER_COLORS = {
  0: {
    bg: 'bg-gray-100',
    text: 'text-gray-800',
    border: 'border-gray-300',
  },
  1: {
    bg: 'bg-blue-100',
    text: 'text-blue-800',
    border: 'border-blue-300',
  },
  2: {
    bg: 'bg-green-100',
    text: 'text-green-800',
    border: 'border-green-300',
  },
  3: {
    bg: 'bg-purple-100',
    text: 'text-purple-800',
    border: 'border-purple-300',
  },
  4: {
    bg: 'bg-orange-100',
    text: 'text-orange-800',
    border: 'border-orange-300',
  },
} as const;

// Navigation items
export const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Register', href: '/register' },
  { label: 'Dashboard', href: '/dashboard' },
] as const;

// Assessment steps
export const ASSESSMENT_STEPS = [
  'Registration',
  'Basic Skills',
  'CRUD & Database',
  'Authentication',
  'Backend',
  'Advanced',
] as const;
