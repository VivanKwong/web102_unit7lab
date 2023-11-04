import React from 'react';
import './CreatePost.css'
import { supabase } from '../client'

const CreatePost = () => {
    const [post, setPost] = React.useState({title: "", author: "", description: ""});

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    const createPost = async (event) => {
        event.preventDefault();
      
        await supabase
          .from('Posts')
          .insert({title: post.title, author: post.author, description: post.description})
          .select();
      
        window.location = "/";
    }

    return (
        <div>
            <img src={require('./amongus.jpeg')} alt="amongus img" />
            <form onSubmit={createPost}>
                <label for="title">Name:</label> <br />
                <input type="text" id="title" name="title" onChange={handleChange}/><br />
                <br/>

                <label for="author">Speed (mph):</label><br />
                <input type="text" id="author" name="author" onChange={handleChange}/><br />
                <br/>

                <label for="description">Color:</label><br />
                <select id="description" name="description" onChange={handleChange}>
                    <option value="red">Red</option>
                    <option value="green">Green</option>
                    <option value="blue">Blue</option>
                    <option value="purple">Purple</option>
                    <option value="yellow">Yellow</option>
                    <option value="orange">Orange</option>
                    <option value="pink">Pink</option>
                    <option value="rainbow">Rainbow</option>
                </select>
                <br/>
                <input type="submit" value="Create Crewmate" />
            </form>
        </div>
    )
}

export default CreatePost