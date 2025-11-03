import { z } from 'zod';

// ============================================
// REGISTRATION VALIDATION SCHEMA
// ============================================

export const registrationSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  email: z.string().email('Invalid email address'),
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number is too long')
    .regex(/^[0-9+\-() ]+$/, 'Invalid phone number format'),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;

// ============================================
// ASSESSMENT VALIDATION SCHEMA
// ============================================

export const assessmentSchema = z.object({
  // Basic Skills
  knowsHtmlCssJs: z.boolean(),
  knowsReactNextjs: z.boolean(),

  // CRUD & Database
  canBuildCrud: z.boolean(),
  crudFrameworks: z.array(z.string()),

  // Authentication
  canImplementAuth: z.boolean(),
  canImplementGoogleAuth: z.boolean(),

  // Backend Frameworks
  knowsBackendFramework: z.boolean(),
  backendFrameworks: z.array(z.string()),
  canBuildAuthApi: z.boolean(),
  canDocumentApi: z.boolean(),

  // Advanced Skills
  knowsGolang: z.boolean(),
  canBuildGoApi: z.boolean(),
  canIntegrateGoWithFrontend: z.boolean(),
});

export type AssessmentInput = z.infer<typeof assessmentSchema>;

// ============================================
// COMPLETE CANDIDATE SUBMISSION SCHEMA
// ============================================

export const candidateSubmissionSchema = z.object({
  registration: registrationSchema,
  assessment: assessmentSchema,
});

export type CandidateSubmission = z.infer<typeof candidateSubmissionSchema>;
