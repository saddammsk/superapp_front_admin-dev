import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
 
export default function NotFound() {
  let currentCookies = cookies();
  let token = currentCookies.get('token')
  let decodedToken = currentCookies.get('decodedToken')
  if(token==undefined && decodedToken==undefined){
    //Is not authenticated
    redirect(`/es/auth/login`)
  } else {
    //Is authenticated
    redirect(`/es/admin/dashboard`)
  }
}