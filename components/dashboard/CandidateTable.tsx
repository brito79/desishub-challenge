'use client';

import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { TierBadge } from './TierBadge';
import { CandidateWithId } from '@/types';
import { formatDate } from 'date-fns';
import { Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CandidateTableProps {
  candidates: CandidateWithId[];
}

export function CandidateTable({ candidates }: CandidateTableProps) {
  if (candidates.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-12 text-center">
        <p className="text-muted-foreground">No candidates found</p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Tier</TableHead>
            <TableHead>Registered</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {candidates.map((candidate) => (
            <TableRow key={candidate._id.toString()}>
              <TableCell className="font-medium">{candidate.name}</TableCell>
              <TableCell>{candidate.email}</TableCell>
              <TableCell>{candidate.phone}</TableCell>
              <TableCell>
                <TierBadge tier={candidate.tier} />
              </TableCell>
              <TableCell className="text-muted-foreground">
                {formatDate(new Date(candidate.createdAt), 'MMM d, yyyy')}
              </TableCell>
              <TableCell className="text-right">
                <Link href={`/candidates/${candidate._id.toString()}`}>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Eye className="h-4 w-4" />
                    View
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
