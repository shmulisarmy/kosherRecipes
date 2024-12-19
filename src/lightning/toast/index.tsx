import type { Component } from "solid-js";
import { createSignal, For } from "solid-js";
import styles from "./.module.css";
import svgs from "./svgs";
import type { Toast } from "./types";

// Initial toasts data
const [toasts, setToasts] = createSignal<Toast[]>([
  { id: 0, message: "cool", type: "success" },
  { id: 1, message: "supper", type: "warning" },
  { id: 2, message: "and", type: "success" },
  { id: 3, message: "awesome", type: "error" },
  { id: 4, message: "is", type: "success" },
]);

export const addToast = (type: string) => {
    const newMessage = prompt("Enter message: ");
    if (newMessage) {
      setToasts((prev) => [
        { id: prev.length, message: newMessage, type },
        ...prev,
      ]);
    }
    let most_recent_toast = document.querySelector(`[data-id="${newMessage}"]`);
    if (most_recent_toast) {
      most_recent_toast.animate(
        [
          { transform: "translateX(100%) translateY(-20px)" },
          { transform: "translateY(-20px)" },
        ],
        {
          duration: 300,
          easing: "ease-out",
        }
      )
    }
  };

const Toaster: Component = () => {
  const [isHovering, setIsHovering] = createSignal(false);



  const clearToasts = () => setToasts([]);


  return (
    <>
      <button onClick={() => addToast("success")}>Add success Toast</button> 
      <button onClick={() => addToast("warning")}>Add warning Toast</button> 
      <button onClick={() => addToast("error")}>Add error Toast</button>
      <button onClick={clearToasts}>Clear All</button>

      <div
        class={styles.Toaster}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        id="toasts"
      >
        <For each={toasts()}>
          {(toast, index) => (
            <Toast  {...{toast, index, isHovering}}/>
          )}
        </For>
      </div>
    </>
  );
};

export default Toaster;
function Toast({toast, index, isHovering}: {toast: Toast, index: () => number, isHovering: () => boolean}) {
    return <div
        data-id={toast.message}
        class={`${styles.toast} ${styles[toast.type]}`}
        style={{
            "z-index": 7 - index(),
            transform: !isHovering()
                ? `translateY(-${20 + index() * 5}px) scale(${0.93 - index() * 0.02})`
                : `translateY(-${20 + index() * 66}px)`,
        }}
    >
            {svgs[toast.type]()}
        <p>

    {toast.message}
        </p>

        <button
            class={styles.toastButton}
            onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
        >
            X
        </button>
    </div>;
}

