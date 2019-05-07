const commonResponse = {
    respCode: 1,
    respMsg: 'No Data Found for {0}',
    // get errorMsg(){
    //     return `${error.respCode} ${error.respMsg}`
    // },
    set errorMsg(value){
        const parts = value.split(',');
        this.respCode = parseInt(parts[0]);
        this.respMsg = parts[1];
    },
    
    set successMsg(value){
        const parts = value.split(',');
        this.respCode = parseInt(parts[0]);
        this.respMsg = parts[1];
    }
}

module.exports = commonResponse;
