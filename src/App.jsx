
import CompareSortingAlgorithms from "./CompareSortingAlgorithms/CompareSortingAlgorithms.jsx";
import SortingVisualizer from "./SortingVisualizer/SortingVisualizer";
import CoverPage from "./Words/CoverPage";
import Devider from "./Words/Devider";



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
        <Devider/>
      </section>
      <section>
        <CompareSortingAlgorithms/>
      </section>
    </div>


  )
}

export default App;