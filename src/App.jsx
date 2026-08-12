import { Dock, Navbar, Welcome } from "#components";
import Background from "#components/Background";
import { Resume, Safari, Terminal } from "#windows";
import gsap from "gsap";

import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main>
      <Navbar />
      <Background />
      <Welcome />
      <Dock />

      <Terminal />
      <Safari />
      <Resume />
    </main>
  );
};

export default App;
