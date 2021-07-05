import Link from 'next/link'
const ItemSearchBox = ({data, onSelect}) => {
    
    const isOffer = data.active_discount !== 0
    const priceToShow = isOffer ? data.original_price : data.price
    const currency = process.env.currency

    return ( 
    <div className="itemSearchBox">
        <img src={data.image}/>
        <div className="itemSearchBox-description">
            {data.title}
            <Link href={`/${data.catSlug}/${data.slug}`}>
                <a>
                    <div className="itemSearchBox-description-button" onClick={onSelect}>
                        Ver producto
                    </div>
                </a>
            </Link>
            
        </div>
        <div className="itemSearchBox-action">
            <div className={`itemSearchBox-action-price ${isOffer ? 'offer' : ''}`}>
                <span className="price">{currency}{priceToShow.toFixed(2)}</span>
                {
                    isOffer && (
                        <span className="price promo">{currency}{data.price.toFixed(2)}</span>
                    )
                }
            </div>
        </div>
    </div> );
}
 
export default ItemSearchBox;