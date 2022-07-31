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

  // orderCommentsHandler
  const orderCommentsHandler = (value: string) => {
    if (value === 'asc') {
      setCommentsState(prev => prev.slice().sort((a, b) => b.date - a.date))
    }
    if (value === 'desc') {
      setCommentsState(prev => prev.slice().sort((a, b) => a.date - b.date))
    }
  }

  return (
    <div>
      <div className={styles.commentListHeader}>
        <h4>{(commentsState.length > 1) ? `Comments (${commentsState.length})` : `Comments do not exists`}</h4>

        {(commentsState.length > 1) && <select className="form-select" onChange={e => orderCommentsHandler(e.target.value)}>
          <option value="asc">newer first</option>
          <option value="desc">older first</option>
        </select>}

      </div>
      {commentsState.map(el => <Comment key={el.id} comment={el} />)}
      <CommentForm postId={postId} func={(com: IComment) => setCommentsState(prev => [com, ...prev])} />
    </div>
  )
}

export default CommentsList
