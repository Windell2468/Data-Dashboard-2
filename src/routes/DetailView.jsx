import { useParams } from "react-router-dom"; //

function DetailView(){ //
    const {id} = useParams(); //
    return (
        <div style={{ padding: "20px", textAlign: "center"}} >
            {/* Page heading */}
            <h2>Disney Detail View</h2>
            {/* The display the selected disney character's ID from the URL */}
            <p>You choosed a disney character with ID: <strong>{id}</strong></p>

        </div>
    )
}

export default DetailView //