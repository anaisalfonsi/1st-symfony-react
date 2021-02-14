import React, { useState } from 'react';
import axios from 'axios';

const JobApplication = () => {
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
            url: "http://localhost:8000/api/apply",
            data: new FormData(form),
        })
            .then(r => {
                handleServerResponse(true, "Thanks for Applying!", form)
            })
            .catch(r => {
                handleServerResponse(false, r.response.data.error, form)
            })
    }
        return (
            <div>
                <h1 className="bg-purple-400 text-center text-2xl block uppercase tracking-wide text-white text-xs font-bold p-2">
                    Apply now!
                </h1>
                <div className="shadow bg-purple-50 p-6 flex justify-center">
                    <form
                        method="POST"
                        id="apply-form"
                        onSubmit={handleOnSubmit}
                        className="w-full max-w-lg"
                        encType="multipart/form-data"
                    >
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="apply-first-name"
                                >
                                    First Name
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-50 text-gray-700 border
                                    border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none
                                    focus:bg-white"
                                    name="firstName"
                                    id="apply-first-name"
                                    type="text"
                                    placeholder="Jane"
                                ></input>
                                <p className="text-red-500 text-xs italic">
                                    Please fill out this field.
                                </p>
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="apply-last-name"
                                >
                                    Last Name
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-50 text-gray-700 border
                                    border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none
                                    focus:bg-white"
                                    name="lastName"
                                    id="apply-last-name"
                                    type="text"
                                    placeholder="Doe"
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-2">
                            <div className="w-full px-3">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="apply-email"
                                >
                                    E-mail
                                </label>
                                <input
                                    className="appearance-none block w-full bg-gray-50 text-gray-700 border
                                    border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white
                                    focus:border-gray-500"
                                    id="apply-email"
                                    name="applyEmail"
                                    type="email"
                                ></input>
                            </div>
                        </div>
                        <hr/>
                        <div className="flex flex-wrap -mx-3 mt-4 mb-6">
                            <div className="w-full px-3">
                                <label className="mr-2" htmlFor="apply-file">Upload your CV:</label>
                                <input
                                    id="apply-file"
                                    type="file"
                                    name="applyFile"
                                ></input>
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <label
                                    className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    htmlFor="apply-message"
                                >
                                    Message
                                </label>
                                <textarea
                                    className=" no-resize appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
                                    id="apply-message"
                                    name="applyMessage"
                                ></textarea>
                            </div>
                        </div>
                        <div className="md:flex md:items-center">
                            <div className="md:w-1/3">
                                <button
                                    className="shadow bg-purple-400 hover:bg-purple-400 focus:shadow-outline
                                    focus:outline-none text-white font-bold py-2 px-4 rounded"
                                    type="submit"
                                    disabled={serverState.submitting}
                                >
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

export default JobApplication;