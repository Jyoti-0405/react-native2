import { ADD_TO_CONTACT_LIST, DELETE_TO_CONTACT_LIST, FETECH_CONTACT_LIST, UPDATE_TO_CONTACT_LIST } from "./constants";

function addToContactList(data:any) {
    return {
        type:ADD_TO_CONTACT_LIST,
        data:data
    }
}

function updateContactList(name:any,data:any) {
    return {
        type:UPDATE_TO_CONTACT_LIST,
        name:name,
        data:data
    }
    
}

function deleteContactList(name:any){
    return {
        type:DELETE_TO_CONTACT_LIST,
        name:name
    }
}

function fetchContactList(data:any){
    return {
        type:FETECH_CONTACT_LIST,
        data:data
    }
}

export {addToContactList,updateContactList,deleteContactList,fetchContactList}