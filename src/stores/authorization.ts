import api from '@services/api';
import { ILoginPayload, IUserProfile } from '@src/types/authorization';
import { defineStore } from 'pinia'
import { reactive } from 'vue';

export const useAuthorizationStore = defineStore('authorization', () => {
  let data = reactive({
        authorized: false,
        id: '',       
        name: '',
  }) as IUserProfile;

  function setToken(token: string){
    localStorage.setItem('token', token)
 }
 
function setProfileData(payload: any){   
    data = {     
            authorized: payload ? true : false,           
            id: payload?.id || '',
            name: payload?.name || '',                
        }
    
}


function logout(){
    api().get('api/user/logout')
    setToken('')
    setProfileData(null);
}

async function getProfile(setToAuthorizationState = false){
    try {            
        const response = await api().get('api/user');             
        
        if(setToAuthorizationState){
            setProfileData(response.data.data)                               
        }            
        return response;
    } catch (error) {
        if(setToAuthorizationState){
            setProfileData(null)  
        }     
           throw error;          
    }
}
async function login (payload: ILoginPayload) {
    try {            
        const response = await api().post('api/user/login-web', payload);                    
        setToken(response.data.data.accessToken)                       
        return response;
    } catch (error) {
        throw error;
    }
}

return { data, setToken, logout, getProfile, login };

});
