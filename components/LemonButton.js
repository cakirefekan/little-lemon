import { Pressable, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function LemonButton({ type, children, ...props}) {


    return (
        <Pressable style={({ pressed }) => (pressed) ? styles[type + "Active"] : styles[type]}  {...props} >
            {({ pressed }) =>
            pressed ?
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
            height: 62,
            paddingHorizontal: 12,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 8,
            backgroundColor: "#495E57",

        },
        defaultActive: {
            width: "auto",
            height: 62,
            paddingHorizontal: 12,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 8,
            backgroundColor: "#F4CE14",

        },
        defaultText: {
            color: "#EDEFEE",
        },
        defaultTextActive: {
            color: "#333333"
        },
        primary: {
            width: "auto",
            height: 62,
            paddingHorizontal: 12,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 8,
            backgroundColor: "#F4CE14",

        },
        primaryActive: {
            width: "auto",
            height: 62,
            paddingHorizontal: 12,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 8,
            backgroundColor: "#495E57",

        },
       primaryText: {
            color: "#333333",
        },
        primaryTextActive: {
            color: "#EDEFEE"
        }
    })
export default LemonButton;