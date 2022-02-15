import './style.css'

const Post = ({title, description, createdAt, author, comments}) => {

    const limitTextSize = (txt, size) => {
        if (txt.length >= size) {
            return txt.slice(0, size) + '...'
        }
        return txt;
    }

    return (
        <div className='post-container'>
            <div className='text-container'>
                <h5 className='title'>{title}</h5>
                <p className='subtitle'>{limitTextSize(description, 60)}</p>
            </div>
            <div className='data-container'>
                <p className='datetime'>{createdAt}</p>
                <p className='author'>Autheur : {author}</p>
                <div className='comment'>
                    <p>{comments} commentaires</p>
                </div>
            </div>
        </div>
    )

}

export default Post;