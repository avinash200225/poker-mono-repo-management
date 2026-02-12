import {Howl, Howler} from "howler"
import { combineEpics, ofType } from "redux-observable"
import { ignoreElements, tap } from "rxjs/operators"
import soundActions from "../../actions/sound"

import coinSound from "../../../assets/sounds/coin.wav"
import cardSlide from "../../../assets/sounds/cardSlide.wav"
import winSound from "../../../assets/sounds/gameWin.mp3"

const coinHowlSound = new Howl({src: [coinSound]})
const cardSlideHowlSound = new Howl({src: [cardSlide]})
const winHowlSound = new Howl({src: [winSound]})

Howler.volume(50);

const betSoundEpic = (action$, state$) => {
    return action$.pipe(
        ofType(soundActions.play.bet),
        tap(() => coinHowlSound.play()),
        ignoreElements()
    )
}

const cardSoundEpic = (actions$, state$) => {
    return actions$.pipe(
        ofType(soundActions.play.card),
        tap(() => cardSlideHowlSound.play()),
        ignoreElements()
    )
}

const winSoundEpic = (actions$, state$) => {
    return actions$.pipe(
        ofType(soundActions.play.win),
        tap(() => winHowlSound.play()),
        ignoreElements()
    )
}

export default combineEpics(
    betSoundEpic,
    cardSoundEpic,
    winSoundEpic
)

