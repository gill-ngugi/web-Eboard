    class UserData{
        
        static userFullName="";
        static accessToken="";   
            constructor(){       
                
            }
         
        static setAccessToken=(accessToken)=>{
            UserData.accessToken = accessToken;
        }
    
        static getAccessToken=()=>{
            return UserData.accessToken;
        }
    
        static setUserName=(userName)=>{
            UserData.userName = userName;
        }
    
        static getUserName=()=>{
            return UserData.userName;
        }
    
        static setUserPassword=(userPassword)=>{
            UserData.userPassword = userPassword;
        }
    
        static getUserPassword=()=>{
            return UserData.userPassword;
        }
    
        static setCompanyCode=(companyCode)=>{
            UserData.companyCode = companyCode;
        }
    
        static getCompanyCode=()=>{
            return UserData.companyCode;
        }
    
        static setUserId=(userId)=>{
            UserData.userId = userId;
        }
    
        static getUserId=()=>{
            return UserData.userId;
        }
    
        static setCompanyId=(companyId)=>{
            UserData.companyId = companyId;
        }
    
        static getCompanyId=()=>{
            return UserData.companyId;
        }

        static setCompanyListId=(companyId)=>{
            UserData.companyId = companyId;
        }

        static getCompanyListId=()=>{
            return UserData.companyId;
        }

        static setDocumentId=(itemId)=>{
            UserData.itemId = itemId;
        }

        static getDocumentId=()=>{
            return UserData.itemId;
        }
 
        static setLoginErrors=(login_errors)=>{
            UserData.login_errors = login_errors;
        }

        static getLoginErrors=()=>{
            return UserData.login_errors;
        }   

        static setBodyId = (bodyId) => {
            UserData.bodyId = bodyId;
        }

        static getBodyId = () => {
            return UserData.bodyId;
        }

        static setCdsId = (cdsId) => {
            UserData.cdsId = cdsId;
        }

        static getCdsId = () => {
            return UserData.cdsId;
        }

        static setCdsBsId = (cdsBsid) => {
            UserData.cdsBsid = cdsBsid;
        }

        static getCdsBsId = () => {
            return UserData.cdsBsid;
        }

        static setApprovalId = (approvalId) => {
            UserData.approvalId = approvalId;
        }

        static getApprovalId = () => {
            return UserData.approvalId;
        }

        static getUserData(itemId=0,parentItemId=0){   
           this.parentItemId=parentItemId;
           const formData = new FormData();
           formData.append('userId', "45");
           formData.append('companyCode',"010");
           formData.append('accessToken',"97f914eb1ceb1867e3824f647f7e589b");
           formData.append('model', "getMeetingPackFolder");
           formData.append('companyId', "2");
           formData.append('itemId', itemId);
           return formData;      
        }
    
        static getBaseUrl=()=>{
            // return "http://web_eboard.stl-horizon.com/frontend/web/index.php/user/create" 
            return "https://eserver1.stl-horizon.com/api_v13/frontend/web/index.php/user/create" 
            // return "http://eserver1.stl-horizon.com/api_tst_v13/frontend/web/user/create" 
            // return "https://eserver1.stl-horizon.com/api_v9/frontend/web/user/create" 
        }
    }

    export default UserData;

    // static getUserDataWithModel=(itemId=0,parentItemId=0,model="getMeetingPackFolder",
    //     userId="45",companyCode="010",accessToken="97f914eb1ceb1867e3824f647f7e589b",companyId="010")=>{
    //         const formData = new FormData();
    //         formData.append('userId', userId);
    //         formData.append('companyCode',companyCode);
    //         formData.append('accessToken',accessToken);
    //         formData.append('model', model);
    //         formData.append('companyId', companyId);
    //         formData.append('itemId', itemId);
    //         return formData;        
    // }