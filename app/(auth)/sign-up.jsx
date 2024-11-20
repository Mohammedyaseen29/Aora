    import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
    import { useState } from 'react';
    import React from 'react'
import { images } from '../../constants'
import Formfield from '../../components/formfield';
import CustomButton from '../../components/custombutton';
import { Link, router } from 'expo-router';
import { createUser } from '../../lib/appwrite';
import { useGlobalContext } from '../../context/GlobalProvider';

    const signUp = () => {
        const [form, setForm] = useState({
            userName: "",
            email: "",
            password: "",
        });
        const [isSubmitting, setisSubmitting] = useState(false);
        const {setuser,setloggedIn} = useGlobalContext();
        const submit = async() => {
            if(!form.email || !form.password || !form.userName){
                Alert.alert('Error',"Please fill in all the fields");
                return;
            }

            setisSubmitting(true);
            console.log("Form is submitting...")
            try {
                const user = await createUser(form.email,form.password,form.userName);
                setuser(user);
                setloggedIn(true);
                console.log("new user is created");
                router.replace('/home');
            } catch (error) {
                Alert.alert('Error',error.message)
            }finally{
                setisSubmitting(false);
            }
        };
    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className="px-4 my-6 justify-center items-center w-full h-full ">
                    <Image source={images.logo} resizeMode='contain' className="w-[115px] h-[35px]"/>
                    <Text className="text-white font-semibold text-2xl mt-5">Sign Up to Aora</Text>
                    <Formfield title="UserName" value={form.userName} otherStyle="mt-7" handleChange={(e)=>setForm({...form,userName:e})} />
                    <Formfield title="Email" value={form.email}  keyBoardType = 'email-address' otherStyle='mt-7' handleChange={(e)=>setForm({...form,email:e})}/>
                    <Formfield title="Password" value={form.password} otherStyle="mt-7" handleChange={(e)=>setForm({...form,password:e})}/>
                    <CustomButton title="Sign Up" containerStyle="w-full mt-7" handlePress={submit} isLoading={isSubmitting}/>
                    <View className="mt-3">
                        <Text className="text-gray-100">Already Sign In? {" "} <Link href="/sign-in" className='font-semibold text-yellow-600'>Sign In</Link></Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
    }

    export default signUp

