import { useState } from "react";
import "./App.scss";
import Button from "./components/Button/Button";
import Gentleman from "./components/Gentleman/Gentleman";
import Info from "./components/Info/Info";
import gentlemenData from "./data/gentlemen";

function App() {
  const [gentlemen, setGentlemen] = useState(gentlemenData);

  const nOfSelectedGentlemen = gentlemen.filter(
    (gentleman) => gentleman.selected
  ).length;

  const selectAll = () => {
    setGentlemen(
      gentlemen.map((gentleman) => ({ ...gentleman, selected: true }))
    );
  };

  const toggleGentleman = (id) => {
    const newGentlemen = [...gentlemen];
    const foundGentleman = newGentlemen.find(
      (gentleman) => gentleman.id === id
    );
    foundGentleman.selected = !foundGentleman.selected;

    setGentlemen(newGentlemen);
  };

  const deleteGentleman = (id) => {
    const newGentlemen = [...gentlemen];
    const foundGentleman = newGentlemen.find(
      (gentleman) => gentleman.id === id
    );
    const foundGentlemanIndex = newGentlemen.indexOf(foundGentleman, 0);
    newGentlemen.splice(foundGentlemanIndex, 1);
    console.log(newGentlemen);
    setGentlemen(newGentlemen);
  };
  console.log(gentlemen);

  return (
    <div className="container">
      <header className="main-header">
        <h1 className="main-title">The pointing gentlemen</h1>
      </header>
      <section className="controls">
        <Info infoClass="info" number={nOfSelectedGentlemen} />
        <Button
          buttonClass="button button--select"
          buttonText="Select All"
          actionOnClick={selectAll}
        />
      </section>
      <main className="main">
        <ul className="gentlemen">
          {gentlemen.map((gentleman) => {
            return (
              <Gentleman
                key={gentleman.id}
                manInfo={gentleman}
                actionOnClick={() => {
                  toggleGentleman(gentleman.id);
                }}
                deleteAction={() => {
                  deleteGentleman(gentleman.id);
                }}
              />
            );
          })}
        </ul>
      </main>
    </div>
  );
}

export default App;
