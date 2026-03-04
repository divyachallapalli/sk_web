
import './Card.css'
import CheckoutCntrls from './CheckoutCntrls'

export default function Card({ item }) {

  
  return (
    <figure key={item.id ? `card-${item.id}` : undefined } className="card-view">
      <div className="card-view-image">
        {item.src ? (
          <img src={item.src} alt={item.alt} />
        ) : (
          <div className="image-fallback" />
        )}
      </div>
      <div className="card-view__description">
        <div className="card-view__sub-desc">
          <div className="card-view__id">{item.id}</div>
          <div className="card-view__price">{"₹ " + item.price}</div>
        </div>
        <CheckoutCntrls item={item}/>
      </div>
      {item.title && (
        <figcaption className="card-view-caption">
          {item.title}
        </figcaption>
      )}
    </figure>
  )
}   