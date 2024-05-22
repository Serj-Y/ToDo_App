import {StackScreenProps} from '@react-navigation/stack';

export type RootStackParamList = {
  Main: undefined;
  SignIn: undefined;
  ForgotPassword: undefined;
};

export type SignInProps = StackScreenProps<RootStackParamList, 'SignIn'>;
export type MainProps = StackScreenProps<RootStackParamList, 'Main'>;
export type ForgotPasswordProps = StackScreenProps<
  RootStackParamList,
  'ForgotPassword'
>;
