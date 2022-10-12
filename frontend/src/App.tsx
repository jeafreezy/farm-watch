import React from 'react'

function App() {
    return (
        <div className="grid h-[100vh] grid-cols-1 grid-rows-1 gap-2 bg-brand-black-medium md:grid-cols-4 md:grid-rows-1">
            <div className="border-2 border-brand-white text-brand-white md:col-span-3">
                MapView
            </div>
            <div className="row-span-1 hidden border-2 border-brand-blue text-brand-white md:block">
                Sidepanel
            </div>
        </div>
    )
}

export default App
