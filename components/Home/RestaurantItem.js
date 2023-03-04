import { View, Text, Image, TouchableOpacity, FlatList } from "react-native";
import React, { useEffect } from "react";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import NoDataFound from "./NoDataFound";

export default function RestaurantItem({ navigation, ...props }) {
    useEffect(() => {
        console.log("RestaurantItem");
    }, []);

    return (
        <>
            {props.restaurantData.length === 0 ? (
                <NoDataFound
                    colors={props.colors}
                    message={"We are not served in this city"}
                />
            ) : (
                <FlatList
                    data={props.restaurantData}
                    scrollEnabled={false}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            key={index}
                            style={{
                                marginBottom: 10,
                                backgroundColor: props.colors.card,
                                padding: 10,
                            }}
                            onPress={() =>
                                navigation.navigate("RestaurantDetail", item)
                            }
                        >
                            <View>
                                <RestaurantImage
                                    image_url={item.image_url}
                                    colors={props.colors}
                                />
                                <RestaurantInfo
                                    name={item.name}
                                    rating={item.rating}
                                    colors={props.colors}
                                />
                            </View>
                        </TouchableOpacity>
                    )}
                />
            )}
        </>
    );
}

const RestaurantImage = (props) => (
    <View style={{ position: "relative" }}>
        <Image
            source={{ uri: props.image_url }}
            style={{
                width: "100%",
                height: 180,
                resizeMode: "cover",
            }}
        />
        <TouchableOpacity style={{ position: "absolute", top: 20, right: 11 }}>
            <MaterialCommunityIcons
                name="heart-outline"
                size={21}
                color="#fff"
            />
        </TouchableOpacity>
    </View>
);

const RestaurantInfo = (props) => (
    <View
        style={{
            backgroundColor: props.colors.card,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
        }}
    >
        <View>
            <Text
                style={{
                    fontSize: 15,
                    fontWeight: "bold",
                    color: props.colors.text,
                }}
            >
                {props.name}
            </Text>
            <Text style={{ fontSize: 13, color: "gray" }}>30-45 min</Text>
        </View>
        <View
            style={{
                backgroundColor: props.colors.background,
                height: 30,
                width: 30,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 20,
            }}
        >
            <Text style={{ fontSize: 13, color: props.colors.text }}>
                {props.rating}
            </Text>
        </View>
    </View>
);
