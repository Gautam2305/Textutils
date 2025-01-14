import React, { useState } from 'react'


export default function TextForm(props) {
    const handleUpClick = () => {
        let newText = text.toUpperCase();
        setText(newText)
        props.showAlert("Converted to uppercase!", "success");
    }

    const handleLoClick = () => {

        let newText = text.toLowerCase();
        setText(newText);
        props.showAlert("Converted to lowercase!", "success");
    }

    const handleClearClick = () => {
        let newText = '';
        setText(newText);
        props.showAlert("Text Cleared!", "success");
    }

    const handlePunctuation = () => {
        let newText = text.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
        setText(newText.replace(/\s{2,}/g, " "));
        props.showAlert("Punctuation Removed!", "success");
    }

    const handleOnChange = (event) => {
        setText(event.target.value)
    }

    const handleReplaceTextOnChange = (event) => {
        setReplaceObj(
            { ...replaceObj, replaceText: event.target.value }
        )
    }

    const handleWithTextOnChange = (event) => {
        setReplaceObj(
            { ...replaceObj, withText: event.target.value }
        )
    }

    const handleFindReplace = () => {
        setFindAndReplace(true);
    }

    const handleReplaceClick = () => {
        let newText = text.replaceAll(replaceObj.replaceText, replaceObj.withText);
        setText(newText);
        setFindAndReplace(false);
    }

    // Credits: A
    const handleCopy = () => {
        navigator.clipboard.writeText(text);
        props.showAlert("Copied to Clipboard!", "success");
    }

    // Credits: Coding Wala
    const handleExtraSpaces = () => {
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));
        props.showAlert("Extra spaces removed!", "success");
    }

    //added by- codewithnick
    const captializeFirstWord = () => {
        //split sentence into words
        const arr = text.split(" ");
        for (var i = 0; i < arr.length; i++) {
            arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
            //capitalise first char of every word
        }
        //rejoin words
        const newText = arr.join(" ");
        setText(newText);
        props.showAlert("Capitalised first word!", "success");
    }
    const addLineBreak = () => {
        //replace with line breaks
        let newText=text.replaceAll("?","?\n").replaceAll("!","!\n").replaceAll(".",".\n");
        setText(newText);
        props.showAlert("Added Line breaks!", "success");
    }
    const speak = () => {
        let msg = new SpeechSynthesisUtterance();
        msg.text = text;
        window.speechSynthesis.speak(msg);
      }

    const [text, setText] = useState('');
    const [findAndReplace, setFindAndReplace] = useState(false);
    const [replaceObj, setReplaceObj] = useState({ replaceText: "", withText: "" });

    // text = "new text"; // Wrong way to change the state
    // setText("new text"); // Correct way to change the state
    return (
        <>
            <div class="container" style={{ color: props.mode === 'dark' ? 'white' : '#042743' }}>
                <h1 class='mb-4'>{props.heading}</h1>
                <div class="mb-3">
                    <textarea class="form-control" value={text} onChange={handleOnChange} style={{ backgroundColor: props.mode === 'dark' ? '#13466e' : 'white', color: props.mode === 'dark' ? 'white' : '#042743' }} id="myBox" rows="8"></textarea>

                </div>
                <button disabled={text.length === 0} class="btn btn-primary mx-1 my-1" onClick={handleUpClick}>Convert to Uppercase</button>
                <button disabled={text.length === 0} class="btn btn-primary mx-1 my-1" onClick={handleLoClick}>Convert to Lowercase</button>
                <button disabled={text.length === 0} class="btn btn-primary mx-1 my-1" onClick={handleClearClick}>Clear Text</button>
                <button disabled={text.length === 0} class="btn btn-primary mx-1 my-1" onClick={handleCopy}>Copy Text</button>
                <button disabled={text.length === 0} class="btn btn-primary mx-1 my-1" onClick={handleExtraSpaces}>Remove Extra Spaces</button>
                <button disabled={text.length === 0} class="btn btn-primary mx-1 my-1" onClick={handleFindReplace}>Find and Replace</button>
                <button disabled={text.length === 0} class="btn btn-primary mx-1 my-1" onClick={captializeFirstWord}>Captialize First Word</button>
                <button disabled={text.length === 0} class="btn btn-primary mx-1 my-1" onClick={addLineBreak}>Add Line Break</button>
                <button disabled={text.length === 0} class="btn btn-primary mx-1 my-1" onClick={handlePunctuation}>Remove Punctuation</button>
                <button disabled={text.length===0} class="btn btn-primary mx-2 my-2" type="submit" onClick={speak}  >Speak</button>
                
                {findAndReplace &&
                    <div style={{ display: 'flex', width: '200px', flexWrap: 'wrap' }}>
                        <input type="text" onChange={handleReplaceTextOnChange} class="form-control my-1" placeholder='Word in paragraph' />
                        <input type="text" onChange={handleWithTextOnChange} class="form-control my-1" placeholder='Replace word with' />
                        <button class="btn btn-primary mx-1 mb-1 margin-top" onClick={handleReplaceClick}>Replace Instance</button>
                    </div>
                }
            </div>
                

            <div class="container my-3" style={{ color: props.mode === 'dark' ? 'white' : '#042743' }}>
                
                {/* added by Gautam2305 */}
                <section >
                <h2 class='preview-heading'>Preview</h2>
                <p class='preview-container form-control'>{text.length > 0 ? text : "Nothing to preview!"}</p>
                </section>
                
                <h3 class='preview-heading summ-heading'>Your text summary</h3>
                <p class='text-update in-text-updt'>{text.split(/\s+/).filter((element) => { return element.length !== 0 }).length} words with {text.length} characters</p>
                <p class='text-update'><span class='in-text-updt'>{0.008 * text.split(/\s+/).filter((element) => { return element.length !== 0 }).length} Minutes read</span></p>
                
            </div>
        </>
    )
}
