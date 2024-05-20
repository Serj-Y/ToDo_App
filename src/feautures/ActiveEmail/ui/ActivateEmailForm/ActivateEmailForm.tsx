import { useTranslation } from 'react-i18next';
import React, { memo, useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import AuthCode from 'react-auth-code-input';
// import cls from './ActivateEmailForm.module.scss';
import { emailActivate } from '../../module/services/activeEmail/emailActivate';
import { sendActiveEmailToken } from '../../module/services/sendActiveEmailToken/sendActiveEmailToken';
import {useAppDispatch} from "../../../../shared/lib/hooks/useAppDispatch/useAppDispatch.ts";
import {Text, View} from "react-native";
import {Button, ButtonSize} from "../../../../shared/ui/Button/Button.tsx";

export interface ChangeUserNameFormProps {
    className?: string;
}

interface FormData {
    emailToken: string
}

const ActivateEmailForm = memo(({ className }: ChangeUserNameFormProps) => {
    const { t } = useTranslation();
    const { control, handleSubmit, reset } = useForm<FormData>();
    const dispatch = useAppDispatch();
    const [isEnterCode, setEnterCode] = useState<boolean>(false);
    const [isResendTimeout, setIsReSendTimeout] = useState<boolean>(false);

    const activeEmailHandler = () => {
        dispatch(emailActivate());
        setEnterCode(true);
        setIsReSendTimeout(true);
        setTimeout(() => {
            setIsReSendTimeout(false);
        }, 60000);
    };

    const onSubmit = useCallback((data: FormData) => {
        reset();
        setEnterCode(false);
        dispatch(sendActiveEmailToken(data));
    }, [dispatch, reset]);

    return (
        <View>
            {!isEnterCode
            && (
                <View
                    // className={cls.EnterConfirmCodeForm}
                >
                    <Text>{t('Active email')} </Text>
                    <Button onClick={activeEmailHandler} size={ButtonSize.M}>
                        {t('Send activate code to email')}
                    </Button>
                </View>
            )}
            {isEnterCode
                && (
                    <form onSubmit={handleSubmit(onSubmit)}
                          // className={cls.EnterConfirmCodeForm}
                    >
                        <Text> {t('Active email')}  </Text>
                      <Text> {t('Check spam mailbox')} </Text>
                        <Controller
                            name="emailToken"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <View
                                    // className={cls.authCodeContainer}
                                >
                                    <Text>{t('Enter code from email')}</Text>
                                    <AuthCode
                                        {...field}
                                        length={5}
                                        // containerClassName={cls.authCodeContainer}
                                        // inputClassName={cls.authCodeInput}
                                        allowedCharacters="numeric"
                                        onChange={(value) => field.onChange(value)}
                                    />
                                </View>
                            )}
                        />
                        { !isResendTimeout && (
                            <Button onClick={activeEmailHandler} size={ButtonSize.M}>
                                {t('Send activate code to email')}
                            </Button>
                        ) }
                        <Button type="submit" size={ButtonSize.M}>
                            {t('Send confirm code')}
                        </Button>
                    </form>
                )}
        </View>

    );
});
export default ActivateEmailForm;
