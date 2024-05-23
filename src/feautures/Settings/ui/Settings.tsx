import React, {memo} from 'react';
import {StyleSheet, View} from 'react-native';
import {ChangeUserNameForm, ChangeUserPasswordForm} from '../../EditUser';

const Settings = memo(() => {
  return (
    <View style={styles.container}>
      <ChangeUserNameForm currentName={'Username'} />
      <ChangeUserPasswordForm />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default Settings;
