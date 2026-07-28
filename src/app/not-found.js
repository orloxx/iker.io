import Desktop from "molecules/desktop";
import Window from "molecules/window";

export const metadata = {
  title: "Iker Garitaonandia | Not Found",
};

// Rendered with a real HTTP 404 whenever notFound() is called or no route
// matches. Keeps the desktop behind the window so a wrong URL still looks like
// the site, but the status code says what actually happened.
export default function NotFound() {
  return (
    <>
      <Desktop />
      <Window
        type="system"
        title="404 — Not Found"
        error={{ status: 404, statusText: "Not Found" }}
      >
        <p>
          There is nothing at this address. Close this window to go back to the
          desktop.
        </p>
      </Window>
    </>
  );
}
