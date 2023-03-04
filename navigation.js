import React, { useEffect, useLayoutEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import {
    DarkTheme,
    DefaultTheme,
    NavigationContainer,
    useFocusEffect,
} from "@react-navigation/native";
import Home from "./screens/Home";
import RestaurantDetail from "./screens/RestaurantDetail";
import { Provider as ReduxProvider } from "react-redux";
import confifureStore from "./redux/store";
import OrderCompleted from "./screens/OrderCompleted";
import { useColorScheme } from "react-native";
import FirstScreen from "./screens/FirstScreen";

export default function RootNavigation() {
    const scheme = useColorScheme();
    const Stack = createStackNavigator();
    const store = confifureStore();

    const screenOptions = {
        headerShown: false,
    };

    useLayoutEffect(() => {
        DarkTheme.colors.primary = "#EF4B4C";
        DefaultTheme.colors.primary = "#EF4B4C";
    }, []);

    return (
        <ReduxProvider store={store}>
            <NavigationContainer
                theme={scheme === "dark" ? DarkTheme : DefaultTheme}
            >
                <Stack.Navigator
                    initialRouteName="Home"
                    screenOptions={screenOptions}
                >
                    <Stack.Screen name="Home" component={Home} />
                    <Stack.Screen
                        name="RestaurantDetail"
                        component={RestaurantDetail}
                    />
                    <Stack.Screen
                        name="OrderCompleted"
                        component={OrderCompleted}
                    />
                    <Stack.Screen name="FirstScreen" component={FirstScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </ReduxProvider>
    );
}
