import {View} from "react-native";

interface LoaderProps {
    className?: string;
}

export const Loader = ({ className }: LoaderProps) => (
    <View
        // className={classNames('lds-ellipsis', {}, [className])}
    >
        <View />
        <View />
        <View />
        <View />
    </View>
);
