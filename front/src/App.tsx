import init from "@kepler-core/kepler-core";

const App = () => {
  init().then(() => {});

  return (
    <div>
      <p>Hello React App!</p>
    </div>
  );
}

export default App;
