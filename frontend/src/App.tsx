import React from 'react';
import MapContainer from './components/Map/MapContainer';

function App() {
    return (
        <div className="grid h-[100vh] grid-cols-1 grid-rows-1 md:grid-cols-4 md:grid-rows-1">
            <div className=" text-brand-white md:col-span-4">
                <MapContainer />
            </div>
        </div>
    );
}

export default App;
