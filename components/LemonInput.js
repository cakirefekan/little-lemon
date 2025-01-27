import { TextInput, Text, StyleSheet } from "react-native";
import { useEffect, useState, useContext } from "react"
import { SavedDataContext } from "./SavedDataContextProvider";
import { MaskedTextInput } from "react-native-mask-text";

const LemonInput = ({ colorScheme, header, dataRef, value, ...props }) => {
    const { savedData, setSavedData } = useContext(SavedDataContext);
    const [val, setVal] = useState()
    let mask = undefined
    switch (dataRef[1]) {
        case "tel":
            mask = "0 (999) 999-99-99"
            break;

        default:
            mask = false
            break;
    }

    useEffect(() => {
        function getData() {
            if (savedData[dataRef[0]] !== undefined) {
                const loadedValue = savedData[dataRef[0]][dataRef[1]]
                loadedValue == "" ? null : setVal(loadedValue)
            }
        }
        getData()
    }, [savedData])

    function setValueFunction(data) {
        try {
            // 1. dataRef doğrulaması
            if (!dataRef || !Array.isArray(dataRef) || dataRef.length < 2) {
                throw new Error("Invalid dataRef structure: It must be an array with at least two elements.");
            }
            setVal(data); // Yerel input değeri güncellemesi

            // 2. Mevcut savedData'dan gelen alt yapı (varsayılan değer ekleniyor)
            const currentCategory = savedData[dataRef[0]] || {}; // dataRef[0] yoksa boş bir nesne alır
            const updatedCategory = {
                ...currentCategory, // Diğer alt anahtarları korur
                [dataRef[1]]: data, // Güncellenen alt anahtar
            };

            // 3. Tüm savedData'nın yeni hali
            const theData = {
                ...savedData, // Diğer kategorileri korur
                [dataRef[0]]: updatedCategory, // Güncellenmiş kategori
            };

            // 4. Durum ve değer güncelleniyor
            setSavedData(theData); // Global savedData güncellemesi

            // 5. Güncellenmiş veriyi konsola yazdır (isteğe bağlı)
            console.log("Updated data:", theData);
        } catch (error) {
            // Hata yakalama ve konsola hata mesajı gönderme
            console.error("Error in setValueFunction:", error.message);
        }
    }
    props.enterKeyHint = props.enterKeyHint ?? 'next'
    const styles = StyleSheet.create({
        input: {
            padding: 12,
            borderRadius: 8,
            borderWidth: StyleSheet.hairlineWidth,
            backgroundColor: "white",
            color: "#495E57", marginVertical: 0, fontFamily: "Karla_400Regular", fontSize: 16, fontWeight: 400,

        },
        darkText: { marginTop: 10, color: "#ffffff", fontFamily: "Karla_700Bold", fontSize: 18, fontWeight: 700, },
        lightText: { marginTop: 10, color: "#495E57", fontFamily: "Karla_700Bold", fontSize: 18, fontWeight: 700, }
    })
    return (<>
        <Text style={styles[colorScheme + "Text"]}>{header}</Text>
        {mask != false ?
            <MaskedTextInput
                mask={mask}
                onChangeText={(text, rawText) => {
                    console.log(text);
                    console.log(rawText);
                    (text) => { setValueFunction(text) }
                }}
                style={styles.input}
                {...props}
            /> :

            <TextInput onChangeText={(text) => { setValueFunction(text) }} style={styles.input} value={val}  {...props}></TextInput>
        }
    </>)
}

export default LemonInput;