"use client";

import { authClient } from "@/lib/auth-client";
import { AlertDialog, Button } from "@heroui/react";
import { redirect } from "next/navigation";
import { HiOutlineTrash } from "react-icons/hi";

export function CancelBookingAlert({ bookingId }) {

    const handleCancelBooking = async () => {

        const { data: tokenData } = await authClient.token()

        // console.log(bookingId, 'from delete')
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${bookingId}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${tokenData?.token}`
            }
        });

        const data = await res.json();
        console.log(data, ' data deleted ')

        if (data.acknowledged) {
            redirect('/my-ookings')
        }

    }

    return (
        <AlertDialog>
            <Button
                variant="danger"

                size="sm"
                className="font-medium rounded-none flex-grow sm:w-28"
                startContent={<HiOutlineTrash />}
            >
                Cancel
            </Button>
            <AlertDialog.Backdrop>
                <AlertDialog.Container>
                    <AlertDialog.Dialog className="sm:max-w-[400px]">
                        <AlertDialog.CloseTrigger />
                        <AlertDialog.Header>
                            <AlertDialog.Icon status="danger" />
                            <AlertDialog.Heading>Delete bookings permanently?</AlertDialog.Heading>
                        </AlertDialog.Header>
                        <AlertDialog.Body>
                            <p>
                                This will permanently delete your booking
                            </p>
                        </AlertDialog.Body>
                        <AlertDialog.Footer>
                            <Button slot="close" variant="tertiary">
                                Cancel
                            </Button>

                            <Button
                                onClick={handleCancelBooking}
                                slot="close" variant="danger">
                                Delete bookings
                            </Button>
                        </AlertDialog.Footer>
                    </AlertDialog.Dialog>
                </AlertDialog.Container>
            </AlertDialog.Backdrop>
        </AlertDialog>
    );
}