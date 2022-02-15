import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Others/Navbar';
import { useNavigate, useLocation } from 'react-router-dom';
import { getNew } from '../../Utils/Api/News/NewsApiRequests';
import { getComment } from '../../Utils/Api/Comments/CommentsApiRequests';
import './Index.css'

export default function PostDetails(){

    const navigate = useNavigate();
    const location = useLocation();
    const redirectToDashboard = () => navigate('/dashboard');
    const [New, setNew] = useState({})

    useEffect(() => {
        (async () => setNew(await getNew(location.state.postId)))()
    }, []);

    return (
        <>
            <Navbar></Navbar>
            <main>
                <p className="back-to-results" onClick={() => {redirectToDashboard()}}> - Retour au posts</p>
                <section className="hero-banner-bis">
                    <p>{New.title}</p>
                    <section className="infos-bis">
                        <div className="row-bis">
                            <div>
                                Autheur
                            </div>
                            <div>
                                {New.author}
                            </div>
                        </div>
                        <div className="row-bis">
                            <div>
                                Date de création
                            </div>
                            <div>
                                {New.createdAt}
                            </div>
                        </div>
                        <div className="row-bis">
                            <div>
                                Nb commentaires
                            </div>
                            <div>
                                {New.comments ? New.comments.length : 0}
                            </div>
                        </div>
                    </section>
                    <section className="description-bis">
                        <div className="title-bis">
                            1. Description
                        </div>
                        <div>
                            {New.description}
                        </div>
                    </section>
                    <div className="comment-title-bis">
                        2. Commentaires
                    </div>
                    {New.comments ? New.comments.map((item, index) => (
                        <div 
                            key={index} 
                            className="comment-bis"
                        >
                            <div className="comment-row-bis">
                                <div className="comment-date-bis">
                                    <span>23 Janvier 2023</span>
                                    <span>Jérome</span>
                                </div>
                                <div className="comment-content-bis">
                                </div>
                            </div>
                        </div>
                    )): null}
                </section>
            </main>
        </>
    )
}