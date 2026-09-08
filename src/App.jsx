import { Dock, Navbar, Welcome } from "#components";
import Background from "#components/Background";
import MobileLayout from "#components/MobileLayout";
import {
  Contact,
  Finder,
  Image,
  Resume,
  Safari,
  Terminal,
  Text,
} from "#windows";
import gsap from "gsap";

import { Draggable } from "gsap/Draggable";
gsap.registerPlugin(Draggable);

const App = () => {
  return (
    <main>
      <div className="desktop-experience">
        <Navbar />
        <Background />
        <Welcome />
        <Dock />

        <Terminal />
        <Safari />
        <Resume />
        <Finder />
        <Text />
        <Image />
        <Contact />
      </div>

      <MobileLayout />
    </main>
  );
};

export default App;
