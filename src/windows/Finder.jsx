import { WindowControls } from "#components";
import { locations } from "#constants";
import useLocationStore from "#store/location";
import clsx from "clsx";
import WindowWrapper from "../hoc/WindowWrapper";
import useWindowStore from "#store/window";

const Finder = () => {
  const { openWindow } = useWindowStore();
  const { setActiveLocation, activeLocation } =
    useLocationStore();

  const openItem = (item) => {
    if (item.fileType === "pdf")
      return openWindow("resume");
    if (item.kind === "folder")
      return setActiveLocation(item);
    if (["fig", "url"].includes(item.fileType) && item.href)
      return window.open(
        item.href,
        "_blank",
        "noopener,noreferrer",
      );

    openWindow(`${item.fileType}${item.kind}`, item);
  };

  const renderList = (name, items) => (
    <div>
      <h3>{name}</h3>

      <ul>
        {items.map((item) => (
          <li
            key={item.id}
            onClick={() => setActiveLocation(item)}
            className={clsx(
              item.id === activeLocation.id
                ? "active"
                : "not-active",
            )}
          >
            <img
              src={item.icon}
              alt={item.name}
              className="w-4"
            />
            <p className="text-sm font-medium truncate text-white">
              {item.name}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <>
      <div
        id="window-header"
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
        }}
      >
        <WindowControls target="finder" />
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            fontWeight: "bold",
          }}
        >
          <h2>Finder</h2>
        </div>
      </div>

      <div className="flex h-full">
        <div className="sidebar">
          {renderList(
            "Favorites",
            Object.values(locations),
          )}
          {renderList("Work", locations.work.children)}
        </div>

        <ul className="content">
          {activeLocation?.children.map((item) => (
            <li
              key={item.id}
              className={item.position}
              onClick={() => openItem(item)}
            >
              <img src={item.icon} alt={item.name} />
              <p>{item.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

const FinderWrapper = WindowWrapper(Finder, "finder");

export default FinderWrapper;
