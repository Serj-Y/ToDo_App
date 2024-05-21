import {memo, useCallback, useState} from "react";
import {useTranslation} from "react-i18next";
import {useAppDispatch} from "../../../../../shared/lib/hooks/useAppDispatch/useAppDispatch.ts";
import {useSelector} from "react-redux";
import {getLoginIsLoading} from "../../model/selectors/getLoginIsLoading/getLoginIsLoading.ts";
import {getLoginError} from "../../model/selectors/getLoginError/getLoginError.ts";
import {signIn} from "../../model/services/signIn/signIn.ts";
import {Button, StyleSheet, Text, TextInput, View} from "react-native";

export interface SignInFormProps {
    className?: string;
    onSuccess: () => void
}


const SignInForm = memo(({ className, onSuccess }: SignInFormProps) => {
    const { t } = useTranslation();
    const [isForgotPassword, setIsForgotPassword] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const isLoading = useSelector(getLoginIsLoading);
    const error = useSelector(getLoginError);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onChangeUsername = useCallback((value: string) => {
    }, [dispatch]);

    const onChangePassword = useCallback((value: string) => {
    }, [dispatch]);

    const onSignInClick = useCallback(async () => {
        const result = await dispatch(signIn({ email, password }));
        console.log(result)
        if (result.meta.requestStatus === 'fulfilled') {
            onSuccess();
        }
    }, [dispatch, password, email, onSuccess]);

    const onForgotPasswordClick = useCallback(() => {
        setIsForgotPassword((prev) => !prev);
    }, [dispatch]);
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Sign In</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title="Sign In" onPress={onSignInClick} />
        </View>
    );
});


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 10,
    },
});

export default SignInForm;
