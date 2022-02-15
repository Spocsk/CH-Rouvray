import React, { useEffect, useState} from "react";
import Post from "../../Components/Dashboard/Post/Post";
import Button from "../../Components/Others/Button/Button";
import Divider from "../../Components/Others/Divider";
import Navbar from "../../Components/Others/Navbar";
import './style.css'
import useModal from "../../Components/Others/Modal/useModal";
import Modal from "../../Components/Others/Modal/Modal";
import { getNews } from '../../Utils/Api/News/NewsApiRequests'
import NewPostForm from '../../Components/Dashboard/Post/NewPostForm/NewPostForm'
import { useNavigate } from 'react-router-dom';


const Dashboard = () => {

    const { isShowing, toggle } = useModal();
    const [news, setNews] = useState([]);
    const navigate = useNavigate()
    const redirectToPostDetails = (id) => {
        console.log(id)
        navigate('/post',{
            state: {
                postId: id
            }
        })
    }

    useEffect(() => {
        (async () => setNews(await getNews()))()
    }, []);

    return(
        <>
            <Navbar></Navbar>
            <div className='hero-banner'>
                <div className="title-container">
                    <p>Les Posts</p>
                </div>
                <img src="https://images.pexels.com/photos/1467217/pexels-photo-1467217.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940">
                </img>
            </div>
            <main>
                <div className="grid-container">
                    <div className="posts">
                        <h4>Posts</h4>
                        <Divider></Divider>
                        <div className='posts-container'>
                            {news.map(item => {
                                return (
                                    <div 
                                        onClick={() => {redirectToPostDetails(item.id)}}
                                        key={item.id}
                                    >
                                        <Post
                                            title={item.title}
                                            description={item.description}
                                            comments={item.comments.length}
                                            createdAt={item.createdAt}
                                            author={item.author}
                                        ></Post>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="actions">
                        <h4>Actions</h4>
                        <Divider></Divider>
                        <Button margin='2em 0 2em 2em' tooltip='Ajouter un post' onClick={toggle}>Ajouter</Button>
                    </div>
                </div>
            </main>
            <Modal isShowing={isShowing} hide={toggle}>
                <NewPostForm></NewPostForm>
            </Modal>
        </>
    )
}


export default Dashboard;