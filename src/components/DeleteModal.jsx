"use client";

import { AlertDialog, Button } from "@heroui/react";
import { redirect } from "next/navigation";

export function DeleteModal({ destination }) {

    const { _id, destinationName } = destination;

    const handleDelete = async () => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destination/${_id} `, {
            method: "DELETE",
            headers: {
                'content-type': 'application/json'
            }
        })

        const data = await res.json();
        console.log(data, ' data deleted ');
        redirect('/destination')

    }

    return (
        <AlertDialog>
            <Button variant="danger">Delete {destinationName} destination</Button>
            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-[400px]">
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading>Delete your booking</AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <p>
                                This will delete your destinations
                            </p>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary">
                                Cancel
                            </Button>
                            <Button
                                onClick={handleDelete}
                                slot="close" variant="danger">
                                Delete  Booking
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
}