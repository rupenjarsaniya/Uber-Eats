import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function SearchBar({ cityHandler, colors }) {
    const [currentCity, setCurrentCity] = useState("");

    const handleCity = (e) => {
        setCurrentCity(e);
    };

    useEffect(() => {
        console.log("SearchBar");
    }, []);
    return (
        <View
            style={{
                marginTop: 15,
                flexDirection: "row",
                justifyContent: "space-between",
            }}
        >
            <TextInput
                placeholder="Search Your City"
                name="city"
                onChangeText={handleCity}
                value={currentCity}
                style={{
                    width: "80%",
                    backgroundColor: colors.background,
                    borderRadius: 20,
                    fontWeight: "400",
                    padding: 9,
                    color: colors.primary,
                }}
                placeholderTextColor="gray"
            />
            <TouchableOpacity
                style={{
                    width: "20%",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                onPress={() =>
                    currentCity && cityHandler(currentCity.toLowerCase())
                }
            >
                <Text style={{ color: "gray" }}>Search</Text>
            </TouchableOpacity>
        </View>
    );
}
