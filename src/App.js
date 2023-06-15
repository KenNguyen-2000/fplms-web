import { ToastContainer } from 'react-toastify';

import { AuthProvider } from './contexts/auth';
import { LoadOverlayProvider } from './contexts/loadOverlay';
import { RouterComponent } from './routes';

import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <AuthProvider>
            <ToastContainer />
            <LoadOverlayProvider>
                <RouterComponent />
            </LoadOverlayProvider>
        </AuthProvider>
    );
}

export default App;
