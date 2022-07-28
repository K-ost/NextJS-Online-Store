import { Toast, ToastContainer } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { setNotice } from '../store/slice'
import { AppDispatch } from '../store/store'

interface INotice {
  name?: string
  message: string
  show: boolean
}

const Notice: React.FC<INotice> = ({ name, message, show }) => {
  const dispatch = useDispatch<AppDispatch>()

  return (
    <ToastContainer position="bottom-end" containerPosition="fixed">
      <Toast show={show} onClose={() => dispatch(setNotice(null))} autohide delay={3000}>
        <Toast.Header>
          <strong className="me-auto">{name ? name : 'Online shop'}</strong>
          <small>5 sec ago</small>
        </Toast.Header>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  )
}

export default Notice