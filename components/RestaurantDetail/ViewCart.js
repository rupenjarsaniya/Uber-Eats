import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Modal,
    ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderItem from "./OrderItem";
import firebase from "../../firebase";
import LottieView from "lottie-react-native";

const styles = StyleSheet.create({
    viewContainer: {
        flexDirection: "row",
        height: 50,
        paddingVertical: 10,
        paddingHorizontal: 50,
        alignItems: "center",
        justifyContent: "space-between",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
    },
    viewChildCommon: {
        color: "lightgrey",
    },
});

const modalStyles = StyleSheet.create({
    modelContainer: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.7)",
    },
    modelCheckoutContainer: {
        padding: 16,
        height: 500,
        borderWidth: 1,
    },
    restaurantName: {
        textAlign: "center",
        fontWeight: "900",
        fontSize: 18,
        marginBottom: 10,
    },
    subTotalContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 20,
        paddingHorizontal: 10,
    },
    subTotalText: {
        fontWeight: "600",
        fontSize: 15,
        marginBottom: 10,
    },
    checkoutContainer: {
        borderRadius: 30,
        marginHorizontal: 50,
        marginTop: 30,
    },
    checkoutButton: {
        alignItems: "center",
        paddingVertical: 15,
    },
    checkoutText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "600",
    },
});

export default function ViewCart({ navigation, colors }) {
    const dispatch = useDispatch();
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const { items, restaurantName } = useSelector(
        (state) => state.cardReducer.selectedItems
    );

    const total = items.reduce((prev, current) => {
        return prev + current.price;
    }, 0);

    //Check out
    const totalUSD = total.toLocaleString("en", {
        style: "currency",
        currency: "USD",
    });

    const addOrderToFirebase = () => {
        setLoading(true);
        const db = firebase.firestore();
        db.collection("orders")
            .add({
                items: items,
                restaurantName: restaurantName,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then(() => {
                setModalVisible(false);
                setTimeout(() => {
                    setLoading(false);
                    navigation.navigate("OrderCompleted");
                }, 2500);
                dispatch({
                    type: "CLEAR_CART",
                    payload: {},
                });
            });
    };

    const checkoutModelContent = () => {
        return (
            <>
                <View style={modalStyles.modelContainer}>
                    <View
                        style={[
                            modalStyles.modelCheckoutContainer,
                            { backgroundColor: colors.background },
                        ]}
                    >
                        <Text style={modalStyles.restaurantName}>
                            {restaurantName}
                        </Text>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            {/* We can use flatlist also as well */}
                            {items.map((item, index) => (
                                <OrderItem
                                    item={item}
                                    key={index}
                                    colors={colors}
                                />
                            ))}
                            <View style={modalStyles.subTotalContainer}>
                                <Text
                                    style={[
                                        modalStyles.subTotalText,
                                        { color: colors.text },
                                    ]}
                                >
                                    Subtotal
                                </Text>
                                <Text
                                    style={[
                                        modalStyles.subTotalText,
                                        { color: colors.text },
                                    ]}
                                >
                                    ${totalUSD}.00
                                </Text>
                            </View>
                            <View
                                style={[
                                    modalStyles.checkoutContainer,
                                    { backgroundColor: colors.primary },
                                ]}
                            >
                                <TouchableOpacity
                                    style={modalStyles.checkoutButton}
                                    onPress={() => addOrderToFirebase()}
                                >
                                    <Text style={[modalStyles.checkoutText]}>
                                        Checkout
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </>
        );
    };

    return (
        <>
            <Modal
                animationType="slide"
                visible={modalVisible}
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
                statusBarTranslucent={true}
            >
                {checkoutModelContent()}
            </Modal>
            {total ? (
                <TouchableOpacity
                    style={[
                        styles.viewContainer,
                        { backgroundColor: colors.primary },
                    ]}
                    onPress={() => setModalVisible(true)}
                    activeOpacity={0.9}
                >
                    <Text
                        style={[
                            styles.viewChildCommon,
                            {
                                fontSize: 17,
                                fontWeight: "900",
                            },
                        ]}
                    >
                        View Cart
                    </Text>
                    <Text
                        style={[
                            styles.viewChildCommon,
                            {
                                fontSize: 14,
                                fontWeight: "300",
                            },
                        ]}
                    >
                        ${totalUSD}.00
                    </Text>
                </TouchableOpacity>
            ) : (
                <></>
            )}
            {loading ? (
                <View
                    style={{
                        backgroundColor: "#000",
                        position: "absolute",
                        opacity: 0.6,
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: "100%",
                        zIndex: 1,
                    }}
                >
                    <LottieView
                        source={require("../../assets/animations/scanner.json")}
                        style={{ height: 200 }}
                        autoPlay
                        speed={3}
                    />
                </View>
            ) : (
                <></>
            )}
        </>
    );
}
