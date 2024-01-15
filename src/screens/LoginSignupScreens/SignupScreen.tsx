import React, { useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native';
import { colors, titles, btn1, hr80 } from '../../globals/style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { firebase } from '../../../Firebase/FirebaseConfig';
import Toast from 'react-native-toast-message';

interface SignupScreenProps {
    navigation: any; // You should replace 'any' with the correct navigation prop type
}

const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {

    const [emailfocus, setEmailfocus] = useState<boolean>(false);
    const [passwordfocus, setPasswordfocus] = useState<boolean>(false);
    const [isSecureEntry, setIsSecureEntry] = useState<boolean>(true);
    const [cpasswordfocus, setcPasswordfocus] = useState<boolean>(false);
    const [showcpassword, setshowcPassword] = useState<boolean>(false);
    const [phonefocus, setPhonefocus] = useState<boolean>(false);
    const [namefocus, setNamefocus] = useState<boolean>(false);
    const [addressfocus, setAddressfocus] = useState<boolean>(false);
    // taking form data
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [cpassword, setcPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [phone, setPhone] = useState<number | undefined>(undefined);

    // custom messages
    const [customError, setCustomError] = useState();
    const [successmsg, setSuccessmsg] = useState<string | null>(null);



    // const handleSignup = () => {
    //     const formData: {
    //         email: string;
    //         password: string;
    //         name: string;
    //         phone: number | undefined;
    //     } = {
    //         email,
    //         password,
    //         name,
    //         phone,
    //     };

    //     // Email format validation
    //     const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    //     if (!emailRegex.test(formData.email)) {
    //         alert("Invalid Email Format");
    //         return;
    //     }

    //     if (password !== cpassword) {
    //         alert("Password Does not Match");
    //         return;
    //     } else if (password.length < 8) {
    //         alert("Password Must be 8 Characters");
    //         return;
    //     } else if (name === '') {
    //         alert("Name must not be empty");


    //         return;
    //     } else if (phone === null) {
    //         alert("Phone must not be empty");
    //         return;
    //     } else if (!/(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]+/.test(password)) {
    //         alert("Password must contain at least one special character or digit");
    //         return;
    //     }

    //     try {
    //         firebase.auth().createUserWithEmailAndPassword(email, password)
    //             .then(() => {
    //                 console.log("user created");
    //                 // setSuccessmsg("Account Created Successfully")
    //                 const userRef = firebase.firestore().collection("UserData")
    //                 userRef.add(formData).then(() => {
    //                     console.log("Data Stored to firebase")
    //                 }).catch((error) => {
    //                     console.log("Database Error", error)
    //                 })
    //             })
    //             .catch((error) => {
    //                 console.log("Signup firebase error ", error.message)
    //             })
    //     } catch (error) {
    //         console.log("Signup system error ", error.message)
    //         if (error.message == ' The email address is already in use by another account. (auth/email-already-in-use).') {
    //             console.log("Email Already Exists")
    //         }
    //     }
    // };



    const handleSignup = () => {
        const formData: {
            email: string;
            password: string;
            name: string;
            address: string;
            phone: number | undefined;
        } = {
            email,
            password,
            name,
            phone,
            address
        };

        // Email format validation
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(formData.email)) {
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Invalid Email Format',
            });
            return;
        }

        if (password !== cpassword) {
            Toast.show({
                type: 'error',
                text1: 'Password Does not Match',
            });
            return;
        } else if (password.length < 8) {
            Toast.show({
                type: 'error',
                text1: 'Password Must be 8 Characters',
            });
            return;
        } else if (name === '') {
            Toast.show({
                type: 'error',
                text1: 'Name must not be empty',
            });
            return;
        } else if (address === '') {
            Toast.show({
                type: 'error',
                text1: 'Address must not be empty',
            });
            return;
        } else if (phone === null) {
            Toast.show({
                type: 'error',
                text1: 'Phone must not be empty',
            });
            return;
        } else if (!/(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]+/.test(password)) {
            Toast.show({
                type: 'error',
                text1: 'Password must contain at least one special character or digit',
            });
            return;
        }

        firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then((userId) => {
                console.log(userId);
                console.log('user created');
                if (userId?.user?.uid) {
                    const userRef = firebase.firestore().collection('UserData');
                userRef.add(
                    {
                        email,
                        password,
                        name,
                        phone,
                        address,
                        uid: userId?.user?.uid,
                    }
                )
                    .then(() => {
                        console.log('Data Stored to Firebase');
                        setSuccessmsg('User Created Successfully')
                        Toast.show({
                            type: 'success',
                            text1: 'Account Created Successfully',
                        });
                    })
                    .catch((error) => {
                        console.log('Database Error', error);
                        Toast.show({
                            type: 'error',
                            text1: 'Database Error: ' + error.message,
                        });
                    });
                }
            })
            .catch((error) => {
                console.log('Signup Firebase Error', error.message);
                Toast.show({
                    type: 'error',
                    text1: 'Error: ' + error.message,
                });
            });
    };




    return (
        <View style={styles.container}>
            <StatusBar />
            {successmsg == null ?

                <View style={styles.container}>
                    {/* <Toast ref={(ref) => {Toast.setRef(ref)}}/> */}
                    <Text style={styles.head1}>Sign Up</Text>
                    {/* <ToastManager/> */}

                    {/* {customError !== '' && <Text style={styles.errormsg}>{customError}</Text>} */}
                    <View style={styles.inputout}>
                        <Icon name="person" size={24} color={namefocus === true ? colors.text1 : colors.text2} style={styles.icon} />
                        <TextInput style={styles.input} placeholder='Full Name'
                            onFocus={() => {
                                setEmailfocus(false)
                                setNamefocus(true)
                                setPasswordfocus(false)
                                setAddressfocus(false)
                                setcPasswordfocus(false)
                            }}
                            onChangeText={(text) => setName(text)}
                        ></TextInput>
                    </View>
                    <View style={styles.inputout}>
                        <Icon name="mail" size={24} color={emailfocus === true ? colors.text1 : colors.text2} style={styles.icon} />
                        <TextInput style={styles.input} placeholder='Email'
                            onFocus={() => {
                                setEmailfocus(true)
                                setPasswordfocus(false)
                                setNamefocus(false)
                                setcPasswordfocus(false)
                                setAddressfocus(false)
                            }}
                            onChangeText={(text) => setEmail(text)}
                        ></TextInput>
                    </View>
                    <View style={styles.inputout}>
                        <Icon name="phone" size={24} color={phonefocus === true ? colors.text1 : colors.text2} style={styles.icon} />
                        <TextInput style={styles.input} placeholder='Phone Number'
                            onFocus={() => {
                                setEmailfocus(false)
                                setPhonefocus(true)
                                setPasswordfocus(false)
                                setcPasswordfocus(false)
                                setAddressfocus(false)
                            }}
                            onChangeText={(text) => setPhone(text)}
                        ></TextInput>
                    </View>
                    <View style={styles.inputout}>
                        <Icon name="home" size={24} color={addressfocus === true ? colors.text1 : colors.text2} style={styles.icon} />
                        <TextInput style={styles.input} placeholder='Full Address'
                            onFocus={() => {
                                setEmailfocus(false)
                                setNamefocus(false)
                                setAddressfocus(true)
                                setPasswordfocus(false)
                                setcPasswordfocus(false)
                                setPhonefocus(false)
                            }}
                            onChangeText={(text) => setAddress(text)}
                        ></TextInput>
                    </View>
                    <View style={styles.inputout}>
                        <Icon name="lock" size={22} color={passwordfocus === true ? colors.text1 : colors.text2} style={styles.icon} />
                        <TextInput style={styles.input} placeholder='Password' secureTextEntry={isSecureEntry} icon={
                            <TouchableOpacity onPress={() => {
                                setIsSecureEntry((prev) => !prev)
                            }}>
                                <Text>{isSecureEntry ? 'Show' : 'Hide'}</Text>
                            </TouchableOpacity>
                        }
                            onFocus={() => {
                                setEmailfocus(false)
                                setPasswordfocus(true)
                                setPhonefocus(false)
                                setcPasswordfocus(false)
                                setAddressfocus(false)
                            }}
                            onChangeText={(text) => setPassword(text)}
                        ></TextInput>
                    </View>
                    <View style={styles.inputout}>
                        <Icon name="lock" size={22} color={cpasswordfocus === true ? colors.text1 : colors.text2} style={styles.icon} />
                        <TextInput style={styles.input} placeholder='Confirm Password' secureTextEntry={isSecureEntry} icon={
                            <TouchableOpacity onPress={() => {
                                setIsSecureEntry((prev) => !prev)
                            }}>
                                <Text>{isSecureEntry ? 'Show' : 'Hide'}</Text>
                            </TouchableOpacity>
                        }
                            onFocus={() => {
                                setEmailfocus(false)
                                setcPasswordfocus(true)
                                setPasswordfocus(false)
                                setAddressfocus(false)
                            }}
                            onChangeText={(text) => setcPassword(text)}
                        ></TextInput>
                    </View>
                    <TouchableOpacity style={btn1} onPress={() => handleSignup()}>
                        <Text style={{ color: colors.col1, fontSize: titles.btntxt, fontWeight: "bold" }}>Sign Up</Text>
                    </TouchableOpacity>
                    {/* <Text style={styles.forgot}>Forgot Password?</Text> */}
                    <Text style={styles.or}>OR</Text>
                    <Text style={styles.gftxt}>Sign in With</Text>

                    <View style={styles.gf}>
                        <TouchableOpacity>
                            <View style={styles.gficon}>
                                <Icon name="facebook" size={24} color='#FF0000' />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <View style={styles.gficon}>
                                <Icon name="facebook" size={24} color='#FF0000' />
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={hr80}></View>
                    <Text>Already have an account
                        <Text style={{ color: colors.text1 }} onPress={() => navigation.navigate('Login')}> Sign In</Text>
                    </Text>
                    <Toast />
                </View>


                :
                <View style={styles.container1}>
                    <Text style={styles.successmsg}>{successmsg}</Text>
                    <TouchableOpacity style={btn1} onPress={() => navigation.navigate("Login")}>
                        <Text style={{ color: colors.col1, fontSize: titles.btntxt, fontWeight: "bold" }}>Sign In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={btn1} onPress={() => setSuccessmsg(null)}>
                        <Text style={{ color: colors.col1, fontSize: titles.btntxt, fontWeight: "bold" }}>Go Back</Text>
                    </TouchableOpacity>
                </View>

            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    container1: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    head1: {
        fontSize: titles.title1,
        color: colors.text1,
        textAlign: 'center',
        marginVertical: 10,
    },
    inputout: {
        flexDirection: 'row',
        width: '80%',
        marginVertical: 10,
        backgroundColor: colors.col1,
        borderRadius: 10,
        paddingHorizontal: 5,
        paddingVertical: 5,
        // alignSelf: 10,
        elevation: 20,
    },

    input: {
        // fontSize: 18,
        // marginLeft: 10,
        width: '80%',
    },
    icon: {
        marginTop: 12,
    },
    forgot: {
        color: colors.text2,
        marginTop: 20,
        marginBottom: 10,
    },
    or: {
        color: colors.text1,
        marginVertical: 10,
        fontWeight: "bold",
    },
    gftxt: {
        color: colors.text2,
        marginBottom: 10,
        fontSize: 20,
    },
    gf: {
        flexDirection: "row",
    },
    gficon: {
        backgroundColor: '#fff',
        width: 50,
        marginHorizontal: 10,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 20,
    },
    successmsg: {
        color: '#00F000',
        fontSize: 20,
        marginBottom: 30,
    },
});

export default SignupScreen;