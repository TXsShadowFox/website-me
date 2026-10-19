import { Fragment } from "react";

/** Renders `backtick` spans in project copy as inline code. */
export function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split("`").map((part, i) =>
        i % 2 === 1 ? (
          <code
            key={i}
            className="rounded border border-line bg-surface2 px-1 py-px font-mono text-[0.85em] text-body"
          >
            {part}
          </code>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  );
}
