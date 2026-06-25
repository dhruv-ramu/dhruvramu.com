import type { MDXComponents } from "mdx/types";
import { PullQuote } from "./PullQuote";
import { cn } from "@/lib/utils";

function Callout({
  children,
  type = "note",
}: {
  children: React.ReactNode;
  type?: "note" | "warning" | "insight";
}) {
  const styles = {
    note: "border-line bg-paper",
    warning: "border-accent-soft bg-accent-soft/10",
    insight: "border-gold/40 bg-gold/5",
  };

  return (
    <aside
      className={cn(
        "my-8 p-6 rounded-2xl border font-body text-ink-soft",
        styles[type]
      )}
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted mb-3">
        {type}
      </p>
      {children}
    </aside>
  );
}

function Footnote({ children }: { children: React.ReactNode }) {
  return (
    <sup className="font-mono text-[0.65em] text-accent cursor-help">
      {children}
    </sup>
  );
}

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2
      className="font-display text-3xl font-medium tracking-tight text-ink mt-12 mb-4"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="font-display text-2xl font-medium tracking-tight text-ink mt-8 mb-3"
      {...props}
    />
  ),
  p: (props) => <p className="my-5 text-ink-soft leading-[1.75]" {...props} />,
  a: (props) => (
    <a
      className="text-accent-ink underline underline-offset-[3px] decoration-accent-soft hover:decoration-accent transition-colors"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="font-display text-2xl italic leading-snug text-ink border-l-2 border-line-dark pl-6 my-8"
      {...props}
    />
  ),
  ul: (props) => (
    <ul className="my-5 pl-6 list-disc space-y-2 text-ink-soft" {...props} />
  ),
  ol: (props) => (
    <ol className="my-5 pl-6 list-decimal space-y-2 text-ink-soft" {...props} />
  ),
  li: (props) => <li className="leading-[1.75]" {...props} />,
  code: (props) => {
    const isBlock = String(props.children).includes("\n");
    if (isBlock) {
      return (
        <code
          className="block font-mono text-sm bg-paper-deep border border-line rounded-xl p-5 overflow-x-auto my-6"
          {...props}
        />
      );
    }
    return (
      <code
        className="font-mono text-[0.85em] bg-paper-deep px-1.5 py-0.5 rounded"
        {...props}
      />
    );
  },
  pre: (props) => (
    <pre
      className="font-mono text-sm bg-paper-deep border border-line rounded-xl p-5 overflow-x-auto my-6"
      {...props}
    />
  ),
  table: (props) => (
    <div className="overflow-x-auto my-8">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  th: (props) => (
    <th
      className="font-mono text-[10px] uppercase tracking-[0.1em] border border-line bg-paper px-4 py-2 text-left"
      {...props}
    />
  ),
  td: (props) => (
    <td className="border border-line px-4 py-2 text-ink-soft" {...props} />
  ),
  hr: () => <hr className="my-10 border-line" />,
  img: (props) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="rounded-lg border border-line my-8 w-full"
      alt={props.alt || ""}
      {...props}
    />
  ),
  Callout,
  PullQuote,
  Footnote,
};
