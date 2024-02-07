import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    FlatList,
    Button,
    Image,
    TouchableOpacity,
    StyleSheet,
    Platform,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { deleteContactList, fetchContactList } from "../../redux/actions";
import { Swipeable } from "react-native-gesture-handler";

function ContactListScreen({ navigation }: any) {
    const [contacts, setContacts] = useState([]);
    const contactsList = useSelector((state: any) => state.reducer);
    const dispatch = useDispatch();

    function getContactsFromLocalStorage() {
        return async (dispatch: any) => {
            try {
                const list = await AsyncStorage.getItem("list");
                const contacts = list ? JSON.parse(list) : [];
                dispatch(fetchContactList(contacts));
            } finally {
            }
        };
    }
    useEffect(() => {
        getContactsFromLocalStorage();
    }, []);

    useEffect(() => {
        let sortedContacts = contactsList.sort((a: any, b: any) =>
            a.name.localeCompare(b.name)
        );
        setContacts(sortedContacts);
    }, [contactsList]);

    function handleAddButtonPress() {
        navigation.navigate("CreateContact");
    }

    function handleFavouritePress() {
        navigation.navigate("FavoriteContactList");
    }

    function updateContact(selectedContact: any) {
        navigation.navigate("UpdateContact", {
            contact: selectedContact,
        });
    }

    function deleteContact(name: any) {
        dispatch(deleteContactList(name));
    }

    function renderHiddenItem(item: any) {
        return (
            <View style={styles.rightSwipeActions}>
                <TouchableOpacity
                    style={styles.editButton}
                    onPress={() => updateContact(item)}
                >
                    <Text style={styles.buttonText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => deleteContact(item.name)}
                >
                    <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const swipeRenderItem = ({ item }: any) => (
        <View>
            <Swipeable renderRightActions={() => renderHiddenItem(item)}>
                <TouchableOpacity
                    style={styles.itemContainer}
                    onPress={() => updateContact(item)}
                >
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: item.photo }}
                            style={styles.image}
                        />
                    </View>
                    <Text style={styles.name}>{item.name}</Text>
                </TouchableOpacity>
            </Swipeable>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList data={contacts} renderItem={swipeRenderItem} />

            <TouchableOpacity
                style={styles.addButtonContainer}
                onPress={handleAddButtonPress}
            >
                <Text style={styles.addButtonIcon}>+</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={handleFavouritePress}
                style={styles.favouriteButton}
            >
                <Text style={styles.buttonText}>❤️</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
    },
    addButtonContainer: {
        position: "absolute",
        bottom: 80,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        ...Platform.select({
            android: {
                elevation: 4,
            },
        }),
    },
    addButtonIcon: {
        fontSize: 30,
        color: "#5ba9f1",
        fontWeight: "bold",
    },
    itemContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    imageContainer: {
        width: 50,
        height: 50,
        borderRadius: 25,
        overflow: "hidden",
        marginRight: 10,
    },
    image: {
        width: "100%",
        height: "100%",
    },
    name: {
        fontSize: 16,
        fontWeight: "bold",
    },
    rightSwipeActions: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
    },
    editButton: {
        backgroundColor: "#ffc107",
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginRight: 10,
        borderRadius: 5,
    },
    deleteButton: {
        backgroundColor: "#f44336",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: "#ffffff",
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
    favouriteButton: {
        padding: 10,
        position: "absolute",
        bottom: 10,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "black",
        ...Platform.select({
            android: {
                elevation: 4,
            },
        }),
    },
});

export default ContactListScreen;
