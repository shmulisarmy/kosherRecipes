import { createSignal, Show, Suspense, type Component } from 'solid-js';

import logo from './logo.svg';
import styles from './App.module.css';
import { AllRecipes } from './RecipeList';
import AvailibleIngredients from './components/availibleIngredients';
import RecipePlanner from './components/recipie_planner';
import Nav from './components/Nav';
import Toaster, { addToast } from './lightning/toast';
import Letter_animator from './lightning/letter_animator';

import kitchen_chaos_1 from "./assets/images/kitchen-chaos-1.webp"
import kitchen_chaos_2 from "./assets/images/kitchen-chaos-2.webp"
import { Image_toggler } from './components/image_toggler';
import { ThemeToggle } from './components/ThemeToggle';


import Blog_card from './lightning/blog-card';
import { recipeData, state } from './data/all_recipies';


const App: Component = () => {
  return (
    <>
    <div class={styles.App}>
      <button onclick={() => console.log(recipeData)}>log recipes</button>
      
      <ThemeToggle></ThemeToggle>
      <header>
      <Image_toggler image_links={[kitchen_chaos_1, kitchen_chaos_2]}></Image_toggler>
      </header>
      <div>

       <Letter_animator letters="let the chaos manage itself" speed={105}></Letter_animator>
      </div>
      <Nav></Nav>
      <AllRecipes></AllRecipes>
      <AvailibleIngredients></AvailibleIngredients>
      <RecipePlanner></RecipePlanner>
      <Toaster></Toaster>
      <button onclick={() => {
        addToast("error", (<div>
          <h2>error</h2>
          <p>please contact the <a style={{color: "white"}} href="mailto:shmulis.army@gmail.com">developer</a></p>
        </div> as Element), 10000)
      }}>
      </button>
    </div>
    </>
  );
};

export default App;
