import MapContainer from './Map/MapContainer';
import SidePanelContainer from './SidePanel/SidePanelContainer';
import UserProfile from './Header/UserProfile';
import {
    Drawer,
    DrawerBody,
    DrawerOverlay,
    DrawerContent,
    useDisclosure,
} from '@chakra-ui/react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { useRef } from 'react';
import CustomButton from './ui/CustomButton';
const Layout = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef<HTMLLIElement>(null);

    return (
        <div className="h-auto max-h-[100vh] bg-brand-black">
            <div className="m-auto  max-w-[100rem]">
                <header className="flex h-[7vh] w-full items-center justify-between rounded-lg bg-brand-blue p-2">
                    <div>
                        <p className="hidden md:block">Farm Watch</p>
                        <CustomButton
                            variant="primary"
                            action={onOpen}
                            ref={btnRef}
                            styleOverride="block md:hidden hover:bg-brand-black hover:bg-opacity-80"
                        >
                            <GiHamburgerMenu />
                        </CustomButton>
                    </div>
                    <UserProfile />
                </header>

                <main className="row-span-1 grid h-[93vh] grid-cols-5  ">
                    <div className="order-2 hidden md:col-span-2 md:grid xl:col-span-1">
                        <SidePanelContainer />
                    </div>
                    <div className="order-1 col-span-5 md:col-span-3 xl:col-span-4">
                        <MapContainer />
                    </div>
                    <Drawer
                        isOpen={isOpen}
                        placement="right"
                        onClose={onClose}
                        finalFocusRef={btnRef}
                        colorScheme="teal"
                    >
                        <DrawerOverlay />
                        <DrawerContent>
                            <DrawerBody className="bg-brand-black-medium">
                                <SidePanelContainer />
                            </DrawerBody>
                        </DrawerContent>
                    </Drawer>
                </main>
            </div>
        </div>
    );
};

export default Layout;
