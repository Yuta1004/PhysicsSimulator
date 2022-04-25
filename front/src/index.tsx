import { createRoot } from 'react-dom/client';
import Kepler from './app/kepler';

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <Kepler/>
);
