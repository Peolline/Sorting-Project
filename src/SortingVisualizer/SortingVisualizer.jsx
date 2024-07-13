import React from "react"
import './SortingVisualizer.css'
import * as sortingAlgorithms from '../SortingAlgorithms/SortingAlgorithms.js'



// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 10;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 100;

// This is the main color of the array bars.
const PRIMARY_COLOR = 'rgb(219, 148, 215)';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'darkred';

// const SOUND_VOLUME_HZ = 523.25;
const SOUND_MS = 250;
const SOUND_VOLUME = 0.4;
const multiple_Frequency = 0;


export default class SortingVisualizer extends React.Component{

    constructor(props){
        super(props); //Want to access this.props which is this.state. so do super(props) not just super()
        
        //I think this thing use the react useState
        //because there's state and setStat
        this.state = {
            array: [],
            selectedAlgorithm: 'mergeSort',
        };
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.quickSort = this.quickSort.bind(this);
    }

    playSound(frequency, duration, volume) {
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        oscillator.type = 'sine'; // Adjust oscillator type if needed (sine, square, sawtooth, triangle)
        oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);

        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(volume, this.audioContext.currentTime + 0.1);
        gainNode.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + duration / 1000);

        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.start();
        oscillator.stop(this.audioContext.currentTime + duration / 1000);
    }
    
    
    //FOR WHEN RELOAD THE PAGE
    componentDidMount(){
        this.resetArray();
    }
    resetArray(){
        const array = [];
        for(let i = 0; i<NUMBER_OF_ARRAY_BARS; i++){
            array.push(randomIntFromInterval(10, 500));
        }
        this.setState({array});
    }
    
    startSorting() {
        const { selectedAlgorithm, array } = this.state;
        switch (selectedAlgorithm) {
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
    }
    

    mergeSort() {
        const animations = sortingAlgorithms.mergeSort(this.state.array);
        const arrayBars = document.getElementsByClassName('array-bar');
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
    
                    // Play sound when bars change color to secondary color
                    if (color === SECONDARY_COLOR) {
                        const frequency = this.state.array[barOneIdx] * multiple_Frequency; // Adjust multiplier for frequency range
                        this.playSound(frequency, SOUND_MS, SOUND_VOLUME);
                    }
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
        const animations = sortingAlgorithms.quickSort(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const [type, barOneIdx, barTwoIdx] = animations[i];


            if (type === 'comparison') {
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = SECONDARY_COLOR;
                    barTwoStyle.backgroundColor = SECONDARY_COLOR;
                    const frequency = this.state.array[barOneIdx] * multiple_Frequency; // Adjust multiplier for frequency range
                    this.playSound(frequency, SOUND_MS, SOUND_VOLUME);                
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
                    const frequency = this.state.array[barOneIdx] * multiple_Frequency; // Adjust multiplier for frequency range
                    this.playSound(frequency, SOUND_MS, SOUND_VOLUME);                
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
    heapSort(){
        const animations = sortingAlgorithms.heapSort(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const [type, barOneIdx, barTwoIdx] = animations[i];


            if (type === 'comparison') {
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = SECONDARY_COLOR;
                    barTwoStyle.backgroundColor = SECONDARY_COLOR;
                    const frequency = this.state.array[barOneIdx] * multiple_Frequency; // Adjust multiplier for frequency range
                    this.playSound(frequency, SOUND_MS, SOUND_VOLUME);                
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
                    const frequency = this.state.array[barOneIdx] * multiple_Frequency; // Adjust multiplier for frequency range
                    this.playSound(frequency, SOUND_MS, SOUND_VOLUME);                
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
    bubbleSort(){
        const animations = sortingAlgorithms.bubbleSort(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const [type, barOneIdx, barTwoIdx] = animations[i];


            if (type === 'comparison') {
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = SECONDARY_COLOR;
                    barTwoStyle.backgroundColor = SECONDARY_COLOR;
                    const frequency = this.state.array[barOneIdx] * multiple_Frequency; // Adjust multiplier for frequency range
                    this.playSound(frequency, SOUND_MS, SOUND_VOLUME);                
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
                    const frequency = this.state.array[barOneIdx] * multiple_Frequency; // Adjust multiplier for frequency range
                    this.playSound(frequency, SOUND_MS, SOUND_VOLUME);                
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
    selectionSort(){
        const animations = sortingAlgorithms.selectionSort(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const [type, barOneIdx, barTwoIdx] = animations[i];


            if (type === 'comparison') {
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = SECONDARY_COLOR;
                    barTwoStyle.backgroundColor = SECONDARY_COLOR;
                    const frequency = this.state.array[barOneIdx] * multiple_Frequency; // Adjust multiplier for frequency range
                    this.playSound(frequency, SOUND_MS, SOUND_VOLUME);
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
                    const frequency = this.state.array[barOneIdx] * multiple_Frequency; // Adjust multiplier for frequency range
                    this.playSound(frequency, SOUND_MS, SOUND_VOLUME);
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
    insertionSort(){
        const animations = sortingAlgorithms.insertionSort(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const [type, barOneIdx, barTwoIdx, newHeight] = animations[i];
    
            if (type === 'comparison') {
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                setTimeout(() => {
                    barOneStyle.backgroundColor = SECONDARY_COLOR;
                    barTwoStyle.backgroundColor = SECONDARY_COLOR;
                    const frequency = this.state.array[barOneIdx] * multiple_Frequency; // Adjust multiplier for frequency range
                    this.playSound(frequency, SOUND_MS, SOUND_VOLUME);                
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
                    const frequency = this.state.array[barOneIdx] * multiple_Frequency; // Adjust multiplier for frequency range
                    this.playSound(frequency, SOUND_MS, SOUND_VOLUME);
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
                    const frequency = this.state.array[barOneIdx] * multiple_Frequency; // Adjust multiplier for frequency range
                    this.playSound(frequency, SOUND_MS, SOUND_VOLUME);                
                }, i * ANIMATION_SPEED_MS);
    
                // Revert color after a short delay
                setTimeout(() => {
                    const barStyle = arrayBars[barOneIdx].style;
                    barStyle.backgroundColor = PRIMARY_COLOR;
                }, (i + 1) * ANIMATION_SPEED_MS);
            }
        }
    }
    


    render(){
        const {array} = this.state;

        return(
            <>
                <div className="array-container"> 
                    {array.map((value, idx) => (
                        <div className="array-bar" 
                        key={idx}
                        style={{height: `${value}px`}}>
                        </div>
                    ))} 
                </div>
                
                <div className="dropdown-container">
                    <select className="down-lists" onChange={(e) => this.setState({ selectedAlgorithm: e.target.value })}>
                        <option value="mergeSort">Merge Sort</option>
                        <option value="quickSort">Quick Sort</option>
                        <option value="heapSort">Heap Sort</option>
                        <option value="bubbleSort">Bubble Sort</option>
                        <option value="selectionSort">Selection Sort</option>
                        <option value="insertionSort">Insertion Sort</option>
                    </select>
                </div>
                    

                <div className="buttons">
                    <button onClick={() => this.resetArray()} 
                            className="each-button">
                        Reset Array
                    </button>

                    <button onClick={() => { this.startSorting() }}
                    className="each-button2">
                        Start
                    </button>

                </div>
            </>
            
            
        );
    }
}

function  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

