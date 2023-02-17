import React, { useState, useEffect } from "react";
import { CloseIcon } from '@chakra-ui/icons'
import { Button, IconButton } from '@chakra-ui/react';
import DragDrop from "../DragDrop/DragDrop";


const AddWordSearch = ({ renderImg }) => {
    const [grid, setGrid] = useState([["A", "B", "C"], ["D", "E", "F"], ["G", "H", "I"]]);
    const [file, setFile] = useState(null);

    const handleFile = newFile => {
        setFile(newFile)
        renderImg(newFile, 'word-search-img')
    }

    const handleInput = (e) => {
        const [row, col] = e.target.id.split('-')
        const gridCopy = [...grid];
        gridCopy[row][col] = e.target.value
        setGrid(gridCopy)
    } 

    const addRowTop = () => {
        const arr = [...Array(grid[0].length).keys()].map(el => '')
        const gridCopy = [...grid];
        gridCopy.splice(0, 0, arr);
        setGrid(gridCopy)
    } 

    const addRowBottom = () => {
        const arr = [...Array(grid[0].length).keys()].map(el => '')
        const gridCopy = [...grid];
        gridCopy.push(arr);
        setGrid(gridCopy)
    } 

    const addColLeft = () => setGrid(grid.map(arr => ['', ...arr,]));
    const addColRight = () => setGrid(grid.map(arr => [...arr, ''])); 

    const buildGrid = () => 
    <div id="grid" style={{gridTemplateColumns: `repeat(${grid[0].length}, 1fr)`}}>
        {grid.map((row, row_idx) => 
            row.map((letter, col_idx) => 
                <input 
                    key={`${row_idx}-${col_idx}-${letter}`}     
                    type="text" 
                    id={`${row_idx}-${col_idx}`} 
                    defaultValue={letter}
                    maxLength='1'
                    onChange={handleInput}></input>
                )
            )
        }
    </div>

    const deleteBtns = (direction) => {
        const n = (direction === 'row') ? grid.length : grid[0].length;
        const numbers = [...Array(n).keys()];
        const type = (direction === 'row') ? 'row' : 'col';
        const btnStyle = {
            display: 'flex',
            flexDirection: (direction === 'row') ? 'column': 'row'
        }
        
        return (
            <div className="delete-btns" style={btnStyle}>
                {numbers.map((num, idx) => <IconButton onClick={() => deleteRowCol(type, num)} key={idx} id={`${type}-${num}`} icon={<CloseIcon color="red.500" w={3} h={3} />}/>)}
            </div>
        )
    }

    const deleteRowCol = (type, idx) => {
        if (type === 'row' && grid.length > 1) {
            const gridCopy = [...grid]
            gridCopy.splice(idx, 1)
            setGrid(gridCopy)
        } else if (type === 'col' && grid[0].length > 1) {
            const gridCopy = grid.map(arr => arr.filter((elem, index) => index !== idx));
            setGrid(gridCopy)
        } else {
            console.log("not possible")
        }
    }

    return ( <>
                <Button onClick={addRowTop} colorScheme='blue' variant='outline'>Add Row Top</Button>
                <Button onClick={addRowBottom} colorScheme='blue' variant='outline'>Add Row Bottom</Button>
                <Button onClick={addColLeft} colorScheme='blue' variant='outline'>Add Col Left</Button>
                <Button onClick={addColRight} colorScheme='blue' variant='outline'>Add Col Right</Button>

                <div id='grid-container'>
                    {buildGrid()}
                    {deleteBtns('row')}
                </div>
                {deleteBtns('col')}
                <div id="delete-col-container">
                    {}
                </div>
                <DragDrop handleFile={handleFile}/>
                <div id="img-preview"><img id='word-search-img'></img></div>
            </>
    )
}

export default AddWordSearch;