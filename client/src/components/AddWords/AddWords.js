import DragDrop from "../DragDrop/DragDrop"
import React from "react";
import { Button, Input, Container, InputGroup, InputRightElement } from "@chakra-ui/react";
import './AddWords.css'

const AddWords = ({ words, setWords, renderImg }) => {
    const handleWords = data =>
        setWords(data.image.split("\n").filter(word => word.length > 1))

    const displayWords = () => 
        <Container>
            {words.map((word, index) => 
                <div key={index} className='word'>
                    {word.toUpperCase()}
                    <Button color={'red'} id={`word-${word}`} onClick={removeWord}>Remove</Button>
                </div>)}
        </Container>

    const addWord = () => {
        const input = document.getElementById('add-word-input');
        const word = input.value.replace(/\s/g, '');
        if (!words.includes(word.toUpperCase()) && word.length > 1) {
            const wordsCopy = [...words];
            wordsCopy.unshift(word.toUpperCase())
            setWords(wordsCopy)
            input.value = ''
        }
    }

    // Source of below function: https://stackoverflow.com/questions/9229645/remove-duplicate-values-from-js-array
    const uniq = arr => {
        var seen = {};
        var out = [];
        var len = arr.length;
        var j = 0;
        for(var i = 0; i < len; i++) {
             var item = arr[i];
             if(seen[item] !== 1) {
                   seen[item] = 1;
                   out[j++] = item;
             }
        }
        return out;
    }

    const removeWord = e => setWords(uniq(words.filter(word => word !== e.target.id.split('-')[1]))) 

    const userInput = () => 
        <form onSubmit={(e) => e.preventDefault()}>
            <InputGroup size='md'>
            <Input
                pr='4.5rem'
                placeholder='Enter word'
                id={'add-word-input'}/>
            <InputRightElement width='4.5rem'>
                <Button type='submit' h='1.75rem' size='sm' onClick={addWord}>
                    Add
                </Button>
            </InputRightElement>
            </InputGroup>
        </form>
    
    return (
        <>
            <DragDrop handleFile={file => renderImg(file, handleWords, './words')}/>
            {userInput()}
            {displayWords()}
        </>
    )
}

export default AddWords;