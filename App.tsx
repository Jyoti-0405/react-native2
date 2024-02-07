import React, { useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ContactListScreen from "./src/screens/ContactListScreen";
import CreateContactScreen from "./src/screens/CreateContactScreen";
import UpdateContactScreen from "./src/screens/UpdateContactScreen";
import FavoriteContactListScreen from "./src/screens/FavoriteContactListScreen";
import Icon from "react-native-vector-icons/FontAwesome";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

import { Text, TouchableOpacity } from "react-native";

const Stack = createStackNavigator();
const drawer = createDrawerNavigator();

function DrawerNavigation() {
    return (
        <drawer.Navigator
            screenOptions={{
                headerTitleAlign: "center", // Aligns titles in the middle
            }}
        >
            <drawer.Screen
                name="ContactList"
                component={ContactListScreen}
                options={{ title: "Contact List" }}
            />
            <drawer.Screen
                name="FavoriteContactList"
                component={FavoriteContactListScreen}
                options={{ title: "Favorite Contacts" }}
            />
        </drawer.Navigator>
    );
}

const App = () => {
    const [isFavorite, setIsFavorite] = useState(false);
    const addScreenOptions = ({ navigation }: any) => ({
        title: "Add New Contact",
    });

    const updateScreenOptions = ({ navigation }: any) => ({
        title: "Update Contact",
        headerRightProps: { navigation },
    });
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="ContactList">
                <Stack.Screen
                    name="DrawerNavigation"
                    component={DrawerNavigation}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="ContactList"
                    component={ContactListScreen}
                    options={{
                        title: "Contact List",
                    }}
                />
                <Stack.Screen
                    name="CreateContact"
                    component={CreateContactScreen}
                    options={addScreenOptions}
                    initialParams={{ isFavorite, setIsFavorite }}
                />
                <Stack.Screen
                    name="UpdateContact"
                    component={UpdateContactScreen}
                    options={updateScreenOptions}
                    initialParams={{ isFavorite, setIsFavorite }}
                />
                <Stack.Screen
                    name="FavoriteContactList"
                    component={FavoriteContactListScreen}
                    options={{
                        title: "Favorite Contact List",
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
