import { useState } from "react"
import { IComment } from "../../types/types"
import Comment from "./Comment"
import CommentForm from "./CommentForm"
import styles from "./comments.module.scss"

interface ICommentList {
  comments: IComment[]
  postId: number
}

const CommentsList: React.FC<ICommentList> = ({ comments, postId }) => {
  const [commentsState, setCommentsState] = useState<IComment[]>(comments)

  return (
    <div>
      <div className={styles.commentListHeader}>
        <h4>Comments ({commentsState.length})</h4>
        <select className="form-select">
          <option>Date asc</option>
          <option>Date desc</option>
        </select>
      </div>
      {commentsState.map(el => <Comment key={el.id} comment={el} />)}
      <CommentForm postId={postId} func={(com: IComment) => setCommentsState(prev => [com, ...prev])} />
    </div>
  )
}

export default CommentsList
