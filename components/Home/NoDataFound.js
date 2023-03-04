import { View, Text } from "react-native";
import React from "react";

export default function NoDataFound(props) {
    return (
        <View
            style={{
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Text style={{ color: props.colors.text, fontSize: 13 }}>
                {props.message}
            </Text>
        </View>
    );
}
