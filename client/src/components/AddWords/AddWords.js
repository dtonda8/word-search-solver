import DragDrop from "../DragDrop/DragDrop"
import React, { useState } from "react";
import { Button, Input, Container, InputGroup, InputRightElement } from "@chakra-ui/react";
import './AddWords.css'

const AddWords = ({ renderImg }) => {
    const [words, setWords] = useState([])
    const [file, setFile] = useState(null)
    const removeWord = e => setWords(words.filter(word => word !== e.target.id.split('-')[1])) 

    const handleFile = newFile => {
        setFile(newFile)
        renderImg(newFile, 'words-img')
    }

    const displayWords = () => 
        <Container>
            {words.map((word, index) => 
                <div key={index} className='word'>
                    {word.toUpperCase()}
                    <Button color={'red'} id={`word-${word}`} onClick={removeWord}>Remove</Button>
                </div>)}
        </Container>

    const handleAddWord = () => {
        const input = document.getElementById('add-word-input');
        const word = input.value.replace(/\s/g, '');
        if (!words.includes(word) && word.length > 1) {
            const wordsCopy = [...words];
            wordsCopy.push(word)
            setWords(wordsCopy)
            input.value = ''
        }
    }

    const userInput = () => 
        <form onSubmit={(e) => e.preventDefault()}>
            <InputGroup size='md'>
            <Input
                pr='4.5rem'
                placeholder='Enter word'
                id={'add-word-input'}/>
            <InputRightElement width='4.5rem'>
                <Button type='submit' h='1.75rem' size='sm' onClick={handleAddWord}>
                    Add
                </Button>
            </InputRightElement>
            </InputGroup>
        </form>

    return (
        <>
            {userInput()}
            {displayWords()}
            <DragDrop handleFile={handleFile}/>
            <div id="img-preview"><img id='words-img'></img></div>
        </>
    )
}

export default AddWords;