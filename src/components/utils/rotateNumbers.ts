import { eventsProp } from "../../components/Types";
import { calculateMinAngle } from "./calculateAngleBetweenDots";

export function rotateNumbers( 
    openIndex: number | null,
    lastElementIndex: number,
    data: eventsProp[],) {
openIndex !== null
       ? `rotate(${
      -1 * calculateMinAngle( lastElementIndex, openIndex, data)
    }deg)`
  : 'rotate(0deg)'
}