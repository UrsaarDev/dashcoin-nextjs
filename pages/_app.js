import { Provider } from 'react-redux';
import store from '/redux/store';
import '/assets/pieneed.css';
import '/assets/sass/app_module.scss';
import '/utils/authToken';

export default App;

function App({ Component, pageProps }) {
    return (
        <>
            <Provider store = {store}>
                <Component {...pageProps} />
            </Provider>
        </>
    );
}