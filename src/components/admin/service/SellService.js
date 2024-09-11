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
        return res.data;
    } catch (e) {
        console.error(e);
        return [];
    }
}

export const changeStatusBillByTableId = async (tableId) => {
    try {
        await axios.patch(`http://localhost:8080/api/bills/delete/${tableId}`)
        return true;
    } catch (e) {
        console.error(e);
        return false;
    }
}