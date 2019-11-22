class UserData{
     static userFullName="";
    static accessToken="";   
    constructor(){
        
       
    }
     
    static setAccessToken=(accessToken)=>{
        UserData.accessToken=accessToken;
    }
    static getAccessToken=()=>{
        return UserData.accessToken;
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
static getUserDataWithModel=(itemId=0,parentItemId=0,model="getMeetingPackFolder",userId="45",companyCode="010",accessToken="97f914eb1ceb1867e3824f647f7e589b",companyId="010")=>{

   const formData = new FormData();
   formData.append('userId', userId);
   formData.append('companyCode',companyCode);
   formData.append('accessToken',accessToken);
   formData.append('model', model);
   formData.append('companyId', companyId);
   formData.append('itemId', itemId);
   return formData;         

}
static getBaseUrl=()=>{
    return "http://web_eboard.stl-horizon.com/frontend/web/index.php/user/create" 
}
}
export default UserData;