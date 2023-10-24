import axios from "axios"

export const postTextGenerator =async (query)=>{
    try {
        let res = await axios.post(`${process.env.REACT_APP_API_LINK}/textgenerate`, {query});
        res = await res?.data;
        return res;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const postTextSummariz = async(query)=>{
    try {
        let res = await axios.post(`${process.env.REACT_APP_API_LINK}/textsummariz`, {query});
        res = await res?.data;
        return res;
    } catch (error) {
        throw new Error(error.message);
    }
}

export const postLanguageTranslation = async (query)=>{
    try {
        let res = await axios.post(`${process.env.REACT_APP_API_LINK}/languagetranslation`, {query});
        res = await res?.data;
        return res;
    } catch (error) {
        throw new Error(error.message);
    }
}