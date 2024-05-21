import type { LucideIcon } from 'lucide-react';
import {
  AlignJustify,
  ArrowRight,
  Calendar,
  Camera,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Contact,
  Copy,
  Eye,
  EyeOff,
  HelpCircle,
  ImagePlus,
  Loader2,
  LogOut,
  MapPin,
  MessageCircle,
  Minus,
  Pencil,
  Plus,
  Receipt,
  RotateCw,
  ScrollText,
  Search,
  ShoppingCart,
  Star,
  Trash,
  Twitch,
  Twitter,
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
  trash: Trash,
  imagePlus: ImagePlus,
  contact: Contact,
  shoppingCart: ShoppingCart,
  arrowRight: ArrowRight,
  minus: Minus,
  receipt: Receipt,
  mapPin: MapPin,
  scrollText: ScrollText,
  twitter: Twitter,
  twitch: Twitch,
  messageCirle: MessageCircle,
};

export const Icons = IconList as Record<keyof typeof IconList, Icon>;
