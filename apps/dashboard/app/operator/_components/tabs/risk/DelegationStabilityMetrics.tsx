import { SectionContainer } from '@/components/shared/data/SectionContainer';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';
import { OperatorRiskProfile } from '@/types/risk.types';
import { MetricCard } from './MetricCard';
import { formatVolatility, formatPercent } from './utils';

export const DelegationStabilityMetrics = ({ risk }: { risk: OperatorRiskProfile }) => {
  // HHI interpretation
  const hhiLevel = 
    risk.metrics.delegation.hhi < 0.1 ? 'Excellent' :
    risk.metrics.delegation.hhi < 0.15 ? 'Good' :
    risk.metrics.delegation.hhi < 0.25 ? 'Moderate' : 'Concentrated';
  
  const hhiColor = 
    risk.metrics.delegation.hhi < 0.1 ? 'bg-green-500' :
    risk.metrics.delegation.hhi < 0.15 ? 'bg-blue-500' :
    risk.metrics.delegation.hhi < 0.25 ? 'bg-yellow-500' : 'bg-red-500';

  // Volatility interpretation
  const vol = risk.metrics.delegation.volatility_30d;
  const volLevel = vol < 0.01 ? 'Rock Solid' : vol < 0.05 ? 'Stable' : vol < 0.1 ? 'Moderate' : 'Volatile';
  const volStatus: 'success' | 'info' | 'warning' | 'danger' = 
    vol < 0.01 ? 'success' : vol < 0.05 ? 'info' : vol < 0.1 ? 'warning' : 'danger';

  // Size interpretation
  const sizeLabel = 
    risk.metrics.delegation.size_percentile >= 90 ? 'Top 10% Operator' :
    risk.metrics.delegation.size_percentile >= 75 ? 'Large Operator' :
    risk.metrics.delegation.size_percentile >= 50 ? 'Above Median' :
    risk.metrics.delegation.size_percentile >= 25 ? 'Below Median' : 'Small Operator';

  // Growth interpretation
  const growthRate = risk.metrics.delegation.growth_rate_30d;
  const isGrowing = growthRate > 0.02;
  const isShrinking = growthRate < -0.02;

  // Distribution CV interpretation
  const cvLevel = 
    risk.metrics.delegation.distribution_cv < 0.3 ? 'Very Consistent' :
    risk.metrics.delegation.distribution_cv < 0.5 ? 'Consistent' :
    risk.metrics.delegation.distribution_cv < 0.8 ? 'Variable' : 'Highly Variable';

  return (
    <SectionContainer heading="Delegation Stability Metrics">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <MetricCard
          label="Delegation Volatility"
          value={volLevel}
          context={`30-day standard deviation: ${formatVolatility(vol)}`}
          badge={
            <Badge
              variant={volStatus === 'success' ? 'default' : 'secondary'}
              className={
                volStatus === 'success'
                  ? 'bg-green-500/10 text-green-600 border-green-500/20'
                  : volStatus === 'info'
                  ? 'bg-blue-500/10 text-blue-600 border-blue-500/20'
                  : volStatus === 'warning'
                  ? 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20'
                  : 'bg-red-500/10 text-red-600 border-red-500/20'
              }
            >
              {volLevel}
            </Badge>
          }
          tooltip="Measures how much delegation amounts fluctuate. Lower is better - indicates stable, predictable delegation."
          rawValue={vol.toExponential(2)}
        />

        <MetricCard
          label="Growth Trajectory"
          value={
            <div className="flex items-center gap-2">
              {isGrowing ? (
                <TrendingUp className="h-6 w-6 text-green-600" />
              ) : isShrinking ? (
                <TrendingDown className="h-6 w-6 text-red-600" />
              ) : (
                <Activity className="h-6 w-6 text-muted-foreground" />
              )}
              <span
                className={
                  isGrowing
                    ? 'text-green-600'
                    : isShrinking
                    ? 'text-red-600'
                    : ''
                }
              >
                {growthRate > 0 ? '+' : ''}
                {formatPercent(growthRate)}
              </span>
            </div>
          }
          context={
            isGrowing
              ? 'Strong upward momentum'
              : isShrinking
              ? 'Declining delegation'
              : 'Stable delegation levels'
          }
          tooltip="30-day change in total delegation amount. Positive indicates growth, negative indicates decline."
        />

        <MetricCard
          label="Delegation Concentration"
          value={hhiLevel}
          context={`HHI Score: ${risk.metrics.delegation.hhi.toFixed(4)}`}
          badge={
            <div className="flex items-center gap-2">
              <div className={`h-3 w-3 rounded-full ${hhiColor}`} />
              <span className="text-xs text-muted-foreground">
                {risk.metrics.delegation.hhi < 0.15 ? 'Well Distributed' : 'Needs Attention'}
              </span>
            </div>
          }
          tooltip="Herfindahl-Hirschman Index measures delegation concentration. Lower values (<0.15) indicate better distribution across delegators."
          rawValue={risk.metrics.delegation.hhi.toFixed(6)}
        />

        <MetricCard
          label="Network Position"
          value={sizeLabel}
          context={`${risk.metrics.delegation.size_percentile}th percentile by size`}
          badge={
            <Badge variant="outline">
              {risk.metrics.delegation.size_percentile >= 75 ? '⭐ Top Tier' : '📊 Standard'}
            </Badge>
          }
          tooltip="Operator's relative size compared to all operators in the network. Higher percentile means larger operator."
        />

        <MetricCard
          label="Distribution Consistency"
          value={cvLevel}
          context={`Coefficient of Variation: ${risk.metrics.delegation.distribution_cv.toFixed(4)}`}
          badge={
            <Badge 
              variant="outline"
              className={
                risk.metrics.delegation.distribution_cv < 0.5 
                  ? 'bg-green-500/10 text-green-600 border-green-500/20'
                  : 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20'
              }
            >
              {cvLevel}
            </Badge>
          }
          tooltip="Measures the variability in delegation distribution. Lower values indicate more uniform distribution among delegators."
        />
      </div>
    </SectionContainer>
  );
};
