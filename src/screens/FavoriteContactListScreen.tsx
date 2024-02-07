// FavoriteContactListScreen.tsx
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { FlatList, Swipeable } from "react-native-gesture-handler";
import { useSelector, useDispatch } from "react-redux";
import { deleteContactList } from "../../redux/actions";

const FavoriteContactListScreen = ({ navigation }: any) => {
    const list = useSelector((state: any) => state.reducer);
    console.log("List1", list);
    const [contacts, setContact] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log("List2", list);
        let filteredContacts = list.filter(
            (data: any) => data.isFavorite == true
        );
        console.log("Filtered Contacts", filteredContacts);
        filteredContacts = filteredContacts.sort((a: any, b: any) =>
            a.name.localeCompare(b.name)
        );
        setContact(filteredContacts);
    }, [list]);

    function updateContact(selectedContact: any) {
        navigation.navigate("UpdateContactScreen", {
            contact: selectedContact,
        });

        setContact(list.filter((data: any) => data.isFavorite == true));
    }

    // Filter out contacts with isFavorite set to true
    // let favoriteContacts = list.filter((contact: any) => contact.isFavorite);

    const renderItem = ({ item }: any) => (
        <TouchableOpacity style={styles.itemContainer}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: item.photo }} style={styles.image} />
            </View>
            <Text style={styles.name}>{item.name}</Text>
        </TouchableOpacity>
    );

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

    function swipeRenderItem({ item }: any) {
        return (
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
    }

    return (
        <View style={styles.container}>
            <FlatList data={contacts} renderItem={renderItem} />
        </View>
    );

    // return (
    //     <View style={styles.container}>
    //         <Text style={styles.title}>Favorite Contacts</Text>
    //         <FlatList
    //             data={favoriteContacts}
    //             keyExtractor={(item) => item.name}
    //             renderItem={renderContactItem}
    //         />
    //     </View>
    // );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
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
    },
});

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         paddingHorizontal: 16,
//         paddingTop: 24,
//         backgroundColor: "#f8f8f8",
//     },
//     title: {
//         fontSize: 20,
//         fontWeight: "bold",
//         marginBottom: 16,
//     },
//     contactItem: {
//         flexDirection: "row",
//         alignItems: "center",
//         paddingVertical: 12,
//         borderBottomWidth: 1,
//         borderBottomColor: "#ccc",
//     },
//     contactImage: {
//         width: 50,
//         height: 50,
//         borderRadius: 25,
//         marginRight: 16,
//     },
//     contactName: {
//         fontSize: 16,
//     },
// });

export default FavoriteContactListScreen;
