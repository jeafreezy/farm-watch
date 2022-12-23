import { ToastContainer } from 'react-toastify';
import Layout from '../components/Layout';
import StateManager from '../context/StateManager';
import { ChakraProvider } from '@chakra-ui/react';
export default function HomePage() {
    return (
        <ChakraProvider>
            <StateManager>
                <Layout />
                <ToastContainer />
            </StateManager>
        </ChakraProvider>
    );
}
