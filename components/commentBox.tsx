const commentBox = ({username, id, value, previousComment, placeholder}) => {
    return (
        <div>
            <input 
            username= {"henleydesir"}
            placeholder={"Leave a comment"}
            defaultValue={value}
            id={id}/>
        </div>
    )
}
export default commentBox;