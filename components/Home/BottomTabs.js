import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function BottomTabs({ navigation, colors }) {
    return (
        <View
            style={{
                padding: 10,
                flexDirection: "row",
                justifyContent: "space-around",
                alignItems: "center",
                backgroundColor: colors.background,
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1,
            }}
        >
            <Icon
                icon="home"
                text="Home"
                navigateUrl="Home"
                navigation={navigation}
                colors={colors}
            />
            <Icon
                icon="search"
                text="Search"
                navigation={navigation}
                colors={colors}
            />
            <Icon
                icon="shopping-bag"
                text="Grossery"
                navigateUrl="Shopping-bag"
                navigation={navigation}
                colors={colors}
            />
            <Icon
                icon="receipt"
                text="Orders"
                navigateUrl="Orders"
                navigation={navigation}
                colors={colors}
            />
            <Icon
                icon="person"
                text="Account"
                navigateUrl="Account"
                navigation={navigation}
                colors={colors}
            />
        </View>
    );
}

const Icon = ({ navigation, ...props }) => (
    <TouchableOpacity onPress={() => navigation.navigate(props.navigateUrl)}>
        <View
            style={{
                width: 50,
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <MaterialIcons
                name={props.icon}
                size={25}
                style={{ marginBottom: 1, alignSelf: "center" }}
                color="gray"
            />
            <Text style={{ fontSize: 11, color: props.colors.text }}>
                {props.text}
            </Text>
        </View>
    </TouchableOpacity>
);
