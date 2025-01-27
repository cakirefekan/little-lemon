import { Pressable, Text, StyleSheet } from "react-native";
import { useState } from "react";
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
function LemonButton({ onPress, type, children, ...props}) {

    const [isActive, setIsActive] = useState(false)

    function pressHandle(){
        setIsActive(!isActive)
    }
    return (
        <Pressable onPress={()=>{pressHandle();onPress()}}  style={ (isActive) ? styles[type + "Active"] : styles[type]}  {...props} >
            {
            isActive == true ?
                <Text style={styles[type + "TextActive"]}>{children}</Text>
                :
                <Text style={styles[type + "Text"]}>{children}</Text>

            }
            
        </Pressable>

    );
    
}
    const styles = StyleSheet.create({
        default: {
            width: "auto",
            height: 39,
            paddingHorizontal: 12,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 16,
            backgroundColor: "#495E57",

        },
        defaultActive: {
            width: "auto",
            height: 39,
            paddingHorizontal: 12,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 16,
            backgroundColor: "#EDEFEE",

        },
        defaultText: {
            color: "#EDEFEE",
            fontFamily: "Karla_800ExtraBold"
        },
        defaultTextActive: {
            color: "#333333",
            fontFamily: "Karla_800ExtraBold"
        },
        primary: {
            width: "auto",
            height: 39,
            paddingHorizontal: 12,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 16,
            backgroundColor: "#EDEFEE",

        },
        primaryActive: {
            width: "auto",
            height: 39,
            paddingHorizontal: 12,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 16,
            backgroundColor: "#495E57",

        },
       primaryText: {
            color: "#495E57",
            fontSize: 16,
            fontWeight: 800,
            fontFamily: "Karla_800ExtraBold"
        },
        primaryTextActive: {
            color: "#EDEFEE",
            fontSize: 16,
            fontWeight: 800,
            fontFamily: "Karla_800ExtraBold"
        }
    })
export default LemonButton;