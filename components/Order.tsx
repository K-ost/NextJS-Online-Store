import React, { useState } from "react"
import { IOrder } from "../types/types"
import styles from "../styles/Order.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../store/store"
import { changeOrder, removeOrder } from "../store/slice"
import { Modal } from "react-bootstrap"

interface IOrderComponent {
  order: IOrder
}

const Order: React.FC<IOrderComponent> = ({ order }) => {
  const orders = useSelector((state: RootState) => state.app.orders)
  const [modalShow, setModalShow] = useState<boolean>(false)
  const dispatch = useDispatch<AppDispatch>()

  // removeHandler
  const removeHandler = (): void => {
    dispatch(removeOrder(order.id))
  }

  return (
    <>
      <div className={styles.orderbox}>
        <div className={styles.orderboxImg}>
          <img src={order.img} alt="" />
        </div>
        <div className={styles.orderboxContent}>
          <div className="orderboxDetails">
            <h5>{order.name}</h5>
            <div className="brandchip">{order.brand}</div>
          </div>
          <div className={styles.orderboxPrice}>{order.price.toLocaleString()} <small>UAH</small></div>
          <div className={styles.orderboxPrice}>
            <input
              type="number"
              min="1"
              defaultValue={order.count}
              className="form-control"
              onChange={e => dispatch(changeOrder({id: order.id, val: e.target.value}))}
            />
          </div>
          <div className={styles.orderboxPrice}>{order.total.toLocaleString()} <small>UAH</small></div>
          <div className={styles.orderboxRemove}>
            <button className="btn btn-danger" onClick={() => setModalShow(true)}>&times;</button>
          </div>
        </div>
      </div>

      <Modal centered show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Remove product</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure that you want to remove the product<br /> <b>&quot;{order.name}&quot;</b> from the basket?</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-sm btn-outline-secondary" onClick={() => setModalShow(false)}>Cancel</button>
          <button className="btn btn-sm btn-danger" onClick={removeHandler}>Remove</button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Order