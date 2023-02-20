import React, {useState} from "react";
import AddWordSearch from "../AddWordSearch/AddWordSearch";
import AddWords from "../AddWords/AddWords";
import CollapseDiv from "../CollapseDiv/CollapseDiv";
import Results from "../Results/Results";
import { Button } from "@chakra-ui/react";
import './Home.css'

const Home = () => {
    const [results, setResults] = useState([])
    const [words, setWords] = useState([])
    const [grid, setGrid] = useState([["A", "B", "C"], ["D", "E", "F"], ["G", "H", "I"]]);

    const renderImg = (file, handleResult, path) => {
        if (file.type && !file.type.startsWith('image/')) {
            console.log('File is not an image.', file.type, file);
            return;
          }
        const reader = new FileReader();
        reader.addEventListener('load', (event) => {
            fetchResult(path, event.target.result, handleResult)
        });
        reader.readAsDataURL(file);
    }

    const fetchResult = async (path, dataToSend, handleResult) => {
        fetch(path, {
            method: "POST",  
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(dataToSend)
        })
        .then(res => res.json())
        .then(data => handleResult(data));
    }

    const getResults = () => {
        fetchResult('/answers', {grid: grid, words: words}, handleAnswers)
    }

    const handleAnswers = data => {
        console.log(data.answers)
        setResults(data.answers)
    }

    return (
        <div id="home">
            <div className="step" id="step-1">
                <CollapseDiv 
                    btnTitle={"1. Add Word Search's Letters"} 
                    content={<AddWordSearch grid={grid} setGrid={setGrid} renderImg={renderImg} />}/>
            </div>
            <div className="step" id="step-2">
                <CollapseDiv 
                    btnTitle={"2. Add Word Search's Words"} 
                    content={<AddWords words={words} setWords={setWords} renderImg={renderImg} />}/>
            </div>
                <Button colorScheme="green" onClick={getResults}>Get Answers!</Button>
                <Results grid={grid} results={results} />
        </div>
    )
}

export default Home;