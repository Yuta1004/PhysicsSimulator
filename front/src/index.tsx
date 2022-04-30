import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Kepler from './app/kepler/kepler';
import init, { InitOutput } from '@kepler-core/kepler-core';

init().then((instance: InitOutput) => {
    const container = document.getElementById("root");
    const root = createRoot(container!);
    root.render(
        <BrowserRouter>
            <Routes>
                <Route path="" element={<Navigate replace to="/kepler"/>}/>
                <Route path="kepler" element={<Kepler memory={instance.memory}/>}/>
            </Routes>
        </BrowserRouter>
    );
});
