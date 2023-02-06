import type { NextPage } from "next";

const Portal: NextPage = () => {
    const handleSubmit = async (event: any) => {
        event.preventDefault();

        console.log(event.target.file.value);
        const data = {
            first: event.target.first.value,
            last: event.target.last.value,
        };

        // const JSONdata = JSON.stringify(data);
        //const sentData = 
        const endpoint = "/api/portal";

        const options = {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
            },
            body: event.target.file.value,
        };

        const response = await fetch(endpoint, options);

        const result = await response.json();
    };
    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="first">First Name</label>
            <input type="text" id="first" name="first" required />

            <label htmlFor="last">Last Name</label>
            <input type="text" id="last" name="last" required />
            <input type="file" id="file" name="file" />
            <button type="submit">Submit</button>
        </form>
    );
};
export default Portal;
