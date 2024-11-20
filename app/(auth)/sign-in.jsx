    import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
    import React, { useState } from 'react'
    import { images } from '../../constants'
import Formfield from '../../components/formfield'
import CustomButton from '../../components/custombutton'
import { Link, router } from 'expo-router'
import { createUser, getCurrentUser, signin } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'


    const signIn = () => {
        const[form,setForm] = useState({
            email:'',
            password:'',
        })
        const[isSubmitting,setisSubmitting] = useState(false);
        const {setuser,setloggedIn} = useGlobalContext();
        const submit = async ()=>{
            if(!form.email || !form.password){
                Alert.alert("Error", "Please fill in all the fields");
                return;
            }
            setisSubmitting(true);
            console.log("Form is submitting...");
            try {
                await signin(form.email, form.password);
                const userSession = await getCurrentUser(); 
                setuser(userSession);
                setloggedIn(true);
                router.replace("/home");
            } catch (error) {
                Alert.alert("Error",error.message)
                console.log(error);
            }
            finally{
                setisSubmitting(false)
            }
        }
    return (
        <SafeAreaView className="bg-primary h-full"> 
            <ScrollView>
                <View className="w-full justify-center h-full items-center px-4 my-6">
                    <Image source={images.logo} resizeMode='contain' className='w-[115px] h-[35px]'/>
                    <Text className='text-2xl text-white font-semibold mt-5'>Log in to Aora</Text>
                    <Formfield title='Email' value={form.email} keyBoardType = 'email-address' otherStyle='mt-7' handleChange={(e)=>setForm({...form,email:e})}/>
                    <Formfield title='Password' value={form.password} otherStyle='mt-7' handleChange={(e)=>setForm({...form,password:e})}/>
                    <CustomButton title="Sign In" handlePress={submit} containerStyle="mt-7 w-full" isLoading={isSubmitting}/>

                    <View className="justify-center flex-row items-center gap-2 pt-5">
                        <Text className="text-gray-100 text-lg">Don't have account?</Text>
                        <Link href='/sign-up' className='font-semibold text-yellow-600'>Sign up</Link>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
    }

    export default signIn

