import { View, Text, Image } from "react-native";
import React from "react";

const restaurantInfo = {
    name: "The sea restaurant",
    price: 10,
    image_url:
        "https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8aG90ZWwlMjByZXN0YXVyYW50fGVufDB8fDB8fA%3D%3D&w=1000&q=80",
    review: 2856,
    rating: 4.5,
    category: ["Cafe", "Kathiyawadi", "Paneer"],
};

export default function About(props) {
    const { name, price, image_url, reviews, rating, category } =
        props.route.params;

    const formatedCategories = category.map((item) => item).join(" • ");

    const description = `${formatedCategories} • $${price}.00 • ${rating} ⭐ • (${reviews}+)`;

    return (
        <View>
            <RestaurantImage image={image_url} />
            <RestaurantName name={name} colors={props.colors} />
            <RestaurantDescription description={description} />
        </View>
    );
}

const RestaurantImage = (props) => (
    <Image
        source={{
            uri: props.image,
        }}
        style={{ width: "100%", height: 180 }}
    />
);

const RestaurantName = (props) => (
    <Text
        style={{
            fontSize: 29,
            fontWeight: "600",
            marginTop: 10,
            marginHorizontal: 15,
            textTransform: "capitalize",
            color: props.colors.text,
        }}
    >
        {props.name}
    </Text>
);

const RestaurantDescription = (props) => (
    <Text
        style={{
            fontSize: 15,
            marginHorizontal: 15,
            fontWeight: "400",
            marginTop: 10,
            color: "gray",
            lineHeight: 21,
        }}
    >
        {props.description}
    </Text>
);
