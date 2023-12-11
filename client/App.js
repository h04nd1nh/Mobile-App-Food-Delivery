import { StatusBar } from "expo-status-bar";
import { SafeAreaView, Text, View } from "react-native";
import { TailwindProvider } from "tailwindcss-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Welcome from "./screens/Welcome";
import Direction from "./screens/Direction";
import ProductTitle from "./components/ProductTitle";
import Cart from "./screens/Cart";
import Account from "./screens/Account";
import Contact from "./screens/Contact";
import About from "./screens/About";

const Stack = createNativeStackNavigator();




export default function App() {
  return (
    <TailwindProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Direction" component={Direction} /> 
          <Stack.Screen name="ProductTitle" component={ProductTitle}/> 
          <Stack.Screen name="Cart" component={Cart}/>
          <Stack.Screen name="Account" component={Account}/>
          <Stack.Screen name="Contact" component={Contact}/>
          <Stack.Screen name="About" component={About}/>
        </Stack.Navigator>
      </NavigationContainer>
    </TailwindProvider>
  );
}

