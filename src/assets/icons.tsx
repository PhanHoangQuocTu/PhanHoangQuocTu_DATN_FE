import type { LucideIcon } from 'lucide-react';
import {
  AlignJustify,
  Calendar,
  Camera,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Copy,
  Eye,
  EyeOff,
  HelpCircle,
  Loader2,
  LogOut,
  Pencil,
  Plus,
  RotateCw,
  Search,
  Star,
  Upload,
  User,
  X,
} from 'lucide-react';

export type Icon = LucideIcon;

const IconList = {
  user: User,
  x: X,
  spinner: Loader2,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  copy: Copy,
  logout: LogOut,
  helpCircle: HelpCircle,
  chevronDown: ChevronDown,
  chevronUp: ChevronUp,
  pencil: Pencil,
  alignJustify: AlignJustify,
  check: Check,
  plus: Plus,
  search: Search,
  calendar: Calendar,
  camera: Camera,
  reload: RotateCw,
  upload: Upload,
  eye: Eye,
  eyeHidden: EyeOff,
  star: Star,
};

export const Icons = IconList as Record<keyof typeof IconList, Icon>;
