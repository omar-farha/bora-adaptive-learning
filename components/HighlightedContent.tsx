import { Fragment } from "react";
import TermTooltip from "@/components/TermTooltip";
import { escapeRegExp } from "@/lib/utils";
import type { VocabularyItem } from "@/types/learning";

interface HighlightedContentProps {
  content: string;
  terms: VocabularyItem[];
  colorVar: string;
  className?: string;
}

export default function HighlightedContent({
  content,
  terms,
  colorVar,
  className = "text-base leading-relaxed text-foreground",
}: HighlightedContentProps) {
  if (!terms.length) {
    return <p className={className}>{content}</p>;
  }

  const pattern = terms
    .map((t) => escapeRegExp(t.term))
    .filter(Boolean)
    .join("|");

  if (!pattern) {
    return <p className={className}>{content}</p>;
  }

  const regex = new RegExp(`(${pattern})`, "g");
  const parts = content.split(regex);

  return (
    <p className={className}>
      {parts.map((part, i) => {
        const match = terms.find((t) => t.term === part);
        if (match) {
          return (
            <TermTooltip
              key={i}
              term={match.term}
              explanation={match.simpleExplanation}
              example={match.example}
              colorVar={colorVar}
            />
          );
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </p>
  );
}
