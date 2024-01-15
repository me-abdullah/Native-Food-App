import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native';
import { colors, titles, btn1, hr80 } from '../../globals/style';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { firebase } from '../../../Firebase/FirebaseConfig';
import Toast from 'react-native-toast-message';

interface LoginScreenProps {
    navigation: any; // You should replace 'any' with the correct navigation prop type
}
const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
    const [emailfocus, setEmailfocus] = useState<boolean>(false);
    const [passwordfocus, setPasswordfocus] = useState<boolean>(false);
    const [isSecureEntry, setIsSecureEntry] = useState<boolean>(true);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [customError, setCustomError] = useState<string>('');

    const handleLogin = () => {
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                console.log("Logged in done!!!")
                // console.log(user)

                navigation.navigate("Welcomepage")
            })
            .catch((error) => {
                var errorMessage = error.message;
                // console.log(errorMessage);
                if (errorMessage === 'Firebase: The email address is badly formatted. (auth/invalid-email') {
                    // setCustomError("Please enter a valid email address")
                    Toast.show({
                        type: 'error',
                        position: "top",
                        text1: 'Please enter a valid email address',
                    });
                } else {
                    // setCustomError("Incorrect email or password")
                    Toast.show({
                        type: 'error',
                        position: "top",
                        text1: 'Incorrect Email or Password',
                    });
                }
            })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.head1}>Sign In</Text>
            {/* {customError !== '' && <Text style={styles.errormsg}>{customError}</Text>} */}
            <View style={styles.inputout}>
                {/* <AntDesign name="user" size={24} color="black" /> */}
                <Icon name="email" size={24} color={emailfocus === true ? colors.text1 : colors.text2} style={styles.icon} />
                <TextInput style={styles.input} placeholder='Email'
                    onFocus={() => {
                        setEmailfocus(true)
                        setPasswordfocus(false)
                        setCustomError('')
                    }}

                    onChangeText={(text) => {
                        setEmail(text)

                    }}
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
                        setCustomError('')
                    }}
                    onChangeText={(text) => { setPassword(text) }}
                ></TextInput>
            </View>
            <TouchableOpacity style={btn1} onPress={() => handleLogin()}>
                <Text style={{ color: colors.col1, fontSize: titles.btntxt, fontWeight: "bold" }}>Sign in</Text>
            </TouchableOpacity>
            <Text style={styles.forgot}>Forgot Password?</Text>
            <Text style={styles.or}>OR</Text>
            <Text style={styles.gftxt}>Sign in With</Text>

            <View style={styles.gf}>
                <TouchableOpacity>
                    <View style={styles.gficon}>
                        <Icon name="facebook" size={24} color='#FF0000' />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    {/* replace this icon with google icon */}
                    <View style={styles.gficon}>
                        <Icon name="facebook" size={24} color='#FF0000' />
                    </View>
                </TouchableOpacity>
            </View>
            <View style={hr80}></View>
            <Text>Don’t have an account yet?
                <Text style={{ color: colors.text1 }} onPress={() => navigation.navigate('Signup')}> Sign up now!</Text>
            </Text>
            <Toast />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
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
        marginVertical: 10,
        fontSize: 20,
    },
    gf: {
        flexDirection: "row",
    },
    gficon: {
        backgroundColor: '#fff',
        width: 50,
        margin: 10,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 20,
    },
});

export default LoginScreen;