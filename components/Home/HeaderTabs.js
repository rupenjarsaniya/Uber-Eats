import { Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useTheme } from "react-native-elements";

const HeaderTabs = ({ activeTab, setActiveTab, colors }) => {
    useEffect(() => {
        console.log("HeaderTabs");
    }, []);

    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "center",
            }}
        >
            <HeaderButton
                text="delivery"
                bgColor={`${colors.primary}`}
                textColor={`${colors.background}`}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                colors={colors}
            />
            <HeaderButton
                text="pickup"
                bgColor={`${colors.background}`}
                textColor={`${colors.primary}`}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                colors={colors}
            />
        </View>
    );
};

export default HeaderTabs;

const HeaderButton = (props) => (
    <TouchableOpacity
        style={{
            backgroundColor:
                props.activeTab === props.text
                    ? props.colors.primary
                    : props.colors.card,
            paddingVertical: 6,
            paddingHorizontal: 16,
            borderRadius: 20,
        }}
        onPress={() => props.setActiveTab(props.text)}
    >
        <Text
            style={{
                color:
                    props.activeTab === props.text
                        ? props.colors.card
                        : props.colors.primary,
                fontSize: 15,
                fontWeight: "900",
                textTransform: "capitalize",
            }}
        >
            {props.text}
        </Text>
    </TouchableOpacity>
);
