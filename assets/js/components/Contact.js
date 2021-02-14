import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
    const [serverState, setServerState] = useState({
        submitting: false,
        status: null,
    })
    const handleServerResponse = (ok, msg, form) => {
        setServerState({
            submitting: false,
            status: { ok, msg },
        })
        if (ok) {
            form.reset()
        }
    }
    const handleOnSubmit = e => {
        e.preventDefault()
        const form = e.target
        setServerState({ submitting: true })
        axios({
            method: "POST",
            url: "http://localhost:8000/api/contact",
            data: new FormData(form),
        })
            .then(r => {
                handleServerResponse(true, "Thanks!", form)
            })
            .catch(r => {
                handleServerResponse(false, r.response.data.error, form)
            })
    }
        return (
            <div>
                <h1 className="text-2xl block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Contact
                </h1>
                <div className="shadow bg-gray-50 p-6 flex justify-center">
                    <form
                        method="POST"
                        id="contact-form"
                        onSubmit={handleOnSubmit}
                        className="w-full max-w-lg">
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="contact-name">
                                    Name
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border
                                    border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none
                                    focus:bg-white"
                                    name="contactName"
                                    id="contact-name"
                                    type="text"
                                    placeholder="Jane"/>
                                <p className="text-red-500 text-xs italic">
                                    Please fill out this field.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="contact-email">
                                    E-mail
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border
                                    border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white
                                    focus:border-gray-500"
                                    id="contact-email"
                                    name="contactEmail"
                                    type="email"/>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="contact-subject">
                                    Subject
                                </label>
                                <select
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border
                                    border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none
                                    focus:bg-white"
                                    name="contactSubject"
                                    id="contact-subject"
                                    type="text"
                                    required>
                                    <option>Pricing</option>
                                    <option>Complaining</option>
                                    <option>Flying</option>
                                </select>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="contact-message">
                                    Message
                                </label>
                                <textarea
                                    className=" no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
                                    id="contact-message"
                                    name="contactMessage">
                                </textarea>
                            </div>
                        </div>
                        <div className="md:flex md:items-center">
                            <div className="md:w-1/3">
                                <button
                                    className="shadow bg-purple-400 hover:bg-purple-400 focus:shadow-outline
                                    focus:outline-none text-white font-bold py-2 px-4 rounded"
                                    type="submit"
                                    disabled={serverState.submitting}>
                                    Send
                                </button>
                                {serverState.status && (
                                    <p className={!serverState.status.ok ? "errorMsg" : ""}>
                                        {serverState.status.msg}
                                    </p>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }

export default Contact;