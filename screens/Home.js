import {
    View,
    Text,
    ActivityIndicator,
    BackHandler,
    Alert,
    RefreshControl,
} from "react-native";
import { ScrollView } from "react-native-virtualized-view";
import { Divider } from "react-native-elements";
import React, { useCallback, useEffect, useState } from "react";
import HeaderTabs from "../components/Home/HeaderTabs";
import SearchBar from "../components/Home/SearchBar";
import Categories from "../components/Home/Categories";
import RestaurantItem from "../components/Home/RestaurantItem";
import BottomTabs from "../components/Home/BottomTabs";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useTheme } from "@react-navigation/native";

export default function Home({ navigation }) {
    const { colors } = useTheme();
    const [restaurantData, setRestaurantData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [city, setCity] = useState("");
    const [activeTab, setActiveTab] = useState("delivery");
    const [refreshing, setRefreshing] = useState(false);

    const getRestaurantData = async () => {
        try {
            setIsLoading(true);
            const res = await fetch(
                `https://uber-eats-api.herokuapp.com/api/restaurants/restaurants?city=${city}`
            );
            const json = await res.json();
            if (res.status === 200) {
                setRestaurantData(
                    json.restaurants.filter((item) => {
                        return item.servicetype.includes(activeTab);
                    })
                );
            } else {
                setRestaurantData([]);
            }
        } catch (error) {
            console.log("Something went wrong while fetching data", error);
        } finally {
            setIsLoading(false);
        }
    };

    const wait = () => getRestaurantData();

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        wait().then(() => {
            setRefreshing(false);
        });
    }, []);

    useEffect(() => {
        console.log("Home");
        getRestaurantData();
    }, [city, activeTab]);

    useFocusEffect(
        useCallback(() => {
            const onBackPressAction = () => {
                Alert.alert("Uber Eats", "Do you want to exit the app?", [
                    {
                        text: "Cancel",
                        onPress: () => null,
                        style: "cancel",
                    },
                    { text: "Yes", onPress: () => BackHandler.exitApp() },
                ]);

                return true;
            };

            BackHandler.addEventListener(
                "hardwareBackPress",
                onBackPressAction
            );

            return () => {
                BackHandler.removeEventListener(
                    "hardwareBackPress",
                    onBackPressAction
                );
            };
        }, [])
    );

    return (
        <>
            <SafeAreaView
                style={{ backgroundColor: colors.background, flex: 1 }}
            >
                <View style={{ backgroundColor: colors.card, padding: 15 }}>
                    <HeaderTabs
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                        colors={colors}
                    />
                    <SearchBar cityHandler={setCity} colors={colors} />
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    <Categories colors={colors} />
                    <View style={{ marginTop: 10, marginBottom: 60 }}>
                        {isLoading ? (
                            <ActivityIndicator size={25} color="orange" />
                        ) : (
                            <RestaurantItem
                                restaurantData={restaurantData}
                                navigation={navigation}
                                colors={colors}
                            />
                        )}
                    </View>
                </ScrollView>
            </SafeAreaView>
            <BottomTabs navigation={navigation} colors={colors} />
        </>
    );
}
