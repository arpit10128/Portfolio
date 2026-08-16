import { techStack } from "#constants";
import { Check } from "lucide-react";
import WindowWrapper from "../hoc/WindowWrapper.jsx";
import { WindowControls } from "#components";

const Terminal = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target="terminal" />
        <h2>Tech Stack</h2>
      </div>

      <div className="techstack">
        <p>
          <span className="font-bold">@arpit % </span>
          show tech stack
        </p>

        <div className="label">
          <p className="w-42">Category</p>
          <p>Technologies</p>
        </div>

        <ul className="content">
          {techStack.map(({ category, items }) => (
            <li
              key={category}
              className="flex items-center"
            >
              <Check className="check" size={20} />
              <h3>{category}</h3>
              <ul>
                {items.map((item, i) => (
                  <li key={i}>
                    {item}
                    {i < items.length - 1 ? "," : ""}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>

        <div className="footnote">
          <p>
            <Check size={20} />5 of 5 stacks loaded
            successfully (100%)
          </p>
        </div>
      </div>
    </>
  );
};

// wrapping in higher order component(hoc)
const TerminalWindow = WindowWrapper(Terminal, "terminal");

export default TerminalWindow;
