import { contentToBlocks } from "@/utils";

interface ArticleBodyProps {
  content: string;
}

/**
 * Renders article content by parsing the lightweight markdown format
 * (## headings and blank-line-separated paragraphs) into semantic HTML.
 */
export function ArticleBody({ content }: ArticleBodyProps) {
  const blocks = contentToBlocks(content);

  return (
    <div className="prose-content">
      {blocks.map((block, index) =>
        block.type === "heading" ? (
          <h2 key={index}>{block.text}</h2>
        ) : (
          <p key={index}>{block.text}</p>
        )
      )}
    </div>
  );
}
