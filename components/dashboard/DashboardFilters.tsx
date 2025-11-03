'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface DashboardFiltersProps {
  tierFilter: 'all' | 0 | 1 | 2 | 3 | 4;
  sortField: 'name' | 'email' | 'tier' | 'createdAt';
  sortOrder: 'asc' | 'desc';
  onTierFilterChange: (value: 'all' | 0 | 1 | 2 | 3 | 4) => void;
  onSortFieldChange: (value: 'name' | 'email' | 'tier' | 'createdAt') => void;
  onSortOrderChange: (value: 'asc' | 'desc') => void;
}

export function DashboardFilters({
  tierFilter,
  sortField,
  sortOrder,
  onTierFilterChange,
  onSortFieldChange,
  onSortOrderChange,
}: DashboardFiltersProps) {
  return (
    <div className="flex flex-wrap gap-4">
      <div className="w-full sm:w-auto sm:min-w-[200px]">
        <Label>Filter by Tier</Label>
        <Select
          value={tierFilter.toString()}
          onValueChange={(value) =>
            onTierFilterChange(
              value === 'all' ? 'all' : (parseInt(value) as 0 | 1 | 2 | 3 | 4)
            )
          }
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Tiers</SelectItem>
            <SelectItem value="0">Tier 0 - Beginner</SelectItem>
            <SelectItem value="1">Tier 1 - CRUD Developer</SelectItem>
            <SelectItem value="2">Tier 2 - Full-Stack Next.js</SelectItem>
            <SelectItem value="3">Tier 3 - Multi-Framework</SelectItem>
            <SelectItem value="4">Tier 4 - Advanced</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full sm:w-auto sm:min-w-[200px]">
        <Label>Sort by</Label>
        <Select value={sortField} onValueChange={onSortFieldChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">Name</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="tier">Tier</SelectItem>
            <SelectItem value="createdAt">Date Registered</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-full sm:w-auto sm:min-w-[150px]">
        <Label>Order</Label>
        <Select value={sortOrder} onValueChange={onSortOrderChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="asc">Ascending</SelectItem>
            <SelectItem value="desc">Descending</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
