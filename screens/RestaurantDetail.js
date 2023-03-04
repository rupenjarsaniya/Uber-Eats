import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { Divider } from "react-native-elements";
import About from "../components/RestaurantDetail/About";
import MenuItems from "../components/RestaurantDetail/MenuItems";
import ViewCart from "../components/RestaurantDetail/ViewCart";
import { useTheme } from "@react-navigation/native";

export default function RestaurantDetail({ route, navigation }) {
    const { colors } = useTheme();
    const [foods, setFoods] = useState([]);
    const [isloading, setIsLoading] = useState(false);

    const getMenuItems = async () => {
        setIsLoading(true);
        const res = await fetch(
            `https://uber-eats-api.herokuapp.com/api/menuitems/restaurant/menuitems/${route.params._id}`
        );
        const json = await res.json();
        if (res.status === 200) setFoods(json.message);
        setIsLoading(false);
    };

    useEffect(() => {
        getMenuItems();
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <View>
                <About route={route} colors={colors} />
                <Divider
                    width={1.8}
                    style={{ marginVertical: 20 }}
                    color={`${colors.border}`}
                />
            </View>
            <MenuItems
                isloading={isloading}
                foods={foods && foods}
                restaurantName={route.params.name}
                hideCheckbox={false}
                colors={colors}
            />
            <ViewCart navigation={navigation} colors={colors} />
        </View>
    );
}
