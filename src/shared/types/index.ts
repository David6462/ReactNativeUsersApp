export interface ComponentProps {
  testID?: string;
  style?: any;
}

export interface NavigationProps {
  navigate: (screen: string, params?: any) => void;
  goBack: () => void;
}