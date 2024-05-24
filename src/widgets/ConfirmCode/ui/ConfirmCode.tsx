import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import PressableOpacity from '../../../shared/ui/pressableOpacity/PressableOpacity.tsx';

interface Theme {
  backgroundColor: string;
  invertedBackgroundColor: string;
  primaryColor: string;
  invertedPrimaryColor: string;
  secondaryColor: string;
  invertedSecondaryColor: string;
}

interface ConfirmCodeProps {
  theme: Theme;
  onSubmit: (code: string) => void;
  submitButtonText?: string;
}

const CELL_COUNT = 5;

const ConfirmCode = ({theme, onSubmit, submitButtonText}: ConfirmCodeProps) => {
  const [value, setValue] = useState('');
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  const handleSubmit = () => {
    onSubmit(value);
  };

  return (
    <View style={styles.root}>
      <CodeField
        ref={ref}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        rootStyle={styles.codeFieldRoot}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        testID="my-code-input"
        renderCell={({index, symbol, isFocused}) => (
          <Text
            key={index}
            style={[
              styles.cell,
              {
                borderColor: theme.primaryColor,
                color: theme.primaryColor,
              },
            ]}
            onLayout={getCellOnLayoutHandler(index)}>
            {symbol || (isFocused ? <Cursor /> : null)}
          </Text>
        )}
      />
      {submitButtonText && (
        <PressableOpacity
          onPress={handleSubmit}
          style={[
            styles.button,
            {backgroundColor: theme.invertedBackgroundColor},
          ]}>
          <Text
            style={[styles.buttonText, {color: theme.invertedPrimaryColor}]}>
            {submitButtonText}
          </Text>
        </PressableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {flex: 1},
  codeFieldRoot: {marginVertical: 10},
  cell: {
    width: 34,
    height: 34,
    lineHeight: 34,
    borderRadius: 4,
    marginHorizontal: 4,
    fontSize: 20,
    borderWidth: 1,
    textAlign: 'center',
  },
  button: {
    padding: 16,
    borderRadius: 4,
    marginVertical: 8,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
  },
});

export default ConfirmCode;
