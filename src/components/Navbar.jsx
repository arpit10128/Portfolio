import { navLinks } from "#constants";
import useWindowStore from "#store/window";
import useLiveTime from "./Time";
import VisitorCounter from "./VisitorCounter";

const Navbar = () => {
  const { openWindow } = useWindowStore();
  const time = useLiveTime("ddd MMM D h:mm A");

  return (
    <nav>
      <div>
        <p className="text-white font-bold">
          Arpit's Portfolio
        </p>

        <ul className="text-white">
          {navLinks.map(({ id, name, type }) => (
            <li key={id} onClick={() => openWindow(type)}>
              <p>{name}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        {/* <ul>
          {navIcons.map(({ id, img }) => (
            <li key={id}>
              <img
                src={img}
                className="icon-hover"
                alt={`icon-${id}`}
              />
            </li>
          ))}
        </ul> */}

        <VisitorCounter />
        <time>{time}</time>
      </div>
    </nav>
  );
};

export default Navbar;
