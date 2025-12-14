import { Metadata } from "next";
import { getOperator } from "@/actions/operators";
import OperatorProfile from "../_components/OperatorProfile";

interface Props {
  params: Promise<{ operator_id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { operator_id } = await params;
  const { data: apiResponse } = await getOperator(operator_id);
  const operator = apiResponse?.data;

  if (!operator) {
    return {
      title: "Operator Not Found",
    };
  }

  return {
    title: operator.metadata?.name || "Operator Profile",
    description: operator.metadata?.description || `View risk analysis and performance metrics for ${operator.metadata?.name || "this operator"} on EigenWatch.`,
    openGraph: {
      title: `${operator.metadata?.name || "Operator"} - EigenWatch Risk Analysis`,
      description: operator.metadata?.description || `View risk analysis and performance metrics for ${operator.metadata?.name || "this operator"} on EigenWatch.`,
      images: operator.metadata?.logo ? [operator.metadata.logo] : [],
    },
  };
}

export default async function OperatorProfilePage({ params }: Props) {
  const { operator_id } = await params;
  // We fetch here again for JSON-LD. Next.js request deduplication might handle this if it was a fetch,
  // but since it's a server action wrapper around axios/fetch, we rely on the implementation.
  // Even if double fetch, it's acceptable for this SEO task.
  const { data: apiResponse } = await getOperator(operator_id);
  const operator = apiResponse?.data;

  const jsonLd = operator ? {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: operator.metadata?.name,
    description: operator.metadata?.description,
    logo: operator.metadata?.logo,
    url: `https://dashboard.eigenwatch.xyz/operator/${operator_id}`,
  } : null;

  return (
    <>
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <OperatorProfile />
    </>
  );
}
