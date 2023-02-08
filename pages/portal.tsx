import type { NextPage } from "next";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Portal: NextPage = () => {
    const [fullName, setfullName] = useState("");
    const [adharNumber, setadharNumber] = useState("");
    const [note, setNote] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [doctorId, setDoctorId] = useState("");

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("fullName", fullName);
        formData.append("adharNumber", adharNumber);
        formData.append("doctorId", doctorId);

        if (file) {
            formData.append("file", file);
        }

        if (note) formData.append("note", note);

        console.log(formData);
        const options = {
            method: "POST",
            body: formData,
        };
        const response = await fetch("/api/portal", options);
    };
    return (
        <div>
            <Navbar />
            <form onSubmit={handleSubmit}>
                <label htmlFor="fullName">Full name:</label>
                <input
                    onChange={(e) => setfullName(e.target.value)}
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                />

                <label htmlFor="adharNumber">Adhar number:</label>
                <input
                    onChange={(e) => setadharNumber(e.target.value)}
                    type="text"
                    id="adharNumber"
                    name="adharNumber"
                    pattern="[0-9]{12}"
                    title="Adhar nunber should be digits (0 to 9) only upto 12 digits"
                    required
                />
                <label htmlFor="note">Note:</label>
                <textarea
                    onChange={(e) => setNote(e.target.value)}
                    name="note"
                    id="note"
                />
                <label htmlFor="doctorId">Doctor&apos;s Id:</label>
                <input
                    onChange={(e) => setDoctorId(e.target.value)}
                    name="doctorId"
                    id="doctorId"
                    required
                />
                <input
                    onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                            setFile(e.target.files[0]);
                        }
                    }}
                    type="file"
                    id="file"
                    name="file"
                />

                <button type="submit">Submit</button>
            </form>
            <Footer />
        </div>
    );
};
export default Portal;
