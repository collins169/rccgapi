const loginResponse = {
    userDetails: [],
    token: '',
    respMsg: '',
    respCode: 0
    // get errorMsg(){
    //     return `${error.respCode} ${error.respMsg}`
    // },
    set Members(value){
        this.totalMembers = parseInt(value);
    },

    set Workers(value){
        this.totalWorkers = parseInt(value);
    }
    
}

module.exports = loginResponse;
