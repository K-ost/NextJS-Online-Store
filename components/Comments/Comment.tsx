import { IComment } from '../../types/types'
import styles from './comments.module.scss'

interface ICommentComponent {
  comment: IComment
}

const Comment: React.FC<ICommentComponent> = ({ comment }) => {
  const dateObject = new Date(comment.date)
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const date = `${months[dateObject.getMonth()]}, ${dateObject.getDay()} ${dateObject.getFullYear()}`
  const min = dateObject.getMinutes() < 10 ? '0' + dateObject.getMinutes() : dateObject.getMinutes()
  const time = `${dateObject.getHours()}:${min}`
  
  return (
    <div className={styles.comment}>
      <div className={styles.commentHeader}>
        <h5>{comment.name}</h5>
        <div className={styles.commentDate}>{date} {time}</div>
      </div>
      <p>{comment.body}</p>
    </div>
  )
}

export default Comment