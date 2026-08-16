import React from "react";
import { Btn } from "../ui/atoms.jsx";
import { HoldCard, cardFace } from "./Deal.jsx";
import { t } from "../data/strings.js";
import { roman } from "../game/helpers.js";

/* -------------------------------- Peek -------------------------------- */

function Peek({ state, dispatch }) {
  const { round, peekId } = state;
  const player = state.players.find((p) => p.id === peekId);
  const face = cardFace(round.roles[peekId], round);
  const seat = round.dealOrder.indexOf(peekId) + 1;
  if (!player) return null;

  return (
    <>
      <div className="eyebrow">{t("peek")}</div>
      <div className="stage">
        <HoldCard name={player.name} numeral={roman(seat)} sigil={round.sigil}
          word={face.word} note={face.note} title={face.title} tone={face.tone} />
        <p className="quiet" style={{ textAlign: "center", maxWidth: 270, fontSize: 12.5 }}>{t("peekWarn")}</p>
      </div>
      <Btn onClick={() => dispatch({ type: "PEEK_DONE" })}>{t("done")}</Btn>
    </>
  );
}

export default Peek;
