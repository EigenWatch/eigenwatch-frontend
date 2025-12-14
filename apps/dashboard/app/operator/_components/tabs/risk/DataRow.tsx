import { InfoHeading } from '@/components/shared/data/InfoHeading';

export const DataRow = ({
  label,
  value,
  tooltip,
}: {
  label: string;
  value: string | number | null;
  tooltip?: string;
}) => {
  return (
    <div className="flex justify-between items-center py-2">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">{label}</span>
        {tooltip && <InfoHeading heading="" info={tooltip} />}
      </div>
      <span className="text-sm font-mono font-medium">
        {value !== null && value !== undefined ? value : 'N/A'}
      </span>
    </div>
  );
};
