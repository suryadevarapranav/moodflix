This command initializes a new react project. 
> npm create vite@latest

**vite.config.js** - This file allows us to customize the build process such as adding plugins, configuring server settings and more.

**package.json** - Contains the metadata of the project like scripts, dependencies.

To install the dependencies for the project.
> npm install or npm i

**package.lock.json** - Generated when we run the `npm install` command, it locks down the versions of the dependencies installed in your project.

**index.html** - Main html file within which the app is loaded.

**eslint.config.js** - config file used to define the rules and settings for eslint, coding style violations, errors and potential bugs.

**.gitignore** - which files and folders to ignore when committing the code.

**public/** - contains the static assets like images, icons and other files that don't need to go through vite's file bundler.

**src/** - this is where react components and javascript logic goes, tailwind css will be applied here through the styles you import into your components.

**App.jsx** - Main UI for the App.

**Main.jsx** - Entry point for the React App, where react is rendered into the DOM. We also import the main style file here.

**index.css** - Main style file where global styles are defined.

**assets/** - media assets like images, icons and can be imported into the react components or views used within jsx.

**App.css** - styling file specifically for the App.jsx

### React Stuff
```
<> </>  -> This component is called React Fragment.
{}      -> Dynamic Block of Code
```

###### appwrite
An open-source backend for react apps.

### Components
There are 2 ways in which we can define components, 

The traditional way is called `class component` (not used widely anymore). like 
```
class ClassComponent extends React.Component {
    render() {
        return <h2>Class Component</h2>
    }
}   
```

For new projects it's recommended to define components as `functions` instead of `classes`. We use JS `function` keyword or `arrow functions`.
```
const App = () => {
    return (
        <h2>Functional Arrow Component</h2>
    )   
} 
```

### Props
Sometimes we want to pass data among components, we do that using `props`, short for `properties`. We typically pass props from parent to child component. 
```
const Card = ({ title }) => {
    return (
        <div>
            <h2>{title}</h2>
        </div>
    )
}

const App = () => {
    return (
        <div>
            <h2>Functional Arrow Component</h2>
            
            <Card title="Star Wars" rating={5} isCool={true} actors={[{name: 'Actors'}]}/>
            <Card title="Avatar" />
            <Card title="The Lion King" />
        </div>
    )   
}
```
The prop can be anything string, number, boolean or a complex prop which can be an object.

###### Styling
Inline style has 1st preferences when there are multiple styles are being applied to the same element.
```
<div className="card" style={{ // inline styling
            border: '1px solid #4b5362',
            padding: '20px',
            margin: '10px',
            backgroundColor: '#31363f',
            borderRadius: '10px',
            minHeight: '100px',
        }}>
```
Currently TailwindCSS is used for styling apps of anykind.

## Hooks 

### useState()
State is the most important concept in React. State is like a react component's brain, it holds information about the components that can change over time.
We can't simply use a variable to update the change as React wouldn't know that something has changed and it wouldn't update the DOM.
React's rendering process relies on State and Props to decide when and how to re-render the components.
```
const [variableName, setVariable] = useState(optional:initialState value); // call to the useState(defaultValue) hook.
```
In React, everthing that starts with the verb `use` typically is referred to as a hook. 
`useState` works is that we first destructure the actual variable name and second we pass the setter function we can use to update that state.

In more complex interfaces, it's never recommended to update the value of the state by using the state itself. 
Rather we'd see another callback function without the setter state call and then we can access the previous version of the state.
```
onClick={() => setCount(count + 1)} // not recommended
onClick={() => setCount((prevState) => prevState + 1}
```

> `State` is not persistent across browser reloads. As soon as we reload the browser the component will get re-rendered and the state will return to its initial values.

When the State changes react automatically re-renders the component to reflect on the screen.

`Hooks` are special functions in react that let you tap into react's features like State management and there are many types of hooks.
* `useState` - for managing state.
* `useEffect` - for handling side effects like data fetching.
* `useContext` - for sharing data across components.
* `useCallbacks` - for optimizing callback functions.
* More like useMemo, useRef, useReducer, useTransistion etc...

### useEffect()

`useEffect` is like a special tool in react, that let's you do things outside of just displaying stuff on the screen like 
fetching data off a server, doing some cleanup after a component is removed from the screen.

When Strict Mode is on, in development, React runs setup and clean one extra time before the actual setup. 
This is a stress-test that verifies our Effect's logic implemented correctly. To see how react operates in production,
we can simply go to `main.jsx` and remove the `<StrictMode>` wrapper.

To run the effect only when something changes, we use a `dependecy array`, which we pass as a second paramter to the `useEffect` as `deps`

### Modern React Snippets - Plugin

`rafce` - shortcut to create a new reactArrowFunctionComponent with a default export.

#### TailwindCSS [Setup](https://tailwindcss.com/docs/installation/using-vite).
> npm install tailwindcss @tailwindcss/vite
