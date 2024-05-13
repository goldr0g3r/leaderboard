import React from "react";
import ILeaderboad from "../interface/ILeaderboard";
import "./styles.css";

export interface ICardProps {
  title: string;
  description: string;
  rankings: ILeaderboad[];
}

const Card = (data: ICardProps) => {
  return (
    <div className="game-leaderboard-card">
      <div className="game-leaderboard-card__title">{data.title}</div>
      <div className="board">
        <div className="game-leaderboard-card__description">
          {data.description}
        </div>
        <div className="game-leaderboard-card__rankings">
          {data.rankings.map((ranking, index) => (
            <div className="game-leaderboard-card__ranking" key={index}>
              <div className="game-leaderboard-card__ranking__rank">
                {index + 1}
              </div>
              <div className="ranking_item_info">
                <h4>{ranking.name}</h4>
              </div>
              <div className="game-leaderboard-card__ranking__points">
                <p>{ranking.points}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Card;
