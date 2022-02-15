import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Others/Navbar';
import { useNavigate, useLocation } from 'react-router-dom';
import { getNew } from '../../Utils/Api/News/NewsApiRequests';
import Button from '../../Components/Others/Button/Button'
import './Index.css'
import Modal from '../../Components/Others/Modal/Modal';
import useModal from '../../Components/Others/Modal/useModal';


export default function PostDetails(){

    const navigate = useNavigate();
    const location = useLocation();
    const redirectToDashboard = () => navigate('/dashboard');
    const [New, setNew] = useState({})
    const { isShowing, toggle } = useModal();

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
                        <Button margin='2em 0 2em 2em' tooltip='Ajouter un commentaire' onClick={() => toggle()}>Commenter</Button>
                    </div>
                    {New.comments ? New.comments.map((item, index) => (
                        <div 
                        key={index} 
                        className="comment-bis"
                        >
                            <div className="comment-row-bis">
                                <div className="comment-date-bis">
                                    <span>{item.author.firstName + ' ' + item.author.lastName}</span>
                                    <span>{new Date(item.createdAt).toLocaleString('FR')}</span>
                                </div>
                                <div className="comment-content-bis">
                                    {item.content}
                                </div>
                            </div>
                        </div>
                    )): null}
                </section>
                <Modal isShowing={isShowing} hide={toggle}>
                    <Button margin='2em 0 2em 2em' tooltip='Ajouter un commentaire' onClick={() => toggle()}>Commenter</Button>
                </Modal>
            </main>
        </>
    )
}