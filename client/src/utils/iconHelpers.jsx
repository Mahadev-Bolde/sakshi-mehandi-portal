import { Sparkles, Users, Calendar, Gift, Award, Clock } from "lucide-react";

const iconMap = {
  Sparkles,
  Users,
  Calendar,
  Gift,
  Award,
  Clock,
};

export const getIcon = (name, size = 22) => {
  const Icon = iconMap[name];
  return Icon ? <Icon size={size} /> : null;
};
