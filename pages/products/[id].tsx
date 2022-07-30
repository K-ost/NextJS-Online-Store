import { GetServerSideProps, NextPage } from 'next'
import Buy from '../../components/Buy'
import CommentsList from '../../components/Comments/CommentsList'
import { Layout } from '../../components/Layout'
import { IComment, IProduct } from '../../types/types'
import good from '../../styles/Good.module.scss'
import Compare from '../../components/Compare'
import { server } from '../../helpers'

interface IProductPage {
  product: IProduct
  comments: IComment[]
}

const ProductPage: NextPage<IProductPage> = ({ product, comments }) => {
  return (
    <Layout title={`Title ${product.id}`} keywords={`${product.name}, ${product.brand}`}>
      <h1>{product?.name}</h1>
      <div className="row">
        <div className="col-12 col-lg-6">
          <p><img src={product.img} alt="" /></p>
        </div>
        <div className="col-12 col-lg-6">
          <div className={good.goodArt}>Art: {product.id}</div>
          <div className={good.goodStock}>{product?.stock ? 'In stock' : 'Out of stock'}</div>
          <div className="d-flex mb-2 align-items-center">
            <div className={good.goodPrice}>
              {product?.price.toLocaleString()}
              <small>UAH</small>
            </div>
            <Buy product={product} />
            <div className="mx-3"><Compare product={product} large /></div>
          </div>

          <table className="table table-striped">
            <thead>
              <tr>
                <th colSpan={2}>Features</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Brand</th>
                <td>{product?.brand}</td>
              </tr>
              <tr>
                <th scope="row">Weight</th>
                <td>{product?.weight}</td>
              </tr>
              <tr>
                <th scope="row">Count</th>
                <td>{product?.quantity}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="mb-4">
        <h4>Description</h4>
        <div className={good.goodDescription} dangerouslySetInnerHTML={{__html: product.text}}></div>
      </div>

      <CommentsList comments={comments.reverse()} postId={product.id} />
    </Layout>
  )
}

export default ProductPage

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  // Fetch product
  const response = await fetch(`${server}/products/${query.id}`)
  const product = await response.json()

  // Fetch comments of product
  const responseCom = await fetch(`${server}/posts/${query.id}/comments`)
  const comments = await responseCom.json()

  // ?_sort=date&_order=asc

  if (!product && !comments) {
    return {
      notFound: true 
    }
  }
  return {
    props: { product, comments }
  }
}