'use client';

import { useEffect, useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { CandidateTable } from '@/components/dashboard/CandidateTable';
import { DashboardFilters } from '@/components/dashboard/DashboardFilters';
import { StatCard } from '@/components/dashboard/StatCard';
import { getCandidatesAction, getDashboardStatsAction } from '@/app/actions/candidates';
import type { CandidateWithId, DashboardFilters as Filters } from '@/types';
import { Users, TrendingUp, Search } from 'lucide-react';

export default function DashboardPage() {
  const [candidates, setCandidates] = useState<CandidateWithId[]>([]);
  const [stats, setStats] = useState({ totalCandidates: 0, tierCounts: {} as Record<number, number> });
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<Filters>({
    tier: 'all',
    sortField: 'createdAt',
    sortOrder: 'desc',
    searchQuery: '',
  });

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const [candidatesResult, statsResult] = await Promise.all([
        getCandidatesAction(),
        getDashboardStatsAction(),
      ]);

      if (candidatesResult.success && candidatesResult.data) {
        setCandidates(candidatesResult.data);
      }

      if (statsResult.success && statsResult.data) {
        setStats(statsResult.data);
      }

      setIsLoading(false);
    }

    fetchData();
  }, []);

  const filteredCandidates = useMemo(() => {
    let filtered = [...candidates];

    // Filter by tier
    if (filters.tier !== 'all') {
      filtered = filtered.filter((c) => c.tier === filters.tier);
    }

    // Search by name or email
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.name.toLowerCase().includes(query) ||
          c.email.toLowerCase().includes(query)
      );
    }

    // Sort
    filtered.sort((a, b) => {
      const field = filters.sortField;
      let aVal = a[field];
      let bVal = b[field];

      if (field === 'createdAt') {
        aVal = new Date(aVal as Date).getTime();
        bVal = new Date(bVal as Date).getTime();
      }

      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return filters.sortOrder === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }

      if (filters.sortOrder === 'asc') {
        return (aVal as number) - (bVal as number);
      }
      return (bVal as number) - (aVal as number);
    });

    return filtered;
  }, [candidates, filters, searchQuery]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Candidate Dashboard</h1>
        <p className="text-muted-foreground">
          View and manage all registered candidates
        </p>
      </div>

      {/* Statistics */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Candidates"
          value={stats.totalCandidates}
          icon={Users}
          description="All registered candidates"
        />
        <StatCard
          title="Tier 0 (Beginners)"
          value={stats.tierCounts[0] || 0}
          icon={TrendingUp}
        />
        <StatCard
          title="Tier 1-2"
          value={(stats.tierCounts[1] || 0) + (stats.tierCounts[2] || 0)}
          icon={TrendingUp}
        />
        <StatCard
          title="Tier 3-4 (Advanced)"
          value={(stats.tierCounts[3] || 0) + (stats.tierCounts[4] || 0)}
          icon={TrendingUp}
        />
      </div>

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Filter & Sort</CardTitle>
          <CardDescription>
            Customize your view of the candidate list
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <DashboardFilters
            tierFilter={filters.tier}
            sortField={filters.sortField}
            sortOrder={filters.sortOrder}
            onTierFilterChange={(tier) => setFilters({ ...filters, tier })}
            onSortFieldChange={(sortField) => setFilters({ ...filters, sortField })}
            onSortOrderChange={(sortOrder) => setFilters({ ...filters, sortOrder })}
          />

          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Candidates Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            Candidates ({filteredCandidates.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <CandidateTable candidates={filteredCandidates} />
        </CardContent>
      </Card>
    </div>
  );
}
