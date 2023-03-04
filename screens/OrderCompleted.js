import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native-safe-area-context";
import LottieView from "lottie-react-native";
import MenuItems from "../components/RestaurantDetail/MenuItems";
import firebase from "../firebase";
import { useTheme } from "@react-navigation/native";

export default function OrderCompleted({ navigation }) {
    const { colors } = useTheme();
    const [lastOrder, setLastOrder] = useState({ items: [] });

    const { items, restaurantName } = useSelector(
        (state) => state.cardReducer.selectedItems
    );

    const total = items.reduce((prev, current) => {
        return prev + current.price;
    }, 0);

    //Check out
    const totalUSD = total.toLocaleString("en", {
        style: "currency",
        currency: "USD",
    });

    useEffect(() => {
        const db = firebase.firestore();
        const unsubscribe = db
            .collection("orders")
            .orderBy("createdAt", "desc")
            .limit(1)
            .onSnapshot((snapshot) => {
                snapshot.docs.map((doc) => {
                    setLastOrder(doc.data());
                });
            });
        return () => unsubscribe();
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
            <View style={{ margin: 15, height: "100%" }}>
                <LottieView
                    source={require("../assets/animations/check-mark.json")}
                    style={{
                        height: 100,
                        alignSelf: "center",
                        marginBottom: 10,
                    }}
                    autoPlay
                    speed={0.5}
                    loop={false}
                    resizeMode="contain"
                />
                <Text
                    style={{
                        fontSize: 20,
                        fontWeight: "bold",
                        color: colors.text,
                    }}
                >
                    Your order at {restaurantName} has been placed for $
                    {totalUSD}
                    .00
                </Text>
                <MenuItems
                    isloading={false}
                    foods={lastOrder.items}
                    restaurantName={restaurantName}
                    hideCheckbox={true}
                    colors={colors}
                />
                <TouchableOpacity
                    activeOpacity={0.5}
                    style={{
                        backgroundColor: colors.primary,
                        borderRadius: 8,
                        paddingVertical: 10,
                        paddingHorizontal: 10,
                        alignItems: "center",
                        justifyContent: "center",
                        marginHorizontal: 90,
                        marginVertical: 10,
                    }}
                    onPress={() => navigation.navigate("Home")}
                >
                    <Text
                        style={{
                            fontSize: 14,
                            fontWeight: "600",
                            color: "#fff",
                            textTransform: "capitalize",
                        }}
                    >
                        back to home
                    </Text>
                </TouchableOpacity>
                <LottieView
                    source={require("../assets/animations/cooking.json")}
                    style={{
                        height: 200,
                        alignSelf: "center",
                        marginBottom: 20,
                    }}
                    autoPlay
                    speed={0.5}
                    resizeMode="contain"
                />
            </View>
        </SafeAreaView>
    );
}
