import MapContainer from './Map/MapContainer';
import SidePanelContainer from './SidePanel/SidePanelContainer';
import UserProfile from './Header/UserProfile';

const Layout = () => {
    return (
        <div className="h-auto max-h-[100vh] bg-brand-black">
            <div className="m-auto  max-w-[100rem]">
                <header className="flex h-[7vh] w-full items-center justify-between rounded-lg bg-brand-blue p-2">
                    <div>
                        <p>Farm Watch</p>
                    </div>
                    <UserProfile />
                </header>

                <main className="row-span-1 grid h-[93vh] grid-cols-5  ">
                    <div className="col-span-1 ">
                        <SidePanelContainer />
                    </div>
                    <div className="col-span-4">
                        <MapContainer />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;
