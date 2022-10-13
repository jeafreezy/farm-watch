import React from 'react';
import MapContainer from './components/Map/MapContainer';

function App() {
    return (
        <div className="grid h-[100vh] grid-cols-1 grid-rows-1 gap-2 bg-brand-black-medium md:grid-cols-4 md:grid-rows-1">
            <div className=" text-brand-white md:col-span-3">
                <MapContainer />
            </div>
            <div className="row-span-1 hidden  text-brand-white md:block">
                Sidepanel
            </div>
        </div>
    );
}

export default App;
