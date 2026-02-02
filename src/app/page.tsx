"use client"


import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import Image from "next/image";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

/**
 * Client-side Home page component that provides sign-up, sign-in, and sign-out UI using authClient.
 *
 * When a session exists, displays the signed-in user and a Sign Out button; otherwise renders separate
 * sign-up and sign-in forms that collect name, email, and password and invoke authClient callbacks.
 *
 * @returns The JSX element for the home page containing authentication forms or the signed-in view.
 */
export default function Home() {

  const { 
    data: session, // rename data to session
    isPending, //loading state
    error, //error object
    refetch //refetch the session
} = authClient.useSession() 


  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const onSignup = ()=>{
     authClient.signUp.email({
      email,
      name,
      password
    },{
      onError: ()=> {
        window.alert("Something went wrong");
      },
      onSuccess: ()=>{
        window.alert("success");
      }
    });
  }

  const onLogin = ()=>{
    authClient.signIn.email({
     email,
     password
   },{
     onError: ()=> {
       window.alert("Something went wrong");
     },
     onSuccess: ()=>{
       window.alert("success");
     }
   });
 }
  if(session){
    return (
      <div className="flex flex-col">
        <p> logged in as {session.user.name}</p>
        <Button onClick={ () =>  authClient.signOut()}>
          Sign Out
        </Button>
      </div>
    );
  }

  return (
    <div>

    <div className="flex flex-col gap-y-4 p-4">
      <Input placeholder="name" value ={name} onChange = {(e) => setName(e.target.value)}/>
      <Input placeholder="email" value = {email} onChange = {(e) => setEmail(e.target.value)}/>
     <Input placeholder="password" type="password" value = {password} onChange = {(e) => setPassword(e.target.value)}/>
   <Button onClick={onSignup}> Create User</Button>
    </div>

    <div className="flex flex-col gap-y-4 p-4">
      <Input placeholder="email" value = {email} onChange = {(e) => setEmail(e.target.value)}/>
     <Input placeholder="password" type="password" value = {password} onChange = {(e) => setPassword(e.target.value)}/>
   <Button onClick={onLogin}> Login User</Button>
    </div>
    </div>
    
     );
}