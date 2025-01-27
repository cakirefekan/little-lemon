
import { ScrollView, Text, View, TextInput, Image, Pressable, StyleSheet, Platform } from "react-native"
import AsyncStorage from "@react-native-async-storage/async-storage";
import ToggleButton from "../components/ToggleButton"
import LemonInput from "../components/LemonInput"
import { useState, useRef, useEffect, useContext } from "react";
import { SavedDataContext } from "@/components/SavedDataContextProvider";
import { createStaticNavigation, useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/Ionicons"
import AppLoading from 'expo-app-loading';

import {
    useFonts as useFontsMarkazi,
    MarkaziText_400Regular,
    MarkaziText_500Medium,
} from '@expo-google-fonts/markazi-text';

import {
    useFonts as useFontsKarla,
    Karla_200ExtraLight,
    Karla_300Light,
    Karla_400Regular,
    Karla_500Medium,
    Karla_600SemiBold,
    Karla_700Bold,
    Karla_800ExtraBold,
    Karla_200ExtraLight_Italic,
    Karla_300Light_Italic,
    Karla_400Regular_Italic,
    Karla_500Medium_Italic,
    Karla_600SemiBold_Italic,
    Karla_700Bold_Italic,
    Karla_800ExtraBold_Italic,
} from '@expo-google-fonts/karla';
function Home() {
    let [fontsLoaded] = useFontsMarkazi({
        MarkaziText_400Regular,
        MarkaziText_500Medium,
    });

    let fontSize = 24;
    let paddingVertical = 6;

    const navigation = useNavigation();
    const { savedData, setSavedData } = useContext(SavedDataContext);
    const [search, setSearch] = useState("");
    const [searchInput, setSearchInput] = useState("");
    const [menuData, setMenuData] = useState([]);
    let menuCategories = menuData.length > 0 ? new Set(menuData.map(item => item.category)) : new Set(["General"].map(item => item))
    const [filter, setFilter] = useState(new Set())
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

    useEffect(() => {
        loadData();
    }, []);
    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            setSearch(searchInput)

        }, 500);
        return () => {
            clearTimeout(debounceTimer)
        }
    }, [searchInput])
    useEffect(() => {

        const fetcData = async () => {
            data = await fetch("https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json").then((response) => response.json()).then((data) => {
                setMenuData(data.menu)
            })
        }
        fetcData()
    }, [])
    useEffect(() => {
        menuCategories = new Set(menuData.map(item => item.category))
    }, [menuData])
    function getImage() {
        return savedData.personal.profileImage == "" ? require("../assets/images/defaultPP.png") : { uri: savedData.personal.profileImage }
    }
    if (!fontsLoaded) {
        return <AppLoading />;
    } else {
        return (
            <>
                <View style={styles.header}>
                    <View style={{ flex: 1 }}></View>
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
                        <Pressable onPress={() => { navigation.navigate("Profile") }}>
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
                        </Pressable>
                    </View>
                </View>
                <View style={{ backgroundColor: "#495E57", padding: 20, flex: 2 / 3 }}>
                    <Text style={{ fontSize: 64, color: "#F4CE14", fontFamily: "MarkaziText_500Medium", fontWeight: 500 }}>Little Lemon</Text>

                    <View style={{ flex: 2, flexGrow: 1, justifyContent: "space-between", alignItems: "flex-start", flexDirection: "row" }}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ color: "#EDEFEE", fontSize: 40, marginTop: -20, fontFamily: "MarkaziText_400Regular", fontWeight: 400 }}>Chicago</Text>
                            <Text style={{ marginTop: 10, color: "#EDEFEE", fontSize: 18, fontFamily: "Karla_500Medium", fontWeight: 500 }}>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</Text>
                        </View>
                        <View style={{ flex: 1, alignItems: "flex-end", justifyContent: 'flex-start' }}><Image style={{ aspectRatio: 1, height: 120, width: 120, borderRadius: 8 }} source={require("../assets/images/Hero-image.png")} /></View>
                    </View>
                    <View style={styles.searchSection}>
                        <Icon style={styles.searchIcon} name="search" size={20} color="#000" />
                        <LemonInput style={styles.input}
                            placeholder="Greek Salad" dataRef={[]} header={""} onChangeText={(searchString) => { setSearchInput(searchString) }}
                            underlineColorAndroid="transparent" />
                    </View>

                </View>
                <ScrollView stickyHeaderIndices={[0]} style={styles.profileDetails}>
                    <View style={{backgroundColor:"#fff"}}>
                        <Text style={{ fontSize: 20, paddingTop:12, fontFamily: 'Karla_800ExtraBold', fontWeight: 800, color: "black" }}>ORDER FOR DELIVERY!</Text>
                        <View style={{ paddingVertical: 10, borderColor: "#495E57", borderBottomWidth: 1, flexDirection: "row", justifyContent: "space-between" }}>
                            {[...menuCategories].map((category) => (
                                <ToggleButton onPress={() => {
                                    const newFilter = new Set(filter)
                                    newFilter.has(category) ? newFilter.delete(category) : newFilter.add(category)
                                    setFilter(newFilter)
                                }} key={category} type="primary">{category}</ToggleButton>
                            ))}
                        </View>
                    </View>
                    {menuData.filter(item => {
                        return filter.size == 0 || filter.has(item.category)
                    }).map(item => {
                        if (search == "" || item.name.toLowerCase().includes(search.toLowerCase())) {
                            return <MenuItem key={item.name} textData={{ header: item.name, description: item.description, price: item.price }} imageUri={item.image} />
                        }
                        else {
                            return null
                        }
                    })}
                </ScrollView>
            </>
        );

    }

    function MenuItem({ textData, imageUri }) {
        textData = textData || {}
        textData.header = textData.header || "Greek Salad"
        textData.price = textData.price || "$12.99"
        textData.description = textData.description || "The famous greek salad of crispy lettuce, peppers, olives and our Chicag..."
        imageUri = imageUri || "greekSalad.jpg"
        return (<View style={{
            marginVertical: 10,
            paddingVertical: 10,
            paddingBottom: 20,
            borderBottomColor: "#495E57",
            borderBottomWidth: StyleSheet.hairlineWidth,
            flexDirection: "row"
        }}>
            <View style={{ flex: 3, justifyContent: "space-between" }}>
                <Text style={{color: "#495E57", fontFamily: "Karla_700Bold", fontSize: 18, fontWeight:700, }}>{textData.header}</Text>
                <Text style={{color: "#495E57", marginVertical:10, fontFamily:  "Karla_400Regular", fontSize: 16, fontWeight:400, }}>{textData.description}</Text>
                <Text style={{color: "#495E57", fontFamily: "Karla_500Medium", fontSize: 18, fontWeight:500, }}>${textData.price}</Text>
            </View>
            <View style={{ flex: 1, alignItems: "flex-end", justifyContent: "center" }}>
                <Image style={{ borderRadius: 8, width: 80, height: 80, }} source={{ uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${imageUri}?raw=true` }}>
                </Image>
            </View>
        </View>)
    }
}
const styles = StyleSheet.create({
    searchSection: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 8
    },
    searchIcon: {
        paddingVertical: 10,
        paddingLeft: 10,
    },
    input: {
        flex: 1,
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        paddingLeft: 10,
        backgroundColor: '#fff',
        color: '#424242',
        borderRadius: 18,
    },
    header: {
        flexDirection: "row",
        flex: 1,
        flexShrink: 1,
        maxHeight: 60,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",


    },
    profileDetails: {
        flex: 1,
        flexGrow: 1,
        borderRadius: 8,
        borderColor: "rgb(248,248,250)",
        borderWidth: 1,
        margin: 8,
        padding: 12,
        paddingTop:0,
        backgroundColor: "#fff",
        flexDirection: "column",

    }
})
export default Home;