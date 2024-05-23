import {StackScreenProps} from '@react-navigation/stack';

export type RootStackParamList = {
  Main: undefined;
  SignIn: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
  Settings: undefined;
};
export type MainProps = StackScreenProps<RootStackParamList, 'Main'>;
export type SignInProps = StackScreenProps<RootStackParamList, 'SignIn'>;
export type SignUpProps = StackScreenProps<RootStackParamList, 'SignUp'>;
export type ForgotPasswordProps = StackScreenProps<
  RootStackParamList,
  'ForgotPassword'
>;
export type SettingsProps = StackScreenProps<RootStackParamList, 'Settings'>;
