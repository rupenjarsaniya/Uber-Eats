import { Alert } from "react-native";

let defaultState = {
    selectedItems: { items: [], restaurantName: "" },
};

let cardReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "ADD_TO_CART":
            let newState = { ...state };
            if (action.payload.checkboxValue) {
                if (newState.selectedItems.restaurantName) {
                    if (
                        newState.selectedItems.restaurantName !==
                        action.payload.restaurantName
                    ) {
                        Alert.alert(
                            "Uber Eats",
                            "Your previous cart has been cleared."
                        );
                        newState = { ...defaultState };
                    }
                }

                newState.selectedItems = {
                    items: [...newState.selectedItems.items, action.payload],
                    restaurantName: action.payload.restaurantName,
                };
            } else {
                newState.selectedItems = {
                    items: [
                        ...newState.selectedItems.items.filter(
                            (item) => item.title !== action.payload.title
                        ),
                    ],
                    restaurantName: action.payload.restaurantName,
                };
            }
            return newState;

        case "CLEAR_CART":
            let resetCart = { ...state };
            resetCart = { ...defaultState };
            return resetCart;

        default:
            return state;
    }
};

export default cardReducer;
