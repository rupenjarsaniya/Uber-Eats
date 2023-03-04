import { View, Text } from "react-native";
import React from "react";

export default function OrderItem(props) {
    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 10,
                paddingVertical: 20,
                borderBottomWidth: 1,
                borderBottomColor: props.colors.border,
            }}
        >
            <Text
                style={{
                    fontWeight: "600",
                    fontSize: 16,
                    color: props.colors.text,
                }}
            >
                {props.item.title}
            </Text>
            <Text
                style={{ opacity: 0.7, fontSize: 16, color: props.colors.text }}
            >
                ${props.item.price}.00
            </Text>
        </View>
    );
}
