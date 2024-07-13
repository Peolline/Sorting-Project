
import CompareSortingAlgorithms from "./CompareSortingAlgorithms/CompareSortingAlgorithms.jsx";
import SortingVisualizer from "./SortingVisualizer/SortingVisualizer";
import CoverPage from "./Words/CoverPage";



function App(){
  return(
    <div className="App">
      <section>
        <CoverPage/>
      </section>
      <section>
        <SortingVisualizer/>
      </section>
      <section>
        <CompareSortingAlgorithms/>
      </section>
    </div>


  )
}

export default App;