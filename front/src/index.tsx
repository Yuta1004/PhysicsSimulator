import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import NotFound from './components/notfound';
import Kepler from './app/kepler/kepler';
import init, { InitOutput } from '@kepler-core/kepler-core';

init().then((instance: InitOutput) => {
    const container = document.getElementById("root");
    const root = createRoot(container!);
    root.render(
        <BrowserRouter>
            <Routes>
                <Route path="kepler" element={<Kepler memory={instance.memory}/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </BrowserRouter>
    );
});
