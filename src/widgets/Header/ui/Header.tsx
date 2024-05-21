import React, { useState } from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useTheme} from "../../../app/providers/ThemeProvider";

interface HeaderProps {
    appName?: string;
}

const Header: React.FC<HeaderProps> = ({ appName= 'ToDo' }) => {
    const { theme } = useTheme();
    const [username, setUsername] = useState<string>('');

    const handleSignUp = () => {
        setUsername('User1');
    };

    const handleSignIn = () => {
        setUsername('User1');
    };

    return (
        <View style={[styles.container, { backgroundColor: theme.invertedBackgroundColor }]}>
            <Text style={[styles.appName, { color: theme.invertedPrimaryColor }]}>{appName}</Text>
            <View style={styles.buttonsContainer}>
                <TouchableOpacity onPress={handleSignUp} style={styles.button}>
                    <Text style={[styles.buttonText, { color: theme.invertedPrimaryColor }]}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSignIn} style={styles.button}>
                    <Text style={[styles.buttonText, { color: theme.invertedPrimaryColor }]}>Sign In</Text>
                </TouchableOpacity>
                {username && (
                    <Text style={[styles.username, { color: theme.invertedPrimaryColor }]}>{username}</Text>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
    },
    appName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    buttonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        marginHorizontal: 10,
    },
    buttonText: {
        fontSize: 16,
    },
    username: {
        fontSize: 16,
        marginLeft: 10,
    },
});

export default Header;
