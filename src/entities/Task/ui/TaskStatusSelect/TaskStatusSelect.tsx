import {TaskStatus} from '../../module/types/taskStatus.ts';
import {useTranslation} from 'react-i18next';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {useTheme} from '../../../../app/providers/ThemeProvider';

interface currencySelectProps {
  value?: TaskStatus;
  onChange: (value: TaskStatus) => void;
}

export const TaskStatusSelect = ({value, onChange}: currencySelectProps) => {
  const {t} = useTranslation();
  const {theme} = useTheme();
  const options = [
    {value: TaskStatus.NOT_DONE, label: t(TaskStatus.NOT_DONE)},
    {value: TaskStatus.DONE, label: t(TaskStatus.DONE)},
    {value: TaskStatus.IN_PROGRESS, label: t(TaskStatus.IN_PROGRESS)},
  ];

  return (
    <Dropdown
      style={[styles.dropdown]}
      selectedTextStyle={[
        styles.selectedTextStyle,
        {
          color: theme.invertedPrimaryColor,
        },
      ]}
      maxHeight={200}
      itemTextStyle={{
        color: '#093028',
      }}
      itemContainerStyle={{backgroundColor: '#FDFDFD'}}
      containerStyle={{
        borderRadius: 4,
        borderWidth: 1,
      }}
      value={value}
      data={options}
      onChange={e => onChange(e.value)}
      labelField={'label'}
      valueField={'value'}
    />
  );
};

const styles = StyleSheet.create({
  dropdown: {
    marginHorizontal: 10,
    height: 20,
    width: 120,
  },
  selectedTextStyle: {
    fontSize: 16,
    textAlign: 'center',
  },
});
