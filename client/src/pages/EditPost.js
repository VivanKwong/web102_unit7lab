import React from 'react';
import { useParams } from 'react-router-dom';
import './EditPost.css'
import { supabase } from '../client'

const EditPost = ({data}) => {

    const { id } = useParams();
    const postId = parseInt(id, 10); // Convert id to a number
    const post = data.find(item => item.id === postId);

    // UPDATE post
    const updatePost = async (event) => {
        event.preventDefault();
    
        await supabase.from('Posts').update({ title: post.title, author: post.author,  description: post.description}).eq('id', id);
    
        window.location = "/";
    }

    // DELETE post
    const deletePost = async (event) => {
        event.preventDefault();
        
        await supabase.from('Posts').delete().eq('id', postId);
    
        window.location.href = "http://localhost:3000/";
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        updatePost();
    }

    return (
        <div>
            <form onSubmit={updatePost}>
                <label for="title">Title</label> <br />
                <input type="text" id="title" name="title" value={post.title} onChange={updatePost}/><br />
                <br/>

                <label for="author">Author</label><br />
                <input type="text" id="author" name="author" value={post.author} onChange={updatePost}/><br />
                <br/>

                <label for="description">Color:</label><br />
                <select id="description" name="description" onChange={updatePost}>
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
                <input type="submit" value="Update Crewmate" />
                <button className="deleteButton" onClick={deletePost}>Delete</button>
            </form>
        </div>
    )
}

export default EditPost