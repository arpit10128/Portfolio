import { WindowControls } from "#components";
import { socials } from "#constants";
import WindowWrapper from "../hoc/WindowWrapper";

const Contact = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target="contact" />
        <h2>Contact Me</h2>
      </div>

      <div className="space-y-5 p-5">
        <img
          src="/images/arpit.png"
          alt="Arpit"
          className="w-20 rounded-full"
        />

        <h3>Let's Connect</h3>
        <p>
          Got an idea? Let’s turn it into something that
          actually works.
        </p>

        <p>arpit10128@gmail.com</p>

        <ul>
          {socials.map(({ id, bg, link, icon, text }) => (
            <li key={id} style={{ backgroundColor: bg }}>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                title={text}
              >
                <img
                  src={icon}
                  alt={text}
                  className="size-5"
                />
                <p>{text}</p>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const ContactWrapper = WindowWrapper(Contact, "contact");

export default ContactWrapper;
