import React from "react";

const TradeOverview = ({ characters }) => {
    const trades = characters.map(character => character.trade)

    return (
        <div>
            {trades.map(trade => {
                return (
                    <li>{trade}</li>
                )
            })}
        </div>
    )
}

export default TradeOverview