const { useState } = React

// base circumference of 100 (i.e. 100%) for easier math
const C = 100
const R = C / (2 * Math.PI)
// stroke-dashoffset to make sure, the first segment starts at 12 o'clock
const INITIAL_SEGMENT_OFFSET = 125

const colorMap = {
  a:'#253494',
  b:'#2c7fb8',
  c: '#41b6c4', 
  d: '#a1dab4', 
  e: '#ffff99'
}

const dataSet = {
  2017: [
    { value: 45, category: 'a' },
    { value: 9, category: 'b' },
    { value: 25, category: 'c' },
    { value: 39, category: 'd' },
    { value: 46, category: 'e' }
  ],
  2018: [
    { value: 38, category: 'a' },
    { value: 22, category: 'b' },
    { value: 10, category: 'c' },
    { value: 10, category: 'd' },
    { value: 5, category: 'e' }
  ],
  2019: [
    { value: 20, category: 'a' },
    { value: 20, category: 'b' },
    { value: 20, category: 'c' },
    { value: 20, category: 'd' },
    { value: 20, category: 'e' }
  ]
}

const DataTable = () => {
  return (
    <table className="responsive-table mb-10" role="table">
        <thead role="rowgroup">
          <tr role="row">
            <th role="columnheader"></th>
            <th role="columnheader">A</th>
            <th role="columnheader">B</th>
            <th role="columnheader">C</th>
            <th role="columnheader">D</th>
            <th role="columnheader">E</th>
          </tr>
        </thead>
        <tbody role="rowgroup">
          <tr role="row">
            <td role="cell">
              2017
            </td>
            {dataSet['2017'].map((d, i) => 
              <td key={i} role="cell">
              {d.value}
              </td>
            )}
          </tr>
          <tr role="row">
            <td role="cell">
              2018
            </td>
            {dataSet['2018'].map((d, i) => 
              <td key={i} role="cell">
              {d.value}
              </td>
            )}
          </tr>
          <tr role="row">
            <td role="cell">
              2019
            </td>
            {dataSet['2019'].map((d, i) => 
              <td key={i} role="cell">
              {d.value}
              </td>
            )}
          </tr>
        </tbody>
      </table>
  )
}

const Donut = ({data}) => {
  const sum = data.reduce((acc, cur) => acc + cur.value, 0)
  const percentage = (value, total) => (100 * value) / total
  let accumulatedSegmentsLength = 0
  const processedData = data
    // Just in case: sort by category (from a to e)
    .sort((a, b) => {
      if (a.category > b.category) {
        return 1;
      }
      if (a.category < b.category) {
        return -1;
      }
      return 0;
    })
    .map(a => ({
      percentage: percentage(a.value, sum),
      ...a
    }))

  return (
    <div className="donut-container">
      <svg viewBox="0 0 40 40" className="donut">
        <circle
          className="donut-hole"
          cx="20"
          cy="20"
          r={R}
          fill="#fff"
        ></circle>
        <circle
          className="donut-ring"
          cx="20"
          cy="20"
          r={R}
          fill="transparent"
          stroke="#d2d3d4"
        ></circle>
        <g>
          {processedData.map((d, i) => {
            const dash = d.percentage
            const gap = C - dash
            const offset = INITIAL_SEGMENT_OFFSET - accumulatedSegmentsLength
            accumulatedSegmentsLength = accumulatedSegmentsLength + d.percentage
            return (
              <circle
                key={i}
                className="donut-segment"
                cx="20"
                cy="20"
                r={R}
                fill="transparent"
                stroke={colorMap[d.category]}
                strokeDasharray={`${dash} ${gap}`}
                strokeDashoffset={offset}
              ></circle>
            )
          })}
        </g>
      </svg>
    </div>
  )
}


function App() {
  const [selectedOption, setSelectedOption] = useState('2017');
  const handleChange = (event) => {
    setSelectedOption(event.target.value)
  }

  return (
    <div className="container">
      <div>
      <DataTable />
      <form>
        <p>Top five fruits dataset:</p>
        <div>
          {/* 2017 */}
          <input
            type="radio"
            id="category-data-2017"
            name="category"
            value="2017"
            checked={selectedOption === '2017'}
            onChange={handleChange}
          />
          <label htmlFor="category-data-2017">2017</label>
          {/* 2018 */}
          <input 
            type="radio" 
            id="category-data-2018" 
            name="category" 
            value="2018" 
            checked={selectedOption === '2018'} 
            onChange={handleChange}
          />
          <label htmlFor="category-data-2018">2018</label>
          {/* 2019 */}
          <input 
            type="radio" 
            id="category-data-2019" 
            name="category" 
            value="2019" 
            checked={selectedOption === '2019'} 
            onChange={handleChange}
          />
          <label htmlFor="category-data-2091">2019</label>
        </div>
      </form>
      </div>
      <Donut data={dataSet[selectedOption]}/>
    </div>
  )
}

ReactDOM.render(
  <App/>,
  document.getElementById('root')
);
