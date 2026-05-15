"use client";

import { Plane } from "@gravity-ui/icons";
// import { Plane } from "@gravity-ui/icons";
import { Button, Input, Label, Modal, Surface, TextField, Select, ListBox, TextArea, FieldError } from "@heroui/react";

export function EditModal({destination}) {

    const {
        destinationName,
        country,
        category,
        price,
        duration,
        departureDate,
        imageUrl,
        description,
        _id
    } = destination;

    const onSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget);
        const destination = Object.fromEntries(formData.entries());
        console.log(destination, " destination here lol")

        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/destination/${_id}`, {
             method: 'PATCH',
             headers: {
                 'content-type': 'application/json'
             },
             body: JSON.stringify(destination)
        })

        const data = await res.json();

        console.log('Update form data from server', data)

    }

    return (
        <Modal>
            <Button variant="secondary" className="w-full"> Edit Destination </Button>
            <Modal.Backdrop>
                <Modal.Container placement="auto">
                    <Modal.Dialog className="sm:max-w-2xl">
                        <Modal.CloseTrigger />
                        <Modal.Header>
                            <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                                <Plane className="size-5" />
                            </Modal.Icon>
                            <Modal.Heading>Update Destination</Modal.Heading>
                        </Modal.Header>
                        <Modal.Body className="p-6">
                            <Surface variant="default">

                                {/* Form for updating the data */}
                                <form onSubmit={onSubmit}
                                    className="p-10 space-y-8"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        {/* Destination Name */}
                                        <div className="md:col-span-2">
                                            <TextField name="destinationName" isRequired defaultValue={destinationName}>
                                                <Label>Destination Name</Label>
                                                <Input placeholder="Bali Paradise" className="rounded-2xl" />
                                                <FieldError />
                                            </TextField>
                                        </div>

                                        {/* Country */}
                                        <TextField name="country" isRequired defaultValue={country}>
                                            <Label>Country</Label>
                                            <Input placeholder="Indonesia" className="rounded-2xl" />
                                            <FieldError />
                                        </TextField>

                                        {/* Category - Updated Select Component */}
                                        <div>
                                            <Select
                                                name="category"
                                                isRequired
                                                className="w-full"
                                                placeholder="Select category"
                                                defaultSelectedKey={category}
                                            >
                                                <Label>Category</Label>
                                                <Select.Trigger className="rounded-2xl">
                                                    <Select.Value />
                                                    <Select.Indicator />
                                                </Select.Trigger>
                                                <Select.Popover>
                                                    <ListBox>
                                                        <ListBox.Item id="Beach" textValue="Beach">
                                                            Beach
                                                            <ListBox.ItemIndicator />
                                                        </ListBox.Item>
                                                        <ListBox.Item id="Mountain" textValue="Mountain">
                                                            Mountain
                                                            <ListBox.ItemIndicator />
                                                        </ListBox.Item>
                                                        <ListBox.Item id="City" textValue="City">
                                                            City
                                                            <ListBox.ItemIndicator />
                                                        </ListBox.Item>
                                                        <ListBox.Item id="Adventure" textValue="Adventure">
                                                            Adventure
                                                            <ListBox.ItemIndicator />
                                                        </ListBox.Item>
                                                        <ListBox.Item id="Cultural" textValue="Cultural">
                                                            Cultural
                                                            <ListBox.ItemIndicator />
                                                        </ListBox.Item>
                                                        <ListBox.Item id="Luxury" textValue="Luxury">
                                                            Luxury
                                                            <ListBox.ItemIndicator />
                                                        </ListBox.Item>
                                                    </ListBox>
                                                </Select.Popover>
                                            </Select>
                                        </div>

                                        {/* Price */}
                                        <TextField name="price" type="number" isRequired defaultValue={price}>
                                            <Label>Price (USD)</Label>
                                            <Input
                                                type="number"
                                                placeholder="1299"
                                                className="rounded-2xl"
                                            />
                                            <FieldError />
                                        </TextField>

                                        {/* Duration */}
                                        <TextField name="duration" isRequired defaultValue={duration}>
                                            <Label>Duration</Label>
                                            <Input
                                                placeholder="7 Days / 6 Nights"
                                                className="rounded-2xl"
                                            />
                                            <FieldError />
                                        </TextField>

                                        {/* Departure Date */}
                                        <div className="md:col-span-2">
                                            <TextField name="departureDate" type="date" isRequired defaultValue={departureDate}>
                                                <Label>Departure Date</Label>
                                                <Input type="date" className="rounded-2xl" />
                                                <FieldError />
                                            </TextField>
                                        </div>

                                        {/* Image URL - Removed preview */}
                                        <div className="md:col-span-2">
                                            <TextField name="imageUrl" isRequired defaultValue={imageUrl}>
                                                <Label>Image URL</Label>
                                                <Input
                                                    type="url"
                                                    placeholder="https://example.com/bali-paradise.jpg"
                                                    className="rounded-2xl"
                                                />
                                                <FieldError />
                                            </TextField>
                                        </div>

                                        {/* Description */}
                                        <div className="md:col-span-2">
                                            <TextField name="description" isRequired defaultValue={description}>
                                                <Label>Description</Label>
                                                <TextArea
                                                    placeholder="Describe the travel experience..."
                                                    className="rounded-3xl"
                                                />
                                                <FieldError />
                                            </TextField>
                                        </div>
                                    </div>

                                    {/* Buttons */}

                                    <Button
                                        type="submit"
                                        variant="outline"

                                        className=" rounded-none w-full bg-cyan-500 text-white"
                                    >
                                        Add
                                    </Button>
                                </form>

                            </Surface>
                        </Modal.Body>
                    </Modal.Dialog>
                </Modal.Container>
            </Modal.Backdrop>
        </Modal>
    );
}