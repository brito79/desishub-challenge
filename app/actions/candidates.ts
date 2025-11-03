'use server';

import { revalidatePath } from 'next/cache';
import {
  createCandidate,
  getAllCandidates,
  getCandidateById,
  getCandidatesCount,
  getCountByTier,
} from '@/lib/db/candidates';
import { calculateTier, getTierReason } from '@/lib/tier-calculator';
import { candidateSubmissionSchema } from '@/lib/validations';
import { formatErrorResponse } from '@/lib/errors';
import type { ApiResponse, CandidateWithId, DashboardFilters } from '@/types';

/**
 * Submit a new candidate with assessment
 */
export async function submitCandidateAction(
  formData: unknown
): Promise<ApiResponse<{ candidateId: string; tier: number }>> {
  try {
    // Validate input
    const validation = candidateSubmissionSchema.safeParse(formData);
    
    if (!validation.success) {
      return {
        success: false,
        error: 'Invalid form data',
      };
    }

    const { registration, assessment } = validation.data;

    // Calculate tier based on assessment
    const tier = calculateTier(assessment);

    // Create candidate in database
    const candidate = await createCandidate({
      name: registration.name,
      email: registration.email,
      phone: registration.phone,
      tier,
      assessment,
    });

    // Revalidate dashboard to show new candidate
    revalidatePath('/dashboard');

    return {
      success: true,
      data: {
        candidateId: candidate._id.toString(),
        tier,
      },
      message: 'Assessment submitted successfully!',
    };
  } catch (error) {
    console.error('Error submitting candidate:', error);
    return formatErrorResponse(error);
  }
}

/**
 * Get all candidates with optional filters
 */
export async function getCandidatesAction(
  filters?: DashboardFilters
): Promise<ApiResponse<CandidateWithId[]>> {
  try {
    const candidates = await getAllCandidates(filters);

    return {
      success: true,
      data: candidates,
    };
  } catch (error) {
    console.error('Error fetching candidates:', error);
    return formatErrorResponse(error);
  }
}

/**
 * Get a single candidate by ID
 */
export async function getCandidateAction(
  id: string
): Promise<ApiResponse<CandidateWithId & { tierReason: string }>> {
  try {
    const candidate = await getCandidateById(id);

    if (!candidate) {
      return {
        success: false,
        error: 'Candidate not found',
      };
    }

    // Get tier explanation
    const tierReason = getTierReason(candidate.assessment, candidate.tier);

    return {
      success: true,
      data: {
        ...candidate,
        tierReason,
      },
    };
  } catch (error) {
    console.error('Error fetching candidate:', error);
    return formatErrorResponse(error);
  }
}

/**
 * Get dashboard statistics
 */
export async function getDashboardStatsAction(): Promise<
  ApiResponse<{
    totalCandidates: number;
    tierCounts: Record<number, number>;
  }>
> {
  try {
    const totalCandidates = await getCandidatesCount();
    const tierCounts = await getCountByTier();

    return {
      success: true,
      data: {
        totalCandidates,
        tierCounts,
      },
    };
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    return formatErrorResponse(error);
  }
}
