import * as React from 'react';
import { Drawer } from 'react-native-paper';
import {createDrawerNavigator} from '@react-navigation/drawer';

const Drawer_1 = createDrawerNavigator();

const Navbar = () => {
  const [active, setActive] = React.useState('');

  return (
    <Drawer.Section title="Some title">
      <Drawer.Item
        label="First Item"
        active={active === 'first'}
        onPress={() => setActive('first')}
      />
      <Drawer.Item
        label="Second Item"
        active={active === 'second'}
        onPress={() => setActive('second')}
      />
    </Drawer.Section>
  );
};

export default Navbar;