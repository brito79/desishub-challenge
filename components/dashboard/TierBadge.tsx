import { Badge } from '@/components/ui/badge';
import { TIER_DESCRIPTIONS } from '@/types';
import { cn } from '@/lib/utils';

interface TierBadgeProps {
  tier: number;
  showName?: boolean;
  className?: string;
}

export function TierBadge({ tier, showName = false, className }: TierBadgeProps) {
  const tierInfo = TIER_DESCRIPTIONS[tier as keyof typeof TIER_DESCRIPTIONS];

  if (!tierInfo) {
    return null;
  }

  return (
    <Badge
      variant="outline"
      className={cn('font-medium', tierInfo.color, className)}
    >
      Tier {tier}{showName && `: ${tierInfo.name}`}
    </Badge>
  );
}
