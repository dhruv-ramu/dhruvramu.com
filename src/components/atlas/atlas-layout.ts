import type { AtlasNode } from "@/data/atlas";
import {
  atlasNodes,
  getAncestors,
  getChildNodes,
  getRootNodes,
} from "@/data/atlas";

export type PositionedNode = {
  node: AtlasNode;
  x: number;
  y: number;
  opacity: number;
  isFocus: boolean;
  isChild: boolean;
  isRoot: boolean;
  isPath: boolean;
  isHighlighted: boolean;
};

const ROOT_LAYOUT: Record<string, { x: number; y: number }> = {
  "cancer-biology": { x: 0.5, y: 0.18 },
  computation: { x: 0.78, y: 0.3 },
  "biotech-strategy": { x: 0.78, y: 0.7 },
  "research-education": { x: 0.5, y: 0.82 },
  institutions: { x: 0.22, y: 0.7 },
  "books-philosophy": { x: 0.22, y: 0.3 },
};

/** Shifted left on full atlas to leave room for the side panel */
const FOCUS_CENTER = { x: 0.4, y: 0.5 };
const FOCUS_CENTER_COMPACT = { x: 0.5, y: 0.48 };

function layoutInCircle(
  centerX: number,
  centerY: number,
  count: number,
  radius: number,
  startAngle = -Math.PI / 2
): { x: number; y: number }[] {
  if (count === 0) return [];
  const step = (2 * Math.PI) / count;
  return Array.from({ length: count }, (_, i) => {
    const angle = startAngle + i * step;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  });
}

function layoutInRings(
  centerX: number,
  centerY: number,
  count: number,
  innerRadius: number,
  outerRadius: number
): { x: number; y: number }[] {
  if (count <= 6) {
    return layoutInCircle(centerX, centerY, count, innerRadius);
  }
  const innerCount = Math.ceil(count / 2);
  const outerCount = count - innerCount;
  const inner = layoutInCircle(centerX, centerY, innerCount, innerRadius);
  const outer = layoutInCircle(
    centerX,
    centerY,
    outerCount,
    outerRadius,
    -Math.PI / 2 + Math.PI / outerCount
  );
  return [...inner, ...outer];
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function childRadius(count: number, isDomain: boolean): number {
  if (isDomain) {
    if (count <= 5) return 0.34;
    if (count <= 8) return 0.36;
    return 0.38;
  }
  if (count <= 4) return 0.26;
  if (count <= 7) return 0.28;
  return 0.3;
}

export function computeLayout(
  focusId: string | null,
  pathIds: string[],
  highlightedIds: Set<string>,
  compact = false
): PositionedNode[] {
  const roots = getRootNodes();
  const result: PositionedNode[] = [];
  const center = compact ? FOCUS_CENTER_COMPACT : FOCUS_CENTER;

  if (!focusId) {
    for (const root of roots) {
      const pos = ROOT_LAYOUT[root.id] ?? { x: 0.5, y: 0.5 };
      result.push({
        node: root,
        x: pos.x,
        y: pos.y,
        opacity: 1,
        isFocus: false,
        isChild: false,
        isRoot: true,
        isPath: pathIds.includes(root.id),
        isHighlighted: highlightedIds.has(root.id),
      });
    }
    return result;
  }

  const focus = atlasNodes.find((n) => n.id === focusId);
  if (!focus) return result;

  const ancestors = getAncestors(focusId);
  const activeRoot = ancestors.find((a) => a.type === "domain") ??
    (focus.type === "domain" ? focus : null);

  // Only show the active constellation at the periphery — not all six
  if (activeRoot && activeRoot.id !== focusId) {
    const rootPos = ROOT_LAYOUT[activeRoot.id] ?? { x: 0.5, y: 0.12 };
    result.push({
      node: activeRoot,
      x: clamp(rootPos.x, 0.12, 0.88),
      y: 0.1,
      opacity: 0.35,
      isFocus: false,
      isChild: false,
      isRoot: true,
      isPath: pathIds.includes(activeRoot.id),
      isHighlighted: highlightedIds.has(activeRoot.id),
    });
  }

  // Ancestor chain (between root and focus) along the left spine
  const chain = ancestors.filter((a) => a.id !== activeRoot?.id);
  chain.forEach((ancestor, i) => {
    const t = (i + 1) / (chain.length + 1);
    result.push({
      node: ancestor,
      x: clamp(center.x - 0.14 + t * 0.06, 0.1, 0.45),
      y: clamp(center.y - 0.18 + t * 0.12, 0.14, 0.42),
      opacity: 0.5,
      isFocus: false,
      isChild: false,
      isRoot: false,
      isPath: pathIds.includes(ancestor.id),
      isHighlighted: highlightedIds.has(ancestor.id),
    });
  });

  // Focus node at center
  result.push({
    node: focus,
    x: center.x,
    y: center.y,
    opacity: 1,
    isFocus: true,
    isChild: false,
    isRoot: focus.type === "domain",
    isPath: pathIds.includes(focus.id),
    isHighlighted: highlightedIds.has(focus.id),
  });

  // Children distributed in a full circle (or dual ring for many)
  const children = getChildNodes(focusId);
  const radius = childRadius(children.length, focus.type === "domain");
  const positions =
    children.length > 8
      ? layoutInRings(center.x, center.y, children.length, radius * 0.72, radius)
      : layoutInCircle(center.x, center.y, children.length, radius);

  children.forEach((child, i) => {
    const pos = positions[i] ?? { x: center.x, y: center.y + radius };
    result.push({
      node: child,
      x: clamp(pos.x, 0.06, compact ? 0.94 : 0.72),
      y: clamp(pos.y, 0.1, 0.9),
      opacity: 1,
      isFocus: false,
      isChild: true,
      isRoot: false,
      isPath: pathIds.includes(child.id),
      isHighlighted: highlightedIds.has(child.id),
    });
  });

  return result;
}

export function getConnectionLines(
  positioned: PositionedNode[],
  focusId: string | null
): { x1: number; y1: number; x2: number; y2: number; key: string }[] {
  if (!focusId) return [];

  const lines: {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    key: string;
  }[] = [];
  const map = new Map(positioned.map((p) => [p.node.id, p]));
  const focus = map.get(focusId);
  if (!focus) return lines;

  for (const p of positioned) {
    if (p.node.id === focusId) continue;

    const isDirectChild = p.isChild && p.node.parent === focusId;
    const isAncestor =
      p.node.id !== focusId &&
      !p.isChild &&
      !p.isRoot &&
      getAncestors(focusId).some((a) => a.id === p.node.id);

    if (isDirectChild) {
      lines.push({
        x1: focus.x,
        y1: focus.y,
        x2: p.x,
        y2: p.y,
        key: `${focusId}-${p.node.id}`,
      });
    } else if (isAncestor) {
      lines.push({
        x1: p.x,
        y1: p.y,
        x2: focus.x,
        y2: focus.y,
        key: `ancestor-${p.node.id}-${focusId}`,
      });
    } else if (p.isRoot && p.node.id !== focusId) {
      const focusAncestors = getAncestors(focusId);
      const rootAncestor = focusAncestors.find((a) => a.type === "domain");
      if (rootAncestor && rootAncestor.id === p.node.id) {
        lines.push({
          x1: p.x,
          y1: p.y,
          x2: focus.x,
          y2: focus.y,
          key: `root-${p.node.id}-${focusId}`,
        });
      }
    }
  }

  return lines;
}
