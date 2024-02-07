import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Button,
    TouchableOpacity,
    Image,
    StyleSheet,
    Alert,
} from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addToContactList } from "../../redux/actions";

function CreateContactScreen({ navigation, route }: any) {
    const [name, setName] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [landlineNumber, setLandlineNumber] = useState("");
    const [photo, setPhoto] = useState(null); // Assuming you store the photo as a URI
    const [isFavorite, setIsFavorite] = useState(false);
    // route.params;
    // useState(false);
    const list = useSelector((state: any) => state.reducer);
    const dispatch = useDispatch();
    console.log("Helllllo", JSON.stringify(route.params));

    async function saveContact(item: any) {
        console.log("item in create contact", item);
        dispatch(addToContactList(item));
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

        if (list.some((contact: any) => contact.name === name)) {
            Alert.alert("Error", "This name is already exist");
        }

        Alert.alert("Success", "Data Successfully Added");

        saveContact({
            photo,
            name,
            mobileNumber,
            isFavorite,
            landlineNumber,
        });

        setPhoto(null);
        setName("");
        setMobileNumber("");
        // setIsFavorite();
        setLandlineNumber("");

        navigation.goBack();
    }

    function handleSelectPhoto() {
        ImagePicker.openPicker({
            width: 300,
            height: 300,
            cropping: true,
            includeBase64: true,
        }).then((image: any) => {
            setPhoto(image.path);
        });
    }

    // function handleToggleFavorite() {
    //     setIsFavorite(!isFavorite);
    // }

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
                            <Text style={styles.buttonText}>Photo</Text>
                        </View>
                    )}
                </TouchableOpacity>
            </View>

            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <TextInput
                placeholder="Mobile Number"
                value={mobileNumber}
                onChangeText={setMobileNumber}
                style={styles.input}
                keyboardType="phone-pad"
            />
            <TextInput
                placeholder="Landline Number"
                value={landlineNumber}
                onChangeText={setLandlineNumber}
                style={styles.input}
                keyboardType="phone-pad"
            />
            <Button title="Save Contact" onPress={handleSaveContact} />
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
        width: "50%",
        marginTop: 16,
    },
    buttonImage: {
        width: 100,
        height: 100,
        borderRadius: 64,
        resizeMode: "cover",
    },
    buttonContent: {
        backgroundColor: "white",
        borderColor: "black",
        borderWidth: 3,
        width: 100,
        height: 100,
        borderRadius: 64,
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
});

export default CreateContactScreen;
