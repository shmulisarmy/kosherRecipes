import type { Component } from "solid-js";
import { createSignal, For } from "solid-js";
import styles from "./.module.css";
import svgs from "./svgs";
import type { Toast } from "./types";

// Initial toasts data
const [toasts, setToasts] = createSignal<Toast[]>([
  { id: 0, message: "cool", type: "success", duration: 3000, html: <div style={{
    "text-align": "left",
    "font-size": "1.2rem",
    "line-height": ".2rem",
  }}>
  <h3>
    Success
  </h3>
  <p style={{
    color: "black",
  }}>
    cool
  </p>
  </div> },
  { id: 1, message: "supper", type: "warning", duration: 3000, header: "Warning" },
  { id: 2, message: "and", type: "success", duration: 3000, header: "Success" },
  { id: 3, message: "awesome", type: "error", duration: 3000, header: "Error" },
  { id: 4, message: "is", type: "success", duration: 3000, header: "Success" },
]);


let toast_id = 0;

export const addToast = (type: string, html: HTMLElement, duration: number = 3000) => {
      const this_toasts_id = toast_id++;
      setToasts((prev) => [
        { id: this_toasts_id, html, duration },
        ...prev,
      ]);
    let this_toast_element = document.querySelector(`[data-id="${this_toasts_id}"]`);
    if (this_toast_element) {
      this_toast_element.animate(
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
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== this_toasts_id));
    }, duration);
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
        data-id={toast.id}
        class={`${styles.toast} ${styles[toast.type]}`}
        style={{
            "z-index": 7 - index(),
            transform: !isHovering()
                ? `translateY(-${20 + index() * 5}px) scale(${0.93 - index() * 0.02})`
                : `translateY(-${20 + index() * 80}px)`,
        }}
    >
            {svgs[toast.type]()}
            <div class={styles.content} style={{"margin-left": "16px"}}>

            {toast.html}
            </div>

        <button
            class={styles.toastButton}
            onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
        >
            X
        </button>
    </div>;
}

