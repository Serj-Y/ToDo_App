import React, {memo} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {ChangeUserNameForm, ChangeUserPasswordForm} from '../../EditUser';
import {useTheme} from '@app/providers/ThemeProvider';
import {getUserAuthData} from '@entities/User';
import {useSelector} from 'react-redux';
import BottomButtons from './BottomButtons/BottomButtons.tsx';
// import {ActivateEmailForm} from '../../ActiveEmail';

const Settings: React.FC = memo(() => {
  const {theme} = useTheme();
  const authData = useSelector(getUserAuthData);

  return (
    <View style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/*{!authData?.emailActivate && <ActivateEmailForm />}*/}
        <ChangeUserNameForm currentName={authData?.name} />
        <ChangeUserPasswordForm />
        <BottomButtons />
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'space-around',
  },
});

export default Settings;
