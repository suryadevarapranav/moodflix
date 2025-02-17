import {useEffect, useState} from "react";

const Card = ({ title }) => {
    const [count, setCount] = useState(0);
    const [hasLiked, setHasLiked] = useState(false); // call to the useState() hook.

    useEffect(() => {
        console.log(`${title} has been liked: ${hasLiked}`);
    }, [hasLiked]);

    useEffect(() => {
        console.log('component mounted / card rendered');
    }, []); // most common use case of a useEffect. This runs only once at the mounting of the component.

    return (
        <div className="card" onClick={() => setCount(count + 1)}>
            <h2>{title} <br /> {count || null}</h2>    {/*conditional rendering.*/}

            {/*<button onClick={() => setHasLiked(true)}>*/}
            {/*    {hasLiked ? 'Liked' : 'Like'}*/}
            {/*</button>*/}


            <button onClick={() => setHasLiked(!hasLiked)}>
                {hasLiked ? "❤️" : "🤍"}    {/*conditional rendering.*/}
            </button>
        </div>
    )
}

const App = () => {


    return (
        <div className="card-container">

            <Card title="Star Wars" rating={5} isCool={true} />
            <Card title="Avatar" />
            <Card title="The Lion King" />
        </div>
    )
}

export default App;