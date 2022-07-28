import { useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { setNotice } from "../../store/slice"
import { AppDispatch } from "../../store/store"
import { IComment } from "../../types/types"
import InputComponent from "../InputComponent"

interface ICommentForm {
  postId: number
  func: (com: IComment) => void
}

const CommentForm: React.FC<ICommentForm> = ({ postId, func }) => {
  const [load, setLoad] = useState<boolean>(false)
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const dispatch = useDispatch<AppDispatch>() 

  // onSubmit
  const onSubmit = async (data: any) => {
    setLoad(true)
    reset()
    const response = await fetch('http://localhost:5000/comments', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({postId, ...data, date: Date.now()})
    })
    const newComment = await response.json()
    func(newComment)
    setLoad(false)
    dispatch(setNotice("Comment has been successfully added"))
  }
  
  return (
    <div className="form mt-5 mb-5">
      <h4>Add comment</h4>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <InputComponent
          id="name"
          place="Your name"
          type="text"
          error={errors.name?.message}
          func={register("name", {required: 'This field should not be empty', maxLength: 80})}
        />
        <InputComponent
          id="email"
          place="Your e-mail"
          type="email"
          error={errors.email?.message}
          func={register("email", {required: 'This field should not be empty', pattern: {value: /^\S+@\S+$/i,
          message: 'Incorrect e-mail'}})}
        />
        <InputComponent
          id="body"
          place="Comment"
          type="area"
          error={errors.body?.message}
          func={register("body", {required: 'This field should not be empty. Mininim 10 characters', min: 10})}
        />
        
        <button type="submit" className="btn btn-primary" disabled={load}>
          {load ?
            <><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <span>Loading...</span></> :
            "Send comment"
          }
        </button>
      </form>
    </div>
  )
}

export default CommentForm