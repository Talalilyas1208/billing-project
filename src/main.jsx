import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById('root')).render(
<GoogleOAuthProvider clientId="749725618193-dtvogthm7oqji9l7rsrciretvsh02kj4.apps.googleusercontent.com">
    <App />
 </GoogleOAuthProvider>
)
