import { Target, LayoutList, Ear, BookOpenText, type LucideIcon } from "lucide-react";
import type { LearningMode } from "@/types/learning";

export interface EnvironmentMeta {
  id: LearningMode;
  label: string;
  shortLabel: string;
  description: string;
  features: string[];
  icon: LucideIcon;
  colorVar: string;
  softVar: string;
}

export const ENVIRONMENTS: EnvironmentMeta[] = [
  {
    id: "focus",
    label: "بيئة التركيز",
    shortLabel: "التركيز",
    description: "تقسّم الدرس لأجزاء صغيرة وواضحة، مع أسئلة متكررة تساعدك تركز خطوة بخطوة.",
    features: ["أجزاء قصيرة جدًا", "فكرة واحدة في كل مرة", "متابعة فورية", "إيقاع تقدر تتحكم فيه"],
    icon: Target,
    colorVar: "var(--focus-color)",
    softVar: "var(--focus-soft)",
  },
  {
    id: "predictable",
    label: "بيئة الاستقرار",
    shortLabel: "الاستقرار",
    description: "ترتيب ثابت ومتوقع لكل قسم، مع خريطة للدرس من الأول عشان تعرف الجاي إيه.",
    features: ["خريطة درس واضحة", "ترتيب ثابت لكل قسم", "انتقالات هادئة", "تحكم في مستوى التنبيه البصري"],
    icon: LayoutList,
    colorVar: "var(--calm-color)",
    softVar: "var(--calm-soft)",
  },
  {
    id: "hearing",
    label: "بيئة الصم وضعاف السمع",
    shortLabel: "بصرية بالكامل",
    description: "توصيل المعلومة بالكامل بصريًا، مع تعريفات فورية لأي مصطلح صعب.",
    features: ["بدون اعتماد على الصوت", "تعريفات مصطلحات فورية", "خطوات بصرية لكل فكرة", "نصوص واضحة ومختصرة"],
    icon: Ear,
    colorVar: "var(--visual-color)",
    softVar: "var(--visual-soft)",
  },
  {
    id: "reading",
    label: "بيئة دعم القراءة",
    shortLabel: "دعم القراءة",
    description: "قراءة بصوت عالي مع تظليل النص أول بأول، وجمل أقصر وأبسط.",
    features: ["قراءة بصوت عالي", "تظليل أثناء القراءة", "سرعة قابلة للتعديل", "شرح الكلمات الصعبة بضغطة"],
    icon: BookOpenText,
    colorVar: "var(--reading-color)",
    softVar: "var(--reading-soft)",
  },
];

export function getEnvironmentMeta(mode: LearningMode): EnvironmentMeta {
  return ENVIRONMENTS.find((m) => m.id === mode)!;
}
