import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    ActivityIndicator,
} from "react-native";
import React from "react";
import { ScrollView } from "react-native-virtualized-view";
import { Divider } from "react-native-elements";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useDispatch, useSelector } from "react-redux";

const styles = StyleSheet.create({
    menuItemsContainer: {
        marginHorizontal: 20,
    },
    menuItemStyle: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 20,
    },
    foodInfoContainer: {
        marginRight: 4,
        flex: 1,
        justifyContent: "space-evenly",
    },
    titleStyle: {
        fontSize: 19,
        fontWeight: "600",
        textTransform: "capitalize",
    },
    imageStyle: {
        width: 100,
        height: 100,
        borderRadius: 8,
    },
});

export default function MenuItems(props) {
    const dispatch = useDispatch([]);

    const selectItem = (item, checkboxValue) => {
        dispatch({
            type: "ADD_TO_CART",
            payload: {
                ...item,
                restaurantName: props.restaurantName,
                checkboxValue,
            },
        });
    };

    const cartItems = useSelector(
        (state) => state.cardReducer.selectedItems.items
    );

    const isFoodInCart = (food, cartItems) => {
        return (
            Boolean(cartItems.find((item) => item.title === food.title)) && true
        );
    };

    return (
        <>
            {props.isloading ? (
                <ActivityIndicator size={25} color="orange" />
            ) : (
                <ScrollView
                    style={styles.menuItemsContainer}
                    showsVerticalScrollIndicator={false}
                >
                    {props.foods.length === 0 ? (
                        <View>
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: props.colors.text,
                                    alignSelf: "center",
                                    textTransform: "capitalize",
                                }}
                            >
                                Sorry, food not available now.
                            </Text>
                        </View>
                    ) : (
                        <FlatList
                            data={props.foods}
                            horizontal={false}
                            showsVerticalScrollIndicator={false}
                            scrollEnabled={false}
                            renderItem={({ item, index }) => (
                                <View key={index}>
                                    <View style={styles.menuItemStyle}>
                                        {props.hideCheckbox ? (
                                            <></>
                                        ) : (
                                            <BouncyCheckbox
                                                iconStyle={{
                                                    borderRadius: 4,
                                                }}
                                                innerIconStyle={{
                                                    borderRadius: 4,
                                                }}
                                                size={21}
                                                fillColor={`${props.colors.primary}`}
                                                onPress={(checkboxValue) =>
                                                    selectItem(
                                                        item,
                                                        checkboxValue
                                                    )
                                                }
                                                isChecked={isFoodInCart(
                                                    item,
                                                    cartItems
                                                )}
                                            />
                                        )}
                                        <FoodInfo
                                            style={{}}
                                            food={item}
                                            colors={props.colors}
                                        />
                                        <FoodImage
                                            style={{}}
                                            food={item}
                                            colors={props.colors}
                                        />
                                    </View>
                                    <Divider
                                        color={`${props.colors.border}`}
                                        width={1}
                                        orientation="vertical"
                                    />
                                </View>
                            )}
                        />
                    )}
                </ScrollView>
            )}
        </>
    );
}

const FoodInfo = (props) => (
    <View style={styles.foodInfoContainer}>
        <Text
            style={[
                styles.titleStyle,
                {
                    color: props.colors.text,
                },
            ]}
        >
            {props.food.title}
        </Text>
        <Text style={{ color: props.colors.text }}>
            {props.food.description}
        </Text>
        <Text style={{ color: props.colors.text }}>${props.food.price}.00</Text>
    </View>
);

const FoodImage = (props) => (
    <View>
        <Image source={{ uri: props.food.image }} style={styles.imageStyle} />
    </View>
);
