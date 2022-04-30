import { createRoot } from 'react-dom/client';

import Kepler from './app/kepler/kepler';
import init, { InitOutput } from '@kepler-core/kepler-core';

init().then((instance: InitOutput) => {
    const container = document.getElementById("root");
    const root = createRoot(container!);
    root.render(
        <Kepler memory={instance.memory}/>
    );
});
