interface ISkelets {
  count: string
}

const Skelets: React.FC<ISkelets> = ({ count }) => {
  const list = []
  for (let i = 0; i < Number(count); i++) {
    list.push(i)
  }

  return (
    <>
      {list.map(el => (
        <div key={el} className={`col-12 col-lg-4 product`}>
          <div className="product-inner placeholder-glow">
            <span className="placeholder col-12 mb-3" style={{ height: '140px' }}></span>
            <div className="product-content">
              <div className="product-name">
                <span className="placeholder col-12"></span>
                <span className="placeholder col-12"></span>
              </div>
              <div className="product-options">
                <span className="placeholder col-3"></span><br />
                <span className="placeholder col-6"></span><br />
                <span className="placeholder col-4"></span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}

export default Skelets