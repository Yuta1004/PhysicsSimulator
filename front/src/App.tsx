import init, { greet } from "@kepler-core/kepler-core";

const App = () => {
  init().then(() => {
    greet("WebAssembly");
  });

  return (
    <div>
      <p>Hello React App!</p>
    </div>
  );
}

export default App;
