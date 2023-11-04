import './App.css';
import { useState, useEffect } from 'react';
import { useRoutes } from 'react-router-dom'
import ReadPosts from './pages/ReadPosts'
import CreatePost from './pages/CreatePost'
import EditPost from './pages/EditPost'
import { Link } from 'react-router-dom'
import { supabase } from './client'


const App = () => {
  const [posts, setPosts] = useState([]);
  const descr = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'

  useEffect(() => {
    // READ all post from table
    const fetchPosts = async () => {
      const {data} = await supabase
        .from('Posts')
        .select();

      // set state of posts
      setPosts(data)
    }
    fetchPosts();
  }, []); 

  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element:<ReadPosts data={posts}/>
    },
    {
      path:"/edit/:id",
      element: <EditPost data={posts} />
    },
    {
      path:"/new",
      element: <CreatePost />
    }
  ]);

  const calculateColorStatistics = () => {
    const colorCounts = {};

    // Count the number of crewmates for each color
    posts.forEach(post => {
      const color = post.description.toLowerCase();
      colorCounts[color] = (colorCounts[color] || 0) + 1;
    });

    // Calculate percentages
    const totalCrewmates = posts.length;
    const colorPercentages = {};

    for (const color in colorCounts) {
      const count = colorCounts[color];
      const percentage = (count / totalCrewmates) * 100;
      colorPercentages[color] = percentage.toFixed(2) + '%';
    }

    return colorPercentages;
  };

  const colorStatistics = calculateColorStatistics();

  return ( 

    <div className="App">

      <div className="header">
        <h1>Welcome to the Crewmate Creator!</h1>
        <p>Here is where you can create your very own set of crewmates before sending them off into space!</p>
        <Link to="/"><button className="headerBtn"> Crewmate Gallery </button></Link>
        <Link to="/new"><button className="headerBtn"> Create a Crewmate! </button></Link>
        <div className="statistics">
          <h3>Color Statistics</h3>
          <ul>
            {Object.entries(colorStatistics).map(([color, percentage]) => (
              <li key={color}>
                {color.charAt(0).toUpperCase() + color.slice(1)}: {percentage}
              </li>
            ))}
          </ul>
        </div>
      </div>
        {element}
    </div>

  );
}

export default App;
