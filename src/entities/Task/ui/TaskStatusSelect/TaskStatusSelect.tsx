import {TaskStatus} from '../../module/types/taskStatus.ts';
import {useTranslation} from 'react-i18next';
import React from 'react';

interface currencySelectProps {
  className?: string;
  value?: TaskStatus;
  onChange?: (value: TaskStatus) => void;
  readonly?: boolean;
}

export const TaskStatusSelect = ({
  value,
  onChange,
  readonly,
}: currencySelectProps) => {
  const {t} = useTranslation();
  const options = [
    {value: TaskStatus.NOT_DONE, content: t(TaskStatus.NOT_DONE)},
    {value: TaskStatus.DONE, content: t(TaskStatus.DONE)},
    {value: TaskStatus.IN_PROGRESS, content: t(TaskStatus.IN_PROGRESS)},
  ];

  return (
    <Select
      options={options}
      value={value}
      onChange={onChange}
      readonly={readonly}
    />
  );
};
