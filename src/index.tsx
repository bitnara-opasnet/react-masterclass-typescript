import ReactDOM from 'react-dom/client';
import { ThemeProvider } from 'styled-components';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { darkTheme, lightTheme } from './theme';
import App from './App';

const queryClient = new QueryClient()


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    // <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={darkTheme}>
            <App />
        </ThemeProvider>
    </QueryClientProvider>
    // </React.StrictMode>
);
