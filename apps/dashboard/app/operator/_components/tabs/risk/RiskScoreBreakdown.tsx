import { SectionContainer } from '@/components/shared/data/SectionContainer';
import { Separator } from '@/components/ui/separator';
import { OperatorRiskProfile } from '@/types/risk.types';
import { DataRow } from './DataRow';

export const RiskScoreBreakdown = ({ risk }: { risk: OperatorRiskProfile }) => {
  return (
    <SectionContainer heading="Risk Score Breakdown">
      <div className="space-y-4 mt-2">
        <DataRow 
          label="Performance Score" 
          value={`${risk.scores.performance}/100`}
          tooltip="Measures operational reliability, uptime, and service quality"
        />
        <Separator />
        <DataRow 
          label="Economic Security Score" 
          value={`${risk.scores.economic}/100`}
          tooltip="Evaluates financial stability and economic incentive alignment"
        />
        <Separator />
        <DataRow 
          label="Network Position Score" 
          value={`${risk.scores.network_position}/100`}
          tooltip="Assesses the operator's standing and influence within the network"
        />
        <Separator />
        <DataRow 
          label="Confidence Level" 
          value={`${risk.scores.confidence}%`}
          tooltip="Statistical confidence in the risk assessment based on data quality and quantity"
        />
      </div>
    </SectionContainer>
  );
};
