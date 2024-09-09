import {BrowserRouter, Route, Routes} from "react-router-dom";
import FeedbackList from "./components/admin/feedbackList";

function Admin() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/feedback/:date" element={<FeedbackList/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default Admin