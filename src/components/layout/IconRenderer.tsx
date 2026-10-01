import React from 'react';
import {
  Code,
  Globe,
  Server,
  Database,
  Terminal,
  Cpu,
  Shield,
  Layers,
  FileCode,
  Smartphone,
  Cloud,
  GitBranch,
  Search,
  PieChart,
  Bot,
  Brain,
  Sparkles,
  BookOpen,
  Boxes,
  Lock,
  Workflow,
  Compass,
  Monitor,
  Layout,
  LucideIcon,
} from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  Code,
  Globe,
  Server,
  Database,
  Terminal,
  Cpu,
  Shield,
  Layers,
  FileCode,
  Smartphone,
  Cloud,
  GitBranch,
  Search,
  PieChart,
  Bot,
  Brain,
  Sparkles,
  BookOpen,
  Boxes,
  Lock,
  Workflow,
  Compass,
  Monitor,
  Layout,
};

interface IconRendererProps {
  name?: string;
  className?: string;
  size?: number;
}

export function IconRenderer({ name = 'Code', className = 'w-5 h-5', size }: IconRendererProps) {
  const IconComponent = (name && ICON_MAP[name]) ? ICON_MAP[name] : Code;
  return <IconComponent className={className} size={size} />;
}
