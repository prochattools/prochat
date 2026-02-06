export type Theme =
  | "light"
  | "dark"
  | "";

export interface ConfigProps {
  appName: string;
  appDescription: string;
  domainName: string;
  stripe: {
    products: StripeProduct[];
  };
  colors: {
    theme: Theme;
    main: string;
  };
  resend: {
    fromAdmin: string;
    supportEmail?: string;
    forwardRepliesTo?: string;
    subjects?: {
      [key: string]: string
    }
  };
}
