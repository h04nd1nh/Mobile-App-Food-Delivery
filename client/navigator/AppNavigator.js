import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Direction from '../screens/Direction';
import Welcome from '../screens/Welcome';
import ProductTitle from '../components/ProductTitle';
import Cart from '../screens/Cart';
import Account from '../screens/Account';
import Contact from '../screens/Contact';
import About from '../screens/About';

const AppNavigator = createStackNavigator(
  {
    Direction: Direction, // Đăng ký màn hình Home và đặt tên cho nó là "Home"
    Welcome: Welcome,
    ProductTitle: ProductTitle,
    Cart: Cart,
    Account: Account,
    Contact: Contact,
    About: About,
  },
  {
    initialRouteName: 'Welcome', // Đặt màn hình ban đầu là "Welcocome"
  }
);



export default createAppContainer(AppNavigator);