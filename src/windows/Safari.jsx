import { WindowControls } from "#components";
import { blogPosts } from "#constants";
import { MoveRight } from "lucide-react";
import WindowWrapper from "../hoc/WindowWrapper";

const Safari = () => {
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
        <WindowControls target="safari" />

        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            fontWeight: "bold",
          }}
        >
          <p>Articles</p>
        </div>
      </div>

      <div className="blog">
        <h2>Blogs</h2>
        <div className="space-y-8 blog-list">
          {blogPosts.map(
            ({ id, image, title, date, link }) => (
              <div key={id} className="blog-post">
                <div className="col-span-2">
                  <img src={image} alt={title} />
                </div>
                <div className="content">
                  <p>{date}</p>
                  <h3>{title}</h3>
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${title} in a new tab`}
                  >
                    Check out{" "}
                    <MoveRight className="icon-hover" />
                  </a>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </>
  );
};

const SafariWindow = WindowWrapper(Safari, "safari");

export default SafariWindow;
