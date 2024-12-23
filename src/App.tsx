import { createSignal, type Component } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';
import { AllRecipes } from './RecipeList';
import AvailibleIngredients from './components/availibleIngredients';
import RecipePlanner from './components/recipie_planner';
import Nav from './components/Nav';
import Toaster from './lightning/toast';
import Letter_animator from './lightning/letter_animator';

import kitchen_chaos_1 from "./assets/images/kitchen-chaos-1.webp"
import kitchen_chaos_2 from "./assets/images/kitchen-chaos-2.webp"


function Carousell(){
  const [imageShowing, setImageShowing] = createSignal(0);
  const image_links = [
    kitchen_chaos_1,
    kitchen_chaos_2,

  ]
  let image_ref: HTMLImageElement | undefined = undefined
  setInterval(() => {
    setImageShowing(imageShowing() + 1)
    image_ref!.animate(
      [
        { transform: "scale(.8)", },
        {  },
      ],
      {
        duration: 1000,
        easing: "ease-out",
      }
    )
  }, 5000)
  return (<>
  <img ref={image_ref} style={{"aspect-ratio": "16/9", height: "calc(25vw + 200px)"}} src={image_links[imageShowing() % image_links.length]} alt="" />
  
  </>)
}

const App: Component = () => {
  return (
    <div class={styles.App}>
      <header>
      <Carousell></Carousell>
      </header>
      <div style={{padding: "20px", "font-size": "2rem", "font-family": "monospace", "text-shadow": "1px 3px 10px grey", color: "darkblue", "box-shadow": "1px 3px 10px grey", width: "60%", "margin-left": "auto", "margin-right": "auto", "margin-top": "100px", "margin-bottom": "50px"}}>

       <Letter_animator letters="let the chaos manage itself" speed={105}></Letter_animator>
      </div>
      <Nav></Nav>
      <AllRecipes></AllRecipes>
      <AvailibleIngredients></AvailibleIngredients>
      <RecipePlanner></RecipePlanner>
      <Toaster></Toaster>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          class={styles.link}
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Solid
        </a>
      </header>
    </div>
  );
};

export default App;
