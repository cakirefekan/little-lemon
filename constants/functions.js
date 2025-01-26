import * as ImagePicker from 'expo-image-picker';

function validateEmail(email) {
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    return isEmailValid

};

function validateName(firstName) {
    const isFirstNameValid = /^[a-zA-ZÀ-ÖØ-öø-ÿİı]+$/.test(firstName.trim());
    return isFirstNameValid
};

const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    if (!result.canceled) {
     return result.assets[0].uri;
    }
    else{
       return null
    }
  };
export {pickImage, validateEmail, validateName};
