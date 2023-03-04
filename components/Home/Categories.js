import { View, Text, Image, FlatList } from "react-native";
import React, { useEffect } from "react";

const items = [
    {
        image: require("../../assets/images/shopping-bag.png"),
        text: "Pick-up",
    },
    {
        image: require("../../assets/images/soft-drink.png"),
        text: "Soft Drinks",
    },
    {
        image: require("../../assets/images/bread.png"),
        text: "Bakery Items",
    },
    {
        image: require("../../assets/images/fast-food.png"),
        text: "Fast Foods",
    },
    {
        image: require("../../assets/images/deals.png"),
        text: "Deals",
    },
    {
        image: require("../../assets/images/coffee.png"),
        text: "Coffee & Tea",
    },
    {
        image: require("../../assets/images/desserts.png"),
        text: "Desserts",
    },
];

export default function Categories({ colors }) {
    useEffect(() => {
        console.log("Categories");
    }, []);

    return (
        <View
            style={{
                paddingVertical: 10,
                paddingLeft: 10,
                backgroundColor: colors.card,
                marginTop: 6,
            }}
        >
            <FlatList
                data={items}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <View style={{ alignItems: "center", marginRight: 30 }}>
                        <Image
                            source={item.image}
                            style={{
                                width: 50,
                                height: 40,
                                resizeMode: "contain",
                            }}
                        />
                        <Text
                            style={{
                                fontSize: 11,
                                fontWeight: "900",
                                color: colors.text,
                            }}
                        >
                            {item.text}
                        </Text>
                    </View>
                )}
            />
        </View>
    );
}
