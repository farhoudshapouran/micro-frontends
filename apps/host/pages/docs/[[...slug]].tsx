import { useRouter } from "next/router";
import Error from "next/error";
import { allDocs } from "contentlayer/generated";
//
import DocsView from "@/sections/docs/view/docs-view";

// ----------------------------------------------------------------------

interface DocPageProps {
  params: string[];
}

function getDocFromParams({ params }: DocPageProps) {
  const slug = params?.join("/") || "";
  const doc = allDocs.find((doc) => doc.slugAsParams === slug);

  if (!doc) {
    return null;
  }

  return doc;
}

export default function Docs() {
  const router = useRouter();

  const params = router.query.slug as string[];
  const doc = getDocFromParams({ params });

  if (!doc) {
    return <Error statusCode={404} />;
  }

  return <DocsView doc={doc} />;
}
