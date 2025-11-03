import { ObjectId } from 'mongodb';

// ============================================
// CANDIDATE TYPES
// ============================================

export interface Candidate {
  _id?: ObjectId;
  name: string;
  email: string;
  phone: string;
  tier: number; // 0-4
  assessment: Assessment;
  createdAt: Date;
  updatedAt: Date;
}

// ============================================
// ASSESSMENT TYPES
// ============================================

export interface Assessment {
  // Basic Skills
  knowsHtmlCssJs: boolean;
  knowsReactNextjs: boolean;

  // CRUD & Database
  canBuildCrud: boolean;
  crudFrameworks: string[]; // e.g., ["Next.js", "React", "Laravel"]

  // Authentication
  canImplementAuth: boolean;
  canImplementGoogleAuth: boolean;

  // Backend Frameworks
  knowsBackendFramework: boolean;
  backendFrameworks: string[]; // e.g., ["Express", "Hono", "Laravel"]
  canBuildAuthApi: boolean;
  canDocumentApi: boolean;

  // Advanced Skills
  knowsGolang: boolean;
  canBuildGoApi: boolean;
  canIntegrateGoWithFrontend: boolean;
}

// ============================================
// FORM DATA TYPES (for form submission)
// ============================================

export interface RegistrationFormData {
  name: string;
  email: string;
  phone: string;
}

// Assessment form data is the same as Assessment interface
export type AssessmentFormData = Assessment;

// ============================================
// API RESPONSE TYPES
// ============================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface CandidateWithId extends Candidate {
  _id: ObjectId;
}

// ============================================
// FILTER & SORT TYPES
// ============================================

export type TierFilter = 'all' | 0 | 1 | 2 | 3 | 4;

export type SortField = 'name' | 'email' | 'tier' | 'createdAt';
export type SortOrder = 'asc' | 'desc';

export interface DashboardFilters {
  tier: TierFilter;
  sortField: SortField;
  sortOrder: SortOrder;
  searchQuery: string;
}

// ============================================
// TIER DESCRIPTIONS
// ============================================

export const TIER_DESCRIPTIONS = {
  0: {
    name: 'Beginner',
    description:
      'Has done HTML, CSS, and basic JavaScript. Knows the basics of Next.js or React but is not capable of building a CRUD app with a database.',
    color: 'bg-gray-500',
  },
  1: {
    name: 'CRUD Developer',
    description:
      'Can build a CRUD application with a database using server actions or API routes, but cannot add advanced authentication.',
    color: 'bg-blue-500',
  },
  2: {
    name: 'Full-Stack Next.js Developer',
    description:
      'Can build an authenticated (password + Google) CRUD App and deploy it, but lacks knowledge of Express/Hono or other backend frameworks.',
    color: 'bg-green-500',
  },
  3: {
    name: 'Multi-Framework Developer',
    description:
      'Can build authenticated CRUD apps with Next.js and authenticated CRUD APIs with Express/Hono (with documentation), but does not know Golang.',
    color: 'bg-purple-500',
  },
  4: {
    name: 'Advanced Full-Stack Developer',
    description:
      'Proficient in Next.js, Express/Hono, and Golang. Can build simple APIs with Go and integrate them with a frontend.',
    color: 'bg-orange-500',
  },
} as const;
