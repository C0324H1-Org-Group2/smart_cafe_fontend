import axios from "axios";

export const getAllTables= async () => {
    try {
        let res = await axios.get("http://localhost:8080/api/table")
        console.log(res);
        return res.data;
    } catch (e) {
        console.error(e);
        return [];
    }
}

export const getBillByTableId= async (tableId) => {
    try {
        let res = await axios.get(`http://localhost:8080/api/bills/${tableId}`)
        console.log(res);
        return res.data;
    } catch (e) {
        console.error(e);
        return [];
    }
}