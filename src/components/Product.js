import React from "react";

function Product(props){

    const remove = () => {
        props.onRemove(props.id)
    }

    return (
        <div className="product">
            <div className="body">
                <h1 className="title">{props.name}</h1>
                <div className="price">{props.price}</div>
            </div>
            <button onClick={remove} type="button">Remove</button>
        </div>
    )
}

export default Product;