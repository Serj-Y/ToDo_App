import { memo } from 'react';
import { FaRegMoon, FaSun } from 'react-icons/fa';
import { Button, ButtonTheme } from '../../Button/Button';
import { classNames } from '../../../lib/classNames/classNames';
import {Theme, useTheme} from "../../../../app/providers/ThemeProvider";

interface ThemeSwitcherProps {
    className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            theme={ButtonTheme.CLEAR}
            className={classNames('', {}, [className])}
            onClick={toggleTheme}
        >
            {theme === Theme.DARK ? <FaRegMoon /> : <FaSun />}
        </Button>
    );
});
