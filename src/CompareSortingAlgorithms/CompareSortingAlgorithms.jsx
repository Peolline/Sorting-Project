import React from 'react';
import * as CompareSortingAlgorithms from './CompareSortingAlgorithms.js';
import './CompareSortingAlgorithms.css';
import ResetButton from '../AdditionButtons/ResetButton';
import * as CompareSortingAlgorithms2 from './CompareSortingAlgorithms2.js';


const ANIMATION_SPEED_MS = 10;
const NUMBER_OF_ARRAY_BARS = 70;
const PRIMARY_COLOR = 'rgb(118, 192, 164)';
const SECONDARY_COLOR = 'yellow';

export default class compareSortingAlgorithms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: [],
            initialArray: [],
            selectedAlgorithm1: 'mergeSort',
            selectedAlgorithm2: 'mergeSort',
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(randomIntFromInterval(10, 350));
        }
        this.setState({ array, initialArray: [...array] });
    }

    startSorting() {
        const { selectedAlgorithm1, initialArray } = this.state;
        this.setState({ array: initialArray }, () => {
            switch (selectedAlgorithm1) {
                case 'mergeSort':
                    this.mergeSort();
                    break;
                case 'quickSort':
                    this.quickSort();
                    break;
                case 'heapSort':
                    this.heapSort();
                    break;
                case 'bubbleSort':
                    this.bubbleSort();
                    break;
                case 'selectionSort':
                    this.selectionSort();
                    break;
                case 'insertionSort':
                    this.insertionSort();
                    break;
                default:
                    break;
            }
        });
    }

    mergeSort() {
        const animations = CompareSortingAlgorithms.mergeSort(this.state.array);
        const arrayBars = document.getElementsByClassName('array-bar2');
        const newAnimations = [];
    
        // Flatten animations for easier iteration
        for (const animation of animations) {
            newAnimations.push(animation.comparison);
            newAnimations.push(animation.comparison);
            newAnimations.push(animation.swap);
        }
    
        // Traverse through animations
        for (let i = 0; i < newAnimations.length; i++) {
            const isColorChange = i % 3 !== 2;
    
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = newAnimations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
    
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = newAnimations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    quickSort() {
        const animations = CompareSortingAlgorithms.quickSort(this.state.array);
        console.log("Quick sort animations:", animations); // Debugging line
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar2');
            const [type, barOneIdx, barTwoIdx] = animations[i];

            if (type === 'comparison') {
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = SECONDARY_COLOR;
                    barTwoStyle.backgroundColor = SECONDARY_COLOR;
                }, i * ANIMATION_SPEED_MS);

                // Revert color after a short delay
                setTimeout(() => {
                    barOneStyle.backgroundColor = PRIMARY_COLOR;
                    barTwoStyle.backgroundColor = PRIMARY_COLOR;
                }, (i + 1) * ANIMATION_SPEED_MS);
            } else if (type === 'swap') {
                setTimeout(() => {
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    const barOneHeight = barOneStyle.height;
                    barOneStyle.height = barTwoStyle.height;
                    barTwoStyle.height = barOneHeight;
                    barOneStyle.backgroundColor = SECONDARY_COLOR;
                    barTwoStyle.backgroundColor = SECONDARY_COLOR;
                }, i * ANIMATION_SPEED_MS);

                // Revert color after a short delay
                setTimeout(() => {
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    barOneStyle.backgroundColor = PRIMARY_COLOR;
                    barTwoStyle.backgroundColor = PRIMARY_COLOR;
                }, (i + 1) * ANIMATION_SPEED_MS);
            }
        }
    }

    heapSort() {
        const animations = CompareSortingAlgorithms.heapSort(this.state.array);
        console.log("Heap sort animations:", animations); // Debugging line
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar2');
            const [type, barOneIdx, barTwoIdx] = animations[i];

            if (type === 'comparison') {
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = SECONDARY_COLOR;
                    barTwoStyle.backgroundColor = SECONDARY_COLOR;
                }, i * ANIMATION_SPEED_MS);

                // Revert color after a short delay
                setTimeout(() => {
                    barOneStyle.backgroundColor = PRIMARY_COLOR;
                    barTwoStyle.backgroundColor = PRIMARY_COLOR;
                }, (i + 1) * ANIMATION_SPEED_MS);
            } else if (type === 'swap') {
                setTimeout(() => {
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    const barOneHeight = barOneStyle.height;
                    barOneStyle.height = barTwoStyle.height;
                    barTwoStyle.height = barOneHeight;
                    barOneStyle.backgroundColor = SECONDARY_COLOR;
                    barTwoStyle.backgroundColor = SECONDARY_COLOR;
                }, i * ANIMATION_SPEED_MS);

                // Revert color after a short delay
                setTimeout(() => {
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    barOneStyle.backgroundColor = PRIMARY_COLOR;
                    barTwoStyle.backgroundColor = PRIMARY_COLOR;
                }, (i + 1) * ANIMATION_SPEED_MS);
            }
        }
    }

    bubbleSort() {
        const animations = CompareSortingAlgorithms.bubbleSort(this.state.array);
        console.log("Bubble sort animations:", animations); // Debugging line
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar2');
            const [type, barOneIdx, barTwoIdx] = animations[i];

            if (type === 'comparison') {
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = SECONDARY_COLOR;
                    barTwoStyle.backgroundColor = SECONDARY_COLOR;
                }, i * ANIMATION_SPEED_MS);

                // Revert color after a short delay
                setTimeout(() => {
                    barOneStyle.backgroundColor = PRIMARY_COLOR;
                    barTwoStyle.backgroundColor = PRIMARY_COLOR;
                }, (i + 1) * ANIMATION_SPEED_MS);
            } else if (type === 'swap') {
                setTimeout(() => {
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    const barOneHeight = barOneStyle.height;
                    barOneStyle.height = barTwoStyle.height;
                    barTwoStyle.height = barOneHeight;
                    barOneStyle.backgroundColor = SECONDARY_COLOR;
                    barTwoStyle.backgroundColor = SECONDARY_COLOR;
                }, i * ANIMATION_SPEED_MS);

                // Revert color after a short delay
                setTimeout(() => {
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    barOneStyle.backgroundColor = PRIMARY_COLOR;
                    barTwoStyle.backgroundColor = PRIMARY_COLOR;
                }, (i + 1) * ANIMATION_SPEED_MS);
            }
        }
    }

    selectionSort() {
        const animations = CompareSortingAlgorithms.selectionSort(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar2');
            const [type, barOneIdx, barTwoIdx, newHeight] = animations[i];
    
            if (type === 'comparison') {
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = SECONDARY_COLOR;
                    barTwoStyle.backgroundColor = SECONDARY_COLOR;
                }, i * ANIMATION_SPEED_MS);
    
                // Revert color after a short delay
                setTimeout(() => {
                    barOneStyle.backgroundColor = PRIMARY_COLOR;
                    barTwoStyle.backgroundColor = PRIMARY_COLOR;
                }, (i + 1) * ANIMATION_SPEED_MS);
            } else if (type === 'swap') {
                setTimeout(() => {
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    const barOneHeight = barOneStyle.height;
                    barOneStyle.height = barTwoStyle.height;
                    barTwoStyle.height = barOneHeight;
                    barOneStyle.backgroundColor = SECONDARY_COLOR;
                    barTwoStyle.backgroundColor = SECONDARY_COLOR;
                }, i * ANIMATION_SPEED_MS);
    
                // Revert color after a short delay
                setTimeout(() => {
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    barOneStyle.backgroundColor = PRIMARY_COLOR;
                    barTwoStyle.backgroundColor = PRIMARY_COLOR;
                }, (i + 1) * ANIMATION_SPEED_MS);
            } else if (type === 'insert') {
                setTimeout(() => {
                    const barStyle = arrayBars[barOneIdx].style;
                    barStyle.height = `${newHeight}px`;
                    barStyle.backgroundColor = SECONDARY_COLOR;
                }, i * ANIMATION_SPEED_MS);
    
                // Revert color after a short delay
                setTimeout(() => {
                    const barStyle = arrayBars[barOneIdx].style;
                    barStyle.backgroundColor = PRIMARY_COLOR;
                }, (i + 1) * ANIMATION_SPEED_MS);
            }
        }
    }

    insertionSort() {
        const animations = CompareSortingAlgorithms.insertionSort(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar2');
            const [type, barOneIdx, barTwoIdx, newHeight] = animations[i];
    
            if (type === 'comparison') {
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = SECONDARY_COLOR;
                    barTwoStyle.backgroundColor = SECONDARY_COLOR;
                }, i * ANIMATION_SPEED_MS);
    
                // Revert color after a short delay
                setTimeout(() => {
                    barOneStyle.backgroundColor = PRIMARY_COLOR;
                    barTwoStyle.backgroundColor = PRIMARY_COLOR;
                }, (i + 1) * ANIMATION_SPEED_MS);
            } else if (type === 'swap') {
                setTimeout(() => {
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    const barOneHeight = barOneStyle.height;
                    barOneStyle.height = barTwoStyle.height;
                    barTwoStyle.height = barOneHeight;
                    barOneStyle.backgroundColor = SECONDARY_COLOR;
                    barTwoStyle.backgroundColor = SECONDARY_COLOR;
                }, i * ANIMATION_SPEED_MS);
    
                // Revert color after a short delay
                setTimeout(() => {
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    barOneStyle.backgroundColor = PRIMARY_COLOR;
                    barTwoStyle.backgroundColor = PRIMARY_COLOR;
                }, (i + 1) * ANIMATION_SPEED_MS);
            } else if (type === 'insert') {
                setTimeout(() => {
                    const barStyle = arrayBars[barOneIdx].style;
                    barStyle.height = `${newHeight}px`;
                    barStyle.backgroundColor = SECONDARY_COLOR;
                }, i * ANIMATION_SPEED_MS);
    
                // Revert color after a short delay
                setTimeout(() => {
                    const barStyle = arrayBars[barOneIdx].style;
                    barStyle.backgroundColor = PRIMARY_COLOR;
                }, (i + 1) * ANIMATION_SPEED_MS);
            }
        }
    }


    startSorting2() {
        const { selectedAlgorithm2 } = this.state;
        switch (selectedAlgorithm2) {
            case 'mergeSort':
                this.mergeSort2();
                break;
            case 'quickSort':
                this.quickSort2();
                break;
            case 'heapSort':
                this.heapSort2();
                break;
            case 'bubbleSort':
                this.bubbleSort2();
                break;
            case 'selectionSort':
                this.selectionSort2();
                break;
            case 'insertionSort':
                this.insertionSort2();
                break;
            default:
                break;
        }
    }

    mergeSort2() {
        const animations = CompareSortingAlgorithms2.mergeSort(this.state.array);
        const arrayBars = document.getElementsByClassName('array-bar3');
        const newAnimations = [];
    
        // Flatten animations for easier iteration
        for (const animation of animations) {
            newAnimations.push(animation.comparison);
            newAnimations.push(animation.comparison);
            newAnimations.push(animation.swap);
        }
    
        // Traverse through animations
        for (let i = 0; i < newAnimations.length; i++) {
            const isColorChange = i % 3 !== 2;
    
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = newAnimations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
    
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = newAnimations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }

    quickSort2() {
        const animations = CompareSortingAlgorithms2.quickSort(this.state.array);
        console.log("Quick sort animations:", animations); // Debugging line
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar3');
            const [type, barOneIdx, barTwoIdx] = animations[i];

            if (type === 'comparison') {
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = SECONDARY_COLOR;
                    barTwoStyle.backgroundColor = SECONDARY_COLOR;
                }, i * ANIMATION_SPEED_MS);

                // Revert color after a short delay
                setTimeout(() => {
                    barOneStyle.backgroundColor = PRIMARY_COLOR;
                    barTwoStyle.backgroundColor = PRIMARY_COLOR;
                }, (i + 1) * ANIMATION_SPEED_MS);
            } else if (type === 'swap') {
                setTimeout(() => {
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    const barOneHeight = barOneStyle.height;
                    barOneStyle.height = barTwoStyle.height;
                    barTwoStyle.height = barOneHeight;
                    barOneStyle.backgroundColor = SECONDARY_COLOR;
                    barTwoStyle.backgroundColor = SECONDARY_COLOR;
                }, i * ANIMATION_SPEED_MS);

                // Revert color after a short delay
                setTimeout(() => {
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    barOneStyle.backgroundColor = PRIMARY_COLOR;
                    barTwoStyle.backgroundColor = PRIMARY_COLOR;
                }, (i + 1) * ANIMATION_SPEED_MS);
            }
        }
    }

    heapSort2() {
        const animations = CompareSortingAlgorithms2.heapSort(this.state.array);
        console.log("Heap sort animations:", animations); // Debugging line
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar3');
            const [type, barOneIdx, barTwoIdx] = animations[i];

            if (type === 'comparison') {
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = SECONDARY_COLOR;
                    barTwoStyle.backgroundColor = SECONDARY_COLOR;
                }, i * ANIMATION_SPEED_MS);

                // Revert color after a short delay
                setTimeout(() => {
                    barOneStyle.backgroundColor = PRIMARY_COLOR;
                    barTwoStyle.backgroundColor = PRIMARY_COLOR;
                }, (i + 1) * ANIMATION_SPEED_MS);
            } else if (type === 'swap') {
                setTimeout(() => {
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    const barOneHeight = barOneStyle.height;
                    barOneStyle.height = barTwoStyle.height;
                    barTwoStyle.height = barOneHeight;
                    barOneStyle.backgroundColor = SECONDARY_COLOR;
                    barTwoStyle.backgroundColor = SECONDARY_COLOR;
                }, i * ANIMATION_SPEED_MS);

                // Revert color after a short delay
                setTimeout(() => {
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    barOneStyle.backgroundColor = PRIMARY_COLOR;
                    barTwoStyle.backgroundColor = PRIMARY_COLOR;
                }, (i + 1) * ANIMATION_SPEED_MS);
            }
        }
    }

    bubbleSort2() {
        const animations = CompareSortingAlgorithms2.bubbleSort(this.state.array);
        console.log("Bubble sort animations:", animations); // Debugging line
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar3');
            const [type, barOneIdx, barTwoIdx] = animations[i];

            if (type === 'comparison') {
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = SECONDARY_COLOR;
                    barTwoStyle.backgroundColor = SECONDARY_COLOR;
                }, i * ANIMATION_SPEED_MS);

                // Revert color after a short delay
                setTimeout(() => {
                    barOneStyle.backgroundColor = PRIMARY_COLOR;
                    barTwoStyle.backgroundColor = PRIMARY_COLOR;
                }, (i + 1) * ANIMATION_SPEED_MS);
            } else if (type === 'swap') {
                setTimeout(() => {
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    const barOneHeight = barOneStyle.height;
                    barOneStyle.height = barTwoStyle.height;
                    barTwoStyle.height = barOneHeight;
                    barOneStyle.backgroundColor = SECONDARY_COLOR;
                    barTwoStyle.backgroundColor = SECONDARY_COLOR;
                }, i * ANIMATION_SPEED_MS);

                // Revert color after a short delay
                setTimeout(() => {
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    barOneStyle.backgroundColor = PRIMARY_COLOR;
                    barTwoStyle.backgroundColor = PRIMARY_COLOR;
                }, (i + 1) * ANIMATION_SPEED_MS);
            }
        }
    }

    selectionSort2() {
        const animations = CompareSortingAlgorithms2.selectionSort(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar3');
            const [type, barOneIdx, barTwoIdx, newHeight] = animations[i];
    
            if (type === 'comparison') {
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = SECONDARY_COLOR;
                    barTwoStyle.backgroundColor = SECONDARY_COLOR;
                }, i * ANIMATION_SPEED_MS);
    
                // Revert color after a short delay
                setTimeout(() => {
                    barOneStyle.backgroundColor = PRIMARY_COLOR;
                    barTwoStyle.backgroundColor = PRIMARY_COLOR;
                }, (i + 1) * ANIMATION_SPEED_MS);
            } else if (type === 'swap') {
                setTimeout(() => {
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    const barOneHeight = barOneStyle.height;
                    barOneStyle.height = barTwoStyle.height;
                    barTwoStyle.height = barOneHeight;
                    barOneStyle.backgroundColor = SECONDARY_COLOR;
                    barTwoStyle.backgroundColor = SECONDARY_COLOR;
                }, i * ANIMATION_SPEED_MS);
    
                // Revert color after a short delay
                setTimeout(() => {
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    barOneStyle.backgroundColor = PRIMARY_COLOR;
                    barTwoStyle.backgroundColor = PRIMARY_COLOR;
                }, (i + 1) * ANIMATION_SPEED_MS);
            } else if (type === 'insert') {
                setTimeout(() => {
                    const barStyle = arrayBars[barOneIdx].style;
                    barStyle.height = `${newHeight}px`;
                    barStyle.backgroundColor = SECONDARY_COLOR;
                }, i * ANIMATION_SPEED_MS);
    
                // Revert color after a short delay
                setTimeout(() => {
                    const barStyle = arrayBars[barOneIdx].style;
                    barStyle.backgroundColor = PRIMARY_COLOR;
                }, (i + 1) * ANIMATION_SPEED_MS);
            }
        }
    }

    insertionSort2() {
        const animations = CompareSortingAlgorithms2.insertionSort(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar3');
            const [type, barOneIdx, barTwoIdx, newHeight] = animations[i];
    
            if (type === 'comparison') {
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = SECONDARY_COLOR;
                    barTwoStyle.backgroundColor = SECONDARY_COLOR;
                }, i * ANIMATION_SPEED_MS);
    
                // Revert color after a short delay
                setTimeout(() => {
                    barOneStyle.backgroundColor = PRIMARY_COLOR;
                    barTwoStyle.backgroundColor = PRIMARY_COLOR;
                }, (i + 1) * ANIMATION_SPEED_MS);
            } else if (type === 'swap') {
                setTimeout(() => {
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    const barOneHeight = barOneStyle.height;
                    barOneStyle.height = barTwoStyle.height;
                    barTwoStyle.height = barOneHeight;
                    barOneStyle.backgroundColor = SECONDARY_COLOR;
                    barTwoStyle.backgroundColor = SECONDARY_COLOR;
                }, i * ANIMATION_SPEED_MS);
    
                // Revert color after a short delay
                setTimeout(() => {
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    barOneStyle.backgroundColor = PRIMARY_COLOR;
                    barTwoStyle.backgroundColor = PRIMARY_COLOR;
                }, (i + 1) * ANIMATION_SPEED_MS);
            } else if (type === 'insert') {
                setTimeout(() => {
                    const barStyle = arrayBars[barOneIdx].style;
                    barStyle.height = `${newHeight}px`;
                    barStyle.backgroundColor = SECONDARY_COLOR;
                }, i * ANIMATION_SPEED_MS);
    
                // Revert color after a short delay
                setTimeout(() => {
                    const barStyle = arrayBars[barOneIdx].style;
                    barStyle.backgroundColor = PRIMARY_COLOR;
                }, (i + 1) * ANIMATION_SPEED_MS);
            }
        }
    }

    render() {
        const { array, selectedAlgorithm1, selectedAlgorithm2 } = this.state;

        return (
            <>
            <div className="two-arrays">
                <div className="array-container2">
                {array.map((value, idx) => (
                    <div className="array-bar2"
                        key={`bar2-${idx}`}
                        style={{ height: `${value}px` }}>
                    </div>
                ))}
                
                </div>


                <div className="array-container3">
                    {array.map((value, idx) => (
                        <div className="array-bar3"
                            key={`bar3-${idx}`}
                            style={{ height: `${value}px` }}>
                        </div>
                    ))}
                </div>
            </div>

            <div className='dropdown-container'>
                        <select value={selectedAlgorithm1} onChange={(e) => this.setState({ selectedAlgorithm1: e.target.value })} className="down-lists">
                            <option value="mergeSort">Merge Sort</option>
                            <option value="quickSort">Quick Sort</option>
                            <option value="heapSort">Heap Sort</option>
                            <option value="bubbleSort">Bubble Sort</option>
                            <option value="selectionSort">Selection Sort</option>
                            <option value="insertionSort">Insertion Sort</option>
                        </select>


                        <select value={selectedAlgorithm2} onChange={(e) => this.setState({ selectedAlgorithm2: e.target.value })} className="down-lists">
                            <option value="mergeSort">Merge Sort</option>
                            <option value="quickSort">Quick Sort</option>
                            <option value="heapSort">Heap Sort</option>
                            <option value="bubbleSort">Bubble Sort</option>
                            <option value="selectionSort">Selection Sort</option>
                            <option value="insertionSort">Insertion Sort</option>
                        </select>
                 </div>

                
                

                <div className="controls">
                    <ResetButton onClick={() => this.resetArray()} />
                    <button onClick={() => { this.startSorting(); this.startSorting2(); }}
                    className="each-button2">
                        Start
                    </button>
                </div>
            </>
        );
    }
}

function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
