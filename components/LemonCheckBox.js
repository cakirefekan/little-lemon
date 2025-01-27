import { View, Pressable, Text, StyleSheet, } from "react-native";
import { useState, useEffect, useContext } from "react";
import { SavedDataContext } from "./SavedDataContextProvider";
function LemonCheckbox({ dataRef, label }) {
    const { savedData, setSavedData } = useContext(SavedDataContext)
    const [isChecked, setIsChecked] = useState(false)

    const color = isChecked ? "#495E57" : "transparent"
    useEffect(() => {
        const state = savedData[dataRef[0]][dataRef[1]]
        setIsChecked(state)
    }, [savedData])
    function pressHandle() {
        const newState = !isChecked;
        setIsChecked(newState)
        setSavedData({
            ...savedData,
            [dataRef[0]]: {
                ...savedData[dataRef[0]],
                [dataRef[1]]: newState,
            }
        })
    }
    return (
        <View style={{ marginVertical: 0 }}>
            <Pressable onPress={() => pressHandle()} style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ borderWidth: StyleSheet.hairlineWidth, borderRadius: 8, height: 20, width: 20, marginRight: 10, justifyContent: "center", alignItems: "center", padding: 5, backgroundColor: color }}>
                    <Text></Text>
                </View>
                <Text style={{color: "#495E57", marginVertical:10, fontFamily:  "Karla_400Regular", fontSize: 16, fontWeight:400, }}>{label}</Text>
            </Pressable>
        </View>
    );
}

export default LemonCheckbox;