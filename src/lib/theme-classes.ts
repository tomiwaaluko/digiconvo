/**
 * Semantic CSS utility classes for theme-compliant components
 * Use these classes instead of Tailwind color utilities to ensure global theming works
 */

// Component styling utilities
export const themeClasses = {
  // Backgrounds
  background: 'theme-surface',
  backgroundSecondary: 'theme-surface-secondary',
  card: 'theme-card',
  
  // Text
  textPrimary: 'theme-text-primary',
  textSecondary: 'theme-text-secondary',
  
  // Buttons
  button: 'theme-button',
  buttonSecondary: 'theme-button-secondary',
  
  // Inputs
  input: 'theme-input',
  
  // Layout utilities that are theme-safe
  layout: {
    container: 'flex flex-col',
    row: 'flex flex-row',
    center: 'flex items-center justify-center',
    spaceBetween: 'flex items-center justify-between',
    fullHeight: 'h-full',
    fullScreen: 'h-screen',
    maxWidth: 'max-w-4xl mx-auto',
    padding: 'p-6',
    margin: 'm-4',
    rounded: 'rounded-lg',
    roundedFull: 'rounded-full',
    shadow: 'shadow-sm',
    shadowLg: 'shadow-lg',
    border: 'border',
    hidden: 'hidden',
    block: 'block',
    inlineBlock: 'inline-block',
    flex: 'flex',
    grid: 'grid',
    fixed: 'fixed',
    absolute: 'absolute',
    relative: 'relative',
    sticky: 'sticky',
    zIndex: {
      10: 'z-10',
      20: 'z-20',
      30: 'z-30',
      40: 'z-40',
      50: 'z-50',
    },
    transition: 'transition-all duration-200 ease-in-out',
  },
  
  // Responsive utilities
  responsive: {
    hiddenMobile: 'hidden md:block',
    hiddenDesktop: 'block md:hidden',
    mobileNav: 'fixed top-0 left-0 w-full md:relative md:w-auto',
    sidebar: 'w-80 fixed left-0 top-0 h-full lg:relative',
    panel: 'w-80 fixed right-0 top-0 h-full xl:relative',
  },
  
  // Typography utilities (sizes only, colors handled by theme)
  typography: {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
    bold: 'font-bold',
    semibold: 'font-semibold',
    medium: 'font-medium',
    normal: 'font-normal',
    light: 'font-light',
  },
  
  // Spacing utilities
  spacing: {
    p1: 'p-1',
    p2: 'p-2',
    p3: 'p-3',
    p4: 'p-4',
    p6: 'p-6',
    p8: 'p-8',
    px1: 'px-1',
    px2: 'px-2',
    px3: 'px-3',
    px4: 'px-4',
    px6: 'px-6',
    py1: 'py-1',
    py2: 'py-2',
    py3: 'py-3',
    py4: 'py-4',
    py6: 'py-6',
    m1: 'm-1',
    m2: 'm-2',
    m3: 'm-3',
    m4: 'm-4',
    m6: 'm-6',
    m8: 'm-8',
    mx2: 'mx-2',
    mx4: 'mx-4',
    mx6: 'mx-6',
    my2: 'my-2',
    my4: 'my-4',
    my6: 'my-6',
    mt2: 'mt-2',
    mt4: 'mt-4',
    mt6: 'mt-6',
    mb2: 'mb-2',
    mb4: 'mb-4',
    mb6: 'mb-6',
    ml2: 'ml-2',
    ml4: 'ml-4',
    ml6: 'ml-6',
    mr2: 'mr-2',
    mr4: 'mr-4',
    mr6: 'mr-6',
  }
};

// Helper function to combine classes
export const cx = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

// Component composition helpers
export const composeButton = (variant: 'primary' | 'secondary' = 'primary', size: 'sm' | 'md' | 'lg' = 'md') => {
  const baseClasses = [
    themeClasses.layout.transition,
    themeClasses.layout.rounded,
    themeClasses.spacing.px4,
    themeClasses.spacing.py2,
    themeClasses.typography.medium,
    'cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2'
  ];
  
  const variantClasses = {
    primary: themeClasses.button,
    secondary: themeClasses.buttonSecondary,
  };
  
  const sizeClasses = {
    sm: [themeClasses.spacing.px3, themeClasses.spacing.py1, themeClasses.typography.sm],
    md: [themeClasses.spacing.px4, themeClasses.spacing.py2, themeClasses.typography.base],
    lg: [themeClasses.spacing.px6, themeClasses.spacing.py3, themeClasses.typography.lg],
  };
  
  return cx(...baseClasses, variantClasses[variant], ...sizeClasses[size]);
};

export const composeCard = (padding: 'sm' | 'md' | 'lg' = 'md') => {
  const baseClasses = [
    themeClasses.card,
    themeClasses.layout.rounded,
    themeClasses.layout.shadow,
  ];
  
  const paddingClasses = {
    sm: themeClasses.spacing.p4,
    md: themeClasses.spacing.p6,
    lg: themeClasses.spacing.p8,
  };
  
  return cx(...baseClasses, paddingClasses[padding]);
};

export const composeInput = () => {
  return cx(
    themeClasses.input,
    themeClasses.layout.rounded,
    themeClasses.spacing.px3,
    themeClasses.spacing.py2,
    themeClasses.layout.transition,
    'w-full resize-none focus:outline-none'
  );
};

export default themeClasses;
