function dataStructure() {
    const baseData = {
        personal: {
            fname: "",
            lname: "",
            email: "",
            tel: "",
            profileImage : ""
        },
        communication: {
            orderStatus: false,
            passwordChanges: false,
            specialOffers: false,
            newsletter: false
        }
    }

    return baseData
}

export default dataStructure