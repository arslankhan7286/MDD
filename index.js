/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import axios from './axios.client';

// axios.use()



AppRegistry.registerComponent(appName, () => App);