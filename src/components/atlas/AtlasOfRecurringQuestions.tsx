"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  type AtlasFilter,
  type AtlasNode,
  atlasNodes,
  atlasPaths,
  getAtlasNode,
  getBreadcrumb,
  getChildNodes,
  nodeMatchesFilter,
} from "@/data/atlas";
import {
  computeLayout,
  getConnectionLines,
  type PositionedNode,
} from "./atlas-layout";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const FILTERS: { id: AtlasFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "project", label: "Projects" },
  { id: "essay", label: "Essays" },
  { id: "book", label: "Book notes" },
  { id: "method", label: "Methods" },
  { id: "unresolved", label: "Unresolved" },
];

function padOrder(id: string, node: AtlasNode): string {
  if (node.type === "domain" && node.order) {
    return String(node.order).padStart(2, "0");
  }
  return "";
}

function NodeButton({
  positioned,
  onSelect,
  onHover,
  onLeave,
  compact,
  filter,
}: {
  positioned: PositionedNode;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
  onLeave: () => void;
  compact?: boolean;
  filter: AtlasFilter;
}) {
  const { node, x, y, opacity, scale, isFocus, isHighlighted } = positioned;
  const order = padOrder(node.id, node);
  const isDomain = node.type === "domain";
  const isUnresolved = node.type === "unresolved";
  const isSmall = !isDomain && !isFocus;

  const displayOpacity =
    filter !== "all" && !isHighlighted && !isFocus
      ? opacity * 0.12
      : opacity;

  return (
    <motion.button
      type="button"
      className={cn(
        "absolute -translate-x-1/2 -translate-y-1/2 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-full",
        isUnresolved && "border-dashed"
      )}
      style={{
        left: `${x * 100}%`,
        top: `${y * 100}%`,
        zIndex: isFocus ? 30 : isDomain ? 20 : 10,
      }}
      initial={false}
      animate={{ opacity: displayOpacity, scale }}
      transition={{ duration: 0.55, ease }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(node.id);
      }}
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={onLeave}
      onFocus={() => onHover(node.id)}
      onBlur={onLeave}
      aria-label={node.label}
    >
      <span
        className={cn(
          "block transition-colors duration-300",
          isDomain
            ? cn(
                "font-display font-medium tracking-tight text-ink",
                compact ? "text-xl md:text-2xl" : "text-2xl md:text-[2rem]",
                "px-4 py-2 border border-line rounded-full bg-paper/90 backdrop-blur-sm",
                "hover:border-line-dark hover:bg-paper-deep",
                isFocus && "border-accent text-accent-ink bg-paper",
                isHighlighted && "border-gold shadow-[0_0_0_1px_var(--gold)]"
              )
            : isSmall
              ? cn(
                  "font-body text-sm md:text-base",
                  isUnresolved
                    ? "italic text-accent-ink border border-dashed border-accent-soft px-3 py-1.5 rounded-full bg-paper/80"
                    : "text-muted hover:text-ink px-2 py-1",
                  isFocus && "text-ink font-medium",
                  isHighlighted && "text-accent-ink"
                )
              : cn(
                  "font-display text-lg md:text-xl font-medium text-ink-soft",
                  "px-3 py-1.5 border border-line/70 rounded-full bg-paper/70",
                  "hover:border-line-dark hover:text-ink",
                  isFocus && "border-accent text-accent-ink",
                  isHighlighted && "border-gold"
                )
        )}
      >
        {order && (
          <span className="block font-mono text-[9px] tracking-[0.16em] text-muted-light mb-0.5">
            {order}
          </span>
        )}
        {node.label}
      </span>
    </motion.button>
  );
}

function AtlasSidePanel({
  node,
  onClose,
}: {
  node: AtlasNode;
  onClose: () => void;
}) {
  const related = (node.related ?? [])
    .map((id) => getAtlasNode(id))
    .filter(Boolean) as AtlasNode[];

  return (
    <motion.aside
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 24 }}
      transition={{ duration: 0.45, ease }}
      className="absolute top-0 right-0 h-full w-full md:w-[340px] lg:w-[380px] border-l border-line bg-paper/95 backdrop-blur-md overflow-y-auto z-40"
      aria-label={`Details for ${node.label}`}
    >
      <div className="p-6 md:p-8">
        <button
          type="button"
          onClick={onClose}
          className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted hover:text-ink mb-6"
        >
          Close ×
        </button>

        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
          {node.type === "unresolved" ? "Unresolved" : node.type}
        </p>

        <h3 className="mt-3 font-display text-2xl md:text-3xl font-medium tracking-tight text-ink leading-tight">
          {node.label}
        </h3>

        {node.quote && (
          <blockquote className="mt-4 font-display text-lg italic text-accent-ink border-l-2 border-line-dark pl-4">
            {node.quote}
          </blockquote>
        )}

        {node.description && (
          <p className="mt-4 font-body text-ink-soft leading-relaxed">
            {node.description}
          </p>
        )}

        {node.links && node.links.length > 0 && (
          <div className="mt-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted mb-3">
              Linked artifacts
            </p>
            <ul className="space-y-2">
              {node.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-baseline gap-2 font-body text-ink-soft hover:text-accent transition-colors"
                  >
                    <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted-light shrink-0">
                      {link.kind}
                    </span>
                    <span className="group-hover:underline underline-offset-2">
                      {link.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}

        {related.length > 0 && (
          <div className="mt-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted mb-3">
              Connected concepts
            </p>
            <div className="flex flex-wrap gap-2">
              {related.map((r) => (
                <span
                  key={r.id}
                  className="font-mono text-[9px] uppercase tracking-[0.1em] text-muted border border-line rounded-full px-2.5 py-1"
                >
                  {r.label}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.aside>
  );
}

interface AtlasOfRecurringQuestionsProps {
  compact?: boolean;
}

export function AtlasOfRecurringQuestions({
  compact = false,
}: AtlasOfRecurringQuestionsProps) {
  const prefersReducedMotion = useReducedMotion();
  const [focusId, setFocusId] = useState<string | null>(null);
  const [panelNodeId, setPanelNodeId] = useState<string | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [filter, setFilter] = useState<AtlasFilter>("all");
  const [pathIds, setPathIds] = useState<string[]>([]);
  const [pathStep, setPathStep] = useState(0);

  const highlightedIds = useMemo(() => {
    if (filter === "all" && pathIds.length === 0) return new Set<string>();
    const ids = new Set<string>();
    for (const node of atlasNodes) {
      if (filter !== "all" && nodeMatchesFilter(node, filter)) {
        ids.add(node.id);
      }
    }
    if (pathIds.length > 0) {
      pathIds.slice(0, pathStep + 1).forEach((id) => ids.add(id));
    }
    return ids;
  }, [filter, pathIds, pathStep]);

  const positioned = useMemo(
    () => computeLayout(focusId, pathIds.slice(0, pathStep + 1), highlightedIds),
    [focusId, pathIds, pathStep, highlightedIds]
  );

  const lines = useMemo(
    () => getConnectionLines(positioned, focusId),
    [positioned, focusId]
  );

  const breadcrumb = focusId ? getBreadcrumb(focusId) : [];
  const panelNode = panelNodeId ? getAtlasNode(panelNodeId) : null;
  const hoverNode = hoverId ? getAtlasNode(hoverId) : null;

  const reset = useCallback(() => {
    setFocusId(null);
    setPanelNodeId(null);
    setPathIds([]);
    setPathStep(0);
    setFilter("all");
  }, []);

  const handleSelect = useCallback(
    (id: string) => {
      const node = getAtlasNode(id);
      if (!node) return;

      const children = getChildNodes(id);
      const hasDepth = children.length > 0;

      if (!focusId) {
        setFocusId(id);
        setPanelNodeId(null);
        return;
      }

      if (id === focusId) {
        if (node.parent) {
          setFocusId(node.parent);
          setPanelNodeId(node.parent);
        } else {
          reset();
        }
        return;
      }

      const isChild = children.length >= 0 && node.parent === focusId;
      const isRoot = node.type === "domain";

      if (isRoot && !focusId) {
        setFocusId(id);
      } else       if (isChild || isRoot) {
        setFocusId(id);
        const showPanel =
          node.links?.length ||
          node.description ||
          node.type === "unresolved" ||
          node.type === "question" ||
          !hasDepth;
        setPanelNodeId(showPanel ? id : null);
      } else {
        setFocusId(id);
        setPanelNodeId(id);
      }
    },
    [focusId, reset]
  );

  const startPath = useCallback((pathId: string) => {
    const path = atlasPaths.find((p) => p.id === pathId);
    if (!path) return;
    setPathIds(path.nodeIds);
    setPathStep(0);
    setFocusId(path.nodeIds[0]);
    setPanelNodeId(null);
    setFilter("all");
  }, []);

  useEffect(() => {
    if (pathIds.length === 0 || pathStep >= pathIds.length - 1) return;
    const timer = setTimeout(() => {
      setPathStep((s) => {
        const next = Math.min(s + 1, pathIds.length - 1);
        setFocusId(pathIds[next]);
        return next;
      });
    }, prefersReducedMotion ? 0 : 900);
    return () => clearTimeout(timer);
  }, [pathIds, pathStep, prefersReducedMotion]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (panelNodeId) {
          setPanelNodeId(null);
        } else if (focusId) {
          const node = getAtlasNode(focusId);
          if (node?.parent) {
            setFocusId(node.parent);
          } else {
            reset();
          }
        }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [focusId, panelNodeId, reset]);

  return (
    <div className={cn("relative", compact ? "mt-8" : "mt-10")}>
      {/* Controls */}
      {!compact && (
        <div className="mb-6 flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                className={cn(
                  "font-mono text-[10px] uppercase tracking-[0.12em] px-3 py-1.5 rounded-full border transition-all duration-300",
                  filter === f.id
                    ? "bg-ink text-paper border-ink"
                    : "text-muted border-line hover:border-line-dark hover:text-ink"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
              Start a path
            </span>
            {atlasPaths.map((path) => (
              <button
                key={path.id}
                type="button"
                onClick={() => startPath(path.id)}
                className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted hover:text-accent border-b border-transparent hover:border-accent transition-colors"
              >
                {path.label}
              </button>
            ))}
            <button
              type="button"
              onClick={reset}
              className="ml-auto font-mono text-[10px] uppercase tracking-[0.14em] text-muted hover:text-ink"
            >
              Return to orbit
            </button>
          </div>
        </div>
      )}

      {compact && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
            Click a constellation to explore
          </p>
          <Link
            href="/atlas"
            className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent hover:text-accent-ink transition-colors"
          >
            Open full atlas →
          </Link>
        </div>
      )}

      {/* Breadcrumb */}
      {(breadcrumb.length > 0 || compact) && (
        <nav
          className="mb-4 font-mono text-[10px] uppercase tracking-[0.12em] text-muted"
          aria-label="Atlas breadcrumb"
        >
          <button
            type="button"
            onClick={reset}
            className="hover:text-ink transition-colors"
          >
            Atlas
          </button>
          {breadcrumb.map((crumb) => (
            <span key={crumb.id}>
              <span className="mx-2 text-muted-light">/</span>
              <button
                type="button"
                onClick={() => {
                  setFocusId(crumb.id);
                  setPanelNodeId(null);
                }}
                className="hover:text-ink transition-colors"
              >
                {crumb.label}
              </button>
            </span>
          ))}
        </nav>
      )}

      {/* Graph canvas */}
      <div
        className={cn(
          "relative rounded-3xl border border-line bg-paper/50 overflow-hidden",
          compact ? "h-[420px] md:h-[480px]" : "h-[520px] md:h-[640px] lg:h-[720px]"
        )}
        onClick={reset}
        role="presentation"
      >
        {/* SVG lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          aria-hidden
        >
          {lines.map((line) => (
            <motion.line
              key={line.key}
              x1={`${line.x1 * 100}%`}
              y1={`${line.y1 * 100}%`}
              x2={`${line.x2 * 100}%`}
              y2={`${line.y2 * 100}%`}
              stroke="var(--line-dark)"
              strokeWidth={1}
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 0.45 }}
              transition={{ duration: 0.7, ease }}
            />
          ))}
        </svg>

        {/* Hover marginalia */}
        <AnimatePresence>
          {hoverNode?.quote && !panelNode && (
            <motion.div
              key={hoverNode.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              className="absolute bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-xs z-20 pointer-events-none"
            >
              <p className="font-display text-sm italic text-muted border-l border-line-dark pl-3">
                &ldquo;{hoverNode.quote}&rdquo;
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Nodes */}
        <div className="absolute inset-0" onClick={(e) => e.stopPropagation()}>
          {positioned
            .filter((p) => !p.isRoot || !focusId || p.isPath || p.opacity > 0.2)
            .map((p) => (
              <NodeButton
                key={p.node.id}
                positioned={p}
                onSelect={handleSelect}
                onHover={setHoverId}
                onLeave={() => setHoverId(null)}
                compact={compact}
                filter={filter}
              />
            ))}
        </div>

        {/* Side panel */}
        <AnimatePresence>
          {panelNode && !compact && (
            <AtlasSidePanel
              key={panelNode.id}
              node={panelNode}
              onClose={() => setPanelNodeId(null)}
            />
          )}
        </AnimatePresence>

        {/* Compact: inline detail below graph on selection */}
      </div>

      {/* Compact panel below graph */}
      <AnimatePresence>
        {compact && panelNode && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="mt-4 p-5 rounded-2xl border border-line bg-paper/80"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
              {panelNode.type}
            </p>
            <h4 className="mt-2 font-display text-xl font-medium text-ink">
              {panelNode.label}
            </h4>
            {panelNode.description && (
              <p className="mt-2 font-body text-sm text-muted leading-relaxed">
                {panelNode.description}
              </p>
            )}
            {panelNode.links && (
              <div className="mt-3 flex flex-wrap gap-3">
                {panelNode.links.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    className="font-mono text-[10px] uppercase tracking-[0.1em] text-accent hover:text-accent-ink"
                  >
                    {l.label} →
                  </Link>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {!compact && (
        <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-light">
          Press Escape to collapse · Click background to return to orbit
        </p>
      )}
    </div>
  );
}
