import { HoverColorLetter } from './hoverColorLetter';
import classes from './hoverColorLetters.module.css'


let indexColor = 0;

export const HoverColorLetters = (props) => {
    const { text, defaultColor, colors } = props

    const getLetterColor = () => {
        const color = colors[indexColor]
        indexColor += 1;
        if (indexColor == colors.length) {
            indexColor = 0;
        }
        return color
    }

    return (<>
        <div className={classes.container}>
            {
                text // => Hello world
                    .split('') // => [H,e,l,l,o, ,w,o,r,l,d]
                    // .map(letter => (<span>{letter}</span>))
                    .map((letter, index) => <HoverColorLetter
                        key={`${letter}-${index}`}
                        letter={letter}
                        getLetterColor={getLetterColor}
                        defaultColor={defaultColor}
                    />)
                /* 
                    <span>h</span>
                    <span>e</span>
                    <span>l</span>
                    ....
                    <span>l</span>
                    <span>d</span>
                */
            }
        </div>
    </>)
}