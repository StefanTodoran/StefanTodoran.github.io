import { useEffect, useRef, useState } from "react";
import IconButton from "../components/IconButton";
import SimpleButton from "../components/SimpleButton";
import TextInput from "../components/TextInput";

import "./IntroButtons.sass";
import Resume from "/Resume.pdf";

import BlogIcon from "../assets/svg/blog.svg";
import ResumeIcon from "../assets/svg/resume.svg";
import ContactIcon from "../assets/svg/contact.svg";
import CancelIcon from "./svg/CancelIcon";
import SubmitIcon from "./svg/SubmitIcon";
import Title from "../components/Title";
import { postMessageToServer } from "../utils/database";

enum Status {
    IDLE,
    SENDING = "SENDING...",
    SUCCESS = "SUCCESS!",
    FAILURE = "ERROR",
}

export default function IntroButtons() {
    const [status, setStatus] = useState(Status.IDLE);
    const [errorMsg, setErrorMsg] = useState("");

    const [formOpen, setFormOpen] = useState(false);
    const firstInput = useRef<HTMLInputElement>(null);

    const openForm = () => {
        setFormOpen(true);
        setTimeout(() => firstInput.current?.focus(), 250);
    };

    const closeForm = () => {
        setFormOpen(false);
        setStatus(Status.IDLE);
    };

    const [formName, updateFormName] = useState("");
    const [formEmail, updateFormEmail] = useState("");
    const [formMessage, updateFormMessage] = useState("");

    useEffect(() => {
        window.addEventListener("openContactForm", openForm);
        return () => window.removeEventListener("openContactForm", openForm);
    }, []);

    async function handleSubmit() {
        if (!formName || !formEmail || !formMessage) {
            window.dispatchEvent(new Event("highlightMissingInputs"));
            return;
        }

        const emailRegex = new RegExp(String.raw`^(\S+@\S+\.\S+)?$`);
        if (!emailRegex.test(formEmail)) {
            // No need to broadcast an Event, the input should be highlighted red already.
            return;
        }

        setStatus(Status.SENDING);
        let completed = false;
        
        setTimeout(() => {
            if (completed) return;
            setErrorMsg("Sending timed out. Please double check your internet connection.");
            setStatus(Status.FAILURE);
        }, 10000);

        const error = await postMessageToServer({
            name: formName,
            email: formEmail,
            message: formMessage,
        });

        completed = true;
        if (error) {
            setErrorMsg(error);
            setStatus(Status.FAILURE);
        } else {
            setStatus(Status.SUCCESS);
        }
    }

    return (
        <div id="intro-buttons" className={formOpen ? "contact-form-open" : "contact-form-closed"}>
            <IconButton
                href={Resume}
                src={ResumeIcon}
                label="Résumé"
                target="_blank"
            />
            <IconButton
                href="https://medium.com/@todoran"
                src={BlogIcon}
                label="Medium"
                target="_blank"
            />
            <IconButton
                onClick={openForm}
                src={ContactIcon}
                label="Contact"
            />

            <div id="contact-form">
                {status !== Status.IDLE && <>
                    <Title>{status}</Title>

                    {status === Status.FAILURE && <p>{errorMsg}</p>}

                    {status !== Status.SENDING &&
                        <SimpleButton
                            svg={<CancelIcon size="1em" />}
                            label="Close"
                            onClick={closeForm}
                        />
                    }
                </>}

                {status === Status.IDLE && <>
                    <div className="row">
                        <TextInput
                            label="Name"
                            value={formName}
                            updateValue={updateFormName}
                            giveRef={firstInput}
                        />
                        <TextInput
                            label="Email"
                            value={formEmail}
                            updateValue={updateFormEmail}
                            inputMode="email"
                            regex={String.raw`^(\S+@\S+\.\S+)?$`}
                        />
                    </div>

                    <div className="row height-expand">
                        <TextInput
                            label="Message"
                            value={formMessage}
                            updateValue={updateFormMessage}
                            placeholder="Let's chat!"
                            textArea
                        />
                    </div>

                    <div className="row">
                        <SimpleButton
                            svg={<CancelIcon size="1em" />}
                            label="Cancel"
                            onClick={closeForm}
                        />
                        <SimpleButton
                            svg={<SubmitIcon size="1em" />}
                            label="Submit"
                            onClick={handleSubmit}
                            primary
                        />
                    </div>
                </>}
            </div>
        </div >
    );
}