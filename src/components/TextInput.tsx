import { useEffect, useRef, useState } from "react";
import "./styles/TextInput.sass";

interface Props {
    value: string,
    updateValue?: (newValue: string) => void,
    label: string,

    regex?: string,
    maxLength?: number,
    inputType?: string,
    inputMode?: "search" | "text" | "email" | "tel" | "url" | "none" | "numeric" | "decimal",
    customClass?: string,
    giveRef?: React.RefObject<HTMLInputElement>,
    textArea?: boolean,
    placeholder?: string,
}

/**
 * REQUIRED:
 * @param {string} value
 * The current value of the text input. This should be a 
 * state variable, as TextInput does not control its own
 * text content state.
 * 
 * @param {function} updateValue
 * Set state dispatch function used to update value.
 * If updateValue is not provided, the TextInput is considered read-only.
 * 
 * @param {string} label
 * The label text for the text input.
 * 
 * OPTIONAL:
 * 
 * @param {string} regex 
 * A regular expression which should only match valid inputs.
 * 
 * @param {string} inputType 
 * Used to provide an alternative type value to the input.
 * By default, "text" is used.
 * 
 * @param {string} inputMode
 * Not te be confused with inputType, which sets the html attribute "type",
 * this prop sets the html attribute "inputmode". By default no value is provided.
 * 
 * @param {number} maxLength 
 * The maximum input length. Defaults to 32.
 * 
 * @param {boolean} blockInvalid 
 * Whether invalid inputs should be blocked. Defaults
 * to false, which is useful if an input which is not fully formed
 * or in the process of being typed would not match the regex.
 * 
 * @param {string} customClass
 * Adds additional class names to the input element.
 */
export default function TextInput({
    label,
    value,
    updateValue,
    regex,
    maxLength,
    inputType,
    inputMode,
    customClass,
    giveRef,
    textArea,
    placeholder,
}: Props) {
    let localRef = useRef<HTMLInputElement>(null);
    localRef = giveRef || localRef;

    // @ts-expect-error If the regex prop doesn't exist, we don't care since we won't use filter.
    const filter = new RegExp(regex);
    function isValid(checkValue: string) {
        return (!maxLength || checkValue.length <= maxLength) && (!regex || filter.test(checkValue));
    }

    const [needsFix, setNeedsFix] = useState(false);
    function updateText(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const newValue = event.target.value;
        updateValue && updateValue(newValue);
        if (newValue) setNeedsFix(false);
    }

    const valueRef = useRef(value);
    useEffect(() => { valueRef.current = value; }, [value]);
    useEffect(() => {
        // We could just have value as an entry in the dependency array
        // of this useEffect, but then we add and remove an EventListener
        // every single time value is updated, which be slow.

        const handleMissingInput = () => {
            if (valueRef.current) return;
            setNeedsFix(true);
        }

        window.addEventListener("highlightMissingInputs", handleMissingInput);
        return () => window.removeEventListener("highlightMissingInputs", handleMissingInput);
    }, []);

    let containerClass = "text-input-container";
    if (value || textArea) containerClass += " has-content";
    if (textArea) containerClass += " textarea";
    if (!isValid(value) || needsFix) containerClass += " invalid";
    if (customClass) containerClass += " " + customClass;

    return (
        <div className={containerClass}>
            <div className="text-input-label">
                <div className="line-cover" />
                <p>{label}</p>
            </div>

            {
                textArea ?
                    <textarea
                        value={value}
                        onChange={updateText}
                        placeholder={placeholder}
                    />
                    :
                    <input
                        type={inputType || "text"}
                        inputMode={inputMode}
                        className={"form-field"}
                        maxLength={maxLength}
                        value={value}
                        onChange={updateText}
                        disabled={!updateValue}
                        ref={localRef}
                    />
            }
        </div>
    );
}
