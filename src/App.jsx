import { useEffect, useState } from 'react';
import { QRcode } from './components/QRcode';
import A from './data/A.json';

Array.prototype.chunk = function(size) {
  return this.flatMap((x, i) => i % size === 0 ? [this.slice(i, i + size)] : []);
}

function flip(aisle) { 
  return aisle < 27 
    ? Boolean(aisle % 2) 
    : ! Boolean(aisle % 2);
}

function offset(n = 1, offset = 32) {
  const from = offset * (n - 1);
  const to = from + offset;
  return [from, to]
}

function App() {
  const [aisle] = useState(2);
  const [columns] = useState(['A', 'B', 'C', 'D', 'E', 'G', 'H', 'J']);
  const [locations, setLocations] = useState([]); 

  useEffect(() => setLocations(A), [])

  return (
    <div class="container-fluid mt-5" style={{width: 1300}}>

      <div class="row row-cols-8 gx-1">
        {(flip(aisle) 
          ? columns.slice().reverse() 
          : columns)
          .map((letter) => (
            <div class="col">
              <div class="fs-1 fw-bold text-center">{letter}</div>
            </div>
          ))}
      </div>

      <div class="row row-cols-8 gx-1 gy-1">
      
      {(flip(aisle) 
        ? locations
            .slice(...offset(aisle))
            .reverse()
        : locations
            .slice(...offset(aisle))
            .chunk(8)
            .reverse()
            .flat())
        .map((location, index) => (
          <div class="col">
            <QRcode 
              key={index} 
              label={location.label} 
              data={location.data}
            />
          </div>
        ))}
      </div>

      <div class="text-center mt-3">
        <span class="display-1 fw-semibold">A{aisle}</span>
      </div>

    </div>
  )
}

export default App