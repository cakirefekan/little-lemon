import { View, Image, Text, StyleSheet, Platform, TextInput, Pressable } from 'react-native';
import { useRef, useState, useEffect, useContext } from 'react';
import { AuthContext } from "../components/ContextProviders";
import { SavedDataContext } from "../components/SavedDataContextProvider";
import dataStructure from "../constants/dataStructure"
import { validateEmail, validateName } from "../constants/functions"
import LemonButton from "../components/LemonButton"
import LemonInput from "../components/LemonInput"
import LemonCheckBox from "../components/LemonCheckBox"// Prevent the splash screen from auto-hiding before asset loading is complete.
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Onboarding() {
    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)
    const { savedData, setSavedData } = useContext(SavedDataContext)
    const baseData = dataStructure();
    const styles = StyleSheet.create({
        container: {
            backgroundColor: "white",
            flex: 1,
            flexDirection: "column"
        }
    })
    return (
        <View style={styles.container}>
            <View style={{ flexShrink: 2, marginVertical: 40, justifyContent: "center", alignItems: "center" }}>
                <Image style={{ justifyContent: "center", alignItems: "center" }} source={require("../assets/images/LittleLemonLogo.png")}></Image>
            </View>
            <View style={{ paddingHorizontal:40, backgroundColor: "#495E57", flex: 1, flexDirection: "column", justifyContent: "space-evenly", alignItems: "stretch", }}>
                    <Text style={{ color: "white" }}>Let us get to know you</Text>
        
                    <View>
                        <LemonInput colorScheme="dark" header="First Name" autoComplete="given-name" dataRef={[""]} onChangeText={setFirstName} value={firstName} inputMode="text" keyboardType='default' placeholder='...' />
                    </View>
                    <View>
                        <LemonInput colorScheme="dark" header="Email" autoComplete="email" dataRef={[""]} onChangeText={setEmail} inputMode="email" keyboardType="" placeholder='...' value={email} />
                    </View>
                </View>
            <View style={{}}>

                <LemonButton onPress={async () => {
                    if (validateEmail(email) && validateName(firstName)) {
                        try {
                            let newData = {
                                ...baseData,
                                personal: {
                                    ...baseData.personal,
                                    fname: firstName,
                                    email: email,
                                },
                            }
                            setIsLoggedIn(true)
                            setSavedData(newData)
                            await AsyncStorage.setItem("lemonData", JSON.stringify(newData));
                            await AsyncStorage.setItem("loggedIn", JSON.stringify({ loggedIn: true }))
                        } catch (error) {
                            console.log(error)
                        }
                    }

                }} type="primary">Save</LemonButton>
            </View>
        </View>
    );

}

