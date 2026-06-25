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
  scale: number;
  isFocus: boolean;
  isChild: boolean;
  isRoot: boolean;
  isPath: boolean;
  isHighlighted: boolean;
};

const ROOT_LAYOUT: Record<string, { x: number; y: number }> = {
  "cancer-biology": { x: 0.5, y: 0.2 },
  computation: { x: 0.8, y: 0.35 },
  "biotech-strategy": { x: 0.8, y: 0.65 },
  "research-education": { x: 0.5, y: 0.8 },
  institutions: { x: 0.2, y: 0.65 },
  "books-philosophy": { x: 0.2, y: 0.35 },
};

const FOCUS_CENTER = { x: 0.5, y: 0.45 };

function layoutInArc(
  centerX: number,
  centerY: number,
  count: number,
  radius: number,
  startAngle = -Math.PI * 0.75,
  endAngle = -Math.PI * 0.25
): { x: number; y: number }[] {
  if (count === 0) return [];
  if (count === 1) return [{ x: centerX, y: centerY + radius }];
  const step = (endAngle - startAngle) / (count - 1);
  return Array.from({ length: count }, (_, i) => {
    const angle = startAngle + step * i;
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  });
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function computeLayout(
  focusId: string | null,
  pathIds: string[],
  highlightedIds: Set<string>
): PositionedNode[] {
  const roots = getRootNodes();
  const result: PositionedNode[] = [];

  if (!focusId) {
    for (const root of roots) {
      const pos = ROOT_LAYOUT[root.id] ?? { x: 0.5, y: 0.5 };
      result.push({
        node: root,
        x: pos.x,
        y: pos.y,
        opacity: 1,
        scale: 1,
        isFocus: false,
        isChild: false,
        isRoot: true,
        isPath: pathIds.includes(root.id),
        isHighlighted: highlightedIds.has(root.id),
      });
    }
    return result;
  }

  for (const root of roots) {
    const pos = ROOT_LAYOUT[root.id] ?? { x: 0.5, y: 0.5 };
    const isOnPath = pathIds.includes(root.id);
    result.push({
      node: root,
      x: pos.x,
      y: pos.y,
      opacity: isOnPath ? 0.55 : 0.18,
      scale: 0.85,
      isFocus: false,
      isChild: false,
      isRoot: true,
      isPath: isOnPath,
      isHighlighted: highlightedIds.has(root.id),
    });
  }

  const focus = atlasNodes.find((n) => n.id === focusId);
  if (!focus) return result;

  result.push({
    node: focus,
    x: FOCUS_CENTER.x,
    y: FOCUS_CENTER.y,
    opacity: 1,
    scale: 1.08,
    isFocus: true,
    isChild: false,
    isRoot: focus.type === "domain",
    isPath: pathIds.includes(focus.id),
    isHighlighted: highlightedIds.has(focus.id),
  });

  const children = getChildNodes(focusId);
  const childRadius = focus.type === "domain" ? 0.28 : 0.22;
  const positions = layoutInArc(
    FOCUS_CENTER.x,
    FOCUS_CENTER.y,
    children.length,
    childRadius
  );

  children.forEach((child, i) => {
    const pos = positions[i] ?? { x: 0.5, y: 0.7 };
    result.push({
      node: child,
      x: clamp(pos.x, 0.08, 0.92),
      y: clamp(pos.y, 0.12, 0.92),
      opacity: 1,
      scale: 1,
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
    if (p.isChild && p.node.parent === focusId) {
      lines.push({
        x1: focus.x,
        y1: focus.y,
        x2: p.x,
        y2: p.y,
        key: `${focusId}-${p.node.id}`,
      });
    }
    if (p.isRoot && p.isPath && p.node.id !== focusId) {
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
