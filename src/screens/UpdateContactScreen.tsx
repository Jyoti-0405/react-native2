import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    Image,
    TextInput,
    Button,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ImagePicker from "react-native-image-crop-picker";
import { useDispatch, useSelector } from "react-redux";
import { deleteContactList, updateContactList } from "../../redux/actions";
import Icon from "react-native-vector-icons/FontAwesome";
import { CheckBox } from "react-native-elements";

function UpdateContactScreen({ navigation, route }: any) {
    const [name, setName] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [landlineNumber, setLandlineNumber] = useState("");
    const [photo, setPhoto] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const { contact } = route.params;
    const contactsList = useSelector((state: any) => state.reducer);
    const dispatch = useDispatch();

    useEffect(() => {
        setPhoto(contact.photo);
        setName(contact.name);
        setMobileNumber(contact.mobileNumber);
        setLandlineNumber(contact.landlineNumber);
    }, []);

    function UpdateContact(name: any, item: any) {
        dispatch(updateContactList(name, item));
    }

    function handleSaveContact() {
        if (name.trim().length === 0) {
            Alert.alert("Error", "Please enter a name");
            return;
        }

        if (
            mobileNumber.trim().length === 0 ||
            mobileNumber.trim().length !== 10
        ) {
            Alert.alert("Error", "Please enter valid phone number");
            return;
        }

        if (
            landlineNumber.trim().length === 0 ||
            landlineNumber.trim().length !== 10
        ) {
            Alert.alert("Error", "Please enter valid landline number");
            return;
        }

        if (photo === null) {
            Alert.alert("Error", "Please select an image");
            return;
        }

        Alert.alert("Success", "Data Successfully Updated");

        UpdateContact(contact.name, {
            photo,
            name,
            mobileNumber,
            landlineNumber,
            isFavorite,
        });
        navigation.goBack();
    }

    function handleSelectPhoto() {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
        }).then((image: any) => {
            setPhoto(image.path);
        });
    }

    function toggleFavorite() {
        setIsFavorite(!isFavorite); // Toggle isFavorite state
    }

    function handleDeleteContact(name: any) {
        Alert.alert("Delete Contact", "Are you sure?", [
            {
                text: "Cancel",
                style: "cancel",
            },
            {
                text: "Delete",
                onPress: async () => {
                    try {
                        const existingContacts = await AsyncStorage.getItem(
                            "contacts"
                        );

                        if (existingContacts) {
                            // Parse the existing contacts from JSON
                            const parsedContacts = JSON.parse(existingContacts);

                            // Filter out the contact to be deleted
                            const updatedContacts = parsedContacts.filter(
                                (contact: any) => contact.name !== name
                            );

                            // Save the updated contacts to AsyncStorage
                            await AsyncStorage.setItem(
                                "contacts",
                                JSON.stringify(updatedContacts)
                            );

                            // Dispatch an action to update the Redux store
                            dispatch(deleteContactList(name));

                            Alert.alert(
                                "Success",
                                "Contact successfully deleted."
                            );

                            navigation.goBack();
                        }
                    } catch (error) {
                        console.error("Error deleting:", error);
                    }
                },
            },
        ]);
        // dispatch(deleteContactList(name));
        // throw new Error("Function not implemented.");
    }

    return (
        <View style={styles.container}>
            <View style={{ alignSelf: "center", margin: 20 }}>
                <TouchableOpacity
                    style={styles.buttonContainer}
                    onPress={handleSelectPhoto}
                >
                    {photo ? (
                        <Image
                            source={{ uri: photo }}
                            style={styles.buttonImage}
                        />
                    ) : (
                        <View style={styles.buttonContent}>
                            <Text style={styles.buttonText}>Select Photo</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>

            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={(text) => setName(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Mobile phone number"
                value={mobileNumber}
                onChangeText={(text) => setMobileNumber(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Landline number"
                value={landlineNumber}
                onChangeText={(text) => setLandlineNumber(text)}
            />
            <View style={styles.checkBoxContainer}>
                <CheckBox
                    checked={isFavorite}
                    onPress={toggleFavorite}
                    containerStyle={{
                        backgroundColor: "transparent",
                        borderWidth: 0,
                    }}
                />
                <Text style={styles.checkBoxText}>Is Favorite</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSaveContact}>
                <Text style={styles.buttonText}>Update Contact</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, { backgroundColor: "red" }]}
                onPress={() => handleDeleteContact(contact.name)}
            >
                <Text style={styles.buttonText}>Delete Contact</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 24,
        backgroundColor: "#f8f8f8",
    },
    input: {
        marginBottom: 12,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        fontSize: 16,
        backgroundColor: "#fff",
    },
    buttonContainer: {
        alignSelf: "center",
        // width: "50%",
        marginTop: 24,
    },
    buttonImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        resizeMode: "cover",
    },
    buttonContent: {
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 3,
        width: 200,
        height: 200,
        borderRadius: 100,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: {
        color: "black",
        fontSize: 16,
    },
    formContainer: {
        width: "100%",
    },
    isFavorite: {
        alignItems: "flex-start",
    },

    checkBoxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 16,
    },
    checkBoxText: {
        marginLeft: 8,
        fontSize: 16,
    },
    button: {
        marginTop: 24,
        backgroundColor: "#007bff",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    // buttonText: {
    //     color: "white",
    //     fontSize: 18,
    // },
});

export default UpdateContactScreen;
