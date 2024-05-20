import { memo } from 'react';
// import cls from './Text.module.scss';
import { classNames, Mods } from '../../lib/classNames/classNames';
import {View, Text} from "react-native";

export const enum TextTheme {
    PRIMARY = 'primary',
    SECONDARY = 'secondary',
    ERROR = 'error',
}

export const enum TextAlign {
    RIGHT = 'right',
    LEFT = 'left',
    CENTER = 'center'
}

export const enum TextSize {
    S = 'size_s',
    M = 'size_m',
    L = 'size_l',
}

interface TextProps {
    className?: string;
    title?: string;
    text?: string;
    theme?: TextTheme;
    align?: TextAlign;
    size?: TextSize;
}

export const CustomText = memo(({
    className, text, title, theme = TextTheme.PRIMARY, align = TextAlign.LEFT, size = TextSize.M,
}: TextProps) => {
    const mods: Mods = {
        // [cls[theme]]: true,
        // [cls[align]]: true,
        // [cls[size]]: true,
    };
    return (
        <View
            // className={classNames(cls.Text, mods, [className])}
        >
            {title && <Text
                // className={cls.title}
            >{title}</Text>}
            {text && <Text
                // className={cls.text}
            >{text}</Text>}
        </View>
    );
});
