import { Provider } from 'react-redux'

import InboxScreen from './components/InboxScreen/InboxScreen.component'
import store from './lib/store'
import './App.css'

const App = () => (
  <Provider store={store}>
    <InboxScreen />
  </Provider>
)

export default App
