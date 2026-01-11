export interface HeroData {
  title: string;
  subtitle: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export interface StageData {
  id: string;
  title: string;
  age: string;
  period: string;
  subtitle: string;
  description: string;
  bullets: string[];
  themeColor: string;
  gradient: string;
  mascot: string;
}

export interface CtaFinalData {
  title: string;
  text: string;
  buttonPrimary: string;
  buttonSecondary: string;
}

export interface ContentData {
  hero: HeroData;
  stages: StageData[];
  ctaFinal: CtaFinalData;
}
