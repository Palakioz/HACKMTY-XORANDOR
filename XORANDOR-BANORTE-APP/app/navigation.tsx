import Login from "./screens/Login";
import Register from "./screens/Register";
import Authentication from "./screens/Authentication";
import Camera from "./screens/Camera";
import AccountInfo from "./screens/AccountInfo";
import DataVerification from "./screens/DataVerification"
import Welcome from "./screens/Welcome"
import EducacionFinanciera from "./screens/EducacionFinanciera";

import { NavigatorScreenParams } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Onboarding: NavigatorScreenParams<OnboardingStackParamList>;
};

export type OnboardingStackParamList = {
  Login: undefined;
  Register: undefined;
  Authentication: { phoneNumber: string }; // phoneNumber is expected
  
  AccountInfo: undefined; // No params defined here
  DataVerification: {msg: string};
  Welcome: {msg: string};
  EducacionFinanciera: {msg: string};
};


const RootStack = createNativeStackNavigator<RootStackParamList>();
const OnboardingStack = createNativeStackNavigator<OnboardingStackParamList>();

const OnboardingNavigator = () => {
  return (
    <OnboardingStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <OnboardingStack.Screen name="Login" component={Login} />
      <OnboardingStack.Screen name="Register" component={Register} />
      <OnboardingStack.Screen name="Authentication" component={Authentication} />

      <OnboardingStack.Screen name="AccountInfo" component={AccountInfo} />
      <OnboardingStack.Screen name="DataVerification" component={DataVerification} />
      <OnboardingStack.Screen name="Welcome" component={Welcome} />
      <OnboardingStack.Screen name="EducacionFinanciera" component={EducacionFinanciera} />
      
    </OnboardingStack.Navigator>
  );
};

export const RootNavigator = () => {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <RootStack.Screen name="Onboarding" component={OnboardingNavigator} />
    </RootStack.Navigator>
  );
};