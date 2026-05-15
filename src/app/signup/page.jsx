'use client'
import { authClient } from "@/lib/auth-client";
import { Button, Description, Card, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { redirect } from "next/navigation";

import React from 'react';
import { FaGoogle } from "react-icons/fa";

const SignUpPage = () => {

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries())
        // console.log(user , ' user here ');

        const { data, error } = await authClient.signUp.email({
            email: user.email,
            password: user.password,
            name: user.name,
            image: user.image,
        });

        console.log(data, error, ' data ', ' error ')

        if (data) {
            redirect('/');
        };

        if (error) {
            alert('something went wrong, see the error : ' + error)
        }

    }

    const signInGoogle = async () => {
        await authClient.signIn.social({
            provider: "google",
        });
    }
    return (
        <div className="p-10">
            <Card className="w-1/2 mx-auto">
                <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
                    <TextField
                        isRequired
                        name="name"
                        type="text"

                    >
                        <Label>Full name please</Label>
                        <Input placeholder="Your name" />
                        <FieldError />
                    </TextField>

                    <TextField
                        isRequired
                        name="image"
                        type="url"

                    >
                        <Label>Enter your profile url here</Label>
                        <Input placeholder="https://example.com" />
                        <FieldError />
                    </TextField>


                    <TextField
                        isRequired
                        name="email"
                        type="email"
                        validate={(value) => {
                            if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                                return "Please enter a valid email address";
                            }
                            return null;
                        }}
                    >
                        <Label>Email</Label>
                        <Input placeholder="john@example.com" />
                        <FieldError />
                    </TextField>

                    <TextField
                        isRequired
                        minLength={8}
                        name="password"
                        type="password"
                        validate={(value) => {
                            if (value.length < 8) {
                                return "Password must be at least 8 characters";
                            }
                            if (!/[A-Z]/.test(value)) {
                                return "Password must contain at least one uppercase letter";
                            }
                            if (!/[0-9]/.test(value)) {
                                return "Password must contain at least one number";
                            }
                            return null;
                        }}
                    >
                        <Label>Password</Label>
                        <Input placeholder="Enter your password" />
                        <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                        <FieldError />
                    </TextField>
                    <div className="flex rounded-none gap-2">
                        <Button className={`w-full rounded-none`} type="submit">

                            SignUp
                        </Button>

                    </div>
                </Form>
                <div className="flex rounded-none gap-2">
                    <Button
                        onClick={signInGoogle}
                        variant="danger" className={`w-full rounded-none`} type="submit">

                        <FaGoogle /> Google
                    </Button>

                </div>
            </Card>
        </div>
    );
};

export default SignUpPage;