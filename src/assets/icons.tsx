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
  CircleEllipsis,
  Contact,
  Copy,
  Eye,
  EyeOff,
  File,
  HelpCircle,
  Home,
  ImagePlus,
  Link,
  Loader2,
  LogOut,
  Mail,
  MapPin,
  MessageCircle,
  Minus,
  Pencil,
  Phone,
  Plus,
  Receipt,
  RotateCw,
  ScrollText,
  Search,
  Settings,
  ShoppingCart,
  Star,
  ThumbsUp,
  Trash,
  Truck,
  Twitch,
  Twitter,
  Upload,
  User,
  UserCog,
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
  file: File,
  settings: Settings,
  thumbsUp: ThumbsUp,
  rotateCw: RotateCw,
  truck: Truck,
  userCog: UserCog,
  link: Link,
  circleEllipsis: CircleEllipsis,
  mail: Mail,
  phone: Phone,
  home: Home,
};

export const Icons = IconList as Record<keyof typeof IconList, Icon>;
