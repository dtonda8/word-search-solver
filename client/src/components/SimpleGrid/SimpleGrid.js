import './SimpleGrid.css'

const SimpleGrid = (props) => {    
    const {grid, answer} = props;

    // Source: https://stackoverflow.com/questions/41661287/how-to-check-if-an-array-contains-another-array
    const isArrayInArray = (arr, item) => {
        var item_as_string = JSON.stringify(item);
      
        var contains = arr.some(function(ele){
          return JSON.stringify(ele) === item_as_string;
        });
        return contains;
      }
      
    return (
        <div className="grid" style={{gridTemplateColumns: `repeat(${grid[0].length}, 30px)`}}>
            {grid.map((row, row_idx) => 
                row.map((letter, col_idx) => {
                    return (<div 
                        className={isArrayInArray(answer, [row_idx, col_idx]) ? 'highlight' : 'nothing'}
                        key={`${row_idx}-${col_idx}-${letter}`}     
                        id={`${row_idx}-${col_idx}`}>
                        {letter}</div>)
                        }
                    )
                )
            }
        </div>
    )
}

export default SimpleGrid