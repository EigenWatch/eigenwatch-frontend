import { InfoTooltip } from "./InfoTooltip";

export function InfoHeading({
  heading,
  info,
}: {
  heading: string;
  info?: string;
}) {
  return (
    <div className="flex items-center gap-2 h-fit">
      <p className="text-[14px] text-muted-foreground ">{heading}</p>
      {info && <InfoTooltip info={info} />}
    </div>
  );
}
