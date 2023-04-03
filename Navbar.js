import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Barcode from './Barcode';
import Login from './Login';

const Tab = createBottomTabNavigator();

export default function Navbar() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="login" component={Login} />
      <Tab.Screen name="barcode" component={Barcode} />
    </Tab.Navigator>
  );
}