import dayjs from "dayjs";

import { navLinks } from "#constants";

const Navbar = () => {
  return (
    <nav>
      <div>
        <p className="text-white font-bold">
          Arpit's Portfolio
        </p>

        <ul className="text-white">
          {navLinks.map(({ id, name }) => (
            <li key={id}>
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

        <time datetime="">
          {dayjs().format("ddd MMM D h:mm A")}
        </time>
      </div>
    </nav>
  );
};

export default Navbar;
