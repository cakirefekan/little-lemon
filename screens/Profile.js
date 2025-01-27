
import { ScrollView, TouchableWithoutFeedback, KeyboardAvoidingView, Text, View, TextInput, Image, Pressable, StyleSheet, Platform } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import LemonButton from "../components/LemonButton"
import LemonInput from "../components/LemonInput"
import LemonCheckBox from "../components/LemonCheckBox"
import { useState, useRef, useEffect, useContext } from "react";
import { SavedDataContext } from "@/components/SavedDataContextProvider";
import { AuthContext } from "../components/ContextProviders";
import { validateEmail, validateName, pickImage } from "../constants/functions"
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons"

function ProfileDetails() {
    const navigation = useNavigation()
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)
    const { savedData, setSavedData } = useContext(SavedDataContext);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    // Verileri AsyncStorage'dan yükleme
    async function loadData() {
        try {
            const retrieved = await AsyncStorage.getItem("lemonData");
            const parsedData = JSON.parse(retrieved) || {
                personal: { fname: "", lname: "", email: "", tel: "" },
                communication: { orderStatus: false, passwordChanges: false, specialOffers: false, newsletter: false },
            };
            setSavedData(parsedData);
        } catch (error) {
            console.error("Error loading data:", error);
        }
    }

    // Verileri AsyncStorage'a kaydetme
    async function saveData() {
        const name = savedData.personal.fname
        const email = savedData.personal.email

        if (validateEmail(email) && validateName(name)) {
            try {
                await AsyncStorage.setItem("lemonData", JSON.stringify(savedData));
                setIsSaved(true)
                console.log(isSaved.current)
            } catch (error) {
                console.error("Error saving data:", error);
            }
        }

    }

    // Tüm verileri sıfırlama
    async function resetData() {
        loadData();
    }

    // Çıkış işlemi
    function logout() {
        AsyncStorage.clear().then(() => setSavedData({})).then(() => {
            setIsLoggedIn(!isLoggedIn)

        });
    }

    useEffect(() => {
        loadData();
    }, []);
    function getImage() {
        return savedData.personal.profileImage == "" ? require("../assets/images/defaultPP.png") : { uri: savedData.personal.profileImage }
    }
    return (
        <>
            <View style={styles.header}>
                <Pressable onPress={() => { navigation.goBack(); resetData() }} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <Icon style={styles.searchIcon} name="chevron-back" size={20} color="#000" />
                </Pressable>
                <View style={{
                    flex: 5,
                    padding: 5,
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <Image source={require("../assets/images/LittleLemonLogo.png")} />
                </View>
                <View style={{
                    flex: 1,
                    overflow: "hidden",
                    maxHeight: 40,
                    padding: 0,
                    justifyContent: "center",
                    alignItems: "center"
                }} >
                    <Image style={{
                        width: null,
                        height: null,
                        flex: 1,
                        borderRadius: 1000,
                        overflow: "hidden",
                        justifyContent: "center",
                        alignItems: "center",
                        aspectRatio: "1/1",

                    }} source={getImage()} />
                </View>
            </View>
            <ScrollView style={styles.profileDetails}>
                {/** Avatar */}
                <View style={{
                    flex: 1, flexDirection: "column", minHeight: 80
                }}>
                    <Text>Avatar</Text>
                    <View style={{ flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}>
                        <View style={{
                            overflow: "hidden",
                            justifyContent: "center",
                            padding: 0,

                            alignItems: "center"
                        }} >
                            <Image style={{
                                width: null,
                                height: null,
                                flex: 1,
                                borderRadius: 1000,
                                overflow: "hidden",
                                aspectRatio: "1/1",

                            }} source={getImage()} />
                        </View>
                        <LemonButton onPress={async () => {
                            const image = await pickImage()
                            if (image !== null) {
                                const result = {
                                    ...savedData,
                                    personal: {
                                        ...savedData.personal,
                                        profileImage: image

                                    }
                                }
                                setSavedData(result)
                            }

                        }} type="default">Change</LemonButton>
                        <LemonButton onPress={() => {
                            setSavedData({
                                ...savedData,
                                personal: {
                                    ...savedData.personal,
                                    profileImage: ""
                                }
                            })
                        }} type="primary">Remove</LemonButton>
                    </View>
                </View>
                {/** Form */}
                <View style={{
                    flex: 4,
                    justifyContent: "space-evenly",
                    marginVertical: 20,

                }}>
                    <View>
                        <LemonInput colorScheme="light" dataRef={["personal", "fname"]} header="First Name" autoComplete="given-name" value={savedData.personal?.fname} placeholder="enter your given name..." />
                    </View>
                    <View>
                        <LemonInput colorScheme="light" dataRef={["personal", "lname"]} header="Last Name" autoComplete="family-name" value={savedData.personal?.lname} placeholder="enter your given name..." />
                    </View>
                    <View>
                        <LemonInput colorScheme="light" dataRef={["personal", "email"]} header="Email" autoComplete="email" inputMode="email" value={savedData.personal?.email} placeholder="enter your given name..." />

                    </View>
                    <View>
                        <LemonInput colorScheme="light" dataRef={["personal", "tel"]} header="Phone Number" autoComplete="tel" value={savedData.personal?.tel} enterKeyHint='done' inputMode="tel" placeholder="enter your given name..." />

                    </View>
                </View>
                {/** Notifications */}
                <View style={{
                    flex: 1,
                }}>
                    <View>
                        <LemonCheckBox dataRef={["communication", "orderStatus"]} label="Order statuses" />

                    </View>
                    <View>
                        <LemonCheckBox dataRef={["communication", "passwordChanges"]} label="Password changes" />

                    </View>
                    <View>
                        <LemonCheckBox dataRef={["communication", "specialOffers"]} label="Special offers" />

                    </View>
                    <View>
                        <LemonCheckBox dataRef={["communication", "newsletter"]} label="Newsletter" />
                    </View>
                </View>
                {/** Buttons */}
                <View style={{
                    flex: 2,
                    marginVertical: 20,
                    justifyContent: "space-between",
                }}>
                    <View>
                        <LemonButton onPress={() => { logout() }} type="primary">Log out</LemonButton>
                    </View>
                    <View style={{ marginTop: 20, flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
                        <LemonButton type="primary" onPress={() => { resetData(); setIsSubmitted(!isSubmitted); }}>Discard changes</LemonButton>
                        <LemonButton type="default" onPress={() => { saveData() }}>Save changes</LemonButton>
                    </View>
                </View>
                {isSaved == true ?
                    <Text>Your data have saved successfully!</Text>
                    :
                    null
                }
            </ScrollView>
        </>
    );

}
const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        flex: 1,
        flexShrink: 1,
        maxHeight: 60,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff"

    },
    profileDetails: {
        flex: 1,
        flexGrow: 1,
        borderRadius: 8,
        borderColor: "rgb(248,248,250)",
        borderWidth: 1,
        margin: 8,
        padding: 12,
        flexDirection: "column",
        backgroundColor: "#fff"


    }
})
export default function Profile() {
    return (

        <ProfileDetails />

    )
}