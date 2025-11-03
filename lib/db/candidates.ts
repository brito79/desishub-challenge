import { ObjectId } from 'mongodb';
import { getDb, COLLECTIONS } from './mongodb';
import { Candidate, CandidateWithId, DashboardFilters } from '@/types';

/**
 * Database operations for candidates
 */

// Create a new candidate
export async function createCandidate(
  candidateData: Omit<Candidate, '_id' | 'createdAt' | 'updatedAt'>
): Promise<CandidateWithId> {
  const db = await getDb();
  const collection = db.collection<Candidate>(COLLECTIONS.CANDIDATES);

  const candidate: Candidate = {
    ...candidateData,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const result = await collection.insertOne(candidate);

  return {
    ...candidate,
    _id: result.insertedId,
  };
}

// Get a candidate by ID
export async function getCandidateById(id: string): Promise<CandidateWithId | null> {
  const db = await getDb();
  const collection = db.collection<Candidate>(COLLECTIONS.CANDIDATES);

  const candidate = await collection.findOne({ _id: new ObjectId(id) });

  return candidate as CandidateWithId | null;
}

// Get a candidate by email
export async function getCandidateByEmail(email: string): Promise<CandidateWithId | null> {
  const db = await getDb();
  const collection = db.collection<Candidate>(COLLECTIONS.CANDIDATES);

  const candidate = await collection.findOne({ email });

  return candidate as CandidateWithId | null;
}

// Get all candidates with filtering and sorting
export async function getAllCandidates(filters?: DashboardFilters): Promise<CandidateWithId[]> {
  const db = await getDb();
  const collection = db.collection<Candidate>(COLLECTIONS.CANDIDATES);

  // Build query
  const query: Record<string, unknown> = {};

  // Filter by tier
  if (filters?.tier && filters.tier !== 'all') {
    query.tier = filters.tier;
  }

  // Search by name or email
  if (filters?.searchQuery) {
    query.$or = [
      { name: { $regex: filters.searchQuery, $options: 'i' } },
      { email: { $regex: filters.searchQuery, $options: 'i' } },
    ];
  }

  // Build sort
  const sortField = filters?.sortField || 'createdAt';
  const sortOrder = filters?.sortOrder === 'asc' ? 1 : -1;

  const candidates = await collection
    .find(query)
    .sort({ [sortField]: sortOrder })
    .toArray();

  return candidates as CandidateWithId[];
}

// Get total count of candidates
export async function getCandidatesCount(): Promise<number> {
  const db = await getDb();
  const collection = db.collection<Candidate>(COLLECTIONS.CANDIDATES);

  return await collection.countDocuments();
}

// Get count by tier
export async function getCountByTier(): Promise<Record<number, number>> {
  const db = await getDb();
  const collection = db.collection<Candidate>(COLLECTIONS.CANDIDATES);

  const result = await collection
    .aggregate([
      {
        $group: {
          _id: '$tier',
          count: { $sum: 1 },
        },
      },
    ])
    .toArray();

  const tierCounts: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0 };

  result.forEach((item) => {
    tierCounts[item._id as number] = item.count;
  });

  return tierCounts;
}

// Update a candidate
export async function updateCandidate(
  id: string,
  updates: Partial<Omit<Candidate, '_id' | 'createdAt'>>
): Promise<boolean> {
  const db = await getDb();
  const collection = db.collection<Candidate>(COLLECTIONS.CANDIDATES);

  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    {
      $set: {
        ...updates,
        updatedAt: new Date(),
      },
    }
  );

  return result.modifiedCount > 0;
}

// Delete a candidate
export async function deleteCandidate(id: string): Promise<boolean> {
  const db = await getDb();
  const collection = db.collection<Candidate>(COLLECTIONS.CANDIDATES);

  const result = await collection.deleteOne({ _id: new ObjectId(id) });

  return result.deletedCount > 0;
}

// Check if email already exists
export async function emailExists(email: string): Promise<boolean> {
  const candidate = await getCandidateByEmail(email);
  return candidate !== null;
}
